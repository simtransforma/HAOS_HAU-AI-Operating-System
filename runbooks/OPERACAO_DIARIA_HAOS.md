# Runbook — Operação Diária HAOS

## Objetivo
Garantir execução diária com rito completo, sem desvio de escopo e com evidência auditável.

## Pré-requisitos
- Repositório atualizado
- Ambiente de execução disponível (PowerShell)
- Templates preenchíveis acessíveis

## Passo a passo
1. **Pré-check:** preencher `PRE_EXEC_CHECKLIST.md`.
2. **Abertura da tarefa:** usar `TASK_OPENING_TEMPLATE.md`.
3. **Início técnico:**
   ```powershell
   ./scripts/haos_run.ps1 -TaskTitle "<titulo>" -SkillName "<skill>"
   ```
4. **Evolução de etapa (sem pulo):**
   ```powershell
   ./scripts/haos_stage.ps1 -Stage CONSELHO -Evidence "<evidencia>"
   ```
5. **Retorno de fase (quando necessário):**
   ```powershell
   ./scripts/haos_return.ps1 -ReturnTo DIRETOR -Reason "<motivo>"
   ```
6. **Registro de evidências:** preencher `EVIDENCE_TEMPLATE.md`.
7. **Reporte operacional contínuo:** usar o formato oficial.
8. **Fechamento:** concluir em `REGISTRO` + atualizar memória.

## SLAs operacionais
- Update anti-silêncio: até 3 min
- Timeout agente: 7 min (com contingência)

## Evidências mínimas por tarefa
- Comandos executados
- Artefatos alterados
- Resultado de validação
- Próximo passo
