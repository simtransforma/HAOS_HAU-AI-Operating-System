const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const STATE_DIR = path.join(ROOT, 'runtime', 'state');
const TASKS_FILE = path.join(STATE_DIR, 'tasks.json');
const REPORT_DIR = path.join(ROOT, 'runtime', 'reports');

const PHASES = {
  1: { name: 'ABERTURA', gate: 'A', gateType: 'hard', owner: 'orquestrador-haos', requiredFields: ['taskClass','requester','objective','definitionOfDone'] },
  2: { name: 'CONSELHO-Fase1', gate: 'A', gateType: 'hard', owner: 'project-director', requiredFields: ['questionMessageRef'] },
  3: { name: 'REPORT-SOLICITANTE', gate: 'A', gateType: 'hard', owner: 'orquestrador-haos', requiredFields: ['solicitanteReplyRef','solicitanteReplySummary'] },
  4: { name: 'CONSELHO-Fase2', gate: 'B', gateType: 'hard', owner: 'project-director', requiredFields: ['routeDecision','successCriteria'] },
  5: { name: 'MEGA_BRAIN', gate: 'B', gateType: 'soft', owner: 'orquestrador-haos', requiredFields: ['history'] },
  6: { name: 'DIRETOR', gate: 'B', gateType: 'soft', owner: 'project-director', requiredFields: ['successCriteria'] },
  7: { name: 'ESTRATEGISTA', gate: 'B', gateType: 'soft', owner: 'strategy-director', requiredFields: ['routeDecision'] },
  8: { name: 'EXECUCAO', gate: 'B', gateType: 'hard', owner: 'squad-owner', requiredFields: ['executionEvidence'] },
  9: { name: 'VALIDACAO', gate: 'C', gateType: 'hard', owner: 'review-lead', requiredFields: ['validationCriteria','validationResult'] },
  10: { name: 'CONSELHO_SE_REPROVADO', gate: 'R', gateType: 'soft', owner: 'project-director', requiredFields: ['rootCause','returnPhase'] },
  11: { name: 'CONSELHO_Final_Aprovado', gate: 'F', gateType: 'soft', owner: 'project-director', requiredFields: ['finalApprovalRef'] },
  12: { name: 'ENTREGA', gate: 'F', gateType: 'soft', owner: 'orquestrador-haos', requiredFields: ['deliveryRef'] },
  13: { name: 'REGISTRO', gate: 'DONE', gateType: 'hard', owner: 'orquestrador-haos', requiredFields: ['registroRef'] }
};

const SQUAD_OWNERS = {
  acquisition: 'traffic-master',
  tracking: 'tracking-engineer',
  creative: 'copy-specialist',
  funnelcrm: 'automation-architect',
  produtotech: 'product-engineer-webapps',
  inteligencia: 'analyst'
};

function ensureState(){ fs.mkdirSync(STATE_DIR,{recursive:true}); fs.mkdirSync(REPORT_DIR,{recursive:true}); if(!fs.existsSync(TASKS_FILE)) fs.writeFileSync(TASKS_FILE,'[]\n'); }
function loadTasks(){ ensureState(); return JSON.parse(fs.readFileSync(TASKS_FILE,'utf-8')); }
function saveTasks(tasks){ fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks,null,2)+'\n'); }
function now(){ return new Date().toISOString(); }
function nextId(tasks){ return `HAOS-${String(tasks.length+1).padStart(4,'0')}`; }
function normalizeSquad(input=''){ const v=input.toLowerCase().replace(/[^a-z]/g,''); return Object.keys(SQUAD_OWNERS).includes(v)?v:'produtotech'; }
function applyPhase(task, phase){ const p=PHASES[phase]||PHASES[1]; task.phase=phase; task.phaseName=p.name; task.gate=p.gate; task.gateType=p.gateType; task.owner=(p.owner==='squad-owner'?(task.squadOwner||'squad-owner'):p.owner); if(phase===13) task.status='done'; }
function parseEnvFile(){ const p=path.join(ROOT,'.env'); if(!fs.existsSync(p)) return {}; const env={}; for(const line of fs.readFileSync(p,'utf-8').split(/\r?\n/)){ const l=line.trim(); if(!l||l.startsWith('#')||!l.includes('=')) continue; const i=l.indexOf('='); env[l.slice(0,i).trim()]=l.slice(i+1).trim(); } return env; }
function hasValue(v){ if(v===null||v===undefined) return false; if(typeof v==='string') return v.trim().length>0; if(Array.isArray(v)) return v.length>0; return true; }
function validateGate(task){ const p=PHASES[task.phase]||PHASES[1]; const missing=(p.requiredFields||[]).filter(k=>!hasValue(task[k])); return {ok:missing.length===0,missing,phase:p}; }

module.exports={ROOT,TASKS_FILE,REPORT_DIR,PHASES,SQUAD_OWNERS,ensureState,loadTasks,saveTasks,now,nextId,applyPhase,normalizeSquad,parseEnvFile,validateGate};
