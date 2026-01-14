const CACHE_NAME = "mo3dly-v1.0";

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
  "/grades/12/"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});