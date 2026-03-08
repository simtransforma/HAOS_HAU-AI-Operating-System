# Sistema HAOS Completo — Arquitetura, Processos e Operação

> Versão: 2026-03-06  
> Escopo: repositório `simtransforma/HAOS_HAU-AI-Operating-System`

## 1) Visão Geral
HAOS é o sistema operacional de execução por agentes com governança por rito, validação e evidência.

## 2) Modelo operacional oficial
**Diretriz oficial:** CORE HAOS executa; mega-brain apenas referencia padrões e apoio conceitual.

## 3) Pipeline oficial (rito obrigatório)
**ABERTURA → CONSELHO-Fase1 → REPORT-SOLICITANTE → CONSELHO-Fase2 → MEGA_BRAIN → DIRETOR → ESTRATEGISTA → EXECUCAO → VALIDACAO → (se reprovado: CONSELHO_SE_REPROVADO [máx 3] → MEGA_BRAIN) → CONSELHO_Final_Aprovado → ENTREGA → REGISTRO**

### Definições curtas por etapa
1. **ABERTURA:** formaliza demanda, escopo, objetivo e dono.
2. **CONSELHO-Fase1:** define direção, prioridade e risco de negócio.
3. **CONSELHO-Fase2:** define viabilidade, arquitetura e critérios técnicos.
4. **REPORT-SOLICITANTE:** organiza tarefas, responsáveis, ordem, prazo e evidências.
5. **EXECUÇÃO:** realiza o plano aprovado com registro contínuo.
6. **VALIDAÇÃO:** verifica qualidade e aderência aos critérios de aceite.
7. **REGISTRO:** fecha a tarefa com evidências, resultado e próximos passos.

## 4) Padrão obrigatório de reporte
`[etapa][agente][ação][evidência][status/bloqueio]`

Exemplo:
`[VALIDAÇÃO][qa][Executei checklist final][checklist assinado + logs][OK]`

## 5) Gates obrigatórios
- Gate A: ABERTURA validada.
- Gate B: Conselhos concluídos (Estratégico + Técnico).
- Gate C: REPORT-SOLICITANTE aprovado.
- Gate D: EXECUÇÃO concluída com evidência.
- Gate E: VALIDAÇÃO aprovada.
- Gate F: REGISTRO final publicado.

## 6) Evidência mínima por etapa
- objetivo
- ação executada
- evidências (logs/prints/links/IDs)
- status final ou bloqueio

## 7) Referências
- `HAOS/HAOS_CONTRACT.md`
- `HAOS/HAOS_PIPELINE.md`
- `HAOS/HAOS_HANDOFFS.md`


