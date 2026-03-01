import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { useLanguage } from '@/contexts/LanguageContext';
import { TeamScrollCards, DoubleLogoCarousel } from '@/components/demo3';
import { ArrowUpRight, HelpCircle } from 'lucide-react';
import { SplitCTAButton } from '@/components/SplitCTAButton';
import { WeatherWidget } from '@/components/WeatherWidget';
import PageLayout from '@/components/PageLayout';
import { HOME_SERVICES } from '@/data/homeServices';
import { trpc } from '@/lib/trpc';

// ─── Constantes ──────────────────────────────────────────────────────────────
const PURPLE = '#7c3aed';
const BORDEAUX = '#7B1D3A';
const CREAM = '#F5F3EF';
const DARK = '#0A0A0A';

const WORK1 = '/demo/work1.jpg';
const WORK2 = '/demo/work2.jpg';
const WORK3 = '/demo/work3.jpg';
const FALLBACK_PROJECTS = [
  { num: '01', name: 'MBAM', category: 'Brand & Digital', tagline: 'Redefining cultural engagement online.', result: '+240% digital reach', img: WORK1, color: '#2563eb' },
  { num: '02', name: 'SummitLaw', category: 'Brand & Creative', tagline: 'A law firm that finally looks like its ambition.', result: '+180% qualified leads', img: WORK2, color: PURPLE },
  { num: '03', name: 'QueerTech', category: 'AI & Platform', tagline: 'Technology built for belonging.', result: '+220% member engagement', img: WORK3, color: '#059669' },
];

type HomeProjectItem = { num: string; name: string; category: string; tagline: string; result: string; img: string; color: string };
const CAROUSEL_COLORS = ['#2563eb', PURPLE, '#059669', '#dc2626', '#7c2d12'];

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

