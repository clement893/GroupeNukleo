import { useLanguage } from '@/contexts/LanguageContext';
import { useSitePhotos, SITE_PHOTO_KEYS } from '@/contexts/SitePhotosContext';
import PageLayout from '@/components/PageLayout';
import CompanyBlocksSection from '@/components/CompanyBlocksSection';
import LeadersSection from '@/components/LeadersSection';
import UnionSection from '@/components/UnionSection';
import TwoCitiesSection from '@/components/TwoCitiesSection';

const DARK = '#0A0A0A';

// ─── Composant principal ─────────────────────────────────────────────────────

export default function HomepageDemo5() {
  const { t } = useLanguage();
  const { getPhoto } = useSitePhotos();

  return (
    <PageLayout>
      <div
        style={{
          minHeight: '100vh',
          fontFamily: 'var(--font-body, sans-serif)',
          color: DARK,
          background: '#EFE8E8',
        }}
      >
        {/* ── Contenu principal ─────────────────────────────────────────────── */}
        <div className="main-content-padding" style={{ position: 'relative', zIndex: 10, paddingTop: 'clamp(5rem, 15vw, 8rem)' }}>
          <div className="content-max-width" style={{ paddingLeft: 'var(--site-margin, 3%)', paddingRight: 'var(--site-margin, 3%)', width: '100%' }}>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION HERO — Le Groupe Nukleo + paragraphe à droite
        ════════════════════════════════════════════════════════════════════ */}
        <section
          className="hero-section-grid hero-max-width"
          style={{
          minHeight: '27.5vh',
          paddingTop: 'clamp(3.5rem, 8.75vh, 7rem)',
          paddingBottom: 'clamp(2rem, 5vh, 4rem)',
          paddingLeft: 0,
          paddingRight: 0,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 420px)',
          gridTemplateRows: 'auto auto',
          gap: 'clamp(2rem, 8vw, 7rem)',
          background: 'transparent',
          boxSizing: 'border-box',
          margin: '0 auto',
        }}>
          <h1
            className="hero-title-mobile-wrap"
            style={{
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 8vw, 9rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            wordSpacing: '0.12em',
            margin: 0,
            gridColumn: 1,
            gridRow: 1,
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            background: 'linear-gradient(to right, #6B1817, #523DCB)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            <span className="hero-title-mobile-wrap" style={{ display: 'block', whiteSpace: 'nowrap' }}>{t('home.heroLine1')}</span>
            <span className="hero-title-mobile-wrap" style={{ display: 'block', whiteSpace: 'nowrap' }}>{t('home.heroLine2')}</span>
          </h1>
          <p style={{
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
            fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
            lineHeight: 1.5,
            color: '#374151',
            margin: 0,
            gridColumn: 2,
            gridRow: 1,
            alignSelf: 'flex-start',
            textAlign: 'left',
            whiteSpace: 'pre-line',
          }}>
            {t('home.heroDescription')}
          </p>
          <div
            style={{
              width: '100%',
              gridColumn: '1 / -1',
              gridRow: 2,
              marginTop: 0,
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: 0,
              overflow: 'hidden',
              aspectRatio: '21/9',
              minHeight: 280,
              background: 'linear-gradient(135deg, #6B1817 0%, #523DCB 100%)',
            }}
          >
            <img
              src={getPhoto(SITE_PHOTO_KEYS.HERO_COVER)}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 2 — QUI SOMMES-NOUS + CTA
        ════════════════════════════════════════════════════════════════════ */}
        <section className="section-qui-sommes-nous" style={{
          padding: '5rem 0 6rem',
          marginBottom: 0,
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: 'clamp(0.8125rem, 1vw, 1.0625rem)',
            fontWeight: 400,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#374151',
            marginBottom: 28,
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
          }}>
            {t('home.audacious')}
          </p>
          <h2 style={{
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            margin: '0 0 2.5rem 0',
            display: 'inline-block',
            width: 'fit-content',
            maxWidth: '90%',
            background: 'linear-gradient(to right, #6B1817, #523DCB)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {t('home.audaciousTagline')}
          </h2>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 3 — L'UNION DE DEUX FORCES (image + texte + CTA)
        ════════════════════════════════════════════════════════════════════ */}
        <UnionSection />

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 4 — DEUX BLOCS ENTREPRISES (Nukleo, Rouge On Blue)
        ════════════════════════════════════════════════════════════════════ */}
        <CompanyBlocksSection />

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 5 — CARTES LEADERS (Clément Roy, Lionel Pardin)
        ════════════════════════════════════════════════════════════════════ */}
        <LeadersSection />

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 6 — 2 VILLES (Montréal, Halifax)
        ════════════════════════════════════════════════════════════════════ */}
        <TwoCitiesSection />

          </div>
        </div>
      </div>
    </PageLayout>
  );
}
