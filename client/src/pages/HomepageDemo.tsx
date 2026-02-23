import { useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/hooks/useLanguage';

// ─── Constantes visuelles ────────────────────────────────────────────────────
const NUKLEO_PURPLE = '#7c3aed';
const CREAM = '#F5F3EF';
const DARK = '#0A0A0A';

// Images locales
const HERO_VIDEO = '/demo/hero-reel.mp4';
const HERO_IMAGE = '/demo/hero.jpg';
const TEAM_IMAGE = '/demo/team.jpg';
const WORK1 = '/demo/work1.jpg';
const WORK2 = '/demo/work2.jpg';
const WORK3 = '/demo/work3.jpg';
const ROB_BG = '/demo/rob-bg.jpg';

// Logos rangée 1
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

// Logos rangée 2
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

// Départements
const DEPTS = [
  {
    num: '01',
    name: 'Nukleo.Agency',
    desc: 'The right people find you — and choose you.',
    color: '#f97316',
    href: '/services/agency',
  },
  {
    num: '02',
    name: 'Nukleo.Studio',
    desc: 'Your brand becomes impossible to ignore.',
    color: NUKLEO_PURPLE,
    href: '/services/studio',
  },
  {
    num: '03',
    name: 'Nukleo.Tech',
    desc: 'Your systems work for you, not the other way around.',
    color: '#2563eb',
    href: '/services/tech',
  },
  {
    num: '04',
    name: 'Nukleo.Consulting',
    desc: 'You move with clarity, not hesitation.',
    color: '#059669',
    href: '/services/consulting',
  },
];

export default function HomepageDemo() {
  const { getLocalizedPath } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax léger sur le hero
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white font-sans" style={{ color: DARK }}>

      {/* ─── NAVIGATION ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-10 py-5 mix-blend-difference">
        <Link href={getLocalizedPath('/')} className="font-heading font-black text-white text-xl tracking-tight">
          Nukleo.
        </Link>
        <div className="flex items-center gap-6">
          <Link href={getLocalizedPath('/services')} className="text-white/70 text-xs font-medium tracking-widest uppercase hover:text-white transition-colors hidden lg:block">
            Services
          </Link>
          <Link href={getLocalizedPath('/projects')} className="text-white/70 text-xs font-medium tracking-widest uppercase hover:text-white transition-colors hidden lg:block">
            Work
          </Link>
          <Link
            href={getLocalizedPath('/start-project')}
            className="border border-white text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-200"
          >
            Start a project
          </Link>
        </div>
      </nav>

      {/* ─── MODULE 1 : HERO VIDÉO ──────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[700px] overflow-hidden bg-black">
        <div ref={heroRef} className="absolute inset-0 will-change-transform">
          <video
            autoPlay muted loop playsInline
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.5) saturate(0.85)' }}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
            <img src={HERO_IMAGE} alt="Nukleo projects" className="w-full h-full object-cover" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

        {/* Contenu hero */}
        <div className="relative z-10 h-full flex flex-col justify-between px-6 lg:px-12 pt-28 pb-10 lg:pb-14">

          {/* Label haut */}
          <div className="flex items-center justify-between">
            <span className="text-white/40 text-[10px] font-medium tracking-[0.3em] uppercase">
              Digital Performance Agency · Montréal
            </span>
            <span className="text-white/40 text-[10px] font-medium tracking-[0.3em] uppercase hidden lg:block">
              Est. 2018
            </span>
          </div>

          {/* Titre principal */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h1
              className="font-heading font-black text-white leading-[0.85] tracking-tight"
              style={{ fontSize: 'clamp(3.8rem, 11vw, 13rem)' }}
            >
              Digital<br />
              <span style={{ color: NUKLEO_PURPLE }}>Perfor-</span><br />
              mance.
            </h1>

            {/* Panneau glassmorphisme */}
            <div className="lg:max-w-[320px] backdrop-blur-md bg-white/8 border border-white/12 rounded-2xl px-6 py-6 shrink-0">
              <p className="text-white/60 text-[10px] font-semibold uppercase tracking-[0.25em] mb-3">
                For ambitious organizations — any size.
              </p>
              <p className="text-white/75 text-sm lg:text-base leading-relaxed mb-6">
                We co-create the strategies, technologies, and creative that drive you forward — powered by AI.
              </p>
              <Link
                href={getLocalizedPath('/start-project')}
                className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-all duration-200 text-sm"
              >
                Start a project →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MODULE 2 : CARROUSEL LOGOS ─────────────────────────────────────── */}
      <div className="py-10 overflow-hidden border-b border-black/6" style={{ background: CREAM }}>
        <p className="text-center text-[10px] font-medium tracking-[0.3em] uppercase mb-7" style={{ color: `${DARK}33` }}>
          Trusted by ambitious organizations
        </p>
        {/* Rangée 1 → gauche */}
        <div className="overflow-hidden mb-4">
          <div className="flex gap-10 whitespace-nowrap animate-[ticker_40s_linear_infinite]">
            {[...Array(3)].map((_, rep) => (
              <div key={rep} className="flex items-center gap-10 shrink-0">
                {LOGOS_ROW1.map((logo) => (
                  <div key={logo.alt} className="flex items-center justify-center w-24 h-9 shrink-0">
                    <img src={logo.src} alt={logo.alt} className="max-h-7 max-w-[84px] w-auto object-contain opacity-45 hover:opacity-75 transition-opacity duration-200 grayscale" loading="lazy" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Rangée 2 → droite */}
        <div className="overflow-hidden">
          <div className="flex gap-10 whitespace-nowrap animate-[ticker-reverse_45s_linear_infinite]">
            {[...Array(3)].map((_, rep) => (
              <div key={rep} className="flex items-center gap-10 shrink-0">
                {LOGOS_ROW2.map((logo) => (
                  <div key={logo.alt} className="flex items-center justify-center w-24 h-9 shrink-0">
                    <img src={logo.src} alt={logo.alt} className="max-h-7 max-w-[84px] w-auto object-contain opacity-45 hover:opacity-75 transition-opacity duration-200 grayscale" loading="lazy" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── MODULE 3 : GRILLE MODULAIRE PRINCIPALE ─────────────────────────── */}
      {/* 
        Grille asymétrique inspirée de deuxhuithuit.com :
        - Colonne gauche large : module "Who We Are" + module Dept
        - Colonne droite étroite : modules empilés (stat, projet, CTA)
      */}
      <section className="px-4 lg:px-6 py-6 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 max-w-[1600px] mx-auto">

          {/* MODULE A — Who We Are (col 1-7, 2 rangées) */}
          <div
            className="lg:col-span-7 lg:row-span-2 relative overflow-hidden rounded-2xl group"
            style={{ minHeight: '580px' }}
          >
            <img
              src={TEAM_IMAGE}
              alt="Nukleo team"
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
              <p className="text-white/40 text-[10px] font-medium tracking-[0.3em] uppercase mb-4">Who We Are</p>
              <h2
                className="font-heading font-black text-white leading-[0.9] tracking-tight mb-5"
                style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
              >
                We make digital<br />performance tangible.
              </h2>
              <p className="text-white/60 text-sm leading-relaxed max-w-md mb-6">
                A digital performance agency co-creating strategies, technologies, and creative for ambitious organizations — with AI-powered precision.
              </p>
              <Link
                href={getLocalizedPath('/about')}
                className="inline-flex items-center gap-2 text-white text-xs font-semibold border-b border-white/40 pb-0.5 hover:border-white transition-colors"
              >
                Our story →
              </Link>
            </div>
          </div>

          {/* MODULE B — Stat 1 (col 8-10) */}
          <div
            className="lg:col-span-3 rounded-2xl flex flex-col justify-between p-7"
            style={{ background: NUKLEO_PURPLE, minHeight: '180px' }}
          >
            <p className="text-white/50 text-[10px] font-medium tracking-[0.3em] uppercase">Organizations served</p>
            <div>
              <p className="font-heading font-black text-white leading-none" style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}>150+</p>
              <p className="text-white/60 text-xs mt-1">across Canada & beyond</p>
            </div>
          </div>

          {/* MODULE C — Stat 2 (col 11-12) */}
          <div
            className="lg:col-span-2 rounded-2xl flex flex-col justify-between p-7"
            style={{ background: CREAM, minHeight: '180px' }}
          >
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: `${DARK}55` }}>Years</p>
            <div>
              <p className="font-heading font-black leading-none" style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)', color: DARK }}>7+</p>
              <p className="text-xs mt-1" style={{ color: `${DARK}55` }}>of digital excellence</p>
            </div>
          </div>

          {/* MODULE D — Projet featured (col 8-12) */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-2xl group cursor-pointer" style={{ minHeight: '380px' }}>
            <img
              src={WORK1}
              alt="Featured project"
              className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute top-5 left-5">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-white/60 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/15">
                Strategy & Tech
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="font-heading font-bold text-white text-xl leading-tight mb-2">MBAM — Digital Transformation</p>
              <p className="text-white/55 text-xs">+340% digital engagement · 2024</p>
            </div>
            <div className="absolute bottom-5 right-5 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-black transition-all duration-200">
              <span className="text-white text-xs group-hover:text-black">↗</span>
            </div>
          </div>

        </div>
      </section>

      {/* ─── MODULE 4 : DÉPARTEMENTS EN GRILLE ──────────────────────────────── */}
      <section className="px-4 lg:px-6 pb-6 bg-white">
        <div className="max-w-[1600px] mx-auto">

          {/* Titre de section */}
          <div className="flex items-end justify-between mb-4 px-1">
            <h2
              className="font-heading font-black leading-none tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)', color: DARK }}
            >
              Our Departments
            </h2>
            <Link
              href={getLocalizedPath('/services')}
              className="text-xs font-semibold border-b-2 pb-0.5 hover:gap-3 transition-all hidden lg:flex items-center gap-2"
              style={{ borderColor: DARK, color: DARK }}
            >
              All services →
            </Link>
          </div>

          {/* Grille 2×2 des départements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEPTS.map((dept) => (
              <Link
                key={dept.num}
                href={getLocalizedPath(dept.href)}
                className="group relative rounded-2xl overflow-hidden flex flex-col justify-between p-7 cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                style={{ background: DARK, minHeight: '240px' }}
              >
                {/* Numéro typographique en fond */}
                <span
                  className="absolute top-3 right-4 font-heading font-black leading-none select-none pointer-events-none"
                  style={{ fontSize: '6rem', color: 'rgba(255,255,255,0.04)' }}
                >
                  {dept.num}
                </span>

                {/* Accent couleur */}
                <div className="w-8 h-1 rounded-full mb-auto" style={{ background: dept.color }} />

                <div>
                  <p className="font-heading font-bold text-white text-lg leading-tight mb-2">{dept.name}</p>
                  <p className="text-white/45 text-sm leading-relaxed mb-5">{dept.desc}</p>
                  <span
                    className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase transition-colors"
                    style={{ color: dept.color }}
                  >
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MODULE 5 : PROJETS SÉLECTIONNÉS ────────────────────────────────── */}
      <section className="px-4 lg:px-6 pb-6 bg-white">
        <div className="max-w-[1600px] mx-auto">

          <div className="flex items-end justify-between mb-4 px-1">
            <h2
              className="font-heading font-black leading-none tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)', color: DARK }}
            >
              Selected Work
            </h2>
            <Link
              href={getLocalizedPath('/projects')}
              className="text-xs font-semibold border-b-2 pb-0.5 hidden lg:flex items-center gap-2"
              style={{ borderColor: DARK, color: DARK }}
            >
              All projects →
            </Link>
          </div>

          {/* Grille asymétrique : 1 grand + 2 petits */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

            {/* Grand projet */}
            <div className="lg:col-span-7 relative overflow-hidden rounded-2xl group cursor-pointer" style={{ minHeight: '460px' }}>
              <img src={WORK2} alt="Project" className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <div className="absolute top-5 left-5">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-white/60 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/15">
                  Brand & Creative
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="font-heading font-bold text-white text-2xl leading-tight mb-2">SummitLaw — Brand Relaunch</p>
                <p className="text-white/55 text-sm">+180% qualified leads · 2024</p>
              </div>
              <div className="absolute bottom-7 right-7 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white transition-all duration-200">
                <span className="text-white text-sm group-hover:text-black">↗</span>
              </div>
            </div>

            {/* 2 petits projets empilés */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-2xl group cursor-pointer flex-1" style={{ minHeight: '218px' }}>
                <img src={WORK3} alt="Project" className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-white/60 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/15">
                    AI & Tech
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-heading font-bold text-white text-base leading-tight mb-1">QueerTech — Platform</p>
                  <p className="text-white/50 text-xs">+220% member engagement</p>
                </div>
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white transition-all duration-200">
                  <span className="text-white text-xs group-hover:text-black">↗</span>
                </div>
              </div>

              {/* Module CTA "Start a project" */}
              <div
                className="rounded-2xl flex flex-col justify-between p-7 flex-1"
                style={{ background: CREAM, minHeight: '218px' }}
              >
                <p className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: `${DARK}40` }}>
                  Ready to grow?
                </p>
                <div>
                  <p
                    className="font-heading font-black leading-tight mb-5"
                    style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', color: DARK }}
                  >
                    Let's build your digital performance.
                  </p>
                  <Link
                    href={getLocalizedPath('/start-project')}
                    className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-full text-white transition-all duration-200 hover:opacity-90"
                    style={{ background: DARK }}
                  >
                    Start a project →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MODULE 6 : ÉQUIPE ───────────────────────────────────────────────── */}
      <section className="px-4 lg:px-6 pb-6 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-4 px-1">
            <h2
              className="font-heading font-black leading-none tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)', color: DARK }}
            >
              The Team
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Clément Laberge', role: 'Founder & CEO', img: TEAM_IMAGE },
              { name: 'Marie-Ève Tremblay', role: 'Creative Director', img: WORK1 },
              { name: 'Alexandre Côté', role: 'Head of Tech', img: WORK2 },
              { name: 'Sophie Nguyen', role: 'Strategy Lead', img: WORK3 },
            ].map((member) => (
              <div key={member.name} className="group relative overflow-hidden rounded-2xl" style={{ minHeight: '320px' }}>
                <img
                  src={member.img}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-heading font-bold text-white text-base leading-tight">{member.name}</p>
                  <p className="text-white/50 text-xs mt-0.5">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MODULE 7 : ROUGE ON BLUE ────────────────────────────────────────── */}
      <section className="px-4 lg:px-6 pb-6 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{ background: '#C8102E', minHeight: '400px' }}
          >
            {/* Image de fond */}
            <img
              src={ROB_BG}
              alt="Rouge on Blue"
              className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity"
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between h-full p-10 lg:p-14 gap-10" style={{ minHeight: '400px' }}>
              <div className="flex-1">
                <p className="text-white/50 text-[10px] font-medium tracking-[0.3em] uppercase mb-6">
                  A Nukleo Group company
                </p>
                <h2
                  className="font-heading font-black text-white leading-[0.85] tracking-tight mb-6"
                  style={{ fontSize: 'clamp(3rem, 7vw, 8rem)' }}
                >
                  Rouge<br />on Blue.
                </h2>
                <p className="text-white/65 text-base lg:text-lg leading-relaxed max-w-md mb-8">
                  For brands that refuse to blend in. Creative agency for those who believe being exceptional is not a risk — it's a strategy.
                </p>
                <a
                  href="https://rougeonblue.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-[#C8102E] font-bold px-7 py-4 rounded-full hover:bg-white/90 transition-all duration-200 text-sm"
                >
                  Oser l'Exception ↗
                </a>
              </div>

              {/* Badge */}
              <div className="shrink-0 w-32 h-32 lg:w-40 lg:h-40 rounded-full border-2 border-white/25 flex items-center justify-center text-center p-4">
                <div>
                  <p className="text-white font-black text-lg leading-tight">Rouge</p>
                  <p className="text-white/60 text-xs">on Blue</p>
                  <p className="text-white/40 text-[9px] mt-1 tracking-widest uppercase">Creative</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MODULE 8 : CTA FINAL ────────────────────────────────────────────── */}
      <section className="px-4 lg:px-6 pb-6 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div
            className="rounded-2xl flex flex-col lg:flex-row items-center justify-between px-10 lg:px-16 py-16 gap-8"
            style={{ background: DARK }}
          >
            <h2
              className="font-heading font-black text-white leading-[0.88] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 6rem)' }}
            >
              Ready to<br />
              <span style={{ color: NUKLEO_PURPLE }}>perform?</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link
                href={getLocalizedPath('/start-project')}
                className="inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-white/90 transition-all duration-200 text-sm"
              >
                Start a project →
              </Link>
              <Link
                href={getLocalizedPath('/about')}
                className="inline-flex items-center gap-2 border border-white/25 text-white font-semibold px-8 py-4 rounded-full hover:border-white/50 transition-all duration-200 text-sm"
              >
                Learn about us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER MINIMAL ──────────────────────────────────────────────────── */}
      <footer className="px-4 lg:px-6 pb-6 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div
            className="rounded-2xl flex flex-col lg:flex-row items-center justify-between px-8 py-6 gap-4"
            style={{ background: CREAM }}
          >
            <span className="font-heading font-black text-lg" style={{ color: DARK }}>Nukleo.</span>
            <div className="flex items-center gap-6">
              {[
                { label: 'Services', href: '/services' },
                { label: 'Work', href: '/projects' },
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={getLocalizedPath(item.href)}
                  className="text-xs font-medium hover:opacity-100 transition-opacity"
                  style={{ color: `${DARK}60` }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <p className="text-[10px]" style={{ color: `${DARK}35` }}>© 2025 Nukleo. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
