import{transaction,deleteDatabase}from'./idb.mjs';
const id=document.body.dataset.lesson,output=document.querySelector('#output');
function show(value,state='success'){output.textContent=typeof value==='string'?value:JSON.stringify(value,null,2);output.dataset.state=state;}
function on(selector,fn){document.querySelector(selector).addEventListener('click',()=>Promise.resolve().then(fn).catch(error=>show(error.message,'error')));}
if(id==='2.3.1'){
 const local='stage2:local',session='stage2:session';
 on('#save',()=>{const text=document.querySelector('#value').value;localStorage.setItem(local,JSON.stringify({text}));sessionStorage.setItem(session,text);show('已保存两个测试键。');});
 on('#read',()=>{const raw=localStorage.getItem(local);const value=raw===null?null:JSON.parse(raw);if(value!==null&&(typeof value!=='object'||typeof value.text!=='string'))throw new Error('local数据结构无效');show({local:value?.text??null,session:sessionStorage.getItem(session)});});
 on('#corrupt',()=>{localStorage.setItem(local,'{broken');show('已写入损坏JSON；点击读取观察错误。');});
 on('#clear',()=>{localStorage.removeItem(local);sessionStorage.removeItem(session);show('只清除了stage2:local和stage2:session。');});
}else if(id==='2.3.2'){
 async function inspect(){const response=await fetch('/storage-api/cookies');if(!response.ok)throw new Error('HTTP '+response.status);const value=await response.json();const visible=document.cookie.split(';').map(x=>x.trim().split('=')[0]).filter(x=>x.startsWith('stage2_'));show({scriptVisibleNames:visible,...value});}
 for(const action of ['set','clear'])on('#'+action,async()=>{const response=await fetch('/storage-api/cookies/'+action,{method:'POST'});if(!response.ok)throw new Error('请使用本组4193教学服务：HTTP '+response.status);await inspect();});
 on('#read',inspect);
}else if(id==='2.3.3'){
 on('#save',async()=>{await transaction(store=>store.put({id:'draft',text:document.querySelector('#value').value}),'readwrite');show('事务complete：已保存。');});
 on('#read',async()=>show(await transaction(store=>store.get('draft'))??'没有已提交草稿。'));
 on('#abort',async()=>{try{await transaction(store=>store.put({id:'draft',text:'不得提交的变更'}),'readwrite',true);}catch{show('事务已中止：读取检查旧草稿未改变。','cancelled');}});
 on('#clear',async()=>{await deleteDatabase();show('仅删除webdev-stage2-storage-lab。');});
}else if(id==='2.3.4'){
 on('#choose',()=>{
  const cases={theme:['localStorage','小量非敏感配置；需序列化、校验与失败回退。'],draft:['IndexedDB','结构化记录/事务；关键内容仍需备份与同步。'],session:['Cookie协议','服务器会话可选HttpOnly/Secure/SameSite；还需授权和CSRF。'],filter:['URL或内存','可分享筛选用URL，短期界面状态可内存；不必持久化。']};
  const [choice,reason]=cases[document.querySelector('#need').value];show({choice,reason,scope:'设计决策，不是配额/安全性运行证明。'});
 });
}
