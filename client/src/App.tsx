import { lazy, Suspense } from "react";
import { Route, Switch, useLocation } from "wouter";
import EnhancedErrorBoundary from "./components/EnhancedErrorBoundary";
import CustomCursor from "./components/CustomCursor";
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
import { usePageTransition } from "./hooks/usePageTransition";
import { usePageBackground } from "./hooks/usePageBackground";
import { usePrefetch } from "./hooks/usePrefetch";
import { lazyWithRetry } from "./lib/lazyWithRetry";

// Lazy load UniversalLEO
const UniversalLEO = lazy(() => import("./components/UniversalLEO"));

// Helper function to determine page context from URL
function getPageContext(pathname: string): 'home' | 'agencies' | 'services' | 'contact' | 'projects' | 'about' | 'default' {
  // Remove language prefix if present
  const path = pathname.replace(/^\/(fr|en)/, '') || '/';
  
  // Skip admin routes
  if (path.startsWith('/admin')) return 'default';
  
  if (path === '/' || path === '') return 'home';
  if (path.includes('/services')) return 'services';
  if (path.includes('/contact')) return 'contact';
  if (path.includes('/projects')) return 'projects';
  if (path.includes('/about')) return 'about';
  
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

// Eager load only critical pages
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound404 from "@/pages/NotFound404";

// Lazy load all other pages with retry logic for chunk loading errors
const Projects = lazyWithRetry(() => import("./pages/Projects"));
const Resources = lazyWithRetry(() => import("./pages/Resources"));
const ResourceArticle = lazyWithRetry(() => import("./pages/resources/ResourceArticle"));
const Contact = lazyWithRetry(() => import("./pages/Contact"));
const Leo = lazyWithRetry(() => import("./pages/Leo"));
const AITrendRadar = lazyWithRetry(() => import("./pages/AITrendRadar"));
const AIReadinessAssessment = lazyWithRetry(() => import("./pages/AIReadinessAssessment"));
const AIGlossary = lazyWithRetry(() => import("./pages/AIGlossary"));
const Services = lazyWithRetry(() => import("./pages/Services"));
const StartProject = lazyWithRetry(() => import("./pages/StartProject"));
const PrivacyPolicy = lazyWithRetry(() => import("./pages/PrivacyPolicy"));
const PrivacyPolicyNukleoTime = lazyWithRetry(() => import("./pages/PrivacyPolicyNukleoTime"));
const TermsOfService = lazyWithRetry(() => import("./pages/TermsOfService"));
const CookiePolicy = lazyWithRetry(() => import("./pages/CookiePolicy"));
const FAQ = lazyWithRetry(() => import("./pages/FAQ"));

// Demo page — grand agence design
const HomepageDemo = lazyWithRetry(() => import('./pages/HomepageDemo'));

// New department pages
const NukleoTech = lazyWithRetry(() => import("./pages/services/NukleoTech"));
const NukleoConsulting = lazyWithRetry(() => import("./pages/services/NukleoConsulting"));
const NukleoStudio = lazyWithRetry(() => import("./pages/services/NukleoStudio"));
const NukleoAgency = lazyWithRetry(() => import("./pages/services/NukleoAgency"));
const Approche = lazyWithRetry(() => import("./pages/Approche"));

// Admin pages
const AdminAgencyLeads = lazy(() => import("./pages/admin/AdminAgencyLeads"));
const AdminLEOAnalytics = lazy(() => import("./pages/admin/AdminLEOAnalytics"));
const AdminLEOContacts = lazy(() => import("./pages/admin/AdminLEOContacts"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const CreateFirstAdmin = lazy(() => import("./pages/CreateFirstAdmin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminAINewsSubscribers = lazy(() => import("./pages/admin/AdminAINewsSubscribers"));
const AdminStartProjectSubmissions = lazy(() => import("./pages/admin/AdminStartProjectSubmissions"));
const AdminContactMessages = lazy(() => import("./pages/admin/AdminContactMessages"));
const AdminSounds = lazy(() => import("./pages/admin/AdminSounds"));
const AdminPageVisibility = lazy(() => import("./pages/admin/AdminPageVisibility"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials"));
const RunMigration = lazy(() => import("./pages/admin/RunMigration"));
const AdminLoaderMigration = lazy(() => import("./pages/admin/AdminLoaderMigration"));
const AdminHome = lazy(() => import("./pages/admin/AdminHome"));
const AdminProjectsImages = lazy(() => import("./pages/admin/AdminProjectsImages"));

import { ProtectedAdminRoute } from "./components/ProtectedAdminRoute";
import { withPageVisibility } from "./components/ProtectedRoute";

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
          <CustomCursor />
          <ScrollToTop />
          <GoogleAnalytics />
          <AnalyticsLoader />
          <FloatingLanguageToggle />
          <GlobalLEO />
          <Suspense fallback={null}>
            <Switch>
              {/* ===== ROUTES FRANÇAISES ===== */}
              <Route path="/fr" component={Home} />
              <Route path="/fr/projects" component={withPageVisibility(Projects, "/fr/projects")} />
              <Route path="/fr/about" component={withPageVisibility(About, "/fr/about")} />
              <Route path="/fr/approche" component={withPageVisibility(Approche, "/fr/approche")} />
              <Route path="/fr/resources" component={withPageVisibility(Resources, "/fr/resources")} />
              <Route path="/fr/resources/:id" component={withPageVisibility(ResourceArticle, "/fr/resources")} />
              <Route path="/fr/contact" component={withPageVisibility(Contact, "/fr/contact")} />
              <Route path="/fr/leo" component={withPageVisibility(Leo, "/fr/leo")} />
              <Route path="/fr/ai-trend-radar" component={withPageVisibility(AITrendRadar, "/fr/ai-trend-radar")} />
              <Route path="/fr/ai-readiness" component={withPageVisibility(AIReadinessAssessment, "/fr/ai-readiness")} />
              <Route path="/fr/ai-glossary" component={withPageVisibility(AIGlossary, "/fr/ai-glossary")} />
              <Route path="/fr/services" component={withPageVisibility(Services, "/fr/services")} />
              <Route path="/fr/services/tech" component={withPageVisibility(NukleoTech, "/fr/services/tech")} />
              <Route path="/fr/services/consulting" component={withPageVisibility(NukleoConsulting, "/fr/services/consulting")} />
              <Route path="/fr/services/studio" component={withPageVisibility(NukleoStudio, "/fr/services/studio")} />
              <Route path="/fr/services/agency" component={withPageVisibility(NukleoAgency, "/fr/services/agency")} />
              <Route path="/fr/start-project" component={withPageVisibility(StartProject, "/fr/start-project")} />
              <Route path="/fr/privacy-policy" component={withPageVisibility(PrivacyPolicy, "/fr/privacy-policy")} />
              <Route path="/fr/nukleo-time-privacy" component={withPageVisibility(PrivacyPolicyNukleoTime, "/fr/nukleo-time-privacy")} />
              <Route path="/fr/terms-of-service" component={withPageVisibility(TermsOfService, "/fr/terms-of-service")} />
              <Route path="/fr/cookie-policy" component={withPageVisibility(CookiePolicy, "/fr/cookie-policy")} />
              <Route path="/fr/faq" component={withPageVisibility(FAQ, "/fr/faq")} />

              {/* ===== ROUTES ANGLAISES (défaut) ===== */}
              <Route path="/demo" component={HomepageDemo} />
              <Route path="/" component={Home} />
              <Route path="/projects" component={withPageVisibility(Projects, "/projects")} />
              <Route path="/about" component={withPageVisibility(About, "/about")} />
              <Route path="/approche" component={withPageVisibility(Approche, "/approche")} />
              <Route path="/resources" component={withPageVisibility(Resources, "/resources")} />
              <Route path="/resources/:id" component={withPageVisibility(ResourceArticle, "/resources")} />
              <Route path="/contact" component={withPageVisibility(Contact, "/contact")} />
              <Route path="/leo" component={withPageVisibility(Leo, "/leo")} />
              <Route path="/ai-trend-radar" component={withPageVisibility(AITrendRadar, "/ai-trend-radar")} />
              <Route path="/ai-readiness" component={withPageVisibility(AIReadinessAssessment, "/ai-readiness")} />
              <Route path="/ai-glossary" component={withPageVisibility(AIGlossary, "/ai-glossary")} />
              <Route path="/services" component={withPageVisibility(Services, "/services")} />
              <Route path="/services/tech" component={withPageVisibility(NukleoTech, "/services/tech")} />
              <Route path="/services/consulting" component={withPageVisibility(NukleoConsulting, "/services/consulting")} />
              <Route path="/services/studio" component={withPageVisibility(NukleoStudio, "/services/studio")} />
              <Route path="/services/agency" component={withPageVisibility(NukleoAgency, "/services/agency")} />
              <Route path="/start-project" component={withPageVisibility(StartProject, "/start-project")} />
              <Route path="/privacy-policy" component={withPageVisibility(PrivacyPolicy, "/privacy-policy")} />
              <Route path="/nukleo-time-privacy" component={withPageVisibility(PrivacyPolicyNukleoTime, "/nukleo-time-privacy")} />
              <Route path="/terms-of-service" component={withPageVisibility(TermsOfService, "/terms-of-service")} />
              <Route path="/cookie-policy" component={withPageVisibility(CookiePolicy, "/cookie-policy")} />
              <Route path="/faq" component={withPageVisibility(FAQ, "/faq")} />

              {/* ===== ROUTES ADMIN ===== */}
              <Route path="/admin/login" component={AdminLogin} />
              <Route path="/admin/agency-leads">
                <ProtectedAdminRoute><AdminAgencyLeads /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/leo-analytics">
                <ProtectedAdminRoute><AdminLEOAnalytics /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/leo-contacts">
                <ProtectedAdminRoute><AdminLEOContacts /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/dashboard">
                <ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/ai-news-subscribers">
                <ProtectedAdminRoute><AdminAINewsSubscribers /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/sounds">
                <ProtectedAdminRoute><AdminSounds /></ProtectedAdminRoute>
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
              <Route path="/admin/loader-migration">
                <ProtectedAdminRoute><AdminLoaderMigration /></ProtectedAdminRoute>
              </Route>
              <Route path="/admin/projects-images">
                <ProtectedAdminRoute><AdminProjectsImages /></ProtectedAdminRoute>
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
