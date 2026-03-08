param(
  [Parameter(Mandatory = $true)][string]$Task,
  [string]$AuditLog = "C:\Users\gians\.openclaw\workspace\.haos\audit.log"
)

$line = "$(Get-Date -Format o) | STATUS_PING | $Task | Regra anti-silêncio OK (<=3min)"
Add-Content -LiteralPath $AuditLog -Value $line -Encoding UTF8
Write-Output $line
