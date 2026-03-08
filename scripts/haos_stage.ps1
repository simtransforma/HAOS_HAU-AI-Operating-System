param(
  [Parameter(Mandatory = $true)][ValidateSet('ABERTURA','CONSELHO','MEGA_BRAIN','DIRETOR','ESTRATEGISTA','EXECUCAO','VALIDACAO','CONSELHO_FINAL','ENTREGA','REGISTRO')][string]$Stage,
  [string]$StateFile = "$PSScriptRoot\..\.haos\state.json",
  [string]$AuditLog = "$PSScriptRoot\..\.haos\audit.log",
  [string]$Evidence = ""
)

$ErrorActionPreference = 'Stop'
if (!(Test-Path $StateFile)) { throw "State file not found. Run haos_run.ps1 first." }

$state = Get-Content -LiteralPath $StateFile -Raw | ConvertFrom-Json
$stages = @('ABERTURA','CONSELHO','MEGA_BRAIN','DIRETOR','ESTRATEGISTA','EXECUCAO','VALIDACAO','CONSELHO_FINAL','ENTREGA','REGISTRO')
$currentIndex = [array]::IndexOf($stages, [string]$state.current_stage)
$targetIndex = [array]::IndexOf($stages, $Stage)

if ($targetIndex -lt $currentIndex) {
  throw "Invalid transition: cannot move backwards directly ($($state.current_stage) -> $Stage). Use return flow file." 
}
if ($targetIndex -gt ($currentIndex + 1)) {
  throw "Invalid transition: stage jump not allowed ($($state.current_stage) -> $Stage)."
}

$state.current_stage = $Stage
$state.updated_at = (Get-Date).ToString('o')
if ($Stage -eq 'REGISTRO') { $state.status = 'DONE' }

$state | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $StateFile -Encoding UTF8
$line = "$(Get-Date -Format o) | STAGE | $($state.task) | $Stage | Evidence=$Evidence"
Add-Content -LiteralPath $AuditLog -Value $line -Encoding UTF8
Write-Output "STAGE_OK: $Stage"
