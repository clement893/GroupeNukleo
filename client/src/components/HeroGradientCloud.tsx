/**
 * Header Nukleo — dégradé multi-couches (aligné REF2).
 * position: fixed pour qu’il reste visible en haut du viewport sur toutes les pages.
 */
/**
 * Header Nukleo — dégradé multi-couches (aligné REF2).
 * position: fixed pour qu'il reste visible en haut du viewport sur toutes les pages.
 */
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const HEIGHT_MAX = 256; // 320 - 20%
const HEIGHT_MIN = Math.round(HEIGHT_MAX * 0.7); // ~179px au scroll

export default function HeroGradientCloud() {
  const [height, setHeight] = useState(HEIGHT_MAX);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
      setHeight(Math.max(HEIGHT_MIN, HEIGHT_MAX - scrollY * 0.96));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /**
   * Ellipses nuageuses (courbe douce, plusieurs paliers) ; rouge très diffus pour ne pas marquer le bleu.
   */
  const background =
    'radial-gradient(ellipse 28% 52.5% at 21% 0%, rgba(102, 72, 180, 1) 0%, rgba(102, 72, 180, 0.82) 28%, rgba(102, 72, 180, 0.48) 55%, rgba(102, 72, 180, 0.12) 82%, transparent 100%), radial-gradient(ellipse 26% 30% at 50% 0%, rgba(128, 70, 81, 1) 0%, rgba(128, 70, 81, 0.5) 32%, rgba(128, 70, 81, 0.18) 55%, rgba(128, 70, 81, 0.04) 78%, transparent 100%), radial-gradient(ellipse 28% 52.5% at 79% 0%, rgba(96, 70, 176, 1) 0%, rgba(96, 70, 176, 0.82) 28%, rgba(96, 70, 176, 0.48) 55%, rgba(96, 70, 176, 0.12) 82%, transparent 100%), linear-gradient(to bottom, #e8e0f0 0px, #f5f2f8 60px, transparent 160px), transparent';

  const gradientEl = (
    <div
      aria-hidden
      className="overflow-hidden pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100vw',
        minWidth: '100%',
        margin: 0,
        padding: 0,
        minHeight: height,
        height,
        zIndex: 20,
        background,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        boxSizing: 'border-box',
        transition: 'height 0.15s ease-out',
      }}
    />
  );

  if (typeof document === 'undefined') return null;
  return createPortal(gradientEl, document.body);
}
