/* eslint-disable no-restricted-globals */
const CACHE_NAME = "todo-list-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/static/js/bundle.js", // Assurez-vous que le chemin est correct
  "/static/js/vendors~main.chunk.js", // Assurez-vous que le chemin est correct
  "/static/css/main.chunk.css", // Assurez-vous que le chemin est correct
];

// Installation du service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Récupération des ressources
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Vérifiez si la ressource est dans le cache
      if (response) {
        return response; // Si elle est dans le cache, renvoyez-la
      }
      return fetch(event.request); // Sinon, récupérez-la depuis le réseau
    })
  );
});

// Mise à jour du cache
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Supprimez les anciens caches
          }
        })
      );
    })
  );
});
