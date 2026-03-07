import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink } from 'lucide-react';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const HEADLINE_PURPLE = '#8B2C8C';
const FALLBACK_IMAGE = '/demo/consulting-hero-cover.png';

/**
 * Section « L'union de deux forces » — vidéo ou image gauche (B&W), bloc texte droite.
 */
export default function UnionSection() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const [videoPath, setVideoPath] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/union-video')
      .then((r) => r.json())
      .then((data) => setVideoPath(data?.path ?? null))
      .catch(() => setVideoPath(null));
  }, []);

  return (
    <section
      aria-label={t('home.union.headline')}
      className="union-section"
      style={{
        padding: 'clamp(4rem, 8vw, 6rem) var(--site-margin, 3%)',
        marginBottom: 5 * 16,
        background: 'transparent',
      }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-0 md:gap-10 items-stretch union-section-inner"
        style={{
          maxWidth: 'min(1200px, 90vw)',
          margin: '0 auto',
        }}
      >
        {/* Vidéo ou image gauche — noir et blanc, coins arrondis */}
        <div
          style={{
            overflow: 'hidden',
            borderRadius: 12,
            background: '#e5e7eb',
            aspectRatio: '4/3',
          }}
          className="md:aspect-auto"
        >
          {videoPath ? (
            <video
              src={videoPath}
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(1)',
              }}
            />
          ) : (
            <img
              src={FALLBACK_IMAGE}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(1)',
              }}
            />
          )}
        </div>

        {/* Bloc texte droite — sans fond */}
        <div
          className="union-section-text"
          style={{
            minWidth: 0,
            background: 'transparent',
            padding: 'clamp(2rem, 4vw, 3rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: "'Neue Haas Unica Pro', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
              color: HEADLINE_PURPLE,
              margin: '0 0 0.5rem 0',
            }}
          >
            {t('home.union.headline')}
          </h2>
          <h3
            style={{
              fontFamily: "'Neue Haas Unica Pro', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
              color: '#1f2937',
              margin: '0 0 1.25rem 0',
            }}
          >
            {t('home.union.subheadline')}
          </h3>
          <p
            style={{
              fontFamily: "'Neue Haas Unica Pro', sans-serif",
              fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
              lineHeight: 1.6,
              color: '#6b7280',
              margin: '0 0 1rem 0',
            }}
          >
            {t('home.union.paragraph1')}
          </p>
          <p
            style={{
              fontFamily: "'Neue Haas Unica Pro', sans-serif",
              fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
              lineHeight: 1.6,
              color: '#6b7280',
              margin: '0 0 1.5rem 0',
            }}
          >
            {t('home.union.paragraph2')}
          </p>
          <a
            href={getLocalizedPath('/media')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'Neue Haas Unica Pro', sans-serif",
              fontWeight: 600,
              fontSize: '0.95rem',
              color: HEADLINE_PURPLE,
              textDecoration: 'none',
              transition: 'opacity 0.2s ease',
              width: 'fit-content',
            }}
            className="hover:opacity-80"
          >
            {t('home.union.cta')}
            <ExternalLink size={18} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
