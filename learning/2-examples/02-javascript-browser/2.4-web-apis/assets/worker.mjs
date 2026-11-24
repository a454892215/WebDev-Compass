self.onmessage=({data})=>{
 if(!data||!Number.isInteger(data.requestId)||!Array.isArray(data.values)||!data.values.every(Number.isFinite)){self.postMessage({error:'消息协议无效'});return;}
 self.postMessage({requestId:data.requestId,total:data.values.reduce((a,b)=>a+b,0)});
};
