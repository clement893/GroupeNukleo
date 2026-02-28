import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import ServiceDetailLayout from '@/components/ServiceDetailLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const NS = 'services.detail.tech';

export default function NukleoTech() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();

  const navItems = (t(`${NS}.navItems`, { returnObjects: true }) as string[]) || [];
  const mainTags = (t(`${NS}.mainTags`, { returnObjects: true }) as string[]) || [];
  const extensionsTags = (t(`${NS}.extensionsTags`, { returnObjects: true }) as string[]) || [];

  const gridItems = Array.from({ length: 6 }, (_, i) => ({
    title: t(`${NS}.grid${i}Title`),
    description: t(`${NS}.grid${i}Description`),
  }));

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
        expertiseSectionTitle={t(`${NS}.expertiseSectionTitle`)}
        expertiseSectionDescription={t(`${NS}.expertiseSectionDescription`) || undefined}
        gridItems={gridItems}
        teamTitle={t(`${NS}.teamTitle`)}
        teamDescription={t(`${NS}.teamDescription`)}
        ctaTitle={t(`${NS}.ctaTitle`)}
        ctaButtonText={t(`${NS}.ctaButtonText`)}
        ctaHref={getLocalizedPath('/contact')}
      />
    </PageLayout>
  );
}
