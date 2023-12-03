self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open('formhub-v1')
      .then(cache => cache.addAll([
          '/index.html',
          '/index.css',
          '/index.js'
      ]))
  );
});

self.addEventListener('fetch', (event) => {
  if (!event.request.url.includes(`/api/`)) {
    const request = (event.request.mode === 'navigate' ? 'index.html' : event.request);
    return event.respondWith(
        caches.match(request)
            .then((responseCache) => {
              if (responseCache) {
                return responseCache;
              }
              return fetch(request)
                  .then((responseFetch) => {
                    return caches.open('formhub-v1')
                        .then(cache => {
                          cache.put(request, responseFetch.clone());
                          return responseFetch;
                        });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
            })
    );
  }
  // return event.respondWith(
  //     fetch(event.request)
  //         .then((responseFetch) => {
  //           return caches.open('formhub-v1')
  //               .then(cache => {
  //                 cache.put(request, responseFetch.clone());
  //                 return responseFetch;
  //               });
  //         })
  //         .catch(() => {
  //           caches.match(event.request)
  //               .then((responseCache) => {
  //                 if (responseCache) {
  //                   return responseCache;
  //                 }
  //               })
  //         })
  // );
});

// self.addEventListener('fetch', (event) => {
//   const url = new URL(event.request.url);
//
//   if (url.pathname.endsWith('avatar')) {
//     event.respondWith(
//         fetch('http://localhost:8080/api/v1/user/user1/avatar')
//     );
//   }
// });
