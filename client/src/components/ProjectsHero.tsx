import { useState } from 'react';
import OptimizedImage from '@/components/OptimizedImage';

interface ProjectsHeroProps {
  headline: string;
  description: string;
  /** Images for hero: first 3 used in triptych, rest unused */
  heroImages: string[];
  /** Returns URL for a project detail page given image name. If not provided, triptych panels won't link. */
  getProjectUrl?: (imageName: string) => string;
  /** Label for "View project" link (e.g. "View project →"). Optional, for i18n. */
  viewProjectLabel?: string;
}

const SLIDE_LABELS = ['01', '02', '03'];

function getTriptychImages(heroImages: string[]): string[] {
  const list = heroImages.length ? heroImages : [];
  return [
    list[0] ?? list[0],
    list[1] ?? list[0],
    list[2] ?? list[0],
  ].filter(Boolean);
}

export default function ProjectsHero({ headline, description, heroImages, getProjectUrl, viewProjectLabel = 'Voir le projet →' }: ProjectsHeroProps) {
  const [active, setActive] = useState(0);
  const triptychImages = getTriptychImages(heroImages);

  return (
    <section className="pt-24 pb-12 lg:pt-32 lg:pb-16">
      <div className="container">
        <div className="max-w-4xl mb-10 lg:mb-14">
          <h1
            className="font-bold mb-4 w-fit"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              display: 'inline-block',
              background: 'linear-gradient(to right, #6B1817, #5636AD)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            {headline}
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {description}
          </p>
        </div>

        {/* Triptyque 3 panneaux (comme page principale) */}
        {triptychImages.length > 0 && (
          <div
            className="w-full overflow-hidden relative rounded-xl"
            style={{
              height: 'clamp(320px, 55vh, 580px)',
              display: 'flex',
              gap: 21,
            }}
          >
            {triptychImages.slice(0, 3).map((imageName, i) => {
              const isActive = i === active;
              const projectUrl = getProjectUrl ? getProjectUrl(imageName) : null;
              return (
                <div
                  key={`${imageName}-${i}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(i); } }}
                  style={{
                    flex: isActive ? '1 1 0' : '0 0 6.8%',
                    minWidth: isActive ? 0 : undefined,
                    transition: 'flex 0.6s cubic-bezier(0.77,0,0.175,1)',
                    position: 'relative',
                    cursor: isActive ? 'default' : 'pointer',
                    overflow: 'hidden',
                    borderRadius: 12,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <OptimizedImage
                      src={`/projects/${imageName}`}
                      alt=""
                      width={800}
                      height={600}
                      fill
                      loading="eager"
                      fetchPriority={i === 0 ? 'high' : 'low'}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="w-full h-full transition-[filter] duration-500 ease-out object-cover"
                      style={{
                        filter: isActive ? 'grayscale(0) brightness(0.7)' : 'grayscale(1) brightness(0.55)',
                        objectPosition: isActive ? 'center' : 'top',
                      }}
                    />
                  </div>
                  <div style={{ position: 'absolute', inset: 0, background: isActive ? 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)' : 'rgba(0,0,0,0.22)', transition: 'background 0.5s ease' }} />

                  <div
                    style={{
                      position: 'absolute',
                      bottom: 24,
                      right: 24,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                      fontWeight: 700,
                      color: isActive ? 'rgba(167,139,250,0.9)' : 'rgba(167,139,250,0.4)',
                      opacity: 0.92,
                      lineHeight: 1,
                      letterSpacing: '-0.04em',
                      transition: 'color 0.4s ease',
                      textShadow: '0 2px 20px rgba(0,0,0,0.2)',
                    }}
                  >
                    {SLIDE_LABELS[i]}
                  </div>

                  {isActive && projectUrl && (
                    <div style={{ position: 'absolute', bottom: 24, left: 28 }}>
                      <a
                        href={projectUrl}
                        style={{
                          color: 'rgba(255,255,255,0.85)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          borderBottom: '1px solid rgba(255,255,255,0.4)',
                          paddingBottom: 2,
                          textDecoration: 'none',
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                      >
                        {viewProjectLabel}
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
