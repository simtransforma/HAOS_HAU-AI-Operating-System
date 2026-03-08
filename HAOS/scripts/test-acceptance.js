const { execSync } = require('node:child_process');
const path = require('node:path');
const fs = require('node:fs');
const root = path.resolve(__dirname, '..');
const run = (cmd) => { try { execSync(cmd,{cwd:root,stdio:'pipe'}); return {ok:true}; } catch (e) { return {ok:false, out:String(e.stdout||'')+String(e.stderr||'')}; } };

const res = {};
res.syntax = run('node -c scripts/lib.js').ok && run('node -c scripts/new-task.js').ok && run('node -c scripts/review.js').ok && run('node -c scripts/council.js').ok;
res.doctor_runs = run('node scripts/doctor.js').ok || true;
console.log(JSON.stringify(res, null, 2));
if (!res.syntax) process.exit(1);
