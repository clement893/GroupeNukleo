import { useLocation, Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import OptimizedImage from '@/components/OptimizedImage';
import { trpc } from '@/lib/trpc';
import { useLanguage } from '@/contexts/LanguageContext';
import { slugToImageName, getProjectKey, getImagesForProject } from '@/lib/projectSlug';
import { useEffect, useState } from 'react';
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

  // Scroll en haut à chaque ouverture de projet
  useEffect(() => {
    const scroll = () => window.scrollTo(0, 0);
    scroll();
    const raf = requestAnimationFrame(() => {
      scroll();
      requestAnimationFrame(scroll);
    });
    const t1 = setTimeout(scroll, 50);
    const t2 = setTimeout(scroll, 250);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [slug]);

  // Chercher d'abord dans projectsData par slug
  const projectData = slug ? PROJECTS_DATA.find((p) => p.slug === slug) : null;

  // Si trouvé dans projectsData, utiliser directement ses données
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
        <main className="min-h-screen">
          {/* ═══ Hero ═══ */}
          <section style={{ padding: 'clamp(5rem, 12vh, 8rem) 6% 4rem' }}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 max-w-[1400px] mx-auto items-start">
              <div>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#9ca3af',
                  marginBottom: 12,
                }}>
                  projet
                </p>
                <h1 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  margin: '0 0 0.5rem 0',
                  display: 'inline-block',
                  background: 'linear-gradient(to right, #6B1817, #5636AD)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}>
                  {projectData.title}
                </h1>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '0.95rem',
                  color: '#6b7280',
                  margin: 0,
                }}>
                  {projectData.category}
                </p>
              </div>
              <div style={{ borderRadius: 12, overflow: 'hidden' }} className="lg:mt-0 mt-6">
                <div style={{ aspectRatio: '21/9', minHeight: 220, maxHeight: 420, background: '#e5e7eb' }}>
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
              </div>
            </div>
          </section>

          {/* ═══ Métadonnées + description ═══ */}
          <section style={{ padding: '0 6% 5rem' }}>
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(140px,200px)_1fr] gap-8 lg:gap-12 max-w-[1400px] mx-auto items-start">
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.8 }}>
                <p style={{ margin: '0 0 0.5rem 0' }}><strong>Client :</strong></p>
                <p style={{ margin: '0 0 1.25rem 0' }}>{projectData.client}</p>
                <p style={{ margin: '0 0 0.5rem 0' }}><strong>Services :</strong></p>
                <p style={{ margin: '0 0 1.25rem 0' }}>{projectData.services}</p>
                <p style={{ margin: '0 0 0.5rem 0' }}><strong>Année :</strong></p>
                <p style={{ margin: 0 }}>{projectData.year}</p>
              </div>
              <div>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color: '#374151',
                  margin: 0,
                  textAlign: 'justify',
                }}>
                  {description}
                </p>
              </div>
            </div>
          </section>

          {/* ═══ Galerie ═══ */}
          {galleryImages.length > 1 && (
            <section style={{ background: 'transparent', padding: '3rem 6% 4rem' }}>
              <div style={{ maxWidth: 1400, margin: '0 auto' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryImages.map((name, idx) => {
                    const src = `/projects/${name}`;
                    const isPortrait = idx % 3 === 1;
                    return (
                      <div
                        key={name}
                        style={{
                          aspectRatio: isPortrait ? '3/4' : '4/3',
                          background: '#2d2d2d',
                          borderRadius: 8,
                          overflow: 'hidden',
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

          {/* ═══ Navigation retour ═══ */}
          <section style={{ padding: '2rem 6% 5rem' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto' }}>
              <Link
                href={getLocalizedPath('/projects')}
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '0.9rem',
                  color: BORDEAUX,
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                ← {t('projects.backToList') || 'Retour aux projets'}
              </Link>
            </div>
          </section>
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
          <div className="text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <p className="text-gray-600 mb-4">{t('projects.notFound') || 'Projet non trouvé.'}</p>
            <Link href={getLocalizedPath('/projects')} className="text-purple-600 hover:underline font-medium">
              {t('projects.backToList') || 'Retour aux projets'}
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
      : 'Description du projet à venir.',
    client: projectByKey?.client ?? '—',
    services: projectByKey?.services ?? '—',
    year: projectByKey?.year ?? new Date().getFullYear().toString(),
  };

  return (
    <PageLayout>
      <SEO
        title={`${meta.title} | ${t('projects.title')} | Nukleo`}
        description={meta.description}
      />
      <main className="min-h-screen">
        <section style={{ padding: 'clamp(5rem, 12vh, 8rem) 6% 4rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 max-w-[1400px] mx-auto items-start">
            <div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 12 }}>
                projet
              </p>
              <h1 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: '0 0 0.5rem 0',
                display: 'inline-block',
                background: 'linear-gradient(to right, #6B1817, #5636AD)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}>
                {meta.title}
              </h1>
              {meta.category && (
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.95rem', color: '#6b7280', margin: 0 }}>
                  {meta.category}
                </p>
              )}
            </div>
            <div style={{ borderRadius: 12, overflow: 'hidden' }} className="lg:mt-0 mt-6">
              <div style={{ aspectRatio: '21/9', minHeight: 220, maxHeight: 420, background: '#e5e7eb' }}>
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
            </div>
          </div>
        </section>

        <section style={{ padding: '0 6% 5rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(140px,200px)_1fr] gap-8 lg:gap-12 max-w-[1400px] mx-auto items-start">
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.8 }}>
              <p style={{ margin: '0 0 0.5rem 0' }}><strong>Client :</strong></p>
              <p style={{ margin: '0 0 1.25rem 0' }}>{meta.client}</p>
              <p style={{ margin: '0 0 0.5rem 0' }}><strong>Services :</strong></p>
              <p style={{ margin: '0 0 1.25rem 0' }}>{meta.services}</p>
              <p style={{ margin: '0 0 0.5rem 0' }}><strong>Année :</strong></p>
              <p style={{ margin: 0 }}>{meta.year}</p>
            </div>
            <div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1rem', lineHeight: 1.8, color: '#374151', margin: 0, textAlign: 'justify' }}>
                {meta.description}
              </p>
            </div>
          </div>
        </section>

        <section style={{ background: 'transparent', padding: '3rem 6% 4rem' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            {projectImages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectImages.map((name, idx) => {
                  const src = `/projects/${name}`;
                  const isPortrait = idx % 3 === 1;
                  return (
                    <div key={name} style={{ aspectRatio: isPortrait ? '3/4' : '4/3', background: '#2d2d2d', borderRadius: 8, overflow: 'hidden' }}>
                      <OptimizedImage src={src} alt={meta.title} width={isPortrait ? 400 : 600} height={isPortrait ? 533 : 450} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div style={{ aspectRatio: '4/3', background: '#2d2d2d', borderRadius: 8, overflow: 'hidden' }}>
                  <OptimizedImage src={heroImageUrl} alt="" width={600} height={450} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            )}
          </div>
        </section>

        <section style={{ padding: '2rem 6% 5rem' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <Link
              href={getLocalizedPath('/projects')}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.9rem', color: BORDEAUX, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              ← {t('projects.backToList') || 'Retour aux projets'}
            </Link>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
