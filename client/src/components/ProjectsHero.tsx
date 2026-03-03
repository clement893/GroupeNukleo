import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
  const labelText = viewProjectLabel.replace(/\s*[→]\s*$/u, '').trim() || viewProjectLabel;

  return (
    <section style={{ padding: 'clamp(6rem, 12vh, 8rem) 0 clamp(2rem, 4vw, 4rem)', overflow: 'visible' }}>
      <div className="container">
        {/* Titre + sous-titre — même disposition que page d'accueil et À propos */}
        <div style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)', overflow: 'visible' }}>
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.5rem, 8vw, 9rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              margin: '0 0 0.25rem 0',
              paddingBottom: '0.18em',
              display: 'inline-block',
              overflow: 'visible',
              background: 'linear-gradient(to right, #6B1817, #5636AD)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {headline}
          </h1>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              color: '#6b7280',
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>

        {/* Triptyque 3 panneaux (comme page principale) */}
        {triptychImages.length > 0 && (
          <div
            className="w-full overflow-hidden relative rounded-xl"
            style={{
              height: 'clamp(480px, 82vh, 870px)',
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
                        filter: isActive ? 'grayscale(0)' : 'grayscale(1) brightness(0.55)',
                        objectPosition: isActive ? 'center' : 'top',
                      }}
                    />
                  </div>
                  <div style={{ position: 'absolute', inset: 0, background: isActive ? 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 25%)' : 'rgba(0,0,0,0.22)', transition: 'background 0.5s ease' }} />

                  <div
                    style={{
                      position: 'absolute',
                      bottom: 24,
                      ...(isActive ? { right: 24 } : { left: '50%', transform: 'translateX(-50%)' }),
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                      fontWeight: 700,
                      color: '#ffffff',
                      opacity: 0.92,
                      lineHeight: 1,
                      letterSpacing: '-0.04em',
                      transition: 'color 0.4s ease, left 0.4s ease, right 0.4s ease, transform 0.4s ease',
                      textShadow: '0 2px 20px rgba(0,0,0,0.2)',
                    }}
                  >
                    {SLIDE_LABELS[i]}
                  </div>

                  {isActive && projectUrl && (
                    <div style={{ position: 'absolute', bottom: 24, left: 28 }}>
                      <a
                        href={projectUrl}
                        className="projects-view-btn"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '1rem',
                          color: 'rgba(255,255,255,0.95)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          padding: '0.5rem 1rem',
                          borderRadius: 9999,
                          background: 'rgba(255, 255, 255, 0.25)',
                          backdropFilter: 'blur(16px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
                          transition: 'background 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
                        }}
                      >
                        <span>{labelText}</span>
                        <ArrowRight className="projects-view-btn-arrow" strokeWidth={2.5} size={18} style={{ flexShrink: 0 }} />
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
