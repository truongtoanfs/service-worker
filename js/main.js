if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./cache_site.js')
    .then(reg => console.log('Service worker: registered', reg))
  })
}