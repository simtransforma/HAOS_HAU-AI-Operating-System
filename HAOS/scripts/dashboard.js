const { loadTasks } = require('./lib');

const tasks = loadTasks();
const byStatus = {};
const byPhase = {};
let critical = 0;

for (const t of tasks) {
  byStatus[t.status] = (byStatus[t.status] || 0) + 1;
  byPhase[t.phaseName || `phase-${t.phase || '?'}`] = (byPhase[t.phaseName || `phase-${t.phase || '?'}`] || 0) + 1;
  const blockers = t.blockers || [];
  critical += blockers.filter(b => b.severity === 'critical').length;
}

console.log('=== HAOS DASHBOARD ===');
console.log(`Total tasks: ${tasks.length}`);
console.log(`Critical blockers: ${critical}`);
console.log('\nBy status:');
Object.entries(byStatus).forEach(([k,v]) => console.log(`- ${k}: ${v}`));
console.log('\nBy phase:');
Object.entries(byPhase).forEach(([k,v]) => console.log(`- ${k}: ${v}`));
console.log('\nOpen tasks:');
tasks.filter(t => t.status !== 'done').forEach(t => {
  console.log(`- ${t.id} | ${t.status} | ${t.phaseName || '?'} | ${t.objective}`);
});
