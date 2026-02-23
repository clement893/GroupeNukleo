import { Suspense, lazy } from "react";
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
  if (path.includes('/agencies')) return 'agencies';
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
import Media from "./pages/Media";
import NotFound404 from "@/pages/NotFound404";

// Lazy load all other pages with retry logic for chunk loading errors
// Using lazyWithRetry for all public-facing pages to handle chunk loading errors gracefully
const Projects = lazyWithRetry(() => import("./pages/Projects"));
const Expertise = lazyWithRetry(() => import("./pages/Expertise"));
const Resources = lazyWithRetry(() => import("./pages/Resources"));
const ResourceArticle = lazyWithRetry(() => import("./pages/resources/ResourceArticle"));
const Contact = lazyWithRetry(() => import("./pages/Contact"));
const Leo = lazyWithRetry(() => import("./pages/Leo"));
const Manifesto = lazyWithRetry(() => import("./pages/Manifesto"));
const Radar = lazyWithRetry(() => import("./pages/RadarNew").then(m => ({ default: m.RadarNew })));
const AITrendRadar = lazyWithRetry(() => import("./pages/AITrendRadar"));
const AIReadinessAssessment = lazyWithRetry(() => import("./pages/AIReadinessAssessment"));
const AIStrategyMarketing = lazyWithRetry(() => import("./pages/services/AIStrategyMarketing"));
const DigitalPlatforms = lazyWithRetry(() => import("./pages/services/DigitalPlatforms"));
const IntelligentOperations = lazyWithRetry(() => import("./pages/services/IntelligentOperations"));
const Glossary = lazyWithRetry(() => import("./pages/Glossary"));
const GlossaryTerm = lazyWithRetry(() => import("./pages/GlossaryTerm"));
const AIGlossary = lazyWithRetry(() => import("./pages/AIGlossary"));
const Privacy = lazyWithRetry(() => import("./pages/Privacy"));
const Terms = lazyWithRetry(() => import("./pages/Terms"));
const Cookies = lazyWithRetry(() => import("./pages/Cookies"));
const Testimonials = lazyWithRetry(() => import("./pages/Testimonials"));
const Services = lazyWithRetry(() => import("./pages/Services"));
const Clients = lazyWithRetry(() => import("./pages/Clients"));
const StartProject = lazyWithRetry(() => import("./pages/StartProject"));
const MediaCenter = lazyWithRetry(() => import("./pages/MediaCenter"));
const PrivacyPolicy = lazyWithRetry(() => import("./pages/PrivacyPolicy"));
const PrivacyPolicyNukleoTime = lazyWithRetry(() => import("./pages/PrivacyPolicyNukleoTime"));
const TermsOfService = lazyWithRetry(() => import("./pages/TermsOfService"));
const CookiePolicy = lazyWithRetry(() => import("./pages/CookiePolicy"));
const FAQ = lazyWithRetry(() => import("./pages/FAQ"));
const ArtsCulture = lazyWithRetry(() => import("./pages/ArtsCulture"));
const AILabService = lazyWithRetry(() => import("./pages/services/AILab"));
const StrategicBureauService = lazyWithRetry(() => import("./pages/services/StrategicBureau"));
const CreativeStudioService = lazyWithRetry(() => import("./pages/services/CreativeStudio"));
const AgenticAIService = lazyWithRetry(() => import("./pages/services/AgenticAI"));
const DigitalTransformationService = lazyWithRetry(() => import("./pages/services/DigitalTransformation"));
const Agencies = lazyWithRetry(() => import("./pages/Agencies"));
const ArrowDemo = lazy(() => import("./pages/ArrowDemo"));
const ArrowDemoV2 = lazy(() => import("./pages/ArrowDemoV2"));
const ArrowDemoV3 = lazy(() => import("./pages/ArrowDemoV3"));
const HomepageDemo = lazyWithRetry(() => import("./pages/HomepageDemo"));
const AdminAgencyLeads = lazy(() => import("./pages/admin/AdminAgencyLeads"));
const AdminLEOAnalytics = lazy(() => import("./pages/admin/AdminLEOAnalytics"));
const AdminLEOContacts = lazy(() => import("./pages/admin/AdminLEOContacts"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const CreateFirstAdmin = lazy(() => import("./pages/CreateFirstAdmin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminLoaders = lazy(() => import("./pages/AdminLoaders"));
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

// Wrapper component to handle language routes
function LanguageRoute({ component: Component, ...props }: { component: any; path: string }) {
  return <Component {...props} />;
}

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
          {/* Lazy load LEO on mobile - only load on desktop for better mobile performance */}
          <GlobalLEO />
          <Suspense fallback={null}>
            <Switch>
              {/* Language routes - French */}
              <Route path="/fr" component={Home} />
              <Route path="/fr/projects" component={withPageVisibility(Projects, "/fr/projects")} />
              <Route path="/fr/about" component={withPageVisibility(About, "/fr/about")} />
              <Route path="/fr/expertise" component={withPageVisibility(Expertise, "/fr/expertise")} />
              <Route path="/fr/resources" component={withPageVisibility(Resources, "/fr/resources")} />
              <Route path="/fr/resources/:id" component={withPageVisibility(ResourceArticle, "/fr/resources")} />
              <Route path="/fr/contact" component={withPageVisibility(Contact, "/fr/contact")} />
              <Route path="/fr/leo" component={withPageVisibility(Leo, "/fr/leo")} />
              <Route path="/fr/manifesto" component={withPageVisibility(Manifesto, "/fr/manifesto")} />
              <Route path="/fr/radar" component={withPageVisibility(AITrendRadar, "/fr/radar")} />
              <Route path="/fr/ai-trend-radar" component={withPageVisibility(AITrendRadar, "/fr/ai-trend-radar")} />
              <Route path="/fr/ai-readiness" component={withPageVisibility(AIReadinessAssessment, "/fr/ai-readiness")} />
              <Route path="/fr/ai-readiness-assessment" component={withPageVisibility(AIReadinessAssessment, "/fr/ai-readiness-assessment")} />
              <Route path="/fr/assessment" component={withPageVisibility(AIReadinessAssessment, "/fr/assessment")} />
              <Route path="/fr/services/ai-strategy-marketing" component={withPageVisibility(AIStrategyMarketing, "/fr/services/ai-strategy-marketing")} />
              <Route path="/fr/services/digital-platforms" component={withPageVisibility(DigitalPlatforms, "/fr/services/digital-platforms")} />
              <Route path="/fr/services/intelligent-operations" component={withPageVisibility(IntelligentOperations, "/fr/services/intelligent-operations")} />
              <Route path="/fr/glossary" component={withPageVisibility(Glossary, "/fr/glossary")} />
              <Route path="/fr/glossary/:slug" component={withPageVisibility(GlossaryTerm, "/fr/glossary")} />
              <Route path="/fr/ai-glossary" component={withPageVisibility(AIGlossary, "/fr/ai-glossary")} />
              <Route path="/fr/privacy" component={withPageVisibility(Privacy, "/fr/privacy")} />
              <Route path="/fr/terms" component={withPageVisibility(Terms, "/fr/terms")} />
              <Route path="/fr/cookies" component={withPageVisibility(Cookies, "/fr/cookies")} />
              <Route path="/fr/testimonials" component={withPageVisibility(Testimonials, "/fr/testimonials")} />
              <Route path="/fr/services" component={withPageVisibility(Services, "/fr/services")} />
              <Route path="/fr/clients" component={withPageVisibility(Clients, "/fr/clients")} />
              <Route path="/fr/start-project" component={withPageVisibility(StartProject, "/fr/start-project")} />
              <Route path="/fr/media-center" component={withPageVisibility(MediaCenter, "/fr/media-center")} />
              <Route path="/fr/media" component={withPageVisibility(Media, "/fr/media")} />
              <Route path="/fr/privacy-policy" component={withPageVisibility(PrivacyPolicy, "/fr/privacy-policy")} />
              <Route path="/fr/nukleo-time-privacy" component={withPageVisibility(PrivacyPolicyNukleoTime, "/fr/nukleo-time-privacy")} />
              <Route path="/fr/terms-of-service" component={withPageVisibility(TermsOfService, "/fr/terms-of-service")} />
              <Route path="/fr/cookie-policy" component={withPageVisibility(CookiePolicy, "/fr/cookie-policy")} />
              <Route path="/fr/faq" component={withPageVisibility(FAQ, "/fr/faq")} />
              <Route path="/fr/arts-culture" component={withPageVisibility(ArtsCulture, "/fr/arts-culture")} />
              <Route path="/fr/services/ai-lab" component={withPageVisibility(AILabService, "/fr/services/ai-lab")} />
              <Route path="/fr/services/strategic-bureau" component={withPageVisibility(StrategicBureauService, "/fr/services/strategic-bureau")} />
              <Route path="/fr/services/creative-studio" component={withPageVisibility(CreativeStudioService, "/fr/services/creative-studio")} />
              <Route path="/fr/services/agentic-ai" component={withPageVisibility(AgenticAIService, "/fr/services/agentic-ai")} />
              <Route path="/fr/services/digital-transformation" component={withPageVisibility(DigitalTransformationService, "/fr/services/digital-transformation")} />
              <Route path="/fr/agencies" component={withPageVisibility(Agencies, "/fr/agencies")} />
              
              {/* Default routes (English) */}
              <Route path="/" component={Home} />
              <Route path="/projects" component={withPageVisibility(Projects, "/projects")} />
            <Route path="/about" component={withPageVisibility(About, "/about")} />
            <Route path="/expertise" component={withPageVisibility(Expertise, "/expertise")} />
            <Route path="/resources" component={withPageVisibility(Resources, "/resources")} />
            <Route path="/resources/:id" component={withPageVisibility(ResourceArticle, "/resources")} />
            <Route path="/contact" component={withPageVisibility(Contact, "/contact")} />
            <Route path="/leo" component={withPageVisibility(Leo, "/leo")} />
            <Route path="/manifesto" component={withPageVisibility(Manifesto, "/manifesto")} />
            <Route path="/radar" component={withPageVisibility(AITrendRadar, "/radar")} />
            <Route path="/ai-trend-radar" component={withPageVisibility(AITrendRadar, "/ai-trend-radar")} />
            <Route path="/ai-readiness" component={withPageVisibility(AIReadinessAssessment, "/ai-readiness")} />
            <Route path="/ai-readiness-assessment" component={withPageVisibility(AIReadinessAssessment, "/ai-readiness-assessment")} />
            <Route path="/assessment" component={withPageVisibility(AIReadinessAssessment, "/assessment")} />
            <Route path="/services/ai-strategy-marketing" component={withPageVisibility(AIStrategyMarketing, "/services/ai-strategy-marketing")} />
            <Route path="/services/digital-platforms" component={withPageVisibility(DigitalPlatforms, "/services/digital-platforms")} />
            <Route path="/services/intelligent-operations" component={withPageVisibility(IntelligentOperations, "/services/intelligent-operations")} />
            <Route path="/glossary" component={withPageVisibility(Glossary, "/glossary")} />
            <Route path="/glossary/:slug" component={withPageVisibility(GlossaryTerm, "/glossary")} />
            <Route path="/ai-glossary" component={withPageVisibility(AIGlossary, "/ai-glossary")} />
            <Route path="/privacy" component={withPageVisibility(Privacy, "/privacy")} />
            <Route path="/terms" component={withPageVisibility(Terms, "/terms")} />
            <Route path="/cookies" component={withPageVisibility(Cookies, "/cookies")} />
            <Route path="/testimonials" component={withPageVisibility(Testimonials, "/testimonials")} />
            <Route path="/services" component={withPageVisibility(Services, "/services")} />
            <Route path="/clients" component={withPageVisibility(Clients, "/clients")} />
            <Route path="/start-project" component={withPageVisibility(StartProject, "/start-project")} />
            <Route path="/media-center" component={withPageVisibility(MediaCenter, "/media-center")} />
            <Route path="/media" component={withPageVisibility(Media, "/media")} />
            <Route path="/privacy-policy" component={withPageVisibility(PrivacyPolicy, "/privacy-policy")} />
            <Route path="/nukleo-time-privacy" component={withPageVisibility(PrivacyPolicyNukleoTime, "/nukleo-time-privacy")} />
            <Route path="/terms-of-service" component={withPageVisibility(TermsOfService, "/terms-of-service")} />
            <Route path="/cookie-policy" component={withPageVisibility(CookiePolicy, "/cookie-policy")} />
            <Route path="/faq" component={withPageVisibility(FAQ, "/faq")} />
            <Route path="/arts-culture" component={withPageVisibility(ArtsCulture, "/arts-culture")} />
            <Route path="/services/ai-lab" component={withPageVisibility(AILabService, "/services/ai-lab")} />
            <Route path="/services/strategic-bureau" component={withPageVisibility(StrategicBureauService, "/services/strategic-bureau")} />
            <Route path="/services/creative-studio" component={withPageVisibility(CreativeStudioService, "/services/creative-studio")} />
            <Route path="/services/agentic-ai" component={withPageVisibility(AgenticAIService, "/services/agentic-ai")} />
            <Route path="/services/digital-transformation" component={withPageVisibility(DigitalTransformationService, "/services/digital-transformation")} />
            <Route path="/agencies" component={withPageVisibility(Agencies, "/agencies")} />
          <Route path="/arrow-demo" component={ArrowDemo} />
          <Route path="/arrow-demo-v2" component={ArrowDemoV2} />
          <Route path="/arrow-demo-v3" component={ArrowDemoV3} />
            <Route path="/homepage-demo" component={HomepageDemo} />
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
            <Route path="/admin/loaders">
              <ProtectedAdminRoute><AdminLoaders /></ProtectedAdminRoute>
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
