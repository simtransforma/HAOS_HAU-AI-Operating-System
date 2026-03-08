#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
KB = ROOT / 'KB'
OUT = KB / 'vector-index.json'

# Fonte canônica do índice público para evitar drift de docs periféricos/legados.
include_files = [
    'README.md',
    'HAOS_MASTER_SCOPE.md',
    'HAOS_CONTRACT.md',
    'HAOS_PIPELINE.md',
    'HAOS_RACI.md',
    'HAOS_HANDOFFS.md',
    'HAOS_RUNBOOK.md',
    'HAOS_AGENT_MAP_V1.md',
    'HAOS_AGENT_REGISTRY.md',
    'HAOS_SYSTEM_MAP.md',
]

include_globs = [
    'agents/*/PROMPT.md',
    'agents/*/PLAYBOOK.md',
    'agents/*/AGENT_SPEC.md',
    'agents/*/IO_CONTRACT.md',
]

records = []

for rel_file in include_files:
    p = ROOT / rel_file
    if not p.is_file():
        continue
    try:
        text = p.read_text(encoding='utf-8', errors='ignore').strip()
    except Exception:
        continue
    if not text:
        continue
    records.append({
        'path': p.relative_to(ROOT).as_posix(),
        'text': text[:4000],
        'metadata': {'area': 'haos', 'cliente': 'global', 'tipo': 'doc'}
    })

for g in include_globs:
    for p in sorted(ROOT.glob(g)):
        if not p.is_file():
            continue
        try:
            text = p.read_text(encoding='utf-8', errors='ignore').strip()
        except Exception:
            continue
        if not text:
            continue
        records.append({
            'path': p.relative_to(ROOT).as_posix(),
            'text': text[:4000],
            'metadata': {'area': 'haos', 'cliente': 'global', 'tipo': 'doc'}
        })

records.sort(key=lambda r: r['path'])
KB.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'ok': True, 'items': len(records), 'out': str(OUT)}, ensure_ascii=False))
