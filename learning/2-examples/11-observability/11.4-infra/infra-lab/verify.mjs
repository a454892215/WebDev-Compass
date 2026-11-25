import {createServer} from 'node:http'
import {spawn,spawnSync} from 'node:child_process'
import {mkdtemp,writeFile,rm} from 'node:fs/promises'
import {tmpdir} from 'node:os'
import {join} from 'node:path'
import assert from 'node:assert/strict'
const binary=process.env.NGINX_BIN || 'nginx'
const dir=await mkdtemp(join(tmpdir(),'stage11-infra-'))
const servers=[]
let nginx
try {
 for(const [port,id] of [[4537,'origin-a'],[4538,'origin-b']]){
  const server=createServer((req,res)=>{
   const privateRequest=!!(req.headers.cookie || req.headers.authorization)
   res.setHeader('content-type','application/json')
   res.setHeader('cache-control',privateRequest?'private, no-store':'public, max-age=30')
   res.end(JSON.stringify({origin:id,private:privateRequest}))
  })
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(port,'127.0.0.1',resolve)})
  servers.push(server)
 }
 const conf=[
 'pid '+dir+'/nginx.pid;',
 'error_log '+dir+'/error.log warn;',
 'worker_processes 1;',
 'events {worker_connections 128;}',
 'http {',
 'access_log off;',
 'proxy_temp_path '+dir+'/proxy;',
 'proxy_cache_path '+dir+'/cache levels=1:2 keys_zone=demo:1m max_size=5m inactive=1m;',
 'map "$http_cookie|$http_authorization" $credential { default 1; "|" 0; }',
 'limit_req_zone $binary_remote_addr zone=rate:1m rate=1r/s;',
 'upstream demo {server 127.0.0.1:4537;server 127.0.0.1:4538;}',
 'server {',
 'listen 127.0.0.1:4535;',
 'location /public {',
 'proxy_pass http://127.0.0.1:4537;',
 'proxy_cache demo;',
 'proxy_cache_valid 200 30s;',
 'proxy_cache_key "$scheme|$proxy_host|$request_uri";',
 'proxy_cache_bypass $credential;',
 'proxy_no_cache $credential;',
 'add_header X-Demo-Cache $upstream_cache_status always;',
 '}',
 'location /balance {proxy_pass http://demo;proxy_cache off;}',
 'location /rate {limit_req zone=rate burst=1 nodelay;limit_req_status 429;proxy_pass http://127.0.0.1:4537;}',
 '}}',
 ].join('\n')
 const path=join(dir,'nginx.conf')
 await writeFile(path,conf)
 const check=spawnSync(binary,['-t','-p',dir+'/', '-c',path],{encoding:'utf8'})
 assert.equal(check.status,0,check.stderr)
 nginx=spawn(binary,['-p',dir+'/', '-c',path,'-g','daemon off;'],{stdio:'ignore'})
 const origin='http://127.0.0.1:4535'
 let ready=false
 for(let i=0;i<60;i++){try {await fetch(origin+'/balance');ready=true;break}catch{await new Promise(r=>setTimeout(r,50))}}
 assert.ok(ready,'Nginx did not start')
 const miss=await fetch(origin+'/public?revision=r1');await miss.text()
 const hit=await fetch(origin+'/public?revision=r1');await hit.text()
 assert.equal(miss.headers.get('x-demo-cache'),'MISS')
 assert.equal(hit.headers.get('x-demo-cache'),'HIT')
 for(const headers of [{cookie:'session=fixture'},{authorization:'Bearer fixture'}]){
  const response=await fetch(origin+'/public?revision=r1',{headers})
  assert.equal(response.headers.get('x-demo-cache'),'BYPASS')
  assert.equal((await response.json()).private,true)
 }
 const clean=await fetch(origin+'/public?revision=r1')
 assert.equal(clean.headers.get('x-demo-cache'),'HIT');assert.equal((await clean.json()).private,false)
 const revision=await fetch(origin+'/public?revision=r2')
 assert.equal(revision.headers.get('x-demo-cache'),'MISS');await revision.text()
 const origins=new Set()
 for(let i=0;i<6;i++)origins.add((await (await fetch(origin+'/balance')).json()).origin)
 assert.equal(origins.size,2)
 const status=await Promise.all(Array.from({length:8},async()=>{const r=await fetch(origin+'/rate');await r.text();return r.status}))
 assert.ok(status.includes(200)&&status.includes(429),JSON.stringify(status))
 const version=spawnSync(binary,['-v'],{encoding:'utf8'});assert.equal(version.status,0,version.error?.message)
 console.log(JSON.stringify({nginxVersion:(version.stderr || version.stdout).trim(),syntax:true,cache:{miss:'MISS',hit:'HIT',credentials:'BYPASS',afterCredentials:'HIT/nonprivate',revision:'MISS'},loadBalance:[...origins],rateStatuses:status,limits:['local proxy is not real CDN/Purge/Geo/WAF','not Docker/Kubernetes/GitHub Actions execution']},null,2))
} finally {
 if(nginx && nginx.exitCode===null){const closed=new Promise(resolve=>nginx.once('exit',resolve));nginx.kill('SIGTERM');await closed}
 for(const server of servers) await new Promise(resolve=>server.close(resolve))
 await rm(dir,{recursive:true,force:true})
}
