const { ensureState, PHASES } = require('./lib');

ensureState();
console.log('HAOS runtime iniciado (v0.3).');
console.log('Gates/Fases:');
Object.entries(PHASES).forEach(([k,v]) => {
  console.log(`- F${k}: ${v.name} | gate ${v.gate} | owner ${v.owner}`);
});
console.log('Comandos:');
console.log('- npm run haos:new-task -- "objetivo"');
console.log('- npm run haos:status');
console.log('- npm run haos:review -- <TASK_ID> <approve|reject>');
console.log('- npm run haos:council -- <TASK_ID> "contexto"');
console.log('- npm run haos:blocker -- <TASK_ID> <low|medium|high|critical> "mensagem"');
