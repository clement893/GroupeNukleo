/**
 * Double carousel de logos clients - deux rangées qui défilent en sens opposés.
 * Données statiques (site one-page sans backend).
 */
import { CAROUSEL_LOGOS_ROW1, CAROUSEL_LOGOS_ROW2 } from '@/data/carouselLogos';

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
  const row1: LogoItem[] = CAROUSEL_LOGOS_ROW1;
  const row2: LogoItem[] = CAROUSEL_LOGOS_ROW2;

  return (
    <div className={`rounded-2xl overflow-hidden py-[3.75rem] ${className}`}>
      <p className="text-center text-xs font-medium tracking-[0.35em] uppercase mb-10 text-gray-500" style={{ fontFamily: "'Google Sans Flex', sans-serif", fontWeight: 700 }}>
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
