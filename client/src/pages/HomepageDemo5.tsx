import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { TeamScrollCards, DepartmentsWidget, DoubleLogoCarousel, ContactWidget } from '@/components/demo3';
import { Sun, Menu, X, ArrowUpRight } from 'lucide-react';

// ─── Constantes ──────────────────────────────────────────────────────────────
const PURPLE = '#7c3aed';
const BORDEAUX = '#7B1D3A';
const CREAM = '#F5F3EF';
const DARK = '#0A0A0A';

const WORK1 = '/demo/work1.jpg';
const WORK2 = '/demo/work2.jpg';
const WORK3 = '/demo/work3.jpg';
const TEAM_IMAGE = '/demo/team.jpg';
const ROB_BG = '/demo/rob-bg.jpg';

const PROJECTS = [
  { num: '01', name: 'MBAM', category: 'Brand & Digital', tagline: 'Redefining cultural engagement online.', result: '+240% digital reach', img: WORK1, color: '#2563eb' },
  { num: '02', name: 'SummitLaw', category: 'Brand & Creative', tagline: 'A law firm that finally looks like its ambition.', result: '+180% qualified leads', img: WORK2, color: PURPLE },
  { num: '03', name: 'QueerTech', category: 'AI & Platform', tagline: 'Technology built for belonging.', result: '+220% member engagement', img: WORK3, color: '#059669' },
];

// ─── Compteur animé ──────────────────────────────────────────────────────────
function CountUp({ target, prefix = '', suffix = '', duration = 1800 }: { target: number; prefix?: string; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(ease * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

// ─── Carrousel Projets Hero — style "une de journal" ──────────────────────────
function NewsCarousel() {
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
        <span style={{ fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>Our Latest Work</span>
      </div>

      {/* Compteur haut droite */}
      <div style={{ position: 'absolute', top: 14, right: 18, fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-heading, sans-serif)' }}>
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
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.4rem 1.5rem' }}>
        {/* Badge catégorie */}
        <div style={{ display: 'inline-block', background: p.color, color: '#fff', fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999, marginBottom: 8 }}>{p.category}</div>
        {/* Titre */}
        <div style={{ fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, fontSize: 'clamp(1.2rem, 2.5vw, 1.9rem)', color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 6 }}>{p.name}</div>
        {/* Tagline */}
        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)', marginBottom: 14, lineHeight: 1.5 }}>{p.tagline}</div>
        {/* Résultat + dots */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#fff', background: `${p.color}55`, border: `1px solid ${p.color}`, padding: '3px 10px', borderRadius: 999 }}>{p.result}</span>
          <div style={{ display: 'flex', gap: 5 }}>
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
    </div>
  );
}

// ─── Ancien Carrousel Projets Hero ───────────────────────────────────────────
function HeroProjectsCarousel() {
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
      <div className="flex gap-4 lg:gap-5 p-4 lg:p-5" style={{ height: '85vh', background: DARK }}>
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
                      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>Accrois la performance</p>
                      <span style={{ fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, color: 'rgba(255,255,255,0.12)', lineHeight: 1, fontSize: '5rem' }}>
                        {project.num}
                      </span>
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: 8 }}>
                      {project.category}
                    </span>
                  </div>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, color: '#fff', lineHeight: 0.88, letterSpacing: '-0.03em', marginBottom: 16, fontSize: 'clamp(2.5rem, 4.5vw, 5.5rem)' }}>
                      {project.name}
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: 420, marginBottom: 24 }}>
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

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '20px 0', background: DARK }}>
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

