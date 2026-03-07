import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

/**
 * Initialize Sentry for server-side error monitoring with advanced features
 * Includes performance monitoring, profiling, and alerting configuration
 */
export function initSentry() {
  if (!process.env.SENTRY_DSN) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('⚠️  Sentry DSN not configured, error monitoring disabled');
    }
    return false;
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    
    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // Profiling (optional, requires @sentry/profiling-node)
    profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    integrations: [
      nodeProfilingIntegration(),
      Sentry.httpIntegration(),
      Sentry.expressIntegration(),
    ],

    // Release tracking
    release: process.env.SENTRY_RELEASE || undefined,

    // Ignore specific errors
    ignoreErrors: [
      // Browser extensions
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured',
      // Network errors that are expected
      'NetworkError',
      'Failed to fetch',
    ],

    beforeSend(event, hint) {
      // Filter sensitive data before sending to Sentry
      if (event.request) {
        delete event.request.cookies;
        delete event.request.headers?.['authorization'];
        delete event.request.headers?.['cookie'];
        delete event.request.headers?.['x-api-key'];
      }

      // Remove sensitive data from user context
      if (event.user) {
        delete event.user.ip_address;
      }

      // Filter out health check errors
      if (event.request?.url?.includes('/health')) {
        return null;
      }

      return event;
    },

    // Configure alerting thresholds
    beforeSendTransaction(event) {
      // Track slow transactions
      if (event.transaction && event.contexts?.trace?.duration) {
        const duration = event.contexts.trace.duration;
        if (duration > 5000) { // 5 seconds
          event.tags = { ...event.tags, slow_transaction: true };
        }
      }
      return event;
    },
  });

  // Set user context if available
  if (process.env.SENTRY_ENVIRONMENT) {
    Sentry.setTag('environment', process.env.SENTRY_ENVIRONMENT);
  }

  console.log('✅ Sentry initialized for server-side error monitoring');
  return true;
}

/**
 * Capture exception with context
 */
export function captureException(error: Error, context?: Record<string, unknown>) {
  if (context) {
    Sentry.withScope((scope) => {
      Object.entries(context).forEach(([key, value]) => {
        scope.setContext(key, value);
      });
      Sentry.captureException(error);
    });
  } else {
    Sentry.captureException(error);
  }
}

/**
 * Capture message with level
 */
export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  Sentry.captureMessage(message, level);
}

/**
 * Set user context for error tracking
 */
export function setUser(user: { id?: string; email?: string; username?: string }) {
  Sentry.setUser(user);
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(breadcrumb: Sentry.Breadcrumb) {
  Sentry.addBreadcrumb(breadcrumb);
}

export { Sentry };
