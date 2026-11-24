// Zero-dependency teaching fixture: local resources, controlled delays and HTTP cache.
import {createServer} from 'node:http';
import {readFile,realpath} from 'node:fs/promises';
import {resolve,sep,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(fileURLToPath(new URL('../../../../',import.meta.url)));
const port=Number(process.env.BROWSER_LAB_PORT||4192);
const counters=new Map();
const types={'.html':'text/html; charset=utf-8','.md':'text/plain; charset=utf-8','.mjs':'text/javascript','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json'};
function send(res,status,body,headers={}){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...headers});res.end(body)}
createServer(async(req,res)=>{
 try{
  if(!['GET','HEAD'].includes(req.method))return send(res,405,'{"error":"GET/HEAD only"}');
  const url=new URL(req.url,'http://127.0.0.1');
  if(url.pathname==='/favicon.ico')return send(res,204,'');
  if(url.pathname==='/browser-fixture/cache'||url.pathname==='/browser-fixture/cache-stats'){
   const mode=url.searchParams.get('mode');const key=(url.searchParams.get('key')||'demo').slice(0,100);const id=mode+':'+key;
   if(url.pathname.endsWith('cache-stats'))return send(res,200,JSON.stringify({statuses:counters.get(id)||[]}));
   if(!['fresh','validate'].includes(mode))return send(res,400,'{"error":"unknown mode"}');
   const etag='"stage2-v1"';const status=mode==='validate'&&req.headers['if-none-match']===etag?304:200;
   const counts=counters.get(id)||[];counts.push(status);counters.set(id,counts);if(counters.size>1000)counters.delete(counters.keys().next().value);
   const headers={'Cache-Control':mode==='fresh'?'private, max-age=60':'private, no-cache','ETag':etag,'Last-Modified':'Mon, 23 Nov 2026 00:00:00 GMT'};
   return send(res,status,status===304?'':JSON.stringify({mode,version:1,request:counts.length}),headers);
  }
  let decoded=decodeURIComponent(url.pathname);if(decoded==='/')decoded='/learning/2-examples/02-javascript-browser/2.2-browser-internals/2.2.1.gpu-demo.html';
  if(decoded.split('/').some(x=>x.startsWith('.')))return send(res,403,'{"error":"hidden path"}');
  const file=resolve(root,'.'+decoded);if(!file.startsWith(root+sep)||!types[extname(file)])return send(res,403,'{"error":"outside allowed resources"}');
  const actual=await realpath(file);if(!actual.startsWith(root+sep)||actual.slice(root.length).split(sep).some(x=>x.startsWith('.')))return send(res,403,'{"error":"outside allowed resources"}');
  const body=req.method==='HEAD'?'':await readFile(actual);
  const delay=Math.min(400,Math.max(0,Number(url.searchParams.get('delay'))||0));
  if(delay)setTimeout(()=>{if(!res.destroyed)send(res,200,body,{'Content-Type':types[extname(file)]})},delay);
  else send(res,200,body,{'Content-Type':types[extname(file)]});
 }catch(error){send(res,error.code==='ENOENT'?404:400,'{"error":"resource unavailable"}')}
}).listen(port,'127.0.0.1',()=>console.log(`Browser lab http://127.0.0.1:${port}/`));
