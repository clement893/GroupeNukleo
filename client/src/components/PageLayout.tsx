import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import PreFooter from './PreFooter';
import SkipToContent from './SkipToContent';
import HeroGradientCloud from './HeroGradientCloud';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="relative">
      <SkipToContent />
      <Header />
      <HeroGradientCloud />
      <div
        className="page-content-zone relative z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 144px, rgba(248,246,245,0.4) 208px, rgba(248,246,245,0.9) 256px, #f8f6f5 288px, #EFE8E8 336px, #EFE8E8 100%)',
        }}
      >
        <main id="main-content" role="main" style={{ marginBottom: 0 }}>
          {children}
        </main>
        <div className="page-footer-zone" style={{ paddingTop: 0 }}>
          <PreFooter />
          <Footer />
        </div>
      </div>
    </div>
  );
}
