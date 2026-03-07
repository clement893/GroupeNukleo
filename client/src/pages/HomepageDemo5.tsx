import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { useLanguage } from '@/contexts/LanguageContext';
import PageLayout from '@/components/PageLayout';
import CompanyBlocksSection from '@/components/CompanyBlocksSection';
import LeadersSection from '@/components/LeadersSection';
import UnionSection from '@/components/UnionSection';
import TwoCitiesSection from '@/components/TwoCitiesSection';
// ─── Constantes ──────────────────────────────────────────────────────────────
const PURPLE = '#7c3aed';
const BORDEAUX = '#7B1D3A';
const CREAM = '#F5F3EF';
const DARK = '#0A0A0A';

const WORK1 = '/demo/work1.jpg';
const WORK2 = '/demo/work2.jpg';
const WORK3 = '/demo/work3.jpg';
const SITE_MAUVE = '#523DCB';
const FALLBACK_PROJECTS = [
  { num: '01', name: 'MBAM', category: 'Brand & Digital', tagline: 'Redefining cultural engagement online.', result: '+240% digital reach', img: WORK1, color: SITE_MAUVE },
  { num: '02', name: 'SummitLaw', category: 'Brand & Creative', tagline: 'A law firm that finally looks like its ambition.', result: '+180% qualified leads', img: WORK2, color: PURPLE },
  { num: '03', name: 'QueerTech', category: 'AI & Platform', tagline: 'Technology built for belonging.', result: '+220% member engagement', img: WORK3, color: '#059669' },
];

type HomeProjectItem = { num: string; name: string; category: string; tagline: string; result: string; img: string; color: string };
const CAROUSEL_COLORS = [SITE_MAUVE, PURPLE, '#059669', '#dc2626', '#7c2d12'];

function mapApiProjectsToHome(
  apiProjects: Array<{ title: string; category: string; description: { fr: string; en: string }; images: string[]; slug?: string; homeCarouselImage?: string; homeTriptychImage?: string }>,
  max: number,
  startIndex: number,
  imageField?: 'homeCarouselImage' | 'homeTriptychImage'
): HomeProjectItem[] {
  if (!apiProjects?.length) return [];
  return apiProjects.slice(0, max).map((p, i) => {
    const tagline = (p.description?.fr || p.description?.en || '').slice(0, 70);
    const pAny = p as { homeCarouselImage?: string; homeTriptychImage?: string };
    const imgFilename = (imageField && pAny[imageField]) || p.images?.[0];
    const img = imgFilename ? `/projects/${imgFilename}` : WORK1;
    const num = String(startIndex + i + 1).padStart(2, '0');
    return {
      num,
      name: p.title || p.slug || 'Projet',
      category: p.category || 'Projet',
      tagline: tagline ? `${tagline}${tagline.length >= 70 ? '…' : ''}` : 'Découvrez ce projet.',
      result: '',
      img,
      color: CAROUSEL_COLORS[i % CAROUSEL_COLORS.length],
    };
  });
}

