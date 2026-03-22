# HAOS — Manual Completo de Uso
**Sistema Operacional de IA da Sociedade Internacional do Mindset**
Versão: 2026.03 | Ambiente: OpenClaw (Abacus)

---

## O QUE É O HAOS?

O HAOS (HAU AI Operating System) é um sistema multi-agente de IA que transforma tarefas complexas em execuções estruturadas com 26 especialistas em paralelo.

Pensa assim:
- Você é o CEO
- **Abaclaw** (main) é seu chefe de gabinete — recebe tudo, roteia, orquestra
- Os **26 agentes** são especialistas reais (dev, copy, dados, estratégia, etc.)
- O **rito v2** é o processo que garante qualidade em qualquer entrega

Você não precisa gerenciar os agentes. Só precisa saber como falar com o sistema.

---

## LÓGICA DE ROTEAMENTO — 3 modos de entrada

Esta é a regra mais importante de todo o sistema:

```
╔══════════════════════════════════════════════════════╗
║  Começa com #    → Rito HAOS v2 completo             ║
║  Sem # + @agente → Consulta direta ao especialista   ║
║  Sem # sem @     → Abaclaw responde diretamente      ║
╚══════════════════════════════════════════════════════╝
```

**O rito NUNCA abre por inferência. Só abre com `#` no início.**

---

## MODO 1 — DIRETO (sem prefixo)

Para conversas, perguntas, dúvidas rápidas e tarefas simples.

```
Exemplo:
  "qual a diferença entre CPC e CPM?"
  "me explica o pipeline de dados do HAOS"
  "como funciona o conclave?"
  "lista as integrações disponíveis"
```

**Abaclaw responde diretamente, sem spawn de sub-agentes.**
Rápido, eficiente, sem overhead do rito.

---

## MODO 2 — ESPECIALISTA (com @agente ou @departamento)

Para consultar um especialista específico sem abrir o rito completo.
Útil para debater, pedir análise, segunda opinião ou briefing técnico.

### Por agente individual:

```
@dev "como estruturar a autenticação JWT nesse sistema?"
@copy-specialist "escreve um hook de abertura para esse vídeo de VSL"
@tracking-engineer "como configurar CAPI do Meta para esse e-commerce?"
@analyst "analisa os dados abaixo e me diz o padrão"
@strategy-director "qual abordagem de posicionamento faz mais sentido?"
```

### Por departamento inteiro:

```
@conselho "preciso de perspectiva estratégica sobre esse pivô"
@dados "preciso entender por que o CAC aumentou 40%"
@criativo "ideias de ângulo criativo para campanha de lançamento"
@funnel "como estruturar o funil de lançamento high-ticket?"
@produto "arquitetura para esse novo módulo do app"
@orquestracao "quero um diagnóstico operacional do projeto X"
```

---

## MODO 3 — RITO HAOS v2 (começa com #)

Para qualquer tarefa que precisa de execução real, entrega documentada e qualidade garantida.

```
# criar landing page para produto X com copy + estrutura + aprovação
# montar estratégia de tráfego para lançamento de R$500k
# configurar pipeline de dados GA4 → dashboard → relatório automático
# refatorar o sistema de autenticação com cobertura de testes
# criar campanha completa: copy + criativos + segmentação + tracking
```

**O rito só começa se a mensagem começar com `#`.**

---

## O RITO v2 — O QUE ACONTECE POR BAIXO

Quando você usa `#`, o sistema segue estas 13 etapas automaticamente:

```
ABERTURA
   ↓
CONSELHO Fase 1 → [perguntas para você]
   ↓
REPORT-SOLICITANTE → [você responde]
   ↓
CONSELHO Fase 2 → [decisão de rota]
   ↓
MEGA BRAIN → [síntese executiva]
   ↓
DIRETOR → [plano operacional]
   ↓
ESTRATEGISTA → [ordem de execução]
   ↓
EXECUÇÃO → [agentes especialistas em paralelo]
   ↓
VALIDAÇÃO → [QA + Review Lead aprovam ou reprovam]
   ↓
   ├── REPROVADO → Conselho de correção (máx 3x)
   └── APROVADO → Conselho Final
                    ↓
                  ENTREGA
                    ↓
                  REGISTRO → [documentação + Obsidian]
```

### Os 6 Gates (pontos de controle)

| Gate | Quando | Bloqueia se |
|---|---|---|
| **Gate A** | Após CONSELHO Fase 1 | Não fez perguntas ou você não respondeu |
| **Gate B** | Após CONSELHO Fase 2 | Sem decisão formal de rota |
| **Gate C** | Validação | QA ou Review Lead reprovaram |
| **Gate R** | Correção pós-reprovação | Mais de 3 ciclos de retrabalho |
| **Gate F** | Conselho Final | Go/No-go não fechado |
| **Gate DONE** | Entrega + Registro | Sem evidência ou documentação |

