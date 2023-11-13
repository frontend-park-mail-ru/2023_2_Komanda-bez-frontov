// self.addEventListener('activate', (event) => {
//   event.waitUntil(self.registration?.navigationPreload.enable());
// });
//
// const addResourcesToCache = async (resources) => {
//   const cache = await caches.open('FormHub_CACHE');
//   await cache.addAll(resources);
// };
//
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     addResourcesToCache([
//       '/',
//       '/forms/',
//       '/profile',
//       '/login',
//       '/signup',
//       './index.html',
//       './index.js',
//     ]),
//   );
// });
//
// const putInCache = async (request, response) => {
//   const cache = await caches.open('FormHub_CACHE');
//   await cache.put(request, response);
// };
//
// const cacheFirst = async (request) => {
//   const responseFromCache = await caches.match(request);
//
//   try {
//     const responseFromNetwork = await fetch(request);
//     if (responseFromNetwork.status < 400) {
//       if (request.method === 'GET') {
//         putInCache(request, responseFromNetwork.clone());
//       }
//       return responseFromNetwork;
//     }
//   } catch (error) {
//     // const fallbackResponse = await caches.match(fallbackUrl);
//     // if (fallbackResponse) {
//     //   return fallbackResponse;
//     // }
//     if (responseFromCache && request.method === 'GET') {
//       return responseFromCache;
//     }
//     return new Response({
//       status: 408,
//       headers: { 'Content-Type': 'text/plain' },
//     });
//   }
// };
//
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     cacheFirst(event.request),
//   );
// });

self.addEventListener('install', (event) => {
  console.log('Service worker Установлен');
});

self.addEventListener('activate', (event) => {
  console.log('Service worker Активирован');
});

self.addEventListener('fetch', (event) => {
  console.log('Service worker Происходит запрос на сервер');
});

const CACHE = 'FormHub-v1';
const timeout = 500;
// При установке воркера мы должны закешировать часть данных (статику).
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll([
      './index.css',
      './index.js',
    ])),
  );
});

// при событии fetch, мы и делаем запрос, но используем кэш, только после истечения timeout.
self.addEventListener('fetch', (event) => { // eslint-disable-next-line no-use-before-define
  event.respondWith(fromNetwork(event.request, timeout)
    .catch((err) => {
      console.log(`Error: ${err.message()}`);
      return fromCache(event.request);
    }));
});

// Временно-ограниченный запрос.
function fromNetwork(request, thisTimeout) {
  return new Promise((fulfill, reject) => {
    const timeoutId = setTimeout(reject, thisTimeout);
    fetch(request).then((response) => {
      clearTimeout(timeoutId);
      fulfill(response);
      putInCache(request, response);
    }, reject);
  });
}

function fromCache(request) {
// Открываем наше хранилище кэша (CacheStorage API), выполняем поиск запрошенного ресурса.
  return caches.open(CACHE).then((cache) => {
    cache.match(request).then((matching) => {
      matching || Promise.reject('no-match');
    });
  });
}

const putInCache = async (request, response) => {
  const cache = await caches.open(CACHE);
  await cache.put(request, response);
};
