#!/bin/bash
# Setup HAOS Agent Workspaces for OpenClaw
# Detecta automaticamente o ambiente e configura paths corretos
# Compatível com: Abacus (~/), Hetzner (/opt/openclaw/data/), qualquer Linux

set -e

# ============================================================
# DETECÇÃO AUTOMÁTICA DE AMBIENTE
# ============================================================

detect_environment() {
  # Hetzner/Docker: openclaw roda em /opt/openclaw/data/
  if [ -d "/opt/openclaw/data" ] && [ -f "/opt/openclaw/data/openclaw.json" ]; then
    echo "hetzner"
    return
  fi
  # Abacus/local: openclaw roda no home do usuário
  if [ -f "$HOME/.openclaw/openclaw.json" ]; then
    echo "local"
    return
  fi
  # Genérico: usar HOME
  echo "local"
}

ENV_TYPE=$(detect_environment)

if [ "$ENV_TYPE" = "hetzner" ]; then
  BASE="/opt/openclaw/data"
  OPENCLAW_CONFIG="$BASE/openclaw.json"
  echo "Ambiente detectado: Hetzner/Docker ($BASE)"
else
  BASE="$HOME"
  OPENCLAW_CONFIG="$HOME/.openclaw/openclaw.json"
  echo "Ambiente detectado: Local ($BASE)"
fi

AGENTS_SRC="$BASE/haos-runtime/HAOS/agents"
WORKSPACES="$BASE/.openclaw/haos-workspaces"
AGENTS_DIR="$BASE/.openclaw/agents"
HAOS_ROOT="$BASE/haos-runtime"

# Skills dirs por ambiente
if [ "$ENV_TYPE" = "hetzner" ]; then
  SKILLS_USER="$BASE/skills"
  SKILLS_HAOS="$BASE/haos-runtime/HAOS/skills"
  SKILLS_SYSTEM="/opt/abacus-claw/skills"
else
  SKILLS_USER="$HOME/skills"
  SKILLS_HAOS="$HOME/haos-runtime/HAOS/skills"
  SKILLS_SYSTEM="/opt/abacus-claw/skills"
fi

# ============================================================
# VERIFICAÇÕES
# ============================================================

if [ ! -d "$AGENTS_SRC" ]; then
  echo "ERRO: $AGENTS_SRC não encontrado."
  echo "Clone o repo primeiro: git clone git@github.com:simtransforma/principal-HAOS_HAU-AI-Operating-System.git $BASE/haos-runtime"
  exit 1
fi

mkdir -p "$WORKSPACES" "$AGENTS_DIR"

echo ""
echo "Criando workspaces em: $WORKSPACES"
echo "Criando agentDirs em: $AGENTS_DIR"
echo ""

# ============================================================
# CRIAR WORKSPACES DOS 27 AGENTES
# ============================================================

CREATED=0

