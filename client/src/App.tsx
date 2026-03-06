import { Suspense } from "react";
import { Route, Switch } from "wouter";
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

function NotFound404() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', padding: 20, textAlign: 'center', fontFamily: "'Google Sans Flex', sans-serif",
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: 16 }}>404</h1>
      <p style={{ marginBottom: 24, color: '#666' }}>Page non trouvée</p>
      <a href="/" style={{ padding: '12px 24px', background: '#000', color: '#fff', borderRadius: 4, textDecoration: 'none' }}>
        Retour à l'accueil
      </a>
    </div>
  );
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
              <Route component={NotFound404} />
            </Switch>
          </Suspense>
        </LanguageProvider>
      </ThemeProvider>
    </EnhancedErrorBoundary>
  );
}

export default App;
