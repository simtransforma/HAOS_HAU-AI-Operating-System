const fs = require('node:fs');
const path = require('node:path');
const { parseEnvFile } = require('./lib');

const root = process.cwd();
const required = [
  'HAOS_MASTER_SCOPE.md','HAOS_CONTRACT.md','HAOS_RACI.md','HAOS_PIPELINE.md','HAOS_AGENT_MAP_V1.md',
  'HAOS_SYSTEM_MAP.md','HAOS_CREDENTIALS_STANDARD.md','HAOS_HANDOFFS.md','HAOS_RUNBOOK.md','HAOS_AGENT_REGISTRY.md'
];
let ok = true;
for (const f of required) {
  const exists = fs.existsSync(path.join(root, f));
  console.log(`${exists ? 'OK ' : 'MISS'} ${f}`);
  if (!exists) ok = false;
}

const agentsDir = path.join(root, 'agents');
if (!fs.existsSync(agentsDir)) { console.log('MISS agents/'); ok = false; }
else {
  const agents = fs.readdirSync(agentsDir, { withFileTypes: true }).filter(d => d.isDirectory());
  console.log(`OK agents: ${agents.length}`);
  for (const a of agents) {
    ['PROMPT.md','AGENT_SPEC.md','PLAYBOOK.md','IO_CONTRACT.md'].forEach(f => {
      if (!fs.existsSync(path.join(agentsDir, a.name, f))) { console.log(`MISS agents/${a.name}/${f}`); ok = false; }
    });
  }
}

// Vault check
const env = parseEnvFile();
const provider = env.VAULT_PROVIDER || process.env.VAULT_PROVIDER;
const vaultPath = env.VAULT_PATH || process.env.VAULT_PATH || './vault';
if (!provider) {
  console.log('MISS vault config: V A U L T _ P R O V I D E R em .env');
  ok = false;
} else {
  console.log(`OK vault provider: ${provider}`);
}
const vp = path.join(root, vaultPath);
if (!fs.existsSync(vp)) {
  console.log(`MISS vault path: ${vaultPath}`);
  ok = false;
} else {
  console.log(`OK vault path: ${vaultPath}`);
}

process.exit(ok ? 0 : 1);
