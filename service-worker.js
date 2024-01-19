self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open("TEST").then((cache) => {
        return Promise.all([
          cache.add("./index.html").catch((error) => {
            console.error("Failed to cache ./index.html:", error);
          }),
          cache.add("./index.js").catch((error) => {
            console.error("Failed to cache ./index.js:", error);
          }),
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
  