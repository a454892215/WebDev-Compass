// Targeted check for 1.2.5.5's real, equal-distance movement paths.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(resolve(process.env.PLAYWRIGHT_MODULE)).href : 'playwright-core');
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const base=process.env.EXAMPLES_BASE_URL||'http://127.0.0.1:4186/';
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const report={date:new Date().toISOString(),browser:browser.version(),scope:'Targeted simulated viewport movement and reduced-motion checks; not FPS benchmark or real-device test.',checks:[]};
try{
 for(const width of [390,1440]){
  for(const reducedMotion of ['no-preference','reduce']){
   const p=await browser.newPage({viewport:{width,height:900},reducedMotion});
   const errors=[];p.on('pageerror',e=>errors.push(e.message));
   await p.goto(new URL('learning/2-examples/01-web-fundamentals/1.2-css/1.2.5.5.transform-demo.html',base).href);
   for(const mode of ['left','transform']){
    if(mode==='transform'){await p.locator('#toggle').click();await p.waitForTimeout(240)}
    const start=await p.locator('#target').boundingBox();
    await p.locator('#move').click();await p.waitForTimeout(240);
    const end=await p.locator('#target').boundingBox();
    assert.ok(Math.abs(start.x-end.x-40)<.5,`${mode}: expected -40px movement`);
    assert.ok((await p.locator('#motion-state').innerText()).includes(mode));
    await p.locator('#move').click();await p.waitForTimeout(240);
    const restored=await p.locator('#target').boundingBox();assert.ok(Math.abs(start.x-restored.x)<.5);
    const computed=await p.locator('#target').evaluate(e=>({left:getComputedStyle(e).left,transform:getComputedStyle(e).transform,duration:getComputedStyle(e).transitionDuration}));
    if(mode==='left'){assert.equal(computed.left,'40px');assert.equal(computed.transform,'none')}
    else{assert.equal(computed.left,'0px');assert.equal(computed.transform,'matrix(1, 0, 0, 1, 40, 0)')}
    if(reducedMotion==='reduce')assert.equal(computed.duration,'0s');
    assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    report.checks.push({width,reducedMotion,mode,delta:Math.round((end.x-start.x)*100)/100,status:'passed'});
   }
   assert.deepEqual(errors,[]);await p.close();
  }
 }
 report.status='passed';console.log(JSON.stringify(report,null,2));
}finally{await browser.close();await writeFile('docs/audits/stage-1-css-runtime.json',JSON.stringify(report,null,2)+'\n')}
