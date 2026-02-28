import { useState, useEffect } from 'react';
import OptimizedImage from '@/components/OptimizedImage';

interface ProjectsHeroProps {
  headline: string;
  description: string;
  /** Images for hero: first 9 used (3 per slide × 3 slides), then fallback repeat */
  heroImages: string[];
}

const SLIDE_LABELS = ['01', '02', '03'];

function getSlideImages(heroImages: string[], slideIndex: number): string[] {
  const base = slideIndex * 3;
  const list = heroImages.length ? heroImages : [];
  return [
    list[base % list.length] ?? list[0],
    list[(base + 1) % list.length] ?? list[0],
    list[(base + 2) % list.length] ?? list[0],
  ].filter(Boolean);
}

export default function ProjectsHero({ headline, description, heroImages }: ProjectsHeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-rotate every 5s
  useEffect(() => {
    const t = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const slideImages = getSlideImages(heroImages, activeSlide);

  return (
    <section className="pt-24 pb-12 lg:pt-32 lg:pb-16">
      <div className="container">
        <div className="max-w-4xl mb-10 lg:mb-14">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#5A1E29] mb-4 font-heading">
            {headline}
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl">
            {description}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-10">
          {/* Carousel: 3 overlapping screens — images change by activeSlide */}
          <div className="flex-1 relative min-h-[280px] sm:min-h-[340px] lg:min-h-[400px]">
            <div className="relative w-full max-w-2xl mx-auto">
              <div className="relative w-full transition-opacity duration-500" style={{ aspectRatio: '16/10' }}>
                <div
                  className="absolute rounded-lg overflow-hidden shadow-xl border border-white/20 bg-white"
                  style={{
                    width: '70%',
                    left: '0%',
                    top: '5%',
                    transform: 'rotate(-3deg)',
                    zIndex: 1,
                  }}
                >
                  <div className="h-6 bg-gray-100 border-b flex items-center px-2 gap-1" />
                  {slideImages[0] ? (
                    <OptimizedImage
                      src={`/projects/${slideImages[0]}`}
                      alt=""
                      width={600}
                      height={360}
                      className="w-full h-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 min-h-[200px]" />
                  )}
                </div>
                <div
                  className="absolute rounded-lg overflow-hidden shadow-xl border border-white/20 bg-white"
                  style={{
                    width: '70%',
                    left: '18%',
                    top: '0%',
                    transform: 'rotate(1deg)',
                    zIndex: 2,
                  }}
                >
                  <div className="h-6 bg-gray-100 border-b flex items-center px-2 gap-1" />
                  {slideImages[1] ? (
                    <OptimizedImage
                      src={`/projects/${slideImages[1]}`}
                      alt=""
                      width={600}
                      height={360}
                      className="w-full h-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 min-h-[200px]" />
                  )}
                </div>
                <div
                  className="absolute rounded-lg overflow-hidden shadow-xl border border-white/20 bg-white"
                  style={{
                    width: '70%',
                    left: '30%',
                    top: '8%',
                    transform: 'rotate(2deg)',
                    zIndex: 3,
                  }}
                >
                  <div className="h-6 bg-gray-100 border-b flex items-center px-2 gap-1" />
                  {slideImages[2] ? (
                    <OptimizedImage
                      src={`/projects/${slideImages[2]}`}
                      alt=""
                      width={600}
                      height={360}
                      className="w-full h-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 min-h-[200px]" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Indicator: 01, 02, 03 vertical blocks */}
          <div className="flex lg:flex-col gap-2 lg:w-28 shrink-0">
            {SLIDE_LABELS.map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`
                  flex items-center gap-3 px-4 py-3 lg:px-4 lg:py-4 rounded-lg border transition-all duration-200
                  ${activeSlide === index
                    ? 'bg-[#5A1E29] text-white border-[#5A1E29]'
                    : 'bg-white/80 text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <span className="text-lg font-semibold tabular-nums">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
