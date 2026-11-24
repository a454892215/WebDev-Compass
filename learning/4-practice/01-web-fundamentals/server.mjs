// Local teaching fixture. No dependencies, database, accounts or write API.
import http from 'node:http'
import { readFile, realpath, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
const root = resolve(fileURLToPath(new URL('../../../', import.meta.url)))
const port = Number(process.env.STAGE1_PORT || 4174)
const resources = [
 {id:'semantic',category:'html',title:'语义与表单',description:'为内容选择原生标签，并验证标签、焦点和提交。'},
 {id:'media',category:'html',title:'媒体与原生控件',description:'为图片、图形、对话框和媒体提供可理解的替代。'},
 {id:'layout',category:'css',title:'布局与尺寸',description:'用 Flex/Grid、内在尺寸和宽窄视口检查布局。'},
 {id:'cascade',category:'css',title:'层叠与主题',description:'分析规则来源、特异性和变量，避免盲目增加权重。'},
 {id:'events',category:'js',title:'事件与 DOM',description:'使用事件委托和安全的文本输出实现收藏。'},
 {id:'requests',category:'js',title:'请求与失败恢复',description:'区分 HTTP 错误、JSON 解析、取消及迟到响应。'},
]
const types = {'.html':'text/html; charset=utf-8','.md':'text/plain; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.wav':'audio/wav','.woff2':'font/woff2'}
function send(res,status,body,type='application/json; charset=utf-8') {res.writeHead(status,{'Content-Type':type,'Cache-Control':'no-store'});res.end(body)}
const server=http.createServer(async(req,res)=>{
 try {
  if (!['GET','HEAD'].includes(req.method)) return send(res,405,'{"error":"GET/HEAD only"}')
  const url=new URL(req.url,'http://127.0.0.1')
  if(url.pathname==='/practice-api/resources') {
   const mode=url.searchParams.get('mode')||'ok'
   const respond=()=>{
    if(res.destroyed)return
    if(mode==='error')return send(res,503,'{"error":"teaching fixture"}')
    if(mode==='invalid')return send(res,200,'not valid JSON')
    const query=(url.searchParams.get('q')||'').slice(0,80).toLocaleLowerCase()
    const category=url.searchParams.get('category')||'all'
    const data=mode==='empty'?[]:resources.filter(x=>(category==='all'||x.category===category)&&`${x.title} ${x.description}`.toLocaleLowerCase().includes(query))
    send(res,200,JSON.stringify(data))
   }
   if(mode==='slow'){const timer=setTimeout(respond,800);res.on('close',()=>clearTimeout(timer))}else respond()
   return
  }
  let pathname=decodeURIComponent(url.pathname)
  if(pathname==='/favicon.ico')return send(res,204,'')
  if(pathname==='/')pathname='/learning/4-practice/01-web-fundamentals/index.html'
  if(pathname.split('/').some(part=>part.startsWith('.')))return send(res,403,'{"error":"hidden path"}')
  let file=resolve(root,'.'+pathname)
  if(!file.startsWith(root+sep))return send(res,403,'{"error":"outside root"}')
  if((await stat(file)).isDirectory())file=resolve(file,'index.html')
  const actual=await realpath(file)
  if(!actual.startsWith(root+sep))return send(res,403,'{"error":"outside root"}')
  send(res,200,await readFile(actual),types[extname(actual)]||'application/octet-stream')
 } catch(error) {send(res,error.code==='ENOENT'?404:400,JSON.stringify({error:'Resource unavailable'}))}
})
server.listen(port,'127.0.0.1',()=>console.log(`Stage 1: http://127.0.0.1:${port}/`))
