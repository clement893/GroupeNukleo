/**
 * Icônes 3D pour la section "Ce que nous faisons" du Lab technologique.
 * Chaque icône correspond au contenu du bloc (Applications Web, Mobile, Data & IA, etc.).
 * Même style que Expertise3DIcons : volumétrique, dégradés, ombres douces.
 */

const ICON_SIZE = 96;
const SHADOW = '0 6px 16px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)';

export function Icon3DWebApps() {
  const prefix = 'tech-web';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#74B9FF" />
          <stop offset="100%" stopColor="#0984E3" />
        </linearGradient>
        <linearGradient id={`${prefix}-bar`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#636E72" />
          <stop offset="100%" stopColor="#2D3436" />
        </linearGradient>
      </defs>
      <rect x="8" y="12" width="32" height="24" rx="3" fill={`url(#${prefix}-bg)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <rect x="8" y="12" width="32" height="8" rx="2" fill={`url(#${prefix}-bar)`} />
      <circle cx="14" cy="16" r="1.5" fill="#E17055" />
      <circle cx="20" cy="16" r="1.5" fill="#FDCB6E" />
      <circle cx="26" cy="16" r="1.5" fill="#00B894" />
    </svg>
  );
}

export function Icon3DMobileApps() {
  const prefix = 'tech-mobile';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-body`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B2BEC3" />
          <stop offset="100%" stopColor="#636E72" />
        </linearGradient>
        <linearGradient id={`${prefix}-screen`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A29BFE" />
          <stop offset="100%" stopColor="#6C5CE7" />
        </linearGradient>
      </defs>
      <rect x="16" y="6" width="16" height="36" rx="3" fill={`url(#${prefix}-body)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <rect x="18" y="10" width="12" height="26" rx="1.5" fill={`url(#${prefix}-screen)`} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <circle cx="24" cy="38" r="2" fill="#2D3436" />
    </svg>
  );
}

export function Icon3DDataIA() {
  const prefix = 'tech-data';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-node`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#523DCB" />
        </linearGradient>
        <linearGradient id={`${prefix}-node2`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00B894" />
          <stop offset="100%" stopColor="#00CEC9" />
        </linearGradient>
        <linearGradient id={`${prefix}-node3`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FD79A8" />
          <stop offset="100%" stopColor="#E84393" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="14" r="8" fill={`url(#${prefix}-node)`} stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <circle cx="14" cy="34" r="6" fill={`url(#${prefix}-node2)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <circle cx="34" cy="34" r="6" fill={`url(#${prefix}-node3)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <path d="M24 22 L18 28 M24 22 L30 28" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Icon3DIntegrations() {
  const prefix = 'tech-api';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-plug`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDCB6E" />
          <stop offset="100%" stopColor="#E67E22" />
        </linearGradient>
        <linearGradient id={`${prefix}-slot`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#74B9FF" />
          <stop offset="100%" stopColor="#0984E3" />
        </linearGradient>
      </defs>
      <rect x="14" y="8" width="20" height="14" rx="2" fill={`url(#${prefix}-plug)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <rect x="20" y="22" width="8" height="18" rx="1" fill={`url(#${prefix}-plug)`} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <rect x="18" y="12" width="4" height="6" rx="0.5" fill={`url(#${prefix}-slot)`} />
      <rect x="26" y="12" width="4" height="6" rx="0.5" fill={`url(#${prefix}-slot)`} />
    </svg>
  );
}

export function Icon3DDevOps() {
  const prefix = 'tech-devops';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-rocket`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00B894" />
          <stop offset="50%" stopColor="#00CEC9" />
          <stop offset="100%" stopColor="#81ECEC" />
        </linearGradient>
        <linearGradient id={`${prefix}-flame`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#E17055" />
          <stop offset="100%" stopColor="#FDCB6E" />
        </linearGradient>
      </defs>
      <path d="M24 8 L28 20 L24 40 L20 20 Z" fill={`url(#${prefix}-rocket)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <path d="M20 20 Q24 28 24 40 Q24 28 28 20" fill="none" stroke={`url(#${prefix}-flame)`} strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="14" r="3" fill="rgba(255,255,255,0.9)" />
    </svg>
  );
}

export function Icon3DAIApps() {
  const prefix = 'tech-ai';
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(${SHADOW})` }}>
      <defs>
        <linearGradient id={`${prefix}-brain`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A29BFE" />
          <stop offset="50%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#523DCB" />
        </linearGradient>
        <linearGradient id={`${prefix}-spark`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFEAA7" />
          <stop offset="100%" stopColor="#FDCB6E" />
        </linearGradient>
      </defs>
      <ellipse cx="24" cy="26" rx="14" ry="12" fill={`url(#${prefix}-brain)`} stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <path d="M16 18 Q24 10 32 18 Q24 14 24 22 Q24 14 16 18 Z" fill={`url(#${prefix}-spark)`} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <circle cx="20" cy="24" r="2.5" fill="rgba(255,255,255,0.8)" />
      <circle cx="28" cy="24" r="2.5" fill="rgba(255,255,255,0.8)" />
    </svg>
  );
}

export const TECH_EXPERTISE_3D_ICONS = [
  Icon3DWebApps,       // Applications Web
  Icon3DMobileApps,    // Applications Mobiles
  Icon3DDataIA,        // Architecture Data & IA
  Icon3DIntegrations,  // Intégrations & APIs
  Icon3DDevOps,        // Déploiement & DevOps
  Icon3DAIApps,        // Applications IA propriétaires
] as const;
