#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const out = { k: 5 };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    const consume = () => {
      i += 1;
      return next;
    };

    if (arg === '--query' || arg === '-q') out.query = consume();
    else if (arg === '--query-vector') out.queryVector = consume();
    else if (arg === '--index' || arg === '-i') out.indexPath = consume();
    else if (arg === '--k' || arg === '-k') out.k = Number(consume() || 5);
    else if (arg === '--area') out.area = consume();
    else if (arg === '--cliente') out.cliente = consume();
    else if (arg === '--tipo') out.tipo = consume();
    else if (arg === '--show-score') out.showScore = true;
    else if (arg === '--json') out.json = true;
    else if (arg === '--help' || arg === '-h') out.help = true;
  }
  return out;
}

function usage() {
  return `kb-search - busca semântica na KB usando índice vetorial\n\nUso:\n  node scripts/kb-search.js --query "onboarding cliente" [opções]\n  node scripts/kb-search.js --query-vector "0.12,0.56,..." [opções]\n\nOpções:\n  -q, --query <texto>            Consulta em texto\n      --query-vector <csv|json>  Vetor da consulta (recomendado para usar o mesmo espaço do índice)\n  -i, --index <arquivo>          Caminho do índice vetorial (default: busca em KB/*.json)\n  -k, --k <n>                    Quantidade de resultados (default: 5)\n      --area <valor>             Filtro por area\n      --cliente <valor>          Filtro por cliente\n      --tipo <valor>             Filtro por tipo\n      --show-score               Mostra score de similaridade\n      --json                     Saída em JSON\n  -h, --help                     Ajuda\n\nFormato esperado de item no índice (flexível):\n  {\n    path: "...",\n    text|content|snippet: "...",\n    embedding|vector|values: [0.1, ...],\n    metadata|meta: { area, cliente, tipo }\n  }\n`;
}

function safeReadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function resolveDefaultIndex(cwd) {
  const candidates = [
    path.join(cwd, 'KB', 'vector-index.json'),
    path.join(cwd, 'KB', 'kb-vector-index.json'),
    path.join(cwd, 'KB', 'index-vector.json'),
    path.join(cwd, 'KB', 'embeddings.json')
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }

  const kbDir = path.join(cwd, 'KB');
  if (fs.existsSync(kbDir)) {
    const jsonFiles = fs.readdirSync(kbDir).filter((f) => f.toLowerCase().endsWith('.json'));
    if (jsonFiles.length > 0) return path.join(kbDir, jsonFiles[0]);
  }

  throw new Error('Índice vetorial não encontrado. Use --index <arquivo>.');
}

function asArray(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.documents)) return data.documents;
  if (Array.isArray(data.chunks)) return data.chunks;
  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.vectors)) return data.vectors;
  return [];
}

function getEmbedding(item) {
  if (!item || typeof item !== 'object') return null;
  return item.embedding || item.vector || item.values || item.embeddings || null;
}

function getText(item) {
  return item.text || item.content || item.chunk || item.snippet || item.body || '';
}

function getPath(item) {
  return item.path || item.source || item.file || item.filePath || item.document || item.docPath || '(sem caminho)';
}

function getMeta(item) {
  return item.metadata || item.meta || {};
}

function normalize(s) {
  return String(s || '').trim().toLowerCase();
}

function matchesFilter(item, filters) {
  const meta = getMeta(item);
  const area = normalize(meta.area || item.area || meta.segmento || meta.domain);
  const cliente = normalize(meta.cliente || item.cliente || meta.client || meta.customer);
  const tipo = normalize(meta.tipo || item.tipo || meta.type || meta.docType);

  if (filters.area && area !== normalize(filters.area)) return false;
  if (filters.cliente && cliente !== normalize(filters.cliente)) return false;
  if (filters.tipo && tipo !== normalize(filters.tipo)) return false;
  return true;
}

function cosine(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length === 0 || b.length === 0) return -1;
  const n = Math.min(a.length, b.length);
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < n; i += 1) {
    const av = Number(a[i]) || 0;
    const bv = Number(b[i]) || 0;
    dot += av * bv;
    na += av * av;
    nb += bv * bv;
  }
  if (na === 0 || nb === 0) return -1;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

