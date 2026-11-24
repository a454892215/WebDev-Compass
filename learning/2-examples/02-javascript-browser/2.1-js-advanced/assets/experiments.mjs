const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
export function debounce(fn, waitMs) {
  let timer;
  function wrapped(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), waitMs);
  }
  wrapped.cancel = () => { clearTimeout(timer); timer = undefined; };
  return wrapped;
}
// Explicit leading-only policy. No deferred trailing invocation.
export function leadingThrottle(fn, waitMs) {
  let blocked = false, timer;
  function wrapped(...args) {
    if (blocked) return;
    blocked = true;
    timer = setTimeout(() => { blocked = false; }, waitMs);
    fn.apply(this, args);
  }
  wrapped.cancel = () => { clearTimeout(timer); blocked = false; };
  return wrapped;
}
const experiments = {
 '2.1.1'() {
   const shared = { kind: 'article' };
   const item = Object.create(shared);
   item.title = 'Prototype demo';
   const inherited = item.kind, hasOwnBefore = Object.hasOwn(item, 'kind');
   item.kind = 'draft';
   const shadowed = item.kind, original = shared.kind;
   delete item.kind;
   function Reading(title) { this.title = title; }
   const instance = new Reading('example');
   return { inherited, hasOwnBefore, shadowed, original, afterDelete: item.kind, newPrototype: Object.getPrototypeOf(instance) === Reading.prototype };
 },
 '2.1.2'() {
   const counter = { value: 2, add(n) { return this.value + n; } };
   const detached = counter.add;
   let detachedError;
   try { detached(1); } catch (error) { detachedError = error.name; }
   function Reading(value) { this.value = value; }
   function makeReader() { return () => this.value; }
   const arrow = makeReader.call(counter);
   return { method: counter.add(3), call: detached.call({value:10},3), apply: detached.apply({value:10},[4]), bound:detached.bind(counter)(4), detachedError, constructed: new Reading(7).value, arrow:arrow.call({value:99}) };
 },
 '2.1.3'() {
   const trace = [];
   function inner() { trace.push('inner'); throw new Error('demo failure'); }
   function outer() {
     trace.push('outer:start');
     try { inner(); trace.push('unreachable'); }
     finally { trace.push('outer:finally'); }
   }
   let message;
   try { outer(); } catch (error) { trace.push('caught'); message = error.message; }
   return { trace, error: message, unreachable: trace.includes('unreachable') };
 },
 '2.1.4'() {
   return new Promise(resolve => {
     const order = [];
     order.push('sync:start');
     setTimeout(() => { order.push('timer'); resolve({order}); }, 0);
     Promise.resolve().then(() => {
       order.push('promise');
       Promise.resolve().then(() => order.push('nested'));
     });
     queueMicrotask(() => order.push('microtask'));
     order.push('sync:end');
   });
 },
 '2.1.5'() {
   if (!globalThis.structuredClone) return { supported: false, reason: '当前环境缺少structuredClone，不能把JSON回退称等价' };
   const original = { meta: { title: 'draft' }, date: new Date('2026-01-01T00:00:00Z'), items: new Map([['a',1]]), absent: undefined };
   const shallow = {...original};
   const deep = structuredClone(original);
   shallow.meta.title = 'changed';
   const cyclic = { name:'cycle' }; cyclic.self = cyclic;
   const copiedCycle = structuredClone(cyclic);
   const json = JSON.parse(JSON.stringify(original));
   let functionError;
   try { structuredClone(() => 1); } catch (error) { functionError = error.name; }
   return { originalTitle:original.meta.title, deepTitle:deep.meta.title, datePreserved:deep.date instanceof Date, mapPreserved:deep.items instanceof Map, cyclePreserved:copiedCycle.self === copiedCycle, jsonDateType:typeof json.date, undefinedDropped:!Object.hasOwn(json,'absent'), functionError };
 },
 async '2.1.6'() {
   const debounced = [], throttled = [];
   let cancelledCalls = 0;
   const a = debounce(value => debounced.push(value), 60);
   const b = leadingThrottle(value => throttled.push(value), 60);
   const cancelled = debounce(() => cancelledCalls++, 60);
   try {
     for (const value of ['v','vu','vue']) { a(value); b(value); }
     cancelled(); cancelled.cancel();
     await wait(120);
     b('later');
     return { debounced, throttled, cancelledCalls };
   } finally { a.cancel(); b.cancel(); cancelled.cancel(); }
 },
 '2.1.7'() {
   const hasMinLength = min => text => text.length >= min;
   const normalize = text => text.trim().toLowerCase();
   const pipe = (...steps) => value => steps.reduce((v, step) => step(v), value);
   const prepare = pipe(normalize, text => text.replaceAll(' ', '-'));
   const source = ['  Vue 3  ', ' Nuxt '];
   const before = [...source];
   return { prepared:source.map(prepare), filtered:['js','vue'].filter(hasMinLength(3)), sourceUnchanged:source.every((value,index)=>value===before[index]) };
 },
 async '2.1.8'() {
   const first = await import('./counter.mjs');
   const second = await import('./counter.mjs');
   const before = first.value;
   first.increment();
   const iife = (() => { let privateCount = 0; return { next:()=>++privateCount }; })();
   return { sameModule:first === second, incrementObserved:first.value-before, secondObserved:second.value-before, iifePrivate:!Object.hasOwn(iife,'privateCount') };
 },
 '2.1.9'() {
   function receiver() { return this; }
   let undeclaredError, readonlyError;
   try { stage2UnDeclaredName = 1; } catch (error) { undeclaredError = error.name; }
   const fixed = Object.freeze({ value:1 });
   try { fixed.value = 2; } catch (error) { readonlyError = error.name; }
   const classic = globalThis.stage2ClassicThis;
   return { moduleThisUndefined:receiver() === undefined, classicThisGlobal:classic(), undeclaredError, readonlyError, accidentalGlobal:Object.hasOwn(globalThis,'stage2UnDeclaredName') };
 },
 async '2.1.10'() {
   const target = new EventTarget();
   let events = 0, ticks = 0, active = false, dispose = () => {};
   function mount() {
     dispose();
     const controller = new AbortController();
     const timer = setInterval(() => ticks++, 10);
     target.addEventListener('ping', () => events++, { signal:controller.signal });
     active = true;
     dispose = () => { controller.abort(); clearInterval(timer); active = false; };
   }
   try {
     mount(); mount();
     target.dispatchEvent(new Event('ping'));
     const afterDoubleMount = events;
     await wait(40);
     dispose();
     const stoppedAt = ticks;
     target.dispatchEvent(new Event('ping'));
     await wait(50);
     return { afterDoubleMount, afterDispose:events, timerStopped:ticks === stoppedAt, active };
   } finally { dispose(); }
 },
 '2.1.11'() {
   if (!globalThis.Worker) return { supported:false, reason:'当前环境没有Worker，仍可阅读隔离与平台对照说明' };
   const source = [1,2,3];
   const worker = new Worker(new URL('./worker.mjs', import.meta.url), {type:'module'});
   return new Promise((resolve,reject) => {
     const timer = setTimeout(() => { worker.terminate(); reject(new Error('Worker未在期限内回传')); },4000);
     worker.onmessage = event => { clearTimeout(timer); worker.terminate(); resolve({...event.data, sourceFirst:source[0]}); };
     worker.onerror = event => { clearTimeout(timer); worker.terminate(); reject(new Error(event.message || 'Worker执行失败')); };
     worker.postMessage(source);
   });
 },
};
export async function runExperiment(id) {
  if (!Object.hasOwn(experiments,id)) throw new Error('Unknown lesson: '+id);
  return experiments[id]();
}
