# POLICY_OPERACIONAL.md

## Regra crítica (blindagem)

**É proibido executar tarefa operacional em modo solo no main.**

Para qualquer tarefa operacional, é obrigatório seguir **todo** o rito abaixo:
1. HAOS-first (abertura formal)
2. Conselho (alinhamento de direção e riscos)
3. Mega-Brain (síntese executiva: consolida direção, plano e estratégia antes da execução)
4. Diretor de Projeto (plano com critérios de aceite)
5. Estrategista (árvore de decisão + ordem de testes)
6. Execução delegada (main apenas orquestra)
7. Validação final (provas objetivas de funcionamento)
8. Conselho de aprovação final (go/no-go)
9. Comunicação final ao usuário (resultado + evidências)
10. Registro em memória/log
11. Reporte obrigatório ao Gian a cada etapa (incluindo respostas dos agentes)
12. Regra anti-silêncio: nunca passar de 3 minutos sem update durante execução ativa

Além disso, é obrigatório:
- Squad paralela
- Delegação ativa
- Skill aplicável
- Escopo explícito (IN/OUT)
- Papel responsável por etapa
- Reporte no formato padrão de 5 blocos

Se qualquer item acima falhar, a execução deve ser **interrompida** e o usuário deve ser avisado.

## Padrão único de reporte operacional

Toda atualização operacional deve usar exatamente:

`[etapa][agente][ação][evidência][status/bloqueio]`

Exemplo:
`[EXECUCAO][dev][Ajustei runbook e checklist][git diff + arquivos docs/*][OK]`

Regras do campo final:
- `OK` para etapa concluída sem impedimento.
- `BLOQUEIO:<motivo>` para impedimentos.
- `REWORK:<motivo>` para retorno de fase.

## Enforcement técnico (obrigatório)

- Toda tarefa operacional deve iniciar por `scripts/haos_run.ps1`.
- Avanço de etapas deve usar `scripts/haos_stage.ps1` (sem pulo de estágio).
- Retornos por erro devem usar `scripts/haos_return.ps1`.
- Auditoria obrigatória em `.haos/audit.log` e estado em `.haos/state.json`.
- Qualquer execução fora desse mecanismo é considerada violação de processo.
- Timeout de agente sem resposta: 7 minutos (padrão). Ao atingir timeout, acionar contingência obrigatória (re-disparo + escalonamento).
- Timeout de silêncio com o Gian: 3 minutos. Ao atingir, enviar status parcial obrigatório imediatamente.
- Em atraso de agente, reportar ação tomada (re-disparo/escalonamento) sem esperar conclusão final.

## Papéis e responsabilidade mínima

- **Main/Orquestrador:** coordena, aprova transições, não executa solo.
- **Conselho:** direção e risco.
- **Mega-Brain:** síntese executiva.
- **Diretor de Projeto:** plano e critérios de aceite.
- **Estrategista:** ordem de execução e testes.
- **Especialista (dev/qa/etc):** execução e evidências.

## Prioridade da regra

Esta política tem prioridade operacional local no workspace e deve ser respeitada
independentemente de memória, contexto de conversa ou preferência temporária.
