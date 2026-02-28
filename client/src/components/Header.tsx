import { useState, useEffect, useCallback, memo } from 'react';
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
 * S'adapte au scroll avec un effet glass et cache le tagline quand on scroll.
 * 
 * @returns Le composant Header avec logo, navigation et menu
 */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { playHover, playClick } = useSound();
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);
  
  // Optimize animation duration for mobile
  const animationDuration = isMobile 
    ? ANIMATIONS.DEFAULT_DURATION - ANIMATIONS.MOBILE_DURATION_REDUCTION
    : ANIMATIONS.DEFAULT_DURATION;
  
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
    // Optimize scroll handler for mobile - use passive listener and throttle
    let ticking = false;
    let lastScrollY = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Skip if scroll change is minimal to reduce updates
      if (Math.abs(currentScrollY - lastScrollY) < 10 && ticking) return;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(currentScrollY > 50);
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better scroll performance
    // Store handler reference for proper cleanup
    const scrollOptions = { passive: true } as AddEventListenerOptions;
    window.addEventListener('scroll', handleScroll, scrollOptions);
    return () => {
      window.removeEventListener('scroll', handleScroll, scrollOptions);
    };
  }, []);

  const btnPurple = '#5B21B6';
  const logoBordeaux = '#712D3A';
  const logoCommaPurple = '#7e3e9d';

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all ${isMobile ? `duration-${animationDuration}` : 'duration-300 sm:duration-700'} ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isScrolled ? 'px-4 sm:px-6 md:px-12 pt-3 sm:pt-4' : 'px-4 sm:px-6 md:px-12 pt-6 sm:pt-8'}
        `}
        style={{
          background: 'transparent',
          ...(isMobile && ANIMATIONS.USE_WILL_CHANGE ? { willChange: 'transform, opacity' } : {}),
        }}
      >
        <div 
          className="transition-all duration-300 sm:duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] px-4 sm:px-6 md:px-8 py-3 sm:py-4"
          style={{
            background: 'transparent',
            borderRadius: 0,
            boxShadow: isScrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
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

            {/* Right: CTA split (Contactez-nous | flèche) + Burger */}
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
