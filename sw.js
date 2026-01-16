const CACHE_NAME = "mo3dly-v1.1";

const ASSETS = [
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

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      for (const asset of ASSETS) {
        try {
          await cache.add(asset);
        } catch (e) {

        }
      }
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        return cached;
      }

      return fetch(event.request).catch(() => {
        if (event.request.mode === "navigate") {
          return caches.match("/404.html");
        }
      });
    })
  );
});