const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');
const { parseEnvFile } = require('./lib');

const root = process.cwd();
let ok = true;

const required = [
  'HAOS_MASTER_SCOPE.md', 'HAOS_CONTRACT.md', 'HAOS_RACI.md', 'HAOS_PIPELINE.md', 'HAOS_AGENT_MAP_V1.md',
  'HAOS_SYSTEM_MAP.md', 'HAOS_HANDOFFS.md', 'HAOS_RUNBOOK.md', 'HAOS_AGENT_REGISTRY.md'
];
for (const f of required) {
  const exists = fs.existsSync(path.join(root, f));
  console.log(`${exists ? 'OK ' : 'MISS'} ${f}`);
  if (!exists) ok = false;
}

const templates = ['CONSELHO_FASE1_TEMPLATE.md', 'REPORT_SOLICITANTE_TEMPLATE.md', 'VALIDACAO_TEMPLATE.md', 'REGISTRO_TEMPLATE.md', 'REPORT_LINE_TEMPLATE.md'];
for (const t of templates) {
  const p = path.join(root, '..', 'templates', t);
  if (!fs.existsSync(p)) {
    console.log(`MISS templates/${t}`);
    ok = false;
  } else console.log(`OK templates/${t}`);
}

const syntaxFiles = ['lib.js', 'new-task.js', 'review.js', 'council.js', 'doctor.js', 'status.js', 'dashboard.js', 'update-task.js', 'test-acceptance.js', 'status-lint.js'];
for (const f of syntaxFiles) {
  const p = path.join(root, 'scripts', f);
  if (!fs.existsSync(p)) {
    console.log(`MISS scripts/${f}`);
    ok = false;
    continue;
  }
  try {
    execSync(`node -c "${p}"`, { stdio: 'pipe' });
    console.log(`OK syntax scripts/${f}`);
  } catch {
    console.log(`MISS syntax scripts/${f}`);
    ok = false;
  }
}

try {
  execSync('node scripts/status-lint.js', { cwd: root, stdio: 'pipe' });
  console.log('OK status-lint');
} catch (e) {
  console.log(String(e.stdout || '') + String(e.stderr || ''));
  console.log('MISS status-lint');
  ok = false;
}

const env = parseEnvFile();
const provider = env.VAULT_PROVIDER || process.env.VAULT_PROVIDER;
const vaultPath = env.VAULT_PATH || process.env.VAULT_PATH || './vault';
if (!provider) {
  console.log('WARN vault config: VAULT_PROVIDER ausente');
} else console.log(`OK vault provider: ${provider}`);
const vp = path.join(root, vaultPath);
if (!fs.existsSync(vp)) {
  console.log(`WARN vault path não encontrado: ${vaultPath}`);
} else console.log(`OK vault path: ${vaultPath}`);

process.exit(ok ? 0 : 1);
