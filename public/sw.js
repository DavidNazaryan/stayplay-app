const CACHE_NAME = 'stayplay-v1'
const urlsToCache = [
  '/stayplay-app/',
  '/stayplay-app/manifest.json',
  '/stayplay-app/icon.svg'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Возвращаем кэшированную версию или загружаем из сети
        return response || fetch(event.request)
      })
  )
})



