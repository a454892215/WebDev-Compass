import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
export function createLabServer() {
  return createServer(async (req, res) => {
    const path = new URL(req.url, 'http://127.0.0.1').pathname
    const file =
      path === '/app.mjs'
        ? 'app.mjs'
        : path === '/' || path === '/nav/one' || path === '/nav/two'
          ? 'index.html'
          : null
    if (!file) {
      res.writeHead(404)
      res.end('not found')
      return
    }
    try {
      res.setHeader(
        'content-type',
        file.endsWith('mjs')
          ? 'text/javascript; charset=utf-8'
          : 'text/html; charset=utf-8',
      )
      res.setHeader('cache-control', 'no-store')
      res.end(await readFile(new URL(file, import.meta.url)))
    } catch {
      res.writeHead(500)
      res.end('fixture unavailable')
    }
  })
}
if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  const server = createLabServer()
  server.listen(4575, '127.0.0.1')
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close())
}
