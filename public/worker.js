import { registerRoute } from "workbox-routing";
import {
  // NetworkFirst,
  // StaleWhileRevalidate,
  CacheFirst,
} from "workbox-strategies";

// Used for filtering matches based on status code, header, or both
import { CacheableResponsePlugin } from "workbox-cacheable-response";
// Used to limit entries in cache, remove entries after a certain period of time
import { ExpirationPlugin } from "workbox-expiration";

// Cache images with a Cache First strategy
registerRoute(
  // Check to see if the request's destination is style for an image
  ({ request }) => request.destination === "image",
  // Use a Cache First caching strategy
  new CacheFirst({
    // Put all cached files in a cache named 'images'
    cacheName: "cache_images",
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      // Don't cache more than 50 items, and expire them after 30 days
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
      }),
    ],
  })
);

/* eslint-disable no-restricted-globals */
var STATIC_CACHE_NAME = "gfg-pwa";
var DYNAMIC_CACHE_NAME = "dynamic-gfg-pwa";

// Add Routes and pages using React Browser Router
var urlsToCache = ["/", "/index.html", "../src/index.js"];

// Install a service worker
self.addEventListener("install", (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// // Cache and return requests
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       // Cache hit - return response
//       if (response) {
//         console.log("This is being returned from the service worker");
//         return response;
//       }
//       return fetch(event.request);
//     })
//   );
// });

// Cache and return requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      // If the file is not present in STATIC_CACHE,
      // it will be searched in DYNAMIC_CACHE
      return (
        cacheRes ||
        fetch(event.request).then((fetchRes) => {
          return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(event.request.url, fetchRes.clone());
            return fetchRes;
          });
        })
      );
    })
  );
  // if (!navigator.onLine) {
  //   if (
  //     event.request.url === `http://localhost:3000/static/js/main.chunk.js`
  //     // `${process.env.FRONTEND_URL}/static/js/main.chunk.js`
  //   ) {
  //     event.waitUntil(
  //       self.registration.showNotification("Offline", {
  //         body: "you are now offline",
  //         icon: "logo.png",
  //       })
  //     );
  //   }
  // }
  if (!navigator.onLine) {
    event.waitUntil(
      self.registration.showNotification("Offline", {
        body: "you are now offline",
        icon: "logo.png",
      })
    );
  }
});

// Update a service worker
self.addEventListener("activate", (event) => {
  var cacheWhitelist = ["gfg-pwa"];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        // eslint-disable-next-line array-callback-return
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
