import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

export interface ProjectsHeroTriptychItem {
  /** Image src (full path e.g. /projects/xxx.jpg) */
  img: string;
  /** Project title displayed above the button */
  title?: string;
  /** Slide label: "01", "02", "03" */
  num: string;
}

export interface ProjectsHeroTriptychProps {
  /** 3 items for the triptych panels */
  items: ProjectsHeroTriptychItem[];
  /** URL for "View project" button. If getProjectUrl is provided, it takes precedence per slide. */
  projectUrl?: string;
  /** Returns URL per slide (e.g. project detail page). Overrides projectUrl when provided. */
  getProjectUrl?: (index: number) => string | null;
  /** Label for the button (e.g. "Voir le projet") */
  viewProjectLabel?: string;
  /** Container height. Default: clamp(480px, 82vh, 870px). Use "100%" for hero grid. */
  height?: string;
}

const DEFAULT_LABEL = 'Voir le projet';

export default function ProjectsHeroTriptych({
  items,
  projectUrl,
  getProjectUrl,
  viewProjectLabel = DEFAULT_LABEL,
  height = 'clamp(480px, 82vh, 870px)',
}: ProjectsHeroTriptychProps) {
  const [active, setActive] = useState(0);
  const slides = items.slice(0, 3);
  const labelText = (viewProjectLabel || DEFAULT_LABEL).replace(/\s*[→]\s*$/u, '').trim() || DEFAULT_LABEL;

  if (slides.length === 0) return null;

  return (
    <div
      className="w-full overflow-hidden relative rounded-xl"
      style={{
        height,
        minHeight: 320,
        display: 'flex',
        gap: 21,
      }}
    >
      {slides.map((item, i) => {
        const isActive = i === active;
        const url = getProjectUrl ? getProjectUrl(i) : projectUrl ?? null;
        const imgSrc = item.img.startsWith('/') ? item.img : `/projects/${item.img}`;

        return (
          <div
            key={`${item.num}-${i}`}
            role="button"
            tabIndex={0}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActive(i);
              }
            }}
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
            <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <OptimizedImage
                src={imgSrc}
                alt={item.title || ''}
                width={800}
                height={600}
                fill
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'low'}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="w-full h-full transition-[filter] duration-500 ease-out object-cover"
                style={{
                  filter: isActive ? 'grayscale(0)' : 'grayscale(1) brightness(0.55)',
                  objectPosition: isActive ? 'center' : 'top',
                }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: isActive
                  ? 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 25%)'
                  : 'rgba(0,0,0,0.22)',
                transition: 'background 0.5s ease',
              }}
            />

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
              {item.num}
            </div>

            {isActive && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 24,
                  left: 28,
                  right: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  alignItems: 'flex-start',
                }}
              >
                {item.title && (
                  <h3
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                      lineHeight: 1.15,
                      letterSpacing: '-0.02em',
                      color: '#ffffff',
                      margin: 0,
                      textShadow: '0 2px 20px rgba(0,0,0,0.35)',
                    }}
                  >
                    {item.title}
                  </h3>
                )}
                {url && (
                  <a
                    href={url}
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
                    <ArrowRight
                      className="projects-view-btn-arrow"
                      strokeWidth={2.5}
                      size={18}
                      style={{ flexShrink: 0 }}
                    />
                  </a>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
