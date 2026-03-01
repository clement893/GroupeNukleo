import { useLayoutEffect } from 'react';
import { useLocation } from 'wouter';

function scrollToTop() {
  try {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  } catch {
    window.scrollTo(0, 0);
  }
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function ScrollToTop() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // useLayoutEffect = avant paint, scroll uniquement au moment du changement de route (pas de timeouts pour ne pas ramener en haut après coup)
  useLayoutEffect(() => {
    scrollToTop();
    const rafId = requestAnimationFrame(() => {
      scrollToTop();
      requestAnimationFrame(scrollToTop);
    });
    return () => cancelAnimationFrame(rafId);
  }, [location]);

  return null;
}
