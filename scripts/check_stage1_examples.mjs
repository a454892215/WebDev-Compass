// Browser QA for CSS/JavaScript/quality and the integrated Stage 1 project.
// HTML's focused 19-page suite remains scripts/check_html_examples.mjs.
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'
import assert from 'node:assert/strict'
const root = fileURLToPath(new URL('../', import.meta.url))
const modulePath=process.env.PLAYWRIGHT_MODULE
const {chromium}=await import(modulePath?pathToFileURL(resolve(modulePath)).href:'playwright-core')
const base=process.env.EXAMPLES_BASE_URL||'http://127.0.0.1:4174/'
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true})
const result={date:new Date().toISOString(),browser:browser.version(),lessons:[],practice:[],scope:'Headless Chrome desktop and mobile viewport simulation; not real device or full accessibility certification.'}
const groups=['1.2-css','1.3-javascript','1.4-quality-basics']
const only=process.env.LESSON_IDS?.split(',')
async function value(page,check){
 return page.locator(check.selector).evaluate((element,check)=>{
  if(check.kind==='computed'){const styles=getComputedStyle(element);return styles.getPropertyValue(check.property)||styles[check.property]}
  if(check.kind==='attribute')return element.getAttribute(check.name)
  if(check.kind==='text')return element.textContent
  if(check.kind==='property')return element[check.name]
  throw new Error('Unknown assertion kind '+check.kind)
 },check)
}
async function verify(page,check){
 const until=Date.now()+3500;let actual
 do{
  actual=await value(page,check)
  if('equals'in check?actual===check.equals:String(actual).includes(check.contains))return
  await new Promise(resolve=>setTimeout(resolve,50))
 }while(Date.now()<until)
 throw new Error(`${check.selector} ${check.kind} expected ${JSON.stringify(check.equals??check.contains)}, got ${JSON.stringify(actual)}`)
}
async function structure(page){
 const problems=await page.evaluate(()=>{
  const issues=[]
  if(!document.title||!document.documentElement.lang)issues.push('title/lang missing')
  if(document.querySelectorAll('h1').length!==1||document.querySelectorAll('main').length!==1)issues.push('single h1/main required')
  const ids=[...document.querySelectorAll('[id]')].map(e=>e.id)
  if(new Set(ids).size!==ids.length)issues.push('duplicate IDs')
  if(document.documentElement.scrollWidth>innerWidth+1)issues.push('viewport overflow')
  if(document.body.dataset.experimentError==='true')issues.push('experiment exception caught by harness')
  for(const label of document.querySelectorAll('label[for]'))if(!document.getElementById(label.htmlFor))issues.push('broken label')
  return issues
 })
 assert.deepEqual(problems,[])
}
try{
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width,height:900},isMobile:width===390,hasTouch:width===390})
  for(const group of groups){
   const dir='learning/2-examples/01-web-fundamentals/'+group+'/'
   const cases=JSON.parse(await readFile(resolve(root,dir,'qa-cases.json'),'utf8')).cases
   assert.equal(cases.length,group==='1.2-css'?41:group==='1.3-javascript'?42:4)
   for(const c of cases){
    if(only&&!only.includes(c.id))continue
    const page=await context.newPage();page.setDefaultTimeout(6000)
    const errors=[],http=[]
    page.on('pageerror',e=>errors.push(e.message))
    page.on('response',r=>{if(r.status()>=400)http.push({url:r.url(),status:r.status()})})
    try{
     const response=await page.goto(new URL(dir+c.file,base).href,{waitUntil:'load'})
     assert.equal(response.status(),200)
     await structure(page)
     for(const action of c.actions){
      const target=page.locator(action.selector)
      if(action.kind==='click')await target.click()
      else if(action.kind==='fill')await target.fill(action.value)
      else if(action.kind==='select')await target.selectOption(action.value)
      else if(action.kind==='press')await target.press(action.value||action.key)
      else if(action.kind==='hover')await target.hover()
      else throw new Error('Unknown action '+action.kind)
     }
     if(c.settleMs)await new Promise(resolve=>setTimeout(resolve,c.settleMs))
     for(const check of c.assertions)await verify(page,check)
     await structure(page)
     assert.deepEqual(errors,[])
     const unexpected=http.filter(x=>!(c.id==='1.3.5.3'&&x.status===404&&x.url.endsWith('/fixtures/missing.json')))
     assert.deepEqual(unexpected,[])
     result.lessons.push({id:c.id,width,status:'passed'})
    }catch(error){result.lessons.push({id:c.id,width,status:'failed',message:error.message});console.log('FAIL',c.id,width,error.message)}
    finally{await page.close()}
    if(result.lessons.length%10===0)console.log('Lesson progress',result.lessons.length)
   }
  }
  if(!only){
   const page=await context.newPage();page.setDefaultTimeout(6000)
   const errors=[];page.on('pageerror',e=>errors.push(e.message))
   try{
    await page.goto(new URL('learning/4-practice/01-web-fundamentals/index.html',base).href)
    await page.waitForFunction(()=>document.querySelector('#results').dataset.state==='success')
    assert.equal(await page.locator('#cards>li').count(),6)
    await page.locator('#theme').click();assert.equal(await page.locator('#theme').getAttribute('aria-pressed'),'true')
    await page.locator('#cards button').first().click();await page.locator('#favorites').check()
    assert.equal(await page.locator('#cards>li').count(),1)
    await page.locator('#favorites').uncheck()
    await page.locator('#q').fill('没有这个资源');await page.locator('button[type=submit]').click()
    await page.waitForFunction(()=>document.querySelector('#results').dataset.state==='success')
    assert.equal(await page.locator('#cards>li').count(),0)
    await page.locator('#q').fill('')
    for(const [mode,text] of [['error','HTTP 503'],['invalid','有效的 JSON']]){
     await page.locator('#mode').selectOption(mode);await page.locator('button[type=submit]').click()
     await page.waitForFunction(()=>document.querySelector('#results').dataset.state==='error')
     assert.ok((await page.locator('#status').innerText()).includes(text))
    }
    await page.locator('#mode').selectOption('ok');await page.locator('#retry').click()
    await page.waitForFunction(()=>document.querySelector('#results').dataset.state==='success')
    assert.equal(await page.locator('#cards>li').count(),6)
    await page.locator('#mode').selectOption('slow');await page.locator('button[type=submit]').click();await page.locator('#cancel').click()
    await page.waitForFunction(()=>document.querySelector('#results').dataset.state==='cancelled')
    await page.locator('button[type=submit]').click();await page.locator('#mode').selectOption('ok');await page.locator('#q').fill('布局');await page.locator('button[type=submit]').click()
    await page.waitForFunction(()=>document.querySelector('#results').dataset.state==='success')
    await new Promise(resolve=>setTimeout(resolve,900))
    assert.equal(await page.locator('#cards>li').count(),1)
    assert.ok((await page.locator('#cards').innerText()).includes('布局与尺寸'))
    await structure(page);assert.deepEqual(errors,[])
    await page.screenshot({path:`/tmp/webdev-stage1-practice-${width}.png`,fullPage:true})
    result.practice.push({name:'catalog',width,status:'passed',checks:['list','theme','favorite','empty','http-error','invalid-json','retry','cancel','latest-request','structure']})
   }catch(error){result.practice.push({name:'catalog',width,status:'failed',message:error.message});console.log('FAIL practice',width,error.message)}finally{await page.close()}
   const build=await context.newPage()
   try{
    await build.goto(new URL('learning/4-practice/01-web-fundamentals/toolchain/dist/',base).href)
    await build.waitForFunction(()=>document.body.dataset.ready==='true')
    assert.notEqual(await build.locator('#module-a').getAttribute('class'),await build.locator('#module-b').getAttribute('class'))
    await verify(build,{kind:'computed',selector:'#sass-card',property:'paddingTop',equals:'24px'})
    await verify(build,{kind:'computed',selector:'#tailwind-grid',property:'display',equals:'grid'})
    const columns=await build.locator('#tailwind-grid').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length)
    assert.equal(columns,width<640?1:2)
    result.practice.push({name:'real-toolchain',width,status:'passed'})
   }catch(error){result.practice.push({name:'real-toolchain',width,status:'failed',message:error.message});console.log('FAIL toolchain',width,error.message)}finally{await build.close()}
  }
  await context.close()
 }
 if(!only){
  const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}})
  const page=await noJS.newPage();await page.goto(new URL('learning/4-practice/01-web-fundamentals/index.html',base).href)
  assert.equal(await page.locator('#static-catalog a').count(),3)
  result.practice.push({name:'no-js-fallback',status:'passed'});await noJS.close()
  const offline=await browser.newContext();const p=await offline.newPage()
  await p.route('**/practice-api/resources**',route=>route.abort())
  await p.goto(new URL('learning/4-practice/01-web-fundamentals/index.html',base).href)
  await p.waitForFunction(()=>document.querySelector('#results').dataset.state==='error')
  assert.equal(await p.locator('#static-catalog a').count(),3)
  result.practice.push({name:'network-failure-fallback',status:'passed'});await offline.close()
 }
 const output=process.env.EXAMPLES_REPORT||'/tmp/webdev-stage1-browser.json'
 await writeFile(output,JSON.stringify(result,null,2)+'\n')
 const failures=[...result.lessons,...result.practice].filter(x=>x.status==='failed')
 console.log('RESULT',result.lessons.length,'lesson/viewport checks;',result.practice.length,'practice checks;',failures.length,'failures;',output)
 if(failures.length)process.exitCode=1
}finally{await browser.close()}
