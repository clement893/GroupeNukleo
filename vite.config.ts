import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

const plugins = [
  react(), 
  tailwindcss(), 
  jsxLocPlugin(),
  // Bundle analyzer - only in production builds
  process.env.ANALYZE === 'true' && visualizer({
    open: true,
    filename: 'dist/stats.html',
    gzipSize: true,
    brotliSize: true,
    template: 'treemap', // 'sunburst' | 'treemap' | 'network'
  }),
].filter(Boolean);

export default defineConfig({
  plugins,
  base: '/', // Explicit base path for proper asset resolution
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    cssCodeSplit: true,
    cssMinify: true,
    // Reduce inline limit for mobile - smaller initial HTML
    assetsInlineLimit: 1024,
    reportCompressedSize: false,
    // Optimize chunk size for mobile
    chunkSizeWarningLimit: 400, // Further reduced
    rollupOptions: {
      output: {
        // Optimize chunk names for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[ext]/[name]-[hash][extname]';
        },
        manualChunks: (id) => {
          // CRITICAL: Exclude wouter and useLocalizedPath from splitting - they must stay in main chunk
          // This ensures Link and getLocalizedPath are always available for lazy-loaded components
          if (id.includes('wouter')) {
            return; // Return undefined to keep in main chunk
          }
          // Force useLocalizedPath hook and LanguageContext to stay in main chunk
          if (id.includes('hooks/useLocalizedPath') || id.includes('useLocalizedPath')) {
            return; // Return undefined to keep in main chunk
          }
          // LanguageContext is needed by useLocalizedPath
          if (id.includes('contexts/LanguageContext') || id.includes('LanguageContext')) {
            return; // Return undefined to keep in main chunk
          }
          
          // Vendor chunks - ultra-granular splitting for better caching and smaller initial bundle
          if (id.includes('node_modules')) {
            // React core - split into smaller chunks (critical, load first)
            if (id.includes('react/') && !id.includes('react-dom')) {
              return 'react-core';
            }
            // React DOM - critical for rendering, keep in initial bundle but optimize
            if (id.includes('react-dom')) {
              // Split react-dom further if possible
              if (id.includes('react-dom/client')) {
                return 'react-dom-client';
              }
              // Keep react-dom in initial bundle - it's needed for first render
              return 'react-dom';
            }
            // Scheduler - separate chunk
            if (id.includes('scheduler')) {
              return 'react-scheduler';
            }
            // Icons - split by usage (lazy load)
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            // Charts - heavy library, separate (lazy load)
            if (id.includes('recharts') || id.includes('d3-') || id.includes('chart.js')) {
              return 'charts-vendor';
            }
            // tRPC and React Query - split for better caching
            if (id.includes('@trpc')) {
              return 'trpc-vendor';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'react-query-vendor';
            }
            // Animation libraries - lazy load
            if (id.includes('framer-motion')) {
              return 'animation-vendor';
            }
            // useLocalizedPath is handled above - excluded from splitting
            // Markdown rendering (used in LEO) - lazy load
            if (id.includes('streamdown') || id.includes('react-markdown')) {
              return 'markdown-vendor';
            }
            // UI libraries - split Radix UI
            if (id.includes('@radix-ui')) {
              return 'radix-vendor';
            }
            // Form libraries
            if (id.includes('react-hook-form') || id.includes('@hookform')) {
              return 'forms-vendor';
            }
            // Other node_modules go to vendor chunk
            return 'vendor';
          }
          
          // useLocalizedPath is already handled above
          // Split by page for better lazy loading - admin should NEVER be in initial bundle
          // Use more efficient string matching - CRITICAL: admin must be completely separate
          if (id.includes('/pages/admin/') || 
              id.includes('/components/Admin') || 
              id.includes('/components/ProtectedAdminRoute') || 
              id.includes('/components/DashboardLayout') || 
              id.includes('/styles/admin.css') ||
              id.includes('/hooks/useAdminAuth') ||
              id.includes('admin.css')) {
            return 'admin';
          }
          if (id.includes('/pages/services/')) {
            return 'services';
          }
          if (id.includes('/components/radar/')) {
            return 'radar';
          }
          if (id.includes('/components/glossary/')) {
            return 'glossary';
          }
          if (id.includes('/components/UniversalLEO') || id.includes('/components/Leo') || id.includes('/pages/Leo')) {
            return 'leo';
          }
          // Split large components
          if (id.includes('/components/TestimonialsCarousel') || id.includes('/components/ClientLogos')) {
            return 'carousels';
          }
          // Split charts completely - heavy library
          if (id.includes('/components/TrendRadar') || id.includes('/pages/AITrendRadar') || id.includes('/pages/RadarNew')) {
            return 'radar-charts';
          }
        },
      },
    },
  },
  optimizeDeps: {
    // Do NOT include useLocalizedPath: pre-bundling creates a duplicate LanguageContext
    // and useLanguage() then runs outside the app's LanguageProvider.
    include: ['wouter'],
  },
  // Optimize CSS loading - defer non-critical CSS
  css: {
    devSourcemap: false,
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
