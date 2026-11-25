export function schedule(tasks) {
 const rows=new Map()
 for(const task of tasks) {
  if (!task.id || rows.has(task.id)) throw new Error('DUPLICATE_OR_EMPTY_ID')
  if (!task.owner || !Array.isArray(task.deps)) throw new Error('OWNER_OR_DEPS')
  if (!Array.isArray(task.duration) || task.duration.length !== 2 || !task.duration.every(x=>Number.isFinite(x)&&x>=0) || task.duration[0]>task.duration[1]) throw new Error('DURATION')
  rows.set(task.id,task)
 }
 const ends=new Map(),active=new Set(),order=[]
 function visit(id) {
  if(ends.has(id))return ends.get(id)
  if(active.has(id))throw new Error('CYCLE')
  const task=rows.get(id); if(!task)throw new Error('MISSING_DEPENDENCY')
  active.add(id)
  const dependencies=task.deps.map(visit)
  const start=[Math.max(0,...dependencies.map(x=>x[0])),Math.max(0,...dependencies.map(x=>x[1]))]
  const end=[start[0]+task.duration[0],start[1]+task.duration[1]]
  active.delete(id);ends.set(id,end);order.push(id);return end
 }
 for(const id of rows.keys()) visit(id)
 return {order,ends:Object.fromEntries(ends),duration:[Math.max(0,...[...ends.values()].map(x=>x[0])),Math.max(0,...[...ends.values()].map(x=>x[1]))]}
}
export function totalCost(cost) {
 const keys=['license','integration','maintenance','exit']
 if (Object.keys(cost).some(k=>!keys.includes(k)) || keys.some(k=>!Number.isFinite(cost[k]) || cost[k]<0)) throw new Error('COST_SCOPE')
 return keys.reduce((sum,key)=>sum+cost[key],0)
}
// A real independent consumer decoder, not an OpenAPI/JSON Schema engine.
export function oldCatalogConsumer(payload) {
 if(!Array.isArray(payload))throw new Error('CATALOG_ARRAY')
 return payload.map(row=> {
  if(!row || typeof row.id!=='string' || typeof row.title!=='string' || !Number.isSafeInteger(row.priceCents) || row.priceCents<0)throw new Error('CATALOG_CONTRACT')
  return {id:row.id,title:row.title,priceCents:row.priceCents}
 })
}
export function adaptRenamedCatalog(payload) {
 if(!Array.isArray(payload))throw new Error('CATALOG_ARRAY')
 return oldCatalogConsumer(payload.map(row=>({...row,title:row.name})))
}
