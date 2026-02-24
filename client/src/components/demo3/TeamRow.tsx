import { useRef, useEffect, useState } from 'react';

const TEAM_IMGS = ['/demo/team-1.jpg', '/demo/team-2.jpg', '/demo/team-3.jpg', '/demo/team-4.jpg'];

const TEAM_MEMBERS = [
  { name: 'Clément Laberge',    role: 'Founder & CEO',          img: TEAM_IMGS[0], color: '#7c3aed', bio: 'Fondateur de Nukleo, passionné par la transformation numérique et l\'IA appliquée. 15 ans d\'expérience en stratégie digitale.' },
  { name: 'Marie-Ève Tremblay', role: 'Creative Director',      img: TEAM_IMGS[1], color: '#7B1D3A', bio: 'Directrice créative, elle donne vie aux marques à travers des expériences visuelles mémorables.' },
  { name: 'Alexandre Côté',     role: 'Head of Tech',           img: TEAM_IMGS[2], color: '#2563eb', bio: 'Architecte technique, il pilote les solutions digitales et intègre l\'IA au cœur des produits.' },
  { name: 'Sophie Nguyen',      role: 'Strategy Lead',          img: TEAM_IMGS[3], color: '#059669', bio: 'Stratège digitale, elle accompagne les organisations dans leur transformation numérique.' },
  { name: 'Thomas Fortin',      role: 'AI Solutions Architect', img: TEAM_IMGS[2], color: '#0891b2', bio: 'Spécialiste IA, il conçoit des solutions agentiques pour automatiser et optimiser.' },
];

const CARD_HEIGHT = 280;
const VISIBLE_OFFSET = 120;

export function TeamRow() {
  const [active, setActive] = useState(0);
  const imagesRef = useRef<HTMLDivElement>(null);
  const m = TEAM_MEMBERS[active];

  useEffect(() => {
    const el = imagesRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) setActive(i => Math.min(TEAM_MEMBERS.length - 1, i + 1));
      else setActive(i => Math.max(0, i - 1));
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div style={{ padding: '0 6%', marginBottom: 64 }}>
      {/* En-tête */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-0.03em', color: '#0A0A0A' }}>
          Notre équipe
        </h2>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9ca3af' }}>
          {String(active + 1).padStart(2, '0')} / {String(TEAM_MEMBERS.length).padStart(2, '0')}
        </span>
      </div>

      {/* Layout : texte gauche | pile photos centre | bio droite */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: 48, alignItems: 'center' }}>

        {/* Gauche */}
        <div>
          <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 16 }}>
            Rencontrez l'équipe
          </p>
          <h3 style={{ fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, fontSize: 'clamp(1.5rem, 2.2vw, 2.2rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#0A0A0A', marginBottom: 8 }}>
            {m.name}
          </h3>
          <div style={{ width: 36, height: 2, background: m.color, borderRadius: 999, marginBottom: 12 }} />
          <p style={{ fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.6, marginBottom: 28 }}>
            {m.role}
          </p>
          {/* Dots */}
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {TEAM_MEMBERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{ width: i === active ? 24 : 7, height: 7, borderRadius: 999, padding: 0, background: i === active ? m.color : '#e5e7eb', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}
              />
            ))}
          </div>
        </div>

        {/* Centre — pile de cartes scroll vertical */}
        <div
          ref={imagesRef}
          style={{ position: 'relative', height: 480, cursor: 'n-resize', userSelect: 'none' }}
        >
          {TEAM_MEMBERS.map((mem, i) => {
            const offset = i - active;
            const isActive = i === active;
            const scale = isActive ? 1 : 0.88;
            const opacity = Math.abs(offset) > 2 ? 0 : isActive ? 1 : 0.5;
            const zIndex = isActive ? 10 : Math.max(1, 5 - Math.abs(offset));

            return (
              <div
                key={mem.name}
                onClick={() => setActive(i)}
                style={{
                  position: 'absolute', left: '50%', top: '50%',
                  width: '100%', height: CARD_HEIGHT,
                  borderRadius: 20, overflow: 'hidden',
                  transform: `translate(-50%, calc(-50% + ${offset * VISIBLE_OFFSET}px)) scale(${scale})`,
                  zIndex, opacity,
                  transition: 'all 0.5s cubic-bezier(0.77, 0, 0.175, 1)',
                  boxShadow: isActive ? '0 20px 48px rgba(0,0,0,0.35)' : '0 6px 20px rgba(0,0,0,0.2)',
                  cursor: isActive ? 'default' : 'pointer',
                  backgroundColor: i % 2 === 0 ? '#1a1a1a' : '#262626',
                }}
              >
                <img
                  src={mem.img}
                  alt={mem.name}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top',
                    filter: isActive ? 'brightness(0.85)' : 'brightness(0.45) grayscale(0.3)',
                    transition: 'filter 0.5s ease',
                  }}
                />
              </div>
            );
          })}

          {/* Indicateur scroll */}
          <div style={{ position: 'absolute', bottom: -24, left: '50%', transform: 'translateX(-50%)', width: 48, height: 4, borderRadius: 999, background: '#e5e7eb', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 999, background: m.color, transition: 'width 0.3s ease', width: `${(100 / TEAM_MEMBERS.length) * (active + 1)}%` }} />
          </div>
        </div>

        {/* Droite — bio */}
        <div>
          <p style={{ fontSize: 'clamp(0.82rem, 1.05vw, 0.95rem)', color: '#374151', lineHeight: 1.8, opacity: 0.85 }}>
            {m.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
