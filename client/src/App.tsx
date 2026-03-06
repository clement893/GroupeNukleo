import { Suspense } from "react";
import { Route, Switch, Redirect, useLocation } from "wouter";
import EnhancedErrorBoundary from "./components/EnhancedErrorBoundary";

import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import "./hooks/useLocalizedPath";
import ScrollToTop from "./components/ScrollToTop";
import ArrowBackground from "./components/ArrowBackground";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { FloatingLanguageToggle } from "./components/FloatingLanguageToggle";
import CookieConsent from "./components/CookieConsent";
import { lazyWithRetry } from "./lib/lazyWithRetry";

const HomepageDemo5 = lazyWithRetry(() => import('./pages/HomepageDemo5'));

/** Redirige toute URL non-/ et non-/fr vers la page unique */
function RedirectToHome() {
  const [location] = useLocation();
  const isFr = location.startsWith('/fr');
  return <Redirect to={isFr ? '/fr' : '/'} replace />;
}

function App() {
  return (
    <EnhancedErrorBoundary enableRecovery={true} maxRecoveryAttempts={3}>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <ArrowBackground variant="default" />
          <ScrollToTop />
          <GoogleAnalytics />
          <FloatingLanguageToggle />
          <CookieConsent />
          <Suspense fallback={null}>
            <Switch>
              <Route path="/" component={HomepageDemo5} />
              <Route path="/fr" component={HomepageDemo5} />
              <Route path="/:rest*" component={RedirectToHome} />
            </Switch>
          </Suspense>
        </LanguageProvider>
      </ThemeProvider>
    </EnhancedErrorBoundary>
  );
}

export default App;
