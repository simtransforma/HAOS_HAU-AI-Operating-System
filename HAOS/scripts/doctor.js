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

const tpl1 = path.join(root, '..', 'templates', 'CONSELHO_FASE1_TEMPLATE.md');
const tpl2 = path.join(root, '..', 'templates', 'REPORT_SOLICITANTE_TEMPLATE.md');
if (!fs.existsSync(tpl1)) { console.log('MISS templates/CONSELHO_FASE1_TEMPLATE.md'); ok = false; }
if (!fs.existsSync(tpl2)) { console.log('MISS templates/REPORT_SOLICITANTE_TEMPLATE.md'); ok = false; }

function assertContains(file, terms) {
  const p = path.join(root, file);
  if (!fs.existsSync(p)) return false;
  const c = fs.readFileSync(p, 'utf-8').toLowerCase();
  return terms.every(t => c.includes(String(t).toLowerCase()));
}

if (!assertContains('HAOS_PIPELINE.md', ['lista de dúvidas e questionamentos para o solicitante','consolidar respostas do solicitante','CONSELHO-Fase2'])) {
  console.log('MISS semântica: pipeline não garante Fase1/Report/Solicitante');
  ok = false;
}
if (!assertContains('HAOS_CONTRACT.md', ['questionamento explícito ao solicitante','resposta explícita do solicitante'])) {
  console.log('MISS semântica: contract sem regra inviolável Fase1/Report');
  ok = false;
}

// Vault check
const env = parseEnvFile();
const provider = env.VAULT_PROVIDER || process.env.VAULT_PROVIDER;
const vaultPath = env.VAULT_PATH || process.env.VAULT_PATH || './vault';
if (!provider) { console.log('MISS vault config: VAULT_PROVIDER'); ok = false; }
else console.log(`OK vault provider: ${provider}`);
const vp = path.join(root, vaultPath);
if (!fs.existsSync(vp)) { console.log(`MISS vault path: ${vaultPath}`); ok = false; }
else console.log(`OK vault path: ${vaultPath}`);

process.exit(ok ? 0 : 1);

