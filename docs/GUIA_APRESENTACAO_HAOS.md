# Guia de Apresentação — Sistema HAOS

## 1) O que é o HAOS
HAOS (HAU AI Operating System) é um sistema operacional de execução por agentes, com governança por rito, validação formal e registro de evidências.

## 2) Problema que o HAOS resolve
- Evita execução improvisada e sem rastreio.
- Garante clareza de responsabilidade por etapa/agente.
- Reduz retrabalho com gates e validação.
- Mantém histórico auditável das decisões.

## 3) Como o sistema funciona (visão executiva)
Fluxo oficial v2:
`ABERTURA -> CONSELHO-Fase1 -> REPORT-SOLICITANTE -> CONSELHO-Fase2 -> MEGA_BRAIN -> DIRETOR -> ESTRATEGISTA -> EXECUCAO -> VALIDACAO -> (se reprovado: CONSELHO_SE_REPROVADO [máx 3] -> MEGA_BRAIN) -> CONSELHO_Final_Aprovado -> ENTREGA -> REGISTRO`

## 4) Regras centrais de operação
- Main atua como orquestrador (não executa operacional em modo solo).
- Execução é delegada ao especialista da squad.
- Toda etapa exige evidência.
- Reporte obrigatório por etapa/agente:
  `[timestamp][modelo llm][etapa][agente][ação][evidência][status/bloqueio]`

## 5) Exceção de uso rápido
Mensagens iniciadas com `#` entram em modo direto (sem rito), para:
- dúvidas rápidas
- conversa
- consultas simples
- tarefas simples

## 6) Governança e qualidade
- Gates obrigatórios: A, B, C, R, F e DONE.
- Reprovação segue loop controlado (máx 3 ciclos).
- QA/Review formal antes da aprovação final.

## 7) Registro e documentação
- Sistema HAOS: vault de sistema (documentação do método).
- Operação de tarefas/projetos: vault separada em `Tarefas/Projetos/<nome>/`.

## 8) Quando apresentar este guia
- Onboarding de novos colaboradores/comunidade.
- Explicar por que o HAOS é confiável para operação real.
- Preparar repositório para abertura pública.

## 9) Docs para leitura em sequência
1. `README.md` (raiz)
2. `docs/SISTEMA_HAOS_COMPLETO.md`
3. `docs/METODOLOGIAS_BASE_HAOS.md`
4. `HAOS/README.md`
5. `HAOS/HAOS_PIPELINE.md`
6. `HAOS/HAOS_CONTRACT.md`

