import { precacheAndRoute } from 'workbox-precaching';
import cacheInitiator from './untils/cache-initiator';

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method == 'POST') return;
  event.respondWith(cacheInitiator.revalidateCache(event.request));
});
