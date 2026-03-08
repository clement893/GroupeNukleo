import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSitePhotos, SITE_PHOTO_KEYS } from '@/contexts/SitePhotosContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { Download } from 'lucide-react';

const HEADLINE_PURPLE = '#8B2C8C';

const pressReleaseBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  fontFamily: "'Neue Haas Unica Pro', sans-serif",
  fontWeight: 600,
  fontSize: '0.95rem',
  padding: '0.75rem 1.5rem',
  borderRadius: 16,
  background: 'rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(16px) saturate(180%)',
  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.7)',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
  color: HEADLINE_PURPLE,
  textDecoration: 'none',
  transition: 'opacity 0.2s ease, box-shadow 0.2s ease',
  width: 'fit-content',
  marginTop: '1.5rem',
};

/**
 * Section « L'union de deux forces » — vidéo ou image gauche (B&W), bloc texte droite.
 */
export default function UnionSection() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const { getPhoto } = useSitePhotos();
  const [videoPath, setVideoPath] = useState<string | null>(null);
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    fetch('/api/union-video')
      .then((r) => r.json())
      .then((data) => setVideoPath(data?.path ?? null))
      .catch(() => setVideoPath(null));
  }, []);

  // Force muted + play (React/browser autoplay quirks)
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoPath) return;
    v.muted = true;
    v.defaultMuted = true;
    v.play().catch(() => {});
  }, [videoPath]);

  useEffect(() => {
    fetch('/api/press-release')
      .then((r) => r.json())
      .then((data) => setPdfPath(data?.path ?? null))
      .catch(() => setPdfPath(null));
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
        className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-0 xl:gap-10 items-stretch union-section-inner"
        style={{
          maxWidth: 'min(1200px, 92vw)',
          width: '100%',
          margin: '0 auto',
          overflow: 'hidden',
        }}
      >
        {/* Vidéo ou image gauche — noir et blanc, coins arrondis */}
        <div
          style={{
            overflow: 'hidden',
            borderRadius: 12,
            background: '#e5e7eb',
            aspectRatio: '4/3',
            minWidth: 0,
          }}
          className="xl:aspect-auto xl:min-h-0"
        >
          {videoPath ? (
            <video
              ref={videoRef}
              key={videoPath}
              src={videoPath}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={(e) => {
                const v = e.currentTarget;
                v.muted = true;
                v.defaultMuted = true;
                v.play().catch(() => {});
              }}
              onCanPlay={(e) => {
                e.currentTarget.play().catch(() => {});
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(1)',
              }}
            />
          ) : (
            <img
              src={getPhoto(SITE_PHOTO_KEYS.UNION_FALLBACK)}
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
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
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
            href={pdfPath || getLocalizedPath('/media')}
            {...(pdfPath && { download: 'communique-presse-nukleo.pdf' })}
            target="_blank"
            rel="noopener noreferrer"
            style={pressReleaseBtnStyle}
            className="hover:opacity-90 hover:shadow-lg"
            aria-label={t('home.union.cta')}
          >
            {t('home.union.cta')}
            <Download size={20} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
