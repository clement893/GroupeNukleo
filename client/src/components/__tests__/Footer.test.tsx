import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Router } from 'wouter';
import Footer from '../Footer';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { ThemeProvider } from '../../contexts/ThemeContext';

// Mock tRPC (Footer does not use tRPC; minimal mock for any child that might)
vi.mock('../../lib/trpc', () => ({
  trpc: {},
}));

// Mock hooks
vi.mock('../../hooks/useLocalizedPath', () => ({
  useLocalizedPath: () => (path: string) => path,
}));

vi.mock('../../hooks/useIsMobile', () => ({
  useIsMobile: () => false,
}));

const renderFooter = () => {
  return render(
    <Router>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <Footer />
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
};

describe('Footer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render footer with main content', () => {
    renderFooter();
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeTruthy();
    expect(screen.getByAltText('Groupe Nukleo')).toBeTruthy();
  });

  it('should render contact email and addresses', () => {
    renderFooter();
    expect(screen.getByText('hello@nukleo.com')).toBeTruthy();
    expect(screen.getByText(/7236 Rue Waverly/)).toBeTruthy();
    expect(screen.getByText(/Montréal, QC H2R 0C2/)).toBeTruthy();
  });

  it('should render social media links', () => {
    renderFooter();
    
    // Check if social links container exists
    // Adjust based on actual implementation
    const socialLinks = screen.queryAllByRole('link');
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  it('should render copyright information', () => {
    renderFooter();
    
    // Check if copyright text exists
    const copyright = screen.queryByText(/©|copyright/i);
    expect(copyright).toBeTruthy();
  });
});

