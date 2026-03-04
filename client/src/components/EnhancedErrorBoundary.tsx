/**
 * Enhanced Error Boundary with automatic recovery and state persistence
 * Provides better stability and user experience
 */

import { Component, ReactNode, ErrorInfo } from 'react';
import { AlertTriangle, RotateCcw, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { logger } from '@/lib/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  enableRecovery?: boolean;
  maxRecoveryAttempts?: number;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  recoveryAttempts: number;
  isRecovering: boolean;
}

export class EnhancedErrorBoundary extends Component<Props, State> {
  private recoveryTimeoutId: NodeJS.Timeout | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      recoveryAttempts: 0,
      isRecovering: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Check if this is a chunk loading error
    const isChunkError = 
      error instanceof TypeError &&
      (error.message.includes('Failed to fetch dynamically imported module') ||
       error.message.includes('Loading chunk') ||
       error.message.includes('Loading CSS chunk') ||
       error.message.includes('import()'));
    
    // Log error
    logger.tagged('ErrorBoundary').error('Caught error:', error, errorInfo);

    // Report to Sentry if available (but not for chunk errors to avoid noise)
    if (typeof window !== 'undefined' && (window as any).Sentry && !isChunkError) {
      (window as any).Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack,
          },
        },
        tags: {
          errorBoundary: true,
        },
      });
    }

    // Call custom error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    this.setState({ errorInfo });

    // For chunk loading errors, reload the page instead of attempting recovery
    if (isChunkError) {
      logger.tagged('ErrorBoundary').warn('Chunk loading error detected, reloading page...');
      
      // CRITICAL: Clear ALL caches and unregister service worker for chunk errors
      Promise.all([
        // Clear all caches
        'caches' in window ? window.caches.keys().then(names => 
          Promise.all(names.map(name => window.caches.delete(name)))
        ) : Promise.resolve(),
        // Unregister service worker
        'serviceWorker' in navigator 
          ? navigator.serviceWorker.getRegistrations().then(registrations =>
              Promise.all(registrations.map(reg => reg.unregister()))
            )
          : Promise.resolve(),
      ]).then(() => {
        // Force hard reload with cache bypass
        const currentUrl = window.location.href;
        const separator = currentUrl.includes('?') ? '&' : '?';
        window.location.replace(`${currentUrl.split('?')[0]}${separator}_reload=${Date.now()}&_nocache=1`);
      }).catch(() => {
        // If cache clearing fails, still reload
        const currentUrl = window.location.href;
        const separator = currentUrl.includes('?') ? '&' : '?';
        window.location.replace(`${currentUrl.split('?')[0]}${separator}_reload=${Date.now()}&_nocache=1`);
      });
      return;
    }

    // Attempt automatic recovery if enabled (for non-chunk errors)
    if (this.props.enableRecovery !== false) {
      this.attemptRecovery();
    }
  }

  componentWillUnmount() {
    // Cleanup recovery timeout
    if (this.recoveryTimeoutId) {
      clearTimeout(this.recoveryTimeoutId);
    }
  }

  attemptRecovery = () => {
    const maxAttempts = this.props.maxRecoveryAttempts || 3;
    const { recoveryAttempts } = this.state;

    if (recoveryAttempts >= maxAttempts) {
      logger.tagged('ErrorBoundary').warn('Max recovery attempts reached');
      return;
    }

    this.setState({ isRecovering: true });

    // Wait before attempting recovery (exponential backoff)
    const delay = Math.min(1000 * Math.pow(2, recoveryAttempts), 10000);
    
    this.recoveryTimeoutId = setTimeout(() => {
      logger.tagged('ErrorBoundary').debug(`Attempting recovery (${recoveryAttempts + 1}/${maxAttempts})...`);
      
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        recoveryAttempts: recoveryAttempts + 1,
        isRecovering: false,
      });
    }, delay);
  };

  handleReset = () => {
    // Clear recovery timeout if active
    if (this.recoveryTimeoutId) {
      clearTimeout(this.recoveryTimeoutId);
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      recoveryAttempts: 0,
      isRecovering: false,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorInfo, recoveryAttempts, isRecovering } = this.state;
      const maxAttempts = this.props.maxRecoveryAttempts || 3;

      return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-gradient-to-br from-[rgb(60,15,15)] via-[rgb(40,60,120)] to-[rgb(60,15,15)]">
          <div className="flex flex-col items-center w-full max-w-2xl p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            <AlertTriangle
              size={48}
              className="text-red-400 mb-6 flex-shrink-0"
            />

            <h2 className="text-2xl font-bold text-white mb-4">
              Une erreur inattendue s'est produite
            </h2>

            <p className="text-white/70 mb-2 text-center">
              Désolé, quelque chose s'est mal passé.
            </p>

            {isRecovering && (
              <div className="flex items-center gap-2 text-[#523DCB]/80 mb-4">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="text-sm">Tentative de récupération...</span>
              </div>
            )}

            {recoveryAttempts > 0 && recoveryAttempts < maxAttempts && (
              <p className="text-white/50 text-sm mb-6 text-center">
                Tentative de récupération {recoveryAttempts}/{maxAttempts}
              </p>
            )}

            {process.env.NODE_ENV === 'development' && error && (
              <div className="p-4 w-full rounded bg-black/20 overflow-auto mb-6 border border-white/10">
                <pre className="text-xs text-white/60 whitespace-break-spaces">
                  {error.toString()}
                  {error.stack && `\n\n${error.stack}`}
                  {errorInfo?.componentStack && `\n\nComponent Stack:\n${errorInfo.componentStack}`}
                </pre>
              </div>
            )}

            <div className="flex gap-4 flex-wrap justify-center">
              <button
                onClick={this.handleReset}
                disabled={isRecovering}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full",
                  "bg-white/10 text-white border border-white/20",
                  "hover:bg-white/20 transition-colors cursor-pointer",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                <RotateCcw size={16} />
                Réessayer
              </button>
              <button
                onClick={this.handleReload}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full",
                  "bg-white text-[#523DCB]",
                  "hover:bg-white/90 transition-colors cursor-pointer font-semibold"
                )}
              >
                Recharger la page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default EnhancedErrorBoundary;

