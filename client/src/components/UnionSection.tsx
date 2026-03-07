import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const SITE_MAUVE = '#523DCB';

/**
 * Section « L'union de deux forces » — image gauche, texte droite, CTA « Découvrir la suite ».
 */
export default function UnionSection() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();

  return (
    <section
      aria-label={t('home.union.headline')}
      style={{
        padding: 'clamp(4rem, 8vw, 6rem) 3%',
        marginBottom: 5 * 16,
        background: 'transparent',
      }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 md:gap-14 items-center"
        style={{
          maxWidth: 960,
          margin: '0 auto',
        }}
      >
        {/* Image gauche — grayscale */}
        <div
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            aspectRatio: '4/3',
            background: '#e5e7eb',
          }}
        >
          <img
            src="/demo/consulting-hero-cover.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(1)',
            }}
          />
        </div>

        {/* Texte droite */}
        <div style={{ minWidth: 0, background: '#fff', padding: 'clamp(2rem, 4vw, 3rem)', borderRadius: 16 }}>
          <h2
            style={{
              fontFamily: "'Neue Haas Unica Pro', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
              color: '#0A0A0A',
              margin: '0 0 0.5rem 0',
            }}
          >
            {t('home.union.headline')}
          </h2>
          <h3
            style={{
              fontFamily: "'Neue Haas Unica Pro', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              color: '#374151',
              margin: '0 0 1.25rem 0',
            }}
          >
            {t('home.union.subheadline')}
          </h3>
          <p
            style={{
              fontFamily: "'Neue Haas Unica Pro', sans-serif",
              fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
              lineHeight: 1.6,
              color: '#4b5563',
              margin: '0 0 1rem 0',
            }}
          >
            {t('home.union.paragraph1')}
          </p>
          <p
            style={{
              fontFamily: "'Neue Haas Unica Pro', sans-serif",
              fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
              lineHeight: 1.6,
              color: '#4b5563',
              margin: '0 0 1.5rem 0',
            }}
          >
            {t('home.union.paragraph2')}
          </p>
          <Link
            href={getLocalizedPath('/')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'Neue Haas Unica Pro', sans-serif",
              fontWeight: 600,
              fontSize: '0.95rem',
              color: SITE_MAUVE,
              textDecoration: 'none',
              transition: 'opacity 0.2s ease',
            }}
            className="hover:opacity-80"
          >
            {t('home.union.cta')}
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
