import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';

// ─── TOKENS ────────────────────────────────────────────────────────────────
const PURPLE = '#7c3aed';
const CREAM  = '#F5F2EC';
const DARK   = '#0A0A0A';
const ORANGE = '#f97316';
const BLUE   = '#2563eb';
const GREEN  = '#059669';
const RED    = '#C8102E';

// ─── ASSETS ────────────────────────────────────────────────────────────────
const HERO_IMAGE    = '/demo/hero.jpg';
const NUKLEO_LOGO   = '/demo/nukleo-logo.png';
const WORK1         = '/demo/work1.jpg';
const WORK2         = '/demo/work2.jpg';
const WORK3         = '/demo/work3.jpg';
const TEAM_IMAGE    = '/demo/team.jpg';
const ROB_BG        = '/demo/rob-bg.jpg';

const DEPT_IMGS = {
  agency:     '/demo/dept-agency.jpg',
  studio:     '/demo/dept-studio.jpg',
  tech:       '/demo/dept-tech.jpg',
  consulting: '/demo/dept-consulting.jpg',
};

const LOGOS = [
  '/demo/logos/MBAM.png', '/demo/logos/SummitLaw.png', '/demo/logos/Queertech.png',
  '/demo/logos/OSM.png',  '/demo/logos/FJL.png',       '/demo/logos/AMQ.png',
  '/demo/logos/CINARS.png','/demo/logos/Novisto.png',  '/demo/logos/Amerispa.png',
  '/demo/logos/RoyalLePage.svg','/demo/logos/CQDE.png','/demo/logos/Zu.png',
  '/demo/logos/Educart.png','/demo/logos/CECS.png',    '/demo/logos/EHR.png',
  '/demo/logos/Diverso.png','/demo/logos/MP.png',      '/demo/logos/TNS.png',
];

// ─── MARQUEE ───────────────────────────────────────────────────────────────
function Marquee({ items, speed = 40, reverse = false }: { items: string[]; speed?: number; reverse?: boolean }) {
  return (
    <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
      <div
        className="flex gap-10 items-center"
        style={{
          animation: `marquee${reverse ? 'Rev' : ''} ${speed}s linear infinite`,
          width: 'max-content',
        }}
      >
        {[...items, ...items].map((src, i) => (
          <img key={i} src={src} alt="" className="h-7 w-auto opacity-30 grayscale object-contain" />
        ))}
      </div>
      <style>{`
        @keyframes marquee    { from { transform: translateX(0) }    to { transform: translateX(-50%) } }
        @keyframes marqueeRev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
      `}</style>
    </div>
  );
}

// ─── TILE ──────────────────────────────────────────────────────────────────
// Tuile de base — fond, padding, arrondi
function Tile({ children, bg = CREAM, className = '', style = {} }: {
  children: React.ReactNode; bg?: string; className?: string; style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-3xl overflow-hidden ${className}`}
      style={{ background: bg, ...style }}
    >
      {children}
    </div>
  );
}

// ─── TEAM STACK ────────────────────────────────────────────────────────────
const TEAM = [
  { name: 'Clément Laberge',    role: 'Founder & CEO',      img: TEAM_IMAGE, color: PURPLE },
  { name: 'Marie-Ève Tremblay', role: 'Creative Director',  img: WORK1,      color: ORANGE },
  { name: 'Alexandre Côté',     role: 'Head of Tech',       img: WORK2,      color: BLUE   },
  { name: 'Sophie Nguyen',      role: 'Strategy Lead',      img: WORK3,      color: GREEN  },
];

function TeamStack() {
  const [active, setActive] = useState(0);
  const CARD_W = 180;
  const CARD_H = 240;
  const OFFSET = 22;
  const DEPTH  = 50;

  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % TEAM.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between h-full p-8 gap-6">
      {/* Label */}
      <p style={{ color: DARK, opacity: 0.3, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600 }}>
        The Team
      </p>

      {/* Stack */}
      <div style={{ position: 'relative', width: CARD_W, height: CARD_H + OFFSET * (TEAM.length - 1) }}>
        {TEAM.map((m, i) => {
          const pos = (i - active + TEAM.length) % TEAM.length;
          return (
            <div
              key={m.name}
              onClick={() => setActive(i)}
              style={{
                position: 'absolute',
                top: pos * OFFSET,
                left: pos * 6,
                width: CARD_W,
                height: CARD_H,
                borderRadius: 16,
                overflow: 'hidden',
                cursor: 'pointer',
                zIndex: TEAM.length - pos,
                transform: `translateZ(${-pos * DEPTH}px) scale(${1 - pos * 0.04})`,
                transition: 'all 0.55s cubic-bezier(0.4,0,0.2,1)',
                boxShadow: pos === 0 ? '0 16px 40px rgba(0,0,0,0.18)' : '0 4px 12px rgba(0,0,0,0.08)',
              }}
            >
              <img src={m.img} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: pos === 0 ? 'none' : 'grayscale(0.5) brightness(0.7)' }} />
              {pos === 0 && (
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)' }}>
                  <div style={{ position: 'absolute', bottom: 14, left: 14 }}>
                    <div style={{ width: 20, height: 2, borderRadius: 2, background: m.color, marginBottom: 6 }} />
                    <p style={{ color: '#fff', fontWeight: 800, fontSize: 13, lineHeight: 1.2 }}>{m.name}</p>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10, marginTop: 2 }}>{m.role}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', gap: 6 }}>
        {TEAM.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: i === active ? 20 : 6,
              height: 4,
              borderRadius: 2,
              background: i === active ? TEAM[active].color : 'rgba(0,0,0,0.15)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── PROJECTS TRIPTYCH ─────────────────────────────────────────────────────
const PROJECTS = [
  { num: '01', name: 'MBAM',       cat: 'Brand & Digital',  tagline: 'Redefining cultural engagement online.',       result: '+240% reach',          img: WORK1, color: BLUE   },
  { num: '02', name: 'SummitLaw',  cat: 'Brand & Creative', tagline: 'A law firm that finally looks like its ambition.', result: '+180% leads',       img: WORK2, color: PURPLE },
  { num: '03', name: 'QueerTech',  cat: 'AI & Platform',    tagline: 'Technology built for belonging.',              result: '+220% engagement',     img: WORK3, color: GREEN  },
];

function Triptych() {
  const [active, setActive] = useState(0);
  const getW = (i: number) => i === active ? '68%' : '16%';

  return (
    <div style={{ display: 'flex', height: '82vh', gap: 3, borderRadius: 24, overflow: 'hidden' }}>
      {PROJECTS.map((p, i) => {
        const isActive = i === active;
        return (
          <div
            key={p.num}
            onClick={() => setActive(i)}
            style={{
              position: 'relative',
              width: getW(i),
              transition: 'width 0.6s cubic-bezier(0.77,0,0.175,1)',
              cursor: isActive ? 'default' : 'pointer',
              flexShrink: 0,
              borderRadius: i === 0 ? '24px 0 0 24px' : i === 2 ? '0 24px 24px 0' : 0,
              overflow: 'hidden',
            }}
          >
            <img
              src={p.img}
              alt={p.name}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                filter: isActive ? 'brightness(0.55)' : 'grayscale(1) brightness(0.3)',
                transform: isActive ? 'scale(1.02)' : 'scale(1.07)',
                transition: 'filter 0.6s, transform 0.6s',
              }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)', opacity: isActive ? 1 : 0.5, transition: 'opacity 0.5s' }} />

            {isActive && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '3rem 3.5rem', zIndex: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 600 }}>Selected Work</span>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase' }}>{p.cat}</span>
                </div>
                <div>
                  <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(2.8rem,5vw,6rem)', lineHeight: 0.88, letterSpacing: '-0.02em', marginBottom: '1rem' }}>{p.name}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.6, maxWidth: 480, marginBottom: '1.5rem' }}>{p.tagline}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <span style={{ background: p.color, color: '#fff', fontSize: 11, fontWeight: 700, padding: '6px 16px', borderRadius: 999 }}>{p.result}</span>
                    <Link href="/projects" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 2 }}>
                      View case study ↗
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {!isActive && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, zIndex: 10 }}>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 800, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{p.name}</span>
                <div style={{ width: 2, height: 32, borderRadius: 1, background: p.color, opacity: 0.6 }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────
export default function HomepageDemo2() {
  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh', fontFamily: 'inherit', position: 'relative' }}>

      {/* ── DÉGRADÉ HAUT DE PAGE ─────────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '520px',
          background: 'linear-gradient(160deg, #c4b5fd 0%, #93c5fd 30%, rgba(245,242,236,0) 70%)',
          opacity: 0.45,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(250,250,248,0.85)', backdropFilter: 'blur(12px)' }}>
        <Link href="/" style={{ fontWeight: 900, fontSize: 18, color: DARK, letterSpacing: '-0.02em', textDecoration: 'none' }}>
          nukleo<span style={{ color: PURPLE }}>.</span>
        </Link>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {['Services', 'Work', 'About', 'Contact'].map(l => (
            <Link key={l} href={`/${l.toLowerCase()}`} style={{ color: 'rgba(0,0,0,0.45)', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>{l}</Link>
          ))}
          <Link href="/start" style={{ background: DARK, color: '#fff', fontSize: 12, fontWeight: 700, padding: '10px 22px', borderRadius: 999, textDecoration: 'none' }}>
            Start a project ↗
          </Link>
        </div>
      </nav>

      {/* ── CONTENU ─────────────────────────────────────────────────────── */}
      <div style={{ paddingTop: 80 }}>

        {/* ════════════════════════════════════════════════════════════════
            RANGÉE 1 — HERO TITRE + HERO IMAGE
        ════════════════════════════════════════════════════════════════ */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '12px 12px 0' }}>

          {/* Tuile titre */}
          <Tile bg={CREAM} style={{ padding: '4rem 3.5rem 3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 480 }}>
            <p style={{ color: DARK, opacity: 0.3, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 600 }}>
              Choisissez l'intelligence.
            </p>
            <div>
              <img
                src={NUKLEO_LOGO}
                alt="nukleo."
                style={{ width: '100%', maxWidth: 420, height: 'auto', marginBottom: '1.5rem', display: 'block' }}
              />
              <p style={{ color: 'rgba(0,0,0,0.45)', fontSize: 16, lineHeight: 1.65, maxWidth: 400 }}>
                We build brands, platforms, and strategies that compound. Not agencies. Not vendors. A growth partner.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link href="/start" style={{ background: DARK, color: '#fff', fontWeight: 700, fontSize: 13, padding: '14px 28px', borderRadius: 999, textDecoration: 'none' }}>
                Start a project ↗
              </Link>
              <Link href="/work" style={{ color: DARK, fontWeight: 600, fontSize: 13, padding: '14px 28px', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 999, textDecoration: 'none' }}>
                See our work
              </Link>
            </div>
          </Tile>

          {/* Tuile image hero */}
          <Tile bg={DARK} style={{ position: 'relative', minHeight: 480, overflow: 'hidden' }}>
            <img src={HERO_IMAGE} alt="Nukleo" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(124,58,237,0.3) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 8 }}>Montreal · Canada</p>
              <p style={{ color: '#fff', fontWeight: 800, fontSize: 22, lineHeight: 1.2 }}>
                Where strategy meets<br />execution.
              </p>
            </div>
          </Tile>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            RANGÉE 2 — LOGOS MARQUEE
        ════════════════════════════════════════════════════════════════ */}
        <div style={{ padding: '24px 12px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p style={{ textAlign: 'center', color: 'rgba(0,0,0,0.25)', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>
            Trusted by 60+ organizations
          </p>
          <Marquee items={LOGOS} speed={45} />
          <Marquee items={[...LOGOS].reverse()} speed={38} reverse />
        </div>

        {/* ════════════════════════════════════════════════════════════════
            RANGÉE 3 — STAT 98% + CITATION + STAT 15
        ════════════════════════════════════════════════════════════════ */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 12, padding: '0 12px' }}>

          {/* Stat 98% */}
          <Tile bg={DARK} style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 220 }}>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600 }}>Client retention</p>
            <div>
              <p style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(3.5rem,6vw,6rem)', lineHeight: 1, letterSpacing: '-0.03em' }}>98<span style={{ color: PURPLE }}>%</span></p>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginTop: 8, lineHeight: 1.5 }}>Clients who start with us, stay with us.</p>
            </div>
          </Tile>

          {/* Citation éditoriale */}
          <Tile bg={CREAM} style={{ padding: '3rem 3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ color: 'rgba(0,0,0,0.2)', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1.5rem' }}>Nukleo Modular</p>
            <p style={{ color: DARK, fontWeight: 800, fontSize: 'clamp(1.4rem,2.5vw,2.2rem)', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.
            </p>
            <p style={{ color: 'rgba(0,0,0,0.35)', fontSize: 13, lineHeight: 1.65, marginTop: '1.2rem', maxWidth: 520 }}>
              Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.
            </p>
            <Link href="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: PURPLE, fontWeight: 700, fontSize: 12, marginTop: '1.5rem', textDecoration: 'none', borderBottom: `1px solid ${PURPLE}`, paddingBottom: 2, width: 'fit-content' }}>
              Our philosophy ↗
            </Link>
          </Tile>

          {/* Stat 15 */}
          <Tile bg={PURPLE} style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 220 }}>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600 }}>Years building</p>
            <div>
              <p style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(3.5rem,6vw,6rem)', lineHeight: 1, letterSpacing: '-0.03em' }}>15 <span style={{ fontSize: '1.5rem', opacity: 0.6 }}>↗</span></p>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, marginTop: 8, lineHeight: 1.5 }}>Years of compounding expertise.</p>
            </div>
          </Tile>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            RANGÉE 4 — DÉPARTEMENTS (4 tuiles) + ÉQUIPE
        ════════════════════════════════════════════════════════════════ */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '12px 12px 0' }}>

          {/* Bloc départements */}
          <Tile bg={CREAM} style={{ padding: '2.5rem 2.5rem 2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
              <div>
                <p style={{ color: 'rgba(0,0,0,0.25)', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Our Departments</p>
                <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,3rem)', lineHeight: 0.9, letterSpacing: '-0.02em', color: DARK }}>
                  Four ways<br />to grow.
                </h2>
              </div>
              <Link href="/services" style={{ color: 'rgba(0,0,0,0.3)', fontSize: 11, fontWeight: 600, borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: 2, textDecoration: 'none' }}>
                All services ↗
              </Link>
            </div>
            {/* Grille 2×2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { num: '01', name: 'Bureau',    label: 'Agency',     color: ORANGE, img: DEPT_IMGS.agency     },
                { num: '02', name: 'Lab',       label: 'Studio',     color: PURPLE, img: DEPT_IMGS.studio     },
                { num: '03', name: 'Studio',    label: 'Tech',       color: BLUE,   img: DEPT_IMGS.tech       },
                { num: '04', name: 'Conseil',   label: 'Consulting', color: GREEN,  img: DEPT_IMGS.consulting },
              ].map(d => (
                <Link
                  key={d.num}
                  href={`/services/${d.label.toLowerCase()}`}
                  style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '4/3', display: 'block', textDecoration: 'none' }}
                >
                  <img src={d.img} alt={d.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.3) brightness(0.5)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
                  <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ width: 16, height: 2, borderRadius: 1, background: d.color, marginBottom: 6 }} />
                      <p style={{ color: '#fff', fontWeight: 800, fontSize: 15, lineHeight: 1.1 }}>{d.name}</p>
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, fontWeight: 700 }}>↗</span>
                  </div>
                </Link>
              ))}
            </div>
          </Tile>

          {/* Bloc équipe */}
          <Tile bg={DARK} style={{ minHeight: 400 }}>
            <TeamStack />
          </Tile>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            RANGÉE 5 — TRIPTYQUE PROJETS (plein largeur)
        ════════════════════════════════════════════════════════════════ */}
        <div style={{ padding: '12px 12px 0' }}>
          <Triptych />
        </div>

        {/* ════════════════════════════════════════════════════════════════
            RANGÉE 6 — ROUGE ON BLUE + STAT CLIENTS + CTA
        ════════════════════════════════════════════════════════════════ */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, padding: '12px 12px 0' }}>

          {/* Rouge on Blue */}
          <Tile bg={RED} style={{ position: 'relative', overflow: 'hidden', minHeight: 360, padding: '3.5rem' }}>
            <img src={ROB_BG} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12, mixBlendMode: 'luminosity' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2rem' }}>A Nukleo Group company</p>
              <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(3rem,6vw,7rem)', lineHeight: 0.85, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
                Rouge<br />on Blue.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.65, maxWidth: 400, marginBottom: '2rem' }}>
                For brands that refuse to blend in. Creative agency for those who believe being exceptional is not a risk — it's a strategy.
              </p>
              <a href="https://rougeonblue.com" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: RED, fontWeight: 700, fontSize: 13, padding: '12px 24px', borderRadius: 999, textDecoration: 'none' }}>
                Oser l'Exception ↗
              </a>
            </div>
          </Tile>

          {/* Stat clients + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Tile bg={CREAM} style={{ padding: '2.5rem', flex: 1 }}>
              <p style={{ color: 'rgba(0,0,0,0.25)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>Clients served</p>
              <p style={{ color: DARK, fontWeight: 900, fontSize: 'clamp(3rem,5vw,5.5rem)', lineHeight: 1, letterSpacing: '-0.03em' }}>60<span style={{ color: PURPLE }}>+</span></p>
              <p style={{ color: 'rgba(0,0,0,0.35)', fontSize: 12, marginTop: 8, lineHeight: 1.5 }}>Organizations across Canada and beyond.</p>
            </Tile>
            <Tile bg={DARK} style={{ padding: '2.5rem' }}>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Ready to grow with intelligence?
              </p>
              <Link href="/start" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: DARK, fontWeight: 700, fontSize: 13, padding: '12px 24px', borderRadius: 999, textDecoration: 'none' }}>
                Start a project ↗
              </Link>
            </Tile>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            FOOTER
        ════════════════════════════════════════════════════════════════ */}
        <div style={{ padding: '40px 40px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 }}>
          <p style={{ color: DARK, fontWeight: 900, fontSize: 22, letterSpacing: '-0.02em' }}>nukleo<span style={{ color: PURPLE }}>.</span></p>
          <p style={{ color: 'rgba(0,0,0,0.25)', fontSize: 12 }}>© 2025 Nukleo Group Inc. — Montreal, Canada</p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Terms', 'Cookies'].map(l => (
              <Link key={l} href={`/${l.toLowerCase()}`} style={{ color: 'rgba(0,0,0,0.3)', fontSize: 12, textDecoration: 'none' }}>{l}</Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
