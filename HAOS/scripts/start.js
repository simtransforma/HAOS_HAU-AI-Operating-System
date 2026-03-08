const { ensureState, PHASES } = require('./lib');

ensureState();
console.log('HAOS runtime iniciado (v2-liso).');
console.log('Fases/Gates:');
Object.entries(PHASES).forEach(([k,v]) => {
  console.log(`- F${k}: ${v.name} | gate ${v.gate}/${v.gateType} | owner ${v.owner}`);
});
console.log('Comandos:');
console.log('- npm run haos:new-task -- "objetivo" --class=complex --requester=Gian --dod="critério" [--squad=...]');
console.log('- npm run haos:update-task -- <TASK_ID> --set campo=valor');
console.log('- npm run haos:review -- <TASK_ID> <approve|reject>');
console.log('- npm run haos:council -- <TASK_ID> --mode=phase1|phase2|rework|final "contexto"');
console.log('- npm run haos:status');
console.log('- npm run haos:dashboard');
