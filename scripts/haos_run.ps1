param(
  [Parameter(Mandatory = $true)][string]$TaskTitle,
  [Parameter(Mandatory = $true)][string]$SkillName,
  [string]$StateFile = "$PSScriptRoot\..\.haos\state.json",
  [string]$AuditLog = "$PSScriptRoot\..\.haos\audit.log"
)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $StateFile
New-Item -ItemType Directory -Force -Path $root | Out-Null

$gate = Join-Path $PSScriptRoot "haos_gate.ps1"
$gateResult = & $gate -TaskType operacional -HaosFirst $true -SquadParallel $true -DelegationActive $true -SkillApplied $true
if ($LASTEXITCODE -ne 0) {
  $line = "$(Get-Date -Format o) | BLOCKED | $TaskTitle | $gateResult"
  Add-Content -LiteralPath $AuditLog -Value $line -Encoding UTF8
  Write-Output $line
  exit 2
}

$state = [ordered]@{
  task = $TaskTitle
  skill = $SkillName
  status = 'IN_PROGRESS'
  current_stage = 'ABERTURA'
  stages = @(
    'ABERTURA','CONSELHO-Fase1','REPORT-SOLICITANTE','CONSELHO-Fase2','MEGA_BRAIN','DIRETOR','ESTRATEGISTA','EXECUCAO','VALIDACAO','CONSELHO_SE_REPROVADO','CONSELHO_Final_Aprovado','ENTREGA','REGISTRO'
  )
  updated_at = (Get-Date).ToString('o')
}
$state | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $StateFile -Encoding UTF8

$line = "$(Get-Date -Format o) | STARTED | $TaskTitle | Skill=$SkillName | Gate=OK"
Add-Content -LiteralPath $AuditLog -Value $line -Encoding UTF8
Write-Output "HAOS_RUN_OK: $TaskTitle"