function hashEmbedding(text, dims = 256) {
  const v = new Array(dims).fill(0);
  const t = normalize(text);
  if (!t) return v;

  for (let i = 0; i < t.length; i += 1) {
    const c1 = t.charCodeAt(i);
    const c2 = i + 1 < t.length ? t.charCodeAt(i + 1) : 0;
    const idx = ((c1 * 131) ^ (c2 * 31) ^ (i * 17)) % dims;
    v[Math.abs(idx)] += 1;
  }

  const norm = Math.sqrt(v.reduce((acc, x) => acc + x * x, 0)) || 1;
  return v.map((x) => x / norm);
}

function parseQueryVector(raw) {
  if (!raw) return null;
  const trimmed = String(raw).trim();

  if (trimmed.startsWith('[')) {
    const parsed = JSON.parse(trimmed);
    if (!Array.isArray(parsed)) throw new Error('--query-vector JSON precisa ser um array.');
    return parsed.map(Number);
  }

  if (fs.existsSync(trimmed)) {
    const parsed = safeReadJson(trimmed);
    if (!Array.isArray(parsed)) throw new Error('Arquivo de query-vector precisa conter array JSON.');
    return parsed.map(Number);
  }

  return trimmed.split(',').map((x) => Number(x.trim())).filter((x) => Number.isFinite(x));
}

function shortSnippet(text, max = 220) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 3)}...`;
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(usage());
    process.exit(0);
  }

  const cwd = process.cwd();
  const indexPath = args.indexPath ? path.resolve(cwd, args.indexPath) : resolveDefaultIndex(cwd);
  const rawIndex = safeReadJson(indexPath);
  const items = asArray(rawIndex);

  if (items.length === 0) {
    throw new Error(`Índice vazio ou formato não reconhecido: ${indexPath}`);
  }

  const filtered = items.filter((it) => matchesFilter(it, args));
  if (filtered.length === 0) {
    console.log('Nenhum item encontrado com os filtros informados.');
    process.exit(0);
  }

  let queryVector = null;
  let mode = 'vector';

  if (args.queryVector) {
    queryVector = parseQueryVector(args.queryVector);
  } else if (args.query) {
    const firstEmb = getEmbedding(filtered.find((it) => Array.isArray(getEmbedding(it))));
    if (firstEmb) {
      mode = 'fallback-semantic-lite';
      queryVector = hashEmbedding(args.query, firstEmb.length || 256);
    } else {
      mode = 'text-hash';
      queryVector = hashEmbedding(args.query);
    }
  } else {
    throw new Error('Informe --query ou --query-vector.');
  }

  const scored = filtered.map((it) => {
    const emb = getEmbedding(it) || hashEmbedding(getText(it), queryVector.length || 256);
    return {
      score: cosine(queryVector, emb),
      path: getPath(it),
      snippet: shortSnippet(getText(it)),
      meta: getMeta(it)
    };
  });

  const k = Number.isFinite(args.k) && args.k > 0 ? Math.floor(args.k) : 5;
  const top = scored.sort((a, b) => b.score - a.score).slice(0, k);

  if (args.json) {
    console.log(JSON.stringify({ mode, indexPath, count: top.length, results: top }, null, 2));
    return;
  }

  console.log(`KB Search | mode=${mode} | index=${indexPath} | resultados=${top.length}`);
  console.log('');
  top.forEach((r, i) => {
    console.log(`${i + 1}. ${r.path}`);
    if (args.showScore) console.log(`   score: ${r.score.toFixed(4)}`);
    if (r.meta && Object.keys(r.meta).length) {
      const tags = ['area', 'cliente', 'tipo']
        .filter((k2) => r.meta[k2] !== undefined)
        .map((k2) => `${k2}=${r.meta[k2]}`)
        .join(' | ');
      if (tags) console.log(`   ${tags}`);
    }
    console.log(`   ${r.snippet || '(sem trecho)'}`);
    console.log('');
  });
}

try {
  main();
} catch (err) {
  console.error(`Erro: ${err.message}`);
  console.error('Use --help para ver exemplos.');
  process.exit(1);
}
