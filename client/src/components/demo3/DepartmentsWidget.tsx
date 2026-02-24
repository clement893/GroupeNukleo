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
    height: 500,
    offsetTop: 0,   // rangée haute
  },
  {
    num: '02',
    name: 'Studio',
    tagline: 'Design & Creation',
    href: '/services/studio',
    color: '#4338ca',
    img: '/demo/dept-studio.jpg',
    height: 500,
    offsetTop: 100, // rangée basse
  },
  {
    num: '03',
    name: 'Tech',
    tagline: 'Development & AI',
    href: '/services/tech',
    color: '#0f172a',
    img: '/demo/dept-tech.jpg',
    height: 500,
    offsetTop: 0,   // rangée haute
  },
  {
    num: '04',
    name: 'Consulting',
    tagline: 'Strategy & Transformation',
    href: '/services/consulting',
    color: '#7B1D3A',
    img: '/demo/dept-consulting.jpg',
    height: 500,
    offsetTop: 100, // rangée basse
  },
];

// Hauteur totale du conteneur = max(height + offsetTop) de toutes les cartes
const CONTAINER_HEIGHT = Math.max(...DEPARTMENTS.map(d => d.height + d.offsetTop)) + 40;

export function DepartmentsWidget() {
  const getLocalizedPath = useLocalizedPath();

  return (
    <div style={{ marginBottom: 64 }}>
      {/* Piste de scroll horizontal — bord à bord */}
      <div
        style={{
          position: 'relative',
          height: CONTAINER_HEIGHT,
          overflowX: 'auto',
          overflowY: 'visible',
          paddingLeft: 0,
          paddingRight: 0,
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        } as React.CSSProperties}
      >
        {/* Conteneur interne flex pour les cartes — centré */}
        <div style={{
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
          height: '100%',
          width: '100%',
          justifyContent: 'center',
        }}>
          {DEPARTMENTS.map((dept) => (
            <Link
              key={dept.num}
              href={getLocalizedPath(dept.href)}
              style={{
                flexShrink: 0,
                width: 'clamp(280px, 40vw, 500px)',
                height: dept.height,
                marginTop: dept.offsetTop,
                borderRadius: 20,
                background: dept.color,
                position: 'relative',
                overflow: 'hidden',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.6rem',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
              }}
            >
              {/* Image en haut à gauche */}
              <div style={{
                width: 'clamp(110px, 30%, 160px)',
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
                    fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.22em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 6,
                  }}>
                    Nukleo.{dept.name}
                  </p>
                  <span style={{
                    fontFamily: 'var(--font-heading, sans-serif)',
                    fontWeight: 900,
                    fontSize: 'clamp(2.8rem, 6vw, 5rem)',
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
                  width: 50, height: 50, borderRadius: '50%',
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginLeft: 12,
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
      </div>

      {/* Masquer scrollbar webkit */}
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}
