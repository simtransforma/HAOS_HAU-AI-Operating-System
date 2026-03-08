# HAOS_AUDITORIA_SEMANAL_CHECKLIST.md

## Objetivo
Garantir que o rito HAOS v2 e a separação de vaults continuam íntegros.

## Frequência
- Semanal (1x por semana)
- Extra após mudanças estruturais no processo

## Checklist (marcar OK/NOK)

### 1) Rito canônico v2
- [ ] `HAOS_PIPELINE.md` mantém fluxo oficial v2 completo.
- [ ] Loop `CONSELHO_SE_REPROVADO` limitado a 3 ciclos.
- [ ] Gates A/B/C/R/F/DONE estão descritos e coerentes.

### 2) Regras e governança
- [ ] `HAOS_CONTRACT.md` mantém regra de main-orquestrador (sem execução solo).
- [ ] Formato obrigatório de reporte está padronizado:
  `[timestamp][modelo llm][etapa][agente][ação][evidência][status/bloqueio]`
- [ ] `HAOS_RACI.md` cobre todas as etapas do rito v2.

### 3) Operação e handoffs
- [ ] `HAOS_RUNBOOK.md` está alinhado com rito v2.
- [ ] `HAOS_HANDOFFS.md` cobre handoffs da fase1/fase2/report e loop de reprovação.

### 4) Obsidian (separação correta)
- [ ] `HAOS-Obsidian-Vault` contém apenas documentação do sistema HAOS.
- [ ] `Tarefas-Projetos-Vault` contém execução operacional em `Tarefas/Projetos/<nome>/`.
- [ ] Nenhuma tarefa operacional foi criada na vault de sistema.

### 5) Versionamento obrigatório (vault de sistema)
- [ ] `VERSAO_ATUAL.md` atualizado com versão/data/resumo.
- [ ] `CHANGELOG.md` atualizado com alterações relevantes.

### 6) Consistência de repositório
- [ ] Mudanças de processo estão com commit em `HAOS_HAU-AI-Operating-System`.
- [ ] Push aplicado em `origin/main`.
- [ ] Não há drift entre docs principais do HAOS.

## Registro da auditoria
- Data:
- Responsável:
- Resultado geral: OK / NOK
- Ações corretivas:
- Prazo de correção:

