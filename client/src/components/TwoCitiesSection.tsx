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
      style={{
        padding: 'clamp(4rem, 8vw, 6rem) 3%',
        marginBottom: 5 * 16,
        background: '#EFE8E8',
      }}
    >
      <h2
        style={{
          fontFamily: "'Neue Haas Unica Pro', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
          color: '#0A0A0A',
          textAlign: 'center',
          margin: '0 0 clamp(2rem, 4vw, 3rem) 0',
        }}
      >
        {t('home.twoCities.title')}
      </h2>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
        style={{
          maxWidth: 'min(1200px, 85vw)',
          margin: '0 auto',
        }}
      >
        {/* Montréal */}
        <div
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            background: '#fff',
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            border: '1px solid #E5E2DE',
          }}
        >
          <div
            style={{
              height: 220,
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
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            background: '#fff',
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            border: '1px solid #E5E2DE',
          }}
        >
          <div
            style={{
              height: 220,
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
