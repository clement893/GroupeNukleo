import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'wouter';
import { SplitCTAButton } from '@/components/SplitCTAButton';
import FullScreenMenu from './FullScreenMenu';
import { useSound } from '@/hooks/useSound';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { useIsMobile } from '@/hooks/useIsMobile';
import { MOBILE_BREAKPOINT, ANIMATIONS } from '@/lib/constants';

/**
 * Composant Header principal de l'application.
 *
 * Affiche le logo, le tagline, le bouton CTA et le menu burger.
 * S'adapte au scroll : cache le header en scrollant vers le bas, le réaffiche en scrollant vers le haut.
 * En haut de page, le header reste visible avec effet glass et tagline masqué après 50px.
 */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const { playHover, playClick } = useSound();
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);
  
  // Memoize handlers to prevent re-renders
  /**
   * Ouvre le menu plein écran et joue le son de clic.
   */
  const handleMenuOpen = useCallback(() => {
    playClick();
    setIsMenuOpen(true);
  }, [playClick]);
  
  /**
   * Ferme le menu plein écran.
   */
  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

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
    <>
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
            {/* Logo Nukleo RVB (nukleo,→) */}
            <Link href={getLocalizedPath('/')} className="inline-flex items-center cursor-pointer touch-manipulation" aria-label={t('alt.logo') || 'Nukleo Digital - Accueil'}>
              <img
                src="/demo/nukleo-logo-rvb.svg"
                alt="Nukleo"
                className="w-auto object-contain"
                style={{ height: 'clamp(2.25rem, 6vw, 3.75rem)' }}
              />
            </Link>

            {/* Right: CTA split + Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              <SplitCTAButton
                href="/contact"
                label={t('nav.contact') || 'Contactez-nous'}
                ariaLabel={t('nav.contact') || 'Contactez-nous'}
                size="header"
                className="hidden xs:inline-flex touch-manipulation"
                onClick={playClick}
                onMouseEnter={playHover}
              />

              {/* Bouton Menu — glassmorphisme + icône burger à droite */}
              <button
                onClick={isMenuOpen ? handleMenuClose : handleMenuOpen}
                onMouseEnter={playHover}
                className="header-menu-btn flex items-center justify-center gap-2 rounded-full text-gray-800 active:scale-95 transition-all duration-300 touch-manipulation flex-shrink-0 px-4 sm:px-5"
                style={{
                  height: 'clamp(2.75rem, 4vw, 3.5rem)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(0.9rem, 1vw, 1.05rem)',
                  background: 'rgba(255, 255, 255, 0.35)',
                  backdropFilter: 'blur(16px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.7)',
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
                  transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                aria-label={isMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" strokeWidth={2} />
                ) : (
                  <>
                    {t('header.menu')}
                    <Menu className="w-4 h-4 sm:w-[1.1em] sm:h-[1.1em]" strokeWidth={2} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Menu */}
      <FullScreenMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
    </>
  );
}

export default memo(Header);
