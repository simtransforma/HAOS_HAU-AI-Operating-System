# HAOS_HANDOFFS.md

## Pacote mínimo de handoff
- contexto e objetivo
- decisões tomadas
- evidências (links/logs/refs)
- riscos e pendências
- próxima ação
- linha de reporte padrão

## Handoffs críticos Fase1/Report
### CONSELHO-Fase1 -> REPORT-SOLICITANTE
- `question_block`
- `question_sent_at`
- `question_message_ref`

### REPORT-SOLICITANTE -> CONSELHO-Fase2
- `solicitante_reply_ref`
- `scope_delta`
- `decision_constraints`

Sem esses campos, handoff inválido.

## Fluxo de handoff
ABERTURA -> CONSELHO-Fase1 -> REPORT-SOLICITANTE -> CONSELHO-Fase2 -> MEGA_BRAIN -> DIRETOR -> ESTRATEGISTA -> EXECUCAO -> VALIDACAO -> (reprovado: CONSELHO_SE_REPROVADO -> MEGA_BRAIN) -> CONSELHO_Final_Aprovado -> ENTREGA -> REGISTRO
