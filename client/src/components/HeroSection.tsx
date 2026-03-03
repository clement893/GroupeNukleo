
import { Button } from '@/components/ui/button';
import { useSound } from '@/hooks/useSound';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useEffect, useState, useRef, memo, useMemo, useCallback } from 'react';

function HeroSection() {
  const { playHover, playClick } = useSound();
  const { language, t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const isMobile = useIsMobile(640);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [services, setServices] = useState<string[]>([]);
  
  // Load services safely with fallback - memoized
  const servicesValue = useMemo(() => {
    try {
      const value = t('hero.services', { returnObjects: true });
      return Array.isArray(value) ? value : [];
    } catch (error) {
      console.error('Error loading services:', error);
      return [];
    }
  }, [t, language]);

  useEffect(() => {
    setServices(servicesValue);
  }, [servicesValue]);
  

  
  useEffect(() => {
    if (!scrollRef.current) return;
    
    // Optimize animation for mobile - reduce frame rate on slower devices
    let animationFrameId: number | null = null;
    let lastTimestamp = 0;
    const speed = 0.5;
    const frameInterval = isMobile ? 32 : 16; // ~30fps mobile, ~60fps desktop
    
    const animate = (timestamp: number) => {
      if (timestamp - lastTimestamp >= frameInterval) {
        setScrollPosition((prev) => prev + speed);
        lastTimestamp = timestamp;
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Use Intersection Observer to pause when not visible
    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window && scrollRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (!animationFrameId) {
              animationFrameId = requestAnimationFrame(animate);
            }
          } else {
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
              animationFrameId = null;
            }
          }
        },
        { threshold: 0 }
      );
      observer.observe(scrollRef.current);
    } else {
      // Fallback: start immediately if IntersectionObserver not supported
      animationFrameId = requestAnimationFrame(animate);
    }
    
    // Defer start using requestIdleCallback to avoid blocking initial render
    const startAnimation = () => {
      if (scrollRef.current && !animationFrameId) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    if ('requestIdleCallback' in window) {
      requestIdleCallback(startAnimation, { timeout: 1000 });
    } else {
      setTimeout(startAnimation, 100);
    }
    
    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      observer?.disconnect();
    };
  }, [isMobile]);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 site-margin-x">

      <div className="container relative z-10">
        <div className="flex items-center justify-center">
          {/* Main Title */}
          <div className="max-w-6xl lg:max-w-7xl xl:max-w-[90%] w-full">
            {/* Main Heading */}
            <h1 
              className={`
                ${language === 'fr' 
                  ? 'text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5.5rem] xl:text-[6.5rem]' 
                  : 'text-[2rem] sm:text-[3rem] md:text-[4.5rem] lg:text-[6rem] xl:text-[7rem]'
                }
                font-bold leading-[1.05] sm:leading-[1.1] tracking-tighter text-white mb-4 sm:mb-6 md:mb-8 pr-4 sm:pr-10 md:pr-16 lg:pr-20 xl:pr-24 2xl:pr-28
              `}
              style={useMemo(() => ({
                // Prevent layout shift by reserving space - responsive
                minHeight: isMobile 
                  ? (language === 'fr' ? '2.5rem' : '2.75rem')
                  : (language === 'fr' ? '3rem' : '3.5rem'),
              }), [isMobile, language]) as React.CSSProperties}
            >
              {t('hero.title')}
              <br />
              <span 
                className="text-white pr-2 sm:pr-4 md:pr-6 lg:pr-8 xl:pr-10 inline-block"
              >
                {t('hero.titleHighlight')}
              </span>
            </h1>

            {/* Subtitle */}
            <p 
              className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed font-light mb-6 sm:mb-8 md:mb-12 max-w-2xl"
            >
              {t('hero.subtitle')}
            </p>

            {/* CTAs */}
            <div 
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6"
            >
              <Link href={getLocalizedPath('/contact')} className="w-full sm:w-auto">
                <Button
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="relative rounded-full text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 bg-white text-purple-900 hover:bg-white active:bg-white/90 transition-all duration-300 font-bold tracking-wider active:scale-[0.98] sm:hover:scale-[1.045] sm:hover:shadow-xl sm:hover:shadow-purple-500/25 group overflow-hidden w-full sm:w-auto touch-manipulation"
                >
                  <span className="relative z-10">{t('hero.cta')}</span>
                  {/* Shimmer effect - disabled on mobile for performance */}
                  <span className="hidden sm:block absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </Button>
              </Link>
            </div>

            {/* Services Carousel - Text Only */}
            <div className="mt-6 sm:mt-8">
              <div className="relative max-w-6xl mx-auto overflow-hidden py-3 sm:py-4">
                <div 
                  ref={scrollRef}
                  className="flex gap-4 sm:gap-6 md:gap-8 whitespace-nowrap"
                  style={{
                    transform: `translateX(-${scrollPosition}px)`,
                    transition: 'none'
                  }}
                  onTransitionEnd={useCallback(() => {
                    // Avoid forced layout reflow - use cached width or estimate
                    // Calculate width only when needed, not on every transition
                    if (scrollRef.current && services.length > 0) {
                      // Estimate width based on services count and screen size to avoid forced layout
                      const estimatedWidth = services.length * (isMobile ? 150 : 200); // Smaller on mobile
                      if (scrollPosition >= estimatedWidth) {
                        setScrollPosition(0);
                      }
                    }
                  }, [services.length, isMobile, scrollPosition])}
                >
                  {/* Double the services for seamless loop */}
                  {services.length > 0 && [...Array(2)].flatMap((_, setIndex) => 
                    services.map((service: string, index: number) => (
                      <span 
                        key={`${setIndex}-${index}`}
                        className="text-white/40 active:text-white/60 sm:hover:text-white/80 text-sm sm:text-base md:text-lg lg:text-xl font-bold transition-colors duration-300 cursor-default touch-manipulation"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {service}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}

export default memo(HeroSection);