for agent_dir in "$AGENTS_SRC"/*/; do
  agent=$(basename "$agent_dir")
  ws="$WORKSPACES/$agent"
  mkdir -p "$ws" "$AGENTS_DIR/$agent"

  # AGENTS.md — PROMPT + SPEC + PLAYBOOK + IO_CONTRACT
  {
    echo "# AGENTS.md — $agent"
    echo ""
    echo "## Ambiente"
    echo "- **Sistema:** HAOS (HAU AI Operating System)"
    echo "- **Runtime HAOS:** $HAOS_ROOT/HAOS"
    echo "- **Workspace:** $ws"
    echo ""
    echo "## Regras Operacionais"
    echo "1. Seguir HAOS_CONTRACT.md em toda execução"
    echo "2. Formato de reporte: \`[timestamp][modelo llm][etapa][agente][ação][evidência][status/bloqueio]\`"
    echo "3. Evidência obrigatória em toda entrega"
    echo "4. Escalar bloqueio ao SM/Orquestrador imediatamente"
    echo "5. Não inventar dados, status ou evidência"
    echo "6. Credenciais via cofre de secrets (nunca expor valores)"
    echo ""
    echo "## Referências normativas"
    echo "- Contrato: $HAOS_ROOT/HAOS/HAOS_CONTRACT.md"
    echo "- Pipeline: $HAOS_ROOT/HAOS/HAOS_PIPELINE.md"
    echo "- Handoffs: $HAOS_ROOT/HAOS/HAOS_HANDOFFS.md"
    echo "- Guia Operacional: $HAOS_ROOT/HAOS_OPENCLAW_OPERATIONS.md"
    echo ""
    echo "---"
    echo ""
    [ -f "$agent_dir/PROMPT.md" ]      && cat "$agent_dir/PROMPT.md"      && echo "" && echo "---" && echo ""
    [ -f "$agent_dir/AGENT_SPEC.md" ]  && cat "$agent_dir/AGENT_SPEC.md"  && echo "" && echo "---" && echo ""
    [ -f "$agent_dir/PLAYBOOK.md" ]    && cat "$agent_dir/PLAYBOOK.md"    && echo "" && echo "---" && echo ""
    [ -f "$agent_dir/IO_CONTRACT.md" ] && cat "$agent_dir/IO_CONTRACT.md"
  } > "$ws/AGENTS.md"

  # TOOLS.md
  cat > "$ws/TOOLS.md" << TOOLSEOF
# TOOLS.md — $agent
## Ambiente
- Runtime HAOS: $HAOS_ROOT/HAOS
- Workspace: $ws
- Skills: $SKILLS_HAOS e $SKILLS_USER
TOOLSEOF

  CREATED=$((CREATED + 1))
  echo "OK $agent"
done

echo ""
echo "Total: $CREATED workspaces criados"

# ============================================================
# MAPEAR SKILLS POR AGENTE (links simbólicos)
# ============================================================

echo ""
echo "Mapeando skills por agente..."

link_skill() {
  local agent=$1 skill=$2
  # Procurar skill nas pastas disponíveis
  for dir in "$SKILLS_HAOS" "$SKILLS_USER"; do
    if [ -d "$dir/$skill" ]; then
      mkdir -p "$WORKSPACES/$agent/skills"
      ln -sfn "$dir/$skill" "$WORKSPACES/$agent/skills/$skill"
      return 0
    fi
  done
}

# Tracking
link_skill tracking-engineer analytics-tracking-2; link_skill tracking-engineer google-ads
link_skill attribution-analyst analytics-tracking-2; link_skill attribution-analyst google-ads
# Data
link_skill data-engineer amplitude-automation; link_skill data-engineer neondb-skill
link_skill data-engineer sql-toolkit; link_skill data-engineer db-readonly
link_skill dashboard-engineer db-readonly; link_skill dashboard-engineer sql-toolkit
link_skill analyst db-readonly; link_skill analyst sql-toolkit; link_skill analyst last30days-skill
# Automação
link_skill automation-architect n8n; link_skill automation-architect webhook
link_skill integration-engineer webhook; link_skill integration-engineer n8n
# CRM/Copy
link_skill crm-lifecycle-manager email-marketing
link_skill copy-specialist copywriting; link_skill copy-specialist email-marketing; link_skill copy-specialist marketing-expert
# Estratégia
link_skill strategy-director marketing-mode; link_skill strategy-director marketing-strategy-pmm
link_skill strategy-director apify-competitor-intelligence; link_skill strategy-director marketing-expert
link_skill social-intelligence-agent apify-competitor-intelligence; link_skill social-intelligence-agent apify-ultimate-scraper; link_skill social-intelligence-agent last30days-skill
# Criativo
link_skill video-producer assemblyai-transcribe; link_skill video-producer meta-video-ad-deconstructor
link_skill video-producer hero-visual-prompt-generator; link_skill video-producer youtube-content-generator
link_skill designer-pro meta-video-ad-deconstructor; link_skill designer-pro hero-visual-prompt-generator; link_skill designer-pro design-principles
# QA/UX
link_skill qa playwright-browser-automation; link_skill qa web-perf; link_skill qa ffuf-skill
link_skill ux playwright-browser-automation; link_skill ux web-perf
# DevOps/Dev
link_skill devops auto-updater; link_skill devops production-readiness; link_skill devops self-host
link_skill devops flyio-cli; link_skill devops deploy-on-render; link_skill devops web-perf
link_skill dev webhook; link_skill dev db-readonly; link_skill dev sql-toolkit
link_skill dev fullstack-dev; link_skill dev software-architecture; link_skill dev software-engineer
link_skill product-engineer-webapps neondb-skill; link_skill product-engineer-webapps db-readonly
link_skill product-engineer-webapps fullstack-dev; link_skill product-engineer-webapps mobile-responsiveness
# LP
link_skill landing-page-specialist copywriting; link_skill landing-page-specialist landing-page-prd-architect
link_skill landing-page-specialist design-principles; link_skill landing-page-specialist mobile-responsiveness
# PM/SM/Ops/Orq
link_skill pm devlog-skill; link_skill pm prd-brainstorm; link_skill pm sprint-context-generator
link_skill sm devlog-skill; link_skill operations-director devlog-skill
link_skill project-director atlassian-mcp
link_skill orquestrador-haos devlog-skill; link_skill orquestrador-haos skill-auditor-v2
link_skill orquestrador-haos prd-brainstorm; link_skill orquestrador-haos sprint-context-generator
link_skill architect production-readiness; link_skill architect software-architecture

echo "Skills mapeadas."

# ============================================================
# CORRIGIR PERMISSÕES
# ============================================================

# Se Hetzner, garantir que UID 1000 tem acesso
if [ "$ENV_TYPE" = "hetzner" ]; then
  chown -R 1000:1000 "$BASE/.openclaw/" 2>/dev/null && echo "Permissões corrigidas (1000:1000)"
fi

# ============================================================
# ATUALIZAR openclaw.json COM PATHS CORRETOS
# ============================================================

if [ -f "$OPENCLAW_CONFIG" ] && command -v python3 &>/dev/null; then
  python3 << PYEOF
import json, os

BASE = "$BASE"
WS_BASE = f"{BASE}/.openclaw/haos-workspaces"
AGENTS_DIR = f"{BASE}/.openclaw/agents"
SKILLS_USER = "$SKILLS_USER"
SKILLS_HAOS = "$SKILLS_HAOS"
SKILLS_SYSTEM = "$SKILLS_SYSTEM"

with open("$OPENCLAW_CONFIG") as f:
    config = json.load(f)

# Subagents defaults
config['agents']['defaults']['subagents'] = {
    'maxConcurrent': 8,
    'maxSpawnDepth': 2,
    'maxChildrenPerAgent': 5,
    'archiveAfterMinutes': 120,
    'runTimeoutSeconds': 900
}

# Skills dirs (só dirs que existem)
extra_dirs = [d for d in [SKILLS_USER, SKILLS_HAOS, SKILLS_SYSTEM] if os.path.exists(d)]
config.setdefault('skills', {})['load'] = {'extraDirs': extra_dirs}

# Workspace e agentDir de cada agente
for agent in config['agents'].get('list', []):
    aid = agent['id']
    if aid == 'main':
        agent['workspace'] = f"{BASE}/workspace"
        agent['agentDir'] = f"{AGENTS_DIR}/main"
    else:
        agent['workspace'] = f"{WS_BASE}/{aid}"
        agent['agentDir'] = f"{AGENTS_DIR}/{aid}"

# defaults workspace
config['agents']['defaults']['workspace'] = f"{BASE}/workspace"

with open("$OPENCLAW_CONFIG", 'w') as f:
    json.dump(config, f, indent=2, ensure_ascii=False)

print(f"openclaw.json atualizado com paths de {BASE}")
missing = [d for d in extra_dirs if not os.path.exists(d)]
if missing:
    print(f"AVISO — paths MISSING: {missing}")
PYEOF
fi

echo ""
echo "=== SETUP CONCLUÍDO ==="
echo "Ambiente: $ENV_TYPE"
echo "Base: $BASE"
echo "Workspaces: $WORKSPACES"
echo "Reinicie o OpenClaw para aplicar as mudanças."