**Importante:** Gates `hard` bloqueiam tudo. Gates `soft` podem avançar com justificativa explícita registrada.

---

## OS 26 AGENTES — QUEM FAZ O QUÊ

### @orquestracao — Gestão do projeto

| Agente | Função | Modelo |
|---|---|---|
| `@orquestrador-haos` | Coordena execução, delega, sintetiza | Sonnet |
| `@sm` | Scrum master, remove bloqueios, cadência | Gemini Flash |
| `@pm` | Product manager, escopo, backlog, prioridade | Gemini Flash |
| `@review-lead` | Lidera revisão de entrega (8 tipos de checklist) | Gemini Flash |
| `@qa` | Qualidade técnica, testes, validação | Gemini Flash |

### @conselho — Estratégia e direção

| Agente | Função | Modelo |
|---|---|---|
| `@project-director` | Direção geral, decisões críticas, stakeholders | Sonnet |
| `@operations-director` | Operações, processos, eficiência | Sonnet |
| `@strategy-director` | Estratégia de mercado, posicionamento, GTM | Sonnet |
| `@architect` | Arquitetura de sistemas, tech decisions | Sonnet |

### @dados — Inteligência e analytics

| Agente | Função | Modelo |
|---|---|---|
| `@tracking-engineer` | GTM, GA4, CAPI, pixels, tracking | Haiku |
| `@attribution-analyst` | Atribuição de vendas, análise de campanha | Kimi |
| `@data-engineer` | Pipelines de dados, Supabase, SQL | Haiku |
| `@dashboard-engineer` | Dashboards, visualização, relatórios | Haiku |
| `@analyst` | Análise geral, insights, padrões | Kimi |

### @criativo — Conteúdo e comunicação

| Agente | Função | Modelo |
|---|---|---|
| `@copy-specialist` | Copy, textos de vendas, e-mail, VSL | Kimi |
| `@designer-pro` | Direção criativa, visual, prompts de imagem | Kimi |
| `@video-producer` | Roteiros, estrutura de vídeo, YouTube | Kimi |

### @funnel — Conversão e automação

| Agente | Função | Modelo |
|---|---|---|
| `@automation-architect` | N8N, fluxos, integrações, automações | Haiku |
| `@crm-lifecycle-manager` | CRM, ActiveCampaign, Mautic, lifecycle | Kimi |
| `@landing-page-specialist` | Landing pages, estrutura, CRO | Haiku |

### @produto — Desenvolvimento

| Agente | Função | Modelo |
|---|---|---|
| `@dev` | Desenvolvimento fullstack, arquitetura de código | **Opus** |
| `@product-engineer-webapps` | Webapps, frontend, Lovable, v0 | Haiku |
| `@integration-engineer` | APIs, webhooks, integrações externas | Haiku |
| `@devops` | Deploy, infra, Docker, CI/CD, servidores | Haiku |
| `@ux` | UX, usabilidade, mobile, experiência | Gemini Flash |

### Social Intelligence (solo)

| Agente | Função | Modelo |
|---|---|---|
| `@social-intelligence-agent` | Inteligência competitiva, social listening, análise de mercado | Kimi |

---

## MEGA-BRAIN — SISTEMA DE CONHECIMENTO

O Mega-Brain é o cérebro de conhecimento do HAOS. Você alimenta com materiais de especialistas e ele disponibiliza esse conhecimento pros agentes.

### Comandos do Mega-Brain

| Comando | O que faz |
|---|---|
| `mb:briefing` | Status do sistema: health score, materiais processados, pendências |
| `mb:scan` | Lista o que está na inbox aguardando processamento |
| `mb:ingest [url ou caminho]` | Ingere material (YouTube, PDF, texto) na inbox |
| `mb:process` | Processa inbox pelo pipeline de 8 fases |
| `mb:extract-dna [pessoa]` | Extrai DNA cognitivo de especialista (5 camadas) |
| `mb:ask [especialista] [pergunta]` | Pergunta como o especialista pensaria sobre algo |
| `mb:conclave [decisão]` | Abre sessão de Conselho Estratégico completo |
| `mb:dossier [pessoa]` | Consulta ou gera dossiê completo de especialista |

### Como usar na prática

**Alimentar a base:**
```
mb:ingest https://youtube.com/watch?v=xxx
mb:process
mb:extract-dna hormozi
```

**Consultar:**
```
mb:ask hormozi "Como precificar oferta high-ticket acima de R$10k?"
mb:dossier hormozi
```

**Tomar decisão difícil:**
```
mb:conclave "Devo contratar um closer sênior agora ou treinar interno por 3 meses?"
```

### O Conclave — Como funciona

