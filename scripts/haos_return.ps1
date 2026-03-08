param(
  [Parameter(Mandatory = $true)][ValidateSet('ESTRATEGISTA','DIRETOR','CONSELHO')][string]$ReturnTo,
  [Parameter(Mandatory = $true)][string]$Reason,
  [string]$StateFile = "$PSScriptRoot\..\.haos\state.json",
  [string]$AuditLog = "$PSScriptRoot\..\.haos\audit.log"
)

$ErrorActionPreference = 'Stop'
if (!(Test-Path $StateFile)) { throw "State file not found." }
$state = Get-Content -LiteralPath $StateFile -Raw | ConvertFrom-Json
$state.current_stage = $ReturnTo
$state.status = 'REWORK'
$state.updated_at = (Get-Date).ToString('o')
$state | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $StateFile -Encoding UTF8
$line = "$(Get-Date -Format o) | RETURN | $($state.task) | To=$ReturnTo | Reason=$Reason"
Add-Content -LiteralPath $AuditLog -Value $line -Encoding UTF8
Write-Output "RETURN_OK: $ReturnTo"
