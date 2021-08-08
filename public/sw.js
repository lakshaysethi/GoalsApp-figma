const version = "3.5.1";
const whatchanged = 'checkbox move item nav css and move down fix 2 fix css goal checkbox moved continue button up added keyboardshorts for navigation  added go deeper button and functionality'
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