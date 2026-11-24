// 从仓库根目录运行：node docs/audits/check-js-teaching-service.mjs
// 可选浏览器专项：PLAYWRIGHT_MODULE=/absolute/path/playwright-core/index.mjs ...同上
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,writeFile,symlink,unlink,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=fileURLToPath(new URL('../../',import.meta.url));
const temporary=await mkdtemp(resolve(tmpdir(),'webdev-js-audit-'));
const assetDir=resolve(root,'learning/2-examples/01-web-fundamentals/1.3-javascript/assets');
const outsideLink=resolve(assetDir,`audit-outside-${process.pid}.txt`);
const hiddenLink=resolve(assetDir,`audit-hidden-${process.pid}.json`);
const service=spawn(process.execPath,[resolve(root,'learning/2-examples/01-web-fundamentals/1.3-javascript/server.mjs')],{env:{...process.env,PORT:'0'},stdio:['ignore','pipe','pipe']});
const report={date:new Date().toISOString(),http:[],browser:[],scope:'Loopback teaching-service HTTP regression; optional headless Chrome affected XHR behavior; not production/security certification or real device.'};
let browser;
try{
 const base=await new Promise((ok,fail)=>{
  let output='';const timer=setTimeout(()=>fail(new Error('Teaching service did not start within 5s')),5000);
  service.once('error',e=>{clearTimeout(timer);fail(e)});
  service.once('exit',code=>{clearTimeout(timer);fail(new Error('Teaching service exited '+code))});
  service.stdout.on('data',chunk=>{output+=chunk;const match=output.match(/http:\/\/127\.0\.0\.1:\d+/);if(match){clearTimeout(timer);ok(match[0])}});
 });
 await writeFile(resolve(temporary,'sentinel.txt'),'outside sentinel');
 await symlink(resolve(temporary,'sentinel.txt'),outsideLink);await symlink(resolve(root,'.git/config'),hiddenLink);
 const prefix='/learning/2-examples/01-web-fundamentals/1.3-javascript/';
 for(const [path,status,name] of [[prefix+'1.3.5.3.fetch-api-demo.html',200,'normal static'],[prefix+`assets/audit-outside-${process.pid}.txt`,403,'outside symlink'],[prefix+`assets/audit-hidden-${process.pid}.json`,403,'hidden-target symlink'],['/.git/config',403,'hidden URL']]){
  assert.equal((await fetch(base+path)).status,status);report.http.push({name,status,result:'passed'});
 }
 for(const [body,status,name] of [[JSON.stringify({title:'演示'}),200,'POST success'],['{',400,'invalid JSON'],[JSON.stringify({title:''}),422,'invalid title']]){
  assert.equal((await fetch(base+'/api/js-echo',{method:'POST',headers:{'Content-Type':'application/json'},body})).status,status);report.http.push({name,status,result:'passed'});
 }
 assert.equal((await fetch(base+'/api/js-echo')).status,405);report.http.push({name:'wrong method',status:405,result:'passed'});
 if(process.env.PLAYWRIGHT_MODULE){
  const {chromium}=await import(pathToFileURL(resolve(process.env.PLAYWRIGHT_MODULE)).href);
  browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+prefix+'1.3.5.2.xmlhttprequest-demo.html');await page.locator('#run').click();
  await page.waitForFunction(()=>document.querySelector('#output').textContent.includes('XHR用户: Ada'));
  report.browser.push({name:'XHR normal response and parse',result:'passed'});
  await page.route('**/fixtures/users.json',r=>r.fulfill({status:404,contentType:'text/plain',body:'missing'}));
  await page.locator('#run').click();await page.waitForFunction(()=>document.querySelector('#output').textContent.includes('HTTP 404'));
  assert.ok(!(await page.locator('#output').textContent()).includes('SyntaxError'));assert.deepEqual(errors,[]);
  report.browser.push({name:'XHR HTTP failure checked before JSON; expected error caught',result:'passed'});
  await page.unroute('**/fixtures/users.json');await page.goto(base+prefix+'1.3.1.1.var-demo.html');
  const note=await page.locator('a').evaluateAll(es=>es.map(e=>e.href).find(x=>x.includes('/1-notes/')));
  assert.ok(note&&!note.includes('/learning/learning/'));assert.equal((await page.request.get(note)).status(),200);
  report.browser.push({name:'canonical theory back-link loads',result:'passed'});
 }
 report.result='passed';
}catch(error){report.result='failed';report.error=error.message;process.exitCode=1}
finally{
 await browser?.close();service.kill('SIGTERM');
 await Promise.all([unlink(outsideLink).catch(()=>{}),unlink(hiddenLink).catch(()=>{})]);await rm(temporary,{recursive:true,force:true});
 await writeFile(resolve(root,'docs/audits/stage-1-js-quality-runtime.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify(report,null,2));
}
