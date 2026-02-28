import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { TeamScrollCards, DepartmentsWidget, DoubleLogoCarousel, ContactWidget } from '@/components/demo3';
import { X, Menu, Sun } from 'lucide-react';

const NUKLEO_PURPLE = '#7c3aed';
const CREAM = '#F5F3EF';
const DARK = '#0A0A0A';

const TEAM_IMAGE = '/demo/team.jpg';
const TEAM_IMGS = ['/demo/team-1.jpg', '/demo/team-2.jpg', '/demo/team-3.jpg', '/demo/team-4.jpg'];
const WORK1 = '/demo/work1.jpg';
const WORK2 = '/demo/work2.jpg';
const WORK3 = '/demo/work3.jpg';
const ROB_BG = '/demo/rob-bg.jpg';

/** Nos derniers projets — différents de Selected Work (MBAM, SummitLaw, QueerTech) */
const LATEST_PROJECTS = [
  { name: 'Contre Jour Art After Dark', category: 'Brand & Digital', img: '/demo/project-1.jpg', color: '#2563eb' },
  { name: 'Soirée In Situ Night', category: 'Brand & Creative', img: '/demo/project-2.jpg', color: NUKLEO_PURPLE },
  { name: 'Perspectives', category: 'AI & Platform', img: '/demo/project-3.jpg', color: '#059669' },
  { name: 'Novisto', category: 'Sustainability Tech', img: '/demo/dept-consulting.jpg', color: '#0891b2' },
  { name: 'Rouge on Blue', category: 'Creative Agency', img: '/demo/rob-creative.jpg', color: '#dc2626' },
];

const PROJECTS = [
  {
    num: '01',
    name: 'MBAM',
    category: 'Brand & Digital',
    tagline: 'Redefining cultural engagement online.',
    result: '+240% digital reach · 2024',
    date: '2024',
    img: WORK1,
    color: '#2563eb',
  },
  {
    num: '02',
    name: 'SummitLaw',
    category: 'Brand & Creative',
    tagline: 'A law firm that finally looks like its ambition.',
    result: '+180% qualified leads · 2024',
    date: '2024',
    img: WORK2,
    color: NUKLEO_PURPLE,
  },
  {
    num: '03',
    name: 'QueerTech',
    category: 'AI & Platform',
    tagline: 'Technology built for belonging.',
    result: '+220% member engagement · 2023',
    date: '2023',
    img: WORK3,
    color: '#059669',
  },
];


// ─── HERO WOW — SPLIT KINETIC ───────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, delay = 400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timer);
  }, [target, duration, delay]);
  return count;
}

