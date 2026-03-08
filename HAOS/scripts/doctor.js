const fs = require('node:fs');
const path = require('node:path');
const { parseEnvFile } = require('./lib');

const root = process.cwd();
let ok = true;

const required = [
  'HAOS_MASTER_SCOPE.md','HAOS_CONTRACT.md','HAOS_RACI.md','HAOS_PIPELINE.md','HAOS_AGENT_MAP_V1.md',
  'HAOS_SYSTEM_MAP.md','HAOS_HANDOFFS.md','HAOS_RUNBOOK.md','HAOS_AGENT_REGISTRY.md'
];
for (const f of required) {
  const exists = fs.existsSync(path.join(root, f));
  console.log(`${exists ? 'OK ' : 'MISS'} ${f}`);
  if (!exists) ok = false;
}

const templates = ['CONSELHO_FASE1_TEMPLATE.md','REPORT_SOLICITANTE_TEMPLATE.md','VALIDACAO_TEMPLATE.md','REGISTRO_TEMPLATE.md','REPORT_LINE_TEMPLATE.md'];
for (const t of templates) {
  const p = path.join(root, '..', 'templates', t);
  if (!fs.existsSync(p)) { console.log(`MISS templates/${t}`); ok = false; }
  else console.log(`OK templates/${t}`);
}

function hasTokens(file, tokenGroups) {
  const p = path.join(root, file);
  if (!fs.existsSync(p)) return false;
  const c = fs.readFileSync(p, 'utf-8').toLowerCase();
  return tokenGroups.every(group => group.some(t => c.includes(t.toLowerCase())));
}

if (!hasTokens('HAOS_PIPELINE.md', [
  ['conselho-fase1'],
  ['report-solicitante'],
  ['conselho-fase2'],
  ['solicitante'],
  ['critério de passagem','criterio de passagem']
])) { console.log('MISS semântica: pipeline v2 incompleto'); ok = false; }

if (!hasTokens('HAOS_CONTRACT.md', [
  ['questionamento explícito ao solicitante','questionamento explicito ao solicitante'],
  ['resposta explícita do solicitante','resposta explicita do solicitante']
])) { console.log('MISS semântica: contract sem regra inviolável Fase1/Report'); ok = false; }

if (!hasTokens('../templates/REPORT_LINE_TEMPLATE.md', [
  ['[timestamp][modelo llm][etapa][agente][ação][evidência][status/bloqueio]','[timestamp][modelo llm][etapa][agente][acao][evidencia][status/bloqueio]']
])) { console.log('MISS semântica: template de reporte fora do padrão'); ok = false; }

for (const f of ['lib.js','new-task.js','review.js','council.js','doctor.js','status.js','dashboard.js']) {
  const p = path.join(root, 'scripts', f);
  if (!fs.existsSync(p)) { console.log(`MISS scripts/${f}`); ok = false; continue; }
  try { new Function(fs.readFileSync(p, 'utf-8')); console.log(`OK syntax scripts/${f}`); }
  catch { console.log(`MISS syntax scripts/${f}`); ok = false; }
}

const env = parseEnvFile();
const provider = env.VAULT_PROVIDER || process.env.VAULT_PROVIDER;
const vaultPath = env.VAULT_PATH || process.env.VAULT_PATH || './vault';
if (!provider) { console.log('WARN vault config: VAULT_PROVIDER ausente'); }
else console.log(`OK vault provider: ${provider}`);
const vp = path.join(root, vaultPath);
if (!fs.existsSync(vp)) { console.log(`WARN vault path não encontrado: ${vaultPath}`); }
else console.log(`OK vault path: ${vaultPath}`);

process.exit(ok ? 0 : 1);
