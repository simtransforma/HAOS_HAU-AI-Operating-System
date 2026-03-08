const { loadTasks, validateGate } = require('./lib');

const tasks = loadTasks();
if (!tasks.length) { console.log('Sem tarefas no HAOS ainda.'); process.exit(0); }

for (const t of tasks) {
  const g = validateGate(t);
  const missing = g.ok ? '-' : g.missing.join(',');
  console.log(`${t.id} | ${t.phaseName} | gate ${t.gate}/${t.gateType} | gate_ok=${g.ok} | missing=${missing} | owner=${t.owner} | status=${t.status} | waitingOn=${t.waitingOn || 'none'} | reason=${t.blockedReason || '-'} | ${t.objective}`);
}
