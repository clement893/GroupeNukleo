import { useLanguage } from '@/contexts/LanguageContext';

const COMPANIES = [
  { name: 'nukleo,', url: 'https://nukleo.com', ariaLabel: 'Nukleo — visiter le site', logo: '/demo/NukleoLogo.svg' },
  { name: 'Rouge On Blue', url: 'https://rougeonblue.com', ariaLabel: 'Rouge On Blue — visiter le site', logo: '/demo/RobLogo.svg' },
] as const;

/**
 * Deux blocs glassmorphism pour les deux entreprises (Nukleo, Rouge On Blue)
 * avec bouton "Visitez le site" vers les sites respectifs.
 */
export default function CompanyBlocksSection() {
  const { t } = useLanguage();
  const visitLabel = t('home.companyBlocks.visitSite') || 'Visiter le site >';

  return (
    <section
      aria-label={t('home.companyBlocks.ariaLabel') || 'Nos entreprises'}
      style={{ padding: '5rem 3% 6rem', marginBottom: 5 * 16 }}
    >
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 mx-auto"
        style={{ maxWidth: 'min(1200px, 85vw)' }}
      >
        {COMPANIES.map((company) => (
          <a
            key={company.url}
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={company.ariaLabel}
            className="group block"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <article
              style={{
                background: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                borderRadius: 24,
                padding: 'clamp(2rem, 5vw, 3rem)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
                border: '1px solid rgba(255,255,255,0.5)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: 320,
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
              }}
              className="group-hover:shadow-xl"
            >
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name.replace(/,$/, '')}
                  style={{
                    maxHeight: 'clamp(3rem, 8vw, 5rem)',
                    width: 'auto',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <h3
                  style={{
                    fontFamily: "'Neue Haas Unica Pro', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                    color: '#0A0A0A',
                    margin: 0,
                    textAlign: 'center',
                  }}
                >
                  {company.name}
                </h3>
              )}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  marginTop: 'auto',
                  padding: '12px 24px',
                  background: 'rgba(139, 123, 184, 0.5)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  color: '#fff',
                  borderRadius: 9999,
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem',
                  border: '1px solid rgba(255,255,255,0.3)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
                  transition: 'opacity 0.2s ease, background 0.2s ease',
                }}
                className="group-hover:opacity-95"
              >
                {visitLabel}
              </span>
            </article>
          </a>
        ))}
      </div>
    </section>
  );
}
