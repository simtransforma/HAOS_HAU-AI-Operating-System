#!/usr/bin/env python3
import argparse
import csv
import hashlib
import json
import re
import sqlite3
import unicodedata
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List, Tuple

import numpy as np

SUPPORTED_EXT = {".pdf", ".docx", ".txt", ".csv", ".xlsx", ".xls"}
TARGET_AREAS = [
    "copy",
    "marketing",
    "vendas",
    "leads",
    "dash",
    "devops",
    "dpm",
    "pesquisa",
    "historico-edson",
]

AREA_MAP = {
    "copy": "copy",
    "marketing": "marketing",
    "vendas": "vendas",
    "leads": "leads",
    "dash": "dash",
    "devops": "devops",
    "dpm": "dpm",
    "pesquisa": "pesquisa",
    "historico edson": "historico-edson",
    "historico-edson": "historico-edson",
}


def ensure_dir(path: Path):
    path.mkdir(parents=True, exist_ok=True)


def normalize_name(s: str) -> str:
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = s.replace("_", " ").replace("-", " ")
    s = re.sub(r"\s+", " ", s).strip().lower()
    return s


def clean_text(text: str) -> str:
    text = text.replace("\x00", " ")
    text = re.sub(r"\r\n?", "\n", text)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


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
    if db_path.exists():
        db_path.unlink()
    conn = sqlite3.connect(db_path)
    conn.execute(
        """
        CREATE TABLE documents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            area TEXT,
            source_path TEXT,
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
        CREATE TABLE chunks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            doc_id INTEGER,
            area TEXT,
            chunk_idx INTEGER,
            text TEXT,
            embedding BLOB,
            dim INTEGER,
            FOREIGN KEY(doc_id) REFERENCES documents(id)
        )
        """
    )
    conn.execute("CREATE INDEX idx_chunks_area ON chunks(area)")
    conn.execute("CREATE INDEX idx_chunks_doc ON chunks(doc_id)")
    conn.commit()
    return conn


def map_area(rel_path: Path) -> str:
    first = rel_path.parts[0] if rel_path.parts else ""
    mapped = AREA_MAP.get(normalize_name(first), "")
    if mapped:
        return mapped
    # Regra operacional: itens soltos na raiz da fonte entram em DPM.
    if len(rel_path.parts) == 1:
        return "dpm"
    return ""


