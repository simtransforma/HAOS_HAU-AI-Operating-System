#!/bin/bash
# Setup HAOS Agent Workspaces for OpenClaw
# Creates individual workspace directories for each of the 27 agents

AGENTS_SRC="$HOME/haos-runtime/HAOS/agents"
WORKSPACES="$HOME/.openclaw/haos-workspaces"
HAOS_ROOT="$HOME/haos-runtime"

mkdir -p "$WORKSPACES"

# Agent list with tiers and emojis
declare -A AGENT_TIER
declare -A AGENT_EMOJI
declare -A AGENT_DEPT

# Tier 0 - Opus 4.6
AGENT_TIER[dev]="abacus/claude-opus-4-6"
# Tier 1 - Sonnet 4.6
for a in orquestrador-haos project-director operations-director strategy-director architect; do
  AGENT_TIER[$a]="abacus/claude-sonnet-4-6"
done
# Tier 2 - Haiku 4.5
for a in product-engineer-webapps integration-engineer devops data-engineer tracking-engineer automation-architect dashboard-engineer landing-page-specialist; do
  AGENT_TIER[$a]="abacus/claude-haiku-4-5"
done
# Tier 3 - GPT-5 mini (using kimi-k2.5 as equivalent)
for a in analyst attribution-analyst copy-specialist designer-pro video-producer crm-lifecycle-manager social-intelligence-agent; do
  AGENT_TIER[$a]="abacus/kimi-k2.5"
done
# Tier 4 - Gemini Flash
for a in pm sm review-lead qa ux traffic-master; do
  AGENT_TIER[$a]="abacus/gemini-3-flash-preview"
done

# Emojis
AGENT_EMOJI[orquestrador-haos]="🎯"; AGENT_EMOJI[sm]="📋"; AGENT_EMOJI[pm]="📊"
AGENT_EMOJI[review-lead]="🔍"; AGENT_EMOJI[qa]="✅"; AGENT_EMOJI[project-director]="🎬"
AGENT_EMOJI[operations-director]="⚙️"; AGENT_EMOJI[strategy-director]="🧭"
AGENT_EMOJI[architect]="🏗️"; AGENT_EMOJI[tracking-engineer]="📡"
AGENT_EMOJI[attribution-analyst]="📈"; AGENT_EMOJI[data-engineer]="🗄️"
AGENT_EMOJI[dashboard-engineer]="📉"; AGENT_EMOJI[analyst]="🔬"
AGENT_EMOJI[copy-specialist]="✍️"; AGENT_EMOJI[designer-pro]="🎨"
AGENT_EMOJI[video-producer]="🎥"; AGENT_EMOJI[automation-architect]="🤖"
AGENT_EMOJI[crm-lifecycle-manager]="💌"; AGENT_EMOJI[landing-page-specialist]="🖥️"
AGENT_EMOJI[dev]="💻"; AGENT_EMOJI[product-engineer-webapps]="🌐"
AGENT_EMOJI[integration-engineer]="🔌"; AGENT_EMOJI[devops]="🚀"
AGENT_EMOJI[ux]="🎭"; AGENT_EMOJI[social-intelligence-agent]="📱"
AGENT_EMOJI[traffic-master]="🚦"

# Departments
AGENT_DEPT[orquestrador-haos]="orquestracao"; AGENT_DEPT[sm]="orquestracao"
AGENT_DEPT[pm]="orquestracao"; AGENT_DEPT[review-lead]="orquestracao"
AGENT_DEPT[qa]="orquestracao"; AGENT_DEPT[project-director]="conselho"
AGENT_DEPT[operations-director]="conselho"; AGENT_DEPT[strategy-director]="conselho"
AGENT_DEPT[architect]="conselho"; AGENT_DEPT[tracking-engineer]="dados"
AGENT_DEPT[attribution-analyst]="dados"; AGENT_DEPT[data-engineer]="dados"
AGENT_DEPT[dashboard-engineer]="dados"; AGENT_DEPT[analyst]="dados"
AGENT_DEPT[copy-specialist]="criativo"; AGENT_DEPT[designer-pro]="criativo"
AGENT_DEPT[video-producer]="criativo"; AGENT_DEPT[automation-architect]="funnel"
AGENT_DEPT[crm-lifecycle-manager]="funnel"; AGENT_DEPT[landing-page-specialist]="funnel"
AGENT_DEPT[dev]="produto"; AGENT_DEPT[product-engineer-webapps]="produto"
AGENT_DEPT[integration-engineer]="produto"; AGENT_DEPT[devops]="produto"
AGENT_DEPT[ux]="produto"; AGENT_DEPT[social-intelligence-agent]="dados"
AGENT_DEPT[traffic-master]="trafego"

