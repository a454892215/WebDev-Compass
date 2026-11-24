import{readdir,readFile}from'node:fs/promises';import assert from'node:assert/strict';
const dir=new URL('../dist/assets/',import.meta.url),names=await readdir(dir);const js=names.filter(x=>x.endsWith('.js'));const text=(await Promise.all(js.map(x=>readFile(new URL(x,dir),'utf8')))).join('\n');
assert.ok(js.length>=2,'dynamic import must create an extra JS asset');assert.ok(!text.includes('UNUSED_STAGE3_SENTINEL_0f39c2'),'unused pure export must be removed');
const maps=names.filter(x=>x.endsWith('.js.map'));assert.ok(maps.length>=2);const map=JSON.parse(await readFile(new URL(maps[0],dir)));assert.ok(map.sources.some(x=>x.includes('src/')));assert.equal(typeof map.mappings,'string');assert.ok(map.mappings.length>0);
assert.ok((await readFile(new URL('../dist/index.html',import.meta.url),'utf8')).includes('/assets/'));assert.ok((await readFile(new URL('../dist/mark.svg',import.meta.url),'utf8')).includes('<svg'));
console.log(JSON.stringify({jsChunks:js.length,sourceMaps:maps.length,unusedPureExportRemoved:true,publicAssetCopied:true,status:'passed'}));
