# HAOS_CONTRACT.md

## Regras invioláveis
1. Toda tarefa operacional inicia no rito HAOS v2 completo.
2. Main atua como orquestrador; execução operacional é delegada ao especialista.
3. Sem pular etapas, sem pular evidência.
4. Reprovação volta para `CONSELHO_SE_REPROVADO` (máx 3 ciclos).
5. REGISTRO final é obrigatório (memória/log + Obsidian).
6. Formato obrigatório de reporte:
   `[timestamp][modelo llm][etapa][agente][ação][evidência][status/bloqueio]`
7. Exceção `#`: modo direto sem rito para dúvidas/consultas/tarefas simples.
8. Em tarefa complexa no rito v2, `CONSELHO-Fase1` exige questionamento explícito ao solicitante e `REPORT-SOLICITANTE` exige resposta explícita do solicitante. Sem isso, a tarefa fica bloqueada e não pode avançar para `CONSELHO-Fase2`.
9. `hard gate` nunca avança com campos obrigatórios ausentes.
10. `soft gate` só pode avançar com justificativa explícita, warnings registrados e trilha auditável no `history`.

## Definição de violação
Constitui violação marcar `CONSELHO-Fase1` como `OK` sem bloco de perguntas enviado, ou marcar `REPORT-SOLICITANTE` como `OK` sem resposta do solicitante referenciada.

## Fluxo oficial
`ABERTURA -> CONSELHO-Fase1 -> REPORT-SOLICITANTE -> CONSELHO-Fase2 -> MEGA_BRAIN -> DIRETOR -> ESTRATEGISTA -> EXECUCAO -> VALIDACAO -> (se reprovado: CONSELHO_SE_REPROVADO [máx 3] -> MEGA_BRAIN) -> CONSELHO_Final_Aprovado -> ENTREGA -> REGISTRO`
