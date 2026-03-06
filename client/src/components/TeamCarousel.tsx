import { useRef, useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import OptimizedImage from '@/components/OptimizedImage';

// LinkedIn Fill Icon (solid version)
const LinkedInFill = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const teamMembers: { name: string; translationKey: string; image: string; linkedin: string; objectPosition?: string }[] = [
  { name: "Clément", translationKey: "clement", image: "/team/Clement.jpg", linkedin: "https://www.linkedin.com/in/clement-roy/" },
  { name: "Alexei", translationKey: "alexei", image: "/team/Alexei.png", linkedin: "https://www.linkedin.com/in/alexei-bissonnette-9aa38a23a/" },
  { name: "Antoine", translationKey: "antoine", image: "/team/Antoine.jpg", linkedin: "https://www.linkedin.com/in/antoine-doray-55b77b192/" },
  { name: "Margaux", translationKey: "margaux", image: "/team/Margaux.jpg", linkedin: "https://www.linkedin.com/in/margaux-goethals-8407a5128/" },
  { name: "Camille", translationKey: "camille", image: "/team/Camille.png", linkedin: "https://www.linkedin.com/in/camillegauthier226/" },
  { name: "Timothé", translationKey: "timothe", image: "/team/Timothe.jpg", linkedin: "https://www.linkedin.com/in/timothe-lac/", objectPosition: "center 20%" },
  { name: "Sarah", translationKey: "sarah", image: "/team/Sarah.jpg", linkedin: "https://www.linkedin.com/in/sarah-katerji/" },
  { name: "Maxime", translationKey: "maxime", image: "/team/Maxime.png", linkedin: "https://www.linkedin.com/in/maxime-besnier/" },
  { name: "Meriem", translationKey: "meriem", image: "/team/Meriem.jpg", linkedin: "https://www.linkedin.com/in/meriem-kouidri16/" },
  { name: "Jean-François", translationKey: "jeanFrancois", image: "/team/Jean-Francois.png", linkedin: "https://www.linkedin.com/in/jeffldev/" },
  { name: "Hind", translationKey: "hind", image: "/team/Hind.jpg", linkedin: "https://www.linkedin.com/in/hind-djebien-767288195/" },
  { name: "Omar", translationKey: "omar", image: "/team/Omar.png", linkedin: "https://www.linkedin.com/in/omarhamdi/" },
  { name: "Ricardo", translationKey: "ricardo", image: "/team/Ricardo.png", linkedin: "https://www.linkedin.com/in/ricardo-wierzynski/" },
  { name: "Marie-Claire", translationKey: "marieClaire", image: "/team/Marie-Claire.png", linkedin: "https://www.linkedin.com/in/marieclairelajeunesse/" },
];

export default function TeamCarousel() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        ref.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoScrolling || !scrollRef.current) return;

    const autoScroll = () => {
      if (!scrollRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const cardWidth = 192; // w-48 = 192px (12rem * 16)
      const gap = 24; // gap-6 = 24px (1.5rem * 16)
      const scrollAmount = cardWidth + gap;

      // Si on est à la fin, revenir au début
      if (scrollLeft >= scrollWidth - clientWidth - 10) {
        scrollRef.current.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        scrollRef.current.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    };

    const interval = setInterval(autoScroll, 1000); // Toutes les secondes

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      // Arrêter l'auto-scroll temporairement
      setIsAutoScrolling(false);
      
      // Reprendre l'auto-scroll après 5 secondes d'inactivité
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
      autoScrollTimeoutRef.current = setTimeout(() => {
        setIsAutoScrolling(true);
      }, 5000);

      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Arrêter l'auto-scroll quand l'utilisateur scroll manuellement
  const handleManualScroll = () => {
    setIsAutoScrolling(false);
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current);
    }
    autoScrollTimeoutRef.current = setTimeout(() => {
      setIsAutoScrolling(true);
    }, 5000);
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#523DCB]/30 to-transparent" />
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('home.team.title') || 'Notre Équipe'}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t('home.team.description') || 'Des experts passionnés qui transforment vos idées en réalité'}
          </p>
        </div>

        {/* Carousel container */}
        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/20 ${!canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            aria-label={t('common.previous') || 'Précédent'}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/20 ${!canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            aria-label={t('common.next') || 'Suivant'}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            onScroll={handleManualScroll}
            onTouchStart={() => setIsAutoScrolling(false)}
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-8 py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="flex-shrink-0 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative w-40 md:w-48">
                  {/* Image container */}
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-[#523DCB]/20 to-pink-500/20">
                    {member.image === '/team/Ricardo.png' || member.image === '/team/Marie-Claire.png' ? (
                      <img
                        src={member.image}
                        alt={(t('alt.teamMember') || '{{name}} - {{role}} chez Nukleo Digital')
                          .replace('{{name}}', member.name)
                          .replace('{{role}}', t(`about.team.${member.translationKey}.role`) || member.translationKey)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={member.objectPosition ? { objectPosition: member.objectPosition } : { objectPosition: 'center top' }}
                        loading="lazy"
                      />
                    ) : (
                      <OptimizedImage
                        src={member.image.endsWith('.webp') ? member.image.replace('.webp', '.png') : member.image}
                        webpSrc={member.image.endsWith('.webp') ? member.image : (member.image.endsWith('.png') ? member.image.replace('.png', '.webp') : undefined)}
                        alt={(t('alt.teamMember') || '{{name}} - {{role}} chez Nukleo Digital')
                          .replace('{{name}}', member.name)
                          .replace('{{role}}', t(`about.team.${member.translationKey}.role`) || member.translationKey)}
                        width={192}
                        height={256}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={member.objectPosition ? { objectPosition: member.objectPosition } : { objectPosition: 'center top' }}
                        loading="lazy"
                      />
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`${member.name}'s LinkedIn profile`}
                      >
                        <LinkedInFill className="w-5 h-5 text-white" />
                      </a>
                    </div>
                  </div>
                  {/* Name */}
                  <h3 className="text-center text-white font-medium text-lg">
                    {member.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href={getLocalizedPath('/about')}>
            <button className="px-8 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all duration-300 font-medium">
              {t('home.team.cta') || 'Découvrir l\'équipe complète'}
            </button>
          </Link>
        </div>
      </div>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

