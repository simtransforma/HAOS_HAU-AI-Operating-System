const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'haos-acceptance-'));
const tasksFile = path.join(tmp, 'tasks.json');
fs.writeFileSync(tasksFile, '[]\n');

const env = { ...process.env, HAOS_TASKS_FILE: tasksFile, HAOS_REPORT_DIR: path.join(tmp, 'reports') };
const run = (script, args = []) => spawnSync('node', [path.join(root, 'scripts', script), ...args], { cwd: root, env, encoding: 'utf-8' });
const loadTasks = () => JSON.parse(fs.readFileSync(tasksFile, 'utf-8'));
const getTask = () => loadTasks()[0];

const result = {};

result.syntax = ['lib.js', 'new-task.js', 'review.js', 'council.js', 'status-lint.js'].every((f) => {
  const p = spawnSync('node', ['-c', path.join(root, 'scripts', f)], { cwd: root, env, encoding: 'utf-8' });
  return p.status === 0;
});
result.doctor = run('doctor.js').status === 0;

// S1 Happy path עד REGISTRO
run('new-task.js', ['Objetivo E2E', '--class=complex', '--requester=Gian', '--dod=Fechar rito']);
const id = getTask().id;
run('review.js', [id, 'approve']);
run('council.js', [id, '--mode=phase1', '--question-ref=msg-1', '--question-block=Perguntas', '--debate-summary=Resumo']);
run('review.js', [id, 'approve']);
run('update-task.js', [id, '--set', 'solicitanteReplyReceived=true', '--set', 'solicitanteReplyRef=msg-2', '--set', 'solicitanteReplySummary=ok']);
run('review.js', [id, 'approve']);
run('council.js', [id, '--mode=phase2', '--route-decision=seguir', '--success-criteria=criterio']);
run('review.js', [id, 'approve']);
run('review.js', [id, 'approve', '--justify=history em construção']);
run('review.js', [id, 'approve']);
run('update-task.js', [id, '--set', 'executionEvidence=evidencia']);
run('review.js', [id, 'approve']);
run('update-task.js', [id, '--set', 'validationCriteria=crit', '--set', 'validationResult=pass']);
run('review.js', [id, 'approve', '--justify=final ok']);
run('council.js', [id, '--mode=final', '--final-approval-ref=fa-1']);
run('review.js', [id, 'approve']);
run('update-task.js', [id, '--set', 'deliveryRef=del-1']);
run('review.js', [id, 'approve']);
run('update-task.js', [id, '--set', 'registroRef=reg-1']);
run('review.js', [id, 'approve']);
let t = getTask();
result.S1_happy_path = t.phase === 13 && t.status === 'done';

// S2 reprovação retorna 10 -> 5
run('new-task.js', ['Objetivo rework', '--class=complex', '--requester=Gian', '--dod=Rework']);
let t2 = loadTasks()[1];
const id2 = t2.id;
run('review.js', [id2, 'approve']);
run('update-task.js', [id2, '--set', 'questionMessageRef=q', '--set', 'questionBlock=b', '--set', 'debateSummary=d']);
run('review.js', [id2, 'approve']);
run('update-task.js', [id2, '--set', 'solicitanteReplyRef=s', '--set', 'solicitanteReplySummary=s']);
run('review.js', [id2, 'approve']);
run('update-task.js', [id2, '--set', 'routeDecision=r', '--set', 'successCriteria=c']);
run('review.js', [id2, 'approve']);
run('review.js', [id2, 'approve', '--justify=soft']);
run('review.js', [id2, 'approve']);
run('update-task.js', [id2, '--set', 'executionEvidence=e']);
run('review.js', [id2, 'approve']);
run('update-task.js', [id2, '--set', 'validationCriteria=v', '--set', 'validationResult=fail']);
run('review.js', [id2, 'reject']);
let mid = loadTasks()[1];
const at10 = mid.phase === 10;
run('council.js', [id2, '--mode=rework', '--root-cause=erro', '--return-phase=MEGA_BRAIN']);
run('review.js', [id2, 'approve', '--justify=rework completo']);
mid = loadTasks()[1];
result.S2_rework_return = at10 && mid.phase === 5;

// S3 hard gate bloqueia
run('new-task.js', ['Objetivo hard', '--class=complex', '--requester=Gian', '--dod=Hard']);
const id3 = loadTasks()[2].id;
run('update-task.js', [id3, '--set', 'phase=8', '--set', 'phaseName=EXECUCAO', '--set', 'gate=B', '--set', 'gateType=hard', '--set', 'executionEvidence=null']);
const s3 = run('review.js', [id3, 'approve']);
result.S3_hard_gate_blocks = s3.status !== 0 && loadTasks()[2].status === 'blocked_dependency';

// S4 soft gate com justify
run('new-task.js', ['Objetivo soft', '--class=complex', '--requester=Gian', '--dod=Soft']);
const id4 = loadTasks()[3].id;
run('update-task.js', [id4, '--set', 'phase=11', '--set', 'phaseName=CONSELHO_Final_Aprovado', '--set', 'gate=F', '--set', 'gateType=soft', '--set', 'finalApprovalRef=null']);
const s4 = run('review.js', [id4, 'approve', '--justify=seguir com warning']);
let ts4 = loadTasks()[3];
result.S4_soft_gate_with_justify = s4.status === 0 && ts4.softGateOverride === true && (ts4.gateWarnings || []).length > 0;

// S5 soft gate sem justify bloqueia
run('new-task.js', ['Objetivo soft sem justify', '--class=complex', '--requester=Gian', '--dod=Soft']);
const id5 = loadTasks()[4].id;
run('update-task.js', [id5, '--set', 'phase=11', '--set', 'phaseName=CONSELHO_Final_Aprovado', '--set', 'gate=F', '--set', 'gateType=soft', '--set', 'finalApprovalRef=null']);
const s5 = run('review.js', [id5, 'approve']);
const ts5 = loadTasks()[4];
result.S5_soft_gate_without_justify_blocks = s5.status !== 0 && ts5.status === 'blocked_dependency';

// S6 council exige evidência real
run('new-task.js', ['Objetivo council', '--class=complex', '--requester=Gian', '--dod=Council']);
const id6 = loadTasks()[5].id;
const s6 = run('council.js', [id6, '--mode=final']);
const ts6 = loadTasks()[5];
result.S6_council_requires_real_evidence = s6.status !== 0 && Array.isArray(ts6.pendingFields) && ts6.pendingFields.length > 0;

console.log(JSON.stringify(result, null, 2));

const allPass = Object.entries(result).filter(([k]) => k !== 'syntax').every(([, v]) => v === true);
process.exit(allPass ? 0 : 1);
