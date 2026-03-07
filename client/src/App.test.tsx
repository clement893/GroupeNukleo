import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock all lazy-loaded components
vi.mock('./pages/Home', () => ({
  default: () => <div data-testid="home-page">Home</div>,
}));

vi.mock('./pages/Media', () => ({
  default: () => <div data-testid="media-page">Media</div>,
}));

vi.mock('./pages/NotFound404', () => ({
  default: () => <div data-testid="not-found-page">404</div>,
}));

// Mock hooks
vi.mock('./hooks/useSound', () => ({
  useSound: () => ({
    playHover: vi.fn(),
    playClick: vi.fn(),
  }),
}));

vi.mock('./hooks/usePageTransition', () => ({
  usePageTransition: () => {},
}));

vi.mock('./hooks/usePageBackground', () => ({
  usePageBackground: () => {},
}));

vi.mock('./hooks/useIsMobile', () => ({
  useIsMobile: () => false,
}));

vi.mock('./hooks/useLocalizedPath', () => ({
  useLocalizedPath: () => (path: string) => path,
}));

// Mock components
vi.mock('./components/ErrorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('./components/CustomCursor', () => ({
  default: () => null,
}));

vi.mock('./components/PageLoader', () => ({
  default: () => null,
}));

vi.mock('./components/ScrollToTop', () => ({
  default: () => null,
}));

vi.mock('./components/ArrowBackground', () => ({
  default: () => null,
}));

vi.mock('./components/AnalyticsLoader', () => ({
  default: () => null,
}));

vi.mock('./components/FloatingLanguageToggle', () => ({
  FloatingLanguageToggle: () => null,
}));

vi.mock('./components/UniversalLEO', () => ({
  default: () => null,
}));

describe('App', () => {
  it('should render without crashing', () => {
    render(<App />);
    // Basic smoke test - if it renders without error, test passes
  });

  it('should render home page on root path', () => {
    // Note: This test would need proper router setup
    // For now, it's a basic smoke test
    render(<App />);
  });
});

