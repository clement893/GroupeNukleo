import { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'wouter';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { useIsMobile } from '@/hooks/useIsMobile';
import { MOBILE_BREAKPOINT, ANIMATIONS } from '@/lib/constants';

const headerBtnClass =
  "inline-flex items-center justify-center gap-1.5 rounded-full text-gray-800 active:scale-95 transition-all duration-300 touch-manipulation flex-shrink-0 px-4 sm:px-5 font-semibold";
const headerBtnStyle: React.CSSProperties = {
  height: 'clamp(2.75rem, 4vw, 3.5rem)',
  fontFamily: "'Neue Haas Unica Pro', sans-serif",
  fontSize: 'clamp(0.9rem, 1vw, 1.05rem)',
  background: 'rgba(255, 255, 255, 0.35)',
  backdropFilter: 'blur(16px) saturate(180%)',
  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.7)',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
};

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
            {/* Logo Groupe nukleo — coin haut gauche, texte sur deux lignes */}
            <Link
              href={getLocalizedPath('/')}
              className="inline-flex flex-col cursor-pointer touch-manipulation leading-tight"
              aria-label={t('alt.logo') || 'Groupe Nukleo - Accueil'}
              style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}
            >
              <span className="text-gray-800 font-medium" style={{ fontSize: 'clamp(0.75rem, 2vw, 0.95rem)' }}>
                Le groupe
              </span>
              <span
                className="font-semibold bg-clip-text text-transparent"
                style={{
                  fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                  backgroundImage: 'linear-gradient(90deg, #c41e3a 0%, #6b2d5c 100%)',
                }}
              >
                Nukleo
              </span>
            </Link>

            {/* Boutons Nukleo et Rouge on Blue — liens externes */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="https://nukleo.com"
                target="_blank"
                rel="noopener noreferrer"
                className={headerBtnClass}
                style={headerBtnStyle}
                aria-label="Nukleo — ouvrir dans un nouvel onglet"
              >
                Nukleo
                <ExternalLink className="w-4 h-4 sm:w-[1.1em] sm:h-[1.1em]" strokeWidth={2} />
              </a>
              <a
                href="https://rougeonblue.com"
                target="_blank"
                rel="noopener noreferrer"
                className={headerBtnClass}
                style={headerBtnStyle}
                aria-label="Rouge on Blue — ouvrir dans un nouvel onglet"
              >
                Rouge on Blue
                <ExternalLink className="w-4 h-4 sm:w-[1.1em] sm:h-[1.1em]" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default memo(Header);
