# KB Index Global (HAOS)

> Status: **inicial** (estrutura criada para busca semântica + filtros)

## Objetivo
Centralizar o mapa da base de conhecimento do HAOS para consulta rápida por:
- `area`
- `cliente`
- `tipo`

Este índice é complementar ao índice vetorial JSON usado por `scripts/kb-search.js`.

## Estrutura sugerida de metadados no índice vetorial
Cada chunk/documento deve carregar (quando possível):

```json
{
  "path": "caminho/arquivo.md",
  "text": "trecho...",
  "embedding": [0.012, -0.003, "..."],
  "metadata": {
    "area": "operacoes|tracking|dev|crm|...",
    "cliente": "global|template",
    "tipo": "runbook|playbook|prompt|spec|report|..."
  }
}
```

## Mapa inicial (seed)
- **Núcleo HAOS**
  - Contratos e governança: `HAOS_CONTRACT.md`, `HAOS_RACI.md`, `HAOS_RUNBOOK.md`
  - Pipeline e sistema: `HAOS_PIPELINE.md`, `HAOS_SYSTEM_MAP.md`
- **Agents**
  - Especificações e prompts por função em `agents/*`
- **Core Base / Mega Brain**
  - Templates, schemas e comandos em `core-base/mega-brain/*`
- **Runtime**
  - Relatórios em `runtime/reports/*`

## Próximos passos recomendados
1. Gerar/atualizar `KB/vector-index.json` com embeddings + metadados.
2. Garantir preenchimento consistente de `area`, `cliente` e `tipo`.
3. Expandir este arquivo com links por domínio e por domínio.

