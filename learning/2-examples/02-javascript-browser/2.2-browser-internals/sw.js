const CACHE='webdev-stage2-browser-v1';
const target=new URL('./sw-sample.json',self.location.href).href;
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.add(target)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(self.clients.claim())});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||event.request.url!==target)return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  try{const response=await fetch(event.request);if(!response.ok)throw new Error('HTTP '+response.status);await cache.put(target,response.clone());return response}
  catch(error){const stored=await cache.match(target);if(!stored)throw error;const headers=new Headers(stored.headers);headers.set('X-Stage2-Source','cache');return new Response(await stored.arrayBuffer(),{status:stored.status,headers})}
 })());
});
