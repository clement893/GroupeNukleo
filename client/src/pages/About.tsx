import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import StructuredData, { createPersonSchema } from '@/components/StructuredData';
import { Link } from 'wouter';
import { Trophy, Handshake, Star, Heart, ArrowUpRight } from 'lucide-react';
import { SplitCTAButton } from '@/components/SplitCTAButton';
import { TeamRow } from '@/components/demo3';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { HOME_SERVICES } from '@/data/homeServices';

const BORDEAUX = '#5A1E29';
const CORAL_BG = '#F5D5CC';
const OFF_WHITE = '#EFE8E8';
const CARD_BG = '#ffffff';
const BTN_PURPLE = '#5B21B6';
const DARK = '#0A0A0A';

const featuredMember = {
  name: 'Clément Roy',
  roleKey: 'Président et fondateur de Nukleo',
  image: '/team/Clement.webp',
  linkedin: 'https://www.linkedin.com/in/clement-roy/',
  bio: "Clément pilote la vision et la stratégie de Nukleo. Passionné par la transformation numérique des PME et des OBNL, il s'assure que chaque client bénéficie d'un partenaire à l'écoute, exigeant et orienté résultats.",
};

const VALUES = [
  { key: 'excellence', icon: Trophy, iconColor: '#D4AF37' },
  { key: 'ownership', icon: Handshake, iconColor: '#4B5563' },
  { key: 'authenticity', icon: Star, iconColor: '#3B82F6' },
  { key: 'bienveillance', icon: Heart, iconColor: '#EC4899' },
];

