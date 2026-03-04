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
    {
      name: 'Développeur·se 1',
      role: 'Développeur·se full‑stack',
      image: '/demo/team-1.jpg',
      imageAlt: 'Développeur·se full‑stack chez Nukleo Digital',
    },
    {
      name: 'Développeur·se 2',
      role: 'Ingénieur·e backend',
      image: '/demo/team-2.jpg',
      imageAlt: 'Ingénieur·e backend chez Nukleo Digital',
    },
    {
      name: 'Développeur·se 3',
      role: 'Ingénieur·e IA & data',
      image: '/demo/team-3.jpg',
      imageAlt: 'Ingénieur·e IA & data chez Nukleo Digital',
    },
    {
      name: 'Développeur·se 4',
      role: 'DevOps & Cloud',
      image: '/demo/team-4.jpg',
      imageAlt: 'DevOps & Cloud chez Nukleo Digital',
    },
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
        heroImage="/demo/dept-tech.jpg"
        heroImageAlt={t(`${NS}.heroImageAlt`)}
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
        sectionVisualImage="/demo/dept-tech.jpg"
        sectionVisualTitle={t(`${NS}.sectionVisualTitle`)}
        sectionVisualSubtitle={t(`${NS}.sectionVisualSubtitle`)}
        sectionVisualDescription={t(`${NS}.sectionVisualDescription`)}
        sectionHighlights={sectionHighlights}
      />
    </PageLayout>
  );
}
