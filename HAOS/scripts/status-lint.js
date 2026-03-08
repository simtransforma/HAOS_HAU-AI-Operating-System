const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const projectRoot = path.resolve(root, '..');

const forbidden = [
  'BLOQUEADO_ESCOPO',
  'AGUARDANDO_SOLICITANTE',
  'AGUARDANDO_RESPOSTA_SOLICITANTE',
  'BLOQUEADO_SEM_RESPOSTA_SOLICITANTE',
  'FAIL',
  'NOK'
];

const runtimeAllowed = [
  'in_progress',
  'blocked_waiting_solicitante',
  'blocked_dependency',
  'rework',
  'done'
];

const humanAllowed = [
  'IN_PROGRESS',
  'BLOCKED_WAITING_SOLICITANTE',
  'BLOCKED_DEPENDENCY',
  'REWORK',
  'DONE'
];

const targets = [
  path.join(root, 'HAOS_PIPELINE.md'),
  path.join(root, 'HAOS_CONTRACT.md'),
  path.join(projectRoot, 'docs', 'SISTEMA_HAOS_COMPLETO.md'),
  path.join(projectRoot, 'templates', 'REPORT_LINE_TEMPLATE.md'),
  path.join(root, 'scripts', 'review.js'),
  path.join(root, 'scripts', 'status.js'),
  path.join(root, 'scripts', 'dashboard.js'),
  path.join(root, 'scripts', 'council.js')
];

const indexTargets = [
  path.join(root, 'KB', 'vector-index.json')
];

let ok = true;
for (const file of targets) {
  if (!fs.existsSync(file)) continue;
  const c = fs.readFileSync(file, 'utf-8');
  for (const token of forbidden) {
    if (c.includes(token)) {
      console.log(`FAIL ${path.relative(projectRoot, file)} contém token legado proibido: ${token}`);
      ok = false;
    }
  }
}

const forbiddenIndexTokens = [
  'BLOQUEADO_ESCOPO',
  'AGUARDANDO_SOLICITANTE',
  'AGUARDANDO_RESPOSTA_SOLICITANTE',
  'BLOQUEADO_SEM_RESPOSTA_SOLICITANTE'
];
for (const file of indexTargets) {
  if (!fs.existsSync(file)) continue;
  const c = fs.readFileSync(file, 'utf-8');
  for (const token of forbiddenIndexTokens) {
    if (c.includes(token)) {
      console.log(`FAIL ${path.relative(projectRoot, file)} contém token legado proibido no índice KB: ${token}`);
      ok = false;
    }
  }
}

const reportTemplate = path.join(projectRoot, 'templates', 'REPORT_LINE_TEMPLATE.md');
if (fs.existsSync(reportTemplate)) {
  const c = fs.readFileSync(reportTemplate, 'utf-8');
  for (const st of runtimeAllowed) {
    if (!c.includes(st)) {
      console.log(`FAIL REPORT_LINE_TEMPLATE sem status runtime obrigatório: ${st}`);
      ok = false;
    }
  }
  for (const st of humanAllowed) {
    if (!c.includes(st)) {
      console.log(`FAIL REPORT_LINE_TEMPLATE sem status humano obrigatório: ${st}`);
      ok = false;
    }
  }
}

if (ok) console.log('OK status-lint: dicionário canônico validado.');
process.exit(ok ? 0 : 1);
