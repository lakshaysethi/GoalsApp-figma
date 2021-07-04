fetch('/').then(console.log('fetchevent'))

const cacheName = 'goalsappcache';
const appShellFiles = [
  '/',
  './index.html',
  './arrow.png',
  './definations.js',
  './index.js',
  '/functions.js',
  '/style.css',
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
  });