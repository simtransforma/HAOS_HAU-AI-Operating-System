# Template de Linha de Reporte
Formato único obrigatório:
`[timestamp][modelo llm][etapa][agente][ação][evidência][status/bloqueio]`

## Etapas oficiais v2
- ABERTURA
- CONSELHO-Fase1
- REPORT-SOLICITANTE
- CONSELHO-Fase2
- MEGA_BRAIN
- DIRETOR
- ESTRATEGISTA
- EXECUCAO
- VALIDACAO
- CONSELHO_SE_REPROVADO
- CONSELHO_Final_Aprovado
- ENTREGA
- REGISTRO

## Status de reporte (humano)
- IN_PROGRESS
- BLOCKED_WAITING_SOLICITANTE
- BLOCKED_DEPENDENCY
- REWORK
- DONE

## Status de runtime (sistema)
- in_progress
- blocked_waiting_solicitante
- blocked_dependency
- rework
- done

## Nota de soft gate
Quando houver override de soft gate, registrar `warnings=` e `justify=` no campo de evidência.

Exemplo:
`[2026-03-08T12:10:00-03:00][gpt-5.3-codex][MEGA_BRAIN][orquestrador-haos][aprovar continuidade com lacuna não bloqueante][warnings=history ausente; justify=seguir por contexto suficiente][IN_PROGRESS]`
