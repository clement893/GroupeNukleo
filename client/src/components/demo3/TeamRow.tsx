import { useState } from 'react';

const DARK = '#0A0A0A';
const TEAM_IMGS = ['/demo/team-1.jpg', '/demo/team-2.jpg', '/demo/team-3.jpg', '/demo/team-4.jpg'];

const TEAM_MEMBERS = [
  { name: 'Clément Laberge',    role: 'Founder & CEO',          img: TEAM_IMGS[0], color: '#7c3aed' },
  { name: 'Marie-Ève Tremblay', role: 'Creative Director',      img: TEAM_IMGS[1], color: '#f97316' },
  { name: 'Alexandre Côté',     role: 'Head of Tech',           img: TEAM_IMGS[2], color: '#2563eb' },
  { name: 'Sophie Nguyen',      role: 'Strategy Lead',          img: TEAM_IMGS[3], color: '#059669' },
];

export function TeamRow() {
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
      className="rounded-3xl overflow-hidden flex flex-col"
      style={{ background: DARK, margin: '0 6%', marginBottom: 48 }}
      onWheel={handleWheel}
    >
      <div className="flex flex-col items-center gap-7 flex-1 px-8 py-10">
        {/* Titre */}
        <div className="text-center shrink-0">
          <p className="text-white/30 text-[10px] font-medium tracking-[0.35em] uppercase mb-2">
            Notre équipe
          </p>
          <h2
            className="font-heading font-black text-white leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}
          >
            Les gens derrière le travail.
          </h2>
        </div>

        {/* Pile de cartes 3D */}
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

        {/* Nom + rôle + dots + flèches */}
        <div className="flex flex-col items-center gap-2 text-center shrink-0">
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
          <div className="flex gap-2">
            {TEAM_MEMBERS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="h-[2px] rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? '28px' : '10px',
                  background: i === activeIndex ? TEAM_MEMBERS[activeIndex].color : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
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
