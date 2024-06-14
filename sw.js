self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-cache').then(function (cache) {
      return cache.addAll([
        '/',
        '/index',
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
