import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import ServiceDetailLayout from '@/components/ServiceDetailLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const NS = 'services.detail.studio';

export default function NukleoStudio() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();

  const navItems = (t(`${NS}.navItems`, { returnObjects: true }) as string[]) || [];
  const mainTags = (t(`${NS}.mainTags`, { returnObjects: true }) as string[]) || [];
  const extensionsTags = (t(`${NS}.extensionsTags`, { returnObjects: true }) as string[]) || [];

  const gridItems = Array.from({ length: 6 }, (_, i) => ({
    title: t(`${NS}.grid${i}Title`),
    description: t(`${NS}.grid${i}Description`),
  }));

  const processSteps = Array.from({ length: 4 }, (_, i) => ({
    title: t(`${NS}.process${i}Title`),
    description: t(`${NS}.process${i}Description`),
  }));

  return (
    <PageLayout>
      <SEO
        title="Nukleo.Studio — Design & Création | Nukleo"
        description="Identité de marque, UX/UI design, production créative et direction artistique. Le studio créatif de Nukleo conçoit des expériences visuelles qui marquent les esprits."
        keywords="design marque, UX UI design, branding, identité visuelle, motion design, copywriting, direction artistique"
      />
      <ServiceDetailLayout
        pageTitle={t(`${NS}.pageTitle`)}
        tagline={t(`${NS}.tagline`)}
        navItems={navItems.map((label, id) => ({ id: String(id), label }))}
        mainTitle={t(`${NS}.mainTitle`)}
        mainDescription={t(`${NS}.mainDescription`)}
        mainTags={mainTags}
        extensionsTitle={t(`${NS}.extensionsTitle`)}
        extensionsDescription={t(`${NS}.extensionsDescription`)}
        extensionsTags={extensionsTags}
        gridItems={gridItems}
        teamTitle={t(`${NS}.teamTitle`)}
        teamDescription={t(`${NS}.teamDescription`)}
        processSteps={processSteps}
        ctaTitle={t(`${NS}.ctaTitle`)}
        ctaButtonText={t(`${NS}.ctaButtonText`)}
        ctaHref={getLocalizedPath('/contact')}
      />
    </PageLayout>
  );
}
