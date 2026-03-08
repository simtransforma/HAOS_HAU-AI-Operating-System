const { loadTasks, saveTasks, now, nextId, applyPhase, normalizeSquad, SQUAD_OWNERS } = require('./lib');

const args = process.argv.slice(2);
const arg = (k, d='') => (args.find(a=>a.startsWith(`--${k}=`))||`--${k}=${d}`).split('=').slice(1).join('=');
const objective = args.filter(a=>!a.startsWith('--')).join(' ').trim();
const taskClass = arg('class','complex');
const requester = arg('requester','');
const dod = arg('dod','');
const constraints = arg('constraints','');
const sourceRef = arg('source-ref','');
const squad = normalizeSquad(arg('squad','produtotech'));
if(!objective){ console.log('Uso: npm run haos:new-task -- "objetivo" --class=complex --requester=Gian --dod="critério" [--squad=...]'); process.exit(1); }
if(taskClass==='complex' && (!requester || !dod)){ console.error('BLOCKED: tarefa complexa exige --requester e --dod.'); process.exit(2); }

const tasks = loadTasks();
const task = {
  id: nextId(tasks), taskClass, requester, objective, definitionOfDone:dod, initialConstraints:constraints, sourceRefs:sourceRef?[sourceRef]:[],
  squad, squadOwner:SQUAD_OWNERS[squad], status:'in_progress', phase:1, phaseName:'ABERTURA', gate:'A', gateType:'hard', owner:'orquestrador-haos',
  waitingOn:'none', blockedReason:null, reproveCycles:0,
  questionBlockSent:false, questionMessageRef:null, questionSentAt:null,
  solicitanteReplyReceived:false, solicitanteReplyRef:null, solicitanteReplyAt:null, solicitanteReplySummary:null,
  routeDecision:null, successCriteria:null, executionEvidence:null, validationCriteria:null, validationResult:null, rootCause:null, returnPhase:null,
  finalApprovalRef:null, deliveryRef:null, registroRef:null,
  createdAt:now(), updatedAt:now(), history:[{at:now(),event:'created',by:'orquestrador-haos'}]
};
applyPhase(task,1);
tasks.push(task); saveTasks(tasks);
console.log(`Tarefa criada: ${task.id} | fase=${task.phaseName}`);
