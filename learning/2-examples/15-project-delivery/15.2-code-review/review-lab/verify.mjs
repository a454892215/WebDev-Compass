import assert from 'node:assert/strict'
import { execFileSync, spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { badTotal, lineTotal, legacyView, extractedView, evidenceComplete, validateSlices, rankCandidates } from './review.mjs'
const root = fileURLToPath(new URL('.', import.meta.url))
mkdirSync(new URL('./dist/',import.meta.url),{recursive:true})
const checks=[]
const check=(name,action)=>{action();checks.push(name)}
check('review failure reproduced and fixed with boundary regression',()=>{
  const probe=spawnSync(process.execPath,['--input-type=module','-e',"import assert from 'node:assert/strict'; import {badTotal} from './review.mjs'; assert.throws(()=>badTotal({quantity:-2,unitCents:100}));"],{cwd:root,encoding:'utf8',timeout:5000})
  assert.equal(probe.status,1);assert.match(probe.stderr,/AssertionError/)
  assert.equal(badTotal({quantity:-2,unitCents:100}),-200)
  assert.equal(badTotal({quantity:'2',unitCents:100}),200)
  const good={quantity:2,unitCents:199,title:'<b>fixture</b>',internalMargin:999}
  assert.deepEqual(lineTotal(good),{title:'<b>fixture</b>',totalCents:398})
  for(const quantity of [-2,0,1.5,'2',100,NaN])assert.throws(()=>lineTotal({...good,quantity}),/INVALID_QUANTITY/)
  for(const unitCents of [-1,1.2,'199',1000001])assert.throws(()=>lineTotal({...good,unitCents}),/INVALID_PRICE/)
})
check('checklist cannot pass unresolved blocker; nit does not block',()=>{
  const record={tests:'passed',findings:[{severity:'blocking',resolved:false},{severity:'nit',resolved:false}]}
  assert.equal(evidenceComplete(record),false)
  record.findings[0].resolved=true;assert.equal(evidenceComplete(record),true)
  assert.equal(evidenceComplete({...record,tests:'not-run'}),false)
})
check('review slices preserve complete coverage and dependency order',()=>{
 const slices=[{id:'extract',purpose:'extract existing calculation, preserve behavior',check:'characterization included and green',depends:[]},{id:'validate',purpose:'reject invalid quantity as a separate behavior change',check:'negative input regression included',depends:['extract']}]
 assert.equal(validateSlices(slices,['extract','validate']),true)
 assert.equal(validateSlices([...slices].reverse(),['extract','validate']),false)
 assert.equal(validateSlices(slices,['extract','validate','localize']),false)
})
const history=mkdtempSync(new URL('./dist/history-',import.meta.url))
const gitEnv={...process.env,GIT_CONFIG_NOSYSTEM:'1',GIT_CONFIG_GLOBAL:'/dev/null',GIT_CONFIG_COUNT:'0'}
// Ignore caller Git-directory/index variables, global hooks and signing settings.
for(const key of ['GIT_DIR','GIT_WORK_TREE','GIT_INDEX_FILE','GIT_COMMON_DIR','GIT_OBJECT_DIRECTORY','GIT_ALTERNATE_OBJECT_DIRECTORIES'])delete gitEnv[key]
const git=(...args)=>execFileSync('git',['-c','core.hooksPath=/dev/null','-c','commit.gpgSign=false',...args],{cwd:history,env:gitEnv,encoding:'utf8',timeout:5000})
let ranked
try {
 git('init','-q');git('config','user.name','Local fixture');git('config','user.email','fixture@example.invalid')
 const update=(path,content,message)=>{writeFileSync(new URL(path,'file://'+history+'/'),content);git('add','--',path);git('commit','-qm',message)}
 update('checkout.mjs','export const total = 1\n','fixture checkout base')
 update('catalog.mjs','export const catalog = []\n','fixture catalog base')
 update('generated.lock','hash-a\n','fixture generated base')
 update('checkout.mjs','export const total = 2\n','fixture checkout change')
 update('checkout.mjs','export const total = 3\n','fixture checkout followup')
 update('generated.lock','hash-b\n','fixture generated update')
 const paths=git('log','--format=','--name-only','--','checkout.mjs','catalog.mjs','generated.lock').split('\n').filter(Boolean)
 const rows=['checkout.mjs','catalog.mjs','generated.lock'].map(path=>({path,touches:paths.filter(p=>p===path).length,manualComplexity:path==='checkout.mjs'?3:1,generated:path==='generated.lock'}))
 ranked=rankCandidates(rows)
 check('real isolated Git history identifies a candidate without ranking people',()=>{
  assert.deepEqual(rows.map(r=>r.touches),[3,1,2]);assert.equal(ranked[0].path,'checkout.mjs');assert.equal(ranked[0].candidateWeight,9)
  assert.equal(ranked.some(r=>r.generated),false)
  assert.equal(rankCandidates(rows.map(r=>({...r,manualComplexity:r.path==='catalog.mjs'?20:1})))[0].path,'catalog.mjs')
 })
} finally { rmSync(history,{recursive:true,force:true}) }
check('small extraction preserves characterized valid behavior',()=>{
 let samples=0
 for(const quantity of [1,2,99])for(const unitCents of [0,1,199,1000000]){
  const row={quantity,unitCents,title:'公开合成商品'};assert.deepEqual(extractedView(row),legacyView(row));samples++
 }
 assert.equal(samples,12)
 // A meaningful mutant must fail the same comparison.
 assert.notDeepEqual({title:'公开合成商品',totalCents:2*199+1},legacyView({quantity:2,unitCents:199,title:'公开合成商品'}))
})
const report={checkedAt:new Date().toISOString(),node:process.version,git:execFileSync('git',['--version'],{encoding:'utf8'}).trim(),checks,passed:checks.length,ranked,scope:'Local synthetic Node functions and an isolated disposable Git history. No real PR approval, browser rendering, production or team evaluation.'}
writeFileSync(new URL('./dist/runtime.json',import.meta.url),JSON.stringify(report,null,2)+'\n')
console.log(JSON.stringify(report,null,2))
