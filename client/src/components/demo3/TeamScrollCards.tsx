import { useRef, useEffect, useState } from 'react';

const TEAM_IMGS = ['/demo/team.jpg', '/demo/team-1.jpg', '/demo/team-2.jpg', '/demo/team-3.jpg', '/demo/team-4.jpg', '/demo/work1.jpg', '/demo/work2.jpg', '/demo/work3.jpg', '/demo/project-1.jpg', '/demo/project-2.jpg'];
const TEAM_COLORS = ['#7c3aed', '#f97316', '#2563eb', '#059669', '#7c3aed', '#dc2626', '#0891b2', '#4f46e5'];

const TEAM_MEMBERS = [
  { name: 'Clément Laberge', role: 'Founder & CEO', img: TEAM_IMGS[0], color: TEAM_COLORS[0] },
  { name: 'Marie-Ève Tremblay', role: 'Creative Director', img: TEAM_IMGS[1], color: TEAM_COLORS[1] },
  { name: 'Alexandre Côté', role: 'Head of Tech', img: TEAM_IMGS[2], color: TEAM_COLORS[2] },
  { name: 'Sophie Nguyen', role: 'Strategy Lead', img: TEAM_IMGS[3], color: TEAM_COLORS[3] },
  { name: 'Jean-Pierre Martin', role: 'Lead Developer', img: TEAM_IMGS[4], color: TEAM_COLORS[4] },
  { name: 'Émilie Bouchard', role: 'Senior UX Designer', img: TEAM_IMGS[5], color: TEAM_COLORS[5] },
  { name: 'Thomas Fortin', role: 'AI Solutions Architect', img: TEAM_IMGS[6], color: TEAM_COLORS[6] },
  { name: 'Camille Dubois', role: 'Content Strategist', img: TEAM_IMGS[7], color: TEAM_COLORS[7] },
  { name: 'Lucas Moreau', role: 'Full-Stack Developer', img: TEAM_IMGS[8], color: TEAM_COLORS[0] },
  { name: 'Léa Gagnon', role: 'Brand Manager', img: TEAM_IMGS[9], color: TEAM_COLORS[1] },
  { name: 'Hugo Lavoie', role: 'Digital Marketing Lead', img: TEAM_IMGS[0], color: TEAM_COLORS[2] },
  { name: 'Emma Leblanc', role: 'Project Manager', img: TEAM_IMGS[1], color: TEAM_COLORS[3] },
  { name: 'Nathan Roy', role: 'Data Engineer', img: TEAM_IMGS[2], color: TEAM_COLORS[4] },
  { name: 'Chloé Bergeron', role: 'Creative Producer', img: TEAM_IMGS[3], color: TEAM_COLORS[5] },
  { name: 'Félix Champagne', role: 'Frontend Developer', img: TEAM_IMGS[4], color: TEAM_COLORS[6] },
  { name: 'Zoé Mercier', role: 'Growth Strategist', img: TEAM_IMGS[5], color: TEAM_COLORS[7] },
  { name: 'Raphaël Beaudoin', role: 'Backend Developer', img: TEAM_IMGS[6], color: TEAM_COLORS[0] },
  { name: 'Manon Pelletier', role: 'Visual Designer', img: TEAM_IMGS[7], color: TEAM_COLORS[1] },
  { name: 'Olivier Turgeon', role: 'Technical Lead', img: TEAM_IMGS[8], color: TEAM_COLORS[2] },
  { name: 'Isabelle Paquette', role: 'Client Success Director', img: TEAM_IMGS[9], color: TEAM_COLORS[3] },
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

  const CARD_HEIGHT = 360; // Portrait 3:4
  const VISIBLE_OFFSET = 180;

  return (
    <div
      ref={scrollRef}
      className="relative h-full min-h-[540px] flex flex-col overflow-hidden rounded-2xl cursor-n-resize"
    >
      <p className="text-black/60 text-[10px] font-medium tracking-[0.35em] uppercase px-6 pt-6 pb-2 shrink-0">
        Notre équipe
      </p>
      <div className="flex-1 flex items-center justify-center min-h-0 overflow-hidden px-4">
        <div className="flex items-center justify-center gap-4 lg:gap-8 w-full max-w-[400px]">
          <p className="font-heading font-bold text-black text-sm text-right shrink-0 min-w-[100px] lg:min-w-[120px]">
            {TEAM_MEMBERS[activeIndex].name}
          </p>
          <div className="relative w-full max-w-[270px] h-[520px] shrink-0">
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
              </div>
            </div>
          );
        })}
          </div>
          <p className="text-black/70 text-xs text-left shrink-0 min-w-[100px] lg:min-w-[120px]">
            {TEAM_MEMBERS[activeIndex].role}
          </p>
        </div>
      </div>
      {/* Indicateur scroll */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-black/10">
        <div
          className="h-full rounded-full bg-black/50 transition-all duration-300"
          style={{
            width: `${(100 / TEAM_MEMBERS.length) * (activeIndex + 1)}%`,
          }}
        />
      </div>
    </div>
  );
}
