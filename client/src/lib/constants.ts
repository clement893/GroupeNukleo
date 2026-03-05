/**
 * Constantes globales de l'application
 * Centralise les valeurs partagées comme les breakpoints, limites, etc.
 */

/**
 * Breakpoints pour les media queries et la détection de taille d'écran (alignés Tailwind).
 * Utilisés pour le responsive design.
 *
 * Usage recommandé :
 * - MOBILE_BREAKPOINT (768px) : menu burger, header CTA visibility, préfetch — "mobile" = < 768px.
 * - BREAKPOINTS.sm (640px) : uniquement quand un comportement spécifique "sm" est voulu (ex. HeroSection
 *   animation frame rate, ou affichage à partir de 640px). Préférer 768px pour la détection "mobile" générale.
 */
export const BREAKPOINTS = {
  /** Tailwind sm: min-width 640px */
  sm: 640,
  /** Tailwind md: min-width 768px — seuil "mobile" par défaut (menu, CTA) */
  md: 768,
  /** Tailwind lg: min-width 1024px */
  lg: 1024,
  /** Tailwind xl: min-width 1280px */
  xl: 1280,
  /** Tailwind 2xl: min-width 1280px */
  '2xl': 1280,
} as const;

/**
 * Valeur par défaut pour la détection mobile (header, menu, préfetch).
 * Utilisée dans useIsMobile et autres hooks. Préférer cette constante pour "est-ce mobile ?".
 */
export const MOBILE_BREAKPOINT = BREAKPOINTS.md; // 768px

/**
 * Limites et contraintes de l'application
 */
export const LIMITS = {
  /** Taille maximale d'un fichier uploadé (en bytes) */
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  /** Taille maximale d'un message/commentaire */
  MAX_MESSAGE_LENGTH: 5000,
  /** Nombre maximum de tentatives de connexion */
  MAX_LOGIN_ATTEMPTS: 5,
  /** Délai d'attente avant nouvelle tentative (en ms) */
  LOGIN_RETRY_DELAY: 15 * 60 * 1000, // 15 minutes
} as const;

/**
 * Délais et timeouts
 */
export const TIMEOUTS = {
  /** Timeout pour les requêtes API (en ms) */
  API_REQUEST: 30000, // 30 secondes
  /** Délai avant affichage d'un loader (en ms) */
  LOADER_DELAY: 200,
  /** Délai de debounce pour les recherches (en ms) */
  SEARCH_DEBOUNCE: 300,
  /** Intervalle de rafraîchissement des données (en ms) */
  DATA_REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes
} as const;

/**
 * Configuration des animations
 */
export const ANIMATIONS = {
  /** Durée par défaut des transitions (en ms) */
  DEFAULT_DURATION: 300,
  /** Durée des animations rapides (en ms) */
  FAST_DURATION: 150,
  /** Durée des animations lentes (en ms) */
  SLOW_DURATION: 500,
  /** Easing par défaut */
  DEFAULT_EASING: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** Réduction de durée sur mobile pour meilleures performances (en ms) */
  MOBILE_DURATION_REDUCTION: 100,
  /** Désactiver les animations complexes sur mobile */
  DISABLE_COMPLEX_ON_MOBILE: true,
  /** Utiliser will-change pour optimiser les animations */
  USE_WILL_CHANGE: true,
} as const;

/**
 * Configuration du cache
 */
export const CACHE = {
  /** Durée de cache pour les données statiques (en ms) */
  STATIC_DATA: 24 * 60 * 60 * 1000, // 24 heures
  /** Durée de cache pour les données dynamiques (en ms) */
  DYNAMIC_DATA: 5 * 60 * 1000, // 5 minutes
  /** Durée de cache pour les images (en ms) */
  IMAGES: 7 * 24 * 60 * 60 * 1000, // 7 jours
} as const;

