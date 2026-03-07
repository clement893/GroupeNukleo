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
        background: '#F8F7F4',
        padding: '4rem 3% 6rem',
        marginTop: 0,
        marginBottom: 5 * 16,
      }}
    >
      <div
        style={{
          maxWidth: '50rem',
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
        }}
      >
        <p
          style={{
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            lineHeight: 1.5,
            color: '#7A3E50',
            textAlign: 'left',
            margin: 0,
          }}
        >
          {t('home.companyBlocks.paragraph')}
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gap: 'clamp(1.5rem, 4vw, 3rem)',
          maxWidth: 960,
          margin: '0 auto',
        }}
        className="grid grid-cols-1 md:grid-cols-2 leaders-grid"
      >
        {LEADERS.map((leader) => (
          <article
            key={leader.id}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(140px, 1fr) 1.5fr',
              gap: 'clamp(1rem, 2vw, 1.5rem)',
              alignItems: 'stretch',
              background: '#F2F0ED',
              borderRadius: 10,
              padding: 'clamp(1.25rem, 2vw, 1.75rem)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              border: '1px solid #E0DED7',
              minHeight: 220,
            }}
          >
            <div
              style={{
                borderRadius: 10,
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
                  fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#333333',
                  margin: '0 0 0.25rem 0',
                }}
              >
                {t(`home.leaders.${leader.id}.name`)}
              </h3>
              <p
                style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(0.7rem, 0.95vw, 0.85rem)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#555555',
                  margin: '0 0 0.75rem 0',
                }}
              >
                {t(`home.leaders.${leader.id}.title`)}
              </p>
              <p
                style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(0.8rem, 1vw, 0.95rem)',
                  lineHeight: 1.6,
                  color: '#555555',
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
