const { loadTasks, saveTasks, now } = require('./lib');

const taskId = process.argv[2];
const modeArg = process.argv.find(a => a.startsWith('--mode='));
const mode = (modeArg || '--mode=phase1').split('=')[1];
const note = process.argv.slice(3).filter(x => !x.startsWith('--mode=')).join(' ').trim() || 'council session';
if (!taskId) {
  console.log('Uso: npm run haos:council -- <TASK_ID> --mode=phase1|phase2 "contexto"');
  process.exit(1);
}

const tasks = loadTasks();
const t = tasks.find(x => x.id === taskId);
if (!t) { console.log('Task não encontrada.'); process.exit(1); }

if (!['phase1','phase2'].includes(mode)) {
  console.log('Modo inválido. Use phase1 ou phase2.');
  process.exit(1);
}

if (mode === 'phase1') {
  t.status = 'awaiting_solicitante';
  t.waitingOn = 'solicitante';
  t.questionBlockSent = true;
  t.questionMessageRef = `qref-${Date.now()}`;
  t.history.push({ at: now(), event: 'council_phase1_questions_sent', by: 'project-director', note, questionMessageRef: t.questionMessageRef });
} else {
  if (!t.solicitanteReplyReceived) {
    console.error('BLOCKED: phase2 exige resposta do solicitante registrada (solicitanteReplyReceived=true).');
    process.exit(2);
  }
  t.status = 'council_phase2';
  t.waitingOn = 'none';
  t.history.push({ at: now(), event: 'council_phase2_decision', by: 'project-director', note, solicitanteReplyRef: t.solicitanteReplyRef });
}

t.updatedAt = now();
saveTasks(tasks);
console.log(`${taskId}: council ${mode} registrado.`);
