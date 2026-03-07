import { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'wouter';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { useIsMobile } from '@/hooks/useIsMobile';
import { MOBILE_BREAKPOINT, ANIMATIONS } from '@/lib/constants';

const headerBtnClass =
  "inline-flex items-center justify-center gap-1 text-gray-800 hover:opacity-80 active:scale-95 transition-all duration-200 touch-manipulation flex-shrink-0 px-3 sm:px-4 font-medium";

/**
 * Composant Header principal de l'application.
 *
 * Affiche le logo et le tagline.
 * S'adapte au scroll : cache le header en scrollant vers le bas, le réaffiche en scrollant vers le haut.
 * En haut de page, le header reste visible avec effet glass et tagline masqué après 50px.
 */
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();
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
            {/* Logo Groupe nukleo — coin haut gauche (PNG fond transparent) */}
            <Link
              href={getLocalizedPath('/')}
              className="inline-flex items-center cursor-pointer touch-manipulation"
              aria-label={t('alt.logo') || 'Groupe Nukleo - Accueil'}
            >
              <img
                src="/demo/LogoGroupeNukleo.svg"
                alt="Groupe Nukleo"
                className="w-auto object-contain object-left"
                style={{
                  height: 'clamp(2.25rem, 6vw, 3.75rem)',
                }}
              />
            </Link>

            {/* Boutons Nukleo et Rouge on Blue — liens externes */}
            <div className="flex items-center gap-4 sm:gap-6" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif", fontSize: 'clamp(0.9rem, 1vw, 1.05rem)' }}>
              <a
                href="https://nukleo.com"
                target="_blank"
                rel="noopener noreferrer"
                className={headerBtnClass}
                aria-label="Nukleo — ouvrir dans un nouvel onglet"
              >
                Nukleo
                <ChevronDown className="w-4 h-4 opacity-70" strokeWidth={2} />
              </a>
              <a
                href="https://rougeonblue.com"
                target="_blank"
                rel="noopener noreferrer"
                className={headerBtnClass}
                aria-label="Rouge on Blue — ouvrir dans un nouvel onglet"
              >
                Rouge on Blue
                <ChevronDown className="w-4 h-4 opacity-70" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default memo(Header);
