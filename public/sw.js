const version = "3.8.0"
const whatchanged = 'really improved search;improved search;typo;changed cache policy;css; fix bug with task switching, add keyboard shortcut n ;fix bug save work;implemented search!  added nav item - show prioritize goals section; checkbox move item nav css and move down fix 2 fix css goal checkbox moved continue button up added keyboardshorts for navigation  added go deeper button and functionality'
const cacheName = 'goalsappcache';
const contentToCache = [
  '/arrow.png',
  '/data-sync-firebase-and-localStorage.js',
  '/definations.js',
  '/firebase.js',
  '/functions.js',
  '/goals.png',
  '/index.html',
  '/index.js',
  '/manifest.json',
  '/side-nav-style.css',
  '/style.css',
  '/sw.js',
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
