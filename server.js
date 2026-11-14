// Production server for Hostinger Node.js web app: serves the built site from dist/ and runs Unified Hive Bot at /api/chat.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import chat from './api/chat.js';

const DIST = join(fileURLToPath(new URL('.', import.meta.url)), 'dist');
const PORT = process.env.PORT || 3000;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp4': 'video/mp4' };

function wrap(res) {
  res.status = (c) => { res.statusCode = c; return res; };
  res.json = (b) => { if (!res.getHeader('Content-Type')) res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(b)); return res; };
  return res;
}

async function readBody(req, limit = 64 * 1024) {
  let size = 0; const chunks = [];
  for await (const c of req) { size += c.length; if (size > limit) throw new Error('too_large'); chunks.push(c); }
  const raw = Buffer.concat(chunks).toString('utf8');
  try { return JSON.parse(raw || '{}'); } catch { return {}; }
}

async function sendFile(res, file, status = 200) {
  const data = await readFile(file);
  const ext = extname(file);
  res.writeHead(status, {
    'Content-Type': TYPES[ext] || 'application/octet-stream',
    'Cache-Control': file.includes(`${'/'}assets${'/'}`) ? 'public, max-age=31536000, immutable' : 'no-cache',
    'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'X-Frame-Options': 'SAMEORIGIN',
  });
  res.end(data);
}

http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/api/chat') {
      if (req.method === 'POST') req.body = await readBody(req);
      return await chat(req, wrap(res));
    }
    const safe = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
    for (const candidate of [join(DIST, safe), join(DIST, safe, 'index.html')]) {
      if (!candidate.startsWith(DIST)) break;
      try { if ((await stat(candidate)).isFile()) return await sendFile(res, candidate); } catch {}
    }
    if (extname(safe)) { res.writeHead(404); return res.end('Not found'); }
    return await sendFile(res, join(DIST, 'index.html'));
  } catch (e) {
    if (!res.headersSent) { res.writeHead(e.message === 'too_large' ? 413 : 500); }
    res.end();
  }
}).listen(PORT, () => console.log(`Unified Hive site on :${PORT}`));
