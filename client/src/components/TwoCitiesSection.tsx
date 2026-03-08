import { useLanguage } from '@/contexts/LanguageContext';

const MONTREAL_MAP_URL = 'https://www.google.com/maps?q=7236+Rue+Waverly+Montreal+QC+H2R+0C2&output=embed';
const HALIFAX_MAP_URL = 'https://www.google.com/maps?q=1800+Argyle+St+Unit+801+Halifax+NS+B3J+3N8&output=embed';

/**
 * Section « 2 villes pour être plus proche de vous » — cartes + adresses Montréal et Halifax.
 */
export default function TwoCitiesSection() {
  const { t } = useLanguage();

  return (
    <section
      aria-label={t('home.twoCities.title')}
      className="two-cities-section"
      style={{
        padding: 'clamp(4rem, 8vw, 6rem) var(--site-margin, 3%)',
        marginBottom: 5 * 16,
        background: '#EFE8E8',
      }}
    >
      <h2
        style={{
          fontFamily: "'Neue Haas Unica Pro', sans-serif",
          fontWeight: 400,
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          textAlign: 'center',
          margin: '0 auto clamp(2rem, 4vw, 3rem) auto',
          display: 'block',
          maxWidth: '90%',
          background: 'linear-gradient(to right, #6B1817, #523DCB)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {t('home.twoCities.title')}
      </h2>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 two-cities-inner"
        style={{
          maxWidth: 'min(780px, 60vw)',
          margin: '0 auto',
        }}
      >
        {/* Montréal */}
        <div
          className="aspect-square"
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            background: '#fff',
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            border: '1px solid #E5E2DE',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            className="two-cities-map flex-1 min-h-0"
            style={{
              width: '100%',
              background: '#e5e7eb',
            }}
          >
            <iframe
              title="Carte Montréal - Groupe Nukleo"
              src={MONTREAL_MAP_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div
            className="shrink-0"
            style={{
              padding: '1.25rem 1.5rem',
              fontFamily: "'Neue Haas Unica Pro', sans-serif",
              fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
              lineHeight: 1.5,
              color: '#374151',
            }}
          >
            {t('home.twoCities.montrealAddress')}
          </div>
        </div>

        {/* Halifax */}
        <div
          className="aspect-square"
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            background: '#fff',
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            border: '1px solid #E5E2DE',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            className="two-cities-map flex-1 min-h-0"
            style={{
              width: '100%',
              background: '#e5e7eb',
            }}
          >
            <iframe
              title="Carte Halifax - Groupe Nukleo"
              src={HALIFAX_MAP_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div
            className="shrink-0"
            style={{
              padding: '1.25rem 1.5rem',
              fontFamily: "'Neue Haas Unica Pro', sans-serif",
              fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
              lineHeight: 1.5,
              color: '#374151',
            }}
          >
            {t('home.twoCities.halifaxAddress')}
          </div>
        </div>
      </div>
    </section>
  );
}
