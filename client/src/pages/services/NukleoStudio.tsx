import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import ServiceDetailLayout, { type ServiceTabContent } from '@/components/ServiceDetailLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { EXPERTISE_3D_ICONS } from '@/components/Expertise3DIcons';

const NS = 'services.detail.studio';

function normalizeTabs(raw: unknown): ServiceTabContent[] | undefined {
  if (!Array.isArray(raw) || raw.length === 0) return undefined;
  return raw.map((item: Record<string, unknown>, index: number) => ({
    id: typeof item.id === 'string' ? item.id : `tab-${index}`,
    label: typeof item.label === 'string' ? item.label : '',
    title: typeof item.title === 'string' ? item.title : '',
    subtitle: typeof item.subtitle === 'string' ? item.subtitle : undefined,
    description: typeof item.description === 'string' ? item.description : '',
    benefits: Array.isArray(item.benefits) ? item.benefits.filter((b): b is string => typeof b === 'string') : [],
  })).filter(tab => tab.label && tab.title);
}

export default function NukleoStudio() {
  const { t } = useLanguage();

  const rawTabs = t(`${NS}.tabs`, { returnObjects: true });
  const tabs = normalizeTabs(rawTabs);

  const navItems = (t(`${NS}.navItems`, { returnObjects: true }) as string[]) || [];
  const mainTags = (t(`${NS}.mainTags`, { returnObjects: true }) as string[]) || [];
  const extensionsTags = (t(`${NS}.extensionsTags`, { returnObjects: true }) as string[]) || [];

  const gridItems = Array.from({ length: 6 }, (_, i) => {
    const deliverables = t(`${NS}.grid${i}Deliverables`);
    return {
      title: t(`${NS}.grid${i}Title`),
      description: t(`${NS}.grid${i}Description`),
      ...(deliverables && !deliverables.startsWith('services.') ? { deliverables } : {}),
    };
  });

  const sectionHighlights = Array.from({ length: 4 }, (_, i) => ({
    title: t(`${NS}.sectionHighlight${i}Title`),
    description: t(`${NS}.sectionHighlight${i}Description`),
  }));

  const teamMembers: { name: string; role: string; image: string; imageAlt?: string }[] = [];
  for (let i = 0; i < 8; i++) {
    const name = t(`${NS}.teamMember${i}Name`);
    if (!name || name.startsWith('services.')) break;
    const role = t(`${NS}.teamMember${i}Role`);
    const image = t(`${NS}.teamMember${i}Image`);
    const imageAlt = t(`${NS}.teamMember${i}ImageAlt`);
    if (image && !image.startsWith('services.')) {
      teamMembers.push({
        name,
        role: role || '',
        image,
        imageAlt: imageAlt && !imageAlt.startsWith('services.') ? imageAlt : undefined,
      });
    }
  }

  return (
    <PageLayout>
      <SEO
        title="Nukleo.Studio — Design & Création | Nukleo"
        description="Identité de marque, UX/UI design, production créative et direction artistique. Le studio créatif de Nukleo conçoit des expériences visuelles qui marquent les esprits."
        keywords="design marque, UX UI design, branding, identité visuelle, motion design, copywriting, direction artistique"
      />
      <ServiceDetailLayout
        pageTitle={t(`${NS}.heroTitle`)}
        tagline=""
        heroVideo="/demo/designer-studio-hero.mp4"
        heroImageAlt={t(`${NS}.heroImageAlt`)}
        tabs={tabs}
        navItems={navItems.map((label, id) => ({ id: String(id), label }))}
        mainTitle={t(`${NS}.mainTitle`)}
        mainDescription={t(`${NS}.mainDescription`)}
        mainTags={mainTags}
        extensionsTitle={t(`${NS}.extensionsTitle`)}
        extensionsDescription={t(`${NS}.extensionsDescription`)}
        extensionsTags={extensionsTags}
        expertiseIconComponents={EXPERTISE_3D_ICONS}
        expertiseSectionTitle={t(`${NS}.expertiseSectionTitle`)}
        expertiseSectionDescription={t(`${NS}.expertiseSectionDescription`) || undefined}
        expertiseDeliverablesLabel={t(`${NS}.deliverablesLabel`)}
        gridItems={gridItems}
        teamTitle={t(`${NS}.teamTitle`)}
        teamDescription={t(`${NS}.teamDescription`)}
        teamMembers={teamMembers.length > 0 ? teamMembers : undefined}
        sectionVisualVideo="/demo/vido-balles.mp4"
        sectionVisualTitle={t(`${NS}.sectionVisualTitle`)}
        sectionVisualSubtitle={t(`${NS}.sectionVisualSubtitle`)}
        sectionVisualDescription={t(`${NS}.sectionVisualDescription`)}
        sectionHighlights={sectionHighlights}
      />
    </PageLayout>
  );
}
