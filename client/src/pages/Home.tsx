import { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SEO from '@/components/SEO';
import StructuredData, { organizationSchema, websiteSchema } from '@/components/StructuredData';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
// Lazy load below-the-fold sections
const ManifestoSection = lazy(() => import('@/components/ManifestoSection'));
const WhoWeServeSection = lazy(() => import('@/components/WhoWeServeSection'));
const CapabilitiesSection = lazy(() => import('@/components/CapabilitiesSection'));
const TrinitySection = lazy(() => import('@/components/TrinitySection'));
const CTASection = lazy(() => import('@/components/CTASection'));
const TestimonialsCarousel = lazy(() => import('@/components/TestimonialsCarousel'));
const TeamCarousel = lazy(() => import('@/components/TeamCarousel'));
const ClientLogos = lazy(() => import('@/components/ClientLogos'));

export default function Home() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  
  return (
    <div className="relative">
      <SEO 
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        keywords="AI transformation, artificial intelligence consulting, agentic AI, AI strategy, machine learning, AI automation, digital transformation, AI agency, enterprise AI, AI solutions, AI marketing, intelligent operations"
      />
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <Header />
      <main>
        {/* First 4 sections with unified sandwich gradient */}
        <div className="relative">
          {/* Unified Background - Style Arts & Culture */}
          <div className="absolute inset-0" style={{
            background: `linear-gradient(135deg, rgb(60,15,15) 0%, rgb(40,60,120) 50%, rgb(60,15,15) 100%)`
          }}>
            {/* Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
            
            {/* Animated Gradient Orbs - GPU optimized - reduced on mobile */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px] animate-pulse max-md:hidden" style={{ animationDuration: '4s', willChange: 'opacity', transform: 'translateZ(0)' }} />
            <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-blue-900/8 rounded-full blur-[100px] animate-pulse max-md:hidden" style={{ animationDelay: '2s', animationDuration: '5s', willChange: 'opacity', transform: 'translateZ(0)' }} />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px] animate-pulse max-md:hidden" style={{ animationDelay: '3s', animationDuration: '4s', willChange: 'opacity', transform: 'translateZ(0)' }} />
          </div>
          
          <div className="relative z-10">
            <HeroSection />
            <Suspense fallback={<div style={{ minHeight: '1200px', contentVisibility: 'auto', containIntrinsicSize: '0 1200px' }} />}>
              <ManifestoSection />
              <WhoWeServeSection />
              <CapabilitiesSection />
            </Suspense>
          </div>
        </div>
        
        <Suspense fallback={<div style={{ minHeight: '2400px', contentVisibility: 'auto', containIntrinsicSize: '0 2400px' }} />}>
          <TrinitySection />
          <TestimonialsCarousel />
          <CTASection />
          <ClientLogos />
        </Suspense>
        
        {/* Team Carousel - Before Footer */}
        <Suspense fallback={<div style={{ minHeight: '600px', contentVisibility: 'auto', containIntrinsicSize: '0 600px' }} />}>
          <TeamCarousel />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
