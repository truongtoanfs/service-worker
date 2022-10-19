const cacheName = 'v2';

self.addEventListener('install', (e) => {
  console.log('Service worker: Installed');
})

self.addEventListener('activate', (e) => {
  console.log('Service worker: actived');
  // remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      )
    })
  )
})

self.addEventListener('fetch', e => {
  console.log('Server Worker: Fetching');
  e.respondWith(fetch(e.request).then((res) => {
    // mache copy/clone of response
    const resClone = res.clone();
    caches.open(cacheName)
    .then(cache => {
      cache.put(e.request, resClone);
    })
    return res;
  }))?.catch(err => caches.match(e.request).then(res => res));
})