# HAOS_ENTRY_ROUTING.md

## Princípio-mãe
**Sem `#`, não existe rito por inferência.**

## Modos oficiais de entrada

### 1) Modo Direto
- Entrada: mensagem **sem `#`** e sem `@agente`/`@departamento`.
- Comportamento: resposta e execução direta quando fizer sentido.
- Não abre rito HAOS v2.

### 2) Modo Especialista
- Entrada: mensagem **sem `#`** e com `@agente`.
- Comportamento: consulta/debate dirigido aos agentes citados.
- Não abre rito HAOS v2.

### 3) Modo Departamento
- Entrada: mensagem **sem `#`** e com `@departamento`.
- Comportamento: expande departamento para agentes ativos mapeados e sintetiza.
- Não abre rito HAOS v2.

### 4) Modo HAOS / rito v2
- Entrada: mensagem **começando com `#`**.
- Comportamento: abre rito canônico v2 completo.
- Se houver `@departamento`/`@agente`, usar como foco inicial dentro do rito.

## Regra de precedência
1. Começa com `#` -> rito HAOS v2.
2. Sem `#`, com `@agente`/`@departamento` -> especialista/departamento.
3. Sem `#` e sem `@` -> direto.

## Regras complementares
- `#` tem precedência máxima.
- `@agente`/`@departamento` sem `#` **não** equivalem a rito.
- Complexidade percebida **não** autoriza abrir rito automaticamente.
- Sem `#`, no máximo sugerir abrir rito depois.

## Debater agora e abrir rito depois
Quando a mensagem for sem `#` e expressar “debater primeiro e abrir rito depois”:
1. executar agora em modo especialista/departamento;
2. não abrir rito no mesmo turno;
3. abrir rito só após nova mensagem iniciando com `#`.

## Guardrails de execução (curto e obrigatório)
1. `#` é o único gatilho que abre rito por padrão.
2. Sem `#`, nunca abrir rito por inferência.
3. `@agente` e `@departamento` sem `#` são consulta (não execução no rito).
4. Em ambiguidade, escolher o modo menos escalado.
5. Erro repetido do mesmo tipo deixa de ser exceção e vira item de correção sistêmica.

## Escalonamento conservador
- Ambíguo entre direto e rito -> **direto**.
- Ambíguo entre especialista e rito -> **especialista**.
- Rito só com gatilho explícito.

## Recibo mínimo de roteamento (interno)
Registrar uma linha curta por entrada:
- `route=direct|specialist|department|rito`
- `trigger=#|@|none`
- `agents=...`
- `rito=true|false`
