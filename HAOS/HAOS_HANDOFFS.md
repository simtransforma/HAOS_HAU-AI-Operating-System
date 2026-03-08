# HAOS_HANDOFFS.md

## Regra
Nenhuma etapa troca de mão sem pacote mínimo completo.

## Pacote mínimo de handoff
- contexto e objetivo da etapa
- decisões tomadas
- evidências (links/logs/prints/IDs)
- riscos e pendências
- próxima ação recomendada
- linha de reporte no padrão obrigatório

## Cadeia de handoffs (rito v2)
1. ABERTURA -> CONSELHO-Fase1
2. CONSELHO-Fase1 -> REPORT-SOLICITANTE
3. REPORT-SOLICITANTE -> CONSELHO-Fase2
4. CONSELHO-Fase2 -> MEGA_BRAIN
5. MEGA_BRAIN -> DIRETOR
6. DIRETOR -> ESTRATEGISTA
7. ESTRATEGISTA -> EXECUCAO
8. EXECUCAO -> VALIDACAO
9. VALIDACAO reprovado -> CONSELHO_SE_REPROVADO -> MEGA_BRAIN (até 3 ciclos)
10. VALIDACAO aprovado -> CONSELHO_Final_Aprovado -> ENTREGA -> REGISTRO

## Regra de reprovação
- Cada reprovação deve registrar causa e ação corretiva.
- Loop no `CONSELHO_SE_REPROVADO`: **máx 3** ciclos.
- Ultrapassando 3 ciclos: escalar decisão ao solicitante.

## REGISTRO e trilha Obsidian
- O handoff final para REGISTRO deve incluir link/caminho da documentação em:
  `Tarefas/Projetos/<tarefa-ou-projeto>`

## Formato obrigatório de reporte
`[timestamp][modelo llm][etapa][agente][ação][evidência][status/bloqueio]`
