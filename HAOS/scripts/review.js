const {
  loadTasks,
  saveTasks,
  now,
  applyPhase,
  validateGate,
  setTaskStatus,
  RUNTIME_STATUS,
  APPROVE_TRANSITIONS,
  REJECT_TRANSITIONS
} = require('./lib');

const args = process.argv.slice(2);
const taskId = args[0];
const decision = (args[1] || '').toLowerCase();
const justifyArg = args.find((a) => a.startsWith('--justify='));
const justify = justifyArg ? justifyArg.split('=').slice(1).join('=').trim() : '';

if (!taskId || !['approve', 'reject'].includes(decision)) {
  console.log('Uso: npm run haos:review -- <TASK_ID> <approve|reject> [--justify="..."]');
  process.exit(1);
}

const tasks = loadTasks();
const t = tasks.find((x) => x.id === taskId);
if (!t) {
  console.log('Task não encontrada.');
  process.exit(1);
}

t.history = t.history || [];
t.gateWarnings = t.gateWarnings || [];

function failBlocked(message, waitingOn = 'dependency', pendingFields = []) {
  setTaskStatus(t, RUNTIME_STATUS.BLOCKED_DEPENDENCY, {
    waitingOn,
    blockedReason: message,
    pendingFields
  });
  t.updatedAt = now();
  t.history.push({ at: now(), event: 'blocked_transition', by: 'review-lead', reason: message, pendingFields });
  saveTasks(tasks);
  console.error(`BLOCKED: ${message}`);
  process.exit(2);
}

if (decision === 'approve') {
  const g = validateGate(t, { mode: t.gateType });
  t.gateOk = g.gateOk;

  if (g.blocking) {
    failBlocked(`Hard gate inválido na fase ${t.phaseName}. Campos ausentes: ${g.missing.join(', ')}`, 'dependency', g.missing);
  }

  if (g.mode === 'soft' && !g.gateOk) {
    if (!justify) {
      failBlocked('Soft gate incompleto exige justificativa explícita no review.', 'review', g.missing);
    }
    t.softGateOverride = true;
    t.softGateJustification = justify;
    t.gateWarnings = g.warnings;
  } else {
    t.softGateOverride = false;
    t.softGateJustification = null;
    t.gateWarnings = [];
  }

  const next = APPROVE_TRANSITIONS[t.phase || 1] || 13;
  applyPhase(t, next);
  setTaskStatus(t, next === 13 ? RUNTIME_STATUS.DONE : RUNTIME_STATUS.IN_PROGRESS, {
    waitingOn: 'none',
    blockedReason: null,
    pendingFields: []
  });

  t.history.push({
    at: now(),
    event: 'review_approved',
    by: 'review-lead',
    nextPhase: t.phaseName,
    gateOk: t.gateOk,
    gateMode: g.mode,
    gateWarnings: t.gateWarnings,
    softGateOverride: t.softGateOverride,
    softGateJustification: t.softGateJustification
  });
} else {
  t.reproveCycles = (t.reproveCycles || 0) + 1;
  const next = REJECT_TRANSITIONS.default;
  applyPhase(t, next);
  setTaskStatus(t, RUNTIME_STATUS.REWORK, {
    waitingOn: 'none',
    blockedReason: null,
    pendingFields: []
  });
  t.history.push({ at: now(), event: 'review_rejected', by: 'review-lead', returnedTo: t.phaseName, cycles: t.reproveCycles });
}

t.updatedAt = now();
saveTasks(tasks);
console.log(`${taskId}: ${decision.toUpperCase()} | fase=${t.phaseName} | status=${t.status}`);
