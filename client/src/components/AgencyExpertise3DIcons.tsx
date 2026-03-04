/**
 * Icônes 3D pour la section "Ce que nous faisons" de l'Agence Comm & Marketing.
 * Chaque icône correspond au contenu du bloc (Stratégie, SEO, Performance, etc.).
 * Même style que Expertise3DIcons : volumétrique, dégradés, ombres douces.
 */

const ICON_SIZE = 96;
const SHADOW = '0 6px 16px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)';

export function Icon3DStrategy() {
  const prefix = 'agency-strategy';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-chart`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#00B894" />
          <stop offset="100%" stopColor="#00CEC9" />
        </linearGradient>
        <linearGradient id={`${prefix}-target`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#5D43CD" />
        </linearGradient>
      </defs>
      <path d="M12 36 L12 28 L18 24 L24 30 L30 20 L36 26 L36 36 Z" fill={`url(#${prefix}-chart)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <circle cx="36" cy="14" r="6" fill={`url(#${prefix}-target)`} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <circle cx="36" cy="14" r="2.5" fill="white" fillOpacity="0.9" />
    </svg>
  );
}

export function Icon3DSEO() {
  const prefix = 'agency-seo';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-glass`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#74B9FF" />
          <stop offset="100%" stopColor="#0984E3" />
        </linearGradient>
        <linearGradient id={`${prefix}-handle`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#636E72" />
          <stop offset="100%" stopColor="#2D3436" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="22" r="10" fill={`url(#${prefix}-glass)`} stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <path d="M28 18 L34 12 L34 14 L29 19 L28 18 Z" fill="rgba(255,255,255,0.9)" />
      <rect x="20" y="28" width="8" height="12" rx="1" fill={`url(#${prefix}-handle)`} />
    </svg>
  );
}

export function Icon3DPerformance() {
  const prefix = 'agency-perf';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-megaphone`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E17055" />
          <stop offset="100%" stopColor="#D63031" />
        </linearGradient>
        <linearGradient id={`${prefix}-cone`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FDCB6E" />
          <stop offset="100%" stopColor="#E67E22" />
        </linearGradient>
      </defs>
      <path d="M14 20 L14 28 L12 30 L12 34 L16 34 L16 30 L18 28 L18 20 Z" fill={`url(#${prefix}-megaphone)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <path d="M18 24 L38 14 L38 34 L18 24 Z" fill={`url(#${prefix}-cone)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    </svg>
  );
}

export function Icon3DAutomation() {
  const prefix = 'agency-auto';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-gear`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B2BEC3" />
          <stop offset="100%" stopColor="#636E72" />
        </linearGradient>
        <linearGradient id={`${prefix}-gear2`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A29BFE" />
          <stop offset="100%" stopColor="#6C5CE7" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="14" fill={`url(#${prefix}-gear)`} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <path d="M24 12 L26 16 L30 16 L27 19 L28 24 L24 21 L20 24 L21 19 L18 16 L22 16 Z" fill={`url(#${prefix}-gear2)`} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <circle cx="24" cy="24" r="5" fill={`url(#${prefix}-gear)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    </svg>
  );
}

export function Icon3DSocial() {
  const prefix = 'agency-social';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-bubble`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FD79A8" />
          <stop offset="100%" stopColor="#E84393" />
        </linearGradient>
        <linearGradient id={`${prefix}-bubble2`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#74B9FF" />
          <stop offset="100%" stopColor="#0984E3" />
        </linearGradient>
      </defs>
      <ellipse cx="18" cy="28" rx="10" ry="8" fill={`url(#${prefix}-bubble)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <ellipse cx="30" cy="22" rx="10" ry="8" fill={`url(#${prefix}-bubble2)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <circle cx="14" cy="14" r="6" fill={`url(#${prefix}-bubble)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <circle cx="34" cy="34" r="5" fill={`url(#${prefix}-bubble2)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    </svg>
  );
}

export function Icon3DAnalytics() {
  const prefix = 'agency-analytics';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-bar1`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#00B894" />
          <stop offset="100%" stopColor="#00CEC9" />
        </linearGradient>
        <linearGradient id={`${prefix}-bar2`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#5D43CD" />
        </linearGradient>
        <linearGradient id={`${prefix}-bar3`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FDCB6E" />
          <stop offset="100%" stopColor="#E67E22" />
        </linearGradient>
      </defs>
      <rect x="10" y="26" width="8" height="12" rx="2" fill={`url(#${prefix}-bar1)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <rect x="20" y="18" width="8" height="20" rx="2" fill={`url(#${prefix}-bar2)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <rect x="30" y="12" width="8" height="26" rx="2" fill={`url(#${prefix}-bar3)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    </svg>
  );
}

export const AGENCY_EXPERTISE_3D_ICONS = [
  Icon3DStrategy,    // Stratégie de croissance
  Icon3DSEO,         // SEO & contenu organique
  Icon3DPerformance, // Marketing de performance
  Icon3DAutomation,  // Marketing automation & CRM
  Icon3DSocial,      // Social media & communauté
  Icon3DAnalytics,   // Analytics & intelligence
] as const;
