#!/usr/bin/env node
const { spawnSync } = require('node:child_process');
const cmd = process.argv[2];
const map = { setup: 'haos:setup', doctor: 'haos:doctor', start: 'haos:start' };
if (!map[cmd]) {
  console.log('Usage: haos <setup|doctor|start>');
  process.exit(1);
}
const r = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', map[cmd]], { stdio: 'inherit' });
process.exit(r.status ?? 1);