function HeroWow() {
  const getLocalizedPath = useLocalizedPath();
  const [lineVisible, setLineVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const count240 = useCountUp(240, 1600, 600);
  const count749 = useCountUp(749, 1800, 800);
  const count60 = useCountUp(60, 1400, 1000);

  useEffect(() => {
    const t1 = setTimeout(() => setTextVisible(true), 100);
    const t2 = setTimeout(() => setLineVisible(true), 500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      className="relative overflow-hidden rounded-3xl"
      style={{
        minHeight: '100vh',
        background: '#080810',
      }}
    >
      {/* Particules lumineuses — orbes de couleur */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div style={{
          position: 'absolute', top: '-10%', left: '-5%',
          width: '55%', height: '60%',
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.28) 0%, rgba(109,40,217,0.12) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', top: '5%', right: '-10%',
          width: '45%', height: '50%',
          background: 'radial-gradient(ellipse at center, rgba(127,29,29,0.22) 0%, rgba(185,28,28,0.08) 40%, transparent 70%)',
          filter: 'blur(50px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '30%',
          width: '40%', height: '35%',
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        {/* Grille subtile */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col lg:flex-row h-full" style={{ minHeight: '100vh' }}>

        {/* ── COLONNE GAUCHE : titre + sous-titre + CTA ── */}
        <div className="flex-1 flex flex-col justify-center px-10 lg:px-16 py-20 lg:py-24">
          {/* Label */}
          <p
            className="text-white/30 text-[10px] font-medium tracking-[0.4em] uppercase mb-8"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            Nukleo Digital — Choisissez l'intelligence
          </p>

          {/* Titre massif */}
          <h1
            className="font-heading font-black leading-[0.88] tracking-tight"
            style={{
              fontSize: 'clamp(3.5rem, 8vw, 8rem)',
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.92)' }}>Augmenter{' '}</span>
            <span style={{ color: 'rgba(255,255,255,0.92)' }}>votre</span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 35%, #9333ea 60%, #c084fc 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer-text 3s linear infinite',
            }}>
              Performance.
            </span>
          </h1>

          {/* Ligne décorative animée */}
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(to right, rgba(124,58,237,0.8), rgba(196,181,253,0.3), transparent)',
              marginTop: '2rem',
              marginBottom: '2rem',
              transformOrigin: 'left',
              transform: lineVisible ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'transform 0.9s cubic-bezier(0.77,0,0.175,1) 0.3s',
              maxWidth: '480px',
            }}
          />

          {/* Sous-titre */}
          <p
            className="text-white/50 leading-relaxed max-w-md"
            style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
            }}
          >
            Nukleo transforme les entreprises par l'excellence numérique — stratégie, créativité et technologie réunis.
          </p>

          {/* CTA */}
          <div
            className="flex items-center gap-4 mt-10"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s',
            }}
          >
            <Link
              href={getLocalizedPath('/contact')}
              className="group flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300"
              style={{
                background: 'white',
                color: DARK,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = NUKLEO_PURPLE;
                (e.currentTarget as HTMLElement).style.color = 'white';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'white';
                (e.currentTarget as HTMLElement).style.color = DARK;
              }}
            >
              Démarrer un projet
              <span style={{ transition: 'transform 0.2s ease' }} className="group-hover:translate-x-1 inline-block">→</span>
            </Link>
            <Link
              href={getLocalizedPath('/projects')}
              className="text-white/40 text-sm font-medium hover:text-white/80 transition-colors border-b border-white/15 hover:border-white/40 pb-0.5"
            >
              Voir nos projets
            </Link>
          </div>
        </div>

        {/* ── COLONNE DROITE : compteurs + scroll ── */}
        <div
          className="flex flex-col justify-center gap-0 px-10 lg:px-14 py-20 lg:py-24 lg:w-[340px] shrink-0"
          style={{
            borderLeft: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Compteur 1 */}
          {[
            { value: count240, suffix: '%', label: 'croissance digitale moyenne', color: '#a78bfa' },
            { value: count749, suffix: 'k$', label: 'générés pour nos clients', color: '#f97316' },
            { value: count60, suffix: '+', label: 'clients transformés', color: '#34d399' },
          ].map((stat, i) => (
            <div
              key={i}
              className="py-8 lg:py-10"
              style={{
                borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? 'translateX(0)' : 'translateX(20px)',
                transition: `opacity 0.7s ease ${0.4 + i * 0.15}s, transform 0.7s ease ${0.4 + i * 0.15}s`,
              }}
            >
              <div
                className="font-heading font-black leading-none"
                style={{
                  fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                  color: stat.color,
                }}
              >
                +{stat.value}{stat.suffix}
              </div>
              <p className="text-white/35 text-xs font-medium mt-2 leading-snug max-w-[180px]">
                {stat.label}
              </p>
            </div>
          ))}

          {/* Scroll indicator */}
          <div
            className="flex items-center gap-3 mt-8"
            style={{
              opacity: textVisible ? 0.4 : 0,
              transition: 'opacity 0.7s ease 1s',
            }}
          >
            <div
              style={{
                width: '1px',
                height: '40px',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)',
                animation: 'scroll-pulse 1.8s ease-in-out infinite',
              }}
            />
            <span className="text-white/40 text-[10px] font-medium tracking-[0.3em] uppercase">Scroll</span>
          </div>
        </div>
      </div>

      {/* Keyframes injectés */}
      <style>{`
        @keyframes shimmer-text {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes scroll-pulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.15); }
        }
      `}</style>
    </div>
  );
}

