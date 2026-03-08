# HAOS_PIPELINE.md

## Rito canônico v2 (obrigatório)
`ABERTURA -> CONSELHO-Fase1 -> REPORT-SOLICITANTE -> CONSELHO-Fase2 -> MEGA_BRAIN -> DIRETOR -> ESTRATEGISTA -> EXECUCAO -> VALIDACAO -> (se reprovado: CONSELHO_SE_REPROVADO [máx 3] -> MEGA_BRAIN) -> CONSELHO_Final_Aprovado -> ENTREGA -> REGISTRO`

## Etapas e saídas obrigatórias
### ABERTURA
**Objetivo:** entender tarefa, necessidade e objetivo.
**Saída:** consolidação inicial (escopo, objetivo, restrições, definição de pronto).

### CONSELHO-Fase1
**Objetivo:** pesquisa de mercado + debate técnico/estratégico.
**Saída:** lista de dúvidas e questionamentos para o solicitante.

### REPORT-SOLICITANTE
**Objetivo:** reportar dúvidas e consolidar respostas do solicitante.
**Saída:** consolidação de respostas e ajustes de escopo.

### CONSELHO-Fase2
**Objetivo:** direção, risco, prioridade, trade-offs.
**Saída:** decisão de rota + riscos aceitos + prioridades + briefing validado + KPI alvo.

### MEGA_BRAIN
**Objetivo:** síntese executiva única (sem conflito entre frentes).
**Saída:** plano consolidado para execução.

### DIRETOR
**Objetivo:** transformar direção em plano operacional com aceite.
**Saída:** plano com critérios de aceite + cronograma + dependências.

### ESTRATEGISTA
**Objetivo:** ordem de testes e árvore de decisão.
**Saída:** sequência com hipóteses + checkpoints.

### EXECUCAO
**Objetivo:** implementação real por squad especialista.
**Saída:** artefatos executados + evidências objetivas.

### VALIDACAO
**Objetivo:** provar qualidade e conformidade.
**Saída:** aprovado/reprovado + correções.

### CONSELHO_SE_REPROVADO
**Objetivo:** debater soluções após reprovação.
**Saída:** consolidação + próximos passos.
**Regra:** loop máximo de 3 ciclos; após isso, escalar decisão ao solicitante.

### CONSELHO_Final_Aprovado
**Objetivo:** decisão formal final.
**Saída:** go/no-go formal.

### ENTREGA
**Objetivo:** entregar resultado com clareza executiva.
**Saída:** entrega final + evidências.

### REGISTRO
**Objetivo:** fechar trilha de auditoria/memória.
**Saída:** memória/log atualizados + pendências + documentação no Obsidian organizada em `Tarefas/Projetos/<tarefa-ou-projeto>/`.

## Gates obrigatórios
- Gate A: CONSELHO-Fase1 concluído.
- Gate B: CONSELHO-Fase2 concluído.
- Gate C: VALIDACAO aprovada.
- Gate R: CONSELHO_SE_REPROVADO (quando houver reprovação).
- Gate F: CONSELHO_Final_Aprovado (go/no-go).
- Gate DONE: ENTREGA + REGISTRO concluídos.

## Formato obrigatório de reporte (cada etapa e cada agente)
`[timestamp][modelo llm][etapa][agente][ação][evidência][status/bloqueio]`