O Conclave ativa 4 papéis em sequência para qualquer decisão:

```
1. DEBATE → strategy-director × operations-director (paralelo)
2. CRÍTICO → avalia qualidade do debate (score 0-100)
3. ADVOGADO DO DIABO → busca vulnerabilidades e riscos ocultos
4. SINTETIZADOR → decisão final com confiança %, riscos e próximos passos
```

Se confiança < 60% → **escala para você** com Opção A vs Opção B. Nunca fica em loop.

### DNA Cognitivo — As 5 camadas

Quando você processa materiais de um especialista e extrai o DNA, ele é organizado em:

| Camada | O que é | Exemplo |
|---|---|---|
| Filosofias | Crenças fundamentais | "Volume resolve a maioria dos problemas" |
| Modelos Mentais | Como a pessoa vê o mundo | "Value Equation" |
| **Heurísticas ⭐** | **Regras com número — mais valiosas** | "Se CAC > 30% do LTV, pausar escala" |
| Frameworks | Estruturas nomeadas | "The Closer Framework (5 etapas)" |
| Metodologias | Processos passo-a-passo | "Sistema de onboarding em 7 dias" |

---

## LEGENDA RÁPIDA — TODOS OS COMANDOS

```
╔════════════════════════════════════════════════════════════════╗
║  ROTEAMENTO                                                    ║
╠════════════════════════════════════════════════════════════════╣
║  [mensagem]          → Abaclaw responde direto                 ║
║  @agente [mensagem]  → Consulta o especialista                 ║
║  @departamento [msg] → Consulta o time inteiro                 ║
║  # [tarefa]          → Abre rito HAOS v2 completo              ║
╠════════════════════════════════════════════════════════════════╣
║  DEPARTAMENTOS                                                 ║
╠════════════════════════════════════════════════════════════════╣
║  @orquestracao       → sm, pm, review-lead, qa, orquestrador   ║
║  @conselho           → project-director, ops, strategy, arch   ║
║  @dados              → tracking, attribution, data, dash, analyst║
║  @criativo           → copy, designer, video                   ║
║  @funnel             → automation, crm, landing-page           ║
║  @produto            → dev, webapps, integration, devops, ux   ║
╠════════════════════════════════════════════════════════════════╣
║  MEGA-BRAIN                                                    ║
╠════════════════════════════════════════════════════════════════╣
║  mb:briefing                 → Status do sistema               ║
║  mb:scan                     → O que está na inbox             ║
║  mb:ingest [url/path]        → Ingerir material                ║
║  mb:process                  → Processar inbox (8 fases)       ║
║  mb:extract-dna [pessoa]     → Extrair DNA cognitivo           ║
║  mb:ask [pessoa] [pergunta]  → Consultar especialista          ║
║  mb:conclave [decisão]       → Conselho estratégico            ║
║  mb:dossier [pessoa]         → Ver dossiê do especialista      ║
╚════════════════════════════════════════════════════════════════╝
```

---

## EXEMPLOS PRÁTICOS — DO SIMPLES AO COMPLEXO

### 1. Pergunta rápida (Modo Direto)
```
"Quais integrações o HAOS tem disponíveis?"
"Me resume o que o tracking-engineer faz"
"Como funciona o rito v2?"
```

### 2. Consulta a especialista (Modo Especialista)
```
@copy-specialist "preciso de 3 opções de headline para produto de emagrecimento"

@tracking-engineer "como configurar o evento Purchase no GA4 via GTM para Shopify?"

@strategy-director "analisa esse posicionamento e me diz se tem brecha competitiva"

@conselho "qual modelo de precificação faz mais sentido para nosso infoproduto de R$997?"
```

### 3. Tarefa com entrega real (Rito v2)
```
# criar sequência de e-mails de onboarding para compradores do curso X
→ O sistema vai:
   1. Perguntar detalhes (produto, tom, duração, objetivo)
   2. Você responde
   3. copy-specialist + crm-lifecycle-manager executam em paralelo
   4. QA valida, review-lead aprova
   5. Entrega documentada

# configurar tracking completo do funil: Meta Ads + GA4 + CAPI + GTM
→ tracking-engineer executa com validação do QA

# montar dashboard de performance de campanhas com dados de 30 dias
→ attribution-analyst + dashboard-engineer em paralelo
```

### 4. Decisão estratégica difícil (Conclave)
```
mb:conclave "Devo pausar o produto A para focar no produto B ou rodar os dois em paralelo com budget menor?"
mb:conclave "Contratar gerente de tráfego CLT ou trabalhar com agência?"
mb:conclave "Lançar com webinário ao vivo ou gravado?"
```

### 5. Construir base de conhecimento (Mega-Brain)
```
mb:ingest https://youtube.com/watch?v=abcdef
mb:process
mb:extract-dna hormozi
mb:ask hormozi "qual a estrutura ideal de oferta para venda direta?"
```

