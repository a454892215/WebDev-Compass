import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, sep, extname } from 'node:path'
export function staticServer(root, profile) {
  const base = resolve(root)
  return createServer(async (req, res) => {
    try {
      const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
      const file = resolve(base, '.' + path)
      if (file !== base && !file.startsWith(base + sep)) {
        res.writeHead(403).end()
        return
      }
      let target = file
      try {
        if ((await stat(target)).isDirectory()) target = resolve(target, 'index.html')
      } catch {
        target = ''
      }
      let status = 200
      if (!target || !(await stat(target).catch(() => null))?.isFile()) {
        if (path.startsWith('/api/') || path.startsWith('/_nuxt/') || extname(path)) {
          res.writeHead(404).end('Not found')
          return
        }
        target = resolve(base, profile === 'csr' ? '200.html' : '404.html')
        status = profile === 'csr' ? 200 : 404
      }
      const types = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'text/javascript; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.json': 'application/json',
      }
      res.writeHead(status, {
        'content-type': types[extname(target)] || 'application/octet-stream',
        'cache-control': path.startsWith('/_nuxt/')
          ? 'public, max-age=31536000, immutable'
          : 'no-cache',
      })
      res.end(await readFile(target))
    } catch {
      res.writeHead(400).end('Bad request')
    }
  })
}
if (process.argv[1]?.endsWith('/static-server.mjs')) {
  const profile = process.argv[2] || 'ssg'
  if (!['ssg', 'csr'].includes(profile)) throw new Error('Expected ssg or csr')
  staticServer(`artifacts/${profile}/public`, profile).listen(
    Number(process.env.PORT || 4507),
    '127.0.0.1',
  )
}
