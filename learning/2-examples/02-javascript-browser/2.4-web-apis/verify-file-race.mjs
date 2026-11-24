import{pathToFileURL}from'node:url';import{writeFile}from'node:fs/promises';import assert from'node:assert/strict';
const{chromium}=await import(process.env.PLAYWRIGHT_MODULE?pathToFileURL(process.env.PLAYWRIGHT_MODULE).href:'playwright-core');
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const result={date:new Date().toISOString(),checks:[],scope:'Controlled delay of File.text on in-memory Playwright files; no real disk, upload or OS dialog.'};
try{
 const context=await browser.newContext();await context.addInitScript(()=>{const original=File.prototype.text;File.prototype.text=async function(){const text=await original.call(this);if(this.name==='slow-a.txt')await new Promise(r=>setTimeout(r,250));return text;};});
 const page=await context.newPage();await page.goto(new URL('learning/2-examples/02-javascript-browser/2.4-web-apis/2.4.6.file-api-demo.html',process.env.STORAGE_BASE||'http://127.0.0.1:4193/').href);
 const slow={name:'slow-a.txt',mimeType:'text/plain',buffer:Buffer.from('old A')};
 await page.locator('#file').setInputFiles(slow);await page.locator('#file').setInputFiles([]);await page.waitForTimeout(350);assert.equal(await page.locator('#output').getAttribute('data-state'),'empty');assert.equal(await page.locator('#preview').textContent(),'尚未读取');result.checks.push({name:'clear selection invalidates delayed A',result:'passed'});
 await page.locator('#file').setInputFiles(slow);await page.locator('#file').setInputFiles({name:'fast-b.txt',mimeType:'text/plain',buffer:Buffer.from('new B')});await page.waitForTimeout(350);assert.equal(await page.locator('#preview').textContent(),'new B');assert.ok((await page.locator('#output').textContent()).includes('fast-b.txt'));result.checks.push({name:'new B survives delayed A',result:'passed'});
}catch(error){result.checks.push({name:'file race',result:'failed',message:error.message});process.exitCode=1;}
finally{await browser.close();result.result=result.checks.some(x=>x.result==='failed')?'failed':'passed';await writeFile(new URL('../../../../docs/audits/stage-2-storage-apis-file-race.json',import.meta.url),JSON.stringify(result,null,2)+'\n');}
console.log(JSON.stringify(result));
