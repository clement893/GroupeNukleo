import { useRef, useEffect, useState } from 'react';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const NUKLEO_PURPLE = '#7c3aed';
const CREAM = '#F5F3EF';
const DARK = '#0A0A0A';

const HERO_VIDEO = '/demo/hero-reel.mp4';
const HERO_IMAGE = '/demo/hero.jpg';
const TEAM_IMAGE = '/demo/team.jpg';
const WORK1 = '/demo/work1.jpg';
const WORK2 = '/demo/work2.jpg';
const WORK3 = '/demo/work3.jpg';
const ROB_BG = '/demo/rob-bg.jpg';

const LOGOS_ROW1 = [
  { src: '/demo/logos/MBAM.png', alt: 'MBAM' },
  { src: '/demo/logos/SummitLaw.png', alt: 'Summit Law' },
  { src: '/demo/logos/Queertech.png', alt: 'QueerTech' },
  { src: '/demo/logos/OSM.png', alt: 'OSM' },
  { src: '/demo/logos/FJL.png', alt: 'FJL' },
  { src: '/demo/logos/AMQ.png', alt: 'AMQ' },
  { src: '/demo/logos/CINARS.png', alt: 'CINARS' },
  { src: '/demo/logos/Novisto.png', alt: 'Novisto' },
  { src: '/demo/logos/Amerispa.png', alt: 'Amerispa' },
  { src: '/demo/logos/RoyalLePage.svg', alt: 'Royal LePage' },
  { src: '/demo/logos/CQDE.png', alt: 'CQDE' },
  { src: '/demo/logos/Zu.png', alt: 'Zu' },
  { src: '/demo/logos/Securiglobe.png', alt: 'Securiglobe' },
  { src: '/demo/logos/EMH.png', alt: 'EMH' },
];

const LOGOS_ROW2 = [
  { src: '/demo/logos/Educart.png', alt: 'Educart' },
  { src: '/demo/logos/CECS.png', alt: 'CECS' },
  { src: '/demo/logos/EHR.png', alt: 'EHR' },
  { src: '/demo/logos/Diverso.png', alt: 'Diverso' },
  { src: '/demo/logos/MP.png', alt: 'MP' },
  { src: '/demo/logos/TNS.png', alt: 'TNS' },
  { src: '/demo/logos/PsyEtc.png', alt: 'Psy etc.' },
  { src: '/demo/logos/LF.png', alt: 'LF' },
  { src: '/demo/logos/Medicom.svg', alt: 'Medicom' },
  { src: '/demo/logos/Ecoverdure.png', alt: 'Écoverdure' },
  { src: '/demo/logos/Techsplo.png', alt: 'Techsplo' },
  { src: '/demo/logos/GoCoupons.png', alt: 'GoCoupons' },
  { src: '/demo/logos/AdeleBlais.webp', alt: 'Adèle Blais' },
  { src: '/demo/logos/Zenya.png', alt: 'Zenya' },
];

