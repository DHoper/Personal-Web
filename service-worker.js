// service-worker.js

self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('TEST').then((cache) => {
        return cache.addAll([
          '//assets',
          '/index.html'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  