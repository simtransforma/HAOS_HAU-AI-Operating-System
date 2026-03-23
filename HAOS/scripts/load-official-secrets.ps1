param(
  [string]$EnvFile = "C:\Users\gians\OneDrive\Documentos\Projetos\Agencia HAU - Soluções Digitais\HAO IA Operation System\_secrets\COLE_AQUI.env"
)

if (!(Test-Path $EnvFile)) {
  throw "Arquivo oficial de credenciais não encontrado: $EnvFile"
}

Get-Content $EnvFile | ForEach-Object {
  $line = $_.Trim()
  if (!$line -or $line.StartsWith('#') -or $line -notmatch '=') { return }
  $k, $v = $line -split '=', 2
  $k = $k.Trim(); $v = $v.Trim().Trim('"')
  if ($k) { [Environment]::SetEnvironmentVariable($k, $v, 'Process') }
}

# Canonical aliases (n8n)
if (-not $env:N8N_Hetzer_URL) { throw 'N8N_Hetzer_URL ausente no arquivo oficial' }
if (-not $env:N8N_Hetzer_API_TOKEN) {
  if ($env:N8N_API_KEY) { $env:N8N_Hetzer_API_TOKEN = $env:N8N_API_KEY }
  elseif ($env:N8N_API_TOKEN) { $env:N8N_Hetzer_API_TOKEN = $env:N8N_API_TOKEN }
}

$env:N8N_Hetzer_URL = 'https://n8n.edsonburger.com.br/'
$env:N8N_API_URL = 'https://n8n.edsonburger.com.br/api/v1'
if ($env:N8N_Hetzer_API_TOKEN) { $env:N8N_API_KEY = $env:N8N_Hetzer_API_TOKEN }

Write-Host 'Official secrets loaded for current process.'
