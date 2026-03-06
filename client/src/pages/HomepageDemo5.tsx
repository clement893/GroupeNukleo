import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { DoubleLogoCarousel } from '@/components/demo3';
import { ArrowUpRight, ArrowRight, MapPin } from 'lucide-react';
import { SplitCTAButton } from '@/components/SplitCTAButton';
import PageLayout from '@/components/PageLayout';
import HomeServicesSection from '@/components/HomeServicesSection';
import CTAPerformSection from '@/components/CTAPerformSection';
import ProjectsHeroTriptych from '@/components/ProjectsHeroTriptych';
import { PROJECTS_DATA } from '@/data/projectsData';

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

function mapProjectsDataToHome(
  projects: Array<{ title: string; category: string; description: { fr: string; en: string }; images: string[]; slug?: string }>,
  max: number,
  startIndex: number
): HomeProjectItem[] {
  if (!projects?.length) return [];
  return projects.slice(0, max).map((p, i) => {
    const tagline = (p.description?.fr || p.description?.en || '').slice(0, 70);
    const imgFilename = p.images?.[0];
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
                <span style={{ fontFamily: "'Google Sans Flex', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 4rem)', lineHeight: 1, color: 'rgba(255,255,255,0.15)', letterSpacing: '-0.04em' }}>{p.num}</span>
              </div>
              <h3 style={{
                fontFamily: "'Google Sans Flex', sans-serif", fontWeight: 700,
                fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', lineHeight: 1.1,
                letterSpacing: '-0.02em', color: '#fff', marginBottom: '1rem',
              }}>{p.name}</h3>
              <a
                href="#projects"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  color: '#fff', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none',
                  background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: 999,
                }}
              >
                {t('home.caseStudy')} <ArrowRight size={16} />
              </a>
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
                    <a
                      href="#projects"
                      style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 1 }}
                    >View case →</a>
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
                      <a
                        href="#projects"
                        style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: 2, textDecoration: 'none' }}
                      >
                        View case study →
                      </a>
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

  const items = PROJECTS.slice(0, 3).map((p) => ({
    img: p.img,
    title: p.name,
    num: p.num,
  }));

  return (
    <ProjectsHeroTriptych
      items={items}
      projectUrl="#projects"
      viewProjectLabel={t('home.caseStudy')}
    />
  );
}

// ─── Composant principal ─────────────────────────────────────────────────────
const ON_IA_VERBS = ['maîtrise', 'optimise', 'entraîne', 'personnalise', 'humanise'];

