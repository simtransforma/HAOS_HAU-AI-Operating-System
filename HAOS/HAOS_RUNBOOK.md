# HAOS_RUNBOOK.md

## 0) TRIAGEM DE ENTRADA
Classificar toda mensagem em exatamente um modo:
- **direto**: sem `#` e sem `@agente`/`@departamento`;
- **especialista**: sem `#`, com `@agente`;
- **departamento**: sem `#`, com `@departamento`;
- **rito**: começando com `#`.

Regra: o runbook só entra na fase `ABERTURA` quando a triagem classificar a entrada como **rito**.

### Recibo mínimo da triagem (interno)
Registrar uma linha curta:
- `route=direct|specialist|department|rito`
- `trigger=#|@|none`
- `agents=...`
- `rito=true|false`

### Escalonamento conservador
- Ambíguo entre direto e rito -> **direto**.
- Ambíguo entre especialista e rito -> **especialista**.
- Rito só com gatilho explícito (`#`).

### Guardrails de execução
1. `#` é o único gatilho que abre rito por padrão.
2. Sem `#`, nunca abrir rito por inferência.
3. `@agente` e `@departamento` sem `#` são consulta, não rito.
4. Em ambiguidade, escolher o modo menos escalado.
5. Erro repetido do mesmo tipo vira item de correção sistêmica.

## Operação padrão (rito v2)
1) ABERTURA
2) CONSELHO-Fase1
3) REPORT-SOLICITANTE
4) CONSELHO-Fase2
5) MEGA_BRAIN
6) DIRETOR
7) ESTRATEGISTA
8) EXECUCAO (delegada por squad)
9) VALIDACAO
10) Se reprovado: CONSELHO_SE_REPROVADO (máx 3) e voltar para MEGA_BRAIN
11) CONSELHO_Final_Aprovado
12) ENTREGA
13) REGISTRO

## Tabela de decisão (Fase1/Report)
- Sem resposta do solicitante -> `blocked_waiting_solicitante` / `BLOCKED_WAITING_SOLICITANTE` (não avança)
- Resposta parcial -> `REPORT-SOLICITANTE` continua aberto
- Resposta suficiente -> libera `CONSELHO-Fase2`

## Gates
- Gate A: CONSELHO-Fase1
- Gate B: CONSELHO-Fase2
- Gate C: VALIDACAO
- Gate R: CONSELHO_SE_REPROVADO
- Gate F: CONSELHO_Final_Aprovado
- DONE: ENTREGA + REGISTRO

## Regras críticas
- main (orquestrador) não implementa operacional em modo solo.
- evidência obrigatória por etapa.
- reporte obrigatório por etapa e agente.
- loop de reprovação limitado a 3 ciclos.
- seguir `HAOS_EXECUTION_STORAGE_RULES.md` para confirmação pré-ação, escopo de correção, commits, vault e armazenamento.

## Formato de reporte obrigatório
`[timestamp][modelo llm][etapa][agente][ação][evidência][status/bloqueio]`

## Política de velocidade (anti-cartório)
- Operação diária: **sem burocracia extra**.
- Validação completa (`haos:doctor` + `haos:test-acceptance`): **somente** antes de mudanças estruturais/publicação relevante.
- Se não houver drift real, não adicionar novos gates obrigatórios.

## REGISTRO obrigatório em Obsidian
Além de memória/log local, registrar em:
`Tarefas/Projetos/<tarefa-ou-projeto>/`

Estrutura mínima da nota:
- Contexto
- Conselho Fase1/Fase2
- Decisão e plano
- Evidências de execução/validação
- Resultado
- Pendências/Próximos passos

## Recibo visível na triagem (V6)
- Após classificar a entrada, emitir resposta visível curta ao solicitante antes de iniciar execução.
- Conteúdo mínimo: entendimento, modo, quem entra (se houver), próximo passo.

## Atualizações obrigatórias ao solicitante (V6)
Atualizar quando houver mudança relevante:
- entrada/saída de agente
- mudança de etapa
- mudança de tarefa
- bloqueio
- conclusão da parte prometida

Template recomendado:
`Atualização: [mudança]. [quem está envolvido agora]. Próximo passo: [ação seguinte].`

## Regra anti-spam (V6)
- Não atualizar quando nada relevante mudou.
- Não gerar atualização ornamental.
