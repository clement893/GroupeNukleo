import { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "wouter";
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

import NotFound404 from "@/pages/NotFound404";

const HomepageDemo5 = lazyWithRetry(() => import('./pages/HomepageDemo5'));

// Admin pages (pages supprimées : leo-contacts, contact-messages, start-project, testimonials, page-visibility, page-texts, projects-images, run-migration)
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const CreateFirstAdmin = lazy(() => import("./pages/CreateFirstAdmin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminHome = lazy(() => import("./pages/admin/AdminHome"));
const AdminCarouselLogos = lazy(() => import("./pages/admin/AdminCarouselLogos"));
const AdminUnionVideo = lazy(() => import("./pages/admin/AdminUnionVideo"));
const AdminPressRelease = lazy(() => import("./pages/admin/AdminPressRelease"));

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
              <Route path="/admin/dashboard">
                <ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/analytics">
                <ProtectedAdminRoute><AdminAnalytics /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/carousel-logos">
                <ProtectedAdminRoute><AdminCarouselLogos /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/union-video">
                <ProtectedAdminRoute><AdminUnionVideo /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/press-release">
                <ProtectedAdminRoute><AdminPressRelease /></ProtectedAdminRoute>
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