// ─── Triptyque projets ───────────────────────────────────────────────────────
function Triptych() {
  const [active, setActive] = useState(0);
  return (
    <div
      className="w-full overflow-hidden"
      style={{ height: 'clamp(420px, 65vh, 700px)', display: 'flex', background: DARK }}
    >
      {PROJECTS.map((p, i) => {
        const isActive = i === active;
        return (
          <div
            key={p.num}
            onClick={() => setActive(i)}
            style={{
              flex: isActive ? '1 1 65%' : '0 0 17.5%',
              transition: 'flex 0.65s cubic-bezier(0.77,0,0.175,1)',
              position: 'relative',
              cursor: isActive ? 'default' : 'pointer',
              overflow: 'hidden',
            }}
          >
            {/* Image */}
            <img
              src={p.img}
              alt={p.name}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover',
                filter: isActive ? 'grayscale(0) brightness(0.75)' : 'grayscale(1) brightness(0.35)',
                transition: 'filter 0.65s ease',
              }}
            />
            {/* Overlay gradient */}
            <div style={{ position: 'absolute', inset: 0, background: isActive ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' : 'rgba(0,0,0,0.45)' }} />

            {/* Barre couleur verticale (panneaux inactifs) */}
            {!isActive && (
              <div style={{ position: 'absolute', left: '50%', top: '30%', bottom: '30%', width: 2, background: p.color, opacity: 0.7, transform: 'translateX(-50%)' }} />
            )}

            {/* Numéro en bas */}
            <div style={{
              position: 'absolute', bottom: 20, right: 20,
              fontFamily: 'var(--font-heading, sans-serif)',
              fontSize: isActive ? '5rem' : '2rem',
              fontWeight: 900,
              color: isActive ? p.color : 'rgba(255,255,255,0.25)',
              lineHeight: 1,
              transition: 'font-size 0.5s ease, color 0.5s ease',
              letterSpacing: '-0.03em',
            }}>{p.num}</div>

            {/* Nom vertical (panneaux inactifs) */}
            {!isActive && (
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%) rotate(-90deg)',
                whiteSpace: 'nowrap',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}>{p.name}</div>
            )}

            {/* Contenu panneau actif */}
            {isActive && (
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.5rem 3rem' }}>
                <p style={{ color: p.color, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{p.category}</p>
                <h3 style={{ color: '#fff', fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 4.5rem)', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '1rem' }}>{p.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: 380 }}>{p.tagline}</p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: p.color, color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '0.4rem 1rem', borderRadius: 999 }}>{p.result}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Composant principal ─────────────────────────────────────────────────────
export default function HomepageDemo5() {
  const getLocalizedPath = useLocalizedPath();
  const [menuOpen, setMenuOpen] = useState(false);

  const NAV_LINKS = [
    { label: 'Services', href: '/services' },
    { label: 'Work', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <div style={{ background: CREAM, minHeight: '100vh', fontFamily: 'var(--font-body, sans-serif)', color: DARK }}>

      {/* ── Dégradé flottant haut de page ─────────────────────────────────── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 600,
        background: 'radial-gradient(ellipse 80% 55% at 50% -10%, rgba(196,181,253,0.55) 0%, rgba(147,197,253,0.3) 45%, transparent 75%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: '0 6% ', height: 68,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(245,243,239,0.82)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(10,10,10,0.06)',
      }}>
        <Link href={getLocalizedPath('/')}>
          <img src="/demo/nukleo-logo-rvb.svg" alt="Nukleo" style={{ height: 28, width: 'auto' }} />
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden lg:flex">
          {NAV_LINKS.map(l => (
            <Link key={l.label} href={getLocalizedPath(l.href)} style={{ fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.08em', color: `${DARK}99`, textDecoration: 'none' }}
              className="hover:opacity-100 transition-opacity">{l.label}</Link>
          ))}
          <Link href={getLocalizedPath('/start-project')}
            style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.5rem 1.25rem', borderRadius: 999, background: DARK, color: '#fff', textDecoration: 'none' }}
            className="hover:opacity-80 transition-opacity">
            Start a project
          </Link>
        </nav>
        <button onClick={() => setMenuOpen(true)} className="lg:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Menu size={22} />
        </button>
      </header>

      {/* ── Menu mobile ───────────────────────────────────────────────────── */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: DARK, display: 'flex', flexDirection: 'column', padding: '2rem 8%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <img src="/demo/nukleo-logo-rvb.png" alt="Nukleo" style={{ height: 32, filter: 'brightness(10)' }} />
            <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}><X size={24} /></button>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {NAV_LINKS.map(l => (
              <Link key={l.label} href={getLocalizedPath(l.href)} onClick={() => setMenuOpen(false)}
                style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', textDecoration: 'none', fontFamily: 'var(--font-heading, sans-serif)' }}>{l.label}</Link>
            ))}
          </nav>
        </div>
      )}

      {/* ── Contenu principal ─────────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 10, paddingTop: 88 }}>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 1 — LOGO MASSIF + HERO WIDGETS
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ padding: '0 6% 0' }}>

          {/* Logo image SVG */}
          <div style={{ paddingTop: '0.5rem', marginBottom: 8 }}>
            <img
              src="/demo/nukleo-logo-rvb.svg"
              alt="Nukleo"
              style={{ height: 'clamp(5rem, 12vw, 11rem)', width: 'auto', display: 'block' }}
            />
          </div>

          {/* Hero grid : widgets gauche (30%) + MacBook droite (70%) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: 14, marginTop: 14, alignItems: 'stretch', minHeight: '52vh' }}>

            {/* Colonne widgets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

              {/* Météo + Date */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {/* Météo */}
                <div style={{
                  borderRadius: 20, padding: '1rem 1.1rem',
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.92), rgba(245,243,239,0.97))',
                  boxShadow: '6px 6px 14px rgba(0,0,0,0.07), -4px -4px 10px rgba(255,255,255,0.75)',
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4,
                }}>
                  <Sun size={20} strokeWidth={1.5} color="#9ca3af" />
                  <div style={{ fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, fontSize: '2.4rem', lineHeight: 1, color: DARK }}>
                    24<span style={{ fontSize: '1rem', verticalAlign: 'super' }}>°</span>
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#9ca3af' }}>Montréal, Qc</div>
                </div>
                {/* Date */}
                <div style={{
                  borderRadius: 20, padding: '1rem 1.1rem',
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.92), rgba(245,243,239,0.97))',
                  boxShadow: '6px 6px 14px rgba(0,0,0,0.07), -4px -4px 10px rgba(255,255,255,0.75)',
                  display: 'flex', flexDirection: 'column', gap: 4,
                }}>
                  <div style={{ fontSize: '0.68rem', color: '#9ca3af' }}>Bon lundi <span style={{ color: PURPLE }}>♥</span></div>
                  <div style={{ fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, fontSize: '2.4rem', lineHeight: 1, color: DARK }}>24</div>
                  <div style={{ fontSize: '0.68rem', color: '#9ca3af' }}>fév. 2026</div>
                </div>
              </div>

              {/* Résultat campagne */}
              <div style={{
                borderRadius: 20, padding: '1rem 1.1rem',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.92), rgba(245,243,239,0.97))',
                boxShadow: '6px 6px 14px rgba(0,0,0,0.07), -4px -4px 10px rgba(255,255,255,0.75)',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                  <img src={WORK1} alt="campagne" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, fontSize: '1.5rem', color: DARK, lineHeight: 1 }}>749k$</div>
                  <div style={{ fontSize: '0.65rem', color: '#9ca3af', marginTop: 3 }}>amassés lors de notre<br />dernière campagne</div>
                </div>
              </div>

              {/* CTA téléphone */}
              <a href="tel:+14385431987" style={{
                borderRadius: 20, padding: '0.85rem 1.1rem',
                background: PURPLE,
                display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none',
                boxShadow: `0 6px 20px ${PURPLE}55`,
              }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" /></svg>
                </div>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}>438 543 1987</span>
              </a>

              {/* Widget About Us — version forte */}
              <div style={{
                borderRadius: 20,
                background: DARK,
                flex: 1,
                position: 'relative',
                overflow: 'hidden',
                minHeight: 160,
              }}>
                {/* Grille de fond */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                {/* Orbes */}
                <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${PURPLE}55 0%, transparent 70%)` }} />
                <div style={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: '50%', background: `radial-gradient(circle, ${BORDEAUX}44 0%, transparent 70%)` }} />
                {/* Contenu */}
                <div style={{ position: 'relative', zIndex: 1, padding: '1.4rem 1.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${BORDEAUX}, ${PURPLE})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                      </div>
                      <span style={{ fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Nukleo Digital</span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 10 }}>
                      <span style={{ background: `linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.7) 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Choisissez</span><br />
                      <span style={{ background: `linear-gradient(90deg, ${PURPLE} 0%, #a78bfa 50%, ${BORDEAUX} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>l'intelligence.</span>
                    </p>
                    <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                      Stratégie, technologie et créativité — augmentées par l'IA pour des résultats mesurables.
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {['Agency', 'Studio', 'Tech'].map(s => (
                        <span key={s} style={{ fontSize: '0.55rem', fontWeight: 700, padding: '3px 8px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em' }}>{s}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: `linear-gradient(90deg, ${BORDEAUX}, ${PURPLE})`, borderRadius: 999, padding: '5px 12px', cursor: 'pointer' }}>
                      <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#fff' }}>Démarrer</span>
                      <ArrowUpRight size={10} color="#fff" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Barre croissance */}
              <div style={{
                borderRadius: 20, padding: '0.85rem 1.1rem',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.92), rgba(245,243,239,0.97))',
                boxShadow: '6px 6px 14px rgba(0,0,0,0.07), -4px -4px 10px rgba(255,255,255,0.75)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.68rem', color: '#9ca3af' }}>Croissance actuelle</span>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: PURPLE }}>+4%</span>
                </div>
                <div style={{ height: 4, borderRadius: 999, background: '#e5e7eb', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '64%', borderRadius: 999, background: `linear-gradient(90deg, ${BORDEAUX}, ${PURPLE})` }} />
                </div>
              </div>

            </div>

            {/* Colonne Selected Work — News Carrousel */}
            <NewsCarousel />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 2 — CARROUSEL LOGOS (pleine largeur)
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ marginTop: 48 }}>
          <DoubleLogoCarousel title="Trusted by ambitious organizations" />
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 3 — STATS + CITATION ÉDITORIALE
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ padding: '56px 6%', display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 24, alignItems: 'center' }}>

          {/* Stat gauche */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900,
              fontSize: 'clamp(3.5rem, 7vw, 6rem)', lineHeight: 1, color: DARK, letterSpacing: '-0.04em',
            }}>
              <CountUp target={98} suffix="%" />
            </div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: 8, maxWidth: 160, margin: '8px auto 0' }}>
              taux de satisfaction client sur nos mandats 2024
            </p>
          </div>

          {/* Citation centrale */}
          <div style={{ textAlign: 'center', padding: '0 2rem' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 16 }}>Nukleo Digital</p>
            <blockquote style={{
              fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900,
              fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', lineHeight: 1.15, color: DARK, letterSpacing: '-0.02em',
              margin: 0,
            }}>
              "We make digital performance tangible — for organizations that refuse to blend in."
            </blockquote>
            <Link href={getLocalizedPath('/about')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 20, fontSize: '0.75rem', fontWeight: 700, color: PURPLE, textDecoration: 'none' }}>
              Notre histoire <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Stat droite */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900,
              fontSize: 'clamp(3.5rem, 7vw, 6rem)', lineHeight: 1, color: DARK, letterSpacing: '-0.04em',
            }}>
              <CountUp target={60} suffix="+" />
            </div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: 8, maxWidth: 160, margin: '8px auto 0' }}>
              organisations accompagnées depuis 2019
            </p>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 4 — DÉPARTEMENTS (gauche) + ÉQUIPE (droite)
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ padding: '0 6%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 48 }}>
          <div style={{ borderRadius: 24, overflow: 'hidden' }}>
            <DepartmentsWidget />
          </div>
          <div style={{ borderRadius: 24, overflow: 'hidden' }}>
            <TeamScrollCards />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 5 — TRIPTYQUE PROJETS (pleine largeur)
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ padding: '0 6%', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 style={{ fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-0.03em', color: DARK }}>Selected Work</h2>
            <Link href={getLocalizedPath('/projects')} style={{ fontSize: '0.75rem', fontWeight: 700, color: PURPLE, textDecoration: 'none' }}>All projects ↗</Link>
          </div>
          <ProjectsCarousel />
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 6 — ROUGE ON BLUE + STATS LIGNE
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ padding: '0 6%', marginBottom: 48, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>

          {/* Rouge on Blue */}
          <div style={{
            borderRadius: 24, overflow: 'hidden', position: 'relative',
            background: 'rgba(200,16,46,0.92)', minHeight: 400,
          }}>
            <img src={ROB_BG} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12, mixBlendMode: 'luminosity' }} />
            <div style={{ position: 'relative', zIndex: 1, padding: '3rem 3.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>A Nukleo Group company</p>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, fontSize: 'clamp(3rem, 6vw, 7rem)', lineHeight: 0.88, letterSpacing: '-0.04em', color: '#fff', marginBottom: '1.5rem' }}>
                  Rouge<br />on Blue.
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.65, maxWidth: 380, marginBottom: '2rem' }}>
                  For brands that refuse to blend in. Creative agency for those who believe being exceptional is not a risk — it's a strategy.
                </p>
                <a href="https://rougeonblue.com" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#C8102E', fontWeight: 700, fontSize: '0.8rem', padding: '0.75rem 1.75rem', borderRadius: 999, textDecoration: 'none' }}>
                  Oser l'Exception <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Colonne stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Stat 749k$ */}
            <div style={{
              borderRadius: 24, padding: '2rem 2.5rem', flex: 1,
              background: DARK, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Campagne record</p>
              <div>
                <div style={{ fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>
                  <CountUp target={749} prefix="" suffix="k$" />
                </div>
                <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>amassés lors de notre<br />dernière campagne</p>
              </div>
              <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', textDecoration: 'none' }}>
                Voir le cas <ArrowUpRight size={12} />
              </a>
            </div>

            {/* Stat 240% */}
            <div style={{
              borderRadius: 24, padding: '2rem 2.5rem', flex: 1,
              background: `linear-gradient(135deg, ${BORDEAUX}, ${PURPLE})`,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Croissance digitale</p>
              <div>
                <div style={{ fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>
                  <CountUp target={240} suffix="%" />
                </div>
                <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.55)', marginTop: 8 }}>de croissance digitale<br />moyenne sur nos mandats</p>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 7 — CTA FINAL
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ padding: '0 6%', marginBottom: 48 }}>
          <div style={{
            borderRadius: 24, padding: '4rem 5rem',
            background: DARK,
            display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 40,
          }}>
            <h2 style={{
              fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5vw, 6rem)', lineHeight: 0.9, letterSpacing: '-0.04em', color: '#fff',
            }}>
              Ready to<br /><span style={{ color: PURPLE }}>perform?</span>
            </h2>
            <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
              <Link href={getLocalizedPath('/start-project')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: DARK, fontWeight: 700, fontSize: '0.82rem', padding: '0.85rem 2rem', borderRadius: 999, textDecoration: 'none' }}>
                Start a project →
              </Link>
              <Link href={getLocalizedPath('/about')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontWeight: 600, fontSize: '0.82rem', padding: '0.85rem 2rem', borderRadius: 999, textDecoration: 'none' }}>
                About us
              </Link>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 8 — CONTACT WIDGET
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ padding: '0 6%', marginBottom: 48 }}>
          <ContactWidget />
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            FOOTER
        ════════════════════════════════════════════════════════════════════ */}
        <footer style={{ padding: '2rem 6% 3rem', borderTop: `1px solid ${DARK}12` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <nav style={{ display: 'flex', gap: '2rem' }}>
              {NAV_LINKS.map(l => (
                <Link key={l.label} href={getLocalizedPath(l.href)}
                  style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: `${DARK}55`, textDecoration: 'none' }}>{l.label}</Link>
              ))}
            </nav>
            <p style={{ fontSize: '0.68rem', color: `${DARK}35`, letterSpacing: '0.08em' }}>© 2025 Nukleo Digital · Montréal</p>
          </div>
        </footer>

      </div>
    </div>
  );
}
