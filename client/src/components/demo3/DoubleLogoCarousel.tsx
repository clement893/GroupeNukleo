/**
 * Double carousel de logos clients - deux rangées qui défilent en sens opposés.
 * Données depuis l'API (admin) ou fallback statique.
 */
import { trpc } from '@/lib/trpc';

const FALLBACK_ROW1 = [
  { src: '/demo/logos/MBAM.png', alt: 'MBAM', url: '' },
  { src: '/demo/logos/SummitLaw.png', alt: 'Summit Law', url: '' },
  { src: '/demo/logos/Queertech.png', alt: 'QueerTech', url: '' },
  { src: '/demo/logos/OSM.png', alt: 'OSM', url: '' },
  { src: '/demo/logos/FJL.png', alt: 'FJL', url: '' },
  { src: '/demo/logos/AMQ.png', alt: 'AMQ', url: '' },
  { src: '/demo/logos/CINARS.png', alt: 'CINARS', url: '' },
  { src: '/demo/logos/Novisto.png', alt: 'Novisto', url: '' },
  { src: '/demo/logos/Amerispa.png', alt: 'Amerispa', url: '' },
  { src: '/demo/logos/RoyalLePage.svg', alt: 'Royal LePage', url: '' },
  { src: '/demo/logos/CQDE.png', alt: 'CQDE', url: '' },
  { src: '/demo/logos/Zu.png', alt: 'Zu', url: '' },
  { src: '/demo/logos/Securiglobe.png', alt: 'Securiglobe', url: '' },
  { src: '/demo/logos/EMH.png', alt: 'EMH', url: '' },
];

const FALLBACK_ROW2 = [
  { src: '/demo/logos/Educart.png', alt: 'Educart', url: '' },
  { src: '/demo/logos/CECS.png', alt: 'CECS', url: '' },
  { src: '/demo/logos/EHR.png', alt: 'EHR', url: '' },
  { src: '/demo/logos/Diverso.png', alt: 'Diverso', url: '' },
  { src: '/demo/logos/MP.png', alt: 'MP', url: '' },
  { src: '/demo/logos/TNS.png', alt: 'TNS', url: '' },
  { src: '/demo/logos/PsyEtc.png', alt: 'Psy etc.', url: '' },
  { src: '/demo/logos/LF.png', alt: 'LF', url: '' },
  { src: '/demo/logos/Medicom.svg', alt: 'Medicom', url: '' },
  { src: '/demo/logos/Ecoverdure.png', alt: 'Écoverdure', url: '' },
  { src: '/demo/logos/Techsplo.png', alt: 'Techsplo', url: '' },
  { src: '/demo/logos/GoCoupons.png', alt: 'GoCoupons', url: '' },
  { src: '/demo/logos/AdeleBlais.webp', alt: 'Adèle Blais', url: '' },
  { src: '/demo/logos/Zenya.png', alt: 'Zenya', url: '' },
  { src: '/demo/logos/Spruce.png', alt: 'Spruce', url: '' },
];

type LogoItem = { src: string; alt: string; url?: string };

function LogoCell({ logo }: { logo: LogoItem }) {
  const img = (
    <img
      src={logo.src}
      alt={logo.alt}
      className="max-h-10 max-w-[120px] w-auto object-contain opacity-40 hover:opacity-70 transition-opacity duration-300 grayscale hover:grayscale-0"
      loading="lazy"
    />
  );
  return (
    <div className="flex items-center justify-center w-[140px] h-[50px] shrink-0">
      {logo.url ? (
        <a
          href={logo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded"
          aria-label={`${logo.alt} - ouvrir le site`}
        >
          {img}
        </a>
      ) : (
        img
      )}
    </div>
  );
}

interface DoubleLogoCarouselProps {
  title?: string;
  className?: string;
}

export function DoubleLogoCarousel({ title = 'Trusted by ambitious organizations', className = '' }: DoubleLogoCarouselProps) {
  const { data: apiLogos, isLoading, isError } = trpc.carouselLogos.getAll.useQuery(undefined, {
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });

  let row1: LogoItem[];
  let row2: LogoItem[];

  if (apiLogos && apiLogos.length > 0 && !isLoading && !isError) {
    const half = Math.ceil(apiLogos.length / 2);
    row1 = apiLogos.slice(0, half).map((l) => ({ src: l.src, alt: l.alt, url: l.url || undefined }));
    row2 = apiLogos.slice(half).map((l) => ({ src: l.src, alt: l.alt, url: l.url || undefined }));
  } else {
    row1 = FALLBACK_ROW1;
    row2 = FALLBACK_ROW2;
  }

  return (
    <div className={`rounded-2xl overflow-hidden py-[3.75rem] ${className}`}>
      <p className="text-center text-xs font-medium tracking-[0.35em] uppercase mb-10 text-gray-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
        {title}
      </p>
      <div className="overflow-hidden mb-5">
        <div className="flex gap-[3.75rem] whitespace-nowrap animate-[ticker_40s_linear_infinite]">
          {[...Array(3)].map((_, rep) => (
            <div key={`r1-${rep}`} className="flex items-center gap-[3.75rem] shrink-0">
              {row1.map((logo) => (
                <LogoCell key={`${logo.src}-${logo.alt}-${rep}`} logo={logo} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="flex gap-[3.75rem] whitespace-nowrap animate-[ticker-reverse_45s_linear_infinite]">
          {[...Array(3)].map((_, rep) => (
            <div key={`r2-${rep}`} className="flex items-center gap-[3.75rem] shrink-0">
              {row2.map((logo) => (
                <LogoCell key={`${logo.src}-${logo.alt}-${rep}`} logo={logo} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
