// Optional external QA tool; no Playwright dependency is added to the lesson.
import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const modulePath=process.env.PLAYWRIGHT_MODULE;
const {chromium}=await import(modulePath?pathToFileURL(resolve(modulePath)).href:'playwright-core');
const cases=JSON.parse(await readFile(new URL('./qa-cases.json',import.meta.url),'utf8')).cases;
const base=process.env.EXAMPLES_BASE_URL||'http://127.0.0.1:4195/';
const report={date:new Date().toISOString(),scope:'Headless Chrome 390/1440 viewport experiments. No real-device, mobile-runtime or GC timing certification.',checks:[]};
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
report.browser=browser.version();
try{
 for(const width of [390,1440]){
  const context=await browser.newContext({viewport:{width,height:900}});
  for(const entry of cases){
   const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
   try{
    const response=await page.goto(new URL('learning/2-examples/02-javascript-browser/2.1-js-advanced/'+entry.file,base).href);
    assert.equal(response.status(),200);
    const structure=await page.evaluate(()=>({lang:document.documentElement.lang,h1:document.querySelectorAll('h1').length,main:document.querySelectorAll('main').length,overflow:document.documentElement.scrollWidth>innerWidth+1}));
    assert.ok(structure.lang);assert.equal(structure.h1,1);assert.equal(structure.main,1);assert.equal(structure.overflow,false);
    await page.locator('#run').click();await page.waitForFunction(()=>document.querySelector('#output').dataset.state);
    assert.equal(await page.locator('#output').getAttribute('data-state'),'success');
    const actual=JSON.parse(await page.locator('#output').textContent());
    for(const [key,value] of Object.entries(entry.expected))assert.deepEqual(actual[key],value,`${entry.id}: ${key}`);
    if(['2.1.8','2.1.10'].includes(entry.id)){
      await page.locator('#output').evaluate(el=>delete el.dataset.state);
      await page.locator('#run').click();await page.waitForFunction(()=>document.querySelector('#output').dataset.state);
      const again=JSON.parse(await page.locator('#output').textContent());
      for(const [key,value] of Object.entries(entry.expected))assert.deepEqual(again[key],value,`${entry.id} repeat: ${key}`);
    }
    assert.deepEqual(errors,[]);assert.equal(await page.locator('body').getAttribute('data-error'),'false');
    report.checks.push({id:entry.id,width,status:'passed',observed:actual});
   }catch(error){report.checks.push({id:entry.id,width,status:'failed',message:error.message});console.log('FAIL',entry.id,width,error.message)}
   finally{await page.close()}
  }
  await context.close();
 }
}finally{await browser.close()}
report.status=report.checks.some(x=>x.status==='failed')?'failed':'passed';
await writeFile(process.env.REPORT_PATH||fileURLToPath(new URL('../../../../docs/audits/stage-2-js-runtime.json',import.meta.url)),JSON.stringify(report,null,2)+'\n');
console.log(`JavaScript advanced: ${report.checks.filter(x=>x.status==='passed').length}/${report.checks.length}, ${report.status}`);
if(report.status!=='passed')process.exitCode=1;
