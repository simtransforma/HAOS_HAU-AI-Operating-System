# KB Index - Cliente: edson-burger

> Status: **inicial** (sem corpus dedicado confirmado neste repositório até o momento)

## Resumo inicial
Este índice consolida conhecimento específico do cliente **edson-burger**.

No estado atual, a estrutura está preparada para receber documentos/chunks com:
- `metadata.cliente = "edson-burger"`
- classificação por `area` (ex.: tráfego, CRM, operação, produto)
- classificação por `tipo` (ex.: playbook, relatório, checklist, briefing)

## Padrão mínimo para ingestão
```json
{
  "path": "clientes/edson-burger/...",
  "text": "trecho relevante...",
  "embedding": ["..."],
  "metadata": {
    "cliente": "edson-burger",
    "area": "...",
    "tipo": "..."
  }
}
```

## Como consultar após ingestão
```bash
node scripts/kb-search.js \
  --query "campanha de conversão" \
  --cliente edson-burger \
  --area trafego \
  --tipo playbook \
  --k 5
```

## Próximos passos
1. Indexar os materiais do cliente no vetor global (`KB/vector-index.json` ou equivalente).
2. Validar cobertura por área crítica (tráfego, CRM, conteúdo, operação).
3. Atualizar este índice com links e resumos por tema.
