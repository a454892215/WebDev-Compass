import { createServer } from 'node:http'
import { readFile, realpath, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
const root = resolve(fileURLToPath(new URL('../../../', import.meta.url)))
const items = [
  { id: 'loop', title: '事件循环', summary: '预测任务与微任务顺序，并观察同步代码先完成。' },
  { id: 'cleanup', title: '生命周期与清理', summary: '取消计时器、监听器、请求、Observer 与 Worker。' },
  { id: 'render', title: '渲染流水线', summary: '区分布局、绘制、合成及真实浏览器测量。' },
  { id: 'cache', title: 'HTTP 缓存', summary: '区分新鲜缓存、条件请求与 Service Worker Cache。' },
  { id: 'draft', title: 'IndexedDB 草稿', summary: '事务提交后才报告保存完成，处理错误和阻塞。' },
  { id: 'history', title: 'URL 与历史', summary: '初始状态、后退和刷新恢复同一查询。' },
  { id: 'observer', title: 'Observer', summary: '观察尺寸、可见性和DOM变动，避免反馈循环。' },
  { id: 'worker', title: 'Worker 统计', summary: '消息传递与终止，不直接访问DOM。' },
]
const mime = { '.html': 'text/html; charset=utf-8', '.mjs': 'text/javascript', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.md': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml' }
function send(res, status, body, type = 'application/json; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' }); res.end(body)
}
createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method)) { send(res, 405, '{"error":"read only"}'); return }
    const url = new URL(req.url, 'http://127.0.0.1')
    if (url.pathname === '/') { res.writeHead(302, { Location: '/learning/4-practice/02-javascript-browser/index.html' }); res.end(); return }
    if (url.pathname === '/favicon.ico') { res.writeHead(204); res.end(); return }
    if (url.pathname === '/stage2-api/items') {
      const respond = () => {
        if (res.destroyed) return
        const mode = url.searchParams.get('mode')
        if (mode === 'error') { send(res, 503, '{"error":"teaching failure"}'); return }
        if (mode === 'invalid') { send(res, 200, '{broken'); return }
        if (mode === 'shape') { send(res, 200, '{"items":[]}'); return }
        const q = (url.searchParams.get('q') || '').slice(0, 80).toLocaleLowerCase()
        send(res, 200, JSON.stringify(items.filter(item => `${item.title} ${item.summary}`.toLocaleLowerCase().includes(q))))
      }
      if (url.searchParams.get('mode') === 'slow') { const timer = setTimeout(respond, 650); res.on('close', () => clearTimeout(timer)) } else respond()
      return
    }
    const pathname = decodeURIComponent(url.pathname)
    if (pathname.split('/').some(x => x.startsWith('.'))) { send(res, 403, '{}'); return }
    let file = resolve(root, '.' + pathname)
    if (!file.startsWith(root + sep)) { send(res, 403, '{}'); return }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html')
    const actual = await realpath(file)
    if (!actual.startsWith(root + sep) || actual.slice(root.length + 1).split(sep).some(x => x.startsWith('.')) || !mime[extname(actual)]) { send(res, 403, '{}'); return }
    send(res, 200, req.method === 'HEAD' ? '' : await readFile(actual), mime[extname(actual)])
  } catch (error) { send(res, error.code === 'ENOENT' ? 404 : 400, '{"error":"resource unavailable"}') }
}).listen(Number(process.env.STAGE2_PORT || 4190), '127.0.0.1', function () { console.log(`Stage 2 http://127.0.0.1:${this.address().port}/`) })
