import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE?pathToFileURL(resolve(process.env.PLAYWRIGHT_MODULE)).href:'playwright-core');
const base=process.env.BROWSER_LAB_URL||'http://127.0.0.1:4192/';
const path='learning/2-examples/02-javascript-browser/2.2-browser-internals/';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const report={date:new Date().toISOString(),browser:browser.version(),checks:[],http:[],scope:'Headless Chrome 390/1440 viewports and local HTTP/SW mechanics; not PID enumeration, GPU profiling, production performance or real devices.'};
const files=['2.2.1.gpu','2.2.2.item-2-2-2','2.2.3.reflow-repaint','2.2.4.critical-rendering-path','2.2.5.will-change','2.2.6.async','2.2.7.link-rel-preload','2.2.8.item-2-2-8','2.2.9.service-worker-pwa'];
async function output(page){return JSON.parse(await page.locator('#output').innerText())}
try{
 for(const width of [390,1440]){
  const context=await browser.newContext({viewport:{width,height:900}});
  for(const file of files){
   const id=file.match(/^2\.2\.\d+/)[0];const page=await context.newPage();page.setDefaultTimeout(6500);const errors=[];page.on('pageerror',e=>errors.push(e.message));
   try{
    const response=await page.goto(new URL(path+file+'-demo.html',base).href,{waitUntil:'load'});assert.equal(response.status(),200);
    if(id==='2.2.1'){await page.locator('#run').click();const r=await output(page);assert.equal(r.pidEnumeration,false);assert.ok(r.logicalProcessorHint>=1)}
    if(id==='2.2.2'){await page.locator('#run').click();assert.equal((await output(page)).width,260);await page.locator('#hide').click();const r=await output(page);assert.equal(r.width,0);assert.equal(r.nodePresent,true)}
    if(id==='2.2.3'){for(const selector of ['#interleaved','#run']){await page.locator(selector).click();const r=await output(page);assert.equal(r.count,20);assert.equal(r.firstWidth,101);assert.equal(r.layoutCount,'not measured')}}
    if(id==='2.2.4'){await page.locator('#run').click();const r=await output(page);assert.equal(r.baseline.scriptReady,true);assert.equal(r.optimized.scriptReady,true);assert.ok(r.baseline.resources.some(x=>x.name.endsWith('slow.css')));assert.ok(!r.optimized.resources.some(x=>x.name.endsWith('slow.css')));assert.ok(r.baseline.domContentLoadedMs>0)}
    if(id==='2.2.5'){await page.locator('#prepare').click();assert.equal((await output(page)).willChange,'transform');await page.locator('#run').click();await page.waitForFunction(()=>JSON.parse(document.querySelector('#output').textContent).willChange==='auto');assert.ok((await output(page)).transform.includes('40'));await page.locator('#run').click();await page.waitForFunction(()=>JSON.parse(document.querySelector('#output').textContent).transform==='matrix(1, 0, 0, 1, 0, 0)')}
    if(id==='2.2.6'){await page.locator('#run').click();const r=await output(page);assert.deepEqual(r.defer,['parse-tail','A','B','DCL']);assert.ok(r.async.indexOf('B')<r.async.indexOf('A'));assert.ok(r.async.includes('DCL'))}
    if(id==='2.2.7'){await page.locator('#run').click();const r=await output(page);assert.equal(r.imageLoaded,true);assert.ok(r.resources.some(x=>x.name.endsWith('hint.svg')));assert.equal(r.prefetchGuaranteed,false)}
    if(id==='2.2.8'){await page.locator('#run').click();await page.waitForFunction(()=>{try{return 'validate'in JSON.parse(document.querySelector('#output').textContent)}catch{return false}});const r=await output(page);assert.deepEqual(r.fresh.serverStatuses,[200]);assert.deepEqual(r.validate.serverStatuses,[200,304]);assert.deepEqual(r.validate.responses.map(x=>x.scriptStatus),[200,200]);report.cacheObservation=r}
    if(id==='2.2.9'){
     await page.locator('#register').click();await page.waitForFunction(()=>{try{return JSON.parse(document.querySelector('#output').textContent).controlled===true}catch{return false}});
     const r=await output(page);assert.ok(r.scope.endsWith('/2.2-browser-internals/'));
     await page.locator('#run').click();await page.waitForFunction(()=>{try{return JSON.parse(document.querySelector('#output').textContent).source==='network'}catch{return false}});
     await context.setOffline(true);await page.locator('#run').click();await page.waitForFunction(()=>{try{return JSON.parse(document.querySelector('#output').textContent).source==='cache'}catch{return false}});assert.equal((await output(page)).body.version,1);
     await context.setOffline(false);await page.locator('#clear').click();await page.waitForFunction(()=>{try{return JSON.parse(document.querySelector('#output').textContent).cleaned===true}catch{return false}});assert.equal((await output(page)).cacheRemoved,true);
    }
    assert.deepEqual(errors,[]);assert.equal(await page.locator('main').count(),1);assert.equal(await page.locator('h1').count(),1);assert.ok(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)));
    report.checks.push({id,width,status:'passed'});
   }catch(error){report.checks.push({id,width,status:'failed',message:error.message});console.log('FAIL',id,width,error.message)}finally{await context.setOffline(false);await page.close()}
  }
  await context.close();
 }
 for(const [name,url,headers,status] of [['conditional cache 304','/browser-fixture/cache?mode=validate&key=node-http',{'If-None-Match':'"stage2-v1"'},304],['missing resource','/no-such-resource.html',{},404],['hidden resource','/.git/config',{},403]]){
  const response=await fetch(new URL(url,base),{headers});assert.equal(response.status,status);if(status===304)assert.equal(await response.text(),'');report.http.push({name,status,result:'passed'});
 }
 report.status=report.checks.some(x=>x.status!=='passed')?'failed':'passed';console.log(JSON.stringify({status:report.status,checks:report.checks.length,http:report.http.length}));
}finally{
 await browser.close();await writeFile(fileURLToPath(new URL('../../../../docs/audits/stage-2-browser-runtime.json',import.meta.url)),JSON.stringify(report,null,2)+'\n');
}
if(report.status!=='passed')process.exitCode=1;
