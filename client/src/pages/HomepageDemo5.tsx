import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { MapPin } from 'lucide-react';
import { SplitCTAButton } from '@/components/SplitCTAButton';
import PageLayout from '@/components/PageLayout';
import CTAPerformSection from '@/components/CTAPerformSection';
// ─── Constantes ──────────────────────────────────────────────────────────────
const BORDEAUX = '#7B1D3A';
const CREAM = '#F5F3EF';
const DARK = '#0A0A0A';
const SITE_MAUVE = '#523DCB';
const LAVENDER_BG = '#F8F5F9';

// ─── Composant principal ─────────────────────────────────────────────────────
export default function HomepageDemo5() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();

  const NAV_LINKS = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.contact'), href: '#contact' },
  ];

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
        <div style={{ position: 'relative', zIndex: 10, paddingTop: 'clamp(5rem, 15vw, 8rem)' }}>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION HERO — Le Groupe Nukleo (titre dégradé + tagline à droite + photo équipe)
        ════════════════════════════════════════════════════════════════════ */}
        {/* Bloc 1 — Titre (dégradé rouge→violet) à gauche + tagline à droite sur fond beige */}
        <section
          style={{
            background: CREAM,
            paddingTop: 'clamp(3.5rem, 8.75vh, 7rem)',
            paddingBottom: 'clamp(2rem, 5vh, 4rem)',
            paddingLeft: '3%',
            paddingRight: '3%',
            boxSizing: 'border-box',
          }}
        >
          <div
            className="hero-title-tagline"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              gap: 'clamp(1.5rem, 3vw, 2.5rem)',
              maxWidth: '100%',
            }}
          >
            <style>{`
              @media (min-width: 768px) {
                .hero-title-tagline {
                  flex-direction: row;
                  align-items: flex-end;
                  justify-content: space-between;
                  gap: 2rem;
                }
                .hero-tagline-right { margin-left: auto; text-align: right; }
              }
            `}</style>
            {/* Titre : Le Groupe + Nukleo avec dégradé rouge → violet */}
            <div style={{ flexShrink: 0 }}>
              <h1
                style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(2.25rem, 9vw, 6.5rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.04em',
                  margin: 0,
                  background: 'linear-gradient(90deg, #6B1817 0%, #7B1D3A 35%, #523DCB 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <span style={{ display: 'block', fontWeight: 600, fontSize: '0.38em', letterSpacing: '-0.02em' }}>Le Groupe</span>
                Nukleo
              </h1>
            </div>
            <p
              className="hero-tagline-right"
              style={{
                fontFamily: 'var(--font-body, sans-serif)',
                fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
                lineHeight: 1.55,
                color: DARK,
                margin: 0,
                maxWidth: '48ch',
              }}
            >
              {t('home.heroTagline')}
            </p>
          </div>
        </section>

        {/* Bloc 2 — Photo d'équipe (dégradé rouge/magenta → bleu/violet) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            minHeight: 'min(50vh, 480px)',
            overflow: 'hidden',
            background: 'linear-gradient(to right, #8B1538, #523DCB)',
          }}
        >
          <img
            src="/demo/team-hero.png"
            alt={t('alt.teamHero') || "L'équipe Nukleo"}
            loading="eager"
            fetchPriority="high"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = 'none';
              el.src = '/demo/team-hero.jpg';
              el.style.display = '';
            }}
          />
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 2 — QUI SOMMES-NOUS (en-tête + carte unique image+texte + 2 CTA)
        ════════════════════════════════════════════════════════════════════ */}
        <section id="about" className="scroll-mt-24" style={{
          padding: '5rem 3% 6rem',
          marginBottom: 0,
          background: LAVENDER_BG,
        }}>
          {/* En-tête : label + titre deux couleurs */}
          <p style={{
            fontSize: 'clamp(0.75rem, 0.95vw, 0.9375rem)',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#374151',
            marginBottom: '1.25rem',
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
            textAlign: 'center',
          }}>
            {t('home.quiSommesNous.sectionLabel')}
          </p>
          <h2 style={{
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.75rem, 4vw, 3.25rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            margin: '0 auto 3.5rem',
            textAlign: 'center',
            maxWidth: 'min(36ch, 100%)',
          }}>
            <span style={{ color: BORDEAUX }}>{t('home.quiSommesNous.titlePart1')}</span>
            <br />
            <span style={{ color: SITE_MAUVE }}>{t('home.quiSommesNous.titlePart2')}</span>
          </h2>

          {/* Carte unique : image gauche (pleine hauteur) + texte droite */}
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{
              maxWidth: 1100,
              margin: '0 auto 3rem',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              background: '#fff',
              minHeight: 320,
            }}
          >
            <div
              style={{
                minHeight: 280,
                background: '#e5e5e5',
              }}
            >
              <img
                src="/demo/qui-sommes-nous.jpg"
                alt={t('home.quiSommesNous.imageAlt')}
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: 280,
                  objectFit: 'cover',
                  filter: 'grayscale(100%)',
                }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{
                fontFamily: "'Neue Haas Unica Pro', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
                color: DARK,
                margin: '0 0 0.35rem 0',
              }}>
                {t('home.quiSommesNous.subtitle1')}
              </h3>
              <h4 style={{
                fontFamily: "'Neue Haas Unica Pro', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                color: DARK,
                margin: '0 0 1.25rem 0',
              }}>
                {t('home.quiSommesNous.subtitle2')}
              </h4>
              <p style={{
                fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                color: DARK,
                lineHeight: 1.6,
                margin: '0 0 1rem 0',
              }}>
                {t('home.quiSommesNous.paragraph1')}
              </p>
              <p style={{
                fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                color: DARK,
                lineHeight: 1.6,
                margin: '0 0 1.5rem 0',
              }}>
                {t('home.quiSommesNous.paragraph2')}
              </p>
              <a
                href={getLocalizedPath('/about')}
                style={{
                  fontSize: 'clamp(0.875rem, 1vw, 0.95rem)',
                  color: SITE_MAUVE,
                  fontWeight: 600,
                  textDecoration: 'underline',
                  alignSelf: 'flex-start',
                }}
              >
                {t('home.quiSommesNous.ctaStory')} &gt;
              </a>
            </div>
          </div>

          {/* Cartes Nukleo et Rouge on Blue : fond clair, bouton violet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8 max-w-[700px] mx-auto">
            <a
              href="https://nukleo.ca"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('home.quiSommesNous.visitSite') + ' Nukleo'}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '2rem 1.5rem',
                borderRadius: 12,
                background: '#fff',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                textDecoration: 'none',
                color: DARK,
                minHeight: 140,
              }}
            >
              <span
                style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(1.25rem, 2.2vw, 1.5rem)',
                  letterSpacing: '-0.02em',
                  color: DARK,
                }}
              >
                {t('home.quiSommesNous.cardNukleo')}
              </span>
              <span
                style={{
                  display: 'inline-block',
                  marginTop: '1rem',
                  padding: '0.5rem 1.25rem',
                  borderRadius: 8,
                  background: SITE_MAUVE,
                  color: '#fff',
                  fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)',
                  fontWeight: 600,
                }}
              >
                {t('home.quiSommesNous.visitSite')} &gt;
              </span>
            </a>
            <a
              href="https://rougeonblue.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('home.quiSommesNous.visitSite') + ' Rouge on Blue'}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '2rem 1.5rem',
                borderRadius: 12,
                background: '#fff',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                textDecoration: 'none',
                color: DARK,
                minHeight: 140,
              }}
            >
              <span style={{
                fontFamily: "'Neue Haas Unica Pro', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.35rem, 1.8vw, 1.6rem)',
                color: DARK,
              }}>
                {t('home.quiSommesNous.cardRougeOnBlue')}
              </span>
              <span
                style={{
                  display: 'inline-block',
                  marginTop: '1rem',
                  padding: '0.5rem 1.25rem',
                  borderRadius: 8,
                  background: SITE_MAUVE,
                  color: '#fff',
                  fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)',
                  fontWeight: 600,
                }}
              >
                {t('home.quiSommesNous.visitSite')} &gt;
              </span>
            </a>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 2a — VISION PARTAGÉE : Dirigeants + Bureaux
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '5rem 3%', marginBottom: 0, background: CREAM }}>
          {/* Intro */}
          <p style={{
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
            color: SITE_MAUVE,
            margin: '0 0 0.5rem 0',
          }}>
            {t('home.leadersSection.introLine1')}
          </p>
          <p style={{
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.05rem, 1.35vw, 1.25rem)',
            color: DARK,
            lineHeight: 1.4,
            margin: '0 0 2.5rem 0',
            maxWidth: '42ch',
          }}>
            {t('home.leadersSection.introLine2')}
          </p>

          {/* Cartes dirigeants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-14">
            {/* Clément Roy */}
            <div style={{
              display: 'flex',
              gap: '1.25rem',
              padding: '1.5rem',
              borderRadius: 16,
              background: '#fff',
              boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
            }}>
              <div style={{
                flexShrink: 0,
                width: 120,
                height: 120,
                borderRadius: 12,
                overflow: 'hidden',
                background: '#e5e5e5',
              }}>
                <img
                  src="/team/Clement.webp"
                  alt={t('home.leadersSection.clementImageAlt')}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%)',
                  }}
                />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
                  letterSpacing: '0.04em',
                  color: DARK,
                  marginBottom: 2,
                }}>
                  {t('home.leadersSection.clementName')}
                </div>
                <div style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(0.75rem, 0.9vw, 0.85rem)',
                  letterSpacing: '0.02em',
                  color: '#374151',
                  marginBottom: '0.75rem',
                }}>
                  {t('home.leadersSection.clementTitle')}
                </div>
                <p style={{
                  fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)',
                  color: '#4b5563',
                  lineHeight: 1.55,
                  margin: 0,
                }}>
                  {t('home.leadersSection.clementBio')}
                </p>
              </div>
            </div>
            {/* Lionel Pardin */}
            <div style={{
              display: 'flex',
              gap: '1.25rem',
              padding: '1.5rem',
              borderRadius: 16,
              background: '#fff',
              boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
            }}>
              <div style={{
                flexShrink: 0,
                width: 120,
                height: 120,
                borderRadius: 12,
                overflow: 'hidden',
                background: '#e5e5e5',
              }}>
                <img
                  src="/team/Lionel.png"
                  alt={t('home.leadersSection.lionelImageAlt')}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%)',
                  }}
                />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
                  letterSpacing: '0.04em',
                  color: DARK,
                  marginBottom: 2,
                }}>
                  {t('home.leadersSection.lionelName')}
                </div>
                <div style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(0.75rem, 0.9vw, 0.85rem)',
                  letterSpacing: '0.02em',
                  color: '#374151',
                  marginBottom: '0.75rem',
                }}>
                  {t('home.leadersSection.lionelTitle')}
                </div>
                <p style={{
                  fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)',
                  color: '#4b5563',
                  lineHeight: 1.55,
                  margin: 0,
                }}>
                  {t('home.leadersSection.lionelBio')}
                </p>
              </div>
            </div>
          </div>

          {/* Titre bureaux */}
          <h3 style={{
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(1.1rem, 1.4vw, 1.3rem)',
            color: SITE_MAUVE,
            margin: '0 0 1.5rem 0',
            textAlign: 'center',
          }}>
            {t('home.leadersSection.locationsTitle')}
          </h3>

          {/* Cartes lieux */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[900px] mx-auto">
            {/* Montréal */}
            <div style={{
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              background: '#f0f0f0',
            }}>
              <div style={{
                position: 'relative',
                height: 180,
                background: '#e5e5e5',
              }}>
                <img
                  src="/demo/map-montreal.jpg"
                  alt={t('home.leadersSection.mapMontrealAlt')}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%)',
                  }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                padding: '1rem 1.25rem',
              }}>
                <MapPin size={18} style={{ color: BORDEAUX, flexShrink: 0, marginTop: 2 }} aria-hidden />
                <span style={{ fontSize: 'clamp(0.875rem, 1vw, 0.95rem)', color: DARK, lineHeight: 1.4 }}>
                  {t('contact.addressMontreal')}
                </span>
              </div>
            </div>
            {/* Halifax */}
            <div style={{
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              background: '#f0f0f0',
            }}>
              <div style={{
                position: 'relative',
                height: 180,
                background: '#e5e5e5',
              }}>
                <img
                  src="/demo/map-halifax.jpg"
                  alt={t('home.leadersSection.mapHalifaxAlt')}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%)',
                  }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                padding: '1rem 1.25rem',
              }}>
                <MapPin size={18} style={{ color: BORDEAUX, flexShrink: 0, marginTop: 2 }} aria-hidden />
                <span style={{ fontSize: 'clamp(0.875rem, 1vw, 0.95rem)', color: DARK, lineHeight: 1.4 }}>
                  {t('contact.addressHalifax')}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 7 — PRÊT.E À PERFORMER? (composant partagé)
        ════════════════════════════════════════════════════════════════════ */}
        <CTAPerformSection />

        </div>
      </div>
    </PageLayout>
  );
}
