# HAOS_COMMANDS_TARGET.md

## Comandos-alvo do sistema (Bloco 3)

1. `npm run haos:setup`
   - valida ambiente
   - prepara estrutura HAOS
   - valida cofre/credenciais

2. `npm run haos:doctor`
   - checa contrato, prompts, credenciais, dependências
   - retorna pendências para operação

3. `npm run haos:start`
   - inicia orquestração do fluxo oficial
   - habilita execução por fases e gates

4. `npm run haos:new-task -- "<objetivo>"`
   - abre tarefa no pipeline HAOS

5. `npm run haos:review -- <task-id>`
   - dispara revisão de fase (Review Lead + QA)

6. `npm run haos:council -- <task-id>`
   - convoca conselho para decisão estratégica
