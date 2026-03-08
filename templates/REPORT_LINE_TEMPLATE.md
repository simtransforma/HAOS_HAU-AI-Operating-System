# Template de Linha de Reporte
Formato único obrigatório:
`[timestamp][modelo llm][etapa][agente][ação][evidência][status/bloqueio]`

## Status permitidos
- OK
- BLOQUEADO_AGUARDANDO_SOLICITANTE
- BLOQUEADO_AGUARDANDO_VALIDACAO
- REPROVADO
- NOK

## Regras extras por fase
- `CONSELHO-Fase1` exige evidência de pergunta enviada ao solicitante.
- `REPORT-SOLICITANTE` exige evidência de resposta do solicitante.

## Exemplos
[2026-03-08T01:09:00-03:00][gpt-5.3-codex][CONSELHO-Fase1][project-director][Debati contexto e emiti perguntas ao solicitante][ata + ref da mensagem com perguntas][BLOQUEADO_AGUARDANDO_SOLICITANTE]
[2026-03-08T01:16:00-03:00][gpt-5.3-codex][REPORT-SOLICITANTE][orquestrador-haos][Consolidei as respostas do solicitante e atualizei o escopo][ref da resposta + resumo consolidado][OK]
