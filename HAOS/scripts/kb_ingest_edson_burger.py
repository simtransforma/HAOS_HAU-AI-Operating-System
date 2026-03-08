#!/usr/bin/env python3
import argparse
import csv
import hashlib
import json
import os
import re
import sqlite3
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Tuple

import numpy as np

SUPPORTED_EXT = {".pdf", ".docx", ".txt", ".csv", ".xlsx", ".xls"}
SKIP_EXT = {".zip", ".pptx", ".ppt", ".doc", ".json", ".md"}


def ensure_dir(path: Path):
    path.mkdir(parents=True, exist_ok=True)


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def clean_text(text: str) -> str:
    text = text.replace("\x00", " ")
    text = re.sub(r"\r\n?", "\n", text)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def extract_pdf(path: Path) -> str:
    from pypdf import PdfReader

    reader = PdfReader(str(path))
    parts = []
    for page in reader.pages:
        parts.append(page.extract_text() or "")
    return "\n\n".join(parts)


def extract_docx(path: Path) -> str:
    import docx

    doc = docx.Document(str(path))
    return "\n".join(p.text for p in doc.paragraphs)


def extract_txt(path: Path) -> str:
    for enc in ("utf-8", "utf-8-sig", "latin-1", "cp1252"):
        try:
            return path.read_text(encoding=enc)
        except Exception:
            pass
    return path.read_text(errors="ignore")


def extract_csv(path: Path) -> str:
    rows = []
    for enc in ("utf-8", "utf-8-sig", "latin-1", "cp1252"):
        try:
            with path.open("r", encoding=enc, newline="") as f:
                sample = f.read(4096)
                f.seek(0)
                try:
                    dialect = csv.Sniffer().sniff(sample)
                except Exception:
                    dialect = csv.excel
                reader = csv.reader(f, dialect)
                for i, row in enumerate(reader):
                    rows.append(" | ".join(str(x) for x in row))
                    if i > 20000:
                        break
            break
        except Exception:
            continue
    return "\n".join(rows)


def extract_excel(path: Path) -> str:
    import pandas as pd

    sheets = pd.read_excel(path, sheet_name=None)
    out = []
    for name, df in sheets.items():
        out.append(f"# Sheet: {name}")
        if df is None or df.empty:
            out.append("<empty>")
            continue
        # limit very large sheets
        clipped = df.head(20000).fillna("")
        out.append(clipped.to_csv(index=False))
    return "\n".join(out)


def extract_text(path: Path) -> str:
    ext = path.suffix.lower()
    if ext == ".pdf":
        return extract_pdf(path)
    if ext == ".docx":
        return extract_docx(path)
    if ext == ".txt":
        return extract_txt(path)
    if ext == ".csv":
        return extract_csv(path)
    if ext in (".xlsx", ".xls"):
        return extract_excel(path)
    raise ValueError(f"Unsupported extension: {ext}")


def chunk_text(text: str, size: int = 1400, overlap: int = 200) -> List[str]:
    text = clean_text(text)
    if not text:
        return []
    chunks = []
    i = 0
    n = len(text)
    while i < n:
        j = min(i + size, n)
        chunk = text[i:j]
        if j < n:
            cut = max(chunk.rfind("\n\n"), chunk.rfind(". "), chunk.rfind("\n"))
            if cut > int(size * 0.5):
                j = i + cut + 1
                chunk = text[i:j]
        chunks.append(chunk.strip())
        if j >= n:
            break
        i = max(j - overlap, i + 1)
    return [c for c in chunks if c]


def hash_embedding(text: str, dim: int = 384) -> np.ndarray:
    vec = np.zeros(dim, dtype=np.float32)
    tokens = re.findall(r"\w+", text.lower())
    if not tokens:
        return vec
    for tok in tokens:
        h = int(hashlib.md5(tok.encode("utf-8")).hexdigest(), 16)
        idx = h % dim
        sign = -1.0 if (h >> 8) & 1 else 1.0
        vec[idx] += sign
    norm = np.linalg.norm(vec)
    if norm > 0:
        vec /= norm
    return vec


