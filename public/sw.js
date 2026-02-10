const CACHE_NAME = 'zenith-iot-v1'
const OFFLINE_URL = '/dashboard'

const STATIC_ASSETS = [
    '/',
    '/dashboard',
    '/favicon.ico',
]

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS)
        })
    )
    self.skipWaiting()
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            )
        })
    )
    self.clients.claim()
})

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(OFFLINE_URL)
            })
        )
        return
    }

    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((fetchResponse) => {
                if (fetchResponse.status === 200) {
                    const responseClone = fetchResponse.clone()
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone)
                    })
                }
                return fetchResponse
            })
        })
    )
})
