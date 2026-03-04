/**
 * Icônes 3D colorées pour la section "Ce que nous créons" du Studio.
 * Style inspiré : volumétrique, dégradés, ombres douces, aspect glossy.
 */

const ICON_SIZE = 48;
const SHADOW = '0 6px 16px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)';

export function Icon3DBranding() {
  const prefix = 'branding';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD93D" />
          <stop offset="50%" stopColor="#FF9F43" />
          <stop offset="100%" stopColor="#EE5A24" />
        </linearGradient>
        <linearGradient id={`${prefix}-dot1`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#5D43CD" />
        </linearGradient>
        <linearGradient id={`${prefix}-dot2`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00B894" />
          <stop offset="100%" stopColor="#00CEC9" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="18" fill={`url(#${prefix}-bg)`} stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="4" fill={`url(#${prefix}-dot1)`} />
      <circle cx="30" cy="16" r="4" fill={`url(#${prefix}-dot2)`} />
      <circle cx="28" cy="28" r="4" fill="#E17055" />
    </svg>
  );
}

export function Icon3DUXUI() {
  const prefix = 'uxui';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#74B9FF" />
          <stop offset="100%" stopColor="#0984E3" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="14" height="10" rx="2.5" fill={`url(#${prefix}-bg)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <rect x="26" y="8" width="14" height="10" rx="2.5" fill={`url(#${prefix}-bg)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <rect x="8" y="24" width="14" height="10" rx="2.5" fill={`url(#${prefix}-bg)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <rect x="26" y="24" width="14" height="10" rx="2.5" fill={`url(#${prefix}-bg)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    </svg>
  );
}

export function Icon3DArtDirection() {
  const prefix = 'artdir';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-body`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FD79A8" />
          <stop offset="50%" stopColor="#E84393" />
          <stop offset="100%" stopColor="#D63031" />
        </linearGradient>
        <linearGradient id={`${prefix}-tip`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2D3436" />
          <stop offset="100%" stopColor="#636E72" />
        </linearGradient>
      </defs>
      <path d="M28 8 L38 18 L18 38 L8 28 Z" fill={`url(#${prefix}-body)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <path d="M8 28 L18 38 L14 42 L4 32 Z" fill={`url(#${prefix}-tip)`} />
    </svg>
  );
}

export function Icon3DCampaign() {
  const prefix = 'campaign';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-body`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDCB6E" />
          <stop offset="50%" stopColor="#F39C12" />
          <stop offset="100%" stopColor="#E67E22" />
        </linearGradient>
        <linearGradient id={`${prefix}-mouth`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E17055" />
          <stop offset="100%" stopColor="#D63031" />
        </linearGradient>
      </defs>
      <path d="M12 18 Q12 12 24 12 Q36 12 36 18 L36 26 Q36 32 24 32 Q12 32 12 26 Z" fill={`url(#${prefix}-body)`} stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <ellipse cx="24" cy="22" rx="6" ry="4" fill={`url(#${prefix}-mouth)`} />
      <rect x="22" y="8" width="4" height="6" rx="1" fill={`url(#${prefix}-body)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    </svg>
  );
}

export function Icon3DMotion() {
  const prefix = 'motion';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A29BFE" />
          <stop offset="100%" stopColor="#6C5CE7" />
        </linearGradient>
      </defs>
      <rect x="6" y="8" width="36" height="28" rx="4" fill={`url(#${prefix}-bg)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <path d="M20 16 L20 28 L32 22 Z" fill="white" fillOpacity="0.95" />
    </svg>
  );
}

export function Icon3DProduction() {
  const prefix = 'production';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-body`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B2BEC3" />
          <stop offset="50%" stopColor="#636E72" />
          <stop offset="100%" stopColor="#2D3436" />
        </linearGradient>
        <linearGradient id={`${prefix}-lens`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#74B9FF" />
          <stop offset="100%" stopColor="#0984E3" />
        </linearGradient>
      </defs>
      <rect x="10" y="14" width="28" height="20" rx="3" fill={`url(#${prefix}-body)`} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <circle cx="24" cy="24" r="8" fill={`url(#${prefix}-lens)`} stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="4" fill="#2D3436" />
      <rect x="20" y="8" width="8" height="6" rx="1" fill={`url(#${prefix}-body)`} />
    </svg>
  );
}

export const EXPERTISE_3D_ICONS = [
  Icon3DBranding,
  Icon3DUXUI,
  Icon3DArtDirection,
  Icon3DCampaign,
  Icon3DMotion,
  Icon3DProduction,
] as const;
