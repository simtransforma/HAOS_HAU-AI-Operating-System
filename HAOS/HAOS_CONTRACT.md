# HAOS_CONTRACT.md

## 1) Regra de autoridade
- O main atua como **orquestrador**.
- Execução operacional é sempre delegada ao especialista da squad.
- Decisões de direção passam por Conselho.

## 2) Regras invioláveis
1. Toda tarefa operacional começa no rito HAOS v2 completo.
1.1 Exceção: mensagens do Gian iniciadas com `#` entram em modo direto (sem rito), para dúvidas/consultas/tarefas simples.
2. Main não executa implementação operacional em modo solo.
3. Toda etapa deve ter evidência objetiva.
4. Reprovação exige retorno ao fluxo via `CONSELHO_SE_REPROVADO`.
5. Loop de reprovação é limitado a **3 ciclos**.
6. Registro final é obrigatório (inclui Obsidian organizado por tarefa/projeto).
7. Mensageria externa segue política de segurança definida em USER.md/MEMORY.md.

## 3) Fluxo obrigatório
`ABERTURA -> CONSELHO-Fase1 -> REPORT-SOLICITANTE -> CONSELHO-Fase2 -> MEGA_BRAIN -> DIRETOR -> ESTRATEGISTA -> EXECUCAO -> VALIDACAO -> (se reprovado: CONSELHO_SE_REPROVADO [máx 3] -> MEGA_BRAIN) -> CONSELHO_Final_Aprovado -> ENTREGA -> REGISTRO`

## 4) Formato obrigatório de reporte
`[timestamp][modelo llm][etapa][agente][ação][evidência][status/bloqueio]`

Sem pular etapas, sem pular agentes envolvidos, sem pular evidência.

## 5) Definition of Done
Uma tarefa só fecha quando:
- passou pelos gates obrigatórios;
- tem entrega com evidências;
- tem REGISTRO final em memória/log + Obsidian em `Tarefas/Projetos/<tarefa-ou-projeto>/`.
