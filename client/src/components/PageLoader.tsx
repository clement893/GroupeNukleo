import { useEffect, useState, useRef, useMemo } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useIsMobile } from "@/hooks/useIsMobile";
import { sanitizeLoaderHTML, sanitizeLoaderDOM } from "@/utils/htmlSanitizer";
import SafeHTML from "@/components/SafeHTML";

// Preload critical resources during loader display
function preloadResources() {
  // Preload only assets used immediately by the loader UI (avoid "preloaded but not used" warning)
  const criticalImages = [
    '/nukleo-arrow.svg',
    '/leo-avatar.webp',
  ];
  // Nukleo_blanc_RVB.svg not preloaded here - used only after loader or on admin; load on demand to avoid console warning
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });

  // Preload critical fonts if not already loaded (Neue Haas Unica Pro = police principale)
  const fontsWoff2 = [
    '/fonts/AktivGrotesk-Regular.woff2',
    '/fonts/AktivGrotesk-Medium.woff2',
    '/fonts/AktivGrotesk-Bold.woff2',
  ];
  const fontsTtf = [
    '/fonts/NeueHaasUnicaPro-Regular.ttf',
    '/fonts/NeueHaasUnicaPro-Medium.ttf',
    '/fonts/NeueHaasUnicaPro-Bold.ttf',
  ];
  fontsWoff2.forEach(font => {
    if (!document.querySelector(`link[href="${font}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = font;
      document.head.appendChild(link);
    }
  });
  fontsTtf.forEach(font => {
    if (!document.querySelector(`link[href="${font}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/ttf';
      link.crossOrigin = 'anonymous';
      link.href = font;
      document.head.appendChild(link);
    }
  });
}

export default function PageLoader() {
  const [location] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [loaderHtml, setLoaderHtml] = useState<string | null>(null);
  const [stylesReady, setStylesReady] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const prevLocationRef = useRef(location);

  // Don't show loader in admin area or manifesto page - memoized
  const shouldSkipLoader = useMemo(() => {
    const isAdminArea = location.startsWith("/admin");
    const isManifestoPage = location === "/manifesto" || location === "/fr/manifesto" || location.startsWith("/manifesto/") || location.startsWith("/fr/manifesto/");
    return isAdminArea || isManifestoPage;
  }, [location]);

  // Body is now visible by default in index.html, so we don't need to show it here
  // But we keep this for compatibility with any code that checks for 'loaded' class
  useEffect(() => {
    // Ensure body has loaded class for compatibility
    if (!document.body.classList.contains('loaded')) {
      document.body.classList.add('loaded');
    }
  }, []);

  // If in admin area or manifesto page, show body immediately and don't fetch loaders
  useEffect(() => {
    if (shouldSkipLoader) {
      setIsLoading(false);
      if (!document.body.classList.contains('loaded')) {
        document.body.classList.add('loaded');
      }
    }
  }, [shouldSkipLoader]);

  // Fetch active loaders (only if not in admin area or manifesto page)
  // Use lower priority on mobile to improve initial load
  const isMobile = useIsMobile(768);
  
  const { data: activeLoaders, isLoading: isLoadingLoaders, error: loadersError } = trpc.loaders.getActive.useQuery(undefined, {
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
    enabled: !shouldSkipLoader && !isMobile, // Skip loader fetch on mobile for better performance
    // Reduce timeout on mobile for faster fallback
    retry: isMobile ? 0 : 1, // Reduce retries to fail faster
    // Reduce timeout - fail fast if API is slow
    gcTime: isMobile ? 0 : 5 * 60 * 1000,
    // Add timeout to fail fast if API doesn't respond
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  // Ensure activeLoaders is always an array to prevent .map() errors
  // Also handle undefined/null cases explicitly
  const safeActiveLoaders = (activeLoaders && Array.isArray(activeLoaders)) ? activeLoaders : [];

  // Preload resources as soon as component mounts
  useEffect(() => {
    if (!shouldSkipLoader) {
      preloadResources();
    }
  }, [shouldSkipLoader]);

  useEffect(() => {
    // Check if this is a page transition (not first load)
    const locationChanged = prevLocationRef.current !== location;
    const isPageTransition = locationChanged && !isFirstLoad;
    
    // Update previous location ref
    if (locationChanged) {
      prevLocationRef.current = location;
    }

    // Don't show loader in admin area or manifesto page - show body immediately
    if (shouldSkipLoader) {
      setIsLoading(false);
      setIsFirstLoad(false);
      // Make body visible immediately
      if (!document.body.classList.contains('loaded')) {
        document.body.classList.add('loaded');
      }
      return;
    }

    // For page transitions (not first load), skip the loader and show content immediately
    if (isPageTransition) {
      setIsLoading(false);
      setLoaderHtml(null); // Clear loader HTML on transitions
      document.body.classList.add('loaded');
      return;
    }

    // Wait for loaders to be fetched (only on first load)
    // On mobile, skip loader wait for faster initial render
    // Also skip if there's an error loading loaders
    if (loadersError) {
      // If error loading loaders, show content immediately
      setIsLoading(false);
      setIsFirstLoad(false);
      document.body.classList.add('loaded');
      return;
    }
    
    if (isLoadingLoaders && !isMobile) {
      // Add timeout - don't wait more than 500ms for loaders (reduced from 1s)
      // Use a separate effect to handle timeout cleanup
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
        setIsFirstLoad(false);
        document.body.classList.add('loaded');
      }, 500);
      
      // Return cleanup function
      return () => {
        clearTimeout(timeoutId);
      };
    }
    
    if (isLoadingLoaders && isMobile) {
      // On mobile, show content immediately without waiting for loader
      setIsLoading(false);
      setIsFirstLoad(false);
      document.body.classList.add('loaded');
      return;
    }

    if (!safeActiveLoaders || safeActiveLoaders.length === 0) {
      // No active loaders, show body content immediately
      setIsLoading(false);
      setIsFirstLoad(false);
      document.body.classList.add('loaded');
      return;
    }

    // Select a random loader from active loaders
    // Ensure safeActiveLoaders is valid before accessing
    const randomLoader = safeActiveLoaders && safeActiveLoaders.length > 0 
      ? safeActiveLoaders[Math.floor(Math.random() * safeActiveLoaders.length)]
      : null;
    
    if (randomLoader && randomLoader.cssCode) {
      // Extract and inject CSS styles FIRST
      const styleMatch = randomLoader.cssCode.match(/<style>([\s\S]*?)<\/style>/);
      const cssStyles = styleMatch ? styleMatch[1] : "";

      if (cssStyles) {
        const styleId = "page-loader-styles";
        const existingStyle = document.getElementById(styleId);
        if (existingStyle) {
          existingStyle.remove();
        }

        const styleElement = document.createElement("style");
        styleElement.id = styleId;
        // Add CSS to fix logo in center and prevent it from moving - only applies within loader container
        styleElement.textContent = cssStyles + `
          /* Fix logo in center for all loaders - scoped to loader container */
          [data-page-loader] img[src*="Nukleo"], 
          [data-page-loader] img[src*="nukleo"], 
          [data-page-loader] img[src*="logo"], 
          [data-page-loader] img[alt*="Nukleo"], 
          [data-page-loader] img[alt*="nukleo"], 
          [data-page-loader] img[alt*="Logo"],
          [data-page-loader] svg[viewBox*="1451"], 
          [data-page-loader] svg[viewBox*="1781"], 
          [data-page-loader] svg[class*="logo"], 
          [data-page-loader] svg[id*="logo"],
          [data-page-loader] .logo, 
          [data-page-loader] [class*="logo"], 
          [data-page-loader] [id*="logo"], 
          [data-page-loader] [class*="Logo"], 
          [data-page-loader] [id*="Logo"],
          [data-page-loader] object[data*="nukleo"], 
          [data-page-loader] object[data*="logo"],
          [data-page-loader] embed[src*="nukleo"], 
          [data-page-loader] embed[src*="logo"] {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            z-index: 10001 !important;
            pointer-events: none !important;
            will-change: auto !important;
            animation: none !important;
            transition: none !important;
            margin: 0 !important;
          }
        `;
        document.head.appendChild(styleElement);
      }

      // Set HTML content immediately
      setLoaderHtml(randomLoader.cssCode);
      setStylesReady(true);

      // Preload content while loader is showing
      // Use the loader time to prepare the page content
      // Very short minimum display time for fast loading
      const minDisplayTime = 300; // Reduced to 300ms for faster loading
      const maxDisplayTime = 800; // Maximum 800ms (reduced from 2s)
      const startTime = Date.now();

      // Preload critical resources during loader display (non-blocking)
      const preloadPageContent = () => {
        // Don't wait for fonts - load them in background
        document.fonts.ready.catch(() => {
          // Silently fail - fonts will load normally
        });
        
        // Preload critical components for home page (non-blocking)
        // Normalize path to handle language prefixes
        const normalizedPath = location.replace(/^\/(fr|en)/, '') || '/';
        if (normalizedPath === '/') {
          // Preload Home (HomepageDemo5) in background
          import('../pages/HomepageDemo5').catch(() => {});
        }
      };

      // Start preloading immediately (non-blocking, don't await)
      preloadPageContent();

      const checkReady = () => {
        const elapsed = Date.now() - startTime;
        // Don't wait for document.readyState - just check elapsed time
        // This makes loading much faster
        const minTimeReached = elapsed >= minDisplayTime;
        const maxTimeReached = elapsed >= maxDisplayTime;
        
        // Show content as soon as minimum time is reached OR max time is reached
        if (minTimeReached || maxTimeReached) {
          setIsLoading(false);
          setIsFirstLoad(false);
          // Show body content immediately - hero should be visible without animations
          document.body.classList.add('loaded');
          // Clear loader HTML to ensure logo disappears
          setLoaderHtml(null);
          // Remove loader styles immediately
          const styleElement = document.getElementById("page-loader-styles");
          if (styleElement) {
            styleElement.remove();
          }
        } else {
          // Check again in 50ms
          setTimeout(checkReady, 50);
        }
      };

      // Start checking immediately, not after minDisplayTime
      // This ensures we show content as soon as possible
      setTimeout(checkReady, minDisplayTime);
    } else {
      setIsLoading(false);
      setIsFirstLoad(false);
      document.body.classList.add('loaded');
    }

    return () => {
      // Cleanup: remove styles and ensure loader is hidden
      const styleElement = document.getElementById("page-loader-styles");
      if (styleElement) {
        styleElement.remove();
      }
      // Remove any remaining loader elements from DOM
      document.querySelectorAll('[data-page-loader]').forEach(el => {
        if (el instanceof HTMLElement && el.style.zIndex === '10001') {
          el.remove();
        }
      });
      // Ensure loader is hidden when component unmounts or location changes
      setIsLoading(false);
      setLoaderHtml(null);
    };
  }, [safeActiveLoaders, isLoadingLoaders, loadersError, shouldSkipLoader, location, isFirstLoad]);

  // Don't show loader in admin area or manifesto page
  if (shouldSkipLoader) {
    return null;
  }

  // Don't show loader if not loading (e.g., during page transitions)
  if (!isLoading) {
    // Ensure body is visible when loader is not showing
    if (!document.body.classList.contains('loaded')) {
      document.body.classList.add('loaded');
    }
    return null;
  }

  // Don't show anything if no loaders are active
  if (!isLoadingLoaders && (!safeActiveLoaders || safeActiveLoaders.length === 0)) {
    // Ensure body is visible when no loaders
    if (!document.body.classList.contains('loaded')) {
      document.body.classList.add('loaded');
    }
    return null;
  }

  // Show loader container
  if (!loaderHtml) {
    // Still loading loaders, show gradient background matching pages
    // Don't use pure black to match site theme
    return (
      <div
        className="fixed inset-0 z-[9999]"
        style={{
          background: '#EFE8E8',
          opacity: 1,
          pointerEvents: "all",
        }}
      />
    );
  }

  // Sanitize HTML content before rendering
  const sanitizedHtml = useMemo(() => {
    if (!loaderHtml) return '';
    const htmlWithoutStyles = loaderHtml.includes("<style>")
      ? loaderHtml.replace(/<style>[\s\S]*?<\/style>/g, "").trim()
      : loaderHtml;
    return sanitizeLoaderHTML(htmlWithoutStyles);
  }, [loaderHtml]);

  // Sanitize DOM after HTML is injected (fallback)
  useEffect(() => {
    if (isLoading && sanitizedHtml) {
      const timer = setTimeout(() => {
        const loaderContainer = document.querySelector('[data-page-loader]') as HTMLElement;
        if (loaderContainer) {
          sanitizeLoaderDOM(loaderContainer);
        }
      }, 100); // Small delay to ensure DOM is ready
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, sanitizedHtml]);

  return (
    <div
      data-page-loader
      className="fixed inset-0 z-[9999]"
      style={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? "all" : "none",
        transition: isLoading ? "opacity 0.3s ease-out" : "opacity 0.1s ease-in",
        visibility: isLoading ? "visible" : "hidden",
      }}
    >
      {/* Logo blanc fixe au centre - seulement visible quand isLoading est true */}
      {isLoading && (
        <div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] pointer-events-none"
          style={{
            width: '300px',
            height: 'auto',
            opacity: isLoading ? 1 : 0,
            transition: 'opacity 0.2s ease-out',
          }}
        >
          <img 
            src="/Nukleo_blanc_RVB.svg" 
            alt="Logo Nukleo Digital - Agence de transformation IA" 
            width="300"
            height="75"
            loading="lazy"
            fetchPriority="low"
            className="w-full h-auto"
          />
        </div>
      )}
      
      {sanitizedHtml && isLoading && (
        <SafeHTML
          html={sanitizedHtml}
          tag="div"
          data-page-loader="true"
          key={`page-loader-${loaderHtml.substring(0, 50)}`}
          className="fixed inset-0"
          style={{ 
            zIndex: 9999,
            visibility: "visible",
          }}
        />
      )}
    </div>
  );
}