def init_db(db_path: Path):
    conn = sqlite3.connect(db_path)
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            source_path TEXT UNIQUE,
            rel_path TEXT,
            ext TEXT,
            size_bytes INTEGER,
            mtime REAL,
            sha256 TEXT,
            text_path TEXT,
            text_chars INTEGER,
            chunks_count INTEGER,
            status TEXT,
            error TEXT,
            indexed_at TEXT
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS chunks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            doc_id INTEGER,
            chunk_idx INTEGER,
            text TEXT,
            embedding BLOB,
            dim INTEGER,
            FOREIGN KEY(doc_id) REFERENCES documents(id)
        )
        """
    )
    conn.execute("CREATE INDEX IF NOT EXISTS idx_chunks_doc ON chunks(doc_id)")
    conn.commit()
    return conn


def normalize_rel_path(rel: str) -> str:
    rel = rel.replace("\\", "/").strip("/")
    if not rel:
        return rel

    # Remove namespace legado DPM e mantém tudo "flat" no cliente.
    if rel.startswith("DPM/"):
        rel = rel[len("DPM/") :]

    # Sem subpastas lógicas no cliente: converte separador em prefixo estável.
    rel = rel.replace("/", "__")
    return rel


def main():
    parser = argparse.ArgumentParser(description="Ingestão KB Edson Burger")
    parser.add_argument("--source", required=True)
    parser.add_argument("--kb-root", required=True)
    parser.add_argument("--chunk-size", type=int, default=1400)
    parser.add_argument("--chunk-overlap", type=int, default=200)
    parser.add_argument("--embedding-dim", type=int, default=384)
    args = parser.parse_args()

    source = Path(args.source)
    kb_root = Path(args.kb_root)
    client_root = kb_root / "_CLIENTES" / "edson-burger"
    raw_text_dir = client_root / "_raw_text"
    meta_dir = client_root / "_metadata"
    index_dir = client_root / "_index"

    ensure_dir(kb_root / "_AREAS")
    ensure_dir(client_root)
    ensure_dir(raw_text_dir)
    ensure_dir(meta_dir)
    ensure_dir(index_dir)

    db_path = index_dir / "kb_vectors.sqlite"
    conn = init_db(db_path)

    docs_jsonl = meta_dir / "documents.jsonl"
    chunks_jsonl = meta_dir / "chunks.jsonl"
    report_json = client_root / "ingest_report.json"

    supported, indexed, pending, failed = 0, 0, 0, 0
    docs_records = []
    chunks_records = []

    files = sorted([p for p in source.rglob("*") if p.is_file()])

    for path in files:
        ext = path.suffix.lower()
        rel = normalize_rel_path(path.relative_to(source).as_posix())
        size = path.stat().st_size
        mtime = path.stat().st_mtime

        if ext not in SUPPORTED_EXT:
            status = "pending" if ext in SKIP_EXT or ext else "pending"
            pending += 1
            docs_records.append({
                "source_path": str(path),
                "rel_path": rel,
                "ext": ext,
                "size_bytes": size,
                "mtime": mtime,
                "sha256": None,
                "text_path": None,
                "text_chars": 0,
                "chunks_count": 0,
                "status": status,
                "error": f"Extensão não suportada para ingestão: {ext}",
            })
            continue

        supported += 1
        sha = sha256_file(path)
        txt_out = raw_text_dir / (rel.replace("/", "__") + ".txt")
        ensure_dir(txt_out.parent)

        try:
            text = clean_text(extract_text(path))
            txt_out.write_text(text, encoding="utf-8")
            chunks = chunk_text(text, args.chunk_size, args.chunk_overlap)

            cur = conn.cursor()
            cur.execute("DELETE FROM chunks WHERE doc_id IN (SELECT id FROM documents WHERE source_path = ?)", (str(path),))
            cur.execute("DELETE FROM documents WHERE source_path = ?", (str(path),))
            cur.execute(
                """
                INSERT INTO documents (source_path, rel_path, ext, size_bytes, mtime, sha256, text_path, text_chars, chunks_count, status, error, indexed_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    str(path),
                    rel,
                    ext,
                    size,
                    mtime,
                    sha,
                    str(txt_out),
                    len(text),
                    len(chunks),
                    "indexed",
                    None,
                    datetime.now(timezone.utc).isoformat(),
                ),
            )
            doc_id = cur.lastrowid

            for i, ch in enumerate(chunks):
                emb = hash_embedding(ch, args.embedding_dim)
                cur.execute(
                    "INSERT INTO chunks (doc_id, chunk_idx, text, embedding, dim) VALUES (?, ?, ?, ?, ?)",
                    (doc_id, i, ch, emb.tobytes(), args.embedding_dim),
                )
                chunks_records.append({
                    "source_path": str(path),
                    "rel_path": rel,
                    "chunk_idx": i,
                    "chars": len(ch),
                })

            conn.commit()
            indexed += 1
            docs_records.append({
                "source_path": str(path),
                "rel_path": rel,
                "ext": ext,
                "size_bytes": size,
                "mtime": mtime,
                "sha256": sha,
                "text_path": str(txt_out),
                "text_chars": len(text),
                "chunks_count": len(chunks),
                "status": "indexed",
                "error": None,
            })
        except Exception as e:
            failed += 1
            conn.execute(
                """
                INSERT OR REPLACE INTO documents (source_path, rel_path, ext, size_bytes, mtime, sha256, text_path, text_chars, chunks_count, status, error, indexed_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    str(path), rel, ext, size, mtime, sha, None, 0, 0, "failed", str(e), datetime.now(timezone.utc).isoformat()
                ),
            )
            conn.commit()
            docs_records.append({
                "source_path": str(path),
                "rel_path": rel,
                "ext": ext,
                "size_bytes": size,
                "mtime": mtime,
                "sha256": sha,
                "text_path": None,
                "text_chars": 0,
                "chunks_count": 0,
                "status": "failed",
                "error": str(e),
            })

    with docs_jsonl.open("w", encoding="utf-8") as f:
        for rec in docs_records:
            f.write(json.dumps(rec, ensure_ascii=False) + "\n")

    with chunks_jsonl.open("w", encoding="utf-8") as f:
        for rec in chunks_records:
            f.write(json.dumps(rec, ensure_ascii=False) + "\n")

    report = {
        "source": str(source),
        "kb_root": str(kb_root),
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "total_files": len(files),
        "supported_files": supported,
        "indexed": indexed,
        "pending": pending,
        "failed": failed,
        "documents_jsonl": str(docs_jsonl),
        "chunks_jsonl": str(chunks_jsonl),
        "sqlite_index": str(db_path),
    }
    report_json.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")

    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