def ingest_area(area: str, files: List[Path], source: Path, area_root: Path, chunk_size: int, chunk_overlap: int, dim: int):
    raw_text_dir = area_root / "_raw_text"
    meta_dir = area_root / "_metadata"
    index_dir = area_root / "_index"
    ensure_dir(raw_text_dir)
    ensure_dir(meta_dir)
    ensure_dir(index_dir)

    db_path = index_dir / "kb_vectors.sqlite"
    conn = init_db(db_path)

    docs_records = []
    chunks_records = []
    indexed = pending = failed = supported = 0

    for path in files:
        rel = path.relative_to(source)
        rel_str = rel.as_posix()
        ext = path.suffix.lower()
        size = path.stat().st_size
        mtime = path.stat().st_mtime

        if ext not in SUPPORTED_EXT:
            pending += 1
            docs_records.append({
                "area": area,
                "source_path": str(path),
                "rel_path": rel_str,
                "ext": ext,
                "size_bytes": size,
                "mtime": mtime,
                "sha256": None,
                "text_path": None,
                "text_chars": 0,
                "chunks_count": 0,
                "status": "pending",
                "error": f"Extensão não suportada para ingestão: {ext}",
            })
            continue

        supported += 1
        sha = sha256_file(path)
        txt_out = raw_text_dir / (rel_str.replace("/", "__") + ".txt")

        try:
            text = clean_text(extract_text(path))
            txt_out.write_text(text, encoding="utf-8")
            chunks = chunk_text(text, chunk_size, chunk_overlap)

            cur = conn.cursor()
            cur.execute(
                """
                INSERT INTO documents (area, source_path, rel_path, ext, size_bytes, mtime, sha256, text_path, text_chars, chunks_count, status, error, indexed_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    area,
                    str(path),
                    rel_str,
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
                emb = hash_embedding(ch, dim)
                cur.execute(
                    "INSERT INTO chunks (doc_id, area, chunk_idx, text, embedding, dim) VALUES (?, ?, ?, ?, ?, ?)",
                    (doc_id, area, i, ch, emb.tobytes(), dim),
                )
                chunks_records.append({
                    "area": area,
                    "source_path": str(path),
                    "rel_path": rel_str,
                    "chunk_idx": i,
                    "chars": len(ch),
                    "text": ch,
                })

            conn.commit()
            indexed += 1
            docs_records.append({
                "area": area,
                "source_path": str(path),
                "rel_path": rel_str,
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
                INSERT INTO documents (area, source_path, rel_path, ext, size_bytes, mtime, sha256, text_path, text_chars, chunks_count, status, error, indexed_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    area,
                    str(path),
                    rel_str,
                    ext,
                    size,
                    mtime,
                    sha,
                    None,
                    0,
                    0,
                    "failed",
                    str(e),
                    datetime.now(timezone.utc).isoformat(),
                ),
            )
            conn.commit()
            docs_records.append({
                "area": area,
                "source_path": str(path),
                "rel_path": rel_str,
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

    docs_jsonl = meta_dir / "documents.jsonl"
    chunks_jsonl = meta_dir / "chunks.jsonl"
    report_json = area_root / "ingest_report.json"

    with docs_jsonl.open("w", encoding="utf-8") as f:
        for rec in docs_records:
            f.write(json.dumps(rec, ensure_ascii=False) + "\n")

    with chunks_jsonl.open("w", encoding="utf-8") as f:
        for rec in chunks_records:
            f.write(json.dumps(rec, ensure_ascii=False) + "\n")

    report = {
        "area": area,
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
    conn.close()

    return docs_records, chunks_records, report


def build_global_index(areas_root: Path, all_docs: List[dict], all_chunks: List[dict], dim: int):
    global_root = areas_root / "_global"
    ensure_dir(global_root / "_metadata")
    ensure_dir(global_root / "_index")

    docs_jsonl = global_root / "_metadata" / "documents.jsonl"
    chunks_jsonl = global_root / "_metadata" / "chunks.jsonl"
    db_path = global_root / "_index" / "kb_vectors.sqlite"
    report_json = global_root / "ingest_report.json"

    with docs_jsonl.open("w", encoding="utf-8") as f:
        for rec in all_docs:
            f.write(json.dumps(rec, ensure_ascii=False) + "\n")

    with chunks_jsonl.open("w", encoding="utf-8") as f:
        for rec in all_chunks:
            f.write(json.dumps(rec, ensure_ascii=False) + "\n")

    conn = init_db(db_path)
    cur = conn.cursor()

    docid_map: Dict[Tuple[str, str], int] = {}
    for rec in all_docs:
        cur.execute(
            """
            INSERT INTO documents (area, source_path, rel_path, ext, size_bytes, mtime, sha256, text_path, text_chars, chunks_count, status, error, indexed_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                rec.get("area"),
                rec.get("source_path"),
                rec.get("rel_path"),
                rec.get("ext"),
                rec.get("size_bytes", 0),
                rec.get("mtime", 0),
                rec.get("sha256"),
                rec.get("text_path"),
                rec.get("text_chars", 0),
                rec.get("chunks_count", 0),
                rec.get("status"),
                rec.get("error"),
                datetime.now(timezone.utc).isoformat(),
            ),
        )
        docid_map[(rec.get("area", ""), rec.get("source_path", ""))] = cur.lastrowid

    for rec in all_chunks:
        key = (rec.get("area", ""), rec.get("source_path", ""))
        doc_id = docid_map.get(key)
        if not doc_id:
            continue
        emb = hash_embedding(rec.get("text", ""), dim)
        cur.execute(
            "INSERT INTO chunks (doc_id, area, chunk_idx, text, embedding, dim) VALUES (?, ?, ?, ?, ?, ?)",
            (doc_id, rec.get("area"), rec.get("chunk_idx", 0), rec.get("text", ""), emb.tobytes(), dim),
        )

    conn.commit()
    conn.close()

    indexed = sum(1 for d in all_docs if d.get("status") == "indexed")
    pending = sum(1 for d in all_docs if d.get("status") == "pending")
    failed = sum(1 for d in all_docs if d.get("status") == "failed")

    report = {
        "scope": "global-areas",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "total_documents": len(all_docs),
        "indexed": indexed,
        "pending": pending,
        "failed": failed,
        "documents_jsonl": str(docs_jsonl),
        "chunks_jsonl": str(chunks_jsonl),
        "sqlite_index": str(db_path),
    }
    report_json.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    return report


def main():
    parser = argparse.ArgumentParser(description="Ingestão KB Edson por Áreas")
    parser.add_argument("--source", required=True)
    parser.add_argument("--areas-root", required=True)
    parser.add_argument("--chunk-size", type=int, default=1400)
    parser.add_argument("--chunk-overlap", type=int, default=200)
    parser.add_argument("--embedding-dim", type=int, default=384)
    args = parser.parse_args()

    source = Path(args.source)
    areas_root = Path(args.areas_root)
    ensure_dir(areas_root)

    all_files = [p for p in source.rglob("*") if p.is_file()]
    by_area: Dict[str, List[Path]] = {a: [] for a in TARGET_AREAS}

    ignored = []
    for p in all_files:
        rel = p.relative_to(source)
        area = map_area(rel)
        if area in by_area:
            by_area[area].append(p)
        else:
            ignored.append(rel.as_posix())

    all_docs = []
    all_chunks = []
    area_reports = {}

    for area in TARGET_AREAS:
        files = sorted(by_area[area])
        area_root = areas_root / area
        docs_records, chunks_records, report = ingest_area(
            area,
            files,
            source,
            area_root,
            args.chunk_size,
            args.chunk_overlap,
            args.embedding_dim,
        )

        all_docs.extend(docs_records)
        all_chunks.extend(chunks_records)
        area_reports[area] = report

    global_report = build_global_index(areas_root, all_docs, all_chunks, args.embedding_dim)

    summary = {
        "source": str(source),
        "areas_root": str(areas_root),
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "areas": area_reports,
        "global": global_report,
        "ignored_unmapped_relpaths": ignored,
    }

    (areas_root / "ingest_report_areas.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(json.dumps(summary, ensure_ascii=True, indent=2))


if __name__ == "__main__":
    main()
