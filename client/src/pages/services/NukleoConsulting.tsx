import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import ServiceDetailLayout from '@/components/ServiceDetailLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { CONSULTING_EXPERTISE_3D_ICONS } from '@/components/ConsultingExpertise3DIcons';

const NS = 'services.detail.consulting';

export default function NukleoConsulting() {
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
    { name: 'Nathan', role: 'Conseiller en transformation numérique', image: '/team/Nathan.png', imageAlt: 'Nathan — Conseiller en transformation numérique chez Nukleo Digital' },
    { name: 'Clément', role: 'Conseiller en transformation numérique', image: '/team/Clement.webp', imageAlt: 'Clément — Conseiller en transformation numérique chez Nukleo Digital' },
    { name: 'Lionel', role: 'Conseiller en transformation numérique', image: '/team/Lionel.png', imageAlt: 'Lionel — Conseiller en transformation numérique chez Nukleo Digital' },
  ];

  return (
    <PageLayout>
      <SEO
        title="Nukleo.Consulting — Transformation & Conseil | Nukleo"
        description="Audit numérique, stratégie IA, transformation organisationnelle et gouvernance. Le pôle conseil de Nukleo vous guide vers l'excellence numérique."
        keywords="conseil stratégique IA, transformation numérique, audit IA, feuille de route, gouvernance IA"
      />
      <ServiceDetailLayout
        pageTitle={t(`${NS}.pageTitle`)}
        tagline={t(`${NS}.tagline`)}
        heroImage="/demo/consulting-hero-cover.png"
        heroImageAlt={t(`${NS}.heroImageAlt`)}
        heroImagePosition="50% 70%"
        navItems={navItems.map((label, id) => ({ id: String(id), label }))}
        mainTitle={t(`${NS}.mainTitle`)}
        mainDescription={t(`${NS}.mainDescription`)}
        mainTags={mainTags}
        extensionsTitle={t(`${NS}.extensionsTitle`)}
        extensionsDescription={t(`${NS}.extensionsDescription`)}
        extensionsTags={extensionsTags}
        extensionsHighlightListStyle={true}
        expertiseIconComponents={CONSULTING_EXPERTISE_3D_ICONS}
        expertiseSectionTitle={t(`${NS}.expertiseSectionTitle`)}
        expertiseSectionDescription={t(`${NS}.expertiseSectionDescription`) || undefined}
        gridItems={gridItems}
        teamTitle={t(`${NS}.teamTitle`)}
        teamDescription={t(`${NS}.teamDescription`)}
        teamMembers={teamMembers}
        sectionVisualVideo="/demo/consulting-visual.mp4"
        sectionVisualImage="/demo/consulting-hero-cover.png"
        sectionVisualTitle={t(`${NS}.sectionVisualTitle`)}
        sectionVisualSubtitle={t(`${NS}.sectionVisualSubtitle`)}
        sectionVisualDescription={t(`${NS}.sectionVisualDescription`)}
        sectionHighlights={sectionHighlights}
      />
    </PageLayout>
  );
}
