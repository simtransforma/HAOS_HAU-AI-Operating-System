param(
  [int]$TimeoutMinutes = 7,
  [string]$AuditLog = "C:\Users\gians\.openclaw\workspace\.haos\audit.log"
)

$ErrorActionPreference = 'Stop'

# Este script é um guia operacional local para timeout de agentes.
# Uso: rodar manualmente quando houver espera longa sem resposta de subagente.

$line = "$(Get-Date -Format o) | WATCHDOG | Timeout=$TimeoutMinutes min | Ação: re-disparar agente pendente e escalonar para Conselho se 2a tentativa falhar"
Add-Content -LiteralPath $AuditLog -Value $line -Encoding UTF8
Write-Output "WATCHDOG_POLICY: se agente não responder em ${TimeoutMinutes}min => 1) re-disparo 2) escalonamento 3) reporte imediato ao Gian"
