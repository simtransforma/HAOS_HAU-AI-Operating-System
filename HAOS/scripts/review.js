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
  let next = (t.phase || 1) + 1;
  if (t.phase === 10) next = 5; // conselho reprovado volta ao MEGA_BRAIN
  next = Math.min(next, 13);
  applyPhase(t, next);
  t.status = next === 13 ? 'done' : 'in_progress';
  t.history.push({ at: now(), event: 'review_approved', by: 'review-lead', nextPhase: t.phaseName });
} else {
  // Reprovação formal entra no CONSELHO_SE_REPROVADO
  t.reproveCycles = (t.reproveCycles || 0) + 1;
  if (t.reproveCycles > 3) {
    t.status = 'blocked';
    t.history.push({ at: now(), event: 'reprove_limit_reached', by: 'review-lead', cycles: t.reproveCycles });
  } else {
    t.status = 'rework';
    applyPhase(t, 10);
    t.history.push({ at: now(), event: 'review_rejected', by: 'review-lead', returnedTo: t.phaseName, cycles: t.reproveCycles });
  }
}

t.updatedAt = now();
saveTasks(tasks);
console.log(`${taskId}: ${decision.toUpperCase()} | status=${t.status} | fase=${t.phaseName} | gate=${t.gate} | dono=${t.owner} | ciclos=${t.reproveCycles || 0}`);
