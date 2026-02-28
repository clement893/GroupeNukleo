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
    color: '#f97316',
    bio: 'Directrice créative, Marie-Ève donne vie aux marques à travers des expériences visuelles mémorables. Elle dirige le Studio Nukleo avec une vision forte et un sens aigu de l\'esthétique.',
  },
  {
    name: 'Alexandre Côté',
    role: 'Head of Tech',
    tagline: 'Architecte technique.\nIntégrateur d\'IA.\nBâtisseur de produits.',
    img: TEAM_IMGS[2],
    color: '#2563eb',
    bio: 'Architecte technique, Alexandre pilote les solutions digitales et intègre l\'IA au cœur des produits Nukleo. Il conçoit des systèmes robustes, scalables et orientés performance.',
  },
  {
    name: 'Sophie Nguyen',
    role: 'Strategy Lead',
    tagline: 'Stratège numérique.\nOrientée résultats.\nPassionnée de données.',
    img: TEAM_IMGS[3],
    color: '#059669',
    bio: 'Stratège digitale, Sophie accompagne les organisations dans leur transformation numérique. Elle conçoit des feuilles de route claires, mesurables et alignées sur les objectifs d\'affaires.',
  },
];

// Constantes pile
const CARD_W = 520;
const CARD_H = 720;
const STACK_OVERFLOW = 80;

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
      style={{ padding: '64px 6%', marginBottom: 48 }}
    >
      {/* Grille 3 colonnes */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: '5vw',
        alignItems: 'center',
      }}>

        {/* ── COLONNE GAUCHE : nom + tagline ── */}
        <div>
          <h3 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.6rem, 2.6vw, 2.6rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#0A0A0A',
            marginBottom: 16,
          }}>
            {m.name}
          </h3>
          <div style={{ width: 40, height: 2.5, background: m.color, borderRadius: 999, marginBottom: 20, transition: 'background 0.4s' }} />
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 400,
            fontSize: '0.9rem',
            color: '#374151',
            lineHeight: 1.9,
            whiteSpace: 'pre-line',
          }}>
            {m.tagline}
          </p>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 8, marginTop: 36 }}>
            {TEAM_MEMBERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 28 : 8, height: 8, borderRadius: 999,
                  padding: 0, border: 'none', cursor: 'pointer',
                  background: i === active ? m.color : '#d1d5db',
                  transition: 'all 0.35s ease',
                }}
              />
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
              ? `${offset * 18}px`
              : `${offset * 180}px`;
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
                    objectFit: 'cover', objectPosition: 'top center',
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

          {/* Flèches ↑↓ */}
          <div style={{
            position: 'absolute',
            bottom: -48,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 8,
          }}>
            <button
              onClick={prev}
              disabled={active === 0}
              style={{
                width: 34, height: 34, borderRadius: '50%',
                border: '1.5px solid #d1d5db', background: '#fff',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: active === 0 ? 0.3 : 1, transition: 'opacity 0.2s',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
            <button
              onClick={next}
              disabled={active === TEAM_MEMBERS.length - 1}
              style={{
                width: 34, height: 34, borderRadius: '50%',
                border: '1.5px solid #d1d5db', background: '#fff',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: active === TEAM_MEMBERS.length - 1 ? 0.3 : 1, transition: 'opacity 0.2s',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── COLONNE DROITE : bio ── */}
        <div>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(0.88rem, 1.05vw, 1rem)',
            color: '#4b5563',
            lineHeight: 1.85,
          }}>
            {m.bio}
          </p>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 400,
            marginTop: 24,
            fontSize: '0.72rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: m.color,
            transition: 'color 0.4s',
          }}>
            {m.role}
          </p>
        </div>

      </div>
    </div>
  );
}
