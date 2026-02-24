import { useState } from 'react';

const TEAM_IMGS = ['/demo/team-1.jpg', '/demo/team-2.jpg', '/demo/team-3.jpg', '/demo/team-4.jpg'];

const TEAM_MEMBERS = [
  { name: 'Clément Laberge',   role: 'Founder & CEO',           img: TEAM_IMGS[0], color: '#7c3aed', bio: 'Fondateur de Nukleo, passionné par la transformation numérique et l\'IA appliquée. 15 ans d\'expérience en stratégie digitale.' },
  { name: 'Marie-Ève Tremblay', role: 'Creative Director',       img: TEAM_IMGS[1], color: '#7B1D3A', bio: 'Directrice créative, elle donne vie aux marques à travers des expériences visuelles mémorables.' },
  { name: 'Alexandre Côté',    role: 'Head of Tech',             img: TEAM_IMGS[2], color: '#2563eb', bio: 'Architecte technique, il pilote les solutions digitales et intègre l\'IA au cœur des produits.' },
  { name: 'Sophie Nguyen',     role: 'Strategy Lead',            img: TEAM_IMGS[3], color: '#059669', bio: 'Stratège digitale, elle accompagne les organisations dans leur transformation numérique.' },
  { name: 'Thomas Fortin',     role: 'AI Solutions Architect',   img: TEAM_IMGS[2], color: '#0891b2', bio: 'Spécialiste IA, il conçoit des solutions agentiques pour automatiser et optimiser.' },
];

export function TeamRow() {
  const [active, setActive] = useState(0);
  const m = TEAM_MEMBERS[active];

  return (
    <div style={{ padding: '0 6%', marginBottom: 64 }}>
      {/* En-tête section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
        <h2 style={{
          fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900,
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-0.03em', color: '#0A0A0A',
        }}>Notre équipe</h2>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9ca3af' }}>
          {String(active + 1).padStart(2, '0')} / {String(TEAM_MEMBERS.length).padStart(2, '0')}
        </span>
      </div>

      {/* Layout principal : texte gauche | photo centrale | bio droite */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1fr', gap: 40, alignItems: 'center', minHeight: 480 }}>

        {/* Gauche — nom + rôle + navigation */}
        <div>
          <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 16 }}>
            Rencontrez l'équipe
          </p>
          <h3 style={{
            fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900,
            fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', lineHeight: 1.05, letterSpacing: '-0.03em',
            color: '#0A0A0A', marginBottom: 8,
          }}>
            {m.name}
          </h3>
          <div style={{ width: 40, height: 2, background: m.color, borderRadius: 999, marginBottom: 16 }} />
          <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.6, marginBottom: 32 }}>
            {m.role}
          </p>

          {/* Dots navigation */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {TEAM_MEMBERS.map((mem, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 28 : 8, height: 8, borderRadius: 999, padding: 0,
                  background: i === active ? m.color : '#e5e7eb',
                  border: 'none', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* Centre — grande photo portrait */}
        <div style={{ position: 'relative' }}>
          <div style={{
            borderRadius: 24, overflow: 'hidden',
            aspectRatio: '3/4',
            boxShadow: '0 32px 64px rgba(0,0,0,0.18)',
            position: 'relative',
          }}>
            {TEAM_MEMBERS.map((mem, i) => (
              <img
                key={i}
                src={mem.img}
                alt={mem.name}
                style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'top',
                  opacity: i === active ? 1 : 0,
                  transition: 'opacity 0.55s ease',
                }}
              />
            ))}
            {/* Overlay gradient bas */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)' }} />
          </div>

          {/* Flèches prev/next */}
          <button
            onClick={() => setActive(a => (a - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length)}
            style={{
              position: 'absolute', left: -18, top: '50%', transform: 'translateY(-50%)',
              width: 36, height: 36, borderRadius: '50%',
              background: '#fff', border: '1px solid #e5e7eb',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#0A0A0A',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button
            onClick={() => setActive(a => (a + 1) % TEAM_MEMBERS.length)}
            style={{
              position: 'absolute', right: -18, top: '50%', transform: 'translateY(-50%)',
              width: 36, height: 36, borderRadius: '50%',
              background: '#fff', border: '1px solid #e5e7eb',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#0A0A0A',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>

        {/* Droite — bio */}
        <div>
          <p style={{
            fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', color: '#374151', lineHeight: 1.75,
            opacity: 0.85,
          }}>
            {m.bio}
          </p>
        </div>
      </div>

      {/* Ligne de membres en bas */}
      <div style={{ display: 'flex', gap: 12, marginTop: 32, overflowX: 'auto', paddingBottom: 4 }}>
        {TEAM_MEMBERS.map((mem, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px',
              borderRadius: 999, border: `1.5px solid ${i === active ? mem.color : '#e5e7eb'}`,
              background: i === active ? `${mem.color}10` : '#fff',
              cursor: 'pointer', flexShrink: 0, transition: 'all 0.25s ease',
            }}
          >
            <img
              src={mem.img}
              alt={mem.name}
              style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
            />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0A0A0A', whiteSpace: 'nowrap' }}>{mem.name}</div>
              <div style={{ fontSize: '0.6rem', color: '#9ca3af', whiteSpace: 'nowrap' }}>{mem.role}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
