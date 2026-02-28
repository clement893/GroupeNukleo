import { useEffect } from 'react';
import { useLocation } from 'wouter';

function scrollToTop() {
  window.scrollTo(0, 0);
}

export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Désactiver la restauration automatique du scroll par le navigateur
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    scrollToTop();
    const rafId = requestAnimationFrame(() => {
      scrollToTop();
      requestAnimationFrame(scrollToTop);
    });
    const t1 = setTimeout(scrollToTop, 150);
    const t2 = setTimeout(scrollToTop, 400);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location]);

  return null;
}
