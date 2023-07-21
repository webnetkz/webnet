self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/public/img/layer-1.jpg',
        '/public/img/layer-2.png',
        '/public/img/layer-5.png',
        '/public/img/layer-6.png',
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
