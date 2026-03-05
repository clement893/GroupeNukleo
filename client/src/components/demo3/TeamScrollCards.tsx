import { useRef, useEffect, useState } from 'react';

/** Photos de personnes uniquement (sans work/project) */
const TEAM_IMGS = ['/demo/team-1.jpg', '/demo/team-2.jpg', '/demo/team-3.jpg', '/demo/team-4.jpg'];
const TEAM_COLORS = ['#7c3aed', '#f97316', '#2563eb', '#059669', '#7c3aed', '#dc2626', '#0891b2', '#4f46e5'];

const TEAM_MEMBERS = [
  { name: 'Clément Laberge', role: 'Founder & CEO', img: TEAM_IMGS[0], color: TEAM_COLORS[0], bio: 'Fondateur de Nukleo, passionné par la transformation numérique et l\'IA appliquée. 15 ans d\'expérience en stratégie digitale.' },
  { name: 'Marie-Ève Tremblay', role: 'Creative Director', img: TEAM_IMGS[1], color: TEAM_COLORS[1], bio: 'Directrice créative, elle donne vie aux marques à travers des expériences visuelles mémorables.' },
  { name: 'Alexandre Côté', role: 'Head of Tech', img: TEAM_IMGS[2], color: TEAM_COLORS[2], bio: 'Architecte technique, il pilote les solutions digitales et intègre l\'IA au cœur des produits.' },
  { name: 'Sophie Nguyen', role: 'Strategy Lead', img: TEAM_IMGS[3], color: TEAM_COLORS[3], bio: 'Stratège digitale, elle accompagne les organisations dans leur transformation numérique.' },
  { name: 'Jean-Pierre Martin', role: 'Lead Developer', img: TEAM_IMGS[0], color: TEAM_COLORS[4], bio: 'Lead développeur, expert en architectures évolutives et livraison de produits digitaux.' },
  { name: 'Émilie Bouchard', role: 'Senior UX Designer', img: TEAM_IMGS[1], color: TEAM_COLORS[5], bio: 'Designer UX senior, elle crée des parcours utilisateur intuitifs et des interfaces qui convertissent.' },
  { name: 'Thomas Fortin', role: 'AI Solutions Architect', img: TEAM_IMGS[2], color: TEAM_COLORS[6], bio: 'Spécialiste IA, il conçoit des solutions agentiques pour automatiser et optimiser.' },
  { name: 'Camille Dubois', role: 'Content Strategist', img: TEAM_IMGS[3], color: TEAM_COLORS[7], bio: 'Stratège de contenu, elle structure les récits de marque et les stratégies éditoriales.' },
  { name: 'Lucas Moreau', role: 'Full-Stack Developer', img: TEAM_IMGS[0], color: TEAM_COLORS[0], bio: 'Développeur full-stack, il construit des applications web performantes et des APIs robustes.' },
  { name: 'Léa Gagnon', role: 'Brand Manager', img: TEAM_IMGS[1], color: TEAM_COLORS[1], bio: 'Brand manager, elle assure la cohérence des marques et pilote les lancements stratégiques.' },
  { name: 'Hugo Lavoie', role: 'Digital Marketing Lead', img: TEAM_IMGS[2], color: TEAM_COLORS[2], bio: 'Expert marketing digital, il orchestre les campagnes et optimise les canaux pour le ROI.' },
  { name: 'Emma Leblanc', role: 'Project Manager', img: TEAM_IMGS[3], color: TEAM_COLORS[3], bio: 'Chef de projet, elle assure la livraison à temps et la satisfaction des clients.' },
  { name: 'Nathan Roy', role: 'Data Engineer', img: TEAM_IMGS[0], color: TEAM_COLORS[4], bio: 'Ingénieur données, il conçoit les pipelines pour des analyses et modèles IA à grande échelle.' },
  { name: 'Chloé Bergeron', role: 'Creative Producer', img: TEAM_IMGS[1], color: TEAM_COLORS[5], bio: 'Productrice créative, elle coordonne les projets visuels de A à Z.' },
  { name: 'Félix Champagne', role: 'Frontend Developer', img: TEAM_IMGS[2], color: TEAM_COLORS[6], bio: 'Développeur frontend, passionné par les interfaces modernes et expériences fluides.' },
  { name: 'Zoé Mercier', role: 'Growth Strategist', img: TEAM_IMGS[3], color: TEAM_COLORS[7], bio: 'Stratège growth, elle conçoit des funnel d\'acquisition basés sur les données.' },
  { name: 'Raphaël Beaudoin', role: 'Backend Developer', img: TEAM_IMGS[0], color: TEAM_COLORS[0], bio: 'Développeur backend, il conçoit les systèmes serveur et les APIs scalables.' },
  { name: 'Manon Pelletier', role: 'Visual Designer', img: TEAM_IMGS[1], color: TEAM_COLORS[1], bio: 'Designer visuelle, elle crée des identités fortes et des visuels qui marquent.' },
  { name: 'Olivier Turgeon', role: 'Technical Lead', img: TEAM_IMGS[2], color: TEAM_COLORS[2], bio: 'Lead technique, il définit les standards de code et accompagne l\'excellence.' },
  { name: 'Isabelle Paquette', role: 'Client Success Director', img: TEAM_IMGS[3], color: TEAM_COLORS[3], bio: 'Directrice succès client, elle assure la satisfaction et la croissance des comptes.' },
];

/**
 * Widget équipe - cartes photos qui scrollent verticalement (scroll up)
 * Style: pile de cartes arrondies, une centrale mise en avant
 */
export function TeamScrollCards() {
  const imagesRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = imagesRef.current;
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

  const activeMember = TEAM_MEMBERS[activeIndex];
  return (
    <div className="relative h-full min-h-[540px] flex flex-col overflow-hidden rounded-2xl">
      <div className="flex-1 flex items-center justify-center min-h-0 overflow-hidden px-4 lg:px-8">
        <div className="flex items-center justify-center gap-6 lg:gap-10 w-full max-w-5xl">
          {/* Gauche — titre + nom (scroll page hors images) */}
          <div className="text-left shrink-0 w-[140px] lg:w-[180px]">
            <p className="text-black/60 text-[10px] font-medium tracking-[0.35em] uppercase mb-2">
              Notre équipe
            </p>
            <p className="font-heading font-bold text-black text-sm lg:text-base">
              {activeMember.name}
            </p>
            <p className="text-black/60 text-xs mt-1">
              {activeMember.role}
            </p>
          </div>
          {/* Images — scroll équipe uniquement quand survol */}
          <div
            ref={imagesRef}
            className="relative w-full max-w-[270px] h-[520px] max-h-[85vh] shrink-0 cursor-n-resize"
          >
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
          {/* Droite — description / bio (scroll page hors images) */}
          <p className="text-black/70 text-xs lg:text-sm leading-relaxed shrink-0 min-w-[140px] lg:min-w-[220px] max-w-[260px]">
            {activeMember.bio}
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
