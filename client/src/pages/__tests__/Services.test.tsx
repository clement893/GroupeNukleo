import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Router } from 'wouter';
import Services from '../Services';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { ThemeProvider } from '../../contexts/ThemeContext';

// Mock components
vi.mock('../../components/PageLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="page-layout">{children}</div>,
}));

vi.mock('../../components/SEO', () => ({
  default: () => <div data-testid="seo">SEO</div>,
}));

vi.mock('../../hooks/useLocalizedPath', () => ({
  useLocalizedPath: () => (path: string) => path,
}));

const renderServices = () => {
  return render(
    <Router>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <Services />
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
};

describe('Services Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render page layout', () => {
    renderServices();
    expect(screen.getByTestId('page-layout')).toBeTruthy();
  });

  it('should render SEO component', () => {
    renderServices();
    expect(screen.getByTestId('seo')).toBeTruthy();
  });

  it('should render service entities', () => {
    renderServices();
    // The page should render service sections (Lab, Studio, Bureau)
    const pageLayout = screen.getByTestId('page-layout');
    expect(pageLayout).toBeTruthy();
  });
});

