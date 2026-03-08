const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const STATE_DIR = path.join(ROOT, 'runtime', 'state');
const TASKS_FILE = process.env.HAOS_TASKS_FILE || path.join(STATE_DIR, 'tasks.json');
const REPORT_DIR = process.env.HAOS_REPORT_DIR || path.join(ROOT, 'runtime', 'reports');

const RUNTIME_STATUS = Object.freeze({
  IN_PROGRESS: 'in_progress',
  BLOCKED_WAITING_SOLICITANTE: 'blocked_waiting_solicitante',
  BLOCKED_DEPENDENCY: 'blocked_dependency',
  REWORK: 'rework',
  DONE: 'done'
});

const HUMAN_STATUS = Object.freeze({
  IN_PROGRESS: 'IN_PROGRESS',
  BLOCKED_WAITING_SOLICITANTE: 'BLOCKED_WAITING_SOLICITANTE',
  BLOCKED_DEPENDENCY: 'BLOCKED_DEPENDENCY',
  REWORK: 'REWORK',
  DONE: 'DONE'
});

const LEGACY_STATUS_MAP = Object.freeze({
  BLOQUEADO_ESCOPO: RUNTIME_STATUS.BLOCKED_DEPENDENCY,
  AGUARDANDO_SOLICITANTE: RUNTIME_STATUS.BLOCKED_WAITING_SOLICITANTE,
  AGUARDANDO_RESPOSTA_SOLICITANTE: RUNTIME_STATUS.BLOCKED_WAITING_SOLICITANTE,
  BLOQUEADO_SEM_RESPOSTA_SOLICITANTE: RUNTIME_STATUS.BLOCKED_WAITING_SOLICITANTE,
  OK: RUNTIME_STATUS.IN_PROGRESS,
  FAIL: RUNTIME_STATUS.REWORK,
  NOK: RUNTIME_STATUS.REWORK
});

const PHASES = {
  1: { name: 'ABERTURA', gate: 'A', gateType: 'hard', owner: 'orquestrador-haos', requiredFields: ['taskClass', 'requester', 'objective', 'definitionOfDone'] },
  2: { name: 'CONSELHO-Fase1', gate: 'A', gateType: 'hard', owner: 'project-director', requiredFields: ['questionMessageRef', 'questionBlock', 'debateSummary'] },
  3: { name: 'REPORT-SOLICITANTE', gate: 'A', gateType: 'hard', owner: 'orquestrador-haos', requiredFields: ['solicitanteReplyRef', 'solicitanteReplySummary'] },
  4: { name: 'CONSELHO-Fase2', gate: 'B', gateType: 'hard', owner: 'project-director', requiredFields: ['routeDecision', 'successCriteria'] },
  5: { name: 'MEGA_BRAIN', gate: 'B', gateType: 'soft', owner: 'orquestrador-haos', requiredFields: ['history'] },
  6: { name: 'DIRETOR', gate: 'B', gateType: 'soft', owner: 'project-director', requiredFields: ['successCriteria'] },
  7: { name: 'ESTRATEGISTA', gate: 'B', gateType: 'soft', owner: 'strategy-director', requiredFields: ['routeDecision'] },
  8: { name: 'EXECUCAO', gate: 'B', gateType: 'hard', owner: 'squad-owner', requiredFields: ['executionEvidence'] },
  9: { name: 'VALIDACAO', gate: 'C', gateType: 'hard', owner: 'review-lead', requiredFields: ['validationCriteria', 'validationResult'] },
  10: { name: 'CONSELHO_SE_REPROVADO', gate: 'R', gateType: 'soft', owner: 'project-director', requiredFields: ['rootCause', 'returnPhase'] },
  11: { name: 'CONSELHO_Final_Aprovado', gate: 'F', gateType: 'soft', owner: 'project-director', requiredFields: ['finalApprovalRef'] },
  12: { name: 'ENTREGA', gate: 'F', gateType: 'soft', owner: 'orquestrador-haos', requiredFields: ['deliveryRef'] },
  13: { name: 'REGISTRO', gate: 'DONE', gateType: 'hard', owner: 'orquestrador-haos', requiredFields: ['registroRef'] }
};