CREATED=0

for agent_dir in "$AGENTS_SRC"/*/; do
  agent=$(basename "$agent_dir")
  ws="$WORKSPACES/$agent"
  mkdir -p "$ws"
  
  # Build AGENTS.md from PROMPT.md + AGENT_SPEC.md + PLAYBOOK.md + IO_CONTRACT.md
  {
    echo "# AGENTS.md — $agent"
    echo ""
    echo "## Ambiente"
    echo "- **Sistema:** HAOS (HAU AI Operating System)"
    echo "- **Departamento:** ${AGENT_DEPT[$agent]:-desconhecido}"
    echo "- **Modelo:** ${AGENT_TIER[$agent]:-abacus/kimi-k2.5}"
    echo "- **Workspace:** $ws"
    echo "- **Runtime HAOS:** $HAOS_ROOT/HAOS"
    echo ""
    echo "## Regras Operacionais"
    echo "1. Seguir HAOS_CONTRACT.md em toda execução"
    echo "2. Formato de reporte: \`[timestamp][modelo llm][etapa][agente][ação][evidência][status/bloqueio]\`"
    echo "3. Evidência obrigatória em toda entrega"
    echo "4. Escalar bloqueio ao SM/Orquestrador imediatamente"
    echo "5. Não inventar dados, status ou evidência"
    echo "6. Credenciais via ~/.env (nunca expor valores)"
    echo ""
    echo "## Referências normativas"
    echo "- Contrato: $HAOS_ROOT/HAOS/HAOS_CONTRACT.md"
    echo "- Pipeline: $HAOS_ROOT/HAOS/HAOS_PIPELINE.md"
    echo "- Handoffs: $HAOS_ROOT/HAOS/HAOS_HANDOFFS.md"
    echo "- RACI: $HAOS_ROOT/HAOS/HAOS_RACI.md"
    echo "- Runbook: $HAOS_ROOT/HAOS/HAOS_RUNBOOK.md"
    echo ""
    echo "---"
    echo ""
    
    # Append PROMPT.md
    if [ -f "$agent_dir/PROMPT.md" ]; then
      cat "$agent_dir/PROMPT.md"
      echo ""
      echo "---"
      echo ""
    fi
    
    # Append AGENT_SPEC.md
    if [ -f "$agent_dir/AGENT_SPEC.md" ]; then
      cat "$agent_dir/AGENT_SPEC.md"
      echo ""
      echo "---"
      echo ""
    fi
    
    # Append PLAYBOOK.md
    if [ -f "$agent_dir/PLAYBOOK.md" ]; then
      cat "$agent_dir/PLAYBOOK.md"
      echo ""
      echo "---"
      echo ""
    fi
    
    # Append IO_CONTRACT.md
    if [ -f "$agent_dir/IO_CONTRACT.md" ]; then
      cat "$agent_dir/IO_CONTRACT.md"
    fi
  } > "$ws/AGENTS.md"
  
  # Create TOOLS.md
  cat > "$ws/TOOLS.md" << TOOLSEOF
# TOOLS.md — $agent

## Ambiente
- Runtime HAOS: ~/haos-runtime/HAOS
- Scripts CLI: ~/haos-runtime/HAOS/scripts/
- Credenciais: ~/.env
- Skills: ~/skills/ e /opt/abacus-claw/skills/
- Workspace principal: /home/ubuntu

## Comandos HAOS disponíveis
\`\`\`bash
cd ~/haos-runtime/HAOS
npm run haos:status
npm run haos:update-task -- <TASK_ID> --set campo=valor
\`\`\`

## Credenciais disponíveis (em ~/.env)
Consultar via: \`cat ~/.env | grep -E "^[A-Z]" | cut -d= -f1\`
Nunca expor valores no chat.
TOOLSEOF

  CREATED=$((CREATED + 1))
  echo "OK $agent → $ws"
done

echo ""
echo "Total: $CREATED workspaces criados em $WORKSPACES"
