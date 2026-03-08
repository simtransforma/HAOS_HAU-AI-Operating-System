const { loadTasks, saveTasks, now, applyPhase } = require('./lib');

const taskId = process.argv[2];
const decision = (process.argv[3] || '').toLowerCase();
if (!taskId || !['approve', 'reject'].includes(decision)) {
  console.log('Uso: npm run haos:review -- <TASK_ID> <approve|reject>');
  process.exit(1);
}

const tasks = loadTasks();
const t = tasks.find(x => x.id === taskId);
if (!t) {
  console.log('Task não encontrada.');
  process.exit(1);
}

if (decision === 'approve') {
  const next = Math.min((t.phase || 1) + 1, 6);
  applyPhase(t, next);
  t.status = next === 6 ? 'done' : 'in_progress';
  t.history.push({ at: now(), event: 'review_approved', by: 'review-lead', nextPhase: t.phaseName });
} else {
  t.status = 'rework';
  const back = Math.max((t.phase || 2) - 1, 2);
  applyPhase(t, back);
  t.history.push({ at: now(), event: 'review_rejected', by: 'review-lead', returnedTo: t.phaseName });
}

t.updatedAt = now();
saveTasks(tasks);
console.log(`${taskId}: ${decision.toUpperCase()} | status=${t.status} | fase=${t.phaseName} | gate=${t.gate} | dono=${t.owner}`);
