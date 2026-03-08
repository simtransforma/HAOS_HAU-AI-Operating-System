# Metodologias Base do HAOS

## Objetivo
Documentar, com transparência, as bases conceituais usadas na construção do HAOS.

## Bases de referência usadas

### 1) MEGA-BRAIN
- Uso no HAOS: referência estrutural para organização de conhecimento, síntese e apoio a decisão.
- No HAOS atual: funciona como base de suporte conceitual/técnico, não substitui o rito operacional oficial.
- Evidência no repo: `HAOS/core-base/mega-brain/` e `HAOS/MEGA_BRAIN_ADAPTATION_MAP.md`.

### 2) AIOS
- Uso no HAOS: influência de práticas de operação por agentes e disciplina de execução.
- No HAOS atual: conceitos absorvidos e adaptados para a governança HAOS, sem dependência do legado.
- Observação: HAOS mantém contrato, pipeline e handoffs próprios.

### 3) BMAD
- Uso no HAOS: referência para organização por fases, tomada de decisão e disciplina de entrega.
- No HAOS atual: princípios adaptados ao contexto de squad, gates e validação formal.
- Observação: BMAD é base inspiracional; o método oficial é o HAOS v2 documentado neste repositório.

## Posição oficial
O HAOS é um método próprio, com identidade operacional definida em:
- `HAOS/HAOS_CONTRACT.md`
- `HAOS/HAOS_PIPELINE.md`
- `HAOS/HAOS_HANDOFFS.md`
- `HAOS/HAOS_RACI.md`
- `HAOS/HAOS_RUNBOOK.md`

## Princípios que ficaram no HAOS
- Governança por rito com gates.
- Delegação por especialistas (main como orquestrador).
- Evidência obrigatória por etapa.
- Registro e rastreabilidade obrigatórios.

## O que foi customizado
- Rito HAOS v2 com fases de conselho (Fase1/Fase2 + report ao solicitante).
- Loop de reprovação controlado (máx 3 ciclos).
- Exceção de comando rápido (`#`) para modo direto sem rito em tarefas simples.

