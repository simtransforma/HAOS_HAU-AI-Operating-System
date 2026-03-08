#!/usr/bin/env python3
import argparse
import sqlite3
import numpy as np
import re
import hashlib


def hash_embedding(text: str, dim: int = 384) -> np.ndarray:
    vec = np.zeros(dim, dtype=np.float32)
    tokens = re.findall(r"\w+", text.lower())
    for tok in tokens:
        h = int(hashlib.md5(tok.encode("utf-8")).hexdigest(), 16)
        idx = h % dim
        sign = -1.0 if (h >> 8) & 1 else 1.0
        vec[idx] += sign
    norm = np.linalg.norm(vec)
    if norm > 0:
        vec /= norm
    return vec


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--db", required=True)
    ap.add_argument("--query", required=True)
    ap.add_argument("--topk", type=int, default=5)
    args = ap.parse_args()

    q = hash_embedding(args.query)
    conn = sqlite3.connect(args.db)
    cur = conn.cursor()
    cur.execute("""
        SELECT d.rel_path, c.chunk_idx, c.text, c.embedding, c.dim
        FROM chunks c
        JOIN documents d ON d.id = c.doc_id
        WHERE d.status='indexed'
    """)

    scored = []
    for rel_path, chunk_idx, text, emb_blob, dim in cur.fetchall():
        emb = np.frombuffer(emb_blob, dtype=np.float32, count=dim)
        score = float(np.dot(q[:dim], emb))
        scored.append((score, rel_path, chunk_idx, text[:400]))

    scored.sort(key=lambda x: x[0], reverse=True)
    for s, rel, idx, preview in scored[: args.topk]:
        print(f"[{s:.4f}] {rel} :: chunk {idx}\n{preview}\n")


if __name__ == "__main__":
    main()
