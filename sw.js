const version = "3.1.1";
const whatchanged = 'added firebase auth and firestore fixed display none, added closeNav() '
const cacheName = 'goalsappcache';
const contentToCache = [
  '/',
  '/index.html',
  '/arrow.png',
  '/definations.js',
  '/index.js',
  '/functions.js',
  '/style.css',
  '/side-nav-style.css',
];
self.addEventListener('activate', e => self.clients.claim());

// the event handler for the install event 
// typically used to cache assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(contentToCache))
  );
});

// the fetch event handler, to intercept requests and serve all 
// static assets from the cache
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
    .then(response => response ? response : fetch(e.request))
  )
});