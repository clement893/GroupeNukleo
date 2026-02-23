/**
 * Double carousel de logos clients - deux rangées qui défilent en sens opposés
 * Logos depuis /demo/logos
 */
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
  { src: '/demo/logos/Spruce.png', alt: 'Spruce' },
];

interface DoubleLogoCarouselProps {
  title?: string;
  className?: string;
}

export function DoubleLogoCarousel({ title = 'Trusted by ambitious organizations', className = '' }: DoubleLogoCarouselProps) {
  return (
    <div className={`rounded-2xl overflow-hidden py-[3.75rem] bg-[#EDE9E4] ${className}`}>
      <p className="text-center text-xs font-medium tracking-[0.35em] uppercase mb-10 text-gray-500">
        {title}
      </p>
      <div className="overflow-hidden mb-5">
        <div className="flex gap-[3.75rem] whitespace-nowrap animate-[ticker_40s_linear_infinite]">
          {[...Array(3)].map((_, rep) => (
            <div key={`r1-${rep}`} className="flex items-center gap-[3.75rem] shrink-0">
              {LOGOS_ROW1.map((logo) => (
                <div key={logo.alt} className="flex items-center justify-center w-[140px] h-[50px] shrink-0">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-10 max-w-[120px] w-auto object-contain opacity-40 hover:opacity-70 transition-opacity duration-300 grayscale hover:grayscale-0"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="flex gap-[3.75rem] whitespace-nowrap animate-[ticker-reverse_45s_linear_infinite]">
          {[...Array(3)].map((_, rep) => (
            <div key={`r2-${rep}`} className="flex items-center gap-[3.75rem] shrink-0">
              {LOGOS_ROW2.map((logo) => (
                <div key={logo.alt} className="flex items-center justify-center w-[140px] h-[50px] shrink-0">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-10 max-w-[120px] w-auto object-contain opacity-40 hover:opacity-70 transition-opacity duration-300 grayscale hover:grayscale-0"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
