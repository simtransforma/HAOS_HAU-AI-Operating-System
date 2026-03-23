# HAOS_PIPELINE.md

## Rito canônico v2 (obrigatório)
`ABERTURA -> CONSELHO-Fase1 -> REPORT-SOLICITANTE -> CONSELHO-Fase2 -> MEGA_BRAIN -> DIRETOR -> ESTRATEGISTA -> EXECUCAO -> VALIDACAO -> (se reprovado: CONSELHO_SE_REPROVADO [máx 3] -> MEGA_BRAIN) -> CONSELHO_Final_Aprovado -> ENTREGA -> REGISTRO`

## Regra curta obrigatória
No rito v2, `CONSELHO-Fase1` não termina com “OK”; termina com perguntas ao solicitante. `REPORT-SOLICITANTE` não termina com “OK”; termina com respostas do solicitante consolidadas. Sem isso, não existe `CONSELHO-Fase2`.

## Dicionário canônico de status
| Semântica | Runtime | Reporte humano |
|---|---|---|
| Em progresso | `in_progress` | `IN_PROGRESS` |
| Bloqueado aguardando solicitante | `blocked_waiting_solicitante` | `BLOCKED_WAITING_SOLICITANTE` |
| Bloqueado por dependência/evidência | `blocked_dependency` | `BLOCKED_DEPENDENCY` |
| Em retrabalho | `rework` | `REWORK` |
| Concluído | `done` | `DONE` |

Regra adicional: `soft gate` pode avançar com `gate_ok=false` somente com justificativa explícita e warnings auditáveis. `hard gate` sem evidência suficiente bloqueia.

## Etapas e saídas obrigatórias
### ABERTURA
- Entrada obrigatória: demanda recebida.
- Ações obrigatórias: definir objetivo, escopo, restrições e definição de pronto.
- Saída obrigatória: consolidação inicial validada.
- Critério de passagem: escopo inicial validado.
- Proibições: iniciar execução sem escopo.
- Status quando bloqueado: `blocked_dependency`.

### CONSELHO-Fase1
- Entrada obrigatória: ABERTURA concluída com escopo inicial.
- Ações obrigatórias:
  1. Debater risco, contexto e alternativas.
  2. Produzir lista de dúvidas e questionamentos para o solicitante.
  3. Enviar o bloco de perguntas ao solicitante antes de avançar.
- Saída obrigatória: ata/resumo, bloco de perguntas, linha de reporte.
- Critério de passagem: bloco de perguntas efetivamente enviado ao solicitante.
- Proibições: marcar OK sem perguntas; pular para Fase2 sem REPORT; assumir autorização implícita.
- Status quando bloqueado: `blocked_waiting_solicitante`.

### REPORT-SOLICITANTE
- Entrada obrigatória: perguntas da Fase1 enviadas ao solicitante.
- Ações obrigatórias:
  1. Receber e registrar a resposta do solicitante.
  2. Consolidar respostas, mudanças de escopo, restrições e decisões.
  3. Identificar dúvidas remanescentes.
- Saída obrigatória: resposta referenciada + consolidação + ajustes de escopo + linha de reporte.
- Critério de passagem: resposta explícita do solicitante registrada.
- Proibições: usar instrução antiga/inferência como resposta nova; marcar OK sem resposta.
- Status quando bloqueado: `blocked_waiting_solicitante`.

### CONSELHO-Fase2
- Entrada obrigatória: REPORT-SOLICITANTE concluído com resposta registrada.
- Ações obrigatórias: definir direção, risco, prioridade e trade-offs.
- Saída obrigatória: decisão de rota + briefing validado + KPI alvo.
- Critério de passagem: decisão formal registrada.
- Proibições: iniciar sem resposta do solicitante.
- Status quando bloqueado: `blocked_dependency`.

### MEGA_BRAIN
- Objetivo: síntese executiva única.
### DIRETOR
- Objetivo: plano operacional com critérios de aceite.
### ESTRATEGISTA
- Objetivo: ordem de testes/árvore de decisão.
### EXECUCAO
- Objetivo: implementação por squad especialista.
- **Gate interno obrigatório:** build OK → deploy → evidência visual → DONE.
- Agente não pode marcar DONE sem evidência visual em produção.
- Main repassa report de cada agente ao Gian no chat durante execução.
### VALIDACAO
- Objetivo: aprovação/reprovação com evidência.
- **Evidência obrigatória:** teste funcional em produção (não só local).
### CONSELHO_SE_REPROVADO
- Objetivo: debater correção após reprovação (máx 3 ciclos).
### CONSELHO_Final_Aprovado
- Objetivo: go/no-go formal.
### ENTREGA
- Objetivo: resultado + evidências.
### REGISTRO
- Objetivo: trilha auditável + documentação no Obsidian.

## Gates obrigatórios
- Gate A: CONSELHO-Fase1 + REPORT-SOLICITANTE
- Gate B: CONSELHO-Fase2
- Gate C: VALIDACAO
- Gate R: CONSELHO_SE_REPROVADO
- Gate F: CONSELHO_Final_Aprovado
- Gate DONE: ENTREGA + REGISTRO

## Formato obrigatório de reporte
`[timestamp][modelo llm][etapa][agente][ação][evidência][status/bloqueio]`
