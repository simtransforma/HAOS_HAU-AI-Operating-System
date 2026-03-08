const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const STATE_DIR = path.join(ROOT, 'runtime', 'state');
const TASKS_FILE = path.join(STATE_DIR, 'tasks.json');
const REPORT_DIR = path.join(ROOT, 'runtime', 'reports');

const PHASES = {
  1: { name: 'ABERTURA', gate: 'A', owner: 'orquestrador-haos' },
  2: { name: 'CONSELHO-Fase1', gate: 'A', owner: 'project-director' },
  3: { name: 'REPORT-SOLICITANTE', gate: 'A', owner: 'orquestrador-haos' },
  4: { name: 'CONSELHO-Fase2', gate: 'B', owner: 'project-director' },
  5: { name: 'MEGA_BRAIN', gate: 'B', owner: 'orquestrador-haos' },
  6: { name: 'DIRETOR', gate: 'B', owner: 'project-director' },
  7: { name: 'ESTRATEGISTA', gate: 'B', owner: 'strategy-director' },
  8: { name: 'EXECUCAO', gate: 'B', owner: 'squad-owner' },
  9: { name: 'VALIDACAO', gate: 'C', owner: 'review-lead' },
  10: { name: 'CONSELHO_SE_REPROVADO', gate: 'R', owner: 'project-director' },
  11: { name: 'CONSELHO_Final_Aprovado', gate: 'F', owner: 'project-director' },
  12: { name: 'ENTREGA', gate: 'F', owner: 'orquestrador-haos' },
  13: { name: 'REGISTRO', gate: 'DONE', owner: 'orquestrador-haos' }
};

const SQUAD_OWNERS = {
  acquisition: 'traffic-master',
  tracking: 'tracking-engineer',
  creative: 'copy-specialist',
  funnelcrm: 'automation-architect',
  produtotech: 'product-engineer-webapps',
  inteligencia: 'analyst'
};

function ensureState() {
  fs.mkdirSync(STATE_DIR, { recursive: true });
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  if (!fs.existsSync(TASKS_FILE)) fs.writeFileSync(TASKS_FILE, '[]\n');
}

function loadTasks() {
  ensureState();
  return JSON.parse(fs.readFileSync(TASKS_FILE, 'utf-8'));
}

function saveTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2) + '\n');
}

function now() { return new Date().toISOString(); }
function nextId(tasks) { return `HAOS-${String(tasks.length + 1).padStart(4, '0')}`; }

function normalizeSquad(input = '') {
  const v = input.toLowerCase().replace(/[^a-z]/g, '');
  return Object.keys(SQUAD_OWNERS).includes(v) ? v : 'produtotech';
}

function applyPhase(task, phase) {
  const p = PHASES[phase] || PHASES[1];
  task.phase = phase;
  task.phaseName = p.name;
  task.gate = p.gate;
  task.owner = p.owner === 'squad-owner' ? (task.squadOwner || 'squad-owner') : p.owner;
  if (phase === 13) task.status = 'done';
}

function parseEnvFile() {
  const p = path.join(ROOT, '.env');
  if (!fs.existsSync(p)) return {};
  const lines = fs.readFileSync(p, 'utf-8').split(/\r?\n/);
  const env = {};
  for (const line of lines) {
    const l = line.trim();
    if (!l || l.startsWith('#') || !l.includes('=')) continue;
    const idx = l.indexOf('=');
    env[l.slice(0, idx).trim()] = l.slice(idx + 1).trim();
  }
  return env;
}

module.exports = { ROOT, TASKS_FILE, REPORT_DIR, PHASES, SQUAD_OWNERS, ensureState, loadTasks, saveTasks, now, nextId, applyPhase, normalizeSquad, parseEnvFile };
