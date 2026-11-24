// Loopback-only teaching server. Reads repository resources; modifies only demo Cookie names.
import{createServer}from'node:http';import{readFile,realpath}from'node:fs/promises';import{resolve,extname,sep}from'node:path';import{fileURLToPath}from'node:url';
const root=resolve(fileURLToPath(new URL('../../../../',import.meta.url)));
const types={'.html':'text/html; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.md':'text/plain; charset=utf-8','.svg':'image/svg+xml'};
function send(res,status,value,headers={}){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...headers});res.end(JSON.stringify(value));}
createServer(async(req,res)=>{try{
 const url=new URL(req.url,'http://127.0.0.1');
 if(url.pathname.startsWith('/storage-api/cookies')){
  const action=url.pathname.slice('/storage-api/cookies'.length);
  if((action==='/set'||action==='/clear')&&req.method==='POST'){
   const value=action==='/set'?'demo':'';const age=action==='/set'?600:0;
   send(res,200,{demoOnly:true},{'Set-Cookie':[`stage2_visible=${value}; Path=/; Max-Age=${age}; SameSite=Lax`,`stage2_http=${value}; Path=/; Max-Age=${age}; SameSite=Lax; HttpOnly`]});return;
  }
  if(action===''&&req.method==='GET'){
   const cookies=new Map((req.headers.cookie||'').split(';').map(x=>x.trim().split('=')));
   send(res,200,{receivedVisible:cookies.get('stage2_visible')==='demo',receivedHttpOnly:cookies.get('stage2_http')==='demo',scope:'本机HTTP教学；Secure与真实跨站SameSite未实测'});return;
  }
  send(res,405,{error:'unsupported demo action/method'});return;
 }
 if(!['GET','HEAD'].includes(req.method)){send(res,405,{error:'GET/HEAD only'});return;}
 if(url.pathname==='/favicon.ico'){res.writeHead(204);res.end();return;}
 const decoded=decodeURIComponent(url.pathname);if(decoded.split('/').some(p=>p.startsWith('.'))){send(res,403,{error:'hidden path'});return;}
 const pathname=decoded==='/'?'/learning/2-examples/02-javascript-browser/2.3-browser-storage/2.3.1.localstorage-demo.html':decoded;
 const file=resolve(root,'.'+pathname);const actual=await realpath(file);
 if(!actual.startsWith(root+sep)||actual.slice(root.length).split(sep).some(p=>p.startsWith('.'))||!types[extname(actual)]){send(res,403,{error:'outside supported teaching resources'});return;}
 const body=await readFile(actual);res.writeHead(200,{'Content-Type':types[extname(actual)],'Cache-Control':'no-store'});res.end(req.method==='HEAD'?undefined:body);
}catch(error){send(res,error.code==='ENOENT'?404:400,{error:'教学资源不可用'});}}).listen(Number(process.env.STORAGE_PORT||4193),'127.0.0.1',()=>console.log('Storage/API lab: '+(process.env.STORAGE_PORT||4193)));