// ─── Carrousel Projets Hero — style "une de journal" (Latest project en haut de l'accueil)
function NewsCarousel({ projects: projectsProp }: { projects?: HomeProjectItem[] }) {
  const PROJECTS = projectsProp && projectsProp.length > 0 ? projectsProp : FALLBACK_PROJECTS;
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setActive(a => (a + 1) % PROJECTS.length), []);
  const prev = useCallback(() => setActive(a => (a - 1 + PROJECTS.length) % PROJECTS.length), []);

  useEffect(() => {
    if (!isHovered) timerRef.current = setInterval(next, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isHovered, next]);

  const p = PROJECTS[active];

  return (
    <div
      style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', height: '100%', minHeight: 320 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Images en fondu croisé */}
      {PROJECTS.map((proj, i) => (
        <img
          key={proj.num}
          src={proj.img}
          alt={proj.name}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: i === active ? 1 : 0,
            transition: 'opacity 0.7s ease',
          }}
        />
      ))}

      {/* Overlay gradient bas */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)' }} />

      {/* Label haut gauche */}
      <div style={{ position: 'absolute', top: 16, left: 18, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 'clamp(0.58rem, 0.75vw, 0.9rem)', fontWeight: 800, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>{t('home.latestWork')}</span>
      </div>

      {/* Compteur haut droite */}
      <div style={{ position: 'absolute', top: 14, right: 18, fontSize: 'clamp(0.65rem, 0.8vw, 0.95rem)', fontWeight: 700, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-heading, sans-serif)' }}>
        {String(active + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
      </div>

      {/* Flèche gauche */}
      <button
        onClick={prev}
        style={{
          position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
      </button>

      {/* Flèche droite */}
      <button
        onClick={next}
        style={{
          position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
      </button>

      {/* Contenu bas */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(1rem, 1.4vw, 1.6rem) clamp(1rem, 1.5vw, 1.75rem)' }}>
        {/* Titre */}
        <div style={{ fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, fontSize: 'clamp(1.2rem, 2.5vw, 1.9rem)', color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 10 }}>{p.name}</div>
        {/* Tagline */}
        <div style={{ fontSize: 'clamp(0.72rem, 0.95vw, 1.05rem)', color: 'rgba(255,255,255,0.65)', marginBottom: 22, lineHeight: 1.5 }}>{p.tagline}</div>
        {/* Dots navigation */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 5 }}>
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{ width: i === active ? 18 : 5, height: 5, borderRadius: 999, background: i === active ? '#fff' : 'rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }}
            />
          ))}
        </div>
      </div>
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
                      href={getLocalizedPath('/projects')}
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
                        href={getLocalizedPath('/projects')}
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

// ─── Triptyque projets (sans fond, blocs fermés à 8%, hauteur +15%) ─────────────────
function Triptych({ projects: projectsProp }: { projects?: HomeProjectItem[] }) {
  const PROJECTS = projectsProp && projectsProp.length > 0 ? projectsProp : FALLBACK_PROJECTS;
  const [active, setActive] = useState(0);
  const getLocalizedPath = useLocalizedPath();
  const { t } = useLanguage();
  return (
    <div
      className="w-full overflow-hidden relative"
      style={{
        height: 'clamp(483px, 82vh, 960px)',
        display: 'flex',
        gap: 21,
      }}
    >
      {PROJECTS.map((p, i) => {
        const isActive = i === active;
        return (
          <div
            key={p.num}
            onClick={() => setActive(i)}
            style={{
              flex: isActive ? '1 1 0' : '0 0 6.8%',
              minWidth: isActive ? 0 : undefined,
              transition: 'flex 0.6s cubic-bezier(0.77,0,0.175,1)',
              position: 'relative',
              cursor: isActive ? 'default' : 'pointer',
              overflow: 'hidden',
              borderRadius: 12,
            }}
          >
            {/* Image (panneau actif en premier plan) */}
            <img
              src={p.img}
              alt={p.name}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover',
                filter: isActive ? 'grayscale(0) brightness(0.7)' : 'grayscale(1) brightness(0.55)',
                transition: 'filter 0.5s ease',
              }}
            />
            <div style={{ position: 'absolute', inset: 0, background: isActive ? 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)' : 'rgba(0,0,0,0.22)', transition: 'background 0.5s ease' }} />

            {/* Numéro 01 / 02 / 03 — Plus Jakarta Sans Bold, un peu de transparence */}
            <div
              style={{
                position: 'absolute',
                bottom: 24,
                right: 24,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 700,
                color: isActive ? 'rgba(167,139,250,0.9)' : 'rgba(167,139,250,0.4)',
                opacity: 0.92,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                transition: 'color 0.4s ease',
                textShadow: '0 2px 20px rgba(0,0,0,0.2)',
              }}
            >
              {p.num}
            </div>

            {/* Nom vertical (panneaux inactifs) */}
            {!isActive && (
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%) rotate(-90deg)',
                whiteSpace: 'nowrap',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
              }}>
                {p.name}
              </div>
            )}

            {/* Contenu panneau actif + titre projet & année en bas à gauche */}
            {isActive && (
              <>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 2.5rem 1.5rem 2.5rem' }}>
                  <p style={{ color: p.color, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>{p.category}</p>
                  <h3 style={{ color: '#fff', fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, fontSize: 'clamp(1.75rem, 3.5vw, 4rem)', lineHeight: 0.92, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>{p.name}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', marginBottom: '1.25rem', maxWidth: 340 }}>{p.tagline}</p>
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Link
                      href={getLocalizedPath('/projects')}
                      style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: 2, textDecoration: 'none' }}
                    >
                      {t('home.caseStudy')}
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Composant principal ─────────────────────────────────────────────────────
const ON_IA_VERBS = ['maîtrise', 'optimise', 'entraîne', 'personnalise', 'humanise'];

export default function HomepageDemo5() {
  const getLocalizedPath = useLocalizedPath();
  const { t } = useLanguage();
  const [onIaIndex, setOnIaIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setOnIaIndex(i => (i + 1) % ON_IA_VERBS.length), 3200);
    return () => clearInterval(id);
  }, []);

  const NAV_LINKS = [
    { label: t('nav.services'), href: '/services' },
    { label: t('nav.projects'), href: '/projects' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  const { data: apiProjects } = trpc.projects.list.useQuery(undefined, { staleTime: 2 * 60 * 1000 });
  const homeCarouselProjects = useMemo(() => {
    const featured = (apiProjects || []).filter((p: { featuredOnHomeCarousel?: boolean }) => p.featuredOnHomeCarousel);
    return mapApiProjectsToHome(featured, 6, 0, 'homeCarouselImage');
  }, [apiProjects]);
  const homeTriptychProjects = useMemo(() => {
    const featured = (apiProjects || []).filter((p: { featuredOnHomeTriptych?: boolean }) => p.featuredOnHomeTriptych);
    return mapApiProjectsToHome(featured, 3, 0, 'homeTriptychImage');
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
        <div style={{ position: 'relative', zIndex: 10, paddingTop: 80 }}>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION HERO — L'agence numérique des PME et des OBNL
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{
          minHeight: '27.5vh',
          padding: 'clamp(2.5rem, 6.25vh, 5rem) 6%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'transparent',
          boxSizing: 'border-box',
        }}>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
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
            background: 'linear-gradient(to right, #6B1817, #5636AD)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            <span style={{ display: 'block' }}>L'agence numérique</span>
            <span style={{ display: 'block' }}>des PME et des OBNL</span>
          </h1>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 1 — LOGO MASSIF + HERO WIDGETS (fond blanc)
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ padding: '0 6%', marginBottom: 5 * 16 }}>
          {/* Hero grid : 60% Our Latest Work (gauche) + 40% widgets (droite) */}
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 'clamp(1rem, 1.5vw, 1.5rem)', marginTop: 2.5 * 16, alignItems: 'start', minHeight: '52vh' }}>

            {/* Colonne Our Latest Work — News Carrousel (gauche) */}
            <NewsCarousel projects={homeCarouselProjects} />

            {/* Grille 6 cartes (2 + 1 + 1 + 2) — droite */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(0.5rem, 1.2vw, 1rem)',
              padding: 'clamp(0.75rem, 1.5vw, 1.25rem)',
              borderRadius: 28,
            }}>
              {/* 1. Météo — verre dépoli (style météo/date) */}
              <WeatherWidget className="glass-widget-weather-date" />

              {/* 2. Date — verre dépoli (même style que météo) */}
              {(() => {
                const d = new Date();
                const dayName = d.toLocaleDateString('fr-FR', { weekday: 'long' });
                const dayNum = d.getDate();
                const monthYear = d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
                return (
                  <div className="glass-widget-weather-date" style={{
                    padding: 'clamp(0.9rem, 1.2vw, 1.35rem) clamp(0.9rem, 1.3vw, 1.5rem)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(0.35rem, 0.6vw, 0.6rem)', textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 'clamp(0.7rem, 0.85vw, 0.95rem)', color: '#6b7280' }}>Bon {dayName} <span style={{ color: PURPLE }}>♥</span></div>
                    <div style={{ fontFamily: "'Figtree', sans-serif", fontWeight: 700, fontSize: 'clamp(1.75rem, 2.2vw, 2.75rem)', lineHeight: 1, color: DARK }}>{dayNum}</div>
                    <div style={{ fontSize: 'clamp(0.7rem, 0.85vw, 0.95rem)', color: '#6b7280' }}>{monthYear}</div>
                  </div>
                );
              })()}

              {/* 3. Nous soutenons le monde culturel — glassmorphism */}
              <div className="glass-widget-culture" style={{
                gridColumn: '1 / -1',
                padding: 'clamp(1rem, 1.5vw, 1.75rem) clamp(1rem, 1.5vw, 1.75rem)',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'clamp(0.4rem, 0.8vw, 0.75rem)', marginBottom: 'clamp(0.5rem, 0.8vw, 0.9rem)' }}>
                  <h3 style={{ fontFamily: "'Figtree', sans-serif", fontWeight: 700, fontSize: 'clamp(0.95rem, 1.15vw, 1.35rem)', color: DARK, margin: 0 }}>
                    Nous soutenons le monde culturel
                  </h3>
                  <button type="button" aria-label={t('home.moreInfo')} style={{ width: 24, height: 24, borderRadius: '50%', background: DARK, color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <HelpCircle size={14} />
                  </button>
                </div>
                <p style={{ fontSize: 'clamp(0.8rem, 1vw, 1.1rem)', color: '#4b5563', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
                  Nous donnons 1% de tous nos revenus; nous faisons des dons; nos employés sont membres du Musée.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed rgba(0,0,0,0.1)', paddingTop: 12 }}>
                  <span style={{ fontSize: 'clamp(0.72rem, 0.85vw, 0.95rem)', color: '#6b7280' }}>Montant donné</span>
                  <span className="glass-badge-purple" style={{
                    fontFamily: "'Figtree', sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 1.05vw, 1.2rem)',
                    padding: 'clamp(4px, 0.5vw, 8px) clamp(10px, 1.2vw, 14px)',
                  }}>+456.000$</span>
                </div>
              </div>

              {/* 4. Campagne 481k$ — glassmorphism */}
              <div className="glass-widget-481k" style={{
                gridColumn: '1 / -1',
                padding: 'clamp(1rem, 1.5vw, 1.75rem) clamp(1rem, 1.5vw, 1.75rem)',
                display: 'grid',
                gridTemplateColumns: 'minmax(100px, 1fr) 1.5fr',
                gap: 'clamp(1rem, 1.5vw, 1.5rem)',
                alignItems: 'center',
              }}>
                <div style={{ position: 'relative', minHeight: 120 }}>
                  {/* 3 images / écrans avec fonds pâles (style référence) */}
                  <div style={{ position: 'relative', height: 100 }}>
                    <div style={{ position: 'absolute', left: 0, top: 8, width: 44, height: 72, borderRadius: 10, background: 'rgba(240, 248, 255, 0.95)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(255,255,255,0.8)', transform: 'rotate(-12deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 'clamp(0.4rem, 0.5vw, 0.55rem)', color: '#94a3b8', textAlign: 'center', padding: 4 }}>Écran</span>
                    </div>
                    <div style={{ position: 'absolute', left: 28, top: 0, width: 44, height: 72, borderRadius: 10, background: 'rgba(255, 240, 245, 0.95)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(255,255,255,0.8)', transform: 'rotate(4deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 'clamp(0.4rem, 0.5vw, 0.55rem)', color: '#94a3b8', textAlign: 'center', padding: 4 }}>Transformez la donne</span>
                    </div>
                    <div style={{ position: 'absolute', left: 56, top: 12, width: 44, height: 72, borderRadius: 10, background: 'rgba(236, 254, 255, 0.95)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(255,255,255,0.8)', transform: 'rotate(14deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 'clamp(0.4rem, 0.5vw, 0.55rem)', color: '#94a3b8', textAlign: 'center', padding: 4 }}>Écran</span>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', top: 0, right: 8, width: 28, height: 28, borderRadius: 6, background: DARK, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Figtree', sans-serif", fontWeight: 700, fontSize: 'clamp(1.75rem, 2.5vw, 3rem)', lineHeight: 1, color: DARK, marginBottom: 8 }}>481k$</div>
                  <p style={{ fontSize: 'clamp(0.8rem, 1vw, 1.1rem)', color: '#4b5563', lineHeight: 1.5, margin: 0 }}>
                    amassés lors de notre dernière campagne pour le Défi 28 jours sans alcool
                  </p>
                </div>
              </div>

              {/* 5. 2022 — L'agence fête ses 4 ans — glassmorphism */}
              <div className="glass-widget-stats" style={{
                padding: 'clamp(0.9rem, 1.2vw, 1.4rem)',
              }}>
                <div style={{ fontFamily: "'Figtree', sans-serif", fontWeight: 700, fontSize: 'clamp(1.75rem, 2.2vw, 2.75rem)', lineHeight: 1, color: DARK, marginBottom: 8 }}>2022</div>
                <p style={{ fontSize: 'clamp(0.75rem, 0.9vw, 1rem)', color: '#4b5563', lineHeight: 1.4, margin: 0 }}>L'agence fête ses 4 ans</p>
              </div>

              {/* 6. +20 entreprises — glassmorphism */}
              <div className="glass-widget-stats" style={{
                padding: 'clamp(0.9rem, 1.2vw, 1.4rem)',
              }}>
                <div style={{ fontFamily: "'Figtree', sans-serif", fontWeight: 700, fontSize: 'clamp(1.75rem, 2.2vw, 2.75rem)', lineHeight: 1, color: DARK, marginBottom: 8 }}>+20</div>
                <p style={{ fontSize: 'clamp(0.75rem, 0.9vw, 1rem)', color: '#4b5563', lineHeight: 1.4, margin: 0 }}>entreprises accompagnées dans leur transformation numérique</p>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 2 — SOYONS AUDACIEUX + CTA
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{
          padding: '5rem 6% 6rem',
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
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            {t('home.audacious')}
          </p>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            margin: '0 0 1.5rem 0',
            display: 'inline-block',
            width: 'fit-content',
            background: 'linear-gradient(to right, #6B1817, #5636AD)',
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
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 400,
          }}>
            {t('home.audaciousParagraph')}
          </p>
          <SplitCTAButton href="/contact" label={t('home.performNow')} ariaLabel={t('home.performNow')} />
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
        <section style={{ padding: '5rem 6%', marginBottom: 5 * 16, background: '#EFE8E8', position: 'relative' }}>
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
            {/* Gauche (~45%) : carte visuelle placeholder 3D */}
            <div style={{
              borderRadius: 28,
              overflow: 'hidden',
              aspectRatio: '4/3',
              background: 'linear-gradient(135deg, rgba(107,33,168,0.28) 0%, rgba(123,29,58,0.22) 50%, rgba(59,130,246,0.22) 100%)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
              <div style={{ position: 'absolute', width: 60, height: 60, borderRadius: '50%', background: 'rgba(147,51,234,0.3)', top: '30%', right: '25%' }} />
              <div style={{ position: 'absolute', width: 40, height: 40, borderRadius: '50%', background: 'rgba(96,165,250,0.35)', bottom: '25%', left: '30%' }} />
            </div>
            {/* Droite (~55%) : "On [verbe]" dans pill glass + "l'IA" en charcoal */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0, justifyContent: 'center', minHeight: 200 }}>
              <div className="glass-heading-panel">
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(2.2rem, 4.4vw, 3rem)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    background: 'linear-gradient(to right, #6B1817, #5636AD)',
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
            SECTION 4 — SERVICES (4 cartes, fond blanc)
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '5rem 6% 6rem', marginBottom: 5 * 16 }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {HOME_SERVICES.map((service) => (
              <Link
                key={service.title}
                href={getLocalizedPath(service.path)}
                aria-label={`Voir ${service.title}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
                className="group"
              >
                <article
                  style={{
                    borderRadius: 20,
                    overflow: 'hidden',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                  }}
                  className="group-hover:shadow-lg"
                >
                  {/* Zone image + icône ↗ */}
                  <div style={{ position: 'relative', paddingTop: '60%', background: service.imageBg }}>
                    <div style={{ position: 'absolute', inset: 0 }} />
                    <span
                      style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: DARK,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                      }}
                      aria-hidden
                    >
                      <ArrowUpRight size={18} strokeWidth={2.5} />
                    </span>
                  </div>
                  {/* Titre */}
                  <h3 style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: DARK,
                    margin: 0,
                    padding: '1.25rem 1.25rem 0.5rem',
                  }}>
                    {service.title}
                  </h3>
                  {/* Description */}
                  <p style={{
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    lineHeight: 1.55,
                    margin: 0,
                    padding: '0 1.25rem',
                    flex: 1,
                  }}>
                    {service.description}
                  </p>
                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '1rem 1.25rem 1.25rem', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400 }}>
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.7rem',
                          color: '#4b5563',
                          background: '#f3f4f6',
                          padding: '4px 10px',
                          borderRadius: 8,
                          fontWeight: 500,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 5 — TRIPTYQUE PROJETS
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{
          marginBottom: 5 * 16,
          paddingTop: 4 * 16,
          paddingBottom: 5 * 16,
          paddingLeft: '6%',
          paddingRight: '6%',
          background: 'transparent',
        }}>
          <Triptych projects={homeTriptychProjects} />
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 7 — PRÊT.E À PERFORMER? (CTA type neumorphic)
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ padding: 'clamp(5rem, 10vh, 8rem) 6%', marginBottom: 5 * 16, background: 'transparent' }}>
          <div style={{
            maxWidth: 'min(90vw, 1200px)',
            margin: '0 auto',
            borderRadius: 28,
            padding: 'clamp(3.5rem, 6vw, 5rem) clamp(2.5rem, 4vw, 4rem)',
            textAlign: 'center',
          }}>
          <h2
            className="lg:whitespace-nowrap"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
              lineHeight: 1.3,
              letterSpacing: '-0.03em',
              margin: '0 0 1.5rem 0',
              paddingBottom: '0.08em',
              display: 'inline-block',
              width: 'fit-content',
              background: 'linear-gradient(to right, #6B1817, #5636AD)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
              {t('home.ctaPerform.title')}
            </h2>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(1.05rem, 1.35vw, 1.35rem)',
              color: '#374151',
              lineHeight: 1.65,
              margin: '0 0 2.5rem 0',
              width: '100%',
              maxWidth: '40vw',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              {t('home.ctaPerform.paragraph')}
            </p>
            <SplitCTAButton href="/contact" label={t('home.ctaPerform.button')} ariaLabel={t('home.ctaPerform.button')} />
          </div>
        </div>

        </div>
      </div>
    </PageLayout>
  );
}
