const version = 6
const staticCacheName = `stat-booking-v${version}`
const dynamicCacheName = `dynam-booking-v${version}`

// const assetUrls = ['index.html', '/js/', '/img/']
const assetUrls = ['index.html', '/js/']

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(assetUrls)
    })
  )
})

self.addEventListener('activate', async (event) => {
  console.log('log from activate')
  // try {
  //   const cacheNames = await caches.keys()
  //   await Promise.all(
  //     cacheNames
  //       .filter((name) => name !== staticCacheName && name !== dynamicCacheName)
  //       .map((name) => caches.delete(name))
  //   )
  // } catch (e) {
  //   console.error(e)
  // }
})

const cacheFirst = async (request) => {
  const cached = await caches.match(request)
  return cached ?? (await fetch(request))
}

const networkFirst = async (request) => {
  const cache = await caches.open(dynamicCacheName)
  try {
    const response = await fetch(request)
    await cache.put(request, response.clone())
    return response
  } catch (e) {
    const cached = await cache.match(request)
    return cached ?? (await caches.match('/offline.html')) // изменить
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event

  const url = new URL(request.url)
  if (request.method !== 'GET') return
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request))
  } else {
    event.respondWith(networkFirst(request))
  }

  // другой вариант
  // if (request.method !== 'GET') return;
  // respondWith(async function() {
  //   // Пытаемся получить ответ из кеша.
  //   const cache = await caches.open(dynamicCacheName);
  //   const cachedResponse = await cache.match(request);
  //   if (cachedResponse) {
  //     // Если кеш был найден, возвращаем данные из него
  //     // и запускаем фоновое обновление данных в кеше.
  //     waitUntil(cache.add(request));
  //     return cachedResponse;
  //   }
  //   // В случае, если данные не были найдены в кеше, получаем их с сервера.
  //   return fetch(request);
  // }());
})
