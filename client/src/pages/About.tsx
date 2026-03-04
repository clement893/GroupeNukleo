import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import StructuredData, { createPersonSchema } from '@/components/StructuredData';
import { VALUES_3D_ICONS } from '@/components/Values3DIcons';
import { TeamRow } from '@/components/demo3';
import { useLanguage } from '@/contexts/LanguageContext';
import HomeServicesSection from '@/components/HomeServicesSection';
import CTAPerformSection from '@/components/CTAPerformSection';

const BORDEAUX = '#5A1E29';
const CORAL_BG = '#F5D5CC';
const OFF_WHITE = '#EFE8E8';
const BTN_PURPLE = '#5B21B6';

const featuredMember = {
  name: 'Clément Roy',
  roleKey: 'Président et fondateur de Nukleo',
  image: '/team/Clement.webp',
  linkedin: 'https://www.linkedin.com/in/clement-roy/',
  bio: "Clément pilote la vision et la stratégie de Nukleo. Passionné par la transformation numérique des PME et des OBNL, il s'assure que chaque client bénéficie d'un partenaire à l'écoute, exigeant et orienté résultats.",
};

const VALUES_KEYS = ['excellence', 'ownership', 'authenticity', 'bienveillance'] as const;

export default function About() {
  const { t } = useLanguage();

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

      <div style={{ minHeight: '100vh', color: '#374151', paddingTop: 128, background: OFF_WHITE }}>
        {/* Hero — même disposition que page d'accueil */}
        <section style={{ padding: 'clamp(6rem, 12vh, 8rem) 3% 0', overflow: 'visible' }}>
          {/* Titre + sous-titre en haut, alignés à gauche */}
          <div style={{ marginBottom: 'clamp(1rem, 3vw, 2rem)', overflow: 'visible' }}>
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.5rem, 8vw, 9rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                margin: '0 0 0.25rem 0',
                paddingBottom: '0.18em',
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
          {/* Vidéo hero — même que page Studio créatif */}
          <div
            className="rounded-lg overflow-hidden"
            style={{ width: '100%', aspectRatio: '16/9', minHeight: 500, marginBottom: '4rem' }}
          >
            <video
              src="/demo/studio-creatif-hero.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center"
              aria-label="Vidéo Nukleo Digital"
            />
          </div>
        </section>

        {/* NOTRE MISSION */}
        <section style={{ padding: '4rem 3%', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 24, textAlign: 'center' }}>
            {t('about.missionLabel') || 'Notre mission'}
          </p>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              margin: '0 0 1.5rem 0',
              display: 'inline-block',
              width: 'fit-content',
              maxWidth: '66.67%',
              textAlign: 'center',
              background: 'linear-gradient(to right, #6B1817, #5636AD)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('about.missionTitle') || 'Faire rayonner les petites et moyennes entreprises dans leur croissance numérique.'}
          </h2>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: '1rem', lineHeight: 1.7, color: '#4b5563' }}>
            {t('about.missionDescription') || 'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime.'}
          </p>
        </section>

        {/* NOS VALEURS */}
        <section style={{ padding: '4rem 3% 5rem' }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 24, textAlign: 'center' }}>
            {t('about.valuesLabel') || 'NOS VALEURS'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {VALUES_KEYS.map((key) => {
              const IconComponent = VALUES_3D_ICONS[key];
              return (
              <div
                key={key}
                className="group transition-all duration-300 bg-white/25 backdrop-blur-md border border-white/40 cursor-default"
                style={{
                  borderRadius: 20,
                  padding: '1.75rem',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <IconComponent />
                </div>
                <h3 className="transition-all duration-300 group-hover:text-[2.5rem]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '1.65rem', color: '#21242E', margin: '0 0 0.5rem 0' }}>
                  {t(`about.values.${key}.title`)}
                </h3>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.6, color: '#6b7280', margin: 0 }}>
                  {t(`about.values.${key}.description`)}
                </p>
              </div>
            );
            })}
          </div>
        </section>

        {/* Section équipe — même bloc que la page d'accueil (TeamRow) */}
        <section style={{ padding: '4rem 3% 1rem', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b7280', marginBottom: '1rem', textAlign: 'center' }}>
            {t('about.teamTitle') || "Rencontrez l'équipe"}
          </p>
          <TeamRow />
        </section>

        {/* 4 cartes Services — mêmes cartes que la page d'accueil (composant partagé) */}
        <HomeServicesSection />

        {/* CTA Prêt.e à performer ? — composant partagé (About, Homepage, etc.) */}
        <CTAPerformSection />
      </div>
    </PageLayout>
  );
}
