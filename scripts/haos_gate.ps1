param(
  [Parameter(Mandatory = $true)][string]$TaskType,
  [Parameter(Mandatory = $true)][bool]$HaosFirst,
  [Parameter(Mandatory = $true)][bool]$SquadParallel,
  [Parameter(Mandatory = $true)][bool]$DelegationActive,
  [Parameter(Mandatory = $true)][bool]$SkillApplied
)

$isOperational = $TaskType.ToLowerInvariant() -eq 'operacional'

if (-not $isOperational) {
  Write-Output 'GATE_OK: tarefa não operacional.'
  exit 0
}

$errors = @()
if (-not $HaosFirst) { $errors += 'HAOS-first ausente' }
if (-not $SquadParallel) { $errors += 'squad paralela ausente' }
if (-not $DelegationActive) { $errors += 'delegação inativa (solo no main)' }
if (-not $SkillApplied) { $errors += 'skill aplicável não definida' }

if ($errors.Count -gt 0) {
  Write-Output ('GATE_BLOCK: ' + ($errors -join '; '))
  exit 2
}

Write-Output 'GATE_OK: execução permitida.'
exit 0
