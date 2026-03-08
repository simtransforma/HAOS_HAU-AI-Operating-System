# HAOS Session Continuity Rules

## Objetivo
Manter continuidade operacional quando o Gian falar por múltiplos canais (webchat e WhatsApp).

## Regra principal
A fonte de verdade da operação é o repositório HAOS (arquivos), não a sessão do canal.

## Fontes canônicas (ordem)
1. `HAOS/*` (contrato, pipeline, runbooks, prompts, skills)
2. `memory/YYYY-MM-DD.md` (estado diário)
3. `MEMORY.md` (memória consolidada)

## Comportamento operacional
- Mensagens podem chegar por canais diferentes e cair em sessões distintas.
- Antes de executar ações importantes, consultar estado canônico dos arquivos.
- Atualizações relevantes devem ser registradas em `memory/YYYY-MM-DD.md`.
- Mudanças estruturais devem ser commitadas no Git.

## Regra de consistência
- Toda personalização entra em:
  1) ambiente nativo OpenClaw
  2) repositório Git (versionado)

## Resultado esperado
Mesmo alternando entre webchat e WhatsApp, o sistema mantém o mesmo estado operacional.
