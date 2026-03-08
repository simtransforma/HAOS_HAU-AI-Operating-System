const { loadTasks, saveTasks, now } = require('./lib');

const taskId = process.argv[2];
const mode = ((process.argv.find(a=>a.startsWith('--mode='))||'--mode=phase1').split('=')[1]||'phase1');
const note = process.argv.slice(3).filter(x=>!x.startsWith('--mode=')).join(' ').trim() || 'council session';
if(!taskId){ console.log('Uso: npm run haos:council -- <TASK_ID> --mode=phase1|phase2|rework|final "contexto"'); process.exit(1); }

const tasks=loadTasks(); const t=tasks.find(x=>x.id===taskId); if(!t){ console.log('Task não encontrada.'); process.exit(1); }
if(!['phase1','phase2','rework','final'].includes(mode)){ console.log('Modo inválido.'); process.exit(1); }

if(mode==='phase1'){
  t.debateSummary = note; t.criticalUnknowns = t.criticalUnknowns || ['a confirmar com solicitante'];
  t.questionBlock = t.questionBlock || note; t.questionBlockSent=true; t.questionSentAt=now(); t.questionMessageRef = t.questionMessageRef || `qref-${Date.now()}`;
  t.waitingOn='solicitante'; t.status='blocked_waiting_solicitante';
}
if(mode==='phase2'){
  if(!t.solicitanteReplyReceived || !t.solicitanteReplyRef){ console.error('BLOCKED: phase2 exige resposta do solicitante (solicitanteReplyReceived + solicitanteReplyRef).'); process.exit(2); }
  t.status='in_progress'; t.waitingOn='none'; t.routeDecision = t.routeDecision || note; t.successCriteria = t.successCriteria || 'critério definido';
}
if(mode==='rework'){
  t.rootCause = t.rootCause || note; t.returnPhase = t.returnPhase || 'MEGA_BRAIN'; t.status='rework';
}
if(mode==='final'){
  t.finalApprovalRef = t.finalApprovalRef || `fref-${Date.now()}`; t.status='in_progress';
}

t.updatedAt=now(); t.history.push({at:now(),event:`council_${mode}`,by:'project-director',note}); saveTasks(tasks);
console.log(`${taskId}: council ${mode} registrado.`);