export default function HomepageDemo5() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const [onIaIndex, setOnIaIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setOnIaIndex(i => (i + 1) % ON_IA_VERBS.length), 3200);
    return () => clearInterval(id);
  }, []);

  const NAV_LINKS = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  // Données statiques des projets (site one-page sans backend)
  const homeCarouselProjects = mapProjectsDataToHome(PROJECTS_DATA, 6, 0);
  const homeTriptychProjects = mapProjectsDataToHome(PROJECTS_DATA, 3, 0);

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
            SECTION HERO — Le Groupe Nukleo (titre + tagline + photo équipe)
        ════════════════════════════════════════════════════════════════════ */}
        {/* Bloc 1 — Titre + tagline sur fond beige */}
        <section
          style={{
            background: CREAM,
            paddingTop: 'clamp(3.5rem, 8.75vh, 7rem)',
            paddingBottom: 'clamp(2rem, 5vh, 4rem)',
            paddingLeft: '3%',
            paddingRight: '3%',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(1.5rem, 3vw, 2.5rem)',
              maxWidth: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                flexWrap: 'wrap',
              }}
            >
              <style>{`
                @media (min-width: 768px) {
                  .hero-title-tagline { flex-direction: row; align-items: flex-end; justify-content: space-between; gap: 2rem; }
                }
              `}</style>
              <div
                className="hero-title-tagline"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Google Sans Flex', sans-serif",
                      fontWeight: 600,
                      fontSize: 'clamp(1.25rem, 3vw, 2.25rem)',
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                      color: BORDEAUX,
                      marginBottom: '0.25rem',
                    }}
                  >
                    Le Groupe
                  </div>
                  <h1
                    style={{
                      fontFamily: "'Google Sans Flex', sans-serif",
                      fontWeight: 700,
                      fontSize: 'clamp(2.5rem, 10vw, 6.5rem)',
                      lineHeight: 1.05,
                      letterSpacing: '-0.04em',
                      margin: 0,
                      color: SITE_MAUVE,
                    }}
                  >
                    Nukleo
                  </h1>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body, sans-serif)',
                    fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
                    lineHeight: 1.55,
                    color: DARK,
                    margin: 0,
                    maxWidth: '48ch',
                  }}
                >
                  {t('home.heroTagline')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bloc 2 — Photo d'équipe pleine largeur avec dégradé violet → magenta */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            minHeight: 'min(50vh, 480px)',
            overflow: 'hidden',
            background: 'linear-gradient(to right, #3d2463, #a91b6a)',
          }}
        >
          <img
            src="/demo/team-hero.jpg"
            alt={t('alt.teamHero') || "L'équipe Nukleo"}
            loading="eager"
            fetchPriority="high"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(61,36,99,0.5), rgba(169,27,106,0.45))',
              pointerEvents: 'none',
            }}
          />
        </div>

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
              {/* 1. Bloc statique (remplace météo — pas d'API en mode statique) */}
              <div className="glass-widget-weather-date" style={{
                minHeight: 0,
                borderRadius: 14,
                padding: 'clamp(1.5rem, 2.2vw, 2.5rem) clamp(1.5rem, 2.4vw, 2.75rem)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 'clamp(0.35rem, 0.5vw, 0.6rem)', textAlign: 'center', height: '100%',
              }}>
                <div style={{ fontSize: 'clamp(1rem, 1.2vw, 1.3rem)', fontWeight: 700, color: '#6b7280' }}>Montréal</div>
                <div style={{ fontFamily: "'Google Sans Flex', sans-serif", fontWeight: 700, fontSize: 'clamp(2rem, 2.5vw, 3rem)', lineHeight: 1, color: DARK }}>Nukleo</div>
                <div style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.85rem)', color: '#6b7280' }}>Agence numérique</div>
              </div>

              {/* 2. Date — même style et proportions que météo */}
              {(() => {
                const d = new Date();
                const dayName = d.toLocaleDateString('fr-FR', { weekday: 'long' });
                const dayNum = d.getDate();
                const monthYear = d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
                return (
                  <div className="glass-widget-weather-date" style={{
                    minHeight: 0,
                    borderRadius: 14,
                    padding: 'clamp(1.5rem, 2.2vw, 2.5rem) clamp(1.5rem, 2.4vw, 2.75rem)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: 'clamp(0.35rem, 0.5vw, 0.6rem)', textAlign: 'center', height: '100%',
                  }}>
                    <div style={{ fontSize: 'clamp(1rem, 1.2vw, 1.3rem)', fontWeight: 700, color: '#6b7280' }}>Bon {dayName} <span style={{ color: PURPLE }}>♥</span></div>
                    <div style={{ fontFamily: "'Google Sans Flex', sans-serif", fontWeight: 700, fontSize: 'clamp(3.5rem, 4.4vw, 5.5rem)', lineHeight: 1, color: DARK }}>{dayNum}</div>
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
                <h3 style={{ fontFamily: "'Google Sans Flex', sans-serif", fontWeight: 700, fontSize: 'clamp(0.95rem, 1.15vw, 1.35rem)', color: DARK, margin: '0 0 clamp(0.25rem, 0.4vw, 0.45rem) 0' }}>
                  Nous soutenons le monde culturel
                </h3>
                <p style={{ fontSize: 'clamp(0.8rem, 1vw, 1.1rem)', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  Nous donnons 1% de tous nos revenus; nous faisons des dons; nos employés sont membres du Musée.
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
                  <div style={{ fontFamily: "'Google Sans Flex', sans-serif", fontWeight: 700, fontSize: 'clamp(1.75rem, 2.5vw, 3rem)', lineHeight: 1, color: DARK, marginBottom: 8 }}>481k$</div>
                  <p style={{ fontSize: 'clamp(0.8rem, 1vw, 1.1rem)', color: '#4b5563', lineHeight: 1.5, margin: 0 }}>
                    amassés lors de notre dernière campagne pour le Défi 28 jours sans alcool
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
                <div style={{ fontFamily: "'Google Sans Flex', sans-serif", fontWeight: 700, fontSize: 'clamp(1.75rem, 2.2vw, 2.75rem)', lineHeight: 1, color: DARK }}>2022</div>
                <p style={{ fontSize: 'clamp(0.75rem, 0.9vw, 1rem)', color: '#4b5563', lineHeight: 1.4, margin: 0, textAlign: 'right' }}>L'agence fête ses 4 ans</p>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 2 — QUI SOMMES-NOUS (en-tête + deux colonnes + cartes)
        ════════════════════════════════════════════════════════════════════ */}
        <section id="about" className="scroll-mt-24" style={{
          padding: '5rem 3% 6rem',
          marginBottom: 0,
          background: CREAM,
        }}>
          {/* En-tête */}
          <p style={{
            fontSize: 'clamp(0.75rem, 0.95vw, 0.9375rem)',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#374151',
            marginBottom: '1.25rem',
            fontFamily: "'Google Sans Flex', sans-serif",
            textAlign: 'center',
          }}>
            {t('home.quiSommesNous.sectionLabel')}
          </p>
          <h2 style={{
            fontFamily: "'Google Sans Flex', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(1.75rem, 4vw, 3.25rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            margin: '0 auto 3.5rem',
            textAlign: 'center',
            maxWidth: 'min(32ch, 100%)',
          }}>
            <span style={{ color: BORDEAUX }}>{t('home.quiSommesNous.titlePart1')}</span>
            <br />
            <span style={{ color: SITE_MAUVE }}>{t('home.quiSommesNous.titlePart2')}</span>
          </h2>

          {/* Bloc deux colonnes : image gauche, texte droite */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-14 items-start mb-10 md:mb-14 max-w-[1100px] mx-auto"
          >
            <div
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                aspectRatio: '4/3',
                minHeight: 260,
                background: '#e5e5e5',
              }}
            >
              <img
                src="/demo/qui-sommes-nous.jpg"
                alt={t('home.quiSommesNous.imageAlt')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%)',
                }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            <div>
              <h3 style={{
                fontFamily: "'Google Sans Flex', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
                color: BORDEAUX,
                margin: '0 0 0.35rem 0',
              }}>
                {t('home.quiSommesNous.subtitle1')}
              </h3>
              <h4 style={{
                fontFamily: "'Google Sans Flex', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                color: SITE_MAUVE,
                margin: '0 0 1.25rem 0',
              }}>
                {t('home.quiSommesNous.subtitle2')}
              </h4>
              <p style={{
                fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                color: DARK,
                lineHeight: 1.6,
                margin: '0 0 1rem 0',
              }}>
                {t('home.quiSommesNous.paragraph1')}
              </p>
              <p style={{
                fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                color: DARK,
                lineHeight: 1.6,
                margin: '0 0 1.5rem 0',
              }}>
                {t('home.quiSommesNous.paragraph2')}
              </p>
              <a
                href={getLocalizedPath('/about')}
                style={{
                  fontSize: 'clamp(0.875rem, 1vw, 0.95rem)',
                  color: SITE_MAUVE,
                  fontWeight: 600,
                  textDecoration: 'underline',
                }}
              >
                {t('home.quiSommesNous.ctaStory')} &gt;
              </a>
            </div>
          </div>

          {/* Cartes Nukleo et Rouge on Blue */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8 max-w-[700px] mx-auto">
            <a
              href="#"
              aria-label={t('home.quiSommesNous.visitSite') + ' Nukleo'}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '2rem 1.5rem',
                borderRadius: 16,
                background: 'rgba(147, 112, 219, 0.12)',
                boxShadow: '0 2px 16px rgba(82, 61, 203, 0.08)',
                textDecoration: 'none',
                color: DARK,
                minHeight: 140,
              }}
            >
              <span style={{
                fontFamily: "'Google Sans Flex', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.35rem, 1.8vw, 1.6rem)',
                color: DARK,
              }}>
                {t('home.quiSommesNous.cardNukleo')}
              </span>
              <span style={{ fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)', color: SITE_MAUVE, fontWeight: 600 }}>
                {t('home.quiSommesNous.visitSite')} &gt;
              </span>
            </a>
            <a
              href="https://rougeonblue.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('home.quiSommesNous.visitSite') + ' Rouge on Blue'}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '2rem 1.5rem',
                borderRadius: 16,
                background: 'rgba(147, 112, 219, 0.12)',
                boxShadow: '0 2px 16px rgba(82, 61, 203, 0.08)',
                textDecoration: 'none',
                color: DARK,
                minHeight: 140,
              }}
            >
              <span style={{
                fontFamily: "'Google Sans Flex', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.35rem, 1.8vw, 1.6rem)',
                color: DARK,
              }}>
                {t('home.quiSommesNous.cardRougeOnBlue')}
              </span>
              <span style={{ fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)', color: SITE_MAUVE, fontWeight: 600 }}>
                {t('home.quiSommesNous.visitSite')} &gt;
              </span>
            </a>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 2a — VISION PARTAGÉE : Dirigeants + Bureaux
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '5rem 3%', marginBottom: 0, background: CREAM }}>
          {/* Intro */}
          <p style={{
            fontFamily: "'Google Sans Flex', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
            color: SITE_MAUVE,
            margin: '0 0 0.5rem 0',
          }}>
            {t('home.leadersSection.introLine1')}
          </p>
          <p style={{
            fontFamily: "'Google Sans Flex', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.05rem, 1.35vw, 1.25rem)',
            color: DARK,
            lineHeight: 1.4,
            margin: '0 0 2.5rem 0',
            maxWidth: '42ch',
          }}>
            {t('home.leadersSection.introLine2')}
          </p>

          {/* Cartes dirigeants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-14">
            {/* Clément Roy */}
            <div style={{
              display: 'flex',
              gap: '1.25rem',
              padding: '1.5rem',
              borderRadius: 16,
              background: '#fff',
              boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
            }}>
              <div style={{
                flexShrink: 0,
                width: 120,
                height: 120,
                borderRadius: 12,
                overflow: 'hidden',
                background: '#e5e5e5',
              }}>
                <img
                  src="/team/Clement.webp"
                  alt={t('home.leadersSection.clementImageAlt')}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%)',
                  }}
                />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontFamily: "'Google Sans Flex', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
                  letterSpacing: '0.04em',
                  color: DARK,
                  marginBottom: 2,
                }}>
                  {t('home.leadersSection.clementName')}
                </div>
                <div style={{
                  fontFamily: "'Google Sans Flex', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(0.75rem, 0.9vw, 0.85rem)',
                  letterSpacing: '0.02em',
                  color: '#374151',
                  marginBottom: '0.75rem',
                }}>
                  {t('home.leadersSection.clementTitle')}
                </div>
                <p style={{
                  fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)',
                  color: '#4b5563',
                  lineHeight: 1.55,
                  margin: 0,
                }}>
                  {t('home.leadersSection.clementBio')}
                </p>
              </div>
            </div>
            {/* Lionel Pardin */}
            <div style={{
              display: 'flex',
              gap: '1.25rem',
              padding: '1.5rem',
              borderRadius: 16,
              background: '#fff',
              boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
            }}>
              <div style={{
                flexShrink: 0,
                width: 120,
                height: 120,
                borderRadius: 12,
                overflow: 'hidden',
                background: '#e5e5e5',
              }}>
                <img
                  src="/team/Lionel.png"
                  alt={t('home.leadersSection.lionelImageAlt')}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%)',
                  }}
                />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontFamily: "'Google Sans Flex', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
                  letterSpacing: '0.04em',
                  color: DARK,
                  marginBottom: 2,
                }}>
                  {t('home.leadersSection.lionelName')}
                </div>
                <div style={{
                  fontFamily: "'Google Sans Flex', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(0.75rem, 0.9vw, 0.85rem)',
                  letterSpacing: '0.02em',
                  color: '#374151',
                  marginBottom: '0.75rem',
                }}>
                  {t('home.leadersSection.lionelTitle')}
                </div>
                <p style={{
                  fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)',
                  color: '#4b5563',
                  lineHeight: 1.55,
                  margin: 0,
                }}>
                  {t('home.leadersSection.lionelBio')}
                </p>
              </div>
            </div>
          </div>

          {/* Titre bureaux */}
          <h3 style={{
            fontFamily: "'Google Sans Flex', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(1.1rem, 1.4vw, 1.3rem)',
            color: SITE_MAUVE,
            margin: '0 0 1.5rem 0',
            textAlign: 'center',
          }}>
            {t('home.leadersSection.locationsTitle')}
          </h3>

          {/* Cartes lieux */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[900px] mx-auto">
            {/* Montréal */}
            <div style={{
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              background: '#f0f0f0',
            }}>
              <div style={{
                position: 'relative',
                height: 180,
                background: '#e5e5e5',
              }}>
                <img
                  src="/demo/map-montreal.jpg"
                  alt={t('home.leadersSection.mapMontrealAlt')}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%)',
                  }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                padding: '1rem 1.25rem',
              }}>
                <MapPin size={18} style={{ color: BORDEAUX, flexShrink: 0, marginTop: 2 }} aria-hidden />
                <span style={{ fontSize: 'clamp(0.875rem, 1vw, 0.95rem)', color: DARK, lineHeight: 1.4 }}>
                  {t('contact.addressMontreal')}
                </span>
              </div>
            </div>
            {/* Halifax */}
            <div style={{
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              background: '#f0f0f0',
            }}>
              <div style={{
                position: 'relative',
                height: 180,
                background: '#e5e5e5',
              }}>
                <img
                  src="/demo/map-halifax.jpg"
                  alt={t('home.leadersSection.mapHalifaxAlt')}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%)',
                  }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                padding: '1rem 1.25rem',
              }}>
                <MapPin size={18} style={{ color: BORDEAUX, flexShrink: 0, marginTop: 2 }} aria-hidden />
                <span style={{ fontSize: 'clamp(0.875rem, 1vw, 0.95rem)', color: DARK, lineHeight: 1.4 }}>
                  {t('contact.addressHalifax')}
                </span>
              </div>
            </div>
          </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-[9fr_11fr] gap-8 lg:gap-12 items-center" style={{ isolation: 'isolate', position: 'relative', zIndex: 1 }}>
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
                aria-label="On maîtrise l'IA"
              />
            </div>
            {/* Droite (~55%) : "On [verbe]" dans pill glass + "l'IA" en charcoal */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0, justifyContent: 'center', minHeight: 200 }}>
              <div className="glass-heading-panel">
                <span
                  style={{
                    fontFamily: "'Google Sans Flex', sans-serif",
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
                  On {ON_IA_VERBS[onIaIndex]}
                </span>
              </div>
              <span className="dark-charcoal-text">l'IA</span>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 4 — SERVICES (4 cartes : Lab tech, Studio, Agence, Transition)
        ════════════════════════════════════════════════════════════════════ */}
        <section id="services" className="scroll-mt-24">
          <HomeServicesSection />
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 5 — TRIPTYQUE PROJETS
        ════════════════════════════════════════════════════════════════════ */}
        <div id="projects" className="scroll-mt-24" style={{
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
