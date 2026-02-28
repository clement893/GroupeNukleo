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
    scrollToTop();
    // Après le paint : annule un éventuel scroll dû au layout ou au lazy loading
    const rafId = requestAnimationFrame(() => {
      scrollToTop();
    });
    // Une fois le contenu lazy chargé : on force encore le scroll en haut
    const tId = setTimeout(scrollToTop, 150);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(tId);
    };
  }, [location]);

  return null;
}
