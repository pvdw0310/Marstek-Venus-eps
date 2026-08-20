/* Venus EPS — service worker
   Cachet de volledige app zodat hij ook zonder internet opent
   (Bluetooth zelf heeft sowieso geen netwerk nodig). */
const CACHE = "venus-eps-v2";
const BESTANDEN = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(BESTANDEN)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* Cache-first: app opent altijd meteen, ook offline.
   Op de achtergrond wordt een verse versie opgehaald voor de volgende keer. */
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((hit) => {
      const vers = fetch(e.request)
        .then((resp) => {
          if (resp && resp.ok) {
            const kopie = resp.clone();
            caches.open(CACHE).then((c) => c.put(e.request, kopie));
          }
          return resp;
        })
        .catch(() => hit);
      return hit || vers;
    })
  );
});
