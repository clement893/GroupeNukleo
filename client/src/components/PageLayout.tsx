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
      <main id="main-content" role="main" style={{ marginBottom: 0, background: '#EFE8E8', border: 'none', borderWidth: 0, outline: 'none', boxShadow: 'none' }}>
        {children}
      </main>
      <div style={{ marginTop: -12, paddingTop: 12, background: '#EFE8E8', border: 'none', borderWidth: 0, outline: 'none' }}>
        <PreFooter />
        <Footer />
      </div>
    </>
  );
}
