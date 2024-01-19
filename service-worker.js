self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("TEST").then((cache) => {
      // 将每个资源路径分别添加，以便更好地捕获错误
      return Promise.all([
        cache.add("./assest"),
        cache.add("./index.html"),
        cache.add("./index.js"),
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
