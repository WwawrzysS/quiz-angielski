const CACHE_NAME = "quiz-angielski-v0-1";

const APP_SHELL = [
  "./",
  "./index.html",
  "./styl.css?v=quiz-v01",
  "./skrypt.js?v=quiz-v01",
  "./apk-fix.js?v=quiz-v01",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./pobierz.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL).catch(() => null))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Dla HTML/JS/CSS najpierw sieć, żeby aktualizacje na GitHub szybko wchodziły.
  if (url.origin === location.origin && /\.(html|js|css)$/.test(url.pathname)) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then(cached => cached || caches.match("./index.html")))
    );
    return;
  }

  // Dla grafik i pozostałych plików: cache, a potem sieć.
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (url.origin === location.origin) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
