# HAOS Native Skills — Regras por Agente

## Regra geral
- Skills nativas só podem ser usadas por agentes com escopo aderente.
- Skills com risco/suspeita só entram após auditoria + aprovação explícita do Gian.
- Toda execução relevante deve gerar evidência (log/resultado) e seguir HAOS_CONTRACT.

## Skills instaladas e responsáveis

### find-skills
- Dono: `orquestrador-haos`
- Apoio: `operations-director`
- Uso: descoberta de novas skills sob demanda.

### auto-updater
- Dono: `devops`
- Apoio: `orquestrador-haos`
- Uso: atualização controlada de OpenClaw/skills com janela definida.

### devlog-skill
- Dono: `sm`
- Apoio: `pm`, `orquestrador-haos`
- Uso: journaling operacional (progresso, pendências, evidências e status por fase).

### google-sheets
- Dono: `dashboard-engineer`
- Apoio: `analyst`, `pm`
- Uso: backlog leve, reports operacionais e input de dashboard.

### api-gateway
- Dono: `integration-engineer`
- Apoio: `automation-architect`, `dev`
- Uso: integrações padronizadas com APIs externas.

### trello-api
- Dono: `pm`
- Apoio: `sm`
- Uso: gestão de backlog e status de execução.

### atlassian-mcp
- Dono: `project-director`
- Apoio: `pm`, `sm`
- Uso: Jira/Confluence quando Atlassian for sistema de trabalho.

### github-api
- Dono: `dev`
- Apoio: `integration-engineer`, `devops`, `qa`
- Uso: repositórios, PRs, issues e versionamento técnico.

### notion
- Dono: `operations-director`
- Apoio: `pm`, `analyst`
- Uso: base operacional/documentação quando Notion for repositório ativo.

### n8n
- Dono: `automation-architect`
- Apoio: `integration-engineer`, `tracking-engineer`
- Uso: gestão de workflows e execuções de automação.

### webhook
- Dono: `integration-engineer`
- Apoio: `automation-architect`, `dev`
- Uso: entrada/saída de eventos com validação e confiabilidade.

## Skills descartadas por decisão (não instalar)
- `google-workspace-mcp`
- `jira`
- `github-issue-creator`

Status: descartadas por decisão do Gian neste momento.

## Skills em análise adicional
- `better-notion` (slug localizado no repositório oficial `openclaw/skills`; auditado LOW_RISK, manter restrito)

### analytics-tracking
- Dono: `tracking-engineer`
- Apoio: `attribution-analyst`, `traffic-master`
- Uso: planejamento/auditoria de mensuração, eventos, UTMs e GTM/GA4.

### slack-api
- Dono: `operations-director`
- Apoio: `orquestrador-haos`, `sm`
- Uso: integração operacional com Slack (mensagens/canais) quando explicitamente necessário.
- Guardrails: requer `MATON_API_KEY`; manter uso restrito e auditável devido dependência externa (`maton.ai`).

### playwright-browser-automation
- Dono: `qa`
- Apoio: `dev`, `tracking-engineer`
- Uso: QA e validação E2E com evidências.

### db-readonly
- Dono: `data-engineer`
- Apoio: `analyst`, `dashboard-engineer`
- Uso: inspeção segura read-only em bases.

### google-ads
- Dono: `traffic-master`
- Apoio: `attribution-analyst`, `tracking-engineer`
- Uso: operação e auditoria de Google Ads.

### web-perf
- Dono: `devops`
- Apoio: `ux`, `landing-page-specialist`, `qa`
- Uso: Core Web Vitals e performance operacional.

### email-marketing
- Dono: `crm-lifecycle-manager`
- Apoio: `copy-specialist`
- Uso: planejamento e execução de e-mail marketing.
## Skills adicionais ativas (SAFE) e donos
- summarize → `analyst` (apoio: `orquestrador-haos`, `review-lead`)
- assemblyai-transcribe → `video-producer` (apoio: `copy-specialist`)
- apify-competitor-intelligence → `strategy-director` (apoio: `social-intelligence-agent`)
- apify-ultimate-scraper → `social-intelligence-agent` (apoio: `analyst`)
- copywriting → `copy-specialist` (apoio: `landing-page-specialist`, `crm-lifecycle-manager`)
- marketing-strategy-pmm → `strategy-director` (apoio: `project-director`)
- meta-video-ad-deconstructor → `video-producer` (apoio: `designer-pro`)
- amplitude-automation → `data-engineer` (apoio: `analyst`)
- neondb-skill → `data-engineer` (apoio: `product-engineer-webapps`)
- sql-toolkit → `data-engineer` (apoio: `dev`, `integration-engineer`)
- production-readiness → `devops` (apoio: `qa`, `operations-director`)
- self-host → `devops` (apoio: `operations-director`)
- flyio-cli → `devops`
- deploy-on-render → `devops`
- marketing-mode → `strategy-director` (apoio: `copy-specialist`, `traffic-master`) ⚠️ restrito monitorado (instalado com --force por flag automática do ClawHub)
- gog → `operations-director` (apoio: `pm`) [alternativa Google Workspace]
- gogcli → `operations-director` (apoio: `pm`) [alternativa Google Workspace]
- clawbridge-skill-latest → `integration-engineer` (apoio: `automation-architect`)
- sql → `data-engineer` (apoio: `analyst`, `dashboard-engineer`)
- speak → `video-producer` (apoio: `copy-specialist`) [voice helper]
- local-whisper → `video-producer` (apoio: `copy-specialist`, `analyst`) [transcrição local/offline]
- prd-brainstorm → `orquestrador-haos` (apoio: `pm`, `project-director`, `strategy-director`) [pré-HAOS obrigatório quando Gian pedir desenho/estruturação antes de executar]

## Política de aprovação
1. Buscar skill e validar slug oficial.
2. Auditar segurança (prompt injection, exec vectors, exfil).
3. Aprovar explicitamente com Gian.
4. Instalar em nativo OpenClaw.
5. Registrar dono/escopo nesta política.
