# HAOS_RACI.md

## RACI por etapa (v2)
- ABERTURA — A: orquestrador-haos | R: pm/analyst | C: sm | I: conselho
- CONSELHO-Fase1 — A: project-director | R: conselho estratégico | C: orquestrador | I: solicitante
- REPORT-SOLICITANTE — A/R: orquestrador-haos | C: pm | I: conselho
- CONSELHO-Fase2 — A: project-director | R: conselho estratégico | C: orquestrador | I: squads
- MEGA_BRAIN — A: orquestrador-haos | R: project-director/strategy-director/architect
- DIRETOR — A: project-director | R: pm | C: architect/sm
- ESTRATEGISTA — A: strategy-director | R: analyst/data-engineer/tracking-engineer
- EXECUCAO — A: orquestrador-haos | R: squad especialista
- VALIDACAO — A: review-lead | R: qa + especialista executor
- CONSELHO_SE_REPROVADO — A: project-director | R: conselho + especialista técnico
- CONSELHO_Final_Aprovado — A: conselho | R: orquestrador
- ENTREGA — A: orquestrador-haos | R: pm + especialista dono
- REGISTRO — A: orquestrador-haos | R: pm/sm

## Observação transversal obrigatória
O solicitante é parte obrigatória do handoff entre `CONSELHO-Fase1` e `CONSELHO-Fase2`.

## Reporte
`[timestamp][modelo llm][etapa][agente][ação][evidência][status/bloqueio]`
