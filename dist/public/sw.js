// Service Worker for Nukleo Digital
// Provides offline caching and performance improvements
// Enhanced with better error handling and stability

const CACHE_NAME = 'nukleo-digital-v3';
const MAX_CACHE_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/Nukleo_blanc_RVB.svg',
  '/nukleo-arrow.svg',
  '/fonts/AktivGrotesk-Light.woff2',
  '/fonts/AktivGrotesk-Regular.woff2',
  '/fonts/AktivGrotesk-Bold.woff2',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/icon-192x192.png',
  '/manifest.json',
];

// Install event - cache static assets with improved error handling
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Cache assets one by one to prevent single failure from blocking all
        return Promise.allSettled(
          STATIC_ASSETS.map((asset) =>
            cache.add(asset).catch((err) => {
              // Log but don't fail - individual asset failures shouldn't block SW install
              if (typeof self !== 'undefined' && self.location?.hostname === 'localhost') {
                console.warn(`[SW] Failed to cache asset: ${asset}`, err);
              }
              return null; // Return null instead of throwing
            })
          )
        );
      })
      .then((results) => {
        const failures = results.filter((r) => r.status === 'rejected').length;
        if (failures > 0 && typeof self !== 'undefined' && self.location?.hostname === 'localhost') {
          console.warn(`[SW] ${failures} assets failed to cache, but SW will still activate`);
        }
      })
      .catch((err) => {
        // Even if caching fails completely, activate the SW
        if (typeof self !== 'undefined' && self.location?.hostname === 'localhost') {
          console.error('[SW] Install failed, but activating anyway:', err);
        }
      })
  );
  self.skipWaiting(); // Activate immediately
});

// Activate event - clean up old caches with improved error handling
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        // Delete old caches, but don't fail if deletion fails
        return Promise.allSettled(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) =>
              caches.delete(name).catch((err) => {
                if (typeof self !== 'undefined' && self.location?.hostname === 'localhost') {
                  console.warn(`[SW] Failed to delete old cache: ${name}`, err);
                }
                return false; // Continue even if deletion fails
              })
            )
        );
      })
      .then(() => {
        // Clean up expired cache entries
        return caches.open(CACHE_NAME).then((cache) => {
          return cache.keys().then((keys) => {
            const now = Date.now();
            return Promise.allSettled(
              keys.map((request) => {
                return cache.match(request).then((response) => {
                  if (response) {
                    const dateHeader = response.headers.get('date');
                    if (dateHeader) {
                      const cachedDate = new Date(dateHeader).getTime();
                      if (now - cachedDate > MAX_CACHE_AGE) {
                        return cache.delete(request);
                      }
                    }
                  }
                  return Promise.resolve();
                });
              })
            );
          });
        });
      })
      .catch((err) => {
        // Log but don't fail activation
        if (typeof self !== 'undefined' && self.location?.hostname === 'localhost') {
          console.error('[SW] Activate cleanup failed:', err);
        }
      })
  );
  self.clients.claim(); // Take control of all pages immediately
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip non-HTTP(S) requests (chrome-extension, etc.)
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Skip API requests
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // Skip admin routes
  if (url.pathname.startsWith('/admin')) {
    return;
  }

  // Skip external resources that shouldn't be cached (Google Fonts, etc.)
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    return;
  }

  // Cache strategy: Stale-While-Revalidate for better performance
  if (
    url.pathname.match(/\.(js|css|woff2?|png|jpg|jpeg|svg|webp|ico)$/) ||
    url.pathname.startsWith('/assets/')
  ) {
    // Static assets: Stale-While-Revalidate (serve from cache immediately, update in background)
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          // Start fetching fresh version in background
          const fetchPromise = fetch(request).then((networkResponse) => {
            // CRITICAL: Don't cache 404 responses (missing chunks)
            // This prevents caching chunks that don't exist, which causes chunk loading errors
            if (networkResponse && networkResponse.status === 404) {
              // If we have a cached version, use it (might be from previous build)
              // But don't cache the 404 response
              if (cachedResponse) {
                return cachedResponse;
              }
              // If no cached version and 404, return the 404 to trigger error handler
              return networkResponse;
            }
            
            // Don't cache non-successful responses or non-HTTP requests
            if (networkResponse && networkResponse.status === 200 && request.url.startsWith('http')) {
              try {
                cache.put(request, networkResponse.clone());
              } catch (err) {
                // Ignore cache errors (e.g., chrome-extension://)
                if (typeof self !== 'undefined' && self.location?.hostname === 'localhost') {
                  console.warn('[SW] Failed to cache:', request.url, err);
                }
              }
            }
            return networkResponse;
          }).catch((error) => {
            // Network error - use cached version if available
            if (cachedResponse) {
              return cachedResponse;
            }
            // If no cache and network fails, let the error propagate to trigger error handler
            throw error;
          });
          
          // Return cached version immediately if available, otherwise wait for network
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else {
    // Pages: Network-First with Cache Fallback
    // For HTML pages, always try network first to get latest chunks references
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(request).then((networkResponse) => {
          // Cache successful responses (only HTTP requests)
          if (networkResponse && networkResponse.status === 200 && request.url.startsWith('http')) {
            try {
              cache.put(request, networkResponse.clone());
            } catch (err) {
              // Ignore cache errors (e.g., chrome-extension://)
              if (typeof self !== 'undefined' && self.location?.hostname === 'localhost') {
                console.warn('[SW] Failed to cache:', request.url, err);
              }
            }
          }
          return networkResponse;
        }).catch(() => {
          // If network fails, try cache
          return cache.match(request).then((cachedResponse) => {
            // Fallback to index.html for SPA routing if no cache
            if (!cachedResponse && request.mode === 'navigate') {
              return cache.match('/index.html');
            }
            return cachedResponse || null;
          });
        });
      })
    );
  }
});