// ─── HERO PROJECT SLIDER (nos derniers projets) ──────────────────────────────
function HeroProjectSlider() {
  const [active, setActive] = useState(0);
  const getLocalizedPath = useLocalizedPath();

  useEffect(() => {
    const t = setInterval(() => {
      setActive((a) => (a + 1) % LATEST_PROJECTS.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const p = LATEST_PROJECTS[active];
  return (
    <div
      className="rounded-3xl flex flex-col flex-1 overflow-hidden min-h-[260px] border border-white/20"
    >
      <p className="text-black/60 text-[10px] font-medium tracking-[0.35em] uppercase px-6 pt-6 pb-2 shrink-0">
        Nos derniers projets
      </p>
      <Link
        href={getLocalizedPath('/projects')}
        className="flex-1 relative block min-h-[180px] overflow-hidden"
      >
        {LATEST_PROJECTS.map((proj, i) => (
          <div
            key={proj.name}
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: i === active ? 1 : 0,
              transitionDuration: '500ms',
            }}
          >
            <img
              src={proj.img}
              alt={proj.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: 'brightness(0.6) saturate(0.9)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="font-heading font-black text-black leading-tight block" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)' }}>
                {proj.name}
              </span>
              <span className="text-black/70 text-xs mt-1 block">{proj.category}</span>
            </div>
          </div>
        ))}
      </Link>
      <div className="flex items-center justify-between px-5 py-4 shrink-0">
        <div className="flex gap-1.5">
          {LATEST_PROJECTS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => { e.preventDefault(); setActive(i); }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? '20px' : '6px',
                height: '6px',
                background: i === active ? p.color : 'rgba(0,0,0,0.25)',
              }}
            />
          ))}
        </div>
        <Link
          href={getLocalizedPath('/projects')}
          className="text-black/70 text-[10px] font-semibold tracking-widest uppercase hover:text-black transition-colors backdrop-blur-md px-3 py-2 rounded-full"
        >
          Voir tous les projets →
        </Link>
      </div>
    </div>
  );
}

// ─── HERO PROJECT SLIDER LARGE (remplace la vidéo) ──────────────────────────
function HeroProjectSliderLarge() {
  const [active, setActive] = useState(0);
  const getLocalizedPath = useLocalizedPath();

  useEffect(() => {
    const t = setInterval(() => {
      setActive((a) => (a + 1) % LATEST_PROJECTS.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const p = LATEST_PROJECTS[active];
  return (
    <div
      className="rounded-3xl flex flex-col overflow-hidden border border-white/20"
      style={{ minHeight: '92vh' }}
    >
      <p className="text-black/60 text-[10px] font-medium tracking-[0.35em] uppercase px-6 pt-6 pb-2 shrink-0">
        Nos derniers projets
      </p>
      <Link
        href={getLocalizedPath('/projects')}
        className="flex-1 relative block min-h-0 overflow-hidden"
      >
        {LATEST_PROJECTS.map((proj, i) => (
          <div
            key={proj.name}
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: i === active ? 1 : 0,
              transitionDuration: '500ms',
            }}
          >
            <img
              src={proj.img}
              alt={proj.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: 'brightness(0.6) saturate(0.9)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
              <span className="font-heading font-black text-black leading-tight block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                {proj.name}
              </span>
              <span className="text-black/70 text-sm lg:text-base mt-2 block">{proj.category}</span>
            </div>
          </div>
        ))}
      </Link>
      <div className="flex items-center justify-between px-6 py-5 shrink-0">
        <div className="flex gap-2">
          {LATEST_PROJECTS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => { e.preventDefault(); setActive(i); }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? '24px' : '8px',
                height: '8px',
                background: i === active ? p.color : 'rgba(0,0,0,0.25)',
              }}
            />
          ))}
        </div>
        <Link
          href={getLocalizedPath('/projects')}
          className="text-black/70 text-xs font-semibold tracking-widest uppercase hover:text-black transition-colors backdrop-blur-md px-4 py-2 rounded-full"
        >
          Voir tous les projets →
        </Link>
      </div>
    </div>
  );
}

