self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open('formhub-v1')
      .then(cache => cache.addAll([
          '/index.html',
          '/index.css',
          '/index.js',
          '/resources/images/loading.gif'
      ]))
  );
});

self.addEventListener('fetch', (event) => {
  if (!event.request.url.includes(`/api/`)) {
    // Запрос на скачивание статических файлов (cache, потом fetch)
    const request = (event.request.mode === 'navigate' ? 'index.html' : event.request);
    return event.respondWith(
        caches.match(request)
            .then((responseCache) => {
              if (responseCache) {
                return responseCache;
              }
              return Promise.race([setTimeout('', 5000),
                fetch(request)
                  .then((responseFetch) => {
                    return caches.open('formhub-v1')
                        .then(cache => {
                          cache.put(request, responseFetch.clone());
                          return responseFetch;
                        });
                  })
                  .catch((err) => {
                    console.log(err);
                  })
              ]);
            })
    );
  }
  // Запрос на бекенд (сначала fetch, потом cache)
  return event.respondWith(
      Promise.race([setTimeout('', 5000),
      fetch(event.request)
          .then((responseFetch) => {
              if (event.request.method === 'GET') {
                  return caches.open('formhub-v1')
                      .then(cache => {
                          cache.put(event.request, responseFetch.clone());
                          return responseFetch;
                      });
              }
              return responseFetch;
          })
          .catch(() => {
            return caches.match(event.request)
                .then((responseCache) => {
                  if (responseCache) {
                    return responseCache;
                  }
                  return new Response(null, { status: 450, statusText: 'No Connection' });
                })
          })
      ])
  );
});

// Прикольчик с аватарками
// self.addEventListener('fetch', (event) => {
//   const url = new URL(event.request.url);
//
//   if (url.pathname.endsWith('avatar')) {
//     event.respondWith(
//         fetch('http://localhost:8080/api/v1/user/user1/avatar')
//     );
//   }
// });
