const version = 5
const staticCacheName = `static-booking-v${version}`
const dynamicCacheName = `dynamic-booking-v${version}`

const assetUrls = ['index.html', '/js/', '/img/']

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(assetUrls)
    })
  )
})

self.addEventListener('activate', async (event) => {
  const cacheNames = await caches.keys()
  await Promise.all(
    cacheNames
      .filter((name) => name !== staticCacheName && name !== dynamicCacheName)
      .map((name) => caches.delete(name))
  )
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

self.addEventListener('notificationclick', async (event) => {
  if (event.action === 'log') {
    console.log('Вы нажали на кнопку уведомления. А это просто текст')
    await fetch('https://api.jsonbin.io/v3/b/610ba3b2f098011544ab9c36', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key':
          '$2b$10$jg/vdrqjqXai8GGpUvKii.Q3DvClvOa3KapnRq6DlC2FgE7wUQKIW',
      },
      body: JSON.stringify({
        test: 'test',
      }),
    })
  }

  // API: 'https://api.jsonbin.io/v3/b/610ba3b2f098011544ab9c36',
  // API_KEY: '$2b$10$jg/vdrqjqXai8GGpUvKii.Q3DvClvOa3KapnRq6DlC2FgE7wUQKIW',
  // HEADERS: {
  //   'Content-Type': 'application/json',
  //   'X-Master-Key':
  //     '$2b$10$jg/vdrqjqXai8GGpUvKii.Q3DvClvOa3KapnRq6DlC2FgE7wUQKIW',
  // },
})

self.addEventListener('push', (event) => {
  const data = event.data.json()
  const notificationPromise = self.registration.showNotification(data.title, {
    ...data,
  })
  event.waitUntil(notificationPromise)
})

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
