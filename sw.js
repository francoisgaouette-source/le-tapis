// Service worker : garde l'interface en cache pour qu'elle s'ouvre vite et hors ligne (les règles marchent sans réseau).
// Les données du groupe viennent toujours de Supabase, jamais de ce cache.
const CACHE = "donne-v6";
const SHELL = ["./", "index.html", "style.css", "app.js", "jeux.js", "holdingai.js", "config.js", "manifest.webmanifest", "icons/icon.svg", "icons/icon-192.png"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((x) => x !== CACHE).map((x) => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== self.location.origin) return;
  // Réseau d'abord (pour recevoir les mises à jour), cache si hors ligne
  e.respondWith(fetch(e.request)
    .then((res) => { const copie = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copie)); return res; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match("index.html"))));
});
