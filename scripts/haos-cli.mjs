#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import process from 'node:process';

const cmd = process.argv[2] || 'help';

function run(command, args = [], opts = {}) {
  const r = spawnSync(command, args, { stdio: 'inherit', shell: process.platform === 'win32', ...opts });
  return r.status === 0;
}

function exists(command) {
  const checker = process.platform === 'win32' ? ['where', command] : ['which', command];
  const r = spawnSync(checker[0], checker.slice(1), { stdio: 'ignore', shell: process.platform === 'win32' });
  return r.status === 0;
}

function setup() {
  console.log('HAOS setup iniciado...');
  const checks = [
    ['git', exists('git')],
    ['node', exists('node')],
    ['npm', exists('npm')],
    ['openclaw', exists('openclaw')],
  ];

  let ok = true;
  for (const [name, pass] of checks) {
    console.log(`${pass ? 'OK' : 'FALHA'}: ${name}`);
    if (!pass) ok = false;
  }

  if (!ok) {
    console.log('Pré-requisitos faltando. Instale os itens com FALHA e rode novamente.');
    process.exit(1);
  }

  console.log('\nValidando OpenClaw...');
  run('openclaw', ['status']);

  console.log('\nChecklist HAOS:');
  console.log('- HAOS/HAOS_CONTRACT.md');
  console.log('- HAOS/HAOS_PIPELINE.md');
  console.log('- HAOS/HAOS_HANDOFFS.md');
  console.log('- HAOS/NATIVE_SKILLS_AGENT_RULES.md');
  console.log('- HAOS/agents/*/PROMPT.md');
  console.log('\nHAOS setup concluído.');
}

if (cmd === 'setup') setup();
else {
  console.log('Uso: haos-cli setup');
}
