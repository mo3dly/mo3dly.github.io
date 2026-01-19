const CACHE_NAME = "mo3dly-v2.0";

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/css/404.css",
  "/css/faq.css",
  "/css/main.css",
  "/css/style.css",
  "/js/logic.js",
  "/js/nav.js",
  "/fonts/arabic-wght-normal.woff2",
  "/icons/mo3dly.ico",
  "/icons/mo3dly.png",
  "/icons/mo3dly.webp",
  "/subjects/7.js",
  "/subjects/8.js",
  "/subjects/9.js",
  "/subjects/10.js",
  "/subjects/11.js",
  "/subjects/12.js",
  "/faq/index.html",
  "/sec/index.html",
  "/mid/index.html",
  "/404.html",
  "/grades/7/index.html",
  "/grades/8/index.html",
  "/grades/9/index.html",
  "/grades/10/index.html",
  "/grades/11/index.html",
  "/grades/12/index.html",
  "/js/gpa.js",
  "/css/gpa.css",
  "/calc/gpa/index.html"
];

self.addEventListener("install", event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      for (const asset of STATIC_ASSETS) {
        try {
          await cache.add(asset);
        } catch (e) {}
      }
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  const url = new URL(req.url);

  if (!req.url.startsWith("http")) return;
  if (url.origin !== location.origin) return;

  if (
    req.mode === "navigate" ||
    url.pathname.endsWith("/") ||
    url.pathname.endsWith(".html")
  ) {
    event.respondWith(
      fetch(req)
        .then(res => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          }
          return res;
        })
        .catch(() =>
          caches.match(req).then(r => r || caches.match("/404.html"))
        )
    );
    return;
  }

  if (
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".woff2") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".webp") ||
    url.pathname.endsWith(".ico")
  ) {
    event.respondWith(
      fetch(req)
        .then(res => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  event.respondWith(
    fetch(req).catch(() => caches.match(req))
  );
});