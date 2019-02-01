/* global self, caches, fetch */
const CACHE_NAME = 'go7-cache-v1.0'

const REQUIRED_FILES = [
  '/',
  '/bundle.js',
  '/cache.js',
  '/favicon.ico',
  '/fonts/roboto-v18.css',
  '/fonts/KFOkCnqEu92Fr1Mu51xIIzI.woff2',
  '/fonts/KFOlCnqEu92Fr1MmWUlfBBc4.woff2',
  '/fonts/KFOmCnqEu92Fr1Mu4mxK.woff2',
  '/manifest.json',
  '/media/logo-16x16.png',
  '/media/logo-32x32.png',
  '/media/logo-36x36.png',
  '/media/logo-48x48.png',
  '/media/logo-72x72.png',
  '/media/logo-96x96.png',
  '/media/logo-120x120.png',
  '/media/logo-128x128.png',
  '/media/logo-144x144.png',
  '/media/logo-152x152.png',
  '/media/logo-180x180.png',
  '/media/logo-192x192.png',
  '/media/logo-256x256.png',
  '/media/logo-512x512.png',
  '/media/logo.svg',
  '/style.css'
]

let cache = null

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(currentCache => {
      // Store a reference to current cache, to be used on fetch event handler.
      cache = currentCache

      cache.addAll(REQUIRED_FILES)
    }).catch(error => {
      console.error('cache install', error)
    })
  )
})

// Cache and update.
self.addEventListener('fetch', event => {
  const { request } = event

  return cache.match(request).then(matching => {
    if (matching) {
      event.respondWith(() => matching)

      event.waitUntil(() => {
        return fetch(request).then(response => {
          return cache.put(request, response)
        }).catch(error => {
          console.error('cache update', error)
        })
      })
    } else {
      event.waitUntil(() => {
        return fetch(request).then(response => {
          return cache.put(request, response)
        }).catch(error => {
          console.error(error)
        })
      })
    }
  }).catch(ignore => {})
})

// Clean up caches other than current.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          const deleteThisCache = cacheName !== CACHE_NAME

          return deleteThisCache
        }).map(cacheName => {
          console.log(`deleted cache: ${cacheName}`)

          caches.delete(cacheName)
        })
      )
    })
  )
})
