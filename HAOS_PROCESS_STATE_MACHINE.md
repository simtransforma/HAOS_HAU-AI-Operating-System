# HAOS_PROCESS_STATE_MACHINE.md

Fluxo obrigatório:

ABERTURA -> CONSELHO -> MEGA_BRAIN -> DIRETOR -> ESTRATEGISTA -> EXECUCAO -> VALIDACAO -> CONSELHO_FINAL -> ENTREGA -> REGISTRO

Regras de retorno por erro:
- Erro técnico de execução/diagnóstico -> retorna para ESTRATEGISTA
- Erro de plano/escopo/critérios -> retorna para DIRETOR
- Conflito de direção/prioridade/risco -> retorna para CONSELHO

Sem pulo de etapa.
Sem execução solo no main para tarefa operacional.