const APPROVE_TRANSITIONS = Object.freeze({ 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 11, 10: 5, 11: 12, 12: 13, 13: 13 });
const REJECT_TRANSITIONS = Object.freeze({ default: 10 });

const SQUAD_OWNERS = {
  acquisition: 'traffic-master',
  tracking: 'tracking-engineer',
  creative: 'copy-specialist',
  funnelcrm: 'automation-architect',
  produtotech: 'product-engineer-webapps',
  inteligencia: 'analyst'
};

function ensureState() {
  fs.mkdirSync(path.dirname(TASKS_FILE), { recursive: true });
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  if (!fs.existsSync(TASKS_FILE)) fs.writeFileSync(TASKS_FILE, '[]\n');
}
function loadTasks() { ensureState(); return JSON.parse(fs.readFileSync(TASKS_FILE, 'utf-8')); }
function saveTasks(tasks) { fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2) + '\n'); }
function now() { return new Date().toISOString(); }
function nextId(tasks) { return `HAOS-${String(tasks.length + 1).padStart(4, '0')}`; }

function normalizeRuntimeStatus(input) {
  if (!input) return RUNTIME_STATUS.IN_PROGRESS;
  if (Object.values(RUNTIME_STATUS).includes(input)) return input;
  return LEGACY_STATUS_MAP[input] || input;
}

function setTaskStatus(task, status, extras = {}) {
  task.status = normalizeRuntimeStatus(status);
  Object.assign(task, extras);
}

function normalizeSquad(input = '') {
  const v = input.toLowerCase().replace(/[^a-z]/g, '');
  return Object.keys(SQUAD_OWNERS).includes(v) ? v : 'produtotech';
}

function applyPhase(task, phase) {
  const p = PHASES[phase] || PHASES[1];
  task.phase = phase;
  task.phaseName = p.name;
  task.gate = p.gate;
  task.gateType = p.gateType;
  task.owner = p.owner === 'squad-owner' ? (task.squadOwner || 'squad-owner') : p.owner;
  if (phase === 13) setTaskStatus(task, RUNTIME_STATUS.DONE);
}

function parseEnvFile() {
  const p = path.join(ROOT, '.env');
  if (!fs.existsSync(p)) return {};
  const env = {};
  for (const line of fs.readFileSync(p, 'utf-8').split(/\r?\n/)) {
    const l = line.trim();
    if (!l || l.startsWith('#') || !l.includes('=')) continue;
    const i = l.indexOf('=');
    env[l.slice(0, i).trim()] = l.slice(i + 1).trim();
  }
  return env;
}

function hasValue(v) {
  if (v === null || v === undefined) return false;
  if (typeof v === 'string') return v.trim().length > 0;
  if (Array.isArray(v)) return v.length > 0;
  return true;
}

function validateGate(task, { mode } = {}) {
  const phase = PHASES[task.phase] || PHASES[1];
  const gateMode = mode || task.gateType || phase.gateType || 'hard';
  const missing = (phase.requiredFields || []).filter((k) => !hasValue(task[k]));
  const gateOk = missing.length === 0;
  const warnings = gateMode === 'soft' && !gateOk
    ? [`Soft gate incompleto na fase ${phase.name}: ${missing.join(', ')}`]
    : [];
  const blocking = gateMode === 'hard' && !gateOk;
  return { gateOk, ok: gateOk, blocking, warnings, missing, mode: gateMode, phase };
}

module.exports = {
  ROOT,
  TASKS_FILE,
  REPORT_DIR,
  RUNTIME_STATUS,
  HUMAN_STATUS,
  LEGACY_STATUS_MAP,
  PHASES,
  APPROVE_TRANSITIONS,
  REJECT_TRANSITIONS,
  SQUAD_OWNERS,
  ensureState,
  loadTasks,
  saveTasks,
  now,
  nextId,
  applyPhase,
  normalizeSquad,
  parseEnvFile,
  normalizeRuntimeStatus,
  setTaskStatus,
  validateGate
};
