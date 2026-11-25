import { createServer } from 'node:http'
export function startUpstream(port = 4567) {
  const server = createServer((req, res) => {
    const url = new URL(req.url, 'http://127.0.0.1')
    const mode = url.searchParams.get('mode')
    const user =
      req.headers.authorization === 'Bearer fixture-alice'
        ? 'alice'
        : req.headers.authorization === 'Bearer fixture-bob'
          ? 'bob'
          : null
    res.setHeader('content-type', 'application/json')
    res.setHeader('cache-control', 'no-store')
    if (!user || req.headers.cookie || mode === 'denied') {
      res.writeHead(403)
      res.end('{"secret":"do not propagate"}')
      return
    }
    const timer = setTimeout(
      () => {
        if (res.destroyed) return
        if (url.pathname === '/profile') {
          res.end(
            JSON.stringify(
              mode === 'invalid'
                ? { id: 123 }
                : {
                    id: user,
                    name: user === 'alice' ? 'Alice 合成用户' : 'Bob 合成用户',
                    internalSecret: 'fixture-private-' + user,
                  },
            ),
          )
        } else if (url.pathname === '/items') {
          if (mode === 'optional-fail') {
            res.writeHead(503)
            res.end('{"debug":"private stack"}')
          } else
            res.end(
              JSON.stringify([
                { id: 'item-' + user, title: user + ' 的推荐', internalCost: 123 },
              ]),
            )
        } else {
          res.writeHead(404)
          res.end('{}')
        }
      },
      mode === 'timeout' && url.pathname === '/profile' ? 600 : 40,
    )
    res.on('close', () => clearTimeout(timer))
  })
  server.listen(port, '127.0.0.1')
  return server
}
if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  const server = startUpstream()
  console.log('Synthetic upstream http://127.0.0.1:4567')
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close())
}
