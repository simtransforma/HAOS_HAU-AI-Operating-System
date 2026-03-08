const { loadTasks, validateGate } = require('./lib');

const tasks = loadTasks();
if (!tasks.length) {
  console.log('Sem tarefas no HAOS ainda.');
  process.exit(0);
}

for (const t of tasks) {
  const g = validateGate(t, { mode: t.gateType });
  const missing = g.gateOk ? '-' : g.missing.join(',');
  const warnings = (t.gateWarnings || []).length ? t.gateWarnings.join('; ') : '-';
  const pending = (t.pendingFields || []).length ? t.pendingFields.join(',') : '-';
  console.log(
    `${t.id} | ${t.phaseName} | gate ${t.gate}/${t.gateType} | gate_ok=${g.gateOk} | soft_override=${Boolean(t.softGateOverride)} | warnings=${warnings} | missing=${missing} | pending=${pending} | owner=${t.owner} | status=${t.status} | waitingOn=${t.waitingOn || 'none'} | reason=${t.blockedReason || '-'} | ${t.objective}`
  );
}