---

## FORMATO DE REPORTE — O QUE VOCÊ VÊ DURANTE O RITO

Todo reporte dos agentes segue esse formato obrigatório:

```
[2026-03-22 01:30][claude-sonnet-4-6][EXECUCAO][tracking-engineer]
[ação: configurar evento Purchase no GTM]
[evidência: código do dataLayer implementado, preview mode validado]
[status: DONE]
```

Isso garante rastreabilidade total. Você sabe exatamente **quando**, **qual modelo**, **qual etapa**, **qual agente**, **o que fez**, **qual evidência** e **qual status**.

---

## STATUS DO RITO — SIGNIFICADOS

| Status | Significado |
|---|---|
| `IN_PROGRESS` | Agente trabalhando |
| `BLOCKED_WAITING_SOLICITANTE` | Aguardando sua resposta |
| `BLOCKED_DEPENDENCY` | Aguardando outro agente terminar |
| `REWORK` | Em correção após reprovação |
| `DONE` | Concluído com evidência |

---

## REGRAS QUE VOCÊ PRECISA SABER

1. **`#` é o único gatilho do rito** — sem ele, nunca abre automaticamente
2. **Você vai ser questionado no CONSELHO Fase 1** — é obrigatório, não é optional
3. **Sem sua resposta, a task trava** — o gate não abre sem você
4. **Máximo 3 ciclos de correção** — se não passou na 3ª tentativa, vira diagnóstico
5. **Toda entrega tem evidência** — nada é entregue sem prova do que foi feito
6. **Registro é obrigatório** — toda task gera documentação no vault

---

## SKILLS DISPONÍVEIS POR ÁREA

Os agentes têm acesso a skills especializadas que ampliam suas capacidades:

| Área | Skills |
|---|---|
| **Analytics** | analytics-tracking-2, amplitude-automation, google-ads |
| **Banco de Dados** | sql-toolkit, db-readonly, neondb-skill |
| **Automação** | n8n, webhook |
| **CRM/E-mail** | email-marketing |
| **Copywriting** | copywriting, marketing-expert, marketing-mode |
| **Estratégia** | marketing-strategy-pmm, apify-competitor-intelligence |
| **Criativo** | meta-video-ad-deconstructor, hero-visual-prompt-generator, design-principles |
| **Vídeo** | assemblyai-transcribe, youtube-content-generator |
| **QA/Testes** | playwright-browser-automation, web-perf, ffuf-skill |
| **DevOps** | production-readiness, self-host, flyio-cli, deploy-on-render |
| **Dev** | fullstack-dev, software-architecture, software-engineer |
| **LP** | landing-page-prd-architect, mobile-responsiveness |
| **Gestão** | devlog-skill, prd-brainstorm, sprint-context-generator |
| **Mega-Brain** | pipeline.md, conclave.md, dna.md |

---

## INTEGRAÇÕES ATIVAS

| Integração | Status | Uso |
|---|---|---|
| N8N | ✅ Ativo | Automações e fluxos |
| Evolution API (WhatsApp) | ✅ 2 instâncias | Comunicação |
| Mautic | ✅ Ativo | E-mail marketing |
| Cloudflare | ✅ Ativo | DNS/CDN edsonburger.com.br |
| OpenAI API | ✅ Configurado | Whisper (transcrição), GPT |
| Hetzner VPS | ✅ Ativo | Servidor N8N/Mautic/Evolution |
| GitHub | ✅ Autenticado | Repos simtransforma |
| OneDrive | ✅ Autenticado | Sync seletivo pasta HAOS |
| Google Cloud | ✅ Configurado | APIs Google |
| Stape | ✅ Configurado | Server-side tagging |
| Clint CRM | ✅ Configurado | CRM |
| CursoEduca | ✅ Configurado | Plataforma de cursos |

---

## QUANDO USAR CADA MODO — GUIA RÁPIDO

```
PERGUNTA OU DÚVIDA RÁPIDA?
→ Fala direto (sem prefixo)

PRECISA DE ANÁLISE DE UM ESPECIALISTA?
→ @agente ou @departamento

PRECISA DE ENTREGA REAL (copy, código, campanha, config)?
→ # [tarefa completa]

DECISÃO DIFÍCIL COM ALTO RISCO?
→ mb:conclave "[decisão]"

QUER SABER COMO UM ESPECIALISTA PENSARIA?
→ mb:ask [pessoa] "[pergunta]"

QUER PROCESSAR MATERIAL DE APRENDIZADO?
→ mb:ingest + mb:process + mb:extract-dna
```

---

*Manual gerado em 2026-03-22 | HAOS v2 | OpenClaw 2026.3.13 | Abaclaw ⚡*
