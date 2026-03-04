import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

/**
 * ErrorBoundary component that catches React errors and displays a fallback UI.
 * Also reports errors to Sentry if configured.
 * 
 * @example
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Report to Sentry if available
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack,
          },
        },
      });
    }

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

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

            <p className="text-white/70 mb-6 text-center">
              Désolé, quelque chose s'est mal passé. Veuillez réessayer ou recharger la page.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="p-4 w-full rounded bg-black/20 overflow-auto mb-6 border border-white/10">
                <pre className="text-xs text-white/60 whitespace-break-spaces">
                  {this.state.error.toString()}
                  {this.state.error.stack && `\n\n${this.state.error.stack}`}
                </pre>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={this.handleReset}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full",
                  "bg-white/10 text-white border border-white/20",
                  "hover:bg-white/20 transition-colors cursor-pointer"
                )}
              >
                <RotateCcw size={16} />
                Réessayer
              </button>
              <button
                onClick={() => window.location.reload()}
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

export default ErrorBoundary;
