import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const root = fileURLToPath(new URL('./', import.meta.url));
const tsc = resolve(root, 'node_modules/typescript/bin/tsc');
const temporary = resolve(root, '.tmp-verify');
const report = { date: new Date().toISOString(), typescript: '6.0.3', node: process.version, checks: [], scope: 'Actual TypeScript compiler rejection, emitted Node runtime and Vue VNode/composable; no browser DOM or Dart/Kotlin runtime certification.' };
const cases = [
 ['3.3.1', 'const title: string = 42;', 'TS2322'],
 ['3.3.2', 'const value: unknown = {x:1}; value.x;', 'TS18046'],
 ['3.3.3', 'interface Book {id:string;title:string} const book:Book={id:"a"};', 'TS2741'],
 ['3.3.4', 'type L={kind:"ok";value:string}|{kind:"error";reason:string}; function f(x:L){return x.value}', 'TS2339'],
 ['3.3.5', 'function byId<T extends {id:string}>(x:T){return x.id} byId({title:"missing"});', 'TS2353'],
 ['3.3.6', 'function f(x:unknown){return x.title}', 'TS18046'],
 ['3.3.7', 'type F=(value:string)=>string; const f:F=(value:number)=>String(value);', 'TS2322'],
 ['3.3.8', 'class Box{private value=1}; new Box().value;', 'TS2341'],
 ['3.3.9', 'const declared:number=BUILD_META.version;', 'TS2322'],
 ['3.3.10', 'const title:string=undefined;', 'TS2322'],
 ['3.3.11', 'import type {CardProps} from "../src/experiments.js"; const bad:CardProps={title:42}; const event:CardProps={title:"ok",onSelect:(id:number)=>{}};', 'TS2322'],
 ['3.3.12', 'interface Title {title:string} const value:Title=null;', 'TS2322'],
];
try {
 const positive = spawnSync(process.execPath, ['dist/run.js'], {cwd:root,encoding:'utf8'}); assert.equal(positive.status,0,positive.stderr);
 const runtimeRows=positive.stdout.trim().split('\n').map(line=>JSON.parse(line)); assert.equal(runtimeRows.length,12);
 for(const row of runtimeRows)report.checks.push({id:row.id,kind:'runtime',status:'passed',observed:row.result});
 await mkdir(temporary, { recursive: true });
 const files = [];
 for (const [id, code] of cases) { const name = id + '.negative.ts'; files.push('./' + name); await writeFile(resolve(temporary, name), 'export {};\n' + code + '\n'); }
 await writeFile(resolve(temporary, 'negative.json'), JSON.stringify({ extends: '../tsconfig.json', compilerOptions: { noEmit: true, rootDir: '..' }, include: [], files: [...files, '../types/build-meta.d.ts'] }));
 const negative = spawnSync(process.execPath, [tsc, '-p', '.tmp-verify/negative.json', '--pretty', 'false'], { cwd: root, encoding: 'utf8' });
 assert.notEqual(negative.status, 0, 'all negative fixtures must not silently pass');
 for (const [id,, diagnostic] of cases) { assert.ok(negative.stdout.split('\n').some(line => line.includes(id + '.negative.ts') && line.includes(diagnostic)), id + ': expected ' + diagnostic + '\n' + negative.stdout); report.checks.push({id, kind:'negative-typecheck', expected:diagnostic, status:'passed'}); }
 assert.ok(negative.stdout.split('\n').filter(line => line.includes('3.3.11.negative.ts') && line.includes('TS2322')).length >= 2, 'Vue rejects both invalid props and event payload callback');
 // Suppression directives are checked by the real compiler, not trusted blindly.
 await writeFile(resolve(temporary, 'expect-error.ts'), '// @ts-expect-error intentional mismatch\nconst n:number="wrong";\n');
 const checked = file => spawnSync(process.execPath, [tsc,'--strict','--noEmit','--skipLibCheck','--target','ES2022','--ignoreConfig',file], {cwd: root, encoding:'utf8'});
 assert.equal(checked('.tmp-verify/expect-error.ts').status, 0);
 await writeFile(resolve(temporary, 'expect-error.ts'), '// @ts-expect-error now obsolete\nconst n:number=1;\n');
 const stale = checked('.tmp-verify/expect-error.ts'); assert.notEqual(stale.status,0); assert.ok(stale.stdout.includes('TS2578'));
 report.checks.push({kind:'expect-error-valid-and-stale',status:'passed'});
 // paths can make the compiler resolve a name without rewriting emitted imports.
 await writeFile(resolve(temporary, 'alias.ts'), 'import { label } from "@lab/lib"; console.log(label);\n');
 await writeFile(resolve(temporary, 'lib.ts'), 'export const label = "alias";\n');
 await writeFile(resolve(temporary, 'alias.json'), JSON.stringify({ compilerOptions: {target:'ES2022', module:'NodeNext', moduleResolution:'NodeNext', strict:true, types:[], paths:{'@lab/*':['./*.ts']}, outDir:'./alias-dist'}, files:['./alias.ts','./lib.ts'] }));
 const alias = spawnSync(process.execPath, [tsc,'-p','.tmp-verify/alias.json','--pretty','false'], {cwd:root,encoding:'utf8'}); assert.equal(alias.status,0,alias.stdout);
 const emitted = await readFile(resolve(temporary,'alias-dist/alias.js'),'utf8'); assert.ok(emitted.includes('@lab/lib'));
 const runtime = spawnSync(process.execPath, ['.tmp-verify/alias-dist/alias.js'], {cwd:root,encoding:'utf8'}); assert.notEqual(runtime.status,0); assert.ok(runtime.stderr.includes('ERR_MODULE_NOT_FOUND'));
 report.checks.push({id:'3.3.10',kind:'alias-resolves-in-ts-but-not-rewritten-for-node',status:'passed'});
 const source = await readFile(resolve(root,'dist/experiments.js'),'utf8');
 const contractJS = await readFile(resolve(root,'dist/contracts.js'),'utf8');
 const contractDeclaration = await readFile(resolve(root,'dist/contracts.d.ts'),'utf8');
 assert.ok(!contractJS.includes('interface Task') && contractDeclaration.includes('interface Task'));
 assert.ok(source.includes('State[State['), 'enum emits a runtime object');
 assert.ok(!source.includes('import type')); assert.ok(source.includes('BUILD_META')); assert.ok(source.includes('#secret'));
 report.checks.push({kind:'emitted-type-erasure-runtime-enum-and-private-boundaries',status:'passed'});
 report.status='passed'; console.log(`TypeScript verification: ${report.checks.length} compiler/artifact checks passed`);
} catch(error) { report.status='failed'; report.error=error.message; throw error; }
finally { await rm(temporary,{recursive:true,force:true}); await writeFile(fileURLToPath(new URL('../../../../docs/audits/stage-3-ts-runtime.json',import.meta.url)), JSON.stringify(report,null,2)+'\n'); }
