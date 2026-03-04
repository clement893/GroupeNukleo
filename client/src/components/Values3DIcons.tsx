/**
 * Icônes 3D colorées pour la section "Nos valeurs" de la page À propos.
 * Style inspiré du Studio créatif : volumétrique, dégradés, ombres douces, aspect glossy.
 */

const ICON_SIZE = 48;
const SHADOW = '0 6px 16px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)';

export function Icon3DExcellence() {
  const prefix = 'excellence';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-cup`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD93D" />
          <stop offset="50%" stopColor="#F39C12" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <linearGradient id={`${prefix}-base`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E67E22" />
          <stop offset="100%" stopColor="#D35400" />
        </linearGradient>
      </defs>
      {/* Coupe du trophée */}
      <path d="M14 20 L14 32 L34 32 L34 20 Q24 14 24 14 Q24 14 14 20 Z" fill={`url(#${prefix}-cup)`} stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      {/* Base */}
      <rect x="18" y="32" width="12" height="4" rx="1" fill={`url(#${prefix}-base)`} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      {/* Poignées */}
      <path d="M14 22 Q8 24 8 28 Q8 30 12 30" stroke={`url(#${prefix}-cup)`} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M34 22 Q40 24 40 28 Q40 30 36 30" stroke={`url(#${prefix}-cup)`} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Étoile */}
      <path d="M24 8 L26 14 L32 14 L28 18 L30 24 L24 20 L18 24 L20 18 L16 14 L22 14 Z" fill="#FFE066" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
    </svg>
  );
}

export function Icon3DOwnership() {
  const prefix = 'ownership';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-hand1`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00B894" />
          <stop offset="100%" stopColor="#00CEC9" />
        </linearGradient>
        <linearGradient id={`${prefix}-hand2`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0984E3" />
          <stop offset="100%" stopColor="#74B9FF" />
        </linearGradient>
      </defs>
      {/* Main gauche */}
      <path d="M12 18 Q12 12 18 10 L22 12 Q26 14 24 20 L22 28 Q20 34 16 36 L12 34" fill={`url(#${prefix}-hand1)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Main droite */}
      <path d="M36 18 Q36 12 30 10 L26 12 Q22 14 24 20 L26 28 Q28 34 32 36 L36 34" fill={`url(#${prefix}-hand2)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Point de poignée de main */}
      <circle cx="24" cy="22" r="4" fill="#00B894" fillOpacity="0.8" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
    </svg>
  );
}

export function Icon3DAuthenticity() {
  const prefix = 'authenticity';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-bubble`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#74B9FF" />
          <stop offset="100%" stopColor="#0984E3" />
        </linearGradient>
        <linearGradient id={`${prefix}-dot`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A29BFE" />
          <stop offset="100%" stopColor="#6C5CE7" />
        </linearGradient>
      </defs>
      {/* Bulle de dialogue */}
      <path d="M12 8 L36 8 Q42 8 42 14 L42 26 Q42 32 36 32 L24 32 L18 38 L18 32 L12 32 Q6 32 6 26 L6 14 Q6 8 12 8 Z" fill={`url(#${prefix}-bubble)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      {/* Points de parole */}
      <circle cx="18" cy="18" r="2.5" fill="white" fillOpacity="0.95" />
      <circle cx="24" cy="18" r="2.5" fill="white" fillOpacity="0.95" />
      <circle cx="30" cy="18" r="2.5" fill="white" fillOpacity="0.95" />
    </svg>
  );
}

export function Icon3DBienveillance() {
  const prefix = 'bienveillance';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-heart`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FD79A8" />
          <stop offset="50%" stopColor="#E84393" />
          <stop offset="100%" stopColor="#D63031" />
        </linearGradient>
      </defs>
      {/* Cœur */}
      <path d="M24 38 C24 38 8 28 8 18 Q8 12 14 12 Q18 12 24 18 Q30 12 36 12 Q42 12 42 18 C42 28 24 38 24 38 Z" fill={`url(#${prefix}-heart)`} stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    </svg>
  );
}

export const VALUES_3D_ICONS = {
  excellence: Icon3DExcellence,
  ownership: Icon3DOwnership,
  authenticity: Icon3DAuthenticity,
  bienveillance: Icon3DBienveillance,
} as const;
