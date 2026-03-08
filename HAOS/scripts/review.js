const { loadTasks, saveTasks, now, applyPhase } = require('./lib');

const taskId = process.argv[2];
const decision = (process.argv[3] || '').toLowerCase();
if (!taskId || !['approve', 'reject'].includes(decision)) {
  console.log('Uso: npm run haos:review -- <TASK_ID> <approve|reject>');
  process.exit(1);
}

const tasks = loadTasks();
const t = tasks.find(x => x.id === taskId);
if (!t) { console.log('Task não encontrada.'); process.exit(1); }

function block(msg, waitingOn='none') {
  t.status = 'blocked';
  t.waitingOn = waitingOn;
  t.updatedAt = now();
  t.history.push({ at: now(), event: 'blocked_transition', by: 'review-lead', reason: msg });
  saveTasks(tasks);
  console.error(`BLOCKED: ${msg}`);
  process.exit(2);
}

if (decision === 'approve') {
  if (t.phaseName === 'CONSELHO-Fase1' && !t.questionBlockSent) {
    block('CONSELHO-Fase1 exige bloco de perguntas enviado ao solicitante.', 'solicitante');
  }
  if (t.phaseName === 'REPORT-SOLICITANTE' && !t.solicitanteReplyReceived) {
    block('REPORT-SOLICITANTE exige resposta explícita do solicitante registrada.', 'solicitante');
  }
  let next = (t.phase || 1) + 1;
  if (t.phaseName === 'CONSELHO_SE_REPROVADO') next = 5;
  next = Math.min(next, 13);
  applyPhase(t, next);
  t.status = next === 13 ? 'done' : 'in_progress';
  t.waitingOn = 'none';
  t.history.push({ at: now(), event: 'review_approved', by: 'review-lead', nextPhase: t.phaseName });
} else {
  t.reproveCycles = (t.reproveCycles || 0) + 1;
  if (t.reproveCycles > 3) {
    block('Limite de 3 ciclos de reprovação atingido. Escalar ao solicitante.', 'conselho');
  }
  t.status = 'rework';
  applyPhase(t, 10);
  t.history.push({ at: now(), event: 'review_rejected', by: 'review-lead', returnedTo: t.phaseName, cycles: t.reproveCycles });
}

t.updatedAt = now();
saveTasks(tasks);
console.log(`${taskId}: ${decision.toUpperCase()} | fase=${t.phaseName} | gate=${t.gate} | status=${t.status}`);
