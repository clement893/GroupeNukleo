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
    num: '00-1',
    name: 'MBAM',
    category: 'Brand & Digital',
    tagline: 'Redefining cultural engagement online.',
    result: '+240% digital reach · 2024',
    img: WORK1,
    color: '#2563eb',
    word: 'CULTURE',
  },
  {
    num: '00-2',
    name: 'SummitLaw',
    category: 'Brand & Creative',
    tagline: 'A law firm that finally looks like its ambition.',
    result: '+180% qualified leads · 2024',
    img: WORK2,
    color: NUKLEO_PURPLE,
    word: 'BRAND',
  },
  {
    num: '00-3',
    name: 'QueerTech',
    category: 'AI & Platform',
    tagline: 'Technology built for belonging.',
    result: '+220% member engagement · 2023',
    img: WORK3,
    color: '#059669',
    word: 'TECH',
  },
];

// ─── TEAM STACK SECTION ────────────────────────────────────────────────────
const TEAM_MEMBERS = [
  { name: 'Clément Laberge', role: 'Founder & CEO', img: TEAM_IMAGE, color: '#7c3aed' },
  { name: 'Marie-Ève Tremblay', role: 'Creative Director', img: WORK1, color: '#f97316' },
  { name: 'Alexandre Côté', role: 'Head of Tech', img: WORK2, color: '#2563eb' },
  { name: 'Sophie Nguyen', role: 'Strategy Lead', img: WORK3, color: '#059669' },
];

function TeamStackSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (i: number) => setActiveIndex(i);
  const prev = () => setActiveIndex((a) => Math.max(0, a - 1));
  const next = () => setActiveIndex((a) => Math.min(TEAM_MEMBERS.length - 1, a + 1));

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) next();
    else prev();
  };

  const CARD_W = 220;
  const CARD_H = 300;
  const STACK_OVERFLOW = 36;

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{ background: DARK }}
      onWheel={handleWheel}
    >
      {/* Colonne unique centrée */}
      <div className="flex flex-col items-center px-8 py-10 gap-7">

        {/* En-tête */}
        <div className="text-center">
          <p className="text-white/30 text-[10px] font-medium tracking-[0.35em] uppercase mb-3">The Team</p>
          <h2
            className="font-heading font-black text-white leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}
          >
            People behind the work.
          </h2>
        </div>

        {/* Stack de cartes */}
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

            const translateY = isActive
              ? '0px'
              : isBelow
              ? `${offset * 16}px`
              : `${offset * 160}px`;

            const translateZ = isActive
              ? '0px'
              : isBelow
              ? `${-offset * 50}px`
              : '0px';

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
                  boxShadow: isActive
                    ? '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)'
                    : '0 12px 30px rgba(0,0,0,0.5)',
                }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  style={{ filter: isActive ? 'grayscale(0)' : 'grayscale(0.7) brightness(0.65)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {isBelow && offset <= 2 && (
                  <div className="absolute top-4 right-4 text-white/25 font-heading font-black text-sm">
                    0{i + 1}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Infos membre + navigation */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div style={{ minHeight: '52px' }}>
            <p
              className="font-heading font-bold text-white text-xl leading-tight"
              key={activeIndex}
              style={{ animation: 'fadeUp 0.4s ease forwards' }}
            >
              {TEAM_MEMBERS[activeIndex].name}
            </p>
            <p className="text-white/40 text-sm mt-1">{TEAM_MEMBERS[activeIndex].role}</p>
          </div>
          {/* Dots */}
          <div className="flex gap-2">
            {TEAM_MEMBERS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="h-[3px] rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? '28px' : '10px',
                  background: i === activeIndex ? TEAM_MEMBERS[activeIndex].color : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
          {/* Flèches */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              disabled={activeIndex === 0}
              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all disabled:opacity-20 text-sm"
            >
              ↑
            </button>
            <button
              onClick={next}
              disabled={activeIndex === TEAM_MEMBERS.length - 1}
              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all disabled:opacity-20 text-sm"
            >
              ↓
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── PROJECTS TRIPTYCH ─────────────────────────────────────────────────────
function ProjectsCarousel() {
  const [active, setActive] = useState(0);

  // Largeurs : panneau actif = 70%, les 2 autres se partagent 30% (15% chacun)
  const getWidth = (i: number) => {
    if (PROJECTS.length === 1) return '100%';
    const others = PROJECTS.length - 1;
    return i === active ? '70%' : `${30 / others}%`;
  };

  return (
    <div className="rounded-3xl overflow-hidden" style={{ background: DARK }}>

      {/* Triptyque plein cadre */}
      <div
        className="flex"
        style={{ height: '85vh', gap: '3px' }}
      >
        {PROJECTS.map((project, i) => {
          const isActive = i === active;
          return (
            <div
              key={project.num}
              className="relative overflow-hidden cursor-pointer flex-shrink-0"
              style={{
                width: getWidth(i),
                transition: 'width 0.65s cubic-bezier(0.77, 0, 0.175, 1)',
                borderRadius: i === 0 ? '1.5rem 0 0 1.5rem' : i === PROJECTS.length - 1 ? '0 1.5rem 1.5rem 0' : '0',
              }}
              onClick={() => !isActive && setActive(i)}
            >
              {/* Image */}
              <img
                src={project.img}
                alt={project.name}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: isActive ? 'grayscale(0) brightness(0.6)' : 'grayscale(1) brightness(0.35)',
                  transform: isActive ? 'scale(1.02)' : 'scale(1.08)',
                  transition: 'filter 0.65s ease, transform 0.65s ease',
                }}
              />

              {/* Gradient bas — uniquement sur le panneau actif */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent"
                style={{ opacity: isActive ? 1 : 0.6, transition: 'opacity 0.5s ease' }}
              />

              {/* — PANNEAU ACTIF : contenu plein */}
              {isActive && (
                <div className="absolute inset-0 flex flex-col justify-between p-10 lg:p-14 z-10">
                  {/* Haut */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white/30 text-[10px] font-medium tracking-[0.35em] uppercase mb-2">Selected Work</p>
                      <span className="font-heading font-black text-white/15 leading-none" style={{ fontSize: '5rem' }}>
                        {project.num}
                      </span>
                    </div>
                    <span className="text-white/40 text-[10px] font-medium tracking-[0.3em] uppercase mt-2">
                      {project.category}
                    </span>
                  </div>
                  {/* Bas */}
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
                        href="/projects"
                        className="text-white/50 text-xs font-semibold border-b border-white/25 pb-0.5 hover:text-white hover:border-white transition-all"
                      >
                        View case study →
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* — OREILLE : nom vertical + indicateur */}
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

      {/* Dots navigation */}
      <div className="flex items-center justify-center gap-2 py-5">
        {PROJECTS.map((p, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? '28px' : '8px',
              height: '4px',
              background: i === active ? PROJECTS[active].color : 'rgba(255,255,255,0.15)',
            }}
          />
        ))}
      </div>

    </div>
  );
}

export default function HomepageDemo() {
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
            href={getLocalizedPath('/contact')}
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
                  href={getLocalizedPath('/contact')}
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
            MODULE 4 — DÉPARTEMENTS
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="rounded-3xl p-10 lg:p-16" style={{ background: DARK }}>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-white/30 text-[10px] font-medium tracking-[0.35em] uppercase mb-4">Our Departments</p>
              <h2 className="font-heading font-black text-white leading-none tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}>
                Four ways to<br />grow.
              </h2>
            </div>
            <Link href={getLocalizedPath('/services')} className="text-white/40 text-xs font-semibold border-b border-white/20 pb-1 hover:text-white hover:border-white transition-all hidden lg:block">
              All services →
            </Link>
          </div>
          {/* Grille 2×2 — cartes avec image */}
          <div className="grid grid-cols-2 gap-4">
            {DEPTS.map((dept) => (
              <Link
                key={dept.num}
                href={getLocalizedPath(dept.href)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{ aspectRatio: '4 / 3' }}
              >
                {/* Image de fond */}
                <img
                  src={dept.img}
                  alt={dept.name}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                  style={{
                    filter: 'grayscale(0.4) brightness(0.45)',
                    transform: 'scale(1)',
                  }}
                />
                {/* Overlay couleur au hover */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{ background: `linear-gradient(135deg, ${dept.color}55 0%, transparent 60%)` }}
                />
                {/* Gradient bas permanent */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Contenu */}
                <div className="relative z-10 flex flex-col justify-between h-full p-6 lg:p-8">
                  {/* Numéro + explore */}
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-black text-white/20 text-sm">{dept.num}</span>
                    <span
                      className="text-[9px] font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: dept.color }}
                    >
                      Explore →
                    </span>
                  </div>
                  {/* Nom + description */}
                  <div>
                    <div className="w-6 h-[2px] rounded-full mb-3" style={{ background: dept.color }} />
                    <p className="font-heading font-black text-white leading-tight mb-2" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)' }}>
                      {dept.name}
                    </p>
                    <p className="text-white/50 text-xs leading-relaxed">{dept.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            MODULE 5 — CARROUSEL PROJETS PLEIN ÉCRAN
        ══════════════════════════════════════════════════════════════════════ */}
        <ProjectsCarousel />

        {/* ══════════════════════════════════════════════════════════════════════
            MODULE 6 — ÉQUIPE (stack scroll vertical)
        ══════════════════════════════════════════════════════════════════════ */}
        <TeamStackSection />

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
            <Link href={getLocalizedPath('/contact')} className="inline-flex items-center gap-2 bg-white text-black font-bold px-9 py-4 rounded-full hover:bg-white/90 transition-all duration-200 text-sm">
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
          </div>
          <p className="text-[10px]" style={{ color: `${DARK}30` }}>© 2025 Nukleo. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
}