// ─── Ancien Carrousel Projets Hero ───────────────────────────────────────────
function HeroProjectsCarousel() {
  const PROJECTS = FALLBACK_PROJECTS;
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const getLocalizedPath = useLocalizedPath();

  const next = useCallback(() => setActive(a => (a + 1) % PROJECTS.length), []);

  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(next, 3500);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isHovered, next]);

  const getWidth = (i: number) => {
    const inactiveW = 9;
    return i === active ? `${100 - (PROJECTS.length - 1) * inactiveW}%` : `${inactiveW}%`;
  };

  return (
    <div
      style={{ borderRadius: 24, overflow: 'hidden', position: 'relative', minHeight: 340, display: 'flex', flexDirection: 'column' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Panneaux */}
      <div style={{ display: 'flex', gap: 6, flex: 1, padding: 6, background: '#0a0a0a' }}>
        {PROJECTS.map((p, i) => {
          const isA = i === active;
          return (
            <div
              key={p.num}
              onClick={() => setActive(i)}
              style={{
                width: getWidth(i),
                transition: 'width 0.6s cubic-bezier(0.77,0,0.175,1)',
                borderRadius: 18,
                overflow: 'hidden',
                position: 'relative',
                cursor: isA ? 'default' : 'pointer',
                flexShrink: 0,
              }}
            >
              {/* Image */}
              <img
                src={p.img}
                alt={p.name}
                style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'cover',
                  filter: isA ? 'grayscale(0) brightness(0.65)' : 'grayscale(1) brightness(0.28)',
                  transition: 'filter 0.6s ease',
                }}
              />
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: isA
                  ? 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.05) 55%, transparent 100%)'
                  : 'rgba(0,0,0,0.5)',
                transition: 'opacity 0.5s',
              }} />
              {/* Barre couleur panneau inactif */}
              {!isA && (
                <div style={{
                  position: 'absolute', left: '50%', top: '25%', bottom: '25%',
                  width: 2, background: p.color, opacity: 0.75,
                  transform: 'translateX(-50%)',
                  borderRadius: 999,
                }} />
              )}
              {/* Nom vertical panneau inactif */}
              {!isA && (
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%) rotate(-90deg)',
                  whiteSpace: 'nowrap',
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: '0.6rem', fontWeight: 700,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                }}>{p.name}</div>
              )}
              {/* Contenu panneau actif */}
              {isA && (
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '2rem 2.2rem',
                  zIndex: 2,
                }}>
                  {/* Numéro + catégorie */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.6rem' }}>
                    <span style={{ fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, fontSize: '4rem', lineHeight: 1, color: 'rgba(255,255,255,0.08)', letterSpacing: '-0.04em' }}>{p.num}</span>
                    <span style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: p.color }}>{p.category}</span>
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900,
                    fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)', lineHeight: 0.9,
                    letterSpacing: '-0.03em', color: '#fff', marginBottom: '0.7rem',
                  }}>{p.name}</h3>
                  <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.55, marginBottom: '1.1rem', maxWidth: 340 }}>{p.tagline}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      background: p.color, color: '#fff',
                      fontSize: '0.65rem', fontWeight: 700,
                      padding: '0.35rem 0.9rem', borderRadius: 999,
                    }}>{p.result}</span>
                    <Link
                      href={getLocalizedPath('/')}
                      style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 1 }}
                    >View case →</Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dots navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '10px 0 8px', background: '#0a0a0a' }}>
        {PROJECTS.map((p, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              border: 'none', cursor: 'pointer', padding: 0,
              height: 3, borderRadius: 999,
              width: i === active ? 28 : 8,
              background: i === active ? PROJECTS[active].color : 'rgba(255,255,255,0.18)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── ProjectsCarousel (identique à demo4) ───────────────────────────────────
function ProjectsCarousel() {
  const PROJECTS = FALLBACK_PROJECTS;
  const [active, setActive] = useState(0);
  const getLocalizedPath = useLocalizedPath();

  const getWidth = (i: number) => {
    if (PROJECTS.length === 1) return '100%';
    const inactiveCount = PROJECTS.length - 1;
    const inactiveWidth = 8;
    return i === active ? `${100 - inactiveCount * inactiveWidth}%` : `${inactiveWidth}%`;
  };

  return (
    <div className="rounded-3xl overflow-hidden">
      <div className="flex gap-4 lg:gap-5 p-4 lg:p-5" style={{ height: '85vh', background: 'transparent' }}>
        {PROJECTS.map((project, i) => {
          const isActive = i === active;
          return (
            <div
              key={project.num}
              className="relative overflow-hidden cursor-pointer flex-shrink-0"
              style={{
                width: getWidth(i),
                transition: 'width 0.65s cubic-bezier(0.77, 0, 0.175, 1)',
                borderRadius: '1rem',
                background: 'rgba(255,255,255,0.05)',
              }}
              onClick={() => !isActive && setActive(i)}
            >
              <img
                src={project.img}
                alt={project.name}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: isActive ? 'grayscale(0) brightness(0.6)' : 'grayscale(1) brightness(0.35)',
                  transition: 'filter 0.65s ease',
                }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)', opacity: isActive ? 1 : 0.6, transition: 'opacity 0.5s ease' }}
              />

              {isActive && (
                <div className="absolute inset-0 flex flex-col justify-between z-10" style={{ padding: 'clamp(1.5rem, 3vw, 3.5rem)' }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Accrois la performance</p>
                      <span style={{ fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, color: 'rgba(255,255,255,0.12)', lineHeight: 1, fontSize: '5rem' }}>
                        {project.num}
                      </span>
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: 8 }}>
                      {project.category}
                    </span>
                  </div>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, color: '#fff', lineHeight: 0.88, letterSpacing: '-0.03em', marginBottom: 25, fontSize: 'clamp(2.5rem, 4.5vw, 5.5rem)' }}>
                      {project.name}
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: 420, marginBottom: 38 }}>
                      {project.tagline}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.4rem 1rem', borderRadius: 999, color: '#fff', background: project.color }}>
                        {project.result}
                      </span>
                      <Link
                        href={getLocalizedPath('/')}
                        style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: 2, textDecoration: 'none' }}
                      >
                        View case study →
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {!isActive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
                  <span
                    style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                  >
                    {project.name}
                  </span>
                  <div style={{ width: 2, height: 32, borderRadius: 999, background: project.color, opacity: 0.6 }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '20px 0', background: 'transparent' }}>
        {PROJECTS.map((p, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{ width: i === active ? 28 : 8, height: 4, borderRadius: 999, background: i === active ? PROJECTS[active].color : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Composant principal ─────────────────────────────────────────────────────

export default function HomepageDemo5() {
  const getLocalizedPath = useLocalizedPath();
  const { t, language } = useLanguage();

  const NAV_LINKS = [
    { label: t('nav.services'), href: getLocalizedPath('/') },
    { label: t('nav.projects'), href: getLocalizedPath('/') },
    { label: t('nav.about'), href: getLocalizedPath('/') },
    { label: t('nav.contact'), href: getLocalizedPath('/') },
  ];

  return (
    <PageLayout>
      <div
        style={{
          minHeight: '100vh',
          fontFamily: 'var(--font-body, sans-serif)',
          color: DARK,
          background: '#EFE8E8',
        }}
      >
        {/* ── Contenu principal ─────────────────────────────────────────────── */}
        <div className="main-content-padding" style={{ position: 'relative', zIndex: 10, paddingTop: 'clamp(5rem, 15vw, 8rem)' }}>
          <div className="content-max-width" style={{ paddingLeft: 'var(--site-margin, 3%)', paddingRight: 'var(--site-margin, 3%)', width: '100%' }}>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION HERO — Le Groupe Nukleo + paragraphe à droite
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="hero-section-grid hero-max-width"
          style={{
          minHeight: '27.5vh',
          paddingTop: 'clamp(3.5rem, 8.75vh, 7rem)',
          paddingBottom: 'clamp(2rem, 5vh, 4rem)',
          paddingLeft: 0,
          paddingRight: 0,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 420px)',
          gridTemplateRows: 'auto auto',
          gap: 'clamp(2rem, 8vw, 7rem)',
          background: 'transparent',
          boxSizing: 'border-box',
          margin: '0 auto',
        }}>
          <h1
            className="hero-title-mobile-wrap"
            style={{
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 8vw, 9rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            wordSpacing: '0.12em',
            margin: 0,
            gridColumn: 1,
            gridRow: 1,
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            background: 'linear-gradient(to right, #6B1817, #523DCB)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            <span className="hero-title-mobile-wrap" style={{ display: 'block', whiteSpace: 'nowrap' }}>{t('home.heroLine1')}</span>
            <span className="hero-title-mobile-wrap" style={{ display: 'block', whiteSpace: 'nowrap' }}>{t('home.heroLine2')}</span>
          </h1>
          <p style={{
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
            fontSize: 'clamp(0.9rem, 1.1vw, 1.15rem)',
            lineHeight: 1.6,
            color: '#374151',
            margin: 0,
            gridColumn: 2,
            gridRow: 1,
            alignSelf: 'flex-start',
            textAlign: 'left',
          }}>
            {t('home.heroDescription')}
          </p>
          <div
            style={{
              width: '100%',
              gridColumn: '1 / -1',
              gridRow: 2,
              marginTop: 0,
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: 0,
              overflow: 'hidden',
              aspectRatio: '21/9',
              minHeight: 280,
              background: 'linear-gradient(135deg, #6B1817 0%, #523DCB 100%)',
            }}
          >
            <img
              src="/demo/agency-hero-cover.png"
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 2 — QUI SOMMES-NOUS + CTA
        ════════════════════════════════════════════════════════════════════ */}
        <section className="section-qui-sommes-nous" style={{
          padding: '5rem 0 6rem',
          marginBottom: 0,
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: 'clamp(0.8125rem, 1vw, 1.0625rem)',
            fontWeight: 400,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#374151',
            marginBottom: 28,
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
          }}>
            {t('home.audacious')}
          </p>
          <h2 style={{
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            margin: '0 0 2.5rem 0',
            display: 'inline-block',
            width: 'fit-content',
            maxWidth: '90%',
            background: 'linear-gradient(to right, #6B1817, #523DCB)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {t('home.audaciousTagline')}
          </h2>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 3 — L'UNION DE DEUX FORCES (image + texte + CTA)
        ════════════════════════════════════════════════════════════════════ */}
        <UnionSection />

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 4 — DEUX BLOCS ENTREPRISES (Nukleo, Rouge On Blue)
        ════════════════════════════════════════════════════════════════════ */}
        <CompanyBlocksSection />

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 5 — CARTES LEADERS (Clément Roy, Lionel Pardin)
        ════════════════════════════════════════════════════════════════════ */}
        <LeadersSection />

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 6 — 2 VILLES (Montréal, Halifax)
        ════════════════════════════════════════════════════════════════════ */}
        <TwoCitiesSection />

          </div>
        </div>
      </div>
    </PageLayout>
  );
}
