const { loadTasks, saveTasks, now, nextId, applyPhase, normalizeSquad, SQUAD_OWNERS } = require('./lib');

const args = process.argv.slice(2);
const squadArg = args.find(a => a.startsWith('--squad='));
const objective = args.filter(a => !a.startsWith('--squad=')).join(' ').trim();
if (!objective) {
  console.log('Uso: npm run haos:new-task -- "objetivo" --squad=acquisition|tracking|creative|funnelcrm|produtotech|inteligencia');
  process.exit(1);
}

const squad = normalizeSquad((squadArg || '').split('=')[1] || 'produtotech');
const squadOwner = SQUAD_OWNERS[squad];

const tasks = loadTasks();
const id = nextId(tasks);
const task = {
  id,
  objective,
  squad,
  squadOwner,
  status: 'planning',
  phase: 1,
  phaseName: 'ABERTURA',
  gate: 'A',
  owner: 'orquestrador-haos',
  reproveCycles: 0,
  createdAt: now(),
  updatedAt: now(),
  blockers: [],
  history: [{ at: now(), event: 'created', by: 'orquestrador-haos', squad }]
};
applyPhase(task, 1);

tasks.push(task);
saveTasks(tasks);
console.log(`Tarefa criada: ${id}`);
console.log(`Squad: ${task.squad} | Squad owner: ${task.squadOwner}`);
console.log(`Status: ${task.status} | Fase: ${task.phaseName} | Gate ${task.gate} | Dono: ${task.owner}`);
