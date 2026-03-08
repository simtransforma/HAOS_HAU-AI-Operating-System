param(
  [string]$EnvFile = "C:\Users\gians\OneDrive\Documentos\Projetos\Agencia HAU - Soluções Digitais\HAO IA Operation System\_secrets\COLE_AQUI.env"
)

$ErrorActionPreference = 'Stop'

function Parse-EnvFile([string]$path) {
  $vars = @{}
  if (!(Test-Path $path)) { return $vars }
  Get-Content $path | ForEach-Object {
    $line = $_.Trim()
    if (!$line -or $line.StartsWith('#') -or $line -notmatch '=') { return }
    $k, $v = $line -split '=', 2
    $k = $k.Trim(); $v = $v.Trim().Trim('"')
    if ($k) { $vars[$k] = $v }
  }
  return $vars
}

function Mask([string]$s) {
  if (-not $s) { return '' }
  if ($s.Length -le 6) { return ('*' * $s.Length) }
  return ('*' * ($s.Length - 4)) + $s.Substring($s.Length - 4)
}

function Try-Get([string]$name, [string]$url, [hashtable]$headers = @{}) {
  $sw = [System.Diagnostics.Stopwatch]::StartNew()
  try {
    $resp = Invoke-WebRequest -Uri $url -Method GET -Headers $headers -TimeoutSec 20
    $sw.Stop()
    return @{ ok = $true; name = $name; status = [int]$resp.StatusCode; ms = [int]$sw.ElapsedMilliseconds }
  }
  catch {
    $sw.Stop()
    $code = 'ERR'
    if ($_.Exception.Response) { $code = [int]$_.Exception.Response.StatusCode }
    return @{ ok = $false; name = $name; status = $code; ms = [int]$sw.ElapsedMilliseconds }
  }
}

$vars = Parse-EnvFile $EnvFile

# Prioridade de aliases (padrão oficial atual)
$base = $vars['N8N_Hetzer_URL']
if (-not $base) { $base = $vars['N8N_BASE_URL'] }
if (-not $base) { $base = 'https://n8n.edsonburger.com.br' }

$token = $vars['N8N_Hetzer_API_TOKEN']
if (-not $token) { $token = $vars['N8N_API_KEY'] }
if (-not $token) { $token = $vars['N8N_API_TOKEN'] }

$base = $base.TrimEnd('/')

$results = @()
$results += Try-Get 'healthz' "$base/healthz"
$results += Try-Get 'workflows_noauth' "$base/api/v1/workflows"
if ($token) {
  $results += Try-Get 'workflows_x_n8n_api_key' "$base/api/v1/workflows" @{ 'X-N8N-API-KEY' = $token }
}

[pscustomobject]@{
  baseUrl = $base
  tokenMasked = (Mask $token)
  checks = $results
} | ConvertTo-Json -Depth 6
