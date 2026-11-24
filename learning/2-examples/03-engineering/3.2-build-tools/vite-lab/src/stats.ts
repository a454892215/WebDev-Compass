export function summarize(values:number[]){return `按需模块：共 ${values.length} 项，总和 ${values.reduce((n,v)=>n+v,0)}`}
