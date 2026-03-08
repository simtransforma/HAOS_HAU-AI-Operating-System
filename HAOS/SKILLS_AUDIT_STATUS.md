# HAOS Skills Audit Status (Nativo OpenClaw)

Atualizado: 2026-03-03 20:25 BRT
Fonte detalhada: `HAOS/security-audit/pending-skills-batch-results.csv`

## Resumo do lote executado
- Auditadas no lote pendente: 43
- Instaladas em nativo (SAFE): 14
- Restritas (hold): 8
- Bloqueadas (hold): 8
- Não encontradas/bloqueadas no índice: 13

## 1) Instaladas e permitidas (SAFE)
- find-skills
- devlog-skill
- auto-updater
- atlassian-mcp
- notion
- webhook
- summarize
- assemblyai-transcribe
- apify-competitor-intelligence
- apify-ultimate-scraper
- copywriting
- marketing-strategy-pmm
- meta-video-ad-deconstructor
- amplitude-automation
- neondb-skill
- sql-toolkit
- production-readiness
- self-host
- flyio-cli
- deploy-on-render

## 2) Instaladas com uso restrito (aprovação por tarefa)
- slack-api
- trello-api
- github-api
- n8n
- canva
- figma
- figma-sync
- local-whisper
- meta-ads
- veo3-video-gen
- e2e-testing-patterns

## 3) Bloqueadas para produção (risco alto/crítico)
- api-gateway
- google-sheets
- google-workspace-mcp
- jira
- github-issue-creator
- cinematic-script-writer
- ga4-analytics-multi-property
- meta-ad-creatives
- meta-video-ad-analyzer
- supermetrics-openclawd
- transcriptapi

## 4) Não encontradas / slug não confirmado
- postgres
- voiceai-voiceover-creator (slug existe, mas auditado como CRITICAL)
- ad-ready (slug equivalente auditado: `ad-ready-pro`, CRITICAL)

## 6) Resolução por repositório oficial (fallback)
- analytics-tracking: encontrado em `openclaw/skills` (autor `rdewolff`), auditado SAFE e instalado no nativo.
- better-notion: encontrado em `openclaw/skills` (autor `tyler6204`), auditado LOW_RISK (findings=14), mantido como restrito/hold.

## 5) Slugs resolvidos na rodada adicional
- `playwright-browser-automation` → auditado SAFE e instalado nativo (com --force por flag automática)
- `db-readonly` → auditado SAFE e instalado nativo (com --force)
- `google-ads` → auditado SAFE e instalado nativo (com --force)
- `web-perf` → auditado SAFE e instalado nativo (com --force)
- `email-marketing-copy` → equivalente instalado: `email-marketing` (SAFE)
- `postiz-ext` → equivalente encontrado: `postiz` (LOW_RISK, restrito)
- `marketing-mode` → slug confirmado por link de diretório; auditoria local SAFE, instalado nativo com `--force` por gate automático do ClawHub (uso restrito monitorado)
- `ad-ready` → equivalente encontrado: `ad-ready-pro` (CRITICAL, bloqueado)

## Alternativas auditadas (rodada extra)
- SAFE instaladas: `gog`, `gogcli`, `clawbridge-skill-latest`, `sql`, `speak`
- RESTRITA: `instantdb` (LOW_RISK)
- BLOQUEADA: `google-sheets-api` (CRITICAL)

## Regra vigente
1. Instalar em pasta temporária
2. Auditar com `skill-auditor-v2`
3. Classificar (SAFE / RESTRITO / BLOQUEADO)
4. Aprovação explícita do Gian quando risco
5. Instalar no nativo + registrar em `HAOS/NATIVE_SKILLS_AGENT_RULES.md`
