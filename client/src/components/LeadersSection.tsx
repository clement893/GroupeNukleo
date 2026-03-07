import { useLanguage } from '@/contexts/LanguageContext';

const LEADERS = [
  {
    id: 'clement',
    image: '/team/Clement.jpg',
    imageAltKey: 'home.leaders.clement.name',
  },
  {
    id: 'lionel',
    image: '/team/LionelPardin.jpg',
    imageAltKey: 'home.leaders.lionel.name',
  },
] as const;

/**
 * Section deux cartes profil : Clément Roy et Lionel Pardin (photo à gauche, texte à droite).
 */
export default function LeadersSection() {
  const { t } = useLanguage();

  return (
    <section
      aria-label={t('home.leaders.ariaLabel') || 'Les leaders du Groupe Nukleo'}
      style={{
        background: 'transparent',
        padding: 'clamp(4rem, 8vw, 6rem) 3% clamp(5rem, 10vw, 7rem)',
        marginTop: 0,
        marginBottom: 5 * 16,
      }}
    >
      <div
        style={{
          maxWidth: 'min(1200px, 85vw)',
          margin: '0 auto',
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
        }}
      >
        <p
          style={{
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            margin: 0,
            display: 'inline-block',
            width: 'fit-content',
            maxWidth: '100%',
            background: 'linear-gradient(to right, #6B1817, #523DCB)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {t('home.companyBlocks.paragraph')}
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gap: 'clamp(2rem, 5vw, 3.5rem)',
          maxWidth: 'min(1200px, 85vw)',
          margin: '0 auto',
        }}
        className="grid grid-cols-1 md:grid-cols-2 leaders-grid"
      >
        {LEADERS.map((leader) => (
          <article
            key={leader.id}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(160px, 1fr) 1.6fr',
              gap: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              alignItems: 'center',
              background: 'rgb(243, 239, 236)',
              borderRadius: 14,
              padding: 'clamp(1.5rem, 2.5vw, 2.25rem)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
              border: '1px solid #E5E2DE',
              minHeight: 240,
            }}
          >
            <div
              style={{
                borderRadius: '50%',
                overflow: 'hidden',
                aspectRatio: '1',
                minHeight: 0,
                background: '#e5e7eb',
              }}
            >
              <img
                src={leader.image}
                alt={t(leader.imageAltKey)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(1)',
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                minWidth: 0,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(0.95rem, 1.25vw, 1.15rem)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#0A0A0A',
                  margin: '0 0 0.35rem 0',
                }}
              >
                {t(`home.leaders.${leader.id}.name`)}
              </h3>
              <p
                style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: '#374151',
                  margin: '0 0 0.85rem 0',
                }}
              >
                {t(`home.leaders.${leader.id}.title`)}
              </p>
              <p
                style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(0.8rem, 1.05vw, 0.95rem)',
                  lineHeight: 1.6,
                  color: '#6b7280',
                  margin: 0,
                  flex: 1,
                }}
              >
                {t(`home.leaders.${leader.id}.description`)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