export default function About() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();

  const personSchema = createPersonSchema({
    name: featuredMember.name,
    jobTitle: featuredMember.roleKey,
    image: `https://nukleodigital-production.up.railway.app${featuredMember.image}`,
    url: featuredMember.linkedin,
    sameAs: [featuredMember.linkedin],
    worksFor: { name: 'Nukleo Digital', url: 'https://nukleodigital-production.up.railway.app' },
  });

  return (
    <PageLayout>
      <SEO
        title={t('seo.about.title')}
        description={t('seo.about.description')}
        keywords="AI experts, équipe Nukleo, mission, valeurs, transformation numérique, Montréal, Halifax"
      />
      <StructuredData data={personSchema} />

      <div style={{ minHeight: '100vh', color: '#374151' }}>
        {/* Hero */}
        <section style={{ padding: 'clamp(5rem, 10vh, 7rem) 6% 0' }}>
          {/* Titre + sous-titre en haut, alignés à gauche */}
          <div style={{ marginBottom: 'clamp(2rem, 6vw, 4rem)' }}>
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                margin: '0 0 1rem 0',
                paddingBottom: '0.06em',
                display: 'inline-block',
                overflow: 'visible',
                background: 'linear-gradient(to right, #6B1817, #5636AD)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {t('about.heroNewTitle') || "Choisissez l'intelligence"}
            </h1>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                color: '#6b7280',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {t('about.heroNewSubtitle') || 'Choisissez la transformation numérique dès maintenant.'}
            </p>
          </div>
          {/* Image / bloc visuel (dégradé + mockups) en dessous */}
          <div
            className="rounded-2xl overflow-hidden min-h-[320px] flex items-center justify-center gap-4 p-6"
            style={{ background: CORAL_BG, marginBottom: '4rem' }}
          >
            {/* 3 mockups téléphones */}
            <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ width: 140, background: '#1f2937', borderRadius: 24, padding: 12, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                <div style={{ background: '#fff', borderRadius: 12, height: 240, padding: 12, fontSize: 10, color: '#374151' }}>
                  <div style={{ height: 8, background: '#e5e7eb', borderRadius: 4, marginBottom: 12 }} />
                  {[1, 2, 3].map((i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 14, height: 14, border: '2px solid #9ca3af', borderRadius: 4 }} />
                      <div style={{ flex: 1, height: 6, background: '#f3f4f6', borderRadius: 4 }} />
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ width: 140, background: '#1f2937', borderRadius: 24, padding: 12, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                <div style={{ background: 'linear-gradient(180deg, #4b5563 0%, #1f2937 100%)', borderRadius: 12, height: 240, overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)' }} />
                </div>
              </div>
              <div style={{ width: 100, background: '#1f2937', borderRadius: 24, padding: 10, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, borderRadius: 12, height: 260, padding: 8, background: '#fff' }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} style={{ flex: 1, minHeight: 40, background: '#f3f4f6', borderRadius: 8 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NOTRE MISSION */}
        <section style={{ padding: '4rem 6%', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', color: '#6b7280', marginBottom: 16 }}>
            {t('about.missionLabel') || 'Notre mission'}
          </p>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              lineHeight: 1.2,
              margin: '0 auto 1.5rem',
              maxWidth: 'min(100%, 40vw)',
              background: 'linear-gradient(to right, #6B1817, #5636AD)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {t('about.missionTitle') || 'Faire rayonner les petites et moyennes entreprises dans leur croissance numérique.'}
          </h2>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: '1rem', lineHeight: 1.7, color: '#4b5563' }}>
            {t('about.missionDescription') || 'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime.'}
          </p>
        </section>

        {/* NOS VALEURS */}
        <section style={{ padding: '4rem 6% 5rem' }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 24, textAlign: 'center' }}>
            {t('about.valuesLabel') || 'NOS VALEURS'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {VALUES.map(({ key, icon: Icon, iconColor }) => (
              <div
                key={key}
                style={{
                  background: CARD_BG,
                  borderRadius: 20,
                  padding: '1.75rem',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, background: key === 'authenticity' ? '#EFF6FF' : `${iconColor}18` }}>
                  <Icon size={26} color={iconColor} strokeWidth={2} />
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: BORDEAUX, margin: '0 0 0.5rem 0' }}>
                  {t(`about.values.${key}.title`)}
                </h3>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.6, color: '#6b7280', margin: 0 }}>
                  {t(`about.values.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section équipe — même bloc que la page d'accueil (TeamRow) */}
        <section style={{ padding: '0 6% 1rem', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', margin: 0, display: 'inline-block', background: 'linear-gradient(to right, #6B1817, #5636AD)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            {t('about.teamTitle') || 'Notre équipe'}
          </p>
        </section>
        <TeamRow />

        {/* 4 cartes Services — mêmes cartes que la page d'accueil (source partagée HOME_SERVICES) */}
        <section style={{ padding: '4rem 6% 5rem' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {HOME_SERVICES.map((service) => (
              <Link
                key={service.title}
                href={getLocalizedPath(service.path)}
                aria-label={`Voir ${service.title}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
                className="group"
              >
                <article
                  style={{
                    borderRadius: 20,
                    overflow: 'hidden',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    background: CARD_BG,
                    cursor: 'pointer',
                    transition: 'box-shadow 0.2s ease',
                  }}
                  className="group-hover:shadow-lg"
                >
                  <div style={{ position: 'relative', paddingTop: '60%', background: service.imageBg }}>
                    <div style={{ position: 'absolute', inset: 0 }} />
                    <span
                      style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: DARK,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                      }}
                      aria-hidden
                    >
                      <ArrowUpRight size={18} strokeWidth={2.5} />
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: DARK,
                    margin: 0,
                    padding: '1.25rem 1.25rem 0.5rem',
                  }}>
                    {service.title}
                  </h3>
                  <p style={{
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    lineHeight: 1.55,
                    margin: 0,
                    padding: '0 1.25rem',
                    flex: 1,
                  }}>
                    {service.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '1rem 1.25rem 1.25rem', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400 }}>
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.7rem',
                          color: '#4b5563',
                          background: '#f3f4f6',
                          padding: '4px 10px',
                          borderRadius: 8,
                          fontWeight: 500,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Prêt.e à performer ? — divider puis bouton (design référence) */}
        <section style={{ padding: '4rem 6%', background: 'transparent', textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              margin: '0 0 1rem 0',
              background: 'linear-gradient(to right, #6B1817, #5636AD)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Prêt.e à performer ?
          </h2>
          <div style={{ width: 80, height: 2, background: '#9ca3af', margin: '0 auto 1.5rem' }} aria-hidden="true" />
          <SplitCTAButton href="/contact" label="Contactez-nous" ariaLabel="Contactez-nous" />
        </section>
      </div>
    </PageLayout>
  );
}
