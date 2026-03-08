const { loadTasks, saveTasks, applyPhase, now } = require('./lib');

const tasks = loadTasks();
let changed = 0;
for (const t of tasks) {
  if (!t.phaseName || !t.owner || !t.gate) {
    applyPhase(t, t.phase || 1);
    t.updatedAt = now();
    t.history = t.history || [];
    t.history.push({ at: now(), event: 'migrated_to_v0.4', by: 'system' });
    changed++;
  }
  if (!Array.isArray(t.blockers)) {
    t.blockers = [];
    changed++;
  }
}
saveTasks(tasks);
console.log(`Migration done. Tasks changed: ${changed}`);
