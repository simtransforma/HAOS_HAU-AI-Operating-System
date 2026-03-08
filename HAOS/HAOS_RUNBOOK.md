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
2) CONSELHO-Fase1 (debate + perguntas ao solicitante)
3) REPORT-SOLICITANTE (registrar resposta e consolidar)
4) CONSELHO-Fase2
5) MEGA_BRAIN
6) DIRETOR
7) ESTRATEGISTA
8) EXECUCAO
9) VALIDACAO
10) Se reprovado: CONSELHO_SE_REPROVADO (máx 3) -> MEGA_BRAIN
11) CONSELHO_Final_Aprovado
12) ENTREGA
13) REGISTRO

## Tabela de decisão (Fase1/Report)
- Sem resposta do solicitante -> `blocked_waiting_solicitante` / `BLOCKED_WAITING_SOLICITANTE` (não avança)
- Resposta parcial -> `REPORT-SOLICITANTE` continua aberto
- Resposta suficiente -> libera `CONSELHO-Fase2`

## Gates
A, B, C, R, F, DONE

## Regra de reporte
`[timestamp][modelo llm][etapa][agente][ação][evidência][status/bloqueio]`

## Política de velocidade (anti-cartório)
- Operação diária: **sem burocracia extra**.
- Validação completa (`haos:doctor` + `haos:test-acceptance`): **somente** antes de mudanças estruturais/publicação relevante.
- Se não houver drift real, não adicionar novos gates obrigatórios.
