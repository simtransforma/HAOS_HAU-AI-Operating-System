const { loadTasks, validateGate } = require('./lib');

const tasks = loadTasks();
const byStatus = {};
const byPhase = {};
let invalidGates = 0;
let softOverrides = 0;

for (const t of tasks) {
  byStatus[t.status] = (byStatus[t.status] || 0) + 1;
  byPhase[t.phaseName || `phase-${t.phase || '?'}`] = (byPhase[t.phaseName || `phase-${t.phase || '?'}`] || 0) + 1;
  const g = validateGate(t, { mode: t.gateType });
  if (!g.gateOk) invalidGates++;
  if (t.softGateOverride) softOverrides++;
}

console.log('=== HAOS DASHBOARD ===');
console.log(`Total tasks: ${tasks.length}`);
console.log(`Gate inválido: ${invalidGates}`);
console.log(`Soft gate override: ${softOverrides}`);
console.log('\nBy status:');
Object.entries(byStatus).forEach(([k, v]) => console.log(`- ${k}: ${v}`));
console.log('\nBy phase:');
Object.entries(byPhase).forEach(([k, v]) => console.log(`- ${k}: ${v}`));
console.log('\nOpen tasks:');
for (const t of tasks.filter((x) => x.status !== 'done')) {
  const g = validateGate(t, { mode: t.gateType });
  console.log(`- ${t.id} | ${t.status} | ${t.phaseName} | gate ${t.gate}/${t.gateType} | gate_ok=${g.gateOk} | soft_override=${Boolean(t.softGateOverride)} | warnings=${(t.gateWarnings || []).length} | pending=${(t.pendingFields || []).length ? t.pendingFields.join(',') : '-'} | waitingOn=${t.waitingOn || 'none'}`);
}
