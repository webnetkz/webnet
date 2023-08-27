self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-cache').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.php',
        '/public/img/layer-1.webp',
        '/public/img/layer-2.webp',
        '/public/img/layer-5.webp',
        '/public/img/layer-6.webp',
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
