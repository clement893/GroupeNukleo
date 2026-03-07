import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Router } from 'wouter';
import About from '../About';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { ThemeProvider } from '../../contexts/ThemeContext';

// Mock components
vi.mock('../../components/UniversalLEO', () => ({
  default: () => <div data-testid="universal-leo">LEO</div>,
}));

vi.mock('../../components/PageLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="page-layout">{children}</div>,
}));

vi.mock('../../components/SEO', () => ({
  default: () => <div data-testid="seo">SEO</div>,
}));

vi.mock('../../components/OptimizedImage', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} data-testid="optimized-image" />,
}));

vi.mock('../../hooks/useLocalizedPath', () => ({
  useLocalizedPath: () => (path: string) => path,
}));

const renderAbout = () => {
  return render(
    <Router>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <About />
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
};

describe('About Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render page layout', () => {
    renderAbout();
    expect(screen.getByTestId('page-layout')).toBeTruthy();
  });

  it('should render SEO component', () => {
    renderAbout();
    expect(screen.getByTestId('seo')).toBeTruthy();
  });

  it('should render team members', () => {
    renderAbout();
    // Check for team member names (these should be in translations)
    const images = screen.getAllByTestId('optimized-image');
    expect(images.length).toBeGreaterThan(0);
  });

  it('should render UniversalLEO component', () => {
    renderAbout();
    expect(screen.getByTestId('universal-leo')).toBeTruthy();
  });
});

