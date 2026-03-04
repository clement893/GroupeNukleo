import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import StructuredData, { createPersonSchema } from '@/components/StructuredData';
import { Trophy, Handshake, MessageCircle, HandHeart } from 'lucide-react';
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

const VALUES = [
  { key: 'excellence', icon: Trophy, iconColor: '#D4AF37' },
  { key: 'ownership', icon: Handshake, iconColor: '#4B5563' },
  { key: 'authenticity', icon: MessageCircle, iconColor: '#3B82F6' },
  { key: 'bienveillance', icon: HandHeart, iconColor: '#EC4899' },
];

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
          {/* Image / bloc visuel (dégradé + mockups) en dessous */}
          <div
            className="rounded-lg overflow-hidden min-h-[600px] flex items-center justify-center gap-4 p-6"
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
            {VALUES.map(({ key, icon: Icon, iconColor }) => (
              <div
                key={key}
                className="group transition-all duration-300 bg-white/25 backdrop-blur-md border border-white/40 cursor-default"
                style={{
                  borderRadius: 20,
                  padding: '1.75rem',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, background: key === 'authenticity' ? '#EFF6FF' : `${iconColor}18` }}>
                  <Icon size={26} color={iconColor} strokeWidth={2} />
                </div>
                <h3 className="transition-all duration-300 group-hover:text-[2.2rem]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: BORDEAUX, margin: '0 0 0.5rem 0' }}>
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