// ─── TEAM STACK SECTION ────────────────────────────────────────────────────
const TEAM_MEMBERS = [
  { name: 'Clément Laberge', role: 'Founder & CEO', img: TEAM_IMGS[0], color: '#7c3aed' },
  { name: 'Marie-Ève Tremblay', role: 'Creative Director', img: TEAM_IMGS[1], color: '#f97316' },
  { name: 'Alexandre Côté', role: 'Head of Tech', img: TEAM_IMGS[2], color: '#2563eb' },
  { name: 'Sophie Nguyen', role: 'Strategy Lead', img: TEAM_IMGS[3], color: '#059669' },
];

function TeamStackSection({ compact = false }: { compact?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (i: number) => setActiveIndex(i);
  const prev = () => setActiveIndex((a) => Math.max(0, a - 1));
  const next = () => setActiveIndex((a) => Math.min(TEAM_MEMBERS.length - 1, a + 1));

  const handleWheel = (e: React.WheelEvent) => {
    if (!compact) {
      e.preventDefault();
      if (e.deltaY > 0) next();
      else prev();
    }
  };

  const CARD_W = 220;
  const CARD_H = 300;
  const STACK_OVERFLOW = 36;

  // Mode compact : cartes individuelles (photo centre, nom gauche, titre droite)
  if (compact) {
    return (
      <div
        className="rounded-3xl overflow-hidden h-full min-h-0 flex flex-col bg-black/70 border border-white/10"
      >
        <div className="px-4 py-5 shrink-0">
          <p className="text-white/30 text-[10px] font-medium tracking-[0.35em] uppercase mb-1">The Team</p>
          <h2 className="font-heading font-black text-white leading-tight tracking-tight" style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}>
            People behind the work.
          </h2>
        </div>
        <div className="flex-1 flex flex-col gap-3 px-4 pb-5 overflow-y-auto min-h-0">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-white/15 transition-all duration-200 border border-white/10 shrink-0 group"
              style={{ borderLeft: `3px solid ${member.color}` }}
            >
              {/* Nom — gauche */}
              <span className="font-heading font-bold text-white text-[11px] lg:text-xs leading-tight min-w-0 flex-1 text-left truncate" title={member.name}>
                {member.name}
              </span>
              {/* Photo — centre */}
              <div className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-white/10 group-hover:ring-white/25 transition-all">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0A0A0A]"
                  style={{ background: member.color }}
                />
              </div>
              {/* Titre — droite */}
              <span className="text-white/55 text-[10px] lg:text-[11px] font-medium text-right min-w-0 flex-1 leading-tight truncate" title={member.role}>
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Mode full : stack vertical classique
  return (
    <div
      className="rounded-3xl overflow-hidden h-full min-h-0 flex flex-col"
      style={{ background: DARK }}
      onWheel={handleWheel}
    >
      <div className="flex flex-col items-center gap-7 flex-1 px-8 py-10">
        <div className="text-center shrink-0">
          <p className="text-white/30 text-[10px] font-medium tracking-[0.35em] uppercase mb-2">The Team</p>
          <h2 className="font-heading font-black text-white leading-[0.9] tracking-tight" style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}>
            People behind the work.
          </h2>
        </div>
        <div
          style={{
            perspective: '1200px',
            width: `${CARD_W}px`,
            height: `${CARD_H + STACK_OVERFLOW}px`,
            position: 'relative',
          }}
        >
          {TEAM_MEMBERS.map((member, i) => {
            const offset = i - activeIndex;
            const isActive = i === activeIndex;
            const isBelow = offset > 0;
            const isAbove = offset < 0;
            const translateY = isActive ? '0px' : isBelow ? `${offset * 16}px` : `${offset * 160}px`;
            const translateZ = isActive ? '0px' : isBelow ? `${-offset * 50}px` : '0px';
            const scale = isActive ? 1 : isBelow ? Math.max(0.78, 1 - offset * 0.07) : 0.95;
            const opacity = isAbove ? 0 : isBelow ? Math.max(0.1, 1 - offset * 0.32) : 1;
            const zIndex = isActive ? 50 : isBelow ? 50 - offset : 0;

            return (
              <div
                key={member.name}
                className="absolute rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => isBelow && goTo(i)}
                style={{
                  width: `${CARD_W}px`,
                  height: `${CARD_H}px`,
                  top: 0,
                  left: 0,
                  transform: `translateY(${translateY}) translateZ(${translateZ}) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.45s ease',
                  transformStyle: 'preserve-3d',
                  boxShadow: isActive ? '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)' : '0 12px 30px rgba(0,0,0,0.5)',
                }}
              >
                <img src={member.img} alt={member.name} className="w-full h-full object-cover" style={{ filter: isActive ? 'grayscale(0)' : 'grayscale(0.7) brightness(0.65)' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {isBelow && offset <= 2 && (
                  <div className="absolute top-4 right-4 text-white/25 font-heading font-black text-sm">0{i + 1}</div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col items-center gap-2 text-center shrink-0">
          <div style={{ minHeight: '52px' }}>
            <p className="font-heading font-bold text-white text-xl leading-tight" key={activeIndex} style={{ animation: 'fadeUp 0.4s ease forwards' }}>
              {TEAM_MEMBERS[activeIndex].name}
            </p>
            <p className="text-white/40 text-sm mt-1">{TEAM_MEMBERS[activeIndex].role}</p>
          </div>
          <div className="flex gap-2">
            {TEAM_MEMBERS.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className="h-[2px] rounded-full transition-all duration-300" style={{ width: i === activeIndex ? '28px' : '10px', background: i === activeIndex ? TEAM_MEMBERS[activeIndex].color : 'rgba(255,255,255,0.2)' }} />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prev} disabled={activeIndex === 0} className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all disabled:opacity-20 text-sm">↑</button>
            <button onClick={next} disabled={activeIndex === TEAM_MEMBERS.length - 1} className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all disabled:opacity-20 text-sm">↓</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROJECTS TRIPTYCH (ancien design) ───────────────────────────────────────
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
      <div className="flex gap-4 lg:gap-5 p-4 lg:p-5" style={{ height: '85vh' }}>
        {PROJECTS.map((project, i) => {
          const isActive = i === active;
          return (
            <div
              key={project.num}
              className="relative overflow-hidden cursor-pointer flex-shrink-0 bg-black/30"
              style={{
                width: getWidth(i),
                transition: 'width 0.65s cubic-bezier(0.77, 0, 0.175, 1)',
                borderRadius: '1rem',
              }}
              onClick={() => !isActive && setActive(i)}
            >
              <img
                src={project.img}
                alt={project.name}
                className="absolute inset-0 w-full h-full object-contain"
                style={{
                  filter: isActive ? 'grayscale(0) brightness(0.6)' : 'grayscale(1) brightness(0.35)',
                  transition: 'filter 0.65s ease',
                }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent"
                style={{ opacity: isActive ? 1 : 0.6, transition: 'opacity 0.5s ease' }}
              />

              {isActive && (
                <div className="absolute inset-0 flex flex-col justify-between p-10 lg:p-14 z-10">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white/35 text-xs font-medium tracking-[0.2em] uppercase mb-2">Accrois la performance par l'excellence numérique</p>
                      <span className="font-heading font-black text-white/15 leading-none" style={{ fontSize: '5rem' }}>
                        {project.num}
                      </span>
                    </div>
                    <span className="text-white/40 text-[10px] font-medium tracking-[0.3em] uppercase mt-2">
                      {project.category}
                    </span>
                  </div>
                  <div>
                    <h2
                      className="font-heading font-black text-white leading-[0.88] tracking-tight mb-4"
                      style={{ fontSize: 'clamp(2.5rem, 4.5vw, 5.5rem)' }}
                    >
                      {project.name}
                    </h2>
                    <p className="text-white/55 text-sm lg:text-base leading-relaxed max-w-lg mb-6">
                      {project.tagline}
                    </p>
                    <div className="flex items-center gap-5">
                      <span
                        className="text-xs font-semibold px-4 py-2 rounded-full text-white"
                        style={{ background: project.color }}
                      >
                        {project.result}
                      </span>
                      <Link
                        href={getLocalizedPath('/projects')}
                        className="text-white/50 text-xs font-semibold border-b border-white/25 pb-0.5 hover:text-white hover:border-white transition-all"
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
                    className="text-white/30 font-heading font-black text-xs tracking-widest uppercase"
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                      transform: 'rotate(180deg)',
                    }}
                  >
                    {project.name}
                  </span>
                  <div className="w-[2px] h-8 rounded-full" style={{ background: project.color, opacity: 0.6 }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 py-5">
        {PROJECTS.map((p, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? '28px' : '8px',
              height: '4px',
              background: i === active ? PROJECTS[active].color : 'rgba(0,0,0,0.15)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function HomepageDemo4() {
  const getLocalizedPath = useLocalizedPath();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [menuOpen]);

  return (
    <div className="font-sans relative bg-gradient-to-b from-gray-100/80 via-white to-gray-50/60" style={{ color: DARK }}>

      {/* ─── DÉGRADÉ HAUT DE PAGE (purple, lavender, reddish-brown) ───────────── */}
      <div
        className="absolute top-0 left-0 right-0 h-48 lg:h-64 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(129,140,248,0.18) 0%, rgba(196,181,253,0.1) 30%, rgba(241,245,249,0.04) 60%, transparent 100%), linear-gradient(to right, rgba(109,40,217,0.22) 0%, rgba(167,139,250,0.1) 30%, rgba(226,232,240,0.05) 55%, rgba(180,140,140,0.1) 80%, rgba(127,29,29,0.08) 100%)',
        }}
      />

      {/* ─── HEADER / MENU EN HAUT (logo gauche, nav droite) ─────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-[8%] py-4 lg:py-5 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-black/5">
        <Link href={getLocalizedPath('/')} className="flex items-center gap-2 shrink-0">
          <img
            src="/demo/nukleo-logo-rvb.svg"
            alt="Nukleo Digital"
            className="h-7 lg:h-8 w-auto"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {[
            { label: 'Services', href: '/services' },
            { label: 'Work', href: '/projects' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
          ].map((item) => (
            <Link
              key={item.href}
              href={getLocalizedPath(item.href)}
              className="text-xs font-medium tracking-[0.15em] uppercase hover:opacity-70 transition-opacity"
              style={{ color: `${DARK}80` }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={getLocalizedPath('/contact')}
            className="text-xs font-semibold tracking-[0.15em] uppercase px-4 py-2 rounded-full transition-colors"
            style={{ color: 'white', backgroundColor: DARK }}
          >
            Start a project
          </Link>
        </nav>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity"
          style={{ color: DARK }}
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* ─── MENU CENTRÉ (overlay) ───────────────────────────────────────────── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          {/* Logo + slogan en haut à gauche */}
          <Link
            href={getLocalizedPath('/')}
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 left-6 lg:left-8 flex flex-col gap-1 z-10"
          >
            <img src="/demo/nukleo-logo-rvb.png" alt="Nukleo" className="h-8 lg:h-10 w-auto" style={{ mixBlendMode: 'screen' }} />
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/60">Choisissez l&apos;intelligence</span>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 lg:right-8 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
          <nav className="flex flex-col items-center gap-6 py-12">
            {[
              { label: 'Services', href: '/services' },
              { label: 'Work', href: '/projects' },
              { label: 'About', href: '/about' },
            ].map((item) => (
              <Link
                key={item.href}
                href={getLocalizedPath(item.href)}
                onClick={() => setMenuOpen(false)}
                className="text-white/80 hover:text-white text-sm font-medium tracking-widest uppercase transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={getLocalizedPath('/contact')}
              onClick={() => setMenuOpen(false)}
              className="mt-4 border border-white/50 text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all backdrop-blur-md"
            >
              Start a project
            </Link>
          </nav>
        </div>
      )}

      {/* ─── WRAPPER GLOBAL ─────────────────────────────────────────────────── */}
      <div className="relative z-10 pt-20 lg:pt-24 px-[8%] py-3 lg:py-4 flex flex-col gap-[24px] lg:gap-[33px]">

        {/* ══════════════════════════════════════════════════════════════════════
            HÉRO WOW — SPLIT KINETIC
        ══════════════════════════════════════════════════════════════════════ */}
        <HeroWow />

        {/* ══════════════════════════════════════════════════════════════════════
            MODULE 1 — WIDGETS (projets, météo, date, who we are)
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[65fr_35fr] gap-3 lg:gap-4" style={{ minHeight: '92vh' }}>

          {/* Colonne gauche (65%) — Nos derniers projets */}
          <HeroProjectSliderLarge />

          {/* Colonne droite (35%) — Météo + Date en haut, Who We Are en dessous */}
          <div className="flex flex-col gap-3 lg:gap-4">
            {/* Météo + Date */}
            <div className="flex flex-row gap-3 lg:gap-4 flex-shrink-0">
              <div
                className="rounded-3xl flex flex-col items-center justify-center p-4 lg:p-5 flex-1 min-h-[100px] min-w-0"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(245,243,239,0.95) 100%)',
                  boxShadow: '6px 6px 12px rgba(0,0,0,0.08), -6px -6px 12px rgba(255,255,255,0.8), inset 1px 1px 0 rgba(255,255,255,0.5)',
                }}
              >
                <Sun className="w-8 h-8 mb-2 text-gray-700" strokeWidth={1.5} />
                <span className="font-heading font-black text-4xl lg:text-5xl text-gray-800 leading-none">
                  24<span className="text-xl font-bold align-top ml-0.5">°C</span>
                </span>
                <span className="text-gray-500 text-sm mt-2">Montréal, Québec</span>
              </div>
              <div
                className="rounded-3xl flex flex-col justify-center p-4 lg:p-5 flex-1 min-h-[100px] min-w-0"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(245,243,239,0.95) 100%)',
                  boxShadow: '6px 6px 12px rgba(0,0,0,0.08), -6px -6px 12px rgba(255,255,255,0.8), inset 1px 1px 0 rgba(255,255,255,0.5)',
                }}
              >
                <p className="text-gray-600 text-sm mb-1">Bon lundi <span className="text-purple-500">♥</span></p>
                <span className="font-heading font-black text-4xl lg:text-5xl text-gray-800 leading-none">23</span>
                <span className="text-gray-500 text-sm mt-2">février 2026</span>
              </div>
            </div>

            {/* Who We Are — en dessous */}
            <div className="relative overflow-hidden rounded-3xl group flex-1 min-h-[350px]">
              <img
                src={TEAM_IMAGE}
                alt="Nukleo team"
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-[1.04] group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 bg-black/30">
                <p className="text-white/35 text-[10px] font-medium tracking-[0.35em] uppercase mb-3">Who We Are</p>
                <h2 className="font-heading font-black text-white leading-[0.88] tracking-tight mb-4" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.8rem)' }}>
                  We make digital<br />performance tangible.
                </h2>
                <p className="text-white/55 text-xs lg:text-sm leading-relaxed max-w-md mb-4">
                  A digital performance agency co-creating strategies, technologies, and creative for ambitious organizations — with AI-powered precision.
                </p>
                <Link href={getLocalizedPath('/about')} className="inline-flex items-center gap-2 text-white text-xs font-semibold border-b border-white/35 pb-1 hover:border-white transition-colors">
                  Our story →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            MODULE 2 — CARROUSEL LOGOS (bord à bord)
        ══════════════════════════════════════════════════════════════════════ */}
        <div>
          <DoubleLogoCarousel title="Trusted by ambitious organizations" />
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            MODULE 4 — DÉPARTEMENTS (100%) + ÉQUIPE (100%)
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col gap-[24px] lg:gap-[33px]">
          {/* 100% — 4 départements en ligne */}
          <div className="rounded-3xl overflow-hidden">
            <DepartmentsWidget />
          </div>

          {/* 100% — widget équipe */}
          <div className="rounded-3xl overflow-hidden min-h-[420px]">
            <TeamScrollCards />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            MODULE 5 — CARROUSEL PROJETS PLEIN ÉCRAN
        ══════════════════════════════════════════════════════════════════════ */}
        <ProjectsCarousel />

        {/* ══════════════════════════════════════════════════════════════════════
            MODULE 7 — ROUGE ON BLUE
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10" style={{ background: 'rgba(200,16,46,0.9)', minHeight: '500px' }}>
          <img src={ROB_BG} alt="Rouge on Blue" className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-luminosity" />
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between p-12 lg:p-20 gap-12" style={{ minHeight: '500px' }}>
            <div className="flex-1">
              <p className="text-white/40 text-[10px] font-medium tracking-[0.35em] uppercase mb-10">A Nukleo Group company</p>
              <h2 className="font-heading font-black text-white leading-[0.82] tracking-tight mb-8" style={{ fontSize: 'clamp(3.5rem, 8vw, 10rem)' }}>
                Rouge<br />on Blue.
              </h2>
              <p className="text-white/60 text-base lg:text-lg leading-relaxed max-w-lg mb-10">
                For brands that refuse to blend in. Creative agency for those who believe being exceptional is not a risk — it's a strategy.
              </p>
              <a
                href="https://rougeonblue.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-[#C8102E] font-bold px-8 py-4 rounded-full hover:bg-white/90 transition-all duration-200 text-sm backdrop-blur-md"
              >
                Oser l'Exception ↗
              </a>
            </div>
            <div className="shrink-0 w-36 h-36 lg:w-44 lg:h-44 rounded-full border-2 border-white/20 flex items-center justify-center text-center p-5">
              <div>
                <p className="text-white font-black text-xl leading-tight">Rouge</p>
                <p className="text-white/55 text-sm">on Blue</p>
                <p className="text-white/35 text-[9px] mt-1.5 tracking-widest uppercase">Creative Agency</p>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            MODULE 8 — CTA FINAL
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="rounded-3xl flex flex-col lg:flex-row items-center justify-between px-12 lg:px-20 py-20 gap-10 bg-black/70 border border-white/10">
          <h2 className="font-heading font-black text-white leading-[0.85] tracking-tight" style={{ fontSize: 'clamp(3rem, 6vw, 7.5rem)' }}>
            Ready to<br />
            <span style={{ color: NUKLEO_PURPLE }}>perform?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link href={getLocalizedPath('/contact')} className="inline-flex items-center gap-2 bg-white text-black font-bold px-9 py-4 rounded-full hover:bg-white/90 transition-all duration-200 text-sm backdrop-blur-md">
              Start a project →
            </Link>
            <Link href={getLocalizedPath('/about')} className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-9 py-4 rounded-full hover:border-white/45 transition-all duration-200 text-sm backdrop-blur-md">
              Learn about us
            </Link>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            MODULE 9 — WIDGET CONTACT
        ══════════════════════════════════════════════════════════════════════ */}
        <ContactWidget />

        {/* ══════════════════════════════════════════════════════════════════════
            FOOTER — CLEAN & MINIMAL
        ══════════════════════════════════════════════════════════════════════ */}
        <footer className="py-12 lg:py-16">
          <div className="h-px mb-10" style={{ background: `linear-gradient(90deg, transparent, ${DARK}15, transparent)` }} />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <nav className="flex items-center gap-6 lg:gap-10">
              {[
                { label: 'Services', href: '/services' },
                { label: 'Work', href: '/projects' },
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={getLocalizedPath(item.href)}
                  className="text-xs font-medium tracking-[0.15em] uppercase hover:opacity-70 transition-opacity"
                  style={{ color: `${DARK}70` }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <p className="text-[11px] tracking-wider" style={{ color: `${DARK}35` }}>
              © 2025 · Montréal
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
