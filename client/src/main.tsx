import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG, NOT_ADMIN_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";

import { getLoginUrl } from "./const";
import { ThemeProvider } from "./contexts/ThemeContext";
// CRITICAL: Pre-import LanguageContext and useLocalizedPath to ensure they're in main chunk
// These imports force the modules to be included in the main bundle
import "./contexts/LanguageContext";
import "./hooks/useLocalizedPath";
import { initSentry } from "./lib/sentry";
import { initWebVitals } from "./lib/webVitals";
import { logger } from "./lib/logger";

// Initialize Sentry for client-side error monitoring
initSentry();

// Désactiver la restauration du scroll par le navigateur le plus tôt possible (évite de rester en milieu de page à l'ouverture d'un projet)
if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// CSS is loaded normally - Vite handles optimization and code splitting
// Critical CSS is inlined in index.html to prevent render blocking
// Non-critical CSS (admin) is split into separate chunks
// Note: Vite will extract CSS into separate files and optimize loading
import "./index.css";

const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const msg = error.message;
  if (msg === UNAUTHED_ERR_MSG) {
    window.location.href = getLoginUrl();
    return;
  }
  if (msg === NOT_ADMIN_ERR_MSG) {
    if (window.location.pathname.startsWith('/admin') && !window.location.pathname.startsWith('/admin/login')) {
      const from = encodeURIComponent(window.location.pathname);
      window.location.href = `/admin/login?from=${from}`;
    }
    return;
  }
};

// Optimize error handling - only log in development
const isDev = process.env.NODE_ENV === 'development';

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    // Ne pas rediriger ici sur 403 admin : les guards (ProtectedAdminRoute / AdminRoute) gèrent l'auth.
    // Une redirection globale provoquait un clignotement infini (analytics, etc.) en boucle avec /admin/login.
    if (isDev && error instanceof TRPCClientError && error.message !== NOT_ADMIN_ERR_MSG) {
      logger.tagged('API').error("Query Error", error);
    }
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    // Ne pas rediriger sur erreur de mutation (403 admin) : l'utilisateur reste sur la page
    // et voit le toast d'erreur ; évite que "supprimer un logo" ramène à l'accueil admin.
    if (isDev && error instanceof TRPCClientError && error.message !== NOT_ADMIN_ERR_MSG) {
      logger.tagged('API').error("Mutation Error", error);
    }
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

// Render immediately - optimize for LCP
// Fragment long tasks by yielding to browser between renders
const root = createRoot(rootElement, {
  // Use concurrent features to allow browser to yield
  // This helps fragment long tasks into smaller chunks
  unstable_transitionCallbacks: undefined,
});

// Body is now visible by default in index.html, so we don't need to show it here
// But we keep this for compatibility with any code that checks for 'loaded' class
if (!document.body.classList.contains('loaded')) {
  document.body.classList.add('loaded');
}

// Render with automatic yielding - React 18+ handles this automatically
// The concurrent root allows React to yield to browser during rendering
root.render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" switchable={true}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </trpc.Provider>
);

