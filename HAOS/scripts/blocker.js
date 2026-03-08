const { loadTasks, saveTasks, now } = require('./lib');

const taskId = process.argv[2];
const severity = (process.argv[3] || '').toLowerCase();
const message = process.argv.slice(4).join(' ').trim() || 'bloqueio sem detalhe';
if (!taskId || !['low','medium','high','critical'].includes(severity)) {
  console.log('Uso: npm run haos:blocker -- <TASK_ID> <low|medium|high|critical> "mensagem"');
  process.exit(1);
}

const tasks = loadTasks();
const t = tasks.find(x => x.id === taskId);
if (!t) {
  console.log('Task não encontrada.');
  process.exit(1);
}

const escalation = severity === 'critical'
  ? ['sm', 'orquestrador-haos', 'conselho']
  : severity === 'high'
    ? ['sm', 'orquestrador-haos']
    : ['sm'];

const blocker = { at: now(), severity, message, escalation };
t.blockers = t.blockers || [];
t.blockers.push(blocker);
t.status = severity === 'critical' ? 'blocked_critical' : 'blocked';
t.updatedAt = now();
t.history.push({ at: now(), event: 'blocker_registered', by: 'sm', severity, escalation });

saveTasks(tasks);
console.log(`${taskId}: bloqueio ${severity.toUpperCase()} registrado.`);
console.log(`Escalonamento: ${escalation.join(' -> ')}`);
