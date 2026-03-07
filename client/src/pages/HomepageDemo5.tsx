import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { useLanguage } from '@/contexts/LanguageContext';
import { TeamScrollCards, DoubleLogoCarousel } from '@/components/demo3';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { SplitCTAButton } from '@/components/SplitCTAButton';
import { WeatherWidget } from '@/components/WeatherWidget';
import PageLayout from '@/components/PageLayout';
import HomeServicesSection from '@/components/HomeServicesSection';
import CTAPerformSection from '@/components/CTAPerformSection';
import ProjectsHeroTriptych from '@/components/ProjectsHeroTriptych';
import { trpc } from '@/lib/trpc';

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

// ─── Carrousel Projets Hero — slider régulier (une image à la fois)
function NewsCarousel({ projects: projectsProp }: { projects?: HomeProjectItem[] }) {
  const PROJECTS = projectsProp && projectsProp.length > 0 ? projectsProp : FALLBACK_PROJECTS;
  const SLIDES = PROJECTS.slice(0, 5);
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setActive(a => (a + 1) % SLIDES.length), []);

  useEffect(() => {
    if (!isHovered && SLIDES.length > 1) {
      timerRef.current = setInterval(next, 4500);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isHovered, next, SLIDES.length]);

  return (
    <div
      style={{ borderRadius: 24, overflow: 'hidden', position: 'relative', height: '100%', minHeight: 0, isolation: 'isolate' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {SLIDES.map((p, i) => {
        const isA = i === active;
        return (
          <div
            key={p.num}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isA ? 1 : 0,
              transition: 'opacity 0.6s ease',
              pointerEvents: isA ? 'auto' : 'none',
            }}
          >
            <img
              src={p.img}
              alt={p.name}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '2rem 2.2rem',
              zIndex: 2,
            }}>
              <div style={{ marginBottom: '0.6rem' }}>
                <span style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 4rem)', lineHeight: 1, color: 'rgba(255,255,255,0.15)', letterSpacing: '-0.04em' }}>{p.num}</span>
              </div>
              <h3 style={{
                fontFamily: "'Neue Haas Unica Pro', sans-serif", fontWeight: 700,
                fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', lineHeight: 1.1,
                letterSpacing: '-0.02em', color: '#fff', marginBottom: '1rem',
              }}>{p.name}</h3>
              <Link
                href={getLocalizedPath('/')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  color: '#fff', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none',
                  background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: 999,
                }}
              >
                {t('home.caseStudy')} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        );
      })}
      {SLIDES.length > 1 && (
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 3 }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                border: 'none', cursor: 'pointer', padding: 0,
                height: 6, borderRadius: 999,
                width: i === active ? 24 : 6,
                background: i === active ? '#fff' : 'rgba(255,255,255,0.4)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
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

// ─── Triptyque projets — composant partagé identique à la page Projets
function Triptych({ projects: projectsProp }: { projects?: HomeProjectItem[] }) {
  const PROJECTS = projectsProp && projectsProp.length > 0 ? projectsProp : FALLBACK_PROJECTS;
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();

  const items = PROJECTS.slice(0, 3).map((p) => ({
    img: p.img,
    title: p.name,
    num: p.num,
  }));

  return (
    <ProjectsHeroTriptych
      items={items}
      projectUrl={getLocalizedPath('/')}
      viewProjectLabel={t('home.caseStudy')}
    />
  );
}

// ─── Composant principal ─────────────────────────────────────────────────────
// Les verbes IA sont chargés depuis les fichiers de traduction (home.iaVerbs)

export default function HomepageDemo5() {
  const getLocalizedPath = useLocalizedPath();
  const { t, language } = useLanguage();
  const iaVerbs: string[] = (t('home.iaVerbs', { returnObjects: true }) as string[]) || [];
  const [onIaIndex, setOnIaIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setOnIaIndex(i => (i + 1) % (iaVerbs.length || 5)), 3200);
    return () => clearInterval(id);
  }, []);

  const NAV_LINKS = [
    { label: t('nav.services'), href: getLocalizedPath('/') },
    { label: t('nav.projects'), href: getLocalizedPath('/') },
    { label: t('nav.about'), href: getLocalizedPath('/') },
    { label: t('nav.contact'), href: getLocalizedPath('/') },
  ];

  const { data: apiProjects } = trpc.projects.list.useQuery(undefined, {
    staleTime: 5 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
  const homeCarouselProjects = useMemo(() => {
    const featured = (apiProjects || []).filter((p: { featuredOnHomeCarousel?: boolean }) => p.featuredOnHomeCarousel);
    const sorted = [...featured].sort((a, b) => {
      const orderA = (a as { homeCarouselOrder?: number }).homeCarouselOrder ?? 999;
      const orderB = (b as { homeCarouselOrder?: number }).homeCarouselOrder ?? 999;
      return orderA - orderB;
    });
    return mapApiProjectsToHome(sorted, 6, 0, 'homeCarouselImage');
  }, [apiProjects]);
  const homeTriptychProjects = useMemo(() => {
    const featured = (apiProjects || []).filter((p: { featuredOnHomeTriptych?: boolean }) => p.featuredOnHomeTriptych);
    const sorted = [...featured].sort((a, b) => {
      const orderA = (a as { homeTriptychOrder?: number }).homeTriptychOrder ?? 999;
      const orderB = (b as { homeTriptychOrder?: number }).homeTriptychOrder ?? 999;
      return orderA - orderB;
    });
    return mapApiProjectsToHome(sorted, 3, 0, 'homeTriptychImage');
  }, [apiProjects]);

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
        <div style={{ position: 'relative', zIndex: 10, paddingTop: 'clamp(5rem, 15vw, 8rem)' }}>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION HERO — Le Groupe Nukleo + paragraphe à droite
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{
          minHeight: '27.5vh',
          paddingTop: 'clamp(3.5rem, 8.75vh, 7rem)',
          paddingBottom: 'clamp(2rem, 5vh, 4rem)',
          paddingLeft: '3%',
          paddingRight: '3%',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          gap: 'clamp(2rem, 6vw, 5rem)',
          background: 'transparent',
          boxSizing: 'border-box',
        }}>
          <h1 style={{
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 8vw, 9rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            wordSpacing: '0.12em',
            margin: 0,
            display: 'inline-block',
            width: 'fit-content',
            maxWidth: '100%',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            background: 'linear-gradient(to right, #6B1817, #523DCB)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            <span style={{ display: 'block' }}>{t('home.heroLine1')}</span>
            <span style={{ display: 'block' }}>{t('home.heroLine2')}</span>
          </h1>
          <p style={{
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
            fontSize: 'clamp(0.9rem, 1.1vw, 1.15rem)',
            lineHeight: 1.6,
            color: '#374151',
            margin: 0,
            maxWidth: 'clamp(280px, 32ch, 420px)',
            alignSelf: 'center',
          }}>
            {t('home.heroDescription')}
          </p>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 1 — LOGO MASSIF + HERO WIDGETS (fond blanc)
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ padding: '0 3%', marginBottom: 5 * 16 }}>
          {/* Hero grid : photo (gauche) = référence, blocs droite alignés sur sa hauteur */}
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 'clamp(1rem, 1.5vw, 1.5rem)', marginTop: 1.5 * 16, alignItems: 'stretch', height: '62.4vh', minHeight: 768 }}>

            {/* Colonne Our Latest Work — News Carrousel (gauche) */}
            <div style={{ height: '100%', minHeight: 0 }}>
              <NewsCarousel projects={homeCarouselProjects} />
            </div>

            {/* Grille section droite : ligne 1 (météo + date) plus haute, ligne 4 (2022) plus basse */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: 'minmax(0, 1.35fr) minmax(0, 0.75fr) minmax(0, 1.25fr) minmax(0, 0.55fr)',
              gap: 'clamp(0.6rem, 1.2vw, 1.1rem)',
              padding: 'clamp(0.75rem, 1.5vw, 1.25rem)',
              borderRadius: 28,
              height: '100%',
              alignSelf: 'stretch',
              overflow: 'hidden',
            }}>
              {/* 1. Météo — même hauteur que date, coins arrondis */}
              <WeatherWidget className="glass-widget-weather-date" />

              {/* 2. Date — même style et proportions que météo */}
              {(() => {
                const d = new Date();
                const locale = language === 'en' ? 'en-CA' : 'fr-FR';
                const dayName = d.toLocaleDateString(locale, { weekday: 'long' });
                const dayNum = d.getDate();
                const monthYear = d.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
                return (
                  <div className="glass-widget-weather-date" style={{
                    minHeight: 0,
                    borderRadius: 14,
                    padding: 'clamp(1.5rem, 2.2vw, 2.5rem) clamp(1.5rem, 2.4vw, 2.75rem)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: 'clamp(0.35rem, 0.5vw, 0.6rem)', textAlign: 'center', height: '100%',
                  }}>
                    <div style={{ fontSize: 'clamp(1rem, 1.2vw, 1.3rem)', fontWeight: 700, color: '#6b7280' }}>{t('home.widgetDateGreeting')} {dayName} <span style={{ color: PURPLE }}>♥</span></div>
                    <div style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif", fontWeight: 700, fontSize: 'clamp(3.5rem, 4.4vw, 5.5rem)', lineHeight: 1, color: DARK }}>{dayNum}</div>
                    <div style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.85rem)', color: '#6b7280' }}>{monthYear}</div>
                  </div>
                );
              })()}

              {/* 3. Nous soutenons le monde culturel — pleine largeur */}
              <div className="glass-widget-culture" style={{
                gridColumn: '1 / -1',
                borderRadius: 14,
                padding: 'clamp(1rem, 1.5vw, 1.75rem) clamp(1rem, 1.5vw, 1.75rem)',
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <h3 style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif", fontWeight: 700, fontSize: 'clamp(0.95rem, 1.15vw, 1.35rem)', color: DARK, margin: '0 0 clamp(0.25rem, 0.4vw, 0.45rem) 0' }}>
                  {t('home.widgetStatsCultural')}
                </h3>
                <p style={{ fontSize: 'clamp(0.8rem, 1vw, 1.1rem)', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  {t('home.widgetStatsCulturalDesc')}
                </p>
              </div>

              {/* 4. Campagne 481k$ — flèche en haut à droite du bloc, image à gauche, texte à droite */}
              <div className="glass-widget-481k" style={{
                position: 'relative',
                gridColumn: '1 / -1',
                borderRadius: 14,
                padding: 'clamp(1rem, 1.5vw, 1.75rem) clamp(1rem, 1.5vw, 1.75rem)',
                display: 'grid',
                gridTemplateColumns: 'minmax(100px, 1fr) 1.5fr',
                gap: 'clamp(1rem, 1.5vw, 1.5rem)',
                alignItems: 'center',
                alignContent: 'center',
                minHeight: 0,
                overflow: 'hidden',
              }}>
                <span
                  style={{
                    position: 'absolute',
                    top: 'clamp(1rem, 1.5vw, 1.75rem)',
                    right: 'clamp(1rem, 1.5vw, 1.75rem)',
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(12px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    color: SITE_MAUVE,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                  }}
                  aria-hidden
                >
                  <ArrowUpRight size={18} strokeWidth={2.5} />
                </span>
                <div style={{
                  minHeight: 120,
                  width: '100%',
                  height: '100%',
                  minWidth: 0,
                  borderRadius: 14,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <img
                    src="/demo/phone-mockup-481k.png"
                    alt="Campagne Défi 28 jours sans alcool — Fondation Jean Lapointe"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                </div>
                <div>
                  <div style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif", fontWeight: 700, fontSize: 'clamp(1.75rem, 2.5vw, 3rem)', lineHeight: 1, color: DARK, marginBottom: 8 }}>481k$</div>
                  <p style={{ fontSize: 'clamp(0.8rem, 1vw, 1.1rem)', color: '#4b5563', lineHeight: 1.5, margin: 0 }}>
                    {t('home.widgetStats481k')}
                  </p>
                </div>
              </div>

              {/* 5. 2022 — L'agence fête ses 4 ans (pleine largeur : 2022 à gauche, texte à droite) */}
              <div className="glass-widget-stats" style={{
                gridColumn: '1 / -1',
                borderRadius: 14,
                padding: 'clamp(0.9rem, 1.2vw, 1.4rem)',
                minHeight: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}>
                <div style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif", fontWeight: 700, fontSize: 'clamp(1.75rem, 2.2vw, 2.75rem)', lineHeight: 1, color: DARK }}>2022</div>
                <p style={{ fontSize: 'clamp(0.75rem, 0.9vw, 1rem)', color: '#4b5563', lineHeight: 1.4, margin: 0, textAlign: 'right' }}>{t('home.widgetAnniv')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 2 — SOYONS AUDACIEUX + CTA
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{
          padding: '5rem 3% 6rem',
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
            margin: '0 0 1.5rem 0',
            display: 'inline-block',
            width: 'fit-content',
            background: 'linear-gradient(to right, #6B1817, #523DCB)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {t('home.audaciousLine1')}<br />
            {t('home.audaciousLine2')}<br />
            {t('home.audaciousLine3')}
          </h2>
          <p style={{
            fontSize: 'clamp(1.1875rem, 1.875vw, 1.375rem)',
            color: '#374151',
            lineHeight: 1.5,
            maxWidth: 520,
            margin: '0 auto 2.5rem',
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
            fontWeight: 400,
          }}>
            {t('home.audaciousParagraph')}
          </p>
          <SplitCTAButton href="#" label={t('home.performNow')} ariaLabel={t('home.performNow')} />
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 2b — CARROUSEL LOGOS (sous SOYONS AUDACIEUX)
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ marginTop: 0, marginBottom: 5 * 16 }}>
          <DoubleLogoCarousel title={t('home.trustedBy')} />
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 3 — ON … L'IA (fond #EFE8E8, glass pill + dégradé texte)
            Ratio : visuel 45% | texte 55%
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '5rem 3%', marginBottom: 5 * 16, background: '#EFE8E8', position: 'relative' }}>
          {/* Fond léger derrière le texte pour que le backdrop-filter du pill soit visible */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '55%',
              height: '100%',
              background: 'radial-gradient(ellipse 80% 70% at 70% 50%, rgba(200,190,220,0.32) 0%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-[9fr_11fr] gap-4 lg:gap-6 items-center" style={{ isolation: 'isolate', position: 'relative', zIndex: 1 }}>
            {/* Gauche (~45%) : vidéo On maîtrise l'IA */}
            <div style={{
              borderRadius: 28,
              overflow: 'hidden',
              aspectRatio: '4/3',
              position: 'relative',
            }}>
              <video
                src="/demo/vido-balles.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                aria-label={t('home.iaAriaLabel')}
              />
            </div>
            {/* Droite (~55%) : phrase + "On [verbe] l'IA" — centrés */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.25rem',
                minHeight: 200,
                maxWidth: 520,
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(1.1875rem, 1.875vw, 1.375rem)',
                  color: '#374151',
                  lineHeight: 1.5,
                  margin: 0,
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 400,
                }}
              >
                {t('home.iaTagline')}
              </p>
              <div className="glass-heading-panel" style={{ textAlign: 'center' }}>
                <span
                  style={{
                    fontFamily: "'Neue Haas Unica Pro', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(2.2rem, 4.4vw, 3rem)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    background: 'linear-gradient(to right, #6B1817, #523DCB)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {language === 'en'
                    ? `${t('home.iaVerbPrefix')} ${iaVerbs[onIaIndex] || ''} ${t('home.iaVerbSuffix')}`
                    : `${t('home.iaVerbPrefix')} ${iaVerbs[onIaIndex] || ''} ${t('home.iaVerbSuffix')}`}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 4 — SERVICES (4 cartes : Lab tech, Studio, Agence, Transition)
        ════════════════════════════════════════════════════════════════════ */}
        <HomeServicesSection />

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 5 — TRIPTYQUE PROJETS
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{
          marginBottom: 'clamp(2.5rem, 6vw, 5rem)',
          paddingTop: 'clamp(2rem, 5vw, 4rem)',
          paddingBottom: 'clamp(2.5rem, 6vw, 5rem)',
          paddingLeft: '3%',
          paddingRight: '3%',
          background: 'transparent',
        }}>
          <Triptych projects={homeTriptychProjects} />
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 7 — PRÊT.E À PERFORMER? (composant partagé)
        ════════════════════════════════════════════════════════════════════ */}
        <CTAPerformSection />

        </div>
      </div>
    </PageLayout>
  );
}
