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
/** Décalage vertical pour "monter" un peu les ellipses */
const ELLIPSE_OFFSET_UP = 14;
/** Opacité min au scroll pour garder les ellipses encore un tout petit peu visibles */
const OPACITY_MIN = 0.22;
/** Au-delà de ce scroll (px), opacité = OPACITY_MIN */
const SCROLL_OPACITY_DISTANCE = 200;

export default function HeroGradientCloud() {
  const [height, setHeight] = useState(HEIGHT_MAX);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const y = typeof window !== 'undefined' ? window.scrollY : 0;
        setScrollY(y);
        setHeight(Math.max(HEIGHT_MIN, HEIGHT_MAX - y * 0.96));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onScroll, { passive: true });
    window.addEventListener('touchmove', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onScroll);
      window.removeEventListener('touchmove', onScroll);
    };
  }, []);

  // Au scroll : ellipses moins visibles, mais encore un tout petit peu
  const opacity = Math.max(OPACITY_MIN, 1 - (scrollY / SCROLL_OPACITY_DISTANCE) * (1 - OPACITY_MIN));

  /**
   * Ellipses nuageuses (courbe douce, plusieurs paliers) ; rouge très diffus pour ne pas marquer le bleu.
   * Bleu gauche 21%, centre rouge 50%, bleu droite 79%.
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
        transition: 'height 0.15s ease-out, opacity 0.2s ease-out',
        transform: `translateY(-${ELLIPSE_OFFSET_UP}px)`,
        opacity,
      }}
    />
  );

  if (typeof document === 'undefined') return null;
  return createPortal(gradientEl, document.body);
}
