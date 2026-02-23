import { useRef, useEffect, useState } from 'react';

const TEAM_MEMBERS = [
  { name: 'Clément Laberge', role: 'Founder & CEO', img: '/demo/team.jpg', color: '#7c3aed' },
  { name: 'Marie-Ève Tremblay', role: 'Creative Director', img: '/demo/team-1.jpg', color: '#f97316' },
  { name: 'Alexandre Côté', role: 'Head of Tech', img: '/demo/team-2.jpg', color: '#2563eb' },
  { name: 'Sophie Nguyen', role: 'Strategy Lead', img: '/demo/team-3.jpg', color: '#059669' },
  { name: 'Jean-Pierre Martin', role: 'Lead Developer', img: '/demo/team-4.jpg', color: '#7c3aed' },
];

/**
 * Widget équipe - cartes photos qui scrollent verticalement (scroll up)
 * Style: pile de cartes arrondies, une centrale mise en avant
 */
export function TeamScrollCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        setActiveIndex((i) => Math.min(TEAM_MEMBERS.length - 1, i + 1));
      } else {
        setActiveIndex((i) => Math.max(0, i - 1));
      }
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  const CARD_HEIGHT = 200;
  const CARD_OVERLAP = 40;
  const VISIBLE_OFFSET = 140;

  return (
    <div
      ref={scrollRef}
      className="relative h-full min-h-[420px] flex items-center justify-center overflow-hidden rounded-2xl bg-[#0A0A0A] cursor-n-resize"
    >
      <div className="relative w-full max-w-[300px] h-[400px]">
        {TEAM_MEMBERS.map((member, i) => {
          const offset = i - activeIndex;
          const isActive = i === activeIndex;
          const scale = isActive ? 1 : 0.9;
          const opacity = Math.abs(offset) > 2 ? 0 : isActive ? 1 : 0.55;
          const zIndex = isActive ? 10 : Math.max(1, 5 - Math.abs(offset));

          return (
            <div
              key={member.name}
              className="absolute left-1/2 top-1/2 rounded-2xl overflow-hidden transition-all duration-500 ease-out"
              style={{
                width: '100%',
                height: CARD_HEIGHT,
                transform: `translate(-50%, calc(-50% + ${offset * VISIBLE_OFFSET}px)) scale(${scale})`,
                zIndex,
                opacity,
                boxShadow: isActive ? '0 24px 48px rgba(0,0,0,0.5)' : '0 8px 24px rgba(0,0,0,0.3)',
              }}
              onClick={() => setActiveIndex(i)}
            >
              <div
                className="w-full h-full rounded-2xl border-2 transition-colors"
                style={{
                  borderColor: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                  backgroundColor: i % 2 === 0 ? '#1a1a1a' : '#262626',
                }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                  style={{
                    filter: isActive ? 'brightness(0.85)' : 'brightness(0.5) grayscale(0.3)',
                  }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
                  style={{ opacity: isActive ? 1 : 0.7 }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-heading font-bold text-sm">{member.name}</p>
                  <p className="text-xs text-white/70">{member.role}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Indicateur scroll */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-white/50 transition-all duration-300"
          style={{
            width: `${(100 / TEAM_MEMBERS.length) * (activeIndex + 1)}%`,
          }}
        />
      </div>
    </div>
  );
}
