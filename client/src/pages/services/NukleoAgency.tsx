import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import ServiceDetailLayout from '@/components/ServiceDetailLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { AGENCY_EXPERTISE_3D_ICONS } from '@/components/AgencyExpertise3DIcons';

const NS = 'services.detail.agency';

export default function NukleoAgency() {
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
    { name: 'Omar', role: 'Chargé de projets spéciaux', image: '/team/Omar.webp', imageAlt: 'Omar — Chargé de projets spéciaux chez Nukleo Digital' },
    { name: 'Maxime', role: 'Responsable marketing & communication', image: '/team/Maxime.webp', imageAlt: 'Maxime — Responsable marketing & communication chez Nukleo Digital' },
    { name: 'Meriem', role: 'Coordinatrice marketing & communication', image: '/team/Meriem.webp', imageAlt: 'Meriem — Coordinatrice marketing & communication chez Nukleo Digital' },
    { name: 'Audrey', role: 'Chargée de projets numériques', image: '/team/Audrey.png', imageAlt: 'Audrey — Chargée de projets numériques chez Nukleo Digital' },
  ];

  return (
    <PageLayout>
      <SEO
        title="Nukleo.Agency — Marketing & Communication | Nukleo"
        description="Stratégie de croissance, SEO, marketing de performance et automation. L'agence marketing de Nukleo transforme votre visibilité en résultats mesurables."
        keywords="agence marketing IA, stratégie croissance, SEO, marketing performance, automation marketing"
      />
      <ServiceDetailLayout
        pageTitle={t(`${NS}.pageTitle`)}
        tagline={t(`${NS}.tagline`)}
        heroImage="/demo/agency-hero-cover.png"
        heroImageAlt={t(`${NS}.heroImageAlt`)}
        navItems={navItems.map((label, id) => ({ id: String(id), label }))}
        mainTitle={t(`${NS}.mainTitle`)}
        mainDescription={t(`${NS}.mainDescription`)}
        mainTags={mainTags}
        extensionsTitle={t(`${NS}.extensionsTitle`)}
        extensionsDescription={t(`${NS}.extensionsDescription`)}
        extensionsTags={extensionsTags}
        extensionsHighlightListStyle={true}
        expertiseIconComponents={AGENCY_EXPERTISE_3D_ICONS}
        expertiseSectionTitle={t(`${NS}.expertiseSectionTitle`)}
        expertiseSectionDescription={t(`${NS}.expertiseSectionDescription`) || undefined}
        gridItems={gridItems}
        teamTitle={t(`${NS}.teamTitle`)}
        teamDescription={t(`${NS}.teamDescription`)}
        teamMembers={teamMembers}
        sectionVisualImage="/demo/agency-strategy-execution-cover.png"
        sectionVisualTitle={t(`${NS}.sectionVisualTitle`)}
        sectionVisualSubtitle={t(`${NS}.sectionVisualSubtitle`)}
        sectionVisualDescription={t(`${NS}.sectionVisualDescription`)}
        sectionHighlights={sectionHighlights}
      />
    </PageLayout>
  );
}
