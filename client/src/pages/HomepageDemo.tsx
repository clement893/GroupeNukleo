import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

// Unsplash image IDs — haute qualité, libres de droits
const HERO_IMAGE = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=2400&q=85&auto=format&fit=crop';
const TEAM_IMAGE = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=85&auto=format&fit=crop';
const WORK_IMAGE_1 = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85&auto=format&fit=crop';
const WORK_IMAGE_2 = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85&auto=format&fit=crop';

export default function HomepageDemo() {
  const getLocalizedPath = useLocalizedPath();
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax subtil sur le hero
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
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
        <div className="flex items-center gap-10 text-white text-sm font-medium tracking-wide">
          <Link href={getLocalizedPath('/services')} className="hover:opacity-60 transition-opacity">Services</Link>
          <Link href={getLocalizedPath('/projects')} className="hover:opacity-60 transition-opacity">Work</Link>
          <Link href={getLocalizedPath('/about')} className="hover:opacity-60 transition-opacity">About</Link>
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
        {/* Image de fond avec parallax */}
        <div
          ref={heroRef}
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        />
        {/* Overlay dégradé bas */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />

        {/* Contenu hero */}
        <div className="relative z-10 px-8 lg:px-16 pb-20 lg:pb-28">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h1
              className="font-heading font-black text-white leading-[0.88] tracking-tight"
              style={{ fontSize: 'clamp(4rem, 12vw, 14rem)' }}
            >
              Perfor-<br />mance.
            </h1>
            <div className="lg:max-w-sm pb-2">
              <p className="text-white/70 text-lg lg:text-xl leading-relaxed mb-8">
                Nukleo is a digital performance agency. We build the strategies, technologies, and creative that drive ambitious organizations forward.
              </p>
              <Link
                href={getLocalizedPath('/start-project')}
                className="inline-flex items-center gap-3 bg-white text-black font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-all duration-200 text-base"
              >
                Start a project
                <span className="text-lg">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Indicateur de scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <div className="w-px h-12 bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* ─── TICKER ───────────────────────────────────────────────────────── */}
      <div className="bg-[#0A0A0A] text-white py-5 overflow-hidden">
        <div className="flex gap-16 whitespace-nowrap animate-[ticker_20s_linear_infinite]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 shrink-0">
              <span className="text-sm font-medium tracking-widest uppercase">Digital Strategy</span>
              <span className="text-white/30">—</span>
              <span className="text-sm font-medium tracking-widest uppercase">AI Development</span>
              <span className="text-white/30">—</span>
              <span className="text-sm font-medium tracking-widest uppercase">Creative Design</span>
              <span className="text-white/30">—</span>
              <span className="text-sm font-medium tracking-widest uppercase">Performance Marketing</span>
              <span className="text-white/30">—</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── WHO WE ARE ───────────────────────────────────────────────────── */}
      <section className="py-32 lg:py-48 px-8 lg:px-16">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">

            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl order-2 lg:order-1">
              <img
                src={TEAM_IMAGE}
                alt="Nukleo team"
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
              {/* Overlay de couleur subtil */}
              <div className="absolute inset-0 bg-[#0A0A0A]/10" />
            </div>

            {/* Texte */}
            <div className="order-1 lg:order-2">
              <p className="text-sm font-medium tracking-widest uppercase text-[#0A0A0A]/40 mb-8">
                Who We Are
              </p>
              <h2
                className="font-heading font-black text-[#0A0A0A] leading-[0.92] tracking-tight mb-12"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 5.5rem)' }}
              >
                We are the architects of your digital ambition.
              </h2>
              <p className="text-[#0A0A0A]/60 text-lg leading-relaxed mb-6">
                We don't just deliver services — we co-create your digital performance. Our team of strategists, engineers, and creatives is committed to your results, powered by an operational DNA of AI and automation.
              </p>
              <p className="text-[#0A0A0A]/60 text-lg leading-relaxed mb-12">
                This allows us to deliver more, faster, and at a fair cost — without ever sacrificing the quality and impact that define market leaders.
              </p>
              <Link
                href={getLocalizedPath('/about')}
                className="inline-flex items-center gap-3 font-semibold text-base border-b-2 border-[#0A0A0A] pb-1 hover:gap-5 transition-all duration-200"
              >
                Our story
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE DO ───────────────────────────────────────────────────── */}
      <section className="py-32 lg:py-48 bg-[#0A0A0A] text-white px-8 lg:px-16">
        <div className="max-w-screen-xl mx-auto">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-24 pb-8 border-b border-white/10">
            <h2
              className="font-heading font-black leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(3rem, 7vw, 8rem)' }}
            >
              Four<br />departments.<br />One goal.
            </h2>
            <p className="text-white/40 text-lg max-w-xs mt-8 lg:mt-0 pb-2">
              Four specialized teams, one single goal: your digital performance.
            </p>
          </div>

          {/* Départements — format éditorial, pas de cartes */}
          <div className="divide-y divide-white/10">
            {[
              {
                number: '01',
                name: 'Nukleo.Consulting',
                tagline: 'Clarity in Complexity.',
                description: 'We guide your organization through its digital transformation. Audit, strategy, AI consulting, and change management — from vision to execution.',
                link: '/services/consulting',
              },
              {
                number: '02',
                name: 'Nukleo.Tech',
                tagline: 'Systems that Serve You.',
                description: 'We build the digital tools that drive your performance. Web development, mobile applications, AI integrations, and custom AI agent development.',
                link: '/services/tech',
              },
              {
                number: '03',
                name: 'Nukleo.Studio',
                tagline: 'Creativity that Converts.',
                description: 'We create visual and creative experiences that make your performance visible and desirable. Branding, UX/UI, art direction, and creative production.',
                link: '/services/studio',
              },
              {
                number: '04',
                name: 'Nukleo.Agency',
                tagline: 'Attention that Matters.',
                description: 'We build your visibility, sharpen your message, and turn attention into growth through SEO, paid media, and AI-powered campaigns.',
                link: '/services/agency',
              },
            ].map((dept) => (
              <Link
                key={dept.number}
                href={getLocalizedPath(dept.link)}
                className="group flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-16 py-10 lg:py-14 hover:pl-4 transition-all duration-300 cursor-pointer"
              >
                <span className="text-white/20 text-sm font-mono tracking-widest shrink-0 w-8">
                  {dept.number}
                </span>
                <h3
                  className="font-heading font-black text-white leading-none tracking-tight group-hover:text-white/70 transition-colors duration-200"
                  style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}
                >
                  {dept.name}
                </h3>
                <div className="lg:ml-auto lg:max-w-md">
                  <p className="text-white/50 font-medium mb-2 text-sm uppercase tracking-widest">{dept.tagline}</p>
                  <p className="text-white/40 text-base leading-relaxed">{dept.description}</p>
                </div>
                <span className="text-white/20 text-2xl group-hover:text-white group-hover:translate-x-2 transition-all duration-200 shrink-0">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUR WORK ─────────────────────────────────────────────────────── */}
      <section className="py-32 lg:py-48 px-8 lg:px-16">
        <div className="max-w-screen-xl mx-auto">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20">
            <div>
              <p className="text-sm font-medium tracking-widest uppercase text-[#0A0A0A]/40 mb-6">Selected Work</p>
              <h2
                className="font-heading font-black text-[#0A0A0A] leading-[0.92] tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 6rem)' }}
              >
                Proof in<br />Performance.
              </h2>
            </div>
            <Link
              href={getLocalizedPath('/projects')}
              className="inline-flex items-center gap-3 font-semibold text-base border-b-2 border-[#0A0A0A] pb-1 hover:gap-5 transition-all duration-200 mt-8 lg:mt-0 self-end"
            >
              View all work
              <span>→</span>
            </Link>
          </div>

          {/* Grille de projets */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Projet 1 */}
            <Link href={getLocalizedPath('/projects')} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-6 bg-[#0A0A0A]/5">
                <img
                  src={WORK_IMAGE_1}
                  alt="Project 1"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[#0A0A0A]/40 text-sm font-medium uppercase tracking-widest mb-2">Strategy & Tech</p>
                  <h3 className="font-heading font-bold text-2xl text-[#0A0A0A] group-hover:text-[#0A0A0A]/60 transition-colors">
                    Digital Transformation
                  </h3>
                  <p className="text-[#0A0A0A]/50 mt-1">+200% organic growth in 6 months</p>
                </div>
                <span className="text-[#0A0A0A]/20 text-2xl group-hover:text-[#0A0A0A] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200 mt-1">
                  ↗
                </span>
              </div>
            </Link>

            {/* Projet 2 */}
            <Link href={getLocalizedPath('/projects')} className="group block lg:mt-16">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-6 bg-[#0A0A0A]/5">
                <img
                  src={WORK_IMAGE_2}
                  alt="Project 2"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[#0A0A0A]/40 text-sm font-medium uppercase tracking-widest mb-2">Marketing & Studio</p>
                  <h3 className="font-heading font-bold text-2xl text-[#0A0A0A] group-hover:text-[#0A0A0A]/60 transition-colors">
                    Brand Relaunch
                  </h3>
                  <p className="text-[#0A0A0A]/50 mt-1">-50% cost per acquisition</p>
                </div>
                <span className="text-[#0A0A0A]/20 text-2xl group-hover:text-[#0A0A0A] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200 mt-1">
                  ↗
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-b border-[#0A0A0A]/10 px-8 lg:px-16">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {[
            { value: '15+', label: 'Years of combined expertise' },
            { value: '200+', label: 'Projects delivered' },
            { value: '4', label: 'Specialized departments' },
            { value: '98%', label: 'Client retention rate' },
          ].map((stat) => (
            <div key={stat.value} className="text-center lg:text-left">
              <p
                className="font-heading font-black text-[#0A0A0A] leading-none tracking-tight mb-3"
                style={{ fontSize: 'clamp(3rem, 5vw, 5rem)' }}
              >
                {stat.value}
              </p>
              <p className="text-[#0A0A0A]/50 text-sm leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="py-40 lg:py-56 px-8 lg:px-16 bg-[#0A0A0A] text-white text-center">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-white/40 text-sm font-medium tracking-widest uppercase mb-10">
            Ready to take the lead?
          </p>
          <h2
            className="font-heading font-black leading-[0.88] tracking-tight mb-16 mx-auto"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 11rem)', maxWidth: '14ch' }}
          >
            Let's build your performance.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href={getLocalizedPath('/start-project')}
              className="inline-flex items-center gap-3 bg-white text-black font-semibold px-10 py-5 rounded-full hover:bg-white/90 transition-all duration-200 text-base"
            >
              Start a project
              <span className="text-lg">→</span>
            </Link>
            <a
              href="mailto:hello@nukleo.com"
              className="inline-flex items-center gap-3 border border-white/30 text-white font-semibold px-10 py-5 rounded-full hover:border-white/70 transition-all duration-200 text-base"
            >
              hello@nukleo.com
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER MINIMAL ───────────────────────────────────────────────── */}
      <footer className="bg-[#0A0A0A] border-t border-white/10 px-8 lg:px-16 py-10">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-white font-bold text-lg tracking-tight">nukleo.</span>
          <p className="text-white/30 text-sm">© 2025 Nukleo. All rights reserved.</p>
          <div className="flex items-center gap-6 text-white/30 text-sm">
            <Link href={getLocalizedPath('/privacy-policy')} className="hover:text-white/60 transition-colors">Privacy</Link>
            <Link href={getLocalizedPath('/terms-of-service')} className="hover:text-white/60 transition-colors">Terms</Link>
          </div>
        </div>
      </footer>

      {/* Animation ticker CSS */}
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
