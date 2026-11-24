import './style.css';
import {message} from './message';
import{badge}from'@lab/util';
function element<T extends HTMLElement>(selector:string,kind:{new():T}):T{const el=document.querySelector(selector);if(!(el instanceof kind))throw new Error(`missing ${selector}`);return el}
element("#mark",HTMLImageElement).src = `${import.meta.env.BASE_URL}mark.svg`;
let count=0;
const countOutput=element('#count',HTMLElement);
element('#label',HTMLElement).textContent=import.meta.env.VITE_COURSE_LABEL||'未提供公开环境标签';
element('#message',HTMLElement).textContent=`${badge}：${message}`;
element('#increment',HTMLButtonElement).addEventListener('click',()=>{countOutput.textContent=String(++count)});
element('#lazy',HTMLButtonElement).addEventListener('click',async()=>{try{const{summarize}=await import('./stats');element('#stats',HTMLElement).textContent=summarize([1,2,3])}catch{element('#stats',HTMLElement).textContent='按需模块加载失败，请刷新重试'}});
if(import.meta.hot){import.meta.hot.accept('./message',module=>{if(module)element('#message',HTMLElement).textContent=`${badge}：${module.message}`})}
