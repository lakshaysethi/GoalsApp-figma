const version = "3.2";
const whatchanged = 'keyboard shortcuts added firebase auth and firestore fixed display none, added closeNav() '
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

// network first cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});