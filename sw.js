// Nome do cache
const CACHE_NAME = 'v1_cache';

// Arquivos que serão armazenados em cache
const urlsToCache = [
  '/',
  '/index.html',
  '/detalhes.html',
  '/manifest.json',
  '/styles.css', // Se tiver um arquivo de estilos CSS
  '/sw.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Instalando o service worker e armazenando no cache
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// Interceptando as requisições para servir conteúdo do cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// Atualizando o cache (ativação do novo Service Worker)
self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
