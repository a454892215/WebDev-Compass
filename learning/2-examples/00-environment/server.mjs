// 本地确定性教学资源：仓库静态文件 + HTTP/CORS fixtures，仅 loopback。
import {createServer} from 'node:http';
import {readFile,realpath} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(fileURLToPath(new URL('../../../',import.meta.url)));
const ports=[Number(process.env.STAGE0_PORT||4180),Number(process.env.STAGE0_CROSS_PORT||4181)];
const users=[{id:1,name:'Ada',email:'ada@example.com'},{id:2,name:'Alan',email:'alan@example.com'}];
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.md':'text/plain; charset=utf-8','.svg':'image/svg+xml'};
for(const port of ports){
 createServer(async(req,res)=>{
  function json(status,value,headers={}){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...headers});res.end(JSON.stringify(value));}
  try{
   const url=new URL(req.url,'http://127.0.0.1');
   if(url.pathname.startsWith('/stage0-api/')){
    const cors=url.pathname==='/stage0-api/cors-allowed'?{'Access-Control-Allow-Origin':`http://127.0.0.1:${ports[0]}`}:{ };
    if(req.method==='OPTIONS'){res.writeHead(204,{...cors,'Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'});res.end();return;}
    if(url.pathname==='/stage0-api/cors-allowed'||url.pathname==='/stage0-api/cors-denied'){json(200,{message:'fixture response'},cors);return;}
    if(req.method==='GET'&&url.pathname==='/stage0-api/users'){json(200,users);return;}
    if(req.method==='GET'&&url.pathname==='/stage0-api/users/1'){json(200,users[0]);return;}
    if(req.method==='POST'&&url.pathname==='/stage0-api/posts'){
     let raw='';for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>4096){json(413,{error:'too large'});return;}}
     let body;try{body=JSON.parse(raw)}catch{json(400,{error:'invalid JSON'});return;}
     json(201,{id:101,...body,note:'本地回显，无持久化'});return;
    }
    json(404,{error:'fixture not found'});return;
   }
   if(url.pathname==='/favicon.ico'){res.writeHead(204);res.end();return;}
   const decoded=decodeURIComponent(url.pathname);
   if(decoded.split('/').some(x=>x.startsWith('.'))){res.writeHead(403);res.end();return;}
   const file=resolve(root,'.'+decoded+(decoded.endsWith('/')?'index.html':''));
   if(!file.startsWith(root+sep)||!types[extname(file)]){res.writeHead(403);res.end();return;}
   const actual=await realpath(file);if(!actual.startsWith(root+sep)){res.writeHead(403);res.end();return;}
   const body=await readFile(actual);res.writeHead(200,{'Content-Type':types[extname(file)],'Cache-Control':'no-store'});res.end(body);
  }catch(e){res.writeHead(e.code==='ENOENT'?404:400);res.end('fixture request failed');}
 }).listen(port,'127.0.0.1',()=>console.log(`stage0 fixture http://127.0.0.1:${port}`));
}
