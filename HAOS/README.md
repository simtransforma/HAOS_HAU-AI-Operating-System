# HAOS

Runtime e operação do HAU AI Operating System.

## Rito canônico v2 (obrigatório)
`ABERTURA -> CONSELHO-Fase1 -> REPORT-SOLICITANTE -> CONSELHO-Fase2 -> MEGA_BRAIN -> DIRETOR -> ESTRATEGISTA -> EXECUCAO -> VALIDACAO -> (se reprovado: CONSELHO_SE_REPROVADO [máx 3] -> MEGA_BRAIN) -> CONSELHO_Final_Aprovado -> ENTREGA -> REGISTRO`

## Formato obrigatório de reporte
`[timestamp][modelo llm][etapa][agente][ação][evidência][status/bloqueio]`

## Exceção de comando rápido (`#`)
Se a mensagem do Gian começar com `#`, operar em **modo direto (sem rito HAOS)** para:
- dúvidas rápidas
- conversa
- consultas simples
- tarefas simples

## Setup
```bash
cd HAOS
npm run haos:setup
npm run haos:doctor
npm run haos:golive
npm run haos:start
npm run haos:kb-build
npm run haos:kb-search -- --query "conselho fase1"
```

## Referências de operação
- `HAOS_PIPELINE.md`
- `HAOS_CONTRACT.md`
- `HAOS_RACI.md`
- `HAOS_HANDOFFS.md`
- `HAOS_RUNBOOK.md`
- `HAOS_AUDITORIA_SEMANAL_CHECKLIST.md`
- `HAOS_FAQ_RAPIDO.md`

## Registro obrigatório
Toda entrega concluída precisa ser registrada em memória/log e também em Obsidian.

Separação de vaults:
- **Vault de sistema HAOS**: documentação do método/sistema (sem tarefas operacionais).
- **Vault de tarefas/projetos**: execução operacional em `Tarefas/Projetos/<tarefa-ou-projeto>/`.
