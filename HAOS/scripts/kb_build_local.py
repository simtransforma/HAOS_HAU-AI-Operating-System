#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
KB = ROOT / 'KB'
OUT = KB / 'vector-index.json'

include_globs = [
    'HAOS_*.md',
    'README.md',
    'agents/*/PROMPT.md',
    'agents/*/PLAYBOOK.md',
    'agents/*/AGENT_SPEC.md',
    'agents/*/IO_CONTRACT.md',
]

records = []
for g in include_globs:
    for p in ROOT.glob(g):
        if not p.is_file():
            continue
        try:
            text = p.read_text(encoding='utf-8', errors='ignore').strip()
        except Exception:
            continue
        if not text:
            continue
        snippet = text[:4000]
        rel = p.relative_to(ROOT).as_posix()
        records.append({
            'path': rel,
            'text': snippet,
            'metadata': {
                'area': 'haos',
                'cliente': 'global',
                'tipo': 'doc'
            }
        })

KB.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'ok': True, 'items': len(records), 'out': str(OUT)}, ensure_ascii=False))
