import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { useLanguage } from '@/contexts/LanguageContext';
import { HOME_SERVICES } from '@/data/homeServices';

const DARK = '#0A0A0A';

// Mapping entre path de service et clé de traduction
const SERVICE_KEY_MAP: Record<string, string> = {
  '/services/tech': 'tech',
  '/services/studio': 'studio',
  '/services/agency': 'agency',
  '/services/consulting': 'consulting',
};

/**
 * Section des 4 cartes services (Lab technologique, Studio créatif, Agence Comm & Marketing, Transition numérique).
 * Utilisée sur la page d'accueil et la page À propos pour garantir une présentation identique.
 */
export default function HomeServicesSection() {
  const getLocalizedPath = useLocalizedPath();
  const { t } = useLanguage();

  return (
    <section style={{ padding: '5rem 3% 6rem', marginBottom: 5 * 16 }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
        {HOME_SERVICES.map((service) => {
          const key = SERVICE_KEY_MAP[service.path];
          const title = key ? t(`services.cards.${key}.title`) : service.title;
          const description = key ? t(`services.cards.${key}.description`) : service.description;
          const tags: string[] = key
            ? (t(`services.cards.${key}.tags`, { returnObjects: true }) as string[]) || service.tags
            : service.tags;

          return (
            <Link
              key={service.path}
              href={getLocalizedPath(service.path)}
              aria-label={`Voir ${title}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
              className="group block h-full"
            >
              <article
                style={{
                  borderRadius: 20,
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                }}
                className="group-hover:shadow-lg"
              >
                {/* Zone image / vidéo + icône ↗ */}
                <div
                  style={{
                    position: 'relative',
                    paddingTop: service.path === '/services/tech' ? '75%' : '60%',
                    background: service.imageBg,
                    overflow: 'hidden',
                  }}
                >
                  {service.heroVideo ? (
                    <video
                      src={service.heroVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                      aria-hidden
                    />
                  ) : service.heroImage ? (
                    <img
                      src={service.heroImage}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                      style={
                        service.path === '/services/consulting'
                          ? { objectPosition: '50% 0%', transform: 'scale(1.05)' }
                          : service.path === '/services/tech'
                            ? { objectPosition: '50% 50%', transform: 'scale(1.2)' }
                            : undefined
                      }
                      aria-hidden
                    />
                  ) : null}
                  <span
                    className="absolute top-3 right-3 w-9 h-9 rounded-[10px] flex items-center justify-center pointer-events-none
                      bg-white/40 backdrop-blur-[12px] border border-white/60 shadow-sm
                      transition-all duration-300 group-hover:!bg-white/75 group-hover:!border-white/90"
                    style={{
                      color: '#523DCB',
                      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                    }}
                    aria-hidden
                  >
                    <ArrowUpRight size={18} strokeWidth={2.5} />
                  </span>
                </div>
                {/* Bas du bloc — glassmorphism / hover: fond blanc 100% */}
                <div
                  className="flex flex-col flex-1 min-h-0 transition-all duration-300
                    bg-white/25 backdrop-blur-md border border-white/40
                    group-hover:bg-white group-hover:border-white"
                >
                  <h3
                    style={{
                      fontFamily: "'Google Sans Flex', sans-serif",
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: DARK,
                      margin: 0,
                      padding: '1.25rem 1.25rem 0.5rem',
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: '#6b7280',
                      lineHeight: 1.55,
                      margin: 0,
                      padding: '0 1.25rem',
                      flex: 1,
                    }}
                  >
                    {description}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8,
                      padding: '1rem 1.25rem 1.25rem',
                      fontFamily: "'Google Sans Flex', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {(Array.isArray(tags) ? tags : service.tags).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          display: 'inline-block',
                          width: 'fit-content',
                          background: 'rgba(255, 255, 255, 0.4)',
                          backdropFilter: 'blur(16px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                          border: '1px solid rgba(255, 255, 255, 0.8)',
                          borderRadius: 12,
                          padding: '0.35rem 0.75rem',
                          boxShadow: '0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.85)',
                          fontFamily: "'Google Sans Flex', sans-serif",
                          fontWeight: 400,
                          fontSize: '0.6rem',
                          color: '#374151',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
