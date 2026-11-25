const PREFIX = "compass-stage6-performance-";
const CACHE = `${PREFIX}v1`;
self.addEventListener("install", (event) =>
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(["./offline.html", "./cache-first.txt"]))
      .then(() => self.skipWaiting()),
  ),
);
self.addEventListener("activate", (event) =>
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith(PREFIX) && k !== CACHE)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  ),
);
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (
    event.request.method !== "GET" ||
    url.origin !== self.location.origin ||
    !url.pathname.startsWith("/sw-lab/")
  )
    return;
  if (url.pathname === "/sw-lab/cache-first.txt") {
    event.respondWith(
      caches.match(event.request).then((hit) => hit || fetch(event.request)),
    );
    return;
  }
  if (url.pathname === "/sw-lab/network-first.txt") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE);
        try {
          const response = await fetch(event.request);
          if (response.ok) await cache.put(event.request, response.clone());
          return response;
        } catch {
          const hit = await cache.match(event.request);
          return hit || new Response("offline missing", { status: 503 });
        }
      })(),
    );
    return;
  }
  if (event.request.mode === "navigate")
    event.respondWith(
      fetch(event.request).catch(() => caches.match("/sw-lab/offline.html")),
    );
});
