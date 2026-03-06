import { X } from 'lucide-react';
import { Link } from 'wouter';
import { useEffect } from 'react';
import { useSound } from '@/hooks/useSound';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

// Fond violet semi-transparent + blur
const MENU_BG = 'rgba(111, 66, 193, 0.92)';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MAIN_LINKS = [
  { labelKey: 'nav.home', labelFr: 'Accueil', path: '/' },
  { labelKey: 'nav.about', labelFr: 'À propos de nous', path: '#about' },
  { labelKey: 'nav.projects', labelFr: 'Nos projets', path: '#projects' },
  { labelKey: 'nav.contact', labelFr: 'Contactez-nous', path: '#contact' },
] as const;

const SERVICE_LINKS = [
  { labelKey: 'menu.serviceTech', path: '#services' },
  { labelKey: 'menu.serviceStudio', path: '#services' },
  { labelKey: 'menu.serviceAgency', path: '#services' },
  { labelKey: 'menu.serviceConsulting', path: '#services' },
] as const;

export default function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const { playHover, playClick } = useSound();
  const { t: tLang } = useLanguage();
  const getLocalizedPath = useLocalizedPath();

  const tLabel = (key: string, fallback: string) => (tLang(key) || fallback).trim() || fallback;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLinkClick = () => {
    playClick();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col backdrop-blur-md"
      style={{
        background: MENU_BG,
        WebkitBackdropFilter: 'blur(12px)',
        backdropFilter: 'blur(12px)',
      }}
      role="dialog"
      aria-modal="true"
      aria-label={tLang('menu.ariaLabel') || 'Menu principal'}
      aria-hidden={!isOpen}
    >
      {/* Bouton fermer : cercle blanc, X gris — en haut à droite */}
      <div className="absolute top-5 right-5 sm:top-6 sm:right-6 z-10">
        <button
          type="button"
          onClick={() => { playClick(); onClose(); }}
          onMouseEnter={playHover}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-gray-500 hover:bg-gray-50 active:scale-95 transition-all touch-manipulation"
          aria-label={tLang('header.closeMenu') || 'Fermer le menu'}
        >
          <X className="w-6 h-6" strokeWidth={2.5} />
        </button>
      </div>

      {/* Logo en couleur — lien vers accueil */}
      <div className="flex-shrink-0 px-8 sm:px-12 md:px-16 lg:px-20 pt-8 pb-4">
        <Link href={getLocalizedPath('/')} onClick={handleLinkClick} onMouseEnter={playHover} className="group inline-flex items-center touch-manipulation transition-opacity hover:opacity-90 duration-300" aria-label="Nukleo - Accueil">
          <img
            src="/demo/nukleo-logo-rvb.svg"
            alt="Nukleo"
            className="w-auto object-contain"
            style={{ height: 'clamp(2.25rem, 6vw, 3.4rem)' }}
          />
        </Link>
      </div>

      {/* Navigation principale — texte très grand, plein écran comme sur l'image */}
      <nav className="flex-1 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-20 pt-4 pb-8">
        <ul className="space-y-4 sm:space-y-6 md:space-y-8">
          {MAIN_LINKS.map(({ labelKey, labelFr, path }) => (
            <li key={path}>
              <a href={path.startsWith('#') ? path : getLocalizedPath(path)} onClick={handleLinkClick} className="group block">
                <span
                  onMouseEnter={playHover}
                  className="block py-1.5 text-white transition-all duration-300 ease-out touch-manipulation
                    group-hover:opacity-95 group-hover:translate-x-2 group-hover:scale-[1.02]"
                  style={{
                    fontFamily: "'Neue Haas Unica Pro', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(2rem, 8vw, 4rem)',
                    lineHeight: 1.1,
                  }}
                >
                  {tLabel(labelKey, labelFr)}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Séparateur */}
      <hr className="border-t border-white/25 mx-8 sm:mx-12 md:mx-16 lg:mx-20 flex-shrink-0" />

      {/* Liens services — plus petits, en bas */}
      <div className="px-8 sm:px-12 md:px-16 lg:px-20 py-6 sm:py-8 flex-shrink-0">
        <div className="flex flex-wrap justify-between gap-x-8 gap-y-4 text-white/80 text-base sm:text-lg" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif", fontWeight: 700 }}>
          {SERVICE_LINKS.map(({ labelKey, path }) => (
            <a key={labelKey} href={path} onClick={handleLinkClick} className="group inline-block">
              <span
                onMouseEnter={playHover}
                className="transition-all duration-300 ease-out touch-manipulation
                  group-hover:text-white group-hover:underline group-hover:underline-offset-4 group-hover:scale-105"
              >
                {tLabel(labelKey, labelKey)}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
