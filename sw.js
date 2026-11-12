/* Service worker aplikacji „Inwentaryzacja energetyczna” – tylko pliki aplikacji z tej samej witryny (cache-first).
   Nie obsługuje żądań do innych domen ani spoza zakresu aplikacji; dane użytkownika (baza danych przeglądarki) nie trafiają do cache. */
'use strict';
const WERSJA = '1.2-86d5cde017';
const CACHE = 'inwentaryzacja-' + WERSJA;
const PLIKI = ["./", "./index.html", "./manifest.webmanifest", "./ikona-192.png", "./ikona-512.png", "./ikona-maskable-512.png"];
const ZAKRES = new URL('./', self.location).pathname;
const SCIEZKI = new Set(PLIKI.map(p => new URL(p, self.location).pathname));

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PLIKI.map(p => new Request(p, {cache: 'reload'})))));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(k => Promise.all(k.filter(n => n.startsWith('inwentaryzacja-') && n !== CACHE).map(n => caches.delete(n))))
    .then(() => self.clients.claim()));
});
self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin !== self.location.origin || !u.pathname.startsWith(ZAKRES)) return;   // inne domeny / spoza zakresu
  const sciezka = r.mode === 'navigate' ? ZAKRES : u.pathname;
  if (!SCIEZKI.has(sciezka)) return;                                                  // tylko pliki aplikacji
  e.respondWith(caches.open(CACHE).then(c => c.match(sciezka).then(z => z || fetch(r).then(odp => {
    if (odp && odp.ok && odp.type === 'basic') c.put(sciezka, odp.clone());
    return odp;
  }))));
});
