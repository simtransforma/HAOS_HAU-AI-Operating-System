# HAOS OpenClaw Operations Guide

> Documento operacional que define como o HAOS v2 funciona dentro do OpenClaw.
> Source of truth para orquestração de sub-agentes.

## Ambiente

- **Plataforma:** OpenClaw 2026.3.13 (Abacus.AI)
- **Orquestrador:** main (Abaclaw ⚡) — Claude Opus 4.6
- **Total de agentes:** 28 (main + 27 HAOS)
- **Sub-agentes simultâneos:** até 8
- **Profundidade máxima:** 2 (main → orchestrator → workers)
- **Timeout por sub-agente:** 900s (15 min)

## Mapeamento de Tiers

| Tier | Modelo | Agentes | Custo |
|------|--------|---------|-------|
| 0 | claude-opus-4-6 | dev | $$$ |
| 1 | claude-sonnet-4-6 | orquestrador-haos, project-director, operations-director, strategy-director, architect | $$ |
| 2 | claude-haiku-4-5 | product-engineer-webapps, integration-engineer, devops, data-engineer, tracking-engineer, automation-architect, dashboard-engineer, landing-page-specialist | $ |
| 3 | kimi-k2.5 | analyst, attribution-analyst, copy-specialist, designer-pro, video-producer, crm-lifecycle-manager, social-intelligence-agent | ¢ |
| 4 | gemini-3-flash-preview | pm, sm, review-lead, qa, ux, traffic-master | ¢ |

## Roteamento de Entrada (preservado do HAOS v2)

| Gatilho | Modo | Ação do main |
|---------|------|--------------|
| `#` no início | Rito HAOS v2 | Pipeline completo com sub-agentes |
| `@agente` sem `#` | Consulta dirigida | Spawn do agente específico |
| `@departamento` sem `#` | Consulta departamental | Spawn de agentes do departamento |
| Sem `#` nem `@` | Modo direto | main responde diretamente |

## Como o main orquestra sub-agentes

### Spawn de agente individual
```
sessions_spawn(
  agentId: "tracking-engineer",
  task: "[HAOS][EXECUCAO] Implementar GTM container...",
  model: "abacus/claude-haiku-4-5",  // herda do agent config
  label: "tracking-engineer"
)
```

### Spawn paralelo (squad)
```
// 3 conselheiros em paralelo para CONSELHO-Fase1
sessions_spawn(agentId: "project-director", task: "...", label: "conselho-pd")
sessions_spawn(agentId: "strategy-director", task: "...", label: "conselho-sd")
sessions_spawn(agentId: "architect", task: "...", label: "conselho-arch")
// Depois: sessions_yield() para aguardar resultados
```

### Formato de task para sub-agentes
```
[HAOS][ETAPA] Objetivo claro

## Contexto
- Task: HAOS-XXXX
- Fase: CONSELHO-Fase1 / EXECUCAO / etc.
- Solicitante: Gian
- Escopo: ...

## Entradas
- ...

## Saídas esperadas
- ...

## Critério de pronto
- ...

## Formato de reporte obrigatório
[timestamp][modelo llm][etapa][agente][ação][evidência][status/bloqueio]
```

## Rito v2 Completo — Fluxo de Orquestração

### 1. ABERTURA
- main recebe pedido com `#`
- main define: objetivo, escopo, restrições, DoD
- main cria task no runtime: `cd ~/haos-runtime/HAOS && node scripts/new-task.js`

### 2. CONSELHO-Fase1
- main spawna em paralelo: project-director + strategy-director + architect
- Cada um debate risco, contexto, alternativas
- main consolida respostas → produz bloco de perguntas → envia ao Gian
- Atualiza task: `node scripts/council.js -- HAOS-XXXX --mode=phase1`

### 3. REPORT-SOLICITANTE
- Gian responde as perguntas
- main registra resposta na task
- Atualiza: `node scripts/update-task.js -- HAOS-XXXX --set solicitanteReplyRef=...`

### 4. CONSELHO-Fase2
- main spawna novamente o conselho com a resposta do Gian
- Define direção, rota, critérios de sucesso
- Atualiza: `node scripts/council.js -- HAOS-XXXX --mode=phase2`

### 5. MEGA_BRAIN
- main produz síntese executiva única (pode usar sub-agente orquestrador-haos)

### 6. DIRETOR
- Spawn: project-director → plano operacional com critérios de aceite

### 7. ESTRATEGISTA
- Spawn: strategy-director → ordem de testes/árvore de decisão

### 8. EXECUCAO
- main spawna squad especialista em paralelo (até 5 workers)
- Cada agente executa seu pacote com evidência
- main monitora via `subagents list` quando necessário
- **GATE OBRIGATÓRIO DE EXECUCAO (não negociável):**
  1. Agente entrega build/código OK → **não marca DONE ainda**
  2. Se a tarefa envolve deploy (VPS, Vercel, Render, etc): deploy deve ser executado E confirmado pelo agente
  3. Após deploy: **evidência visual obrigatória** (screenshot, curl, browser check)
  4. Só após evidência visual positiva o agente marca `DONE` e repassa ao main
  5. Se evidência falhar → agente reporta `REWORK` com causa raiz, não marca DONE
- **main NUNCA marca EXECUCAO como concluída sem evidência visual do agente**

### 8.1. REPORTS DURANTE O RITO (obrigatório)
- Cada sub-agente ao completar sua etapa envia reporte no formato:
  `[timestamp][modelo][etapa][agente][ação][evidência][status]`
- **main DEVE repassar cada report ao Gian no chat** — não silenciar
- Formato de repasse ao Gian:
  ```
  ✅ [agente] — [etapa]
  [linha de reporte do agente]
  ```
