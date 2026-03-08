const { loadTasks, saveTasks, now, normalizeRuntimeStatus } = require('./lib');

const [taskId, ...rest] = process.argv.slice(2);
if (!taskId) {
  console.log('Uso: npm run haos:update-task -- <TASK_ID> --set campo=valor [--set campo=valor...]');
  process.exit(1);
}

const pairs = [];
for (let i = 0; i < rest.length; i++) {
  if (rest[i] === '--set' && rest[i + 1] && rest[i + 1].includes('=')) {
    pairs.push(rest[i + 1]);
    i++;
    continue;
  }
  if (rest[i].includes('=') && !rest[i].startsWith('--')) pairs.push(rest[i]);
}
if (!pairs.length) {
  console.log('Nada para atualizar. Use --set campo=valor');
  process.exit(1);
}

const tasks = loadTasks();
const t = tasks.find((x) => x.id === taskId);
if (!t) {
  console.log('Task não encontrada.');
  process.exit(1);
}

const parseVal = (v) => {
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (v === 'null') return null;
  if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  return v;
};

for (const p of pairs) {
  const idx = p.indexOf('=');
  const k = p.slice(0, idx).trim();
  const v = parseVal(p.slice(idx + 1).trim());
  if (!k) continue;
  t[k] = k === 'status' ? normalizeRuntimeStatus(v) : v;
}

t.updatedAt = now();
t.history = t.history || [];
t.history.push({ at: now(), event: 'manual_update', by: 'orquestrador-haos', fields: pairs });
saveTasks(tasks);
console.log(`${taskId}: atualizado com ${pairs.length} campo(s).`);
