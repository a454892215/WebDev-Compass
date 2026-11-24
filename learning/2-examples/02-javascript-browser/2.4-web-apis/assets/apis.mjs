const id=document.body.dataset.lesson,output=document.querySelector('#output');
function show(value,state='success'){output.textContent=typeof value==='string'?value:JSON.stringify(value,null,2);output.dataset.state=state;}
function on(selector,fn){document.querySelector(selector).addEventListener('click',()=>Promise.resolve().then(fn).catch(error=>show(error.message,'error')));}
let cleanup=()=>{};
if(id==='2.4.1'){
 const root=document.querySelector('#viewport'),target=document.querySelector('#target');let count=0,observer;
 on('#start',()=>{observer?.disconnect();if(!('IntersectionObserver'in window))return show('不支持，内容仍可手动访问。','fallback');observer=new IntersectionObserver(entries=>{count++;show({count,intersecting:entries[0].isIntersecting,ratio:Math.round(entries[0].intersectionRatio*100)/100});},{root,threshold:[0,.5,1]});observer.observe(target);});
 on('#scroll',()=>{root.scrollTop=root.scrollHeight;});on('#top',()=>{root.scrollTop=0;});on('#stop',()=>{observer?.disconnect();show({stopped:true,count});});cleanup=()=>observer?.disconnect();
}else if(id==='2.4.2'){
 const panel=document.querySelector('#panel');let observer,count=0;
 on('#start',()=>{observer?.disconnect();if(!('ResizeObserver'in window))return show('不支持，按CSS布局继续阅读。','fallback');observer=new ResizeObserver(entries=>{count++;show({count,width:Math.round(entries[0].contentRect.width)});});observer.observe(panel);});
 document.querySelector('#width').addEventListener('input',e=>{panel.style.width=e.target.value+'px';});on('#stop',()=>{observer?.disconnect();show({stopped:true,count});});cleanup=()=>observer?.disconnect();
}else if(id==='2.4.3'){
 const watched=document.querySelector('#watched');let observer,count=0;
 on('#start',()=>{observer?.disconnect();observer=new MutationObserver(records=>{count++;show({count,types:records.map(x=>x.type)});});observer.observe(watched,{childList:true,attributes:true,attributeFilter:['data-state']});show('观察已启动；修改DOM后异步回调。');});
 on('#add',()=>{const p=document.createElement('p');p.textContent='新增阅读项';watched.append(p);});on('#attribute',()=>{watched.dataset.state=watched.dataset.state==='ready'?'changed':'ready';});on('#stop',()=>{observer?.disconnect();show({stopped:true,count});});cleanup=()=>observer?.disconnect();
}else if(id==='2.4.4'){
 on('#locate',()=>{if(!isSecureContext||!navigator.geolocation)return show('定位不可用，请手工选择地区。','fallback');show('正在请求位置，仅本页显示，不保存或上传。','loading');navigator.geolocation.getCurrentPosition(p=>show({latitude:p.coords.latitude,longitude:p.coords.longitude,accuracy:p.coords.accuracy,scope:'仅当前页面；QA使用虚拟位置'}),e=>show({code:e.code,message:'定位失败，请手工选择地区。'},'error'),{timeout:5000,maximumAge:0,enableHighAccuracy:false});});
}else if(id==='2.4.5'){
 on('#copy',async()=>{const text='WebDev Compass：仅测试复制文本';try{const writer=window.__stage2ClipboardWriter??(navigator.clipboard?.writeText?value=>navigator.clipboard.writeText(value):null);if(!isSecureContext||!writer)throw new Error('unavailable');await writer(text);show('写入成功；QA适配器不代表系统剪贴板实测。');}catch{show('复制未完成，请手动选择下面文本。','fallback');}});
}else if(id==='2.4.6'){
 let readRevision=0;
 document.querySelector('#file').addEventListener('change',async e=>{const own=++readRevision;const file=e.target.files[0];if(!file){document.querySelector('#preview').textContent='尚未读取';return show('未选择文件。','empty');}try{if(file.size>64*1024)throw new Error('超过64KiB');const text=await file.text();if(own!==readRevision)return;document.querySelector('#preview').textContent=text;show({name:file.name,size:file.size,uploaded:false});}catch(error){if(own!==readRevision)return;document.querySelector('#preview').textContent='未读取';show(error.message,'error');}});
 cleanup=()=>{readRevision++;};
}else if(id==='2.4.7'){
 const view=document.querySelector('#view');
 function render(){const page=new URL(location.href).searchParams.get('page')||'home';const known=['home','notes'].includes(page);view.textContent=known?(page==='home'?'首页':'笔记页'):'未知条件，展示首页';show({page:known?page:'home',source:'URL'});}
 history.replaceState({page:new URL(location.href).searchParams.get('page')||'home'},'',location.href);
 document.querySelector('#routes').addEventListener('click',e=>{const a=e.target.closest('a[data-page]');if(!a||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();history.pushState({page:a.dataset.page},'',a.href);render();});addEventListener('popstate',render);cleanup=()=>removeEventListener('popstate',render);render();
}else if(id==='2.4.8'){
 let worker,revision=0;const stop=()=>{worker?.terminate();worker=undefined;revision++;};
 on('#compute',()=>{stop();if(!('Worker'in window))return show('Worker不可用，保留列表。','fallback');const tokens=document.querySelector('#values').value.split(',');const values=tokens.map(x=>Number(x.trim()));if(tokens.some(x=>!x.trim())||values.some(x=>!Number.isFinite(x)))throw new Error('请输入逗号分隔的有限数字');const own=revision;worker=new Worker(new URL('./worker.mjs',import.meta.url),{type:'module'});worker.onmessage=({data})=>{if(own!==revision)return;if(data.error){show(data.error,'error');stop();return;}if(data.requestId!==own||!Number.isFinite(data.total)){show('响应协议无效','error');stop();return;}show(data);worker?.terminate();worker=undefined;};worker.onerror=event=>{event.preventDefault();show('Worker错误；页面仍可操作。','error');stop();};worker.onmessageerror=()=>{show('Worker消息无法解码。','error');stop();};worker.postMessage({requestId:own,values});show('计算中','loading');});
 on('#stop',()=>{stop();show('已终止Worker。','cancelled');});cleanup=stop;
}else if(id==='2.4.9'){
 function capability(){const api=window.__stage2Notification??window.Notification;return{api,available:isSecureContext&&!!api};}
 on('#inspect',()=>{const {api,available}=capability();show({available,permission:available?api.permission:'unavailable',sent:false});});
 on('#request',async()=>{const {api,available}=capability();if(!available)return show('使用站内提示；通知不可用。','fallback');if(api.permission==='denied')return show('已拒绝，保留站内提示，不反复请求。','fallback');const permission=await api.requestPermission();show({permission,sent:false,message:'本例不创建OS通知；站内提示始终保留。'});});
}
addEventListener('pagehide',()=>cleanup());
