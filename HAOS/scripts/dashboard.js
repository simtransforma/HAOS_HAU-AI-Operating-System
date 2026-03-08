const { loadTasks, validateGate } = require('./lib');

const tasks = loadTasks();
const byStatus = {};
const byPhase = {};
let invalidGates = 0;

for (const t of tasks) {
  byStatus[t.status] = (byStatus[t.status] || 0) + 1;
  byPhase[t.phaseName || `phase-${t.phase || '?'}`] = (byPhase[t.phaseName || `phase-${t.phase || '?'}`] || 0) + 1;
  if (!validateGate(t).ok) invalidGates++;
}

console.log('=== HAOS DASHBOARD ===');
console.log(`Total tasks: ${tasks.length}`);
console.log(`Gate inválido: ${invalidGates}`);
console.log('\nBy status:');
Object.entries(byStatus).forEach(([k,v]) => console.log(`- ${k}: ${v}`));
console.log('\nBy phase:');
Object.entries(byPhase).forEach(([k,v]) => console.log(`- ${k}: ${v}`));
console.log('\nOpen tasks:');
for (const t of tasks.filter(x => x.status !== 'done')) {
  const g = validateGate(t);
  console.log(`- ${t.id} | ${t.status} | ${t.phaseName} | gate ${t.gate}/${t.gateType} | gate_ok=${g.ok} | missing=${g.ok ? '-' : g.missing.join(',')} | waitingOn=${t.waitingOn || 'none'}`);
}
