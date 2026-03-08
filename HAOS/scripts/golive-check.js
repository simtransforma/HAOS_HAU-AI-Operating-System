const fs = require('node:fs');
const path = require('node:path');
const { parseEnvFile } = require('./lib');

const root = process.cwd();
const checklist = [
  ['Docs core', ['HAOS_MASTER_SCOPE.md','HAOS_CONTRACT.md','HAOS_PIPELINE.md','HAOS_SYSTEM_MAP.md']],
  ['Agent registry', ['HAOS_AGENT_REGISTRY.md']],
  ['Runtime scripts', ['scripts/setup.js','scripts/doctor.js','scripts/start.js','scripts/new-task.js','scripts/status.js','scripts/review.js','scripts/council.js','scripts/blocker.js','scripts/dashboard.js','scripts/migrate-tasks.js','scripts/daily-report.js']],
  ['State file', ['runtime/state/tasks.json']]
];
let ok = true;
for (const [name, files] of checklist) {
  const miss = files.filter(f => !fs.existsSync(path.join(root, f)));
  if (miss.length) {
    ok = false;
    console.log(`MISS ${name}: ${miss.join(', ')}`);
  } else {
    console.log(`OK ${name}`);
  }
}
const env = parseEnvFile();
if (!env.VAULT_PROVIDER || !env.VAULT_PATH) {
  ok = false;
  console.log('MISS .env vault config (VAULT_PROVIDER, VAULT_PATH)');
} else {
  console.log('OK .env vault config');
}
console.log(ok ? 'GO_LIVE_READY' : 'GO_LIVE_BLOCKED');
process.exit(ok ? 0 : 1);
