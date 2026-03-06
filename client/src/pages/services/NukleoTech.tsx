import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import ServiceDetailLayout from '@/components/ServiceDetailLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { TECH_EXPERTISE_3D_ICONS } from '@/components/TechExpertise3DIcons';

const NS = 'services.detail.tech';

export default function NukleoTech() {
  const { t } = useLanguage();

  const navItems = (t(`${NS}.navItems`, { returnObjects: true }) as string[]) || [];
  const mainTags = (t(`${NS}.mainTags`, { returnObjects: true }) as string[]) || [];
  const extensionsTags = (t(`${NS}.extensionsTags`, { returnObjects: true }) as string[]) || [];

  const gridItems = Array.from({ length: 6 }, (_, i) => ({
    title: t(`${NS}.grid${i}Title`),
    description: t(`${NS}.grid${i}Description`),
  }));

  const sectionHighlights = Array.from({ length: 4 }, (_, i) => ({
    title: t(`${NS}.sectionHighlight${i}Title`),
    description: t(`${NS}.sectionHighlight${i}Description`),
  }));

  const teamMembers = [
    { name: 'Alexei', role: 'VP des services web', image: '/team/Alexei.png', imageAlt: 'Alexei — VP des services web chez Nukleo Digital' },
    { name: 'Benoît', role: 'Directeur des services web', image: '/team/Benoit.png', imageAlt: 'Benoît — Directeur des services web chez Nukleo Digital' },
    { name: 'Sarah', role: 'Développeuse Full Stack', image: '/team/Sarah.jpg', imageAlt: 'Sarah — Développeuse Full Stack chez Nukleo Digital' },
    { name: 'Tim', role: 'Développeur Full Stack', image: '/team/Tim.png', imageAlt: 'Tim — Développeur Full Stack chez Nukleo Digital' },
    { name: 'Hind', role: 'Développeuse IA', image: '/team/Hind.jpg', imageAlt: 'Hind — Développeuse IA chez Nukleo Digital' },
    { name: 'Jean-François', role: 'Développeur Full Stack', image: '/team/Jean-Francois_v2.png', imageAlt: 'Jean-François — Développeur Full Stack chez Nukleo Digital' },
  ];

  return (
    <PageLayout>
      <SEO
        title="Nukleo.Tech — Développement & IA | Nukleo"
        description="Développement sur mesure, agents IA, plateformes numériques et architecture data. Le lab technologique de Nukleo construit les solutions qui propulsent votre performance."
        keywords="développement IA, agents autonomes, plateforme numérique, architecture data, React, Next.js"
      />
      <ServiceDetailLayout
        pageTitle={t(`${NS}.pageTitle`)}
        tagline={t(`${NS}.tagline`)}
        heroImage="/demo/lab-tech-cover.png?v=2"
        heroImageAlt={t(`${NS}.heroImageAlt`)}
        heroImagePosition="50% 50%"
        heroHeight="clamp(384px, 60vh, 624px)"
        navItems={navItems.map((label, id) => ({ id: String(id), label }))}
        mainTitle={t(`${NS}.mainTitle`)}
        mainDescription={t(`${NS}.mainDescription`)}
        mainTags={mainTags}
        extensionsTitle={t(`${NS}.extensionsTitle`)}
        extensionsDescription={t(`${NS}.extensionsDescription`)}
        extensionsTags={extensionsTags}
        extensionsHighlightListStyle={true}
        expertiseIconComponents={TECH_EXPERTISE_3D_ICONS}
        expertiseSectionTitle={t(`${NS}.expertiseSectionTitle`)}
        expertiseSectionDescription={t(`${NS}.expertiseSectionDescription`) || undefined}
        gridItems={gridItems}
        teamTitle={t(`${NS}.teamTitle`)}
        teamDescription={t(`${NS}.teamDescription`)}
        teamMembers={teamMembers}
        teamLayout="slider"
        sectionVisualImage="/demo/tech-infrastructure-visual.png"
        sectionVisualTitle={t(`${NS}.sectionVisualTitle`)}
        sectionVisualSubtitle={t(`${NS}.sectionVisualSubtitle`)}
        sectionVisualDescription={t(`${NS}.sectionVisualDescription`)}
        sectionHighlights={sectionHighlights}
      />
    </PageLayout>
  );
}
