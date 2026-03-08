const { loadTasks, saveTasks, now, setTaskStatus, RUNTIME_STATUS } = require('./lib');

const args = process.argv.slice(2);
const taskId = args[0];
const mode = ((args.find((a) => a.startsWith('--mode=')) || '--mode=phase1').split('=')[1] || 'phase1').trim();

if (!taskId) {
  console.log('Uso: npm run haos:council -- <TASK_ID> --mode=phase1|phase2|rework|final [--campo=valor]');
  process.exit(1);
}
if (!['phase1', 'phase2', 'rework', 'final'].includes(mode)) {
  console.log('Modo inválido. Use phase1|phase2|rework|final');
  process.exit(1);
}

const opt = (key) => {
  const found = args.find((a) => a.startsWith(`--${key}=`));
  return found ? found.split('=').slice(1).join('=').trim() : '';
};

const tasks = loadTasks();
const t = tasks.find((x) => x.id === taskId);
if (!t) {
  console.log('Task não encontrada.');
  process.exit(1);
}
t.history = t.history || [];

function blockEvidence(fields) {
  const reason = 'Evidência obrigatória ausente no council.';
  setTaskStatus(t, RUNTIME_STATUS.BLOCKED_DEPENDENCY, {
    waitingOn: 'evidence',
    blockedReason: reason,
    pendingFields: fields
  });
  t.updatedAt = now();
  t.history.push({ at: now(), event: `council_${mode}_blocked`, by: 'project-director', pendingFields: fields, reason });
  saveTasks(tasks);
  console.error(`BLOCKED: ${reason} Campos: ${fields.join(', ')}`);
  process.exit(2);
}

if (mode === 'phase1') {
  const questionRef = opt('question-ref');
  const questionBlock = opt('question-block');
  const debateSummary = opt('debate-summary');
  const missing = [];
  if (!questionRef) missing.push('question-ref');
  if (!questionBlock) missing.push('question-block');
  if (!debateSummary) missing.push('debate-summary');
  if (missing.length) blockEvidence(missing);

  t.questionMessageRef = questionRef;
  t.questionBlock = questionBlock;
  t.debateSummary = debateSummary;
  t.questionBlockSent = true;
  t.questionSentAt = now();
  setTaskStatus(t, RUNTIME_STATUS.BLOCKED_WAITING_SOLICITANTE, { waitingOn: 'solicitante', blockedReason: null, pendingFields: [] });
}

if (mode === 'phase2') {
  const routeDecision = opt('route-decision');
  const successCriteria = opt('success-criteria');
  const missing = [];
  if (!routeDecision) missing.push('route-decision');
  if (!successCriteria) missing.push('success-criteria');
  if (!t.solicitanteReplyReceived) missing.push('solicitanteReplyReceived');
  if (!t.solicitanteReplyRef) missing.push('solicitanteReplyRef');
  if (missing.length) blockEvidence(missing);

  t.routeDecision = routeDecision;
  t.successCriteria = successCriteria;
  setTaskStatus(t, RUNTIME_STATUS.IN_PROGRESS, { waitingOn: 'none', blockedReason: null, pendingFields: [] });
}

if (mode === 'rework') {
  const rootCause = opt('root-cause');
  const returnPhase = opt('return-phase');
  const missing = [];
  if (!rootCause) missing.push('root-cause');
  if (!returnPhase) missing.push('return-phase');
  if (missing.length) blockEvidence(missing);

  t.rootCause = rootCause;
  t.returnPhase = returnPhase;
  setTaskStatus(t, RUNTIME_STATUS.REWORK, { waitingOn: 'none', blockedReason: null, pendingFields: [] });
}

if (mode === 'final') {
  const finalApprovalRef = opt('final-approval-ref');
  if (!finalApprovalRef) blockEvidence(['final-approval-ref']);

  t.finalApprovalRef = finalApprovalRef;
  setTaskStatus(t, RUNTIME_STATUS.IN_PROGRESS, { waitingOn: 'none', blockedReason: null, pendingFields: [] });
}

t.updatedAt = now();
t.history.push({ at: now(), event: `council_${mode}`, by: 'project-director' });
saveTasks(tasks);
console.log(`${taskId}: council ${mode} registrado.`);
