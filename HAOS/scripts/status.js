const { loadTasks } = require('./lib');

const tasks = loadTasks();
if (!tasks.length) {
  console.log('Sem tarefas no HAOS ainda.');
  process.exit(0);
}

for (const t of tasks) {
  const b = (t.blockers || []).length;
  console.log(`${t.id} | phase ${t.phase} (${t.phaseName}) | gate ${t.gate} | owner ${t.owner} | ${t.status} | blockers ${b} | ${t.objective}`);
}
