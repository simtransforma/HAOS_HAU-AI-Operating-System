# HAOS_CONTRACT.md

## Regras invioláveis
1. Toda tarefa operacional no rito inicia no HAOS v2 completo.
2. Main atua como orquestrador; execução operacional é delegada ao especialista.
3. Sem pular etapas, sem pular evidência.
4. Reprovação volta para `CONSELHO_SE_REPROVADO` (máx 3 ciclos).
5. REGISTRO final é obrigatório (memória/log + Obsidian).
6. Formato obrigatório de reporte:
   `[timestamp][modelo llm][etapa][agente][ação][evidência][status/bloqueio]`
7. Em tarefa complexa no rito v2, `CONSELHO-Fase1` exige questionamento explícito ao solicitante e `REPORT-SOLICITANTE` exige resposta explícita do solicitante. Sem isso, a tarefa fica bloqueada e não pode avançar para `CONSELHO-Fase2`.
8. `hard gate` nunca avança com campos obrigatórios ausentes.
9. `soft gate` só pode avançar com justificativa explícita, warnings registrados e trilha auditável no `history`.

## Roteamento oficial de entrada
1. O rito HAOS v2 só abre com mensagem iniciando por `#`.
2. Sem `#`, o main não pode abrir rito por inferência de complexidade.
3. Sem `#`, `@agente` e `@departamento` significam consulta dirigida (sem rito).
4. `#` tem precedência máxima sobre qualquer heurística.
5. Frases como “depois abrir no rito”, sem `#`, não autorizam abertura imediata.

## Definição de violação
Constitui violação:
- marcar `CONSELHO-Fase1` como `OK` sem bloco de perguntas enviado;
- marcar `REPORT-SOLICITANTE` como `OK` sem resposta do solicitante referenciada;
- abrir rito sem mensagem iniciando com `#`;
- marcar `EXECUCAO` como `DONE` sem evidência visual (screenshot/curl/browser) do produto em produção;
- agente de execução fazer build local e não fazer deploy quando a tarefa exige entrega em produção;
- main corrigir resultados da execução sozinho sem re-acionar o rito (viola regra 2: execução é delegada ao especialista);
- main omitir reports de sub-agentes ao solicitante — cada reporte deve ser repassado ao Gian no chat.

## Regra de reports (nova — obrigatória)
- Durante o rito, a cada etapa concluída por sub-agente, main repassa o report ao Gian
- Formato de repasse: `✅ [agente] — [etapa]: [evidência]`
- main não avança etapa sem confirmar conclusão ao Gian
- Falha/bloqueio também deve ser reportado imediatamente: `❌ [agente] — BLOQUEADO: [motivo]`

## Fluxo oficial
`ABERTURA -> CONSELHO-Fase1 -> REPORT-SOLICITANTE -> CONSELHO-Fase2 -> MEGA_BRAIN -> DIRETOR -> ESTRATEGISTA -> EXECUCAO -> VALIDACAO -> (se reprovado: CONSELHO_SE_REPROVADO [máx 3] -> MEGA_BRAIN) -> CONSELHO_Final_Aprovado -> ENTREGA -> REGISTRO`
