# TASK_OPENING_TEMPLATE.md

Use este bloco no início de toda tarefa operacional:

```
Modo: HAOS-first
Rito oficial: ABERTURA -> CONSELHO-Fase1 -> REPORT-SOLICITANTE -> CONSELHO-Fase2 -> MEGA_BRAIN -> DIRETOR -> ESTRATEGISTA -> EXECUCAO -> VALIDACAO -> (se reprovado: CONSELHO_SE_REPROVADO [máx 3] -> MEGA_BRAIN) -> CONSELHO_Final_Aprovado -> ENTREGA -> REGISTRO
CONSELHO-Fase1: <acionado>
CONSELHO-Fase2: <acionado>
REPORT-SOLICITANTE: <definido>
Main: orquestrador (sem execução solo)
Squad: <definida>
Delegação: ativa
Skill aplicável: <nome>
Escopo IN: <itens>
Escopo OUT: <itens>
Papéis por etapa: <etapa:agente>
Validação final: <definida>
Plano de reporte: <cada etapa + resposta dos agentes>
Formato de reporte: [etapa][agente][ação][evidência][status/bloqueio]
Regra anti-silêncio: <update máximo a cada 3 min>
Plano de contingência: <timeout agente=7min | re-disparo | escalonamento>
Status do gate: <APROVADO | BLOQUEADO>
```

Se BLOQUEADO: não executar, informar motivo e pedir ajuste mínimo necessário.


