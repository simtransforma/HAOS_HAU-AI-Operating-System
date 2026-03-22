# OpenClaw Setup — HAOS v2

Kit de instalação do HAOS no OpenClaw para qualquer ambiente.
O script detecta automaticamente o ambiente e configura os paths corretos.

## Ambientes suportados

| Ambiente | Base path | Exemplo |
|----------|-----------|---------|
| **Local/Abacus** | `~/` | Máquina do usuário com OpenClaw instalado normalmente |
| **Hetzner/Docker** | `/opt/openclaw/data/` | VPS com OpenClaw em container Docker |
| **Qualquer Linux** | `~/` | Qualquer instalação padrão |

## Pré-requisitos

- OpenClaw instalado e rodando
- Acesso SSH ao GitHub configurado (chave `github_simtransforma_key`)
- `~/.env` (local) ou `_secrets/` (Hetzner) com credenciais

## Instalação

### 1. Clonar o repo privado

**Local/Abacus:**
```bash
cd ~
git clone git@github.com:simtransforma/principal-HAOS_HAU-AI-Operating-System.git haos-runtime
```

**Hetzner/Docker (como root):**
```bash
cd /opt/openclaw/data
git clone git@github.com:simtransforma/principal-HAOS_HAU-AI-Operating-System.git haos-runtime
```

### 2. Rodar o setup

```bash
bash haos-runtime/openclaw-setup/setup-agents.sh
```

O script automaticamente:
- Detecta o ambiente (local vs Hetzner/Docker)
- Cria 27 workspaces dos agentes com AGENTS.md completo
- Mapeia skills por agente (links simbólicos)
- Corrige permissões (Hetzner: chown 1000:1000)
- Atualiza openclaw.json com paths corretos e subagents config

### 3. Configurar modelos (se necessário)

O script **não mexe nos modelos** configurados — preserva o que já está no `openclaw.json`.

Para configurar modelos manualmente, editar `openclaw.json` e definir por agente.

### 4. Reiniciar o OpenClaw

**Local:**
```bash
openclaw gateway restart
```

**Hetzner/Docker:**
```bash
cd /opt/openclaw && docker compose restart
```

---

## O que é criado

```
<base>/.openclaw/
├── haos-workspaces/
│   ├── analyst/
│   │   ├── AGENTS.md      ← Prompt mestre completo
│   │   ├── TOOLS.md       ← Ferramentas e paths
│   │   └── skills/        ← Links para skills do agente
│   ├── tracking-engineer/
│   │   ├── AGENTS.md
│   │   ├── TOOLS.md
│   │   └── skills/
│   └── ... (26 agentes)
└── agents/
    ├── main/              ← Sessions/state do main
    ├── analyst/           ← Sessions/state do analyst
    └── ... (agentDirs)
```

---

## Squad — 27 agentes (main + 26 especializados)

| Departamento | Agentes |
|---|---|
| @orquestracao | orquestrador-haos, sm, pm, review-lead, qa |
| @conselho | project-director, operations-director, strategy-director, architect |
| @dados | tracking-engineer, attribution-analyst, data-engineer, dashboard-engineer, analyst |
| @criativo | copy-specialist, designer-pro, video-producer |
| @funnel | automation-architect, crm-lifecycle-manager, landing-page-specialist |
| @produto | dev, product-engineer-webapps, integration-engineer, devops, ux |
| @social | social-intelligence-agent |

---

## Referência operacional

Ver `HAOS_OPENCLAW_OPERATIONS.md` para o guia completo de orquestração, rito v2 e Mega-Brain.
