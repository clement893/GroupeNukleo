import { lazy, Suspense } from "react";
import { Route, Switch, useLocation, Redirect } from "wouter";
import EnhancedErrorBoundary from "./components/EnhancedErrorBoundary";
import PageLoader from "./components/PageLoader";

import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
// CRITICAL: Pre-import useLocalizedPath to ensure it's in the main chunk
// This import forces the module to be included in the main bundle
import "./hooks/useLocalizedPath";
import ScrollToTop from "./components/ScrollToTop";
import ArrowBackground from "./components/ArrowBackground";
import AnalyticsLoader from "./components/AnalyticsLoader";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { FloatingLanguageToggle } from "./components/FloatingLanguageToggle";
import CookieConsent from "./components/CookieConsent";
import { usePageTransition } from "./hooks/usePageTransition";
import { usePageBackground } from "./hooks/usePageBackground";
import { usePrefetch } from "./hooks/usePrefetch";
import { lazyWithRetry } from "./lib/lazyWithRetry";

// Lazy load UniversalLEO
const UniversalLEO = lazy(() => import("./components/UniversalLEO"));

// Helper function to determine page context from URL (only home remains for public site)
function getPageContext(pathname: string): 'home' | 'default' {
  const path = pathname.replace(/^\/(fr|en)/, '') || '/';
  if (path.startsWith('/admin')) return 'default';
  if (path === '/' || path === '') return 'home';
  return 'default';
}

// Global LEO component that detects page context - disabled on mobile for performance
import { useIsMobile } from './hooks/useIsMobile';

function GlobalLEO() {
  const [location] = useLocation();
  const isMobile = useIsMobile(768);
  
  if (isMobile) return null;
  
  const pageContext = getPageContext(location);
  
  return (
    <Suspense fallback={null}>
      <UniversalLEO pageContext={pageContext} />
    </Suspense>
  );
}

import NotFound404 from "@/pages/NotFound404";

const HomepageDemo5 = lazyWithRetry(() => import('./pages/HomepageDemo5'));

// Admin pages
const AdminLEOAnalytics = lazy(() => import("./pages/admin/AdminLEOAnalytics"));
const AdminLEOContacts = lazy(() => import("./pages/admin/AdminLEOContacts"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const CreateFirstAdmin = lazy(() => import("./pages/CreateFirstAdmin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminStartProjectSubmissions = lazy(() => import("./pages/admin/AdminStartProjectSubmissions"));
const AdminContactMessages = lazy(() => import("./pages/admin/AdminContactMessages"));
const AdminPageVisibility = lazy(() => import("./pages/admin/AdminPageVisibility"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials"));
const RunMigration = lazy(() => import("./pages/admin/RunMigration"));
const AdminHome = lazy(() => import("./pages/admin/AdminHome"));
const AdminProjectsImages = lazy(() => import("./pages/admin/AdminProjectsImages"));
const AdminProjectEdit = lazy(() => import("./pages/admin/AdminProjectEdit"));
const AdminCarouselLogos = lazy(() => import("./pages/admin/AdminCarouselLogos"));
const AdminPageTexts = lazy(() => import("./pages/admin/AdminPageTexts"));

import { ProtectedAdminRoute } from "./components/ProtectedAdminRoute";

function App() {
  // Trigger animations on route change
  usePageTransition();
  // Preload background of destination page to prevent color flash
  usePageBackground();
  // Prefetch frequently visited routes for better performance
  usePrefetch(true);
  
  return (
    <EnhancedErrorBoundary enableRecovery={true} maxRecoveryAttempts={3}>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <PageLoader />
          <ArrowBackground variant="default" />
          <ScrollToTop />
          <GoogleAnalytics />
          <AnalyticsLoader />
          <FloatingLanguageToggle />
          <GlobalLEO />
          <CookieConsent />
          <Suspense fallback={null}>
            <Switch>
              {/* ===== PAGE PRINCIPALE (accueil) ===== */}
              <Route path="/fr" component={HomepageDemo5} />
              <Route path="/" component={HomepageDemo5} />
              <Route path="/fr/start-project"><Redirect to="/fr" /></Route>
              <Route path="/start-project"><Redirect to="/" /></Route>

              {/* ===== ROUTES ADMIN ===== */}
              <Route path="/admin/login" component={AdminLogin} />
              <Route path="/admin/leo-analytics">
                <ProtectedAdminRoute><AdminLEOAnalytics /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/leo-contacts">
                <ProtectedAdminRoute><AdminLEOContacts /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/dashboard">
                <ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/start-project-submissions">
                <ProtectedAdminRoute><AdminStartProjectSubmissions /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/contact-messages">
                <ProtectedAdminRoute><AdminContactMessages /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/page-visibility">
                <ProtectedAdminRoute><AdminPageVisibility /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/analytics">
                <ProtectedAdminRoute><AdminAnalytics /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/testimonials">
                <ProtectedAdminRoute><AdminTestimonials /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/run-migration">
                <ProtectedAdminRoute><RunMigration /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/projects-images/edit/:slug">
                <ProtectedAdminRoute><AdminProjectEdit /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/projects-images">
                <ProtectedAdminRoute><AdminProjectsImages /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/carousel-logos">
                <ProtectedAdminRoute><AdminCarouselLogos /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/page-texts">
                <ProtectedAdminRoute><AdminPageTexts /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin">
                <ProtectedAdminRoute><AdminHome /></ProtectedAdminRoute>
              </Route>
              <Route path="/create-first-admin" component={CreateFirstAdmin} />
              <Route component={NotFound404} />
            </Switch>
          </Suspense>
        </LanguageProvider>
      </ThemeProvider>
    </EnhancedErrorBoundary>
  );
}

export default App;
