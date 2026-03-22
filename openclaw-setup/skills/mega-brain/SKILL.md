# SKILL.md — Mega Brain (adaptado para OpenClaw/HAOS)

## Descrição
Sistema de gestão de conhecimento do HAOS. Ingere materiais de especialistas (vídeos, PDFs, transcrições), processa em pipeline semântico e disponibiliza via Conclave (conselho estratégico), DNA Cognitivo e consultas por agente.

Adaptado de `core-base/mega-brain` para rodar via OpenClaw sem Claude Code.

---

## Comandos disponíveis

Acionar via chat com o orquestrador:

| Comando | O que faz |
|---|---|
| `mb:briefing` | Status operacional do sistema (health score, materiais, pendências) |
| `mb:ingest [url ou path]` | Ingere material na inbox (YouTube, PDF, texto) |
| `mb:process` | Processa inbox pelo pipeline de 8 fases |
| `mb:extract-dna [pessoa]` | Extrai DNA cognitivo de especialista (5 camadas) |
| `mb:ask [agente] [pergunta]` | Consulta agente com DNA aplicado |
| `mb:conclave [decisão]` | Sessão completa do Conselho (Crítico + Advogado + Sintetizador) |
| `mb:scan` | Lista materiais na inbox aguardando processamento |
| `mb:dossier [pessoa]` | Gera dossiê completo de especialista |

---

## Quando usar esta skill

Carregar quando o usuário acionar qualquer comando `mb:*` ou pedir:
- "ingerir material", "processar conteúdo", "extrair DNA"
- "Conselho estratégico", "conclave", "debate"
- "o que o Hormozi pensa sobre X", "consultar agente"
- "status do Mega Brain", "health score"

---

## Estrutura de dados

```
<workspace>/mega-brain/
├── inbox/                    ← materiais aguardando processamento
│   └── <pessoa>/<arquivo>.md
├── knowledge/
│   ├── dossiers/             ← dossiês compilados por especialista
│   ├── playbooks/            ← playbooks gerados
│   ├── insights/             ← insights indexados
│   └── dna/                  ← DNA cognitivo extraído
├── state/
│   ├── STATE.json            ← estado global do sistema
│   ├── PENDING.md            ← pendências
│   └── INSIGHTS-STATE.json   ← insights acumulados
└── reports/                  ← briefings e relatórios
```

Base: `~/.openclaw/haos-workspaces/orquestrador-haos/mega-brain/`

---

## Referências normativas
- Pipeline completo: [pipeline.md](references/pipeline.md)
- Conclave: [conclave.md](references/conclave.md)
- DNA Cognitivo: [dna.md](references/dna.md)
- Comandos originais: `~/haos-runtime/HAOS/core-base/mega-brain/.claude/commands/`