- main não avança para próxima etapa sem confirmar ao Gian que a anterior foi concluída
- Se sub-agente falhar, main reporta imediatamente: `❌ [agente] — BLOQUEADO: [motivo]`

### 9. VALIDACAO
- Spawn: review-lead + qa → validam critérios
- Atualiza: `node scripts/review.js -- HAOS-XXXX approve|reject`
- **GATE: validação inclui teste funcional real (não só code review)**
- review-lead/qa devem verificar o produto no ambiente de produção, não só localmente

### 10. CONSELHO_SE_REPROVADO (se necessário)
- Spawn: conselho debate correção
- Volta pra MEGA_BRAIN (máx 3 ciclos)

### 11. CONSELHO_Final_Aprovado
- Spawn: conselho dá go/no-go formal

### 12. ENTREGA
- main consolida resultado + evidências

### 13. REGISTRO
- main registra em vault + memory/
- Confirma no chat com caminho do registro

## Mega-Brain — Adaptação OpenClaw

### Comandos que viram tasks de sub-agentes
| Comando Mega-Brain | Adaptação OpenClaw |
|---|---|
| /conclave | Spawn 3 agentes em paralelo (crítico + advogado do diabo + sintetizador) |
| /debate | Spawn 2+ agentes com posições opostas |
| /ask | Spawn agente específico com pergunta |
| /ingest | Spawn analyst para processar e indexar conteúdo |
| /extract-dna | Spawn analyst + strategy-director para extrair padrões |
| /benchmark | Spawn analyst + social-intelligence para comparação |
| /verify | Spawn qa + review-lead para validação |

### Conclave (debate multiagente)
Quando o main precisa de decisão de alta qualidade:
1. Spawn project-director (perspectiva de execução)
2. Spawn strategy-director (perspectiva estratégica)
3. Spawn architect (perspectiva técnica)
4. main sintetiza as 3 visões e decide

### Workflows adaptados
Os workflows YAML do Mega-Brain (`core/workflows/`) viram sequências de spawn:
- `wf-conclave.yaml` → spawn paralelo de conselheiros
- `wf-ingest.yaml` → spawn de analyst + data-engineer em sequência
- `wf-extract-dna.yaml` → spawn de analyst para extração
- `wf-pipeline-full.yaml` → rito v2 completo

## Departamentos — Padrão de Spawn

### @orquestracao
```
spawn(agentId: "sm", task: "...", label: "sm")
spawn(agentId: "pm", task: "...", label: "pm")
```

### @conselho
```
spawn(agentId: "project-director", ...)
spawn(agentId: "operations-director", ...)
spawn(agentId: "strategy-director", ...)
spawn(agentId: "architect", ...)
```

### @dados
```
spawn(agentId: "tracking-engineer", ...)
spawn(agentId: "attribution-analyst", ...)
spawn(agentId: "data-engineer", ...)
spawn(agentId: "dashboard-engineer", ...)
spawn(agentId: "analyst", ...)
```

### @criativo
```
spawn(agentId: "copy-specialist", ...)
spawn(agentId: "designer-pro", ...)
spawn(agentId: "video-producer", ...)
```

### @funnel
```
spawn(agentId: "automation-architect", ...)
spawn(agentId: "crm-lifecycle-manager", ...)
spawn(agentId: "landing-page-specialist", ...)
```

### @produto
```
spawn(agentId: "dev", ...)
spawn(agentId: "product-engineer-webapps", ...)
spawn(agentId: "integration-engineer", ...)
spawn(agentId: "devops", ...)
spawn(agentId: "ux", ...)
```

## Storage Rules (adaptado para Linux)

| Propósito | Path |
|-----------|------|
| Credenciais | ~/.env |
| Runtime HAOS | ~/haos-runtime/HAOS/ |
| State de tasks | ~/haos-runtime/HAOS/runtime/state/tasks.json |
| Reports | ~/haos-runtime/HAOS/runtime/reports/ |
| Vault HAOS | ~/haos-runtime/HAOS/vault/ |
| Memory diária | ~/memory/YYYY-MM-DD.md |
| Memory longa | ~/MEMORY.md |
| Projetos HAOS | ~/haos-runtime/HAOS/projetos/ |
| KB | ~/haos-runtime/HAOS/KB/ |
| Workspaces agentes | ~/.openclaw/haos-workspaces/<agent>/ |

---

## Mega-Brain — Sistema de Conhecimento

### Comandos
| Comando | Função |
|---|---|
| `mb:briefing` | Health score + status do sistema |
| `mb:ingest [url/path]` | Ingerir material (YouTube, PDF, texto) |
| `mb:scan` | Listar inbox pendente |
| `mb:process` | Pipeline 8 fases |
| `mb:extract-dna [pessoa]` | DNA cognitivo 5 camadas |
| `mb:ask [agente] [pergunta]` | Consulta com DNA aplicado |
| `mb:conclave [decisão]` | Conselho estratégico completo |
| `mb:dossier [pessoa]` | Dossiê de especialista |

### Paths
```
Base:    ~/.openclaw/haos-workspaces/orquestrador-haos/mega-brain/
Core:    ~/haos-runtime/HAOS/core-base/mega-brain/
Python:  /opt/computersetup/.pyenv/versions/3.11.6/bin/python3
yt-dlp:  ~/.local/bin/yt-dlp
```

### Uso no rito v2
- Etapa 3 (Briefing): `mb:briefing`
- Etapa 7 (Decisão): `mb:conclave "[decisão]"` quando risco alto
- Etapa 12 (Fechamento): indexar aprendizados
