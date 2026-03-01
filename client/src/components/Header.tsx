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
  const { t, language, setLanguage } = useLanguage();
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

  const btnPurple = '#5B21B6';
  const logoBordeaux = '#712D3A';
  const logoCommaPurple = '#7e3e9d';

  return (
    <>
      <header
        ref={headerRef}
        className={`
          header-scroll-transform fixed top-0 left-0 right-0 z-50
          ${isScrolled ? 'px-4 sm:px-6 md:px-12 pt-3 sm:pt-4' : 'px-4 sm:px-6 md:px-12 pt-6 sm:pt-8'}
          ${!isHeaderVisible ? 'header-hidden' : ''}
        `}
        style={{
          background: 'transparent',
          ...(isMobile && ANIMATIONS.USE_WILL_CHANGE ? { willChange: 'transform' } : {}),
        }}
      >
        <div 
          className="transition-all duration-300 sm:duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] px-4 sm:px-6 md:px-8 py-3 sm:py-4"
          style={{
            background: 'transparent',
            borderRadius: 0,
          }}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo en couleur : nukleo (bordeaux) + chevron (violet) + virgule (violet), comme sur l'image */}
            <Link href={getLocalizedPath('/')} className="inline-flex items-baseline cursor-pointer touch-manipulation" aria-label={t('alt.logo') || 'Nukleo Digital - Accueil'}>
              <span
                className="font-bold tracking-tight"
                style={{
                  fontFamily: 'var(--font-heading, sans-serif)',
                  fontSize: 'clamp(1.35rem, 3.5vw, 2.75rem)',
                  color: logoBordeaux,
                }}
              >
                nukleo
              </span>
              <span className="ml-0.5" style={{ color: logoCommaPurple, fontSize: '0.9em' }} aria-hidden="true">→</span>
              <span className="font-bold tracking-tight" style={{ color: logoCommaPurple, fontFamily: 'var(--font-heading, sans-serif)', fontSize: 'clamp(1.35rem, 3.5vw, 2.75rem)' }}>,</span>
            </Link>

            {/* Right: Lang switcher (ENG / FR) + CTA split + Burger */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* ENG / FR — switcher compact */}
              <nav className="flex items-center gap-0.5 text-sm font-medium" aria-label={t('header.langSwitch')}>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 rounded transition-colors touch-manipulation ${
                    language === 'en'
                      ? 'text-gray-900 font-semibold bg-white/20'
                      : 'text-white/70 hover:text-white'
                  }`}
                  aria-current={language === 'en' ? 'true' : undefined}
                >
                  ENG
                </button>
                <span className="text-white/50 select-none" aria-hidden="true">/</span>
                <button
                  type="button"
                  onClick={() => setLanguage('fr')}
                  className={`px-2 py-1 rounded transition-colors touch-manipulation ${
                    language === 'fr'
                      ? 'text-gray-900 font-semibold bg-white/20'
                      : 'text-white/70 hover:text-white'
                  }`}
                  aria-current={language === 'fr' ? 'true' : undefined}
                >
                  FR
                </button>
              </nav>
              <SplitCTAButton
                href="/contact"
                label={t('nav.contact') || 'Contactez-nous'}
                ariaLabel={t('nav.contact') || 'Contactez-nous'}
                size="header"
                className="hidden xs:inline-flex touch-manipulation"
                onClick={playClick}
                onMouseEnter={playHover}
              />

              {/* Burger : cercle blanc, icône hamburger — scale sur grands écrans */}
              <button
                onClick={isMenuOpen ? handleMenuClose : handleMenuOpen}
                onMouseEnter={playHover}
                className="flex items-center justify-center rounded-full bg-white text-gray-800 hover:bg-gray-50 active:scale-95 transition-all duration-300 touch-manipulation flex-shrink-0"
                style={{ width: 'clamp(2.75rem, 4vw, 3.5rem)', height: 'clamp(2.75rem, 4vw, 3.5rem)' }}
                aria-label={isMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
              >
                <div className="relative" style={{ width: 'clamp(1.25rem, 1.5vw, 1.5rem)', height: 'clamp(1.25rem, 1.5vw, 1.5rem)' }}>
                  <Menu 
                    className={`absolute inset-0 w-full h-full text-gray-800 transition-all duration-300 ease-in-out ${
                      isMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                    }`}
                    strokeWidth={2}
                  />
                  <X 
                    className={`absolute inset-0 w-full h-full text-gray-800 transition-all duration-300 ease-in-out ${
                      isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
                    }`}
                    strokeWidth={2}
                  />
                </div>
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
