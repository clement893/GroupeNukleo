import { useRef } from 'react';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const DEPARTMENTS = [
  {
    num: '01',
    name: 'Agency',
    tagline: 'Marketing & Communication',
    href: '/services/agency',
    color: '#7B1D3A',
    img: '/demo/dept-agency.jpg',
  },
  {
    num: '02',
    name: 'Studio',
    tagline: 'Design & Creation',
    href: '/services/studio',
    color: '#4338ca',
    img: '/demo/dept-studio.jpg',
  },
  {
    num: '03',
    name: 'Tech',
    tagline: 'Development & AI',
    href: '/services/tech',
    color: '#0f172a',
    img: '/demo/dept-tech.jpg',
  },
  {
    num: '04',
    name: 'Consulting',
    tagline: 'Strategy & Transformation',
    href: '/services/consulting',
    color: '#7B1D3A',
    img: '/demo/dept-consulting.jpg',
  },
];

export function DepartmentsWidget() {
  const getLocalizedPath = useLocalizedPath();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ marginBottom: 48 }}>
      {/* En-tête */}
      <div style={{
        padding: '0 6%',
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28,
      }}>
        <h2 style={{
          fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900,
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-0.03em', color: '#0A0A0A',
        }}>
          Nos départements
        </h2>
        <Link href={getLocalizedPath('/services')} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7c3aed', textDecoration: 'none' }}>
          Tous les services ↗
        </Link>
      </div>

      {/* Piste de scroll horizontal — déborde sur les bords */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: 16,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: '6vw',
          paddingLeft: '6vw',
          paddingRight: '6vw',
          paddingBottom: 4,
          cursor: 'grab',
          /* masquer la scrollbar */
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        } as React.CSSProperties}
      >
        {DEPARTMENTS.map((dept) => (
          <Link
            key={dept.num}
            href={getLocalizedPath(dept.href)}
            style={{
              flexShrink: 0,
              scrollSnapAlign: 'start',
              width: 'clamp(300px, 42vw, 520px)',
              height: 'clamp(400px, 58vh, 600px)',
              borderRadius: 24,
              background: dept.color,
              position: 'relative',
              overflow: 'hidden',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '1.8rem',
            }}
          >
            {/* Image en haut à gauche */}
            <div style={{
              width: 'clamp(120px, 32%, 180px)',
              aspectRatio: '1/1',
              borderRadius: 14,
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.15)',
              flexShrink: 0,
            }}>
              <img
                src={dept.img}
                alt={dept.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Bas — nom en très grand + flèche */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <p style={{
                  fontSize: '0.56rem', fontWeight: 700, letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 6,
                }}>
                  Nukleo.{dept.name}
                </p>
                <span style={{
                  fontFamily: 'var(--font-heading, sans-serif)',
                  fontWeight: 900,
                  fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                  lineHeight: 0.88,
                  letterSpacing: '-0.04em',
                  color: '#fff',
                  display: 'block',
                }}>
                  {dept.name}
                </span>
              </div>

              {/* Flèche ↗ */}
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginLeft: 16,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Masquer la scrollbar webkit */}
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
