// Bump this version on every release so installed copies pick up the new files.
const CACHE_VERSION = "mood-tracker-v1";

// Relative paths only (GitHub Pages serves the app under /<repo-name>/)
const FILES = [
  "./",
  "index.html",
  "style.css",
  "app.js",
  "i18n.js",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

// Save all app files when the service worker is installed
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(function (cache) { return cache.addAll(FILES); })
  );
  self.skipWaiting();
});

// Delete caches from older versions
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names.filter(function (name) { return name !== CACHE_VERSION; })
             .map(function (name) { return caches.delete(name); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

// Answer from the cache first; fall back to the network. Only the app's own files.
self.addEventListener("fetch", function (event) {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then(function (cached) {
      return cached || fetch(request);
    })
  );
});
