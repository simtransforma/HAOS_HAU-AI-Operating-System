# HAOS Process State Machine (v2 oficial)

## Fluxo canônico
ABERTURA -> CONSELHO-Fase1 -> REPORT-SOLICITANTE -> CONSELHO-Fase2 -> MEGA_BRAIN -> DIRETOR -> ESTRATEGISTA -> EXECUCAO -> VALIDACAO -> (se reprovado: CONSELHO_SE_REPROVADO [máx 3] -> MEGA_BRAIN) -> CONSELHO_Final_Aprovado -> ENTREGA -> REGISTRO

## Regras
- Loop de reprovação: máximo 3 ciclos.
- Source of truth operacional: `HAOS/`.
