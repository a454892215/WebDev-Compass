/**
 * 0.3.7 迷你 REST API（零依赖）
 * 运行: node server.js
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 3787;
const HTML = path.join(__dirname, 'index.html');

/** @type {Map<number, {id:number,name:string,email:string,createdAt:string}>} */
const users = new Map();
let seq = 1;

seed();

function seed() {
  addUser({ name: 'Ada', email: 'ada@example.com' });
  addUser({ name: 'Alan', email: 'alan@example.com' });
}

function addUser({ name, email }) {
  const id = seq++;
  const user = { id, name, email, createdAt: new Date().toISOString() };
  users.set(id, user);
  return user;
}

function send(res, status, body, headers = {}) {
  const payload = body === undefined ? '' : JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    ...headers,
  });
  res.end(payload);
}

function sendError(res, status, code, message, details) {
  send(res, status, { error: { code, message, details } });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) return resolve(null);
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('INVALID_JSON'));
      }
    });
    req.on('error', reject);
  });
}

async function handleApi(req, res, url) {
  if (req.method === 'OPTIONS') {
    return send(res, 204, undefined);
  }

  const matchOne = url.pathname.match(/^\/api\/users\/(\d+)$/);
  const isCollection = url.pathname === '/api/users';

  if (req.method === 'GET' && isCollection) {
    const data = [...users.values()];
    return send(res, 200, { data, meta: { total: data.length } });
  }

  if (req.method === 'GET' && matchOne) {
    const user = users.get(Number(matchOne[1]));
    if (!user) return sendError(res, 404, 'NOT_FOUND', 'user not found');
    return send(res, 200, user);
  }

  if (req.method === 'POST' && isCollection) {
    let body;
    try {
      body = await readBody(req);
    } catch {
      return sendError(res, 400, 'INVALID_JSON', 'body must be JSON');
    }
    if (!body?.name || !body?.email) {
      return sendError(res, 400, 'VALIDATION_ERROR', 'name and email required', [
        { field: 'name/email', issue: 'required' },
      ]);
    }
    const user = addUser(body);
    return send(res, 201, user);
  }

  if (req.method === 'PATCH' && matchOne) {
    const id = Number(matchOne[1]);
    const user = users.get(id);
    if (!user) return sendError(res, 404, 'NOT_FOUND', 'user not found');
    let body;
    try {
      body = await readBody(req);
    } catch {
      return sendError(res, 400, 'INVALID_JSON', 'body must be JSON');
    }
    const next = {
      ...user,
      ...(body?.name != null ? { name: body.name } : {}),
      ...(body?.email != null ? { email: body.email } : {}),
    };
    users.set(id, next);
    return send(res, 200, next);
  }

  if (req.method === 'DELETE' && matchOne) {
    const id = Number(matchOne[1]);
    if (!users.has(id)) return sendError(res, 404, 'NOT_FOUND', 'user not found');
    users.delete(id);
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
    });
    return res.end();
  }

  return sendError(res, 404, 'NOT_FOUND', 'unknown endpoint');
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (url.pathname.startsWith('/api/')) {
    try {
      await handleApi(req, res, url);
    } catch (e) {
      sendError(res, 500, 'INTERNAL', e.message || 'error');
    }
    return;
  }

  if (url.pathname === '/' || url.pathname === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(HTML).pipe(res);
    return;
  }

  res.writeHead(404).end('Not Found');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`REST demo: http://127.0.0.1:${PORT}`);
  console.log('API base:  http://127.0.0.1:' + PORT + '/api/users');
});