const DEPTS = [
  { num: '01', name: 'Nukleo.Agency', desc: 'The right people find you — and choose you.', color: '#f97316', href: '/services/agency', img: '/demo/dept-agency.jpg' },
  { num: '02', name: 'Nukleo.Studio', desc: 'Your brand becomes impossible to ignore.', color: NUKLEO_PURPLE, href: '/services/studio', img: '/demo/dept-studio.jpg' },
  { num: '03', name: 'Nukleo.Tech', desc: 'Your systems work for you, not the other way around.', color: '#2563eb', href: '/services/tech', img: '/demo/dept-tech.jpg' },
  { num: '04', name: 'Nukleo.Consulting', desc: 'You move with clarity, not hesitation.', color: '#059669', href: '/services/consulting', img: '/demo/dept-consulting.jpg' },
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

// ─── TEAM STACK SECTION ────────────────────────────────────────────────────
const TEAM_MEMBERS = [
  { name: 'Clément Laberge', role: 'Founder & CEO', img: TEAM_IMAGE, color: '#7c3aed' },
  { name: 'Marie-Ève Tremblay', role: 'Creative Director', img: WORK1, color: '#f97316' },
  { name: 'Alexandre Côté', role: 'Head of Tech', img: WORK2, color: '#2563eb' },
  { name: 'Sophie Nguyen', role: 'Strategy Lead', img: WORK3, color: '#059669' },
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
        className="rounded-3xl overflow-hidden h-full min-h-0 flex flex-col"
        style={{ background: DARK }}
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
              className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-200 border border-white/[0.06] shrink-0 group"
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

// ─── SELECTED WORK — billboards + vertical stack (inspiration design urbain) ─
function ProjectsCarousel() {
  const [active, setActive] = useState(0);
  const getLocalizedPath = useLocalizedPath();

  return (
    <div className="rounded-3xl overflow-hidden" style={{ background: DARK }}>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0" style={{ minHeight: '75vh' }}>
        {/* Partie gauche — 3 billboards côte à côte */}
        <div className="flex-1 flex gap-[6px] p-4 lg:p-6 min-h-[60vh] lg:min-h-[75vh] overflow-x-auto">
          {PROJECTS.map((project, i) => {
            const isActive = i === active;
            return (
              <button
                key={project.num}
                type="button"
                onClick={() => setActive(i)}
                className="flex-1 relative overflow-hidden rounded-lg flex-shrink-0 group cursor-pointer border-2 transition-all duration-300 min-w-[140px] lg:min-w-0"
                style={{
                  borderColor: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                }}
              >
                {/* Cadre type billboard — bordure sombre */}
                <div className="absolute inset-0 rounded-[6px] border border-[#2a2a2a]/80 z-20 pointer-events-none" />
                {/* Image */}
                <img
                  src={project.img}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                  style={{
                    filter: isActive ? 'grayscale(0) brightness(0.75)' : 'grayscale(0.9) brightness(0.5)',
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                  }}
                />
                {/* Gradient bas — overlay type affichage urbain */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-90"
                  style={{ opacity: isActive ? 1 : 0.85 }}
                />
                {/* Overlay texte en bas — style panneau lumineux */}
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5 flex flex-col items-start text-left">
                  <h3
                    className="font-heading font-black text-white leading-tight mb-1"
                    style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.25rem)' }}
                  >
                    {project.name}
                  </h3>
                  <p className="text-white/70 text-[10px] lg:text-xs font-medium tracking-wider uppercase mb-2">
                    {project.category}
                  </p>
                  <p className="text-white/80 text-[11px] lg:text-xs">{project.date} — {project.result.split(' · ')[0]}</p>
                </div>
                {/* Panneau actif — léger accent */}
                {isActive && (
                  <div
                    className="absolute top-3 right-3 w-1 h-8 rounded-full"
                    style={{ background: project.color }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Partie droite — pile de cartes verticales (grayscale, indicateurs 01/02/03) */}
        <div className="lg:w-44 xl:w-52 shrink-0 flex flex-col items-center justify-center py-6 lg:py-8 lg:border-l border-white/10 relative">
          <div className="relative h-[180px] lg:h-[220px] w-28 lg:w-32">
            {PROJECTS.map((project, i) => {
              const isActive = i === active;
              const stackOffset = (i - active) * 18;
              return (
                <button
                  key={project.num}
                  type="button"
                  onClick={() => setActive(i)}
                  className="absolute left-1/2 -translate-x-1/2 w-full h-[100px] lg:h-[120px] rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
                  style={{
                    top: `50%`,
                    transform: `translate(-50%, calc(-50% + ${stackOffset}px))`,
                    zIndex: isActive ? 10 : 5 - Math.abs(i - active),
                    boxShadow: isActive ? '0 12px 40px rgba(0,0,0,0.5)' : '0 4px 16px rgba(0,0,0,0.4)',
                  }}
                >
                <img
                  src={project.img}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    filter: isActive ? 'grayscale(0.3) brightness(0.7)' : 'grayscale(1) brightness(0.4)',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Indicateur numérique type 01, 02, 03 */}
                <div
                  className="absolute bottom-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center font-heading font-black text-white text-sm"
                  style={{ background: isActive ? project.color : 'rgba(124, 58, 237, 0.7)' }}
                >
                  {project.num}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lien case study — sous les billboards */}
      <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
        <p className="text-white/40 text-[10px] font-medium tracking-[0.35em] uppercase">Selected Work</p>
        <Link
          href={getLocalizedPath('/projects')}
          className="text-white/60 text-xs font-semibold border-b border-white/25 pb-0.5 hover:text-white hover:border-white transition-all"
        >
          View case study →
        </Link>
      </div>
    </div>
  );
}

export default function HomepageDemo4() {
  const getLocalizedPath = useLocalizedPath();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85;
    }
  }, []);

  return (
    <div className="bg-white font-sans" style={{ color: DARK }}>

      {/* ─── NAVIGATION ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-12 py-6 mix-blend-difference">
        <Link href={getLocalizedPath('/')} className="font-heading font-black text-white text-xl tracking-tight">
          Nukleo.
        </Link>
        <div className="flex items-center gap-8">
          <Link href={getLocalizedPath('/services')} className="text-white/60 text-[11px] font-medium tracking-widest uppercase hover:text-white transition-colors hidden lg:block">Services</Link>
          <Link href={getLocalizedPath('/projects')} className="text-white/60 text-[11px] font-medium tracking-widest uppercase hover:text-white transition-colors hidden lg:block">Work</Link>
          <Link href={getLocalizedPath('/about')} className="text-white/60 text-[11px] font-medium tracking-widest uppercase hover:text-white transition-colors hidden lg:block">About</Link>
          <Link
            href={getLocalizedPath('/start-project')}
            className="border border-white/60 text-white text-[11px] font-semibold px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            Start a project
          </Link>
        </div>
      </nav>

      {/* ─── WRAPPER GLOBAL ─────────────────────────────────────────────────── */}
      <div className="p-3 lg:p-4 flex flex-col gap-3 lg:gap-4">

        {/* ══════════════════════════════════════════════════════════════════════
            MODULE 1 — HERO EN 3 MODULES DISTINCTS
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4" style={{ minHeight: '92vh' }}>

          {/* Module 1A — Vidéo + Titre principal (grand) */}
          <div className="lg:col-span-8 relative overflow-hidden rounded-3xl bg-black" style={{ minHeight: '92vh' }}>
            <video
              ref={videoRef}
              autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.45) saturate(0.8)' }}
            >
              <source src={HERO_VIDEO} type="video/mp4" />
              <img src={HERO_IMAGE} alt="Nukleo projects" className="w-full h-full object-cover" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

            <div className="relative z-10 h-full flex flex-col justify-between px-10 lg:px-14 pt-32 pb-12" style={{ minHeight: '92vh' }}>
              {/* Label haut */}
              <div className="flex items-center justify-between">
                <span className="text-white/30 text-[10px] font-medium tracking-[0.35em] uppercase">
                  Digital Performance Agency · Montréal
                </span>
                <span className="text-white/30 text-[10px] font-medium tracking-[0.35em] uppercase hidden lg:block">
                  Est. 2018
                </span>
              </div>

              {/* Titre massif */}
              <div>
                <h1
                  className="font-heading font-black text-white leading-[0.82] tracking-tight"
                  style={{ fontSize: 'clamp(4.5rem, 11vw, 13rem)' }}
                >
                  Digital<br />
                  <span style={{ color: NUKLEO_PURPLE }}>Perfor-</span><br />
                  mance.
                </h1>
                <p className="text-white/40 text-sm lg:text-base mt-6 max-w-md leading-relaxed">
                  For ambitious organizations — any size.
                </p>
              </div>
            </div>
          </div>

          {/* Colonne droite — 2 modules empilés */}
          <div className="lg:col-span-4 flex flex-col gap-3 lg:gap-4">

            {/* Module 1B — CTA + description */}
            <div
              className="rounded-3xl flex flex-col justify-between p-10 lg:p-12 flex-1"
              style={{ background: DARK, minHeight: '300px' }}
            >
              <div>
                <p className="text-white/30 text-[10px] font-medium tracking-[0.35em] uppercase mb-6">
                  Who we are
                </p>
                <p className="text-white/75 text-base lg:text-lg leading-relaxed">
                  We co-create strategies, technologies, and creative that drive ambitious organizations forward — powered by AI.
                </p>
              </div>
              <div className="flex flex-col gap-3 mt-8">
                <Link
                  href={getLocalizedPath('/start-project')}
                  className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold px-7 py-4 rounded-full hover:bg-white/90 transition-all duration-200 text-sm"
                >
                  Start a project →
                </Link>
                <Link
                  href={getLocalizedPath('/about')}
                  className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/60 font-semibold px-7 py-4 rounded-full hover:border-white/35 hover:text-white transition-all duration-200 text-sm"
                >
                  Learn about us
                </Link>
              </div>
            </div>

            {/* Module 1C — Stat phare */}
            <div
              className="rounded-3xl flex flex-col justify-between p-10 lg:p-12 flex-1"
              style={{ background: NUKLEO_PURPLE, minHeight: '260px' }}
            >
              <p className="text-white/40 text-[10px] font-medium tracking-[0.35em] uppercase">
                Organizations served
              </p>
              <div>
                <p
                  className="font-heading font-black text-white leading-none"
                  style={{ fontSize: 'clamp(5rem, 7vw, 9rem)' }}
                >
                  150+
                </p>
                <p className="text-white/50 text-sm mt-3">across Canada & beyond</p>
              </div>
            </div>

          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            MODULE 2 — CARROUSEL LOGOS
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="rounded-3xl overflow-hidden py-14" style={{ background: CREAM }}>
          <p className="text-center text-[10px] font-medium tracking-[0.35em] uppercase mb-10" style={{ color: `${DARK}30` }}>
            Trusted by ambitious organizations
          </p>
          <div className="overflow-hidden mb-5">
            <div className="flex gap-12 whitespace-nowrap animate-[ticker_40s_linear_infinite]">
              {[...Array(3)].map((_, rep) => (
                <div key={rep} className="flex items-center gap-12 shrink-0">
                  {LOGOS_ROW1.map((logo) => (
                    <div key={logo.alt} className="flex items-center justify-center w-28 h-10 shrink-0">
                      <img src={logo.src} alt={logo.alt} className="max-h-8 max-w-[96px] w-auto object-contain opacity-35 hover:opacity-65 transition-opacity duration-300 grayscale" loading="lazy" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex gap-12 whitespace-nowrap animate-[ticker-reverse_45s_linear_infinite]">
              {[...Array(3)].map((_, rep) => (
                <div key={rep} className="flex items-center gap-12 shrink-0">
                  {LOGOS_ROW2.map((logo) => (
                    <div key={logo.alt} className="flex items-center justify-center w-28 h-10 shrink-0">
                      <img src={logo.src} alt={logo.alt} className="max-h-8 max-w-[96px] w-auto object-contain opacity-35 hover:opacity-65 transition-opacity duration-300 grayscale" loading="lazy" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            MODULE 3 — WHO WE ARE + STATS
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">

          <div className="lg:col-span-8 relative overflow-hidden rounded-3xl group" style={{ minHeight: '580px' }}>
            <img
              src={TEAM_IMAGE}
              alt="Nukleo team"
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-[1.04] group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-10 lg:p-14">
              <p className="text-white/35 text-[10px] font-medium tracking-[0.35em] uppercase mb-5">Who We Are</p>
              <h2 className="font-heading font-black text-white leading-[0.88] tracking-tight mb-6" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 5rem)' }}>
                We make digital<br />performance tangible.
              </h2>
              <p className="text-white/55 text-[15px] leading-relaxed max-w-lg mb-8">
                A digital performance agency co-creating strategies, technologies, and creative for ambitious organizations — with AI-powered precision.
              </p>
              <Link href={getLocalizedPath('/about')} className="inline-flex items-center gap-2 text-white text-xs font-semibold border-b border-white/35 pb-1 hover:border-white transition-colors">
                Our story →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 lg:gap-4">
            <div className="rounded-3xl flex flex-col justify-between p-10 flex-1" style={{ background: CREAM, minHeight: '270px' }}>
              <p className="text-[10px] font-medium tracking-[0.35em] uppercase" style={{ color: `${DARK}40` }}>Years of excellence</p>
              <div>
                <p className="font-heading font-black leading-none" style={{ fontSize: 'clamp(4rem, 6vw, 7rem)', color: DARK }}>7+</p>
                <p className="text-sm mt-2" style={{ color: `${DARK}50` }}>of digital performance</p>
              </div>
            </div>
            <div className="rounded-3xl flex flex-col justify-between p-10 flex-1" style={{ background: DARK, minHeight: '270px' }}>
              <p className="text-white/30 text-[10px] font-medium tracking-[0.35em] uppercase">Projects delivered</p>
              <div>
                <p className="font-heading font-black text-white leading-none" style={{ fontSize: 'clamp(4rem, 6vw, 7rem)' }}>300+</p>
                <p className="text-white/40 text-sm mt-2">across all departments</p>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            MODULE 4 — DÉPARTEMENTS (2/3) + ÉQUIPE (1/3)
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4" style={{ minHeight: '520px' }}>
          {/* 2/3 gauche — 4 services en blocs compacts */}
          <div className="lg:col-span-2 rounded-3xl p-6 lg:p-8 flex flex-col" style={{ background: DARK }}>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-white/30 text-[10px] font-medium tracking-[0.35em] uppercase mb-2">Our Departments</p>
                <h2 className="font-heading font-black text-white leading-none tracking-tight" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                  Four ways to grow.
                </h2>
              </div>
              <Link href={getLocalizedPath('/services')} className="text-white/40 text-[10px] font-semibold border-b border-white/20 pb-0.5 hover:text-white hover:border-white transition-all hidden lg:block">
                All →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 flex-1">
              {DEPTS.map((dept) => (
                <Link
                  key={dept.num}
                  href={getLocalizedPath(dept.href)}
                  className="group relative rounded-xl overflow-hidden cursor-pointer flex flex-col p-4 min-h-[100px] bg-white/[0.03] transition-colors duration-200 hover:bg-white/[0.07]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-heading font-black text-white/25 text-xs">{dept.num}</span>
                    <span className="text-[8px] font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: dept.color }}>
                      →
                    </span>
                  </div>
                  <div className="w-4 h-[1px] rounded-full mb-2" style={{ background: dept.color }} />
                  <p className="font-heading font-bold text-white text-sm leading-tight mb-1">{dept.name}</p>
                  <p className="text-white/45 text-[11px] leading-snug line-clamp-2">{dept.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* 1/3 droite — widget équipe (cartes employés) */}
          <div className="rounded-3xl overflow-hidden min-h-[400px] lg:min-h-0">
            <TeamStackSection compact />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            MODULE 5 — CARROUSEL PROJETS PLEIN ÉCRAN
        ══════════════════════════════════════════════════════════════════════ */}
        <ProjectsCarousel />

        {/* ══════════════════════════════════════════════════════════════════════
            MODULE 7 — ROUGE ON BLUE
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="relative overflow-hidden rounded-3xl" style={{ background: '#C8102E', minHeight: '500px' }}>
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
                className="inline-flex items-center gap-3 bg-white text-[#C8102E] font-bold px-8 py-4 rounded-full hover:bg-white/90 transition-all duration-200 text-sm"
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
        <div className="rounded-3xl flex flex-col lg:flex-row items-center justify-between px-12 lg:px-20 py-20 gap-10" style={{ background: DARK }}>
          <h2 className="font-heading font-black text-white leading-[0.85] tracking-tight" style={{ fontSize: 'clamp(3rem, 6vw, 7.5rem)' }}>
            Ready to<br />
            <span style={{ color: NUKLEO_PURPLE }}>perform?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link href={getLocalizedPath('/start-project')} className="inline-flex items-center gap-2 bg-white text-black font-bold px-9 py-4 rounded-full hover:bg-white/90 transition-all duration-200 text-sm">
              Start a project →
            </Link>
            <Link href={getLocalizedPath('/about')} className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-9 py-4 rounded-full hover:border-white/45 transition-all duration-200 text-sm">
              Learn about us
            </Link>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            FOOTER MINIMAL
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="rounded-3xl flex flex-col lg:flex-row items-center justify-between px-10 py-7 gap-5" style={{ background: CREAM }}>
          <span className="font-heading font-black text-xl" style={{ color: DARK }}>Nukleo.</span>
          <div className="flex items-center gap-8">
            {[
              { label: 'Services', href: '/services' },
              { label: 'Work', href: '/projects' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map((item) => (
              <Link key={item.label} href={getLocalizedPath(item.href)} className="text-xs font-medium hover:opacity-80 transition-opacity" style={{ color: `${DARK}55` }}>
                {item.label}
              </Link>
            ))}
            <span className="text-xs" style={{ color: `${DARK}40` }}>|</span>
            <Link href={getLocalizedPath('/demo')} className="text-xs font-medium hover:opacity-80 transition-opacity" style={{ color: `${DARK}55` }}>Démo 1</Link>
            <Link href={getLocalizedPath('/demo2')} className="text-xs font-medium hover:opacity-80 transition-opacity" style={{ color: `${DARK}55` }}>Démo 2</Link>
            <Link href={getLocalizedPath('/demo3')} className="text-xs font-medium hover:opacity-80 transition-opacity" style={{ color: `${DARK}55` }}>Démo 3</Link>
            <Link href={getLocalizedPath('/demo4')} className="text-xs font-semibold hover:opacity-80 transition-opacity" style={{ color: DARK }}>Démo 4</Link>
          </div>
          <p className="text-[10px]" style={{ color: `${DARK}30` }}>© 2025 Nukleo. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
}
