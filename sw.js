'use strict';

const CACHE_VERSION = 'v3';
const scope = new URL(self.registration.scope);
const cachePrefix = 'pontonowy-splyw:' + scope.pathname + ':';
const cacheName = cachePrefix + CACHE_VERSION;
const indexUrl = new URL('index.html', scope);
const assetUrls = new Set([
  'manifest.webmanifest',
  'icon-192.png',
  'icon-512.png',
  'apple-touch-icon.png'
].map(file => new URL(file, scope).href));

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    const files = [indexUrl.href, ...assetUrls];
    await cache.addAll(files.map(url => new Request(url, {cache: 'reload'})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith(cachePrefix) && key !== cacheName)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const {request} = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const gamePage = request.mode === 'navigate' && url.origin === scope.origin
    && (url.pathname === scope.pathname || url.pathname === indexUrl.pathname);
  if (!gamePage && !assetUrls.has(url.href)) return;

  event.respondWith((async () => {
    let response;
    try {
      response = await fetch(request);
      if (response.status < 500) return response;
    } catch {
      // The game can load from the installed cache when the network is unavailable.
    }

    const cache = await caches.open(cacheName);
    return await cache.match(gamePage ? indexUrl.href : url.href)
      ?? response ?? Response.error();
  })());
});
