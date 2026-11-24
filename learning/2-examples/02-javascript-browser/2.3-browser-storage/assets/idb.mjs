export const databaseName='webdev-stage2-storage-lab';
export function openDatabase(){return new Promise((resolve,reject)=>{
 let rejected=false;const request=indexedDB.open(databaseName,1);
 request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains('drafts'))request.result.createObjectStore('drafts',{keyPath:'id'});};
 request.onerror=()=>reject(request.error);
 request.onblocked=()=>{rejected=true;reject(new Error('数据库升级被其他标签阻挡，请关闭旧连接'));};
 request.onsuccess=()=>{const db=request.result;if(rejected){db.close();return;}db.onversionchange=()=>db.close();resolve(db);};
});}
export async function transaction(action,mode='readonly',abort=false){
 const db=await openDatabase();return new Promise((resolve,reject)=>{
  let value;const tx=db.transaction('drafts',mode);
  tx.oncomplete=()=>{db.close();resolve(value);};
  tx.onabort=()=>{db.close();reject(tx.error||new Error('事务已主动中止'));};
  tx.onerror=()=>{};
  try{const request=action(tx.objectStore('drafts'));request.onsuccess=()=>{value=request.result;};if(abort)tx.abort();}catch(error){tx.abort();}
 });
}
export function deleteDatabase(){return new Promise((resolve,reject)=>{const request=indexedDB.deleteDatabase(databaseName);request.onsuccess=()=>resolve();request.onerror=()=>reject(request.error);request.onblocked=()=>reject(new Error('仍有旧连接，请关闭后重试'));});}
