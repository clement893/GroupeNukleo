import { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'wouter';
import { SplitCTAButton } from '@/components/SplitCTAButton';
import { useSound } from '@/hooks/useSound';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { useIsMobile } from '@/hooks/useIsMobile';
import { MOBILE_BREAKPOINT, ANIMATIONS } from '@/lib/constants';

/**
 * Header simplifié — une seule page, pas de menu.
 * Logo + CTA Contact uniquement.
 */
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const { playHover, playClick } = useSound();
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);

  useEffect(() => {
    lastScrollY.current = typeof window !== 'undefined' ? window.scrollY : 0;
  }, []);

  useEffect(() => {
    const SCROLL_THRESHOLD = 8;
    const TOP_THRESHOLD = 60;
    const POLL_MS = 120;

    const getScrollY = (): number => {
      if (typeof window === 'undefined') return 0;
      return window.scrollY ?? document.documentElement?.scrollTop ?? 0;
    };

    const applyVisibility = (visible: boolean) => {
      setIsHeaderVisible(visible);
      headerRef.current?.classList.toggle('header-hidden', !visible);
    };

    const tick = () => {
      const currentScrollY = getScrollY();
      const delta = currentScrollY - lastScrollY.current;

      if (currentScrollY <= TOP_THRESHOLD) {
        applyVisibility(true);
        setIsScrolled(currentScrollY > 50);
      } else if (delta > SCROLL_THRESHOLD) {
        applyVisibility(false);
        setIsScrolled(true);
      } else if (delta < -SCROLL_THRESHOLD) {
        applyVisibility(true);
        setIsScrolled(true);
      }

      lastScrollY.current = currentScrollY;
    };

    tick();
    const id = setInterval(tick, POLL_MS);
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('wheel', tick, { passive: true });
    window.addEventListener('touchmove', tick, { passive: true });

    return () => {
      clearInterval(id);
      window.removeEventListener('scroll', tick);
      window.removeEventListener('wheel', tick);
      window.removeEventListener('touchmove', tick);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`
        header-scroll-transform fixed top-0 left-0 right-0 z-50 site-margin-x
        ${isScrolled ? 'pt-2 sm:pt-3' : 'pt-4 sm:pt-5'}
        ${!isHeaderVisible ? 'header-hidden' : ''}
      `}
      style={{
        background: 'transparent',
        ...(isMobile && ANIMATIONS.USE_WILL_CHANGE ? { willChange: 'transform' } : {}),
      }}
    >
      <div
        className="transition-all duration-300 sm:duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] py-3 sm:py-4"
        style={{
          background: 'transparent',
          borderRadius: 0,
        }}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <Link href={getLocalizedPath('/')} className="inline-flex items-center cursor-pointer touch-manipulation" aria-label={t('alt.logo') || 'Groupe Nukleo - Accueil'}>
            <img
              src="/LogoGroupeNukleo.png"
              alt="Groupe Nukleo"
              style={{
                height: 'clamp(1.75rem, 4vw, 2.5rem)',
                width: 'auto',
                display: 'block',
              }}
            />
          </Link>

          <SplitCTAButton
            href="#contact"
            label={t('nav.contact') || 'Contactez-nous'}
            ariaLabel={t('nav.contact') || 'Contactez-nous'}
            size="header"
            className="touch-manipulation"
            onClick={playClick}
            onMouseEnter={playHover}
          />
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
