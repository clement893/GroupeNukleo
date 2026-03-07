/**
 * Hook pour précharger les routes fréquemment visitées
 * Améliore les performances en préchargeant les chunks avant que l'utilisateur ne clique
 */

import { useEffect } from 'react';
import { useIsMobile } from './useIsMobile';
import { MOBILE_BREAKPOINT } from '@/lib/constants';

/**
 * Routes à précharger (site réduit à la page d'accueil uniquement)
 */
const FREQUENT_ROUTES: string[] = [];

/**
 * Hook pour précharger les routes fréquemment visitées
 * 
 * @param enabled - Active ou désactive le prefetch (désactivé sur mobile pour économiser la bande passante)
 */
export function usePrefetch(enabled: boolean = true) {
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);

  useEffect(() => {
    // Désactiver le prefetch sur mobile pour économiser la bande passante
    if (!enabled || isMobile) return;

    // Attendre que la page soit chargée avant de commencer le prefetch
    const prefetchDelay = 2000; // 2 secondes après le chargement initial

    const timeoutId = setTimeout(() => {
      // Précharger les routes fréquemment visitées
      FREQUENT_ROUTES.forEach((route, index) => {
        // Stagger les prefetch pour éviter de surcharger le réseau
        setTimeout(() => {
          // Créer un lien invisible pour déclencher le prefetch
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = route;
          link.as = 'document';
          document.head.appendChild(link);

          // Nettoyer après un délai
          setTimeout(() => {
            if (link.parentNode) {
              link.parentNode.removeChild(link);
            }
          }, 10000); // Garder le prefetch pendant 10 secondes
        }, index * 500); // 500ms entre chaque prefetch
      });
    }, prefetchDelay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [enabled, isMobile]);
}

/**
 * Fonction utilitaire pour précharger une route spécifique
 * 
 * @param route - La route à précharger
 */
export function prefetchRoute(route: string) {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = route;
  link.as = 'document';
  document.head.appendChild(link);

  // Nettoyer après un délai
  setTimeout(() => {
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
  }, 10000);
}

