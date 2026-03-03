import { useState, useRef, useEffect } from 'react';

const TEAM_IMGS = ['/demo/team-1.jpg', '/demo/team-2.jpg', '/demo/team-3.jpg', '/demo/team-4.jpg'];

const TEAM_MEMBERS = [
  {
    name: 'Clément Laberge',
    role: 'Founder & CEO',
    tagline: 'Audacieux en stratégie.\nAssumé en tant que fondateur.\nFort en tant que PDG.',
    img: TEAM_IMGS[0],
    color: '#7c3aed',
    bio: 'Fondateur de Nukleo, Clément pilote la vision et la croissance de l\'agence. Passionné par la transformation numérique et l\'IA appliquée, il accompagne les organisations vers l\'excellence digitale depuis plus de 15 ans.',
  },
  {
    name: 'Marie-Ève Tremblay',
    role: 'Creative Director',
    tagline: 'Créative dans l\'âme.\nExigeante dans l\'exécution.\nLeader en design.',
    img: TEAM_IMGS[1],
    color: '#8b5cf6',
    bio: 'Directrice créative, Marie-Ève donne vie aux marques à travers des expériences visuelles mémorables. Elle dirige le Studio Nukleo avec une vision forte et un sens aigu de l\'esthétique.',
  },
  {
    name: 'Alexandre Côté',
    role: 'Head of Tech',
    tagline: 'Architecte technique.\nIntégrateur d\'IA.\nBâtisseur de produits.',
    img: TEAM_IMGS[2],
    color: '#6d28d9',
    bio: 'Architecte technique, Alexandre pilote les solutions digitales et intègre l\'IA au cœur des produits Nukleo. Il conçoit des systèmes robustes, scalables et orientés performance.',
  },
  {
    name: 'Sophie Nguyen',
    role: 'Strategy Lead',
    tagline: 'Stratège numérique.\nOrientée résultats.\nPassionnée de données.',
    img: TEAM_IMGS[3],
    color: '#523DCB',
    bio: 'Stratège digitale, Sophie accompagne les organisations dans leur transformation numérique. Elle conçoit des feuilles de route claires, mesurables et alignées sur les objectifs d\'affaires.',
  },
];

// Constantes pile
const CARD_W = 520;
const SITE_PURPLE = '#5636AD';
const CARD_H = 360;
const STACK_OVERFLOW = 40;

export function TeamRow() {
  const [active, setActive] = useState(0);
  const stackRef = useRef<HTMLDivElement>(null);

  const prev = () => setActive((a) => Math.max(0, a - 1));
  const next = () => setActive((a) => Math.min(TEAM_MEMBERS.length - 1, a + 1));

  // Attacher le wheel listener en non-passif sur la pile uniquement
  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.deltaY > 0) setActive((a) => Math.min(TEAM_MEMBERS.length - 1, a + 1));
      else setActive((a) => Math.max(0, a - 1));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const m = TEAM_MEMBERS[active];

  return (
    <div
      className="site-margin-x"
      style={{ paddingTop: 32, paddingBottom: 64, marginBottom: 48 }}
    >
      {/* Grille 3 colonnes */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: '5vw',
        alignItems: 'center',
      }}>

        {/* ── COLONNE GAUCHE : nom + tagline ── */}
        <div style={{ textAlign: 'left' }}>
          <h3 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.4rem, 2.2vw, 2.2rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#0A0A0A',
            marginBottom: 8,
          }}>
            {m.name}
          </h3>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 400,
            fontSize: '0.72rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: m.color,
            margin: '0 0 32px 0',
            transition: 'color 0.4s',
          }}>
            {m.role}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
            {m.tagline.split('\n').filter(Boolean).map((tag) => (
              <span
                key={tag}
                style={{
                  display: 'inline-block',
                  width: 'fit-content',
                  background: 'rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(16px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  borderRadius: 12,
                  padding: '0.35rem 0.75rem',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.85)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.6rem',
                  color: '#374151',
                }}
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* ── COLONNE CENTRE : pile de photos avec scroll vertical ── */}
        <div
          ref={stackRef}
          style={{
            position: 'relative',
            width: CARD_W,
            height: CARD_H + STACK_OVERFLOW,
            perspective: '1200px',
            flexShrink: 0,
            cursor: 'ns-resize',
          }}
        >
          {TEAM_MEMBERS.map((member, i) => {
            const offset = i - active;
            const isActive = i === active;
            const isBelow = offset > 0;
            const isAbove = offset < 0;

            const translateY = isActive
              ? '0px'
              : isBelow
              ? `${offset * 9}px`
              : `${offset * 90}px`;
            const translateZ = isActive ? '0px' : isBelow ? `${-offset * 50}px` : '0px';
            const scale = isActive ? 1 : isBelow ? Math.max(0.78, 1 - offset * 0.07) : 0.95;
            const opacity = isAbove ? 0 : isBelow ? Math.max(0.1, 1 - offset * 0.32) : 1;
            const zIndex = isActive ? 50 : isBelow ? 50 - offset : 0;

            return (
              <div
                key={member.name}
                onClick={() => isBelow && setActive(i)}
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: CARD_W,
                  height: CARD_H,
                  borderRadius: 20,
                  overflow: 'hidden',
                  cursor: isBelow ? 'pointer' : 'default',
                  transform: `translateY(${translateY}) translateZ(${translateZ}) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.45s ease',
                  transformStyle: 'preserve-3d',
                  boxShadow: isActive
                    ? '0 32px 64px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06)'
                    : '0 8px 24px rgba(0,0,0,0.12)',
                }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center center',
                    filter: isActive ? 'grayscale(0)' : 'grayscale(0.6) brightness(0.7)',
                    transition: 'filter 0.5s ease',
                  }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)',
                }} />
                {isBelow && offset <= 2 && (
                  <div style={{
                    position: 'absolute', top: 14, right: 14,
                    fontSize: '0.7rem', fontWeight: 800, color: 'rgba(255,255,255,0.3)',
                    letterSpacing: '0.1em',
                  }}>
                    0{i + 1}
                  </div>
                )}
              </div>
            );
          })}

          {/* Bullets */}
          <div style={{
            position: 'absolute',
            bottom: -36,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 8,
          }}>
            {TEAM_MEMBERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 24 : 8,
                  height: 8,
                  borderRadius: 999,
                  padding: 0,
                  border: 'none',
                  cursor: 'pointer',
                  background: i === active ? SITE_PURPLE : '#d1d5db',
                  transition: 'all 0.35s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── COLONNE DROITE : bio ── */}
        <div style={{ textAlign: 'left' }}>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(0.88rem, 1.05vw, 1rem)',
            color: '#4b5563',
            lineHeight: 1.6,
          }}>
            {m.bio}
          </p>
        </div>

      </div>
    </div>
  );
}
