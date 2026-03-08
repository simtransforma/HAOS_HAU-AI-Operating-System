const { loadTasks, saveTasks, now } = require('./lib');

const taskId = process.argv[2];
const note = process.argv.slice(3).join(' ').trim() || 'decision requested';
if (!taskId) {
  console.log('Uso: npm run haos:council -- <TASK_ID> "contexto da decisão"');
  process.exit(1);
}

const tasks = loadTasks();
const t = tasks.find(x => x.id === taskId);
if (!t) {
  console.log('Task não encontrada.');
  process.exit(1);
}

t.status = 'council_review';
t.updatedAt = now();
t.history.push({ at: now(), event: 'council_called', by: 'orquestrador-haos', note });
saveTasks(tasks);

console.log(`${taskId}: conselho acionado.`);
console.log('Membros: project-director, operations-director, strategy-director, architect');
console.log(`Contexto: ${note}`);
