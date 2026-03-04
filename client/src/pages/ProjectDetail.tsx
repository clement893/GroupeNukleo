import { useLocation, Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import OptimizedImage from '@/components/OptimizedImage';
import { trpc } from '@/lib/trpc';
import { useLanguage } from '@/contexts/LanguageContext';
import { slugToImageName, getProjectKey, getImagesForProject } from '@/lib/projectSlug';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { PROJECTS_DATA, getProjectByKey } from '@/data/projectsData';

// Liste de toutes les images connues depuis la source de données centralisée
const ALL_KNOWN_IMAGES: string[] = PROJECTS_DATA.flatMap((p) => p.images);

// Fallback pour les images déjà en production (anciens noms)
const LEGACY_FALLBACK_IMAGES = [
  'AMQ_1.png', 'AdeleBlais_2.jpg', 'Affilia_3.jpg', 'Affilia_4.jpg', 'Affilia_7.png',
  'Arsenal_1.jpg', 'Arsenal_2.jpg', 'CECS_2.jpg', 'CQDE_2.jpg', 'CQDE_4.jpg',
  'D28_24_14.jpg', 'D28_24_17.jpg', 'D28_24_19.jpg', 'D28_24_5.jpg', 'D28_25_4.jpg',
  'D28_25_5.jpg', 'D28_25_6.jpg', 'D28_25_9.jpg', 'DocTocToc_1.jpg', 'DocTocToc_2.jpg',
  'FJL_2.jpg', 'FJL_3.jpg', 'Humankind_1.jpg', 'Humankind_2.jpg', 'MBAM_1.jpg',
  'MBAM_2.jpg', 'MBAM_9.jpg', 'MJL_2025_1.jpg', 'MJL_2025_4.jpg', 'Matchstick_1.jpg',
  'Matchstick_2.jpg', 'NouvelleIle_1.png', 'O-Salon_1.jpg', 'Psy-etc_1.jpg', 'Psy-etc_2.jpg',
  'Queertech_1.jpg', 'Queertech_2.jpg', 'Reseau-Sante_1.jpg', 'Reseau-Sante_2.jpg',
  'Rideau_4.jpg', 'SSCO_1.jpg', 'SSCO_2.jpg', 'SSCO_3.jpg', 'SummitLaw_1.jpg',
  'SummitLaw_13.jpg', 'SummitLaw_2.jpg', 'SummitLaw_3.jpg', 'TAM_1.jpg', 'TAM_3.jpg',
  'TAM_4.jpg', 'Zu_2.jpg',
];

const BORDEAUX = '#5A1E29';

export default function ProjectDetail() {
  const [location] = useLocation();
  const slugPart = location.replace(/^\/(fr\/)?projects\/?/, '').split('/')[0];
  const slug = slugPart && slugPart.length > 0 ? slugPart : null;
  const { t, language } = useLanguage();
  const getLocalizedPath = useLocalizedPath();

  const { data: uploadedImages } = trpc.projectsImages.list.useQuery(undefined, {
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const { data: apiProjects } = trpc.projects.list.useQuery(undefined, {
    retry: 1,
    staleTime: 2 * 60 * 1000,
  });

  // Projet : priorité à l’API (éditions admin), sinon projectsData
  const projectData = slug
    ? (apiProjects?.length
        ? apiProjects.find((p) => p.slug === slug)
        : null) ?? PROJECTS_DATA.find((p) => p.slug === slug) ?? null
    : null;

  const [imageNames, setImageNames] = useState<string[]>([]);

  useEffect(() => {
    if (uploadedImages && Array.isArray(uploadedImages) && uploadedImages.length > 0) {
      // Combiner les images uploadées avec les images connues de projectsData
      const uploadedNames = uploadedImages.map((img) => img.name);
      const combined = [...new Set([...uploadedNames, ...ALL_KNOWN_IMAGES])];
      setImageNames(combined);
    } else {
      // Utiliser les images de projectsData + legacy fallback
      const combined = [...new Set([...ALL_KNOWN_IMAGES, ...LEGACY_FALLBACK_IMAGES])];
      setImageNames(combined);
    }
  }, [uploadedImages]);

  // Scroll en haut à l'ouverture du projet uniquement (pas de timeouts pour ne pas ramener en haut pendant que l'utilisateur scroll)
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    const scroll = () => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } catch {
        window.scrollTo(0, 0);
      }
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scroll();
    const raf = requestAnimationFrame(() => {
      scroll();
      requestAnimationFrame(scroll);
    });
    return () => cancelAnimationFrame(raf);
  }, [slug]);

  // Si trouvé (API ou static), afficher la page projet
  if (projectData) {
    const description = language === 'fr' ? projectData.description.fr : projectData.description.en;
    const heroImage = projectData.images[0];
    const heroImageUrl = `/projects/${heroImage}`;
    const galleryImages = projectData.images;

    return (
      <PageLayout>
        <SEO
          title={`${projectData.title} | ${t('projects.title')} | Nukleo`}
          description={description}
        />
        <main className="min-h-screen pt-20">
          {/* Wrapper unique : marges = bords gauche/droite de l'image hero (référence page) */}
          <div className="container" style={{ maxWidth: '100%' }}>
          {/* ═══ Hero ═══ */}
          <section
            style={{
              padding: 'clamp(3rem, 8vh, 5rem) 0 clamp(4rem, 8vh, 6rem)',
              background: 'transparent',
              overflow: 'visible',
            }}
          >
              <Link
                href={getLocalizedPath('/projects')}
                style={{
                  fontFamily: "'Google Sans Flex', sans-serif",
                  fontSize: '0.9rem',
                  color: '#374151',
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  marginBottom: '1.25rem',
                }}
              >
                ← {t('projects.backToList')}
              </Link>
              <h1 style={{
                fontFamily: "'Google Sans Flex', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.75rem, 4vw, 3.25rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                margin: '0 0 0.5rem 0',
                color: BORDEAUX,
              }}>
                {projectData.title}
              </h1>
              <p style={{
                fontFamily: "'Google Sans Flex', sans-serif",
                fontSize: '1rem',
                color: '#111',
                margin: '0 0 2rem 0',
              }}>
                {projectData.client}
              </p>
              <div
                className="rounded-md overflow-hidden bg-gray-100 w-full"
                style={{
                  marginTop: '1.5rem',
                  height: 'clamp(480px, 75vh, 780px)',
                  boxShadow: '0 4px 24px rgba(93, 67, 205, 0.08), 0 1px 0 rgba(93, 67, 205, 0.06) inset',
                }}
              >
                <OptimizedImage
                  src={heroImageUrl}
                  alt={projectData.title}
                  width={1200}
                  height={514}
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
          </section>

          {/* ═══ Métadonnées + description — alignées aux marges du hero ═══ */}
          <section style={{ padding: '0 0 5rem' }}>
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(180px,260px)_1fr] gap-8 lg:gap-12 w-full items-start">
              <div style={{ fontFamily: "'Google Sans Flex', sans-serif", fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.8 }}>
                <p style={{ margin: '0 0 0.35rem 0' }}><strong>Client :</strong></p>
                <p style={{ margin: '0 0 1.25rem 0' }}>{projectData.client}</p>
                <p style={{ margin: '0 0 0.5rem 0' }}><strong>Services :</strong></p>
                <div className="flex flex-wrap gap-2" style={{ margin: '0.5rem 0 1.25rem 0' }}>
                  {(projectData.services || '')
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded border border-gray-200 text-gray-700 text-sm font-medium"
                        style={{ background: 'rgba(255,255,255,0.8)', fontFamily: "'Google Sans Flex', sans-serif" }}
                      >
                        {tag}
                      </span>
                    ))}
                </div>
                <p style={{ margin: '0 0 0.35rem 0' }}><strong>Année :</strong></p>
                <p style={{ margin: 0 }}>{projectData.year}</p>
              </div>
              <div>
                <p style={{
                  fontFamily: "'Google Sans Flex', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color: '#374151',
                  margin: 0,
                  textAlign: 'justify',
                }}>
                  {description}
                </p>
                {projectData.websiteUrl && (
                  <a
                    href={projectData.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Google Sans Flex', sans-serif",
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: BORDEAUX,
                      marginTop: '1rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      textDecoration: 'none',
                    }}
                  >
                    {t('projects.visitWebsite')}
                    <span aria-hidden>→</span>
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* ═══ Galerie — alignée aux marges du hero ═══ */}
          {galleryImages.length > 1 && (
            <section style={{ background: 'transparent', padding: '3rem 0 4rem' }}>
              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {galleryImages.map((name, idx) => {
                    const src = `/projects/${name}`;
                    const isPortrait = idx % 2 === 1;
                    return (
                      <div
                        key={name}
                        className="rounded-md overflow-hidden"
                        style={{
                          aspectRatio: isPortrait ? '3/4' : '4/3',
                          background: '#2d2d2d',
                        }}
                      >
                        <OptimizedImage
                          src={src}
                          alt={projectData.title}
                          width={isPortrait ? 400 : 600}
                          height={isPortrait ? 533 : 450}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          </div>
        </main>
      </PageLayout>
    );
  }

  // ─── Fallback : projet non trouvé dans projectsData, tenter via imageNames ───
  const imageName = slug ? slugToImageName(slug, imageNames.length > 0 ? imageNames : LEGACY_FALLBACK_IMAGES) : null;

  if (!slug || !imageName) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center" style={{ fontFamily: "'Google Sans Flex', sans-serif" }}>
            <p className="text-gray-600 mb-4">{t('projects.notFound')}</p>
            <Link href={getLocalizedPath('/projects')} className="text-[#523DCB] hover:underline font-medium">
              {t('projects.backToList')}
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  const projectKey = getProjectKey(imageName);
  const projectByKey = getProjectByKey(projectKey);
  const projectImages = getImagesForProject(projectKey, imageNames.length > 0 ? imageNames : LEGACY_FALLBACK_IMAGES);
  const heroImageUrl = `/projects/${imageName}`;

  const fallbackTitle = imageName
    .replace(/\.(jpg|jpeg|png|gif|webp)$/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/\d+$/, '')
    .trim();

  const meta = {
    title: projectByKey?.title ?? (fallbackTitle.charAt(0).toUpperCase() + fallbackTitle.slice(1).toLowerCase()),
    category: projectByKey?.category,
    description: projectByKey
      ? (language === 'fr' ? projectByKey.description.fr : projectByKey.description.en)
      : t('projects.descriptionFallback'),
    client: projectByKey?.client ?? '—',
    services: projectByKey?.services ?? '—',
    year: projectByKey?.year ?? new Date().getFullYear().toString(),
    websiteUrl: projectByKey?.websiteUrl,
  };

  return (
    <PageLayout>
      <SEO
        title={`${meta.title} | ${t('projects.title')} | Nukleo`}
        description={meta.description}
      />
      <main className="min-h-screen pt-20">
        <div className="container" style={{ maxWidth: '100%' }}>
        <section
          style={{
            padding: 'clamp(3rem, 8vh, 5rem) 0 clamp(4rem, 8vh, 6rem)',
            background: 'transparent',
            overflow: 'visible',
          }}
        >
            <Link
              href={getLocalizedPath('/projects')}
              style={{
                fontFamily: "'Google Sans Flex', sans-serif",
                fontSize: '0.9rem',
                color: '#374151',
                fontWeight: 500,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: '1.25rem',
              }}
            >
              ← {t('projects.backToList')}
            </Link>
            <h1 style={{
              fontFamily: "'Google Sans Flex', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4vw, 3.25rem)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              margin: '0 0 0.5rem 0',
              color: BORDEAUX,
            }}>
              {meta.title}
            </h1>
            <p style={{
              fontFamily: "'Google Sans Flex', sans-serif",
              fontSize: '1rem',
              color: '#111',
              margin: '0 0 2rem 0',
            }}>
              {meta.client}
            </p>
            <div
              className="rounded-md overflow-hidden bg-gray-100 w-full"
              style={{
                marginTop: '1.5rem',
                height: 'clamp(480px, 75vh, 780px)',
                boxShadow: '0 4px 24px rgba(93, 67, 205, 0.08), 0 1px 0 rgba(93, 67, 205, 0.06) inset',
              }}
            >
              <OptimizedImage
                src={heroImageUrl}
                alt={meta.title}
                width={1200}
                height={514}
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
        </section>

        <section style={{ padding: '0 0 5rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(180px,260px)_1fr] gap-8 lg:gap-12 w-full items-start">
            <div style={{ fontFamily: "'Google Sans Flex', sans-serif", fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.8 }}>
              <p style={{ margin: '0 0 0.35rem 0' }}><strong>Client :</strong></p>
              <p style={{ margin: '0 0 1.25rem 0' }}>{meta.client}</p>
              <p style={{ margin: '0 0 0.5rem 0' }}><strong>Services :</strong></p>
              <div className="flex flex-wrap gap-2" style={{ margin: '0.5rem 0 1.25rem 0' }}>
                {(meta.services || '')
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded border border-gray-200 text-gray-700 text-sm font-medium"
                      style={{ background: 'rgba(255,255,255,0.8)', fontFamily: "'Google Sans Flex', sans-serif" }}
                    >
                      {tag}
                    </span>
                  ))}
              </div>
              <p style={{ margin: '0 0 0.35rem 0' }}><strong>Année :</strong></p>
              <p style={{ margin: 0 }}>{meta.year}</p>
            </div>
            <div>
              <p style={{ fontFamily: "'Google Sans Flex', sans-serif", fontSize: '1rem', lineHeight: 1.8, color: '#374151', margin: 0, textAlign: 'justify' }}>
                {meta.description}
              </p>
              {meta.websiteUrl && (
                <a
                  href={meta.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Google Sans Flex', sans-serif",
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: BORDEAUX,
                    marginTop: '1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    textDecoration: 'none',
                  }}
                >
                  {t('projects.visitWebsite')}
                  <span aria-hidden>→</span>
                </a>
              )}
            </div>
          </div>
        </section>

        <section style={{ background: 'transparent', padding: '3rem 0 4rem' }}>
          <div className="w-full">
            {projectImages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {projectImages.map((name, idx) => {
                  const src = `/projects/${name}`;
                  const isPortrait = idx % 2 === 1;
                  return (
                    <div key={name} className="rounded-md overflow-hidden" style={{ aspectRatio: isPortrait ? '3/4' : '4/3', background: '#2d2d2d' }}>
                      <OptimizedImage src={src} alt={meta.title} width={isPortrait ? 400 : 600} height={isPortrait ? 533 : 450} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-md overflow-hidden" style={{ aspectRatio: '4/3', background: '#2d2d2d' }}>
                  <OptimizedImage src={heroImageUrl} alt="" width={600} height={450} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            )}
          </div>
        </section>

        </div>
      </main>
    </PageLayout>
  );
}
