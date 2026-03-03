import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { HOME_SERVICES } from '@/data/homeServices';

const DARK = '#0A0A0A';

/**
 * Section des 4 cartes services (Lab technologique, Studio créatif, Agence Comm & Marketing, Transition numérique).
 * Utilisée sur la page d'accueil et la page À propos pour garantir une présentation identique.
 */
export default function HomeServicesSection() {
  const getLocalizedPath = useLocalizedPath();

  return (
    <section style={{ padding: '5rem 3% 6rem', marginBottom: 5 * 16 }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-stretch">
        {HOME_SERVICES.map((service) => (
          <Link
            key={service.title}
            href={getLocalizedPath(service.path)}
            aria-label={`Voir ${service.title}`}
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
              {/* Zone image + icône ↗ */}
              <div style={{ position: 'relative', paddingTop: '60%', background: service.imageBg }}>
                <span
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: DARK,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
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
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: DARK,
                    margin: 0,
                    padding: '1.25rem 1.25rem 0.5rem',
                  }}
                >
                  {service.title}
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
                  {service.description}
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8,
                    padding: '1rem 1.25rem 1.25rem',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.7rem',
                        color: '#4b5563',
                        background: '#f3f4f6',
                        padding: '4px 10px',
                        borderRadius: 8,
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
