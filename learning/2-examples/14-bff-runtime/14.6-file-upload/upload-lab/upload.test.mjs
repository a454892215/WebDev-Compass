import test from 'node:test'
import assert from 'node:assert/strict'
import { setTimeout as delay } from 'node:timers/promises'
import { UploadStore, LocalGrants, digest, uploadMissing } from './upload.mjs'
const file = Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), Buffer.from('synthetic-not-a-decoded-image-0123456789')])
const setup = (bytes=file, checksum=digest(bytes)) => { const store=new UploadStore(); return {store,id:store.create('alice',bytes.length,8,checksum)} }
const sendAll = async (store,id,bytes=file) => uploadMissing(store,'alice',id,bytes,8,2,async (i,p,h)=>store.put('alice',id,i,p,h))

test('resume only missing chunks and respect actual asynchronous concurrency bound', async()=> {
 const {store,id}=setup(); store.put('alice',id,0,file.subarray(0,8),digest(file.subarray(0,8)))
 let active=0, peak=0; const sent=[]
 await uploadMissing(store,'alice',id,file,8,2,async(i,p,h)=>{ active++; peak=Math.max(peak,active); await delay(2); store.put('alice',id,i,p,h); sent.push(i); active-- })
 assert.equal(peak,2); assert.ok(!sent.includes(0)); assert.equal(sent.length,Math.ceil(file.length/8)-1)
 assert.equal(store.complete('alice',id,'image/png'),'quarantine')
 assert.throws(()=>store.read('alice',id),/not-ready/)
 assert.equal(store.scan('alice',id,'clean'),'ready'); assert.deepEqual(store.read('alice',id),file)
})
test('ownership checked for list put complete scan read and abort',()=> {
 const {store,id}=setup()
 for (const action of [()=>store.list('bob',id),()=>store.put('bob',id,0,file.subarray(0,8),digest(file.subarray(0,8))),()=>store.complete('bob',id,'image/png'),()=>store.scan('bob',id,'clean'),()=>store.read('bob',id),()=>store.abort('bob',id)]) assert.throws(action,/not-found/)
})
test('part shape index and checksum rejected; identical retry is idempotent',()=> {
 const {store,id}=setup(); const part=file.subarray(0,8), hash=digest(part)
 assert.throws(()=>store.put('alice',id,-1,part,hash),/index/)
 assert.throws(()=>store.put('alice',id,0,part.subarray(0,7),hash),/part-size/)
 assert.throws(()=>store.put('alice',id,0,part,'0'.repeat(64)),/part-checksum/)
 store.put('alice',id,0,part,hash); store.put('alice',id,0,part,hash)
 const other=Buffer.alloc(8); assert.throws(()=>store.put('alice',id,0,other,digest(other)),/part-conflict/)
 assert.deepEqual(store.list('alice',id),[0])
})
test('complete rejects missing and overall checksum mismatch',async()=> {
 const {store,id}=setup(file,'0'.repeat(64)); assert.throws(()=>store.complete('alice',id,'image/png'),/missing-parts/)
 await sendAll(store,id); assert.throws(()=>store.complete('alice',id,'image/png'),/object-checksum/)
})
test('size limits and abort cleanup',()=> {
 const {store,id}=setup(); assert.throws(()=>store.create('alice',1048577,8,digest(file)),/size/)
 store.abort('alice',id); assert.throws(()=>store.list('alice',id),/not-found/)
})
test('forged image/png with different magic rejected',async()=> {
 const bytes=Buffer.alloc(24,65),{store,id}=setup(bytes); await sendAll(store,id,bytes)
 assert.throws(()=>store.complete('alice',id,'image/png'),/type/)
})
test('declared MIME disagreement rejected despite PNG signature',async()=> {
 const {store,id}=setup(); await sendAll(store,id); assert.throws(()=>store.complete('alice',id,'text/html'),/type/)
})
test('scanner unavailable stays quarantined, infected rejected, mutation after complete blocked',async()=> {
 const {store,id}=setup(); await sendAll(store,id); store.complete('alice',id,'image/png')
 assert.equal(store.scan('alice',id,'timeout'),'quarantine'); assert.throws(()=>store.read('alice',id),/not-ready/)
 assert.equal(store.scan('alice',id,'infected'),'rejected'); assert.throws(()=>store.read('alice',id),/not-ready/)
 assert.throws(()=>store.put('alice',id,0,file.subarray(0,8),digest(file.subarray(0,8))),/state/)
})
test('local grant binds method resource part length checksum and expiry',()=> {
 const grants=new LocalGrants(), now=100000, request={id:'upload-a',part:0,checksum:digest(file),size:file.length,method:'PUT'}
 const token=grants.issue({...request,expires:now+1000},now)
 assert.equal(grants.verify(token,request,now).id,'upload-a')
 for(const key of ['id','part','checksum','size','method']) assert.throws(()=>grants.verify(token,{...request,[key]:'changed'},now),/scope/)
 assert.throws(()=>grants.verify(token,request,now+1000),/expired/)
 assert.throws(()=>grants.verify(token+'x',request,now),/signature/)
 assert.throws(()=>grants.issue({...request,expires:now+60001},now),/expiry-range/)
})
test('failed transfer preserves accepted chunks for a later resume',async()=> {
 const {store,id}=setup(); let first=true
 await assert.rejects(uploadMissing(store,'alice',id,file,8,1,async(i,p,h)=>{if(i===1&&first){first=false;throw Error('offline')}store.put('alice',id,i,p,h)}),/offline/)
 assert.deepEqual(store.list('alice',id),[0]); await sendAll(store,id)
 assert.equal(store.complete('alice',id,'image/png'),'quarantine')
})
test('failure waits for in-flight worker before allowing resume',async()=> {
 const {store,id}=setup(); let active=0
 await assert.rejects(uploadMissing(store,'alice',id,file,8,2,async(i,p,h)=>{
   active++
   try { if(i===0) throw Error('offline'); await delay(3); store.put('alice',id,i,p,h) }
   finally { active-- }
 }),/offline/)
 assert.equal(active,0)
 assert.ok(store.list('alice',id).length>0)
 await sendAll(store,id); assert.equal(store.complete('alice',id,'image/png'),'quarantine')
})
