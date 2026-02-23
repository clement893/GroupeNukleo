import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

// Images locales — servies depuis /public/demo/
const HERO_IMAGE = '/demo/hero.jpg';
const TEAM_IMAGE = '/demo/team.jpg';
const WORK_IMAGE_1 = '/demo/work1.jpg';
const WORK_IMAGE_2 = '/demo/work2.jpg';

// Couleur Nukleo — violet/bleu brand
const NUKLEO_PURPLE = '#7c3aed';
const NUKLEO_PURPLE_LIGHT = '#ede9fe';

export default function HomepageDemo() {
  const getLocalizedPath = useLocalizedPath();
  const heroRef = useRef<HTMLDivElement>(null);

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
    <div className="bg-[#F5F3EF] text-[#0A0A0A] overflow-x-hidden">

      {/* ─── NAV ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-6 mix-blend-difference">
        <Link href={getLocalizedPath('/')} className="text-white font-bold text-xl tracking-tight">
          nukleo.
        </Link>
        <div className="flex items-center gap-10 text-white text-sm font-medium">
          <Link href={getLocalizedPath('/services')} className="hover:opacity-50 transition-opacity">Services</Link>
          <Link href={getLocalizedPath('/projects')} className="hover:opacity-50 transition-opacity">Work</Link>
          <Link href={getLocalizedPath('/about')} className="hover:opacity-50 transition-opacity">About</Link>
          <Link
            href={getLocalizedPath('/start-project')}
            className="border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-200"
          >
            Start a project
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[700px] flex flex-col justify-end overflow-hidden">
        <div
          ref={heroRef}
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/30 to-transparent" />

        <div className="relative z-10 px-8 lg:px-16 pb-20 lg:pb-28">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">

            {/* Titre principal */}
            <div>
              {/* Label discret */}
              <p className="text-white/40 text-xs font-medium tracking-widest uppercase mb-6">
                Digital Performance Agency
              </p>
              <h1
                className="font-heading font-black text-white leading-[0.88] tracking-tight"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 12rem)' }}
              >
                Digital<br />
                <span style={{ color: NUKLEO_PURPLE }}>Perfor-</span><br />
                mance.
              </h1>
            </div>

            {/* Accroche + CTA */}
            <div className="lg:max-w-xs pb-2">
              <p className="text-white/85 text-xs font-semibold uppercase tracking-widest mb-3">
                For ambitious organizations — any size.
              </p>
              <p className="text-white/50 text-base lg:text-lg leading-relaxed mb-8">
                We build the strategies, technologies, and creative that drive you forward — powered by AI, delivered by humans.
              </p>
              <Link
                href={getLocalizedPath('/start-project')}
                className="inline-flex items-center gap-3 bg-white text-black font-semibold px-7 py-4 rounded-full hover:bg-white/90 transition-all duration-200 text-sm"
              >
                Start a project →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TICKER ───────────────────────────────────────────────────────── */}
      <div className="bg-[#0A0A0A] text-white py-4 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-[ticker_25s_linear_infinite]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 shrink-0">
              <span className="text-xs font-medium tracking-widest uppercase text-white/50">Digital Strategy</span>
              <span className="text-white/20">·</span>
              <span className="text-xs font-medium tracking-widest uppercase text-white/50">AI Development</span>
              <span className="text-white/20">·</span>
              <span className="text-xs font-medium tracking-widest uppercase text-white/50">Creative Design</span>
              <span className="text-white/20">·</span>
              <span className="text-xs font-medium tracking-widest uppercase text-white/50">Performance Marketing</span>
              <span className="text-white/20">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── WHO WE ARE ───────────────────────────────────────────────────── */}
      <section className="py-32 lg:py-44 px-8 lg:px-16">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">

            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl order-2 lg:order-1">
              <img
                src={TEAM_IMAGE}
                alt="Nukleo team"
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
            </div>

            {/* Texte */}
            <div className="order-1 lg:order-2">
              <p className="text-xs font-medium tracking-widest uppercase text-[#0A0A0A]/40 mb-8">
                Who We Are
              </p>
              <h2
                className="font-heading font-black text-[#0A0A0A] leading-[0.92] tracking-tight mb-10"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 5rem)' }}
              >
                We make digital performance tangible.
              </h2>
              <p className="text-[#0A0A0A]/55 text-base lg:text-lg leading-relaxed mb-5">
                Nukleo is a digital performance agency. We co-create the strategies, technologies, and creative that help ambitious organizations grow — with clarity, precision, and measurable results.
              </p>
              <p className="text-[#0A0A0A]/55 text-base lg:text-lg leading-relaxed mb-12">
                Our approach combines human expertise with AI-powered execution, so you get more impact, faster, and at a cost that reflects real value.
              </p>
              <Link
                href={getLocalizedPath('/about')}
                className="inline-flex items-center gap-3 font-semibold text-sm border-b-2 border-[#0A0A0A] pb-1 hover:gap-5 transition-all duration-200"
              >
                Our story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE DO ───────────────────────────────────────────────────── */}
      <section className="py-32 lg:py-44 bg-[#0A0A0A] text-white px-8 lg:px-16">
        <div className="max-w-screen-xl mx-auto">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 pb-8 border-b border-white/10">
            <h2
              className="font-heading font-black leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 7rem)' }}
            >
              Four departments.<br />
              <span style={{ color: NUKLEO_PURPLE }}>One goal.</span>
            </h2>
            <p className="text-white/35 text-base max-w-xs mt-8 lg:mt-0 pb-2">
              Four specialized teams, built around a single mission: your digital performance.
            </p>
          </div>

          {/* Départements — liste éditoriale */}
          <div className="divide-y divide-white/10">
            {[
              {
                number: '01',
                name: 'Nukleo.Consulting',
                tagline: 'Strategy & Transformation',
                description: 'Digital audits, AI strategy, and change management — from vision to execution.',
                link: '/services/consulting',
              },
              {
                number: '02',
                name: 'Nukleo.Tech',
                tagline: 'Development & AI',
                description: 'Web, mobile, AI integrations, and custom agent development.',
                link: '/services/tech',
              },
              {
                number: '03',
                name: 'Nukleo.Studio',
                tagline: 'Design & Creation',
                description: 'Branding, UX/UI, art direction, and creative production.',
                link: '/services/studio',
              },
              {
                number: '04',
                name: 'Nukleo.Agency',
                tagline: 'Marketing & Communication',
                description: 'SEO, paid media, and AI-powered campaigns that build lasting visibility.',
                link: '/services/agency',
              },
            ].map((dept) => (
              <Link
                key={dept.number}
                href={getLocalizedPath(dept.link)}
                className="group flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-12 py-9 lg:py-12 hover:pl-3 transition-all duration-300 cursor-pointer"
              >
                <span className="text-white/20 text-xs font-mono tracking-widest shrink-0 w-6">
                  {dept.number}
                </span>
                <h3
                  className="font-heading font-black text-white leading-none tracking-tight group-hover:text-white/60 transition-colors duration-200"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 4rem)' }}
                >
                  {dept.name}
                </h3>
                <div className="lg:ml-auto lg:max-w-sm">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">{dept.tagline}</p>
                  <p className="text-white/35 text-sm leading-relaxed">{dept.description}</p>
                </div>
                <span className="text-white/20 text-xl group-hover:text-white group-hover:translate-x-2 transition-all duration-200 shrink-0">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUR WORK ─────────────────────────────────────────────────────── */}
      <section className="py-32 lg:py-44 px-8 lg:px-16">
        <div className="max-w-screen-xl mx-auto">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-[#0A0A0A]/40 mb-5">Selected Work</p>
              <h2
                className="font-heading font-black text-[#0A0A0A] leading-[0.92] tracking-tight"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 5.5rem)' }}
              >
                Results that speak.
              </h2>
            </div>
            <Link
              href={getLocalizedPath('/projects')}
              className="inline-flex items-center gap-3 font-semibold text-sm border-b-2 border-[#0A0A0A] pb-1 hover:gap-5 transition-all duration-200 mt-8 lg:mt-0 self-end"
            >
              View all work →
            </Link>
          </div>

          {/* Grille 3 projets */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { img: '/demo/project-1.jpg', category: 'Studio & Agency', title: 'Brand Relaunch', result: '−50% cost per acquisition', client: 'Mid-size retailer' },
              { img: '/demo/project-2.jpg', category: 'Tech & Consulting', title: 'Digital Transformation', result: '+200% organic growth in 6 months', client: 'Professional services firm' },
              { img: '/demo/project-3.jpg', category: 'Agency & Studio', title: 'Market Entry Campaign', result: '3× pipeline in 90 days', client: 'B2B SaaS startup' },
            ].map((project, i) => (
              <Link key={i} href={getLocalizedPath('/projects')} className="group block">
                <div className="aspect-[4/3] overflow-hidden rounded-xl mb-5 bg-[#0A0A0A]/5">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[#0A0A0A]/35 text-xs font-medium uppercase tracking-widest mb-2">{project.category}</p>
                    <h3 className="font-heading font-bold text-lg text-[#0A0A0A] group-hover:text-[#0A0A0A]/50 transition-colors mb-1">{project.title}</h3>
                    <p className="text-[#0A0A0A]/40 text-sm">{project.result}</p>
                    <p className="text-[#0A0A0A]/25 text-xs mt-1">{project.client}</p>
                  </div>
                  <span className="text-[#0A0A0A]/20 text-xl group-hover:text-[#0A0A0A] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200 mt-1 shrink-0">↗</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE TEAM ────────────────────────────────────────────────────── */}
      <section className="py-32 lg:py-44 px-8 lg:px-16 bg-[#F0EDE8]">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-[#0A0A0A]/40 mb-5">The Team</p>
              <h2
                className="font-heading font-black text-[#0A0A0A] leading-[0.92] tracking-tight"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 5.5rem)' }}
              >
                People who deliver.
              </h2>
            </div>
            <p className="text-[#0A0A0A]/40 text-base max-w-xs mt-8 lg:mt-0 pb-2">
              Strategists, engineers, designers, and marketers — united by one standard: excellence.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
            {[
              { img: '/demo/team-1.jpg', name: 'Sarah M.', role: 'Strategy & Consulting' },
              { img: '/demo/team-2.jpg', name: 'Marc D.', role: 'Tech & AI' },
              { img: '/demo/team-3.jpg', name: 'Julie L.', role: 'Creative & Studio' },
              { img: '/demo/team-4.jpg', name: 'Alex P.', role: 'Agency & Marketing' },
            ].map((member) => (
              <div key={member.name} className="group">
                <div className="aspect-[3/4] overflow-hidden rounded-xl mb-4 bg-[#0A0A0A]/5">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
                <p className="font-heading font-bold text-[#0A0A0A] text-base mb-0.5">{member.name}</p>
                <p className="text-[#0A0A0A]/40 text-xs font-medium uppercase tracking-widest">{member.role}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 pt-10 border-t border-[#0A0A0A]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-[#0A0A0A]/40 text-sm">A growing team of 15+ specialists across Montréal and beyond.</p>
            <Link href={getLocalizedPath('/about')} className="inline-flex items-center gap-2 font-semibold text-sm border-b-2 border-[#0A0A0A] pb-1 hover:gap-4 transition-all duration-200">
              Meet the full team →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────────────────── */ */}
      <section className="py-20 border-t border-b border-[#0A0A0A]/8 px-8 lg:px-16">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {[
            { value: '15+', label: 'Years of combined expertise' },
            { value: '200+', label: 'Projects delivered' },
            { value: '4', label: 'Specialized departments' },
            { value: '98%', label: 'Client retention rate' },
          ].map((stat) => (
            <div key={stat.value} className="text-center lg:text-left">
              <p
                className="font-heading font-black text-[#0A0A0A] leading-none tracking-tight mb-2"
                style={{ fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', color: NUKLEO_PURPLE }}
              >
                {stat.value}
              </p>
              <p className="text-[#0A0A0A]/45 text-sm leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ROUGE ON BLUE ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#C8102E] text-white">

        {/* Image de fond plein écran */}
        <div className="absolute inset-0">
          <img
            src="/demo/rob-bg.jpg"
            alt="Rouge on Blue"
            className="w-full h-full object-cover object-center opacity-20 mix-blend-luminosity"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#C8102E]/60 via-[#C8102E]/80 to-[#C8102E]" />
        </div>

        <div className="relative z-10 px-8 lg:px-16 pt-32 lg:pt-44 pb-32 lg:pb-44">
          <div className="max-w-screen-xl mx-auto">

            {/* Label */}
            <p className="text-white/40 text-xs font-medium tracking-widest uppercase mb-10">
              A sister agency
            </p>

            {/* Titre massif */}
            <h2
              className="font-heading font-black leading-[0.88] tracking-tight mb-14"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 11rem)' }}
            >
              Rouge<br />on Blue.
            </h2>

            {/* Layout deux colonnes */}
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-end">

              {/* Manifeste */}
              <div>
                <p className="text-white/70 text-lg lg:text-xl leading-relaxed mb-4">
                  For brands that refuse to blend in.
                </p>
                <p className="text-white/45 text-base leading-relaxed mb-12">
                  Creative direction, brand identity, and storytelling — built for organizations that understand that being exceptional is not a risk, it's a strategy.
                </p>
                <a
                  href="https://rougeonblue.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-[#C8102E] font-bold px-8 py-4 rounded-full hover:bg-white/90 transition-all duration-200 text-sm group"
                >
                  Oser l'Exception
                  <span className="group-hover:translate-x-1 transition-transform duration-200">↗</span>
                </a>
              </div>

              {/* Image éditoriale */}
              <div className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden rounded-2xl">
                <img
                  src="/demo/rob-creative.jpg"
                  alt="Rouge on Blue creative work"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                {/* Overlay rouge subtil */}
                <div className="absolute inset-0 bg-[#C8102E]/10" />
              </div>
            </div>

            {/* Tagline bas de page */}
            <div className="mt-20 pt-10 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-white/30 text-sm tracking-wide">
                rougeonblue.com
              </p>
              <p className="text-white/20 text-xs font-medium uppercase tracking-widest">
                Creative & Branding Agency — Montréal
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="py-40 lg:py-52 px-8 lg:px-16 bg-[#0A0A0A] text-white text-center">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-white/30 text-xs font-medium tracking-widest uppercase mb-10">
            Ready to take the lead?
          </p>
          <h2
            className="font-heading font-black leading-[0.88] tracking-tight mb-14 mx-auto"
            style={{ fontSize: 'clamp(3rem, 8vw, 10rem)', maxWidth: '16ch' }}
          >
            Let's build your digital performance.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href={getLocalizedPath('/start-project')}
              className="inline-flex items-center gap-3 font-semibold px-9 py-4 rounded-full transition-all duration-200 text-sm text-black"
              style={{ backgroundColor: 'white' }}
            >
              Start a project →
            </Link>
            <a
              href="mailto:hello@nukleo.com"
              className="inline-flex items-center gap-3 border border-white/25 text-white/70 font-semibold px-9 py-4 rounded-full hover:border-white/60 hover:text-white transition-all duration-200 text-sm"
            >
              hello@nukleo.com
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER MINIMAL ───────────────────────────────────────────────── */}
      <footer className="bg-[#0A0A0A] border-t border-white/8 px-8 lg:px-16 py-8">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-white font-bold text-lg tracking-tight">nukleo.</span>
          <p className="text-white/25 text-xs">© 2025 Nukleo. All rights reserved.</p>
          <div className="flex items-center gap-6 text-white/25 text-xs">
            <Link href={getLocalizedPath('/privacy-policy')} className="hover:text-white/50 transition-colors">Privacy</Link>
            <Link href={getLocalizedPath('/terms-of-service')} className="hover:text-white/50 transition-colors">Terms</Link>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
