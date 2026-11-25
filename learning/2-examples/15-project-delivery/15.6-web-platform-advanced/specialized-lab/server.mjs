import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
const files = new Map([
  ['/', 'index.html'],
  ['/isolated', 'index.html'],
  ['/app.mjs', 'app.mjs'],
  ['/catalog.mjs', 'catalog.mjs'],
  ['/worker.mjs', 'worker.mjs'],
])
export function start(port = 4576) {
  const server = createServer(async (req, res) => {
    const path = new URL(req.url, 'http://localhost').pathname
    const file = files.get(path)
    if (!file) {
      res.writeHead(404)
      res.end('not found')
      return
    }
    if (path === '/isolated' || path === '/worker.mjs') {
      res.setHeader('cross-origin-opener-policy', 'same-origin')
      res.setHeader('cross-origin-embedder-policy', 'require-corp')
    }
    res.setHeader(
      'content-type',
      file.endsWith('.html')
        ? 'text/html; charset=utf-8'
        : 'text/javascript; charset=utf-8',
    )
    res.setHeader('cache-control', 'no-store')
    res.setHeader('x-content-type-options', 'nosniff')
    try {
      res.end(await readFile(new URL(file, import.meta.url)))
    } catch {
      res.writeHead(500)
      res.end('local fixture failed')
    }
  })
  server.listen(port, '127.0.0.1')
  return server
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = start()
  console.log('Local lab http://localhost:4576')
  for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => server.close())
}
