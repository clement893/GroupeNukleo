/**
 * Icônes 3D pour la section "Ce que nous faisons" de Transition numérique.
 * Chaque icône correspond au contenu du bloc (Audit, Stratégie, Transformation, etc.).
 * Même style que les autres : volumétrique, dégradés, ombres douces.
 */

const ICON_SIZE = 96;
const SHADOW = '0 6px 16px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)';

export function Icon3DAudit() {
  const prefix = 'consult-audit';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-clip`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#74B9FF" />
          <stop offset="100%" stopColor="#0984E3" />
        </linearGradient>
        <linearGradient id={`${prefix}-check`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00B894" />
          <stop offset="100%" stopColor="#00CEC9" />
        </linearGradient>
      </defs>
      <rect x="14" y="8" width="20" height="32" rx="2" fill={`url(#${prefix}-clip)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <rect x="14" y="8" width="20" height="8" rx="1" fill="rgba(255,255,255,0.25)" />
      <path d="M18 22 L22 26 L30 18" stroke={`url(#${prefix}-check)`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M18 30 L22 34 L30 26" stroke={`url(#${prefix}-check)`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function Icon3DRoadmap() {
  const prefix = 'consult-roadmap';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-path`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#523DCB" />
        </linearGradient>
        <linearGradient id={`${prefix}-dot`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDCB6E" />
          <stop offset="100%" stopColor="#E67E22" />
        </linearGradient>
      </defs>
      <path d="M8 24 L18 18 L28 24 L38 20" stroke={`url(#${prefix}-path)`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="8" cy="24" r="4" fill={`url(#${prefix}-dot)`} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <circle cx="18" cy="18" r="4" fill={`url(#${prefix}-dot)`} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <circle cx="28" cy="24" r="4" fill={`url(#${prefix}-dot)`} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <circle cx="38" cy="20" r="4" fill={`url(#${prefix}-dot)`} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
    </svg>
  );
}

export function Icon3DTransformation() {
  const prefix = 'consult-transform';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-arrow`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00B894" />
          <stop offset="100%" stopColor="#00CEC9" />
        </linearGradient>
        <linearGradient id={`${prefix}-people`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FD79A8" />
          <stop offset="100%" stopColor="#E84393" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="28" r="6" fill={`url(#${prefix}-people)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <circle cx="32" cy="20" r="6" fill={`url(#${prefix}-people)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <path d="M22 26 L26 22 M26 22 L32 20 M26 22 L24 28" stroke={`url(#${prefix}-arrow)`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function Icon3DPerformance() {
  const prefix = 'consult-perf';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-bar1`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#74B9FF" />
          <stop offset="100%" stopColor="#0984E3" />
        </linearGradient>
        <linearGradient id={`${prefix}-bar2`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#00B894" />
          <stop offset="100%" stopColor="#00CEC9" />
        </linearGradient>
        <linearGradient id={`${prefix}-bar3`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FDCB6E" />
          <stop offset="100%" stopColor="#E67E22" />
        </linearGradient>
      </defs>
      <rect x="10" y="28" width="7" height="10" rx="2" fill={`url(#${prefix}-bar1)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <rect x="20" y="20" width="7" height="18" rx="2" fill={`url(#${prefix}-bar2)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <rect x="30" y="12" width="7" height="26" rx="2" fill={`url(#${prefix}-bar3)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    </svg>
  );
}

export function Icon3DGovernance() {
  const prefix = 'consult-gov';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-scale`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B2BEC3" />
          <stop offset="100%" stopColor="#636E72" />
        </linearGradient>
        <linearGradient id={`${prefix}-pan`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#523DCB" />
        </linearGradient>
      </defs>
      <path d="M24 8 L24 32 M14 14 L34 14 L34 26 L14 26 Z" stroke={`url(#${prefix}-scale)`} strokeWidth="2" fill="none" />
      <path d="M14 20 L34 20" stroke={`url(#${prefix}-scale)`} strokeWidth="1.5" />
      <circle cx="18" cy="20" r="4" fill={`url(#${prefix}-pan)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <circle cx="30" cy="20" r="4" fill={`url(#${prefix}-pan)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    </svg>
  );
}

export function Icon3DCoconstruction() {
  const prefix = 'consult-co';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-hand`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FD79A8" />
          <stop offset="100%" stopColor="#E84393" />
        </linearGradient>
        <linearGradient id={`${prefix}-hand2`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#74B9FF" />
          <stop offset="100%" stopColor="#0984E3" />
        </linearGradient>
      </defs>
      <ellipse cx="18" cy="28" rx="8" ry="10" fill={`url(#${prefix}-hand)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <ellipse cx="30" cy="24" rx="8" ry="10" fill={`url(#${prefix}-hand2)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <path d="M22 22 L26 20" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export const CONSULTING_EXPERTISE_3D_ICONS = [
  Icon3DAudit,           // Audit & diagnostic numérique
  Icon3DRoadmap,         // Stratégie & feuille de route
  Icon3DTransformation,  // Transformation organisationnelle
  Icon3DPerformance,    // Performance & optimisation
  Icon3DGovernance,      // Gouvernance & éthique IA
  Icon3DCoconstruction,  // Co-construction avec vos équipes
] as const;
