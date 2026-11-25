import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { schedule,totalCost,oldCatalogConsumer,adaptRenamedCatalog } from './model.mjs'
const fixture=JSON.parse(readFileSync(new URL('./fixture.json',import.meta.url)))
test('15.1.5 / 15.3.1 dependency critical path differs from sum',()=>{
 const result=schedule(fixture.tasks)
 assert.deepEqual(result.duration,[5,10])
 assert.deepEqual(result.ends.ui,[3,6]);assert.deepEqual(result.ends.regression,[4,8])
 assert.notEqual(result.duration[1],fixture.tasks.reduce((sum,t)=>sum+t.duration[1],0))
})
test('15.3.1 cyclic dependency fails before pretending parallel delivery',()=>{
 const copy=structuredClone(fixture.tasks);copy[0].deps=['rehearsal'];assert.throws(()=>schedule(copy),/CYCLE/)
})
test('15.3.1 rejects unknown dependencies, absent owner and invalid interval',()=>{
 const a=structuredClone(fixture.tasks);a[0].deps=['unknown'];assert.throws(()=>schedule(a),/MISSING_DEPENDENCY/)
 const b=structuredClone(fixture.tasks);b[0].owner='';assert.throws(()=>schedule(b),/OWNER/)
 const c=structuredClone(fixture.tasks);c[0].duration=[4,2];assert.throws(()=>schedule(c),/DURATION/)
})
test('15.1.2 scoped cost arithmetic and sensitivity are not a vendor recommendation',()=>{
 assert.equal(totalCost(fixture.costs.reuse),7);assert.equal(totalCost(fixture.costs.custom),14)
 assert.equal(totalCost({...fixture.costs.reuse,exit:10}),16)
 assert.throws(()=>totalCost({license:0,integration:1,maintenance:2}),/COST_SCOPE/)
 assert.throws(()=>totalCost({...fixture.costs.reuse,license:-1}),/COST_SCOPE/)
})
test('15.1.3 independent old consumer accepts additive optional data and strips extras',()=>{
 assert.deepEqual(oldCatalogConsumer(fixture.catalog.map(r=>({...r,currency:'CNY',internalNote:'fixture-only'}))),fixture.catalog)
})
test('15.1.3 renamed required field and type drift break; compatibility adapter restores',()=>{
 const renamed=fixture.catalog.map(({title,...row})=>({...row,name:title}))
 assert.throws(()=>oldCatalogConsumer(renamed),/CATALOG_CONTRACT/)
 assert.deepEqual(adaptRenamedCatalog(renamed),fixture.catalog)
 assert.throws(()=>oldCatalogConsumer([{id:1,title:'fixture',priceCents:1}]),/CATALOG_CONTRACT/)
})
