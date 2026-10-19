/* Service worker de Pericias Contables.
   - La app (index.html, manifest, íconos) se busca SIEMPRE primero en internet,
     así cada cambio subido a GitHub aparece solo, sin Ctrl+Shift+R.
     Si no hay conexión, se abre la última versión guardada.
   - Los datos (api.github.com), la IA (Cloudflare Worker) y config.enc.json
     nunca pasan por la caché: siempre van directo a internet. */
const CACHE = 'pericias-app-v2';
const APP_SHELL = ['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;          // GitHub API, Worker, fuentes: directo a la red
  if (url.pathname.endsWith('config.enc.json')) return;      // configuración cifrada: siempre fresca
  if (url.pathname.endsWith('pericias.json')) return;

  event.respondWith(
    fetch(req, { cache: 'no-store' })
      .then((res) => {
        if (res.ok) {
          const copia = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copia));
        }
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
  );
});
