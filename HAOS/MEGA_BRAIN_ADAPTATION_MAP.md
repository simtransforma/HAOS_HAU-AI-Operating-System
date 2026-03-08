# MEGA_BRAIN_ADAPTATION_MAP.md

## Objetivo
Adaptar Mega Brain como base técnica do HAOS, mantendo apenas componentes úteis para orquestração, pipeline, conselho e governança.

## Origem
- Fonte clonada: `_analysis/mega-brain`
- Snapshot usado: commit `5d08759`

## Componentes importados para HAOS
Destino: `HAOS/core-base/mega-brain/`

### Mantidos
- `core/workflows`
- `core/templates`
- `core/schemas`
- `core/patterns`
- `core/intelligence`
- `agents/conclave`
- `agents/_templates`
- `.claude/commands`
- `bin`
- `docs/pipeline-completa-v4.md`
- `README.md`, `QUICK-START.md`, `package.json`

### Excluídos (não aderentes ao HAOS v1)
- `knowledge/`, `artifacts/`, `logs/`, `inbox/` (conteúdo específico do Mega Brain)
- `node_modules/`, `.git/`, `.github/`, `.cursor/`, `.windsurf/`, `.planning/`, `.antigravity/`
- qualquer conteúdo que dependa de naming antigo fora do padrão HAOS

## Decisão arquitetural
- Mega Brain entra como **core-base** (referência executável).
- HAOS continua como **camada de governança e operação** (contrato, pipeline, handoffs, credenciais).
- Mission Control permanece excluído.

## O que falta para fechar Bloco 2
1. Traduzir/alinhar comandos principais para nomenclatura HAOS.
2. Mapear quais comandos do core-base viram comandos oficiais HAOS.
3. Criar wrapper de runtime (`haos:start`) chamando fluxo oficial HAOS.
4. Definir validações obrigatórias no `haos:doctor`.
