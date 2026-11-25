import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { basename } from 'node:path'
import { createHash } from 'node:crypto'
const fixture = [
  { id: 'a', title: 'Vue' },
  { id: 'b', title: 'Nuxt' },
  { id: 'c', title: 'Vue' },
  { id: 'd', title: 'API' },
  { id: 'e', title: 'HTTP' },
]
export function createLab() {
  const attempts = new Map(),
    writes = new Map()
  function json(res, status, data, headers = {}) {
    res.writeHead(status, {
      'Content-Type': 'application/json; charset=utf-8',
      ...headers,
    })
    res.end(JSON.stringify(data))
  }
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://127.0.0.1')
      const path = url.pathname
      if (path === '/' || path === '/client.mjs' || path === '/browser.mjs') {
        const file = path === '/' ? 'index.html' : path.slice(1)
        res.writeHead(200, {
          'Content-Type': file.endsWith('html')
            ? 'text/html; charset=utf-8'
            : 'text/javascript; charset=utf-8',
        })
        res.end(await readFile(new URL(file, import.meta.url)))
        return
      }
      if (path === '/openapi.json') {
        json(
          res,
          200,
          JSON.parse(await readFile(new URL('./openapi.json', import.meta.url), 'utf8')),
        )
        return
      }
      if (path === '/api/v1/items') {
        const page = Number(url.searchParams.get('page') || 1),
          size = Number(url.searchParams.get('size') || 2),
          q = url.searchParams.get('q') || '',
          order = url.searchParams.get('order') || 'asc'
        if (
          !Number.isInteger(page) ||
          page < 1 ||
          !Number.isInteger(size) ||
          size < 1 ||
          size > 3 ||
          !['asc', 'desc'].includes(order) ||
          url.searchParams.getAll('q').length > 1
        ) {
          json(res, 400, { error: 'INVALID_QUERY' })
          return
        }
        const found = fixture
          .filter((x) => x.title.toLowerCase().includes(q.toLowerCase()))
          .sort(
            (a, b) =>
              (a.title.localeCompare(b.title, 'en') || a.id.localeCompare(b.id, 'en')) *
              (order === 'asc' ? 1 : -1),
          )
        const delay = Math.min(
          Math.max(Number(url.searchParams.get('delay')) || 0, 0),
          250,
        )
        await new Promise((resolve) => setTimeout(resolve, delay))
        json(res, 200, {
          items: found.slice((page - 1) * size, page * size),
          total: found.length,
        })
        return
      }
      if (path === '/api/bad-json') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end('{broken')
        return
      }
      if (path === '/api/wrong-schema') {
        json(res, 200, { items: [{ id: 42, title: 'bad' }], total: 1 })
        return
      }
      if (path === '/api/no-content') {
        res.writeHead(204)
        res.end()
        return
      }
      if (path === '/api/html') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end('<p>not JSON</p>')
        return
      }
      if (path === '/api/retry') {
        const key = url.searchParams.get('case') || 'default'
        const count = (attempts.get(key) || 0) + 1
        attempts.set(key, count)
        json(res, count < 2 ? 429 : 200, { attempt: count }, { 'Retry-After': '0' })
        return
      }
      if (path === '/api/retry-cap') {
        const count = (attempts.get('cap') || 0) + 1
        attempts.set('cap', count)
        json(res, 503, { attempt: count }, { 'Retry-After': '0' })
        return
      }
      if (path === '/api/always-busy') {
        json(res, 503, { error: 'BUSY' }, { 'Retry-After': '120' })
        return
      }
      if (path === '/api/forbidden') {
        json(res, 403, { error: 'DENIED' })
        return
      }
      if (path === '/api/download') {
        res.writeHead(200, {
          'Content-Type': 'text/plain; charset=utf-8',
          'Content-Disposition': 'attachment; filename="sample.txt"',
        })
        res.end('Public teaching download\n')
        return
      }
      if (path === '/api/upload' && req.method === 'POST') {
        const chunks = []
        let bytes = 0
        for await (const chunk of req) {
          bytes += chunk.length
          if (bytes > 4096) {
            json(res, 413, { error: 'MULTIPART_TOO_LARGE' })
            return
          }
          chunks.push(chunk)
        }
        const type = req.headers['content-type'] || ''
        if (!type.startsWith('multipart/form-data;') || !type.includes('boundary=')) {
          json(res, 400, { error: 'BOUNDARY_REQUIRED' })
          return
        }
        let form
        try {
          form = await new Request('http://127.0.0.1/api/upload', {
            method: 'POST',
            headers: { 'content-type': type },
            body: Buffer.concat(chunks),
          }).formData()
        } catch {
          json(res, 400, { error: 'INVALID_MULTIPART' })
          return
        }
        const file = form.get('file')
        if (!(file instanceof File) || form.getAll('file').length !== 1) {
          json(res, 400, { error: 'ONE_FILE_REQUIRED' })
          return
        }
        if (file.size > 1024) {
          json(res, 413, { error: 'FILE_TOO_LARGE' })
          return
        }
        const data = Buffer.from(await file.arrayBuffer())
        // Only a deliberately narrow text fixture is accepted; no files are persisted or executed.
        if (
          file.type !== 'text/plain' ||
          !file.name.endsWith('.txt') ||
          file.name !== basename(file.name) ||
          data.includes(0)
        ) {
          json(res, 415, { error: 'TEXT_FIXTURE_ONLY' })
          return
        }
        try {
          new TextDecoder('utf-8', { fatal: true }).decode(data)
        } catch {
          json(res, 415, { error: 'INVALID_UTF8' })
          return
        }
        json(res, 201, { name: file.name, bytes: file.size, stored: false })
        return
      }
      if (path === '/api/create' && req.method === 'POST') {
        let body = ''
        for await (const chunk of req) {
          body += chunk
          if (body.length > 1024) {
            json(res, 413, { error: 'TOO_LARGE' })
            return
          }
        }
        const key = req.headers['idempotency-key']
        if (typeof key !== 'string' || !/^[-\w]{1,64}$/.test(key)) {
          json(res, 400, { error: 'KEY_REQUIRED' })
          return
        }
        const hash = createHash('sha256').update(body).digest('hex'),
          existing = writes.get(key)
        if (existing && existing.hash !== hash) {
          json(res, 409, { error: 'KEY_REUSED_WITH_DIFFERENT_BODY' })
          return
        }
        if (existing) {
          json(res, 200, existing.result)
          return
        }
        const result = { id: `write-${writes.size + 1}`, accepted: true }
        writes.set(key, { hash, result })
        json(res, 201, result)
        return
      }
      json(res, 404, { error: 'NOT_FOUND' })
    } catch {
      if (!res.headersSent) json(res, 500, { error: 'LAB_FAILURE' })
      else res.end()
    }
  })
  return server
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = createLab()
  server.listen(4401, '127.0.0.1', () => console.log('HTTP lab http://127.0.0.1:4401'))
  const stop = () => {
    server.close()
    server.closeAllConnections()
  }
  process.on('SIGTERM', stop)
  process.on('SIGINT', stop)
}
