# OpenClaw Setup — HAOS v2

Guia de instalação do ambiente HAOS no OpenClaw para nova máquina.

## Pré-requisitos

- OpenClaw instalado
- Acesso SSH ao GitHub configurado (chave `github_simtransforma_key`)
- Arquivo `~/.env` com todas as credenciais

## Instalação

### 1. Clonar este repo

```bash
cd ~
git clone git@github.com:simtransforma/principal-HAOS_HAU-AI-Operating-System.git haos-runtime
```

### 2. Instalar runtime Node

```bash
cd ~/haos-runtime/HAOS
npm install 2>/dev/null || true
node scripts/doctor.js
```

### 3. Criar workspaces dos agentes

```bash
bash ~/haos-runtime/openclaw-setup/setup-agents.sh
```

### 4. Configurar OpenClaw

```bash
cp ~/haos-runtime/openclaw-setup/openclaw.json.template ~/.openclaw/openclaw.json
# Editar e preencher: gateway.auth.token e models.providers.abacus.apiKey
```

### 5. Configurar SSH GitHub

```bash
cp ~/haos-runtime/openclaw-setup/ssh-config ~/.ssh/config
chmod 600 ~/.ssh/config
# Colocar a chave privada em ~/.ssh/github_simtransforma_key
```

### 6. Reiniciar OpenClaw

```bash
openclaw gateway restart
```

## Estrutura dos workspaces

Cada agente tem seu workspace em `~/.openclaw/haos-workspaces/<agente>/` com:

- `AGENTS.md` — Prompt mestre (PROMPT.md + SPEC + PLAYBOOK + IO_CONTRACT)
- `TOOLS.md` — Ferramentas e credenciais
- `skills/` — Links simbólicos das skills do agente

## Mapeamento de modelos

| Tier | Modelo | Agentes |
|------|--------|---------|
| 0 | claude-opus-4-6 | dev |
| 1 | claude-sonnet-4-6 | orquestrador-haos, project-director, operations-director, strategy-director, architect |
| 2 | claude-haiku-4-5 | product-engineer-webapps, integration-engineer, devops, data-engineer, tracking-engineer, automation-architect, dashboard-engineer, landing-page-specialist |
| 3 | kimi-k2.5 | analyst, attribution-analyst, copy-specialist, designer-pro, video-producer, crm-lifecycle-manager, social-intelligence-agent |
| 4 | gemini-3-flash-preview | pm, sm, review-lead, qa, ux, traffic-master |

## Referência operacional

Ver `HAOS_OPENCLAW_OPERATIONS.md` para o guia completo de orquestração.
