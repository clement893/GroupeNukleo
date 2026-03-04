import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import ServiceDetailLayout from '@/components/ServiceDetailLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { EXPERTISE_3D_ICONS } from '@/components/Expertise3DIcons';

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
    { name: 'Stratège 1', role: 'Stratège marketing', image: '/demo/team-1.jpg', imageAlt: 'Stratège marketing chez Nukleo Digital' },
    { name: 'Stratège 2', role: 'Chef de projet', image: '/demo/team-2.jpg', imageAlt: 'Chef de projet chez Nukleo Digital' },
    { name: 'Stratège 3', role: 'Expert performance', image: '/demo/team-3.jpg', imageAlt: 'Expert performance chez Nukleo Digital' },
    { name: 'Stratège 4', role: 'Consultant communication', image: '/demo/team-4.jpg', imageAlt: 'Consultant communication chez Nukleo Digital' },
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
        heroImage="/demo/dept-agency.jpg"
        heroImageAlt={t(`${NS}.heroImageAlt`)}
        navItems={navItems.map((label, id) => ({ id: String(id), label }))}
        mainTitle={t(`${NS}.mainTitle`)}
        mainDescription={t(`${NS}.mainDescription`)}
        mainTags={mainTags}
        extensionsTitle={t(`${NS}.extensionsTitle`)}
        extensionsDescription={t(`${NS}.extensionsDescription`)}
        extensionsTags={extensionsTags}
        extensionsHighlightListStyle={true}
        expertiseIconComponents={EXPERTISE_3D_ICONS}
        expertiseSectionTitle={t(`${NS}.expertiseSectionTitle`)}
        expertiseSectionDescription={t(`${NS}.expertiseSectionDescription`) || undefined}
        gridItems={gridItems}
        teamTitle={t(`${NS}.teamTitle`)}
        teamDescription={t(`${NS}.teamDescription`)}
        teamMembers={teamMembers}
        sectionVisualImage="/demo/dept-agency.jpg"
        sectionVisualTitle={t(`${NS}.sectionVisualTitle`)}
        sectionVisualSubtitle={t(`${NS}.sectionVisualSubtitle`)}
        sectionVisualDescription={t(`${NS}.sectionVisualDescription`)}
        sectionHighlights={sectionHighlights}
      />
    </PageLayout>
  );
}
