const fs = require('node:fs');
const path = require('node:path');
const { loadTasks, REPORT_DIR, now } = require('./lib');

const tasks = loadTasks();
const open = tasks.filter(t => t.status !== 'done');
const critical = tasks.flatMap(t => t.blockers || []).filter(b => b.severity === 'critical').length;
const lines = [];
lines.push(`# HAOS Daily Report - ${now()}`);
lines.push(`- Total tasks: ${tasks.length}`);
lines.push(`- Open tasks: ${open.length}`);
lines.push(`- Critical blockers: ${critical}`);
lines.push('');
for (const t of open) {
  lines.push(`- ${t.id} | ${t.status} | ${t.phaseName} | owner=${t.owner} | squad=${t.squad || '-'} | ${t.objective}`);
}
const file = path.join(REPORT_DIR, `daily-${new Date().toISOString().slice(0,10)}.md`);
fs.writeFileSync(file, lines.join('\n') + '\n');
console.log(`Daily report gerado: ${file}`);
