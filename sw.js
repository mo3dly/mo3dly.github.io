const CACHE_NAME = "mo3dly-v1.5";

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

  "/faq/",
  "/sec/",
  "/mid/",

  "/404.html",

  "/grades/7/",
  "/grades/8/",
  "/grades/9/",
  "/grades/10/",
  "/grades/11/",
  "/grades/12/",

  "/js/gpa.js",
  "/css/gpa.css",
  "/calc/gpa/"
];

// ================= INSTALL =================
self.addEventListener("install", event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      for (const asset of STATIC_ASSETS) {
        try {
          await cache.add(asset);
        } catch (e) { }
      }
    })
  );
});

// ================= ACTIVATE =================
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
    )
  );

  self.clients.claim();
});

// ================= FETCH =================
self.addEventListener("fetch", event => {
  const req = event.request;
  const url = new URL(req.url);

  if (
    req.mode === "navigate" ||
    url.pathname.endsWith("/") ||
    url.pathname.endsWith(".html")
  ) {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
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
      caches.match(req).then(cached => {
        if (cached) return cached;

        return fetch(req).then(res => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          }
          return res;
        });
      })
    );
    return;
  }

  event.respondWith(fetch(req));
});