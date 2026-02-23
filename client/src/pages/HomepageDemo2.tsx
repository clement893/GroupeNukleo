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
  const [hovered, setHovered] = React.useState<number | null>(null);
  return (
    <div
      className="overflow-hidden"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', padding: '6px 0' }}
    >
      <div
        className="flex items-center"
        style={{
          animation: `marquee${reverse ? 'Rev' : ''} ${speed}s linear infinite`,
          width: 'max-content',
          gap: 40,
        }}
      >
        {[...items, ...items].map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              height: hovered === i ? 26 : 18,
              width: 'auto',
              opacity: hovered === i ? 1 : 0.28,
              filter: hovered === i ? 'none' : 'grayscale(1)',
              objectFit: 'contain',
              transition: 'height 0.25s ease, opacity 0.25s ease, filter 0.25s ease',
              cursor: 'pointer',
            }}
          />
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
  { num: '01', name: 'MBAM',       cat: 'Brand & Digital',  tagline: 'Redefining cultural engagement online.',          result: '+240% reach',      img: WORK1, color: BLUE   },
  { num: '02', name: 'SummitLaw',  cat: 'Brand & Creative', tagline: 'A law firm that finally looks like its ambition.', result: '+180% leads',      img: WORK2, color: PURPLE },
  { num: '03', name: 'QueerTech',  cat: 'AI & Platform',    tagline: 'Technology built for belonging.',                  result: '+220% engagement', img: WORK3, color: GREEN  },
];

// Image de rue en fond (on réutilise ROB_BG ou TEAM_IMAGE selon dispo)
const STREET_BG = '/demo/work1.jpg'; // remplacé par une vraie photo de rue si dispo

function Triptych() {
  const [active, setActive] = useState(0);

  // Largeurs des panneaux : actif = large, inactifs = étroits
  const getW = (i: number) => i === active ? '68%' : '16%';

  return (
    <div style={{ position: 'relative', height: '88vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>

      {/* ── Présentoir : centré verticalement, 3 panneaux ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: '40px 40px',
        }}
      >
        {/* Socle gris du présentoir */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 900,
            background: 'rgba(90,90,90,0.55)',
            backdropFilter: 'blur(4px)',
            borderRadius: 12,
            padding: '24px 20px 48px',
            display: 'flex',
            gap: 10,
            boxShadow: '0 32px 80px rgba(0,0,0,0.45)',
          }}
        >
          {PROJECTS.map((p, i) => {
            const isActive = i === active;
            return (
              <div
                key={p.num}
                onClick={() => setActive(i)}
                style={{
                  position: 'relative',
                  width: getW(i),
                  transition: 'width 0.65s cubic-bezier(0.77,0,0.175,1)',
                  cursor: isActive ? 'default' : 'pointer',
                  flexShrink: 0,
                  borderRadius: 8,
                  overflow: 'hidden',
                  aspectRatio: '3/4',
                  background: '#111',
                }}
              >
                {/* Image affiche */}
                <img
                  src={p.img}
                  alt={p.name}
                  style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%',
                    objectFit: 'cover',
                    filter: isActive ? 'brightness(0.75)' : 'brightness(0.45) saturate(0.6)',
                    transform: isActive ? 'scale(1.02)' : 'scale(1.06)',
                    transition: 'filter 0.6s, transform 0.6s',
                  }}
                />

                {/* Overlay gradient bas */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)',
                  opacity: isActive ? 1 : 0.6,
                  transition: 'opacity 0.5s',
                }} />

                {/* Numéro en bas à droite — toujours visible */}
                <span style={{
                  position: 'absolute', bottom: 14, right: 16,
                  fontWeight: 900, fontSize: isActive ? 48 : 28,
                  color: isActive ? PURPLE : 'rgba(255,255,255,0.35)',
                  letterSpacing: '-0.02em', lineHeight: 1,
                  transition: 'font-size 0.5s, color 0.5s',
                  fontVariantNumeric: 'tabular-nums',
                }}>{p.num}</span>

                {/* Contenu panneau actif */}
                {isActive && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    padding: '1.4rem 1.6rem 4rem',
                    zIndex: 10,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700 }}>Selected Work</span>
                      <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase' }}>{p.cat}</span>
                    </div>
                    <div>
                      <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(1.8rem,3.5vw,3.2rem)', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '0.7rem' }}>{p.name}</h2>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, lineHeight: 1.55, maxWidth: 340, marginBottom: '1rem' }}>{p.tagline}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <span style={{ background: p.color, color: '#fff', fontSize: 10, fontWeight: 700, padding: '5px 14px', borderRadius: 999 }}>{p.result}</span>
                        <Link href="/projects" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 1, textDecoration: 'none' }}>
                          View case ↗
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Panneau inactif : nom vertical */}
                {!isActive && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: 12, zIndex: 10,
                  }}>
                    <span style={{
                      color: 'rgba(255,255,255,0.5)', fontWeight: 800, fontSize: 9,
                      letterSpacing: '0.2em', textTransform: 'uppercase',
                      writingMode: 'vertical-rl', transform: 'rotate(180deg)',
                    }}>{p.name}</span>
                    <div style={{ width: 2, height: 24, borderRadius: 1, background: p.color, opacity: 0.7 }} />
                  </div>
                )}
              </div>
            );
          })}

          {/* Barre basse du présentoir (tablette grise) */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: 36, borderRadius: '0 0 12px 12px',
            background: 'rgba(60,60,60,0.7)',
            backdropFilter: 'blur(4px)',
          }} />
        </div>
      </div>
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
          height: '680px',
          background: 'radial-gradient(ellipse 80% 60% at 30% 0%, #c4b5fd 0%, #a78bfa 15%, #93c5fd 35%, rgba(245,242,236,0) 70%)',
          opacity: 0.65,
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
      <div style={{ paddingTop: 80, display: 'flex', flexDirection: 'column', gap: 32 }}>

        {/* ════════════════════════════════════════════════════════════════
            LOGO HERO — texte CSS dégradé, débordant
        ════════════════════════════════════════════════════════════════ */}
        <div style={{ padding: '24px 32px 0', position: 'relative', zIndex: 1, overflow: 'visible' }}>
          <h1
            style={{
              fontWeight: 900,
              fontSize: 'clamp(5rem, 13vw, 11rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              margin: 0,
              background: 'linear-gradient(110deg, #7b1f3a 0%, #6b21a8 40%, #7c3aed 70%, #6d28d9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginLeft: '-0.04em', // débordement léger à gauche
            }}
          >
            nukleo<span style={{ color: 'inherit' }}>.</span>
          </h1>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            RANGÉE 1 — HERO : WIDGETS GAUCHE + MACBOOK DROITE
        ════════════════════════════════════════════════════════════════ */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 12, padding: '0 16px', position: 'relative', zIndex: 1 }}>

          {/* ── Colonne gauche : widgets ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>

            {/* Météo + Date */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
              {/* Météo */}
              <Tile bg="#fff" style={{ padding: '0.9rem 1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 16 }}>☀️</span>
                  <span style={{ color: 'rgba(0,0,0,0.3)', fontSize: 9 }}>°C</span>
                </div>
                <p style={{ fontWeight: 900, fontSize: 34, lineHeight: 1, color: DARK, letterSpacing: '-0.03em', margin: '3px 0 2px' }}>24</p>
                <p style={{ color: 'rgba(0,0,0,0.35)', fontSize: 9 }}>Montréal, Québec</p>
              </Tile>
              {/* Date */}
              <Tile bg="#fff" style={{ padding: '0.9rem 1rem' }}>
                <p style={{ color: 'rgba(0,0,0,0.45)', fontSize: 10, marginBottom: 3 }}>Bon lundi 💜</p>
                <p style={{ fontWeight: 900, fontSize: 34, lineHeight: 1, color: DARK, letterSpacing: '-0.03em', margin: '3px 0 2px' }}>23</p>
                <p style={{ color: 'rgba(0,0,0,0.35)', fontSize: 9 }}>février 2026</p>
              </Tile>
            </div>

            {/* Résultat campagne */}
            <Tile bg="#fff" style={{ padding: '0.9rem 1rem', display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: 10, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                <img src={WORK1} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 6, right: 6, width: 20, height: 20, borderRadius: '50%', background: DARK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontSize: 9 }}>↗</span>
                </div>
              </div>
              <div>
                <p style={{ fontWeight: 900, fontSize: 22, color: DARK, letterSpacing: '-0.02em', lineHeight: 1 }}>749k$</p>
                <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: 10, marginTop: 3, lineHeight: 1.4 }}>amassés lors de notre<br />dernière campagne</p>
              </div>
            </Tile>

            {/* Téléphone */}
            <div style={{ display: 'flex', gap: 7 }}>
              <a href="tel:4385431987" style={{ flex: 1, background: PURPLE, color: '#fff', fontWeight: 700, fontSize: 12, padding: '11px 16px', borderRadius: 999, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14 }}>📞</span> 438 543 1987
              </a>
              <Tile bg="#fff" style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 999, flexShrink: 0 }}>
                <span style={{ fontSize: 15 }}>✉️</span>
              </Tile>
            </div>

            {/* Texte + CTA */}
            <Tile bg="#fff" style={{ padding: '0.9rem 1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <p style={{ fontWeight: 700, fontSize: 11, color: DARK }}>Choisissez l'intelligence.</p>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: DARK, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#fff', fontSize: 10 }}>↗</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: CREAM }} />
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#e0e7ff' }} />
              </div>
              <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: 10, lineHeight: 1.55 }}>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.
              </p>
            </Tile>

            {/* Barre croissance */}
            <Tile bg="#fff" style={{ padding: '0.8rem 1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: 11 }}>Croissance actuelle</p>
                <p style={{ color: PURPLE, fontWeight: 700, fontSize: 11 }}>+4%</p>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: '#f0edf8', overflow: 'hidden' }}>
                <div style={{ width: '74%', height: '100%', borderRadius: 3, background: `linear-gradient(to right, ${PURPLE}, #a78bfa)` }} />
              </div>
            </Tile>
          </div>

          {/* ── Colonne droite : MacBook ── */}
          <Tile bg="" style={{ position: 'relative', minHeight: 480, overflow: 'hidden', background: 'linear-gradient(160deg, #f8f6ff 0%, #f0f4ff 40%, #fafaf8 100%)' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
              <img
                src={HERO_IMAGE}
                alt="Nukleo work"
                style={{
                  width: '90%',
                  maxWidth: 600,
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.25))',
                  transform: 'perspective(1200px) rotateX(4deg)',
                }}
              />
            </div>
          </Tile>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            RANGÉE 2 — LOGOS MARQUEE
        ════════════════════════════════════════════════════════════════ */}
        <div style={{ padding: '8px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ textAlign: 'center', color: 'rgba(0,0,0,0.25)', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>
            Trusted by 60+ organizations
          </p>
          <Marquee items={LOGOS} speed={45} />
          <Marquee items={[...LOGOS].reverse()} speed={38} reverse />
        </div>

        {/* ════════════════════════════════════════════════════════════════
            RANGÉE 3 — STAT 98% + CITATION + STAT 15
        ════════════════════════════════════════════════════════════════ */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 16, padding: '0 24px' }}>

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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: '0 24px' }}>

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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
        <div style={{ padding: '0' }}>
          <Triptych />
        </div>

        {/* ════════════════════════════════════════════════════════════════
            RANGÉE 6 — ROUGE ON BLUE + STAT CLIENTS + CTA
        ════════════════════════════════════════════════════════════════ */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, padding: '0 24px' }}>

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
        <div style={{ padding: '48px 40px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
