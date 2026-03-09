# HAOS_RUNBOOK.md

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

## REGISTRO obrigatório em Obsidian
Além de memória/log local, registrar em:
`Tarefas/Projetos/<tarefa-ou-projeto>/`

Regra fixa adicional (V7+):
- Correção/tarefa operacional concluída também exige resumo técnico na `HAOS-Obsidian-Vault`.

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

## Fechamento obrigatório da tarefa
Só considerar concluída quando:
1. entrega validada
2. registro na vault correta
3. confirmação no chat com o caminho do registro
