import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import PreFooter from './PreFooter';
import SkipToContent from './SkipToContent';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <SkipToContent />
      <Header />
      <div className="page-content-zone" style={{ background: '#EFE8E8' }}>
        <main id="main-content" role="main" style={{ marginBottom: 0 }}>
          {children}
        </main>
        <div className="page-footer-zone" style={{ paddingTop: 0 }}>
          <PreFooter />
          <Footer />
        </div>
      </div>
    </>
  );
}
