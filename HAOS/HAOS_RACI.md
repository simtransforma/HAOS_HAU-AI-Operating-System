# HAOS_RACI.md

## Papéis centrais
- **orquestrador-haos:** A de orquestração e consolidação.
- **sm:** acompanhamento de execução, prazos e bloqueios.
- **pm:** detalhamento operacional de plano/entrega.
- **review-lead + qa:** validação formal.

## Conselho estratégico
- project-director
- operations-director
- strategy-director
- architect
- (+ especialista técnico quando necessário)

## RACI por etapa do rito v2
1. **ABERTURA** — A: orquestrador-haos | R: pm/analyst | C: sm | I: conselho
2. **CONSELHO-Fase1** — A: project-director | R: conselho estratégico | C: especialista técnico | I: orquestrador
3. **REPORT-SOLICITANTE** — A/R: orquestrador-haos | C: pm | I: conselho
4. **CONSELHO-Fase2** — A: project-director | R: conselho estratégico | C: orquestrador | I: squads
5. **MEGA_BRAIN** — A: orquestrador-haos | R: project-director/strategy-director/architect | C: pm | I: sm
6. **DIRETOR** — A: project-director | R: pm | C: architect/sm | I: orquestrador
7. **ESTRATEGISTA** — A: strategy-director | R: analyst/data-engineer/tracking-engineer (conforme tema) | C: orquestrador | I: squads
8. **EXECUCAO** — A: orquestrador-haos | R: squad especialista | C: sm | I: conselho
9. **VALIDACAO** — A: review-lead | R: qa + especialista executor | C: sm | I: orquestrador
10. **CONSELHO_SE_REPROVADO** — A: project-director | R: conselho + especialista técnico | C: orquestrador | I: solicitante
11. **CONSELHO_Final_Aprovado** — A: conselho | R: orquestrador | C: review-lead | I: squads
12. **ENTREGA** — A: orquestrador-haos | R: pm + especialista dono | C: sm | I: conselho
13. **REGISTRO** — A: orquestrador-haos | R: pm/sm | C: especialista dono | I: conselho

## Regras transversais
- Loop de reprovação no `CONSELHO_SE_REPROVADO`: **máx 3** ciclos.
- REGISTRO final deve apontar documentação em `Tarefas/Projetos/<tarefa-ou-projeto>` (vault de tarefas/projetos).

## Regra de reporte transversal
Para cada etapa e agente:
`[timestamp][modelo llm][etapa][agente][ação][evidência][status/bloqueio]`