// Global error handler for chunk loading failures
// This catches any chunk loading errors that might not be handled by lazyWithRetry
if (typeof window !== 'undefined') {
  // Track reload attempts to prevent infinite loops
  const MAX_RELOAD_ATTEMPTS = 3;
  const RELOAD_KEY = 'nukleo_chunk_reload_attempts';
  
  window.addEventListener('error', (event) => {
    const error = event.error || event.message;
    const errorMessage = error?.message || event.message || '';
    const isChunkError = 
      error instanceof TypeError &&
      (errorMessage.includes('Failed to fetch dynamically imported module') ||
       errorMessage.includes('Loading chunk') ||
       errorMessage.includes('Loading CSS chunk') ||
       errorMessage.includes('import()') ||
       errorMessage.includes('chunk'));
    
    if (isChunkError) {
      // Check reload attempts
      const attempts = parseInt(sessionStorage.getItem(RELOAD_KEY) || '0', 10);
      
      if (attempts >= MAX_RELOAD_ATTEMPTS) {
        console.error('[Global Error Handler] Max reload attempts reached. Showing error page.');
        sessionStorage.removeItem(RELOAD_KEY);
        // Show a user-friendly error message
        document.body.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; text-align: center; font-family: 'Plus Jakarta Sans', sans-serif;">
            <div>
              <h1 style="font-size: 24px; margin-bottom: 16px;">Une erreur s'est produite</h1>
              <p style="margin-bottom: 24px; color: #666;">Le chargement de la page a échoué. Veuillez réessayer.</p>
              <button onclick="window.location.reload()" style="padding: 12px 24px; background: #000; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
                Recharger la page
              </button>
            </div>
          </div>
        `;
        return;
      }
      
      if (import.meta.env.DEV) {
        console.warn('[Global Error Handler] Chunk loading failed, reloading page...', error || event.message);
      }
      
      event.preventDefault(); // Prevent default error handling
      
      // Increment reload attempts
      sessionStorage.setItem(RELOAD_KEY, String(attempts + 1));
      
      // Clear service worker cache if available
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller && 'caches' in window) {
        window.caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            window.caches.delete(cacheName);
          });
        }).catch(() => {
          // Ignore cache deletion errors
        });
      }
      
      // CRITICAL: For chunk loading errors, immediately clear ALL caches and reload
      // This ensures we get the latest HTML that matches available chunks
      Promise.all([
        // Clear all caches
        'caches' in window ? window.caches.keys().then(names => 
          Promise.all(names.map(name => window.caches.delete(name)))
        ) : Promise.resolve(),
        // Unregister service worker if present
        'serviceWorker' in navigator && navigator.serviceWorker.controller 
          ? navigator.serviceWorker.getRegistrations().then(registrations =>
              Promise.all(registrations.map(reg => reg.unregister()))
            )
          : Promise.resolve(),
      ]).then(() => {
        // Force hard reload with cache bypass
        const currentUrl = window.location.href;
        const separator = currentUrl.includes('?') ? '&' : '?';
        // Use location.replace to avoid adding to history
        window.location.replace(`${currentUrl.split('?')[0]}${separator}_reload=${Date.now()}&_nocache=1`);
      }).catch(() => {
        // If cache clearing fails, still reload
        const currentUrl = window.location.href;
        const separator = currentUrl.includes('?') ? '&' : '?';
        window.location.replace(`${currentUrl.split('?')[0]}${separator}_reload=${Date.now()}&_nocache=1`);
      });
    }
  }, true); // Use capture phase to catch errors early
  
  // Reset reload attempts on successful page load
  window.addEventListener('load', () => {
    // Clear reload attempts after a successful load
    setTimeout(() => {
      sessionStorage.removeItem(RELOAD_KEY);
    }, 1000);
  });
}

// Optimize LCP - show inline SVG immediately if present
// Use requestIdleCallback to avoid blocking initial render
if (typeof window !== 'undefined') {
  const showInlineSVG = () => {
    const svg = document.getElementById('nukleo-arrow-inline');
    if (svg) {
      svg.style.display = 'block';
    }
  };
  
  if ('requestIdleCallback' in window) {
    requestIdleCallback(showInlineSVG, { timeout: 500 });
  } else {
    setTimeout(showInlineSVG, 0);
  }
  
  // Load non-critical fonts lazily after initial render
  // Use a more reliable method that doesn't block rendering
  const loadNonCriticalFonts = () => {
    // Only load if fonts-lazy.css exists and hasn't been loaded
    if (document.querySelector('link[href="/fonts-lazy.css"]')) return;
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/fonts-lazy.css';
    link.media = 'print';
    link.onload = () => { 
      if (link.media === 'print') {
        link.media = 'all';
      }
    };
    link.onerror = () => {
      // Silently fail if fonts-lazy.css doesn't exist
      if (import.meta.env.DEV) {
        console.warn('fonts-lazy.css failed to load');
      }
    };
    document.head.appendChild(link);
  };
  
  // Load after a longer delay to ensure it doesn't interfere with LCP
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadNonCriticalFonts, { timeout: 3000 });
  } else {
    setTimeout(loadNonCriticalFonts, 3000);
  }

  // Initialize Web Vitals monitoring after page load
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      initWebVitals();
    }, { timeout: 2000 });
  } else {
    setTimeout(() => {
      initWebVitals();
    }, 2000);
  }
}
