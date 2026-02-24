import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const DEPARTMENTS = [
  {
    num: '01',
    name: 'Agency',
    tagline: 'Marketing & Communication',
    description: 'Stratégie, contenus et campagnes qui génèrent de la performance mesurable.',
    href: '/services/agency',
    color: '#7B1D3A',
    img: '/demo/dept-agency.jpg',
  },
  {
    num: '02',
    name: 'Studio',
    tagline: 'Design & Creation',
    description: 'Identités de marque, UX/UI et expériences visuelles qui convertissent.',
    href: '/services/studio',
    color: '#4338ca',
    img: '/demo/dept-studio.jpg',
  },
  {
    num: '03',
    name: 'Tech',
    tagline: 'Development & AI',
    description: 'Applications, plateformes et solutions IA sur mesure pour votre croissance.',
    href: '/services/tech',
    color: '#0f172a',
    img: '/demo/dept-tech.jpg',
  },
  {
    num: '04',
    name: 'Consulting',
    tagline: 'Strategy & Transformation',
    description: 'Accompagnement stratégique et transformation digitale pilotés par les données.',
    href: '/services/consulting',
    color: '#7B1D3A',
    img: '/demo/dept-consulting.jpg',
  },
];

export function DepartmentsWidget() {
  const getLocalizedPath = useLocalizedPath();
  const [active, setActive] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setActive(a => (a + 1) % DEPARTMENTS.length), []);

  useEffect(() => {
    if (!isHovered) timerRef.current = setInterval(next, 3500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isHovered, next]);

  return (
    <div style={{ padding: '0 6%', marginBottom: 48 }}>
      {/* En-tête */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-0.03em', color: '#0A0A0A' }}>
          Nos départements
        </h2>
        <Link href={getLocalizedPath('/services')} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7c3aed', textDecoration: 'none' }}>
          Tous les services ↗
        </Link>
      </div>

      {/* Carrousel pleine largeur — cartes partiellement visibles */}
      <div
        style={{ position: 'relative', overflow: 'hidden' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          style={{
            display: 'flex',
            gap: 16,
            transition: 'transform 0.65s cubic-bezier(0.77, 0, 0.175, 1)',
            transform: `translateX(calc(${-active} * (min(420px, 55vw) + 16px) + 8vw))`,
          }}
        >
          {DEPARTMENTS.map((dept, i) => {
            const isActive = i === active;
            return (
              <Link
                key={dept.num}
                href={getLocalizedPath(dept.href)}
                style={{
                  flexShrink: 0,
                  width: 'min(420px, 55vw)',
                  height: 'clamp(380px, 55vh, 560px)',
                  borderRadius: 24,
                  background: dept.color,
                  position: 'relative',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.8rem',
                  cursor: 'pointer',
                  transform: isActive ? 'scale(1)' : 'scale(0.96)',
                  opacity: isActive ? 1 : 0.72,
                  transition: 'transform 0.55s ease, opacity 0.55s ease',
                  boxShadow: isActive ? '0 24px 56px rgba(0,0,0,0.28)' : '0 8px 24px rgba(0,0,0,0.12)',
                }}
                onClick={() => !isActive && setActive(i)}
              >
                {/* Image en haut à gauche */}
                <div style={{
                  width: 'clamp(110px, 30%, 160px)',
                  aspectRatio: '1/1',
                  borderRadius: 14,
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: 'rgba(255,255,255,0.12)',
                }}>
                  <img
                    src={dept.img}
                    alt={dept.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Bas de carte — nom + flèche */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 6 }}>
                      Nukleo.{dept.name}
                    </p>
                    <span style={{
                      fontFamily: 'var(--font-heading, sans-serif)',
                      fontWeight: 900,
                      fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                      lineHeight: 0.9,
                      letterSpacing: '-0.04em',
                      color: '#fff',
                      display: 'block',
                    }}>
                      {dept.name}
                    </span>
                  </div>
                  {/* Flèche ↗ */}
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    border: '1.5px solid rgba(255,255,255,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginLeft: 16,
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Fondu gauche/droite */}
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '6vw', background: 'linear-gradient(to right, #F5F3EF, transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '6vw', background: 'linear-gradient(to left, #F5F3EF, transparent)', pointerEvents: 'none' }} />
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
        {DEPARTMENTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: i === active ? 24 : 7, height: 7, borderRadius: 999, padding: 0,
              background: i === active ? DEPARTMENTS[active].color : '#e5e7eb',
              border: 'none', cursor: 'pointer', transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
