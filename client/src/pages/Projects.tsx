import SEO from '@/components/SEO';
import { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import ProjectsHero from '@/components/ProjectsHero';
import OptimizedImage from '@/components/OptimizedImage';
import { trpc } from '@/lib/trpc';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { imageNameToSlug, oneImagePerProject, isExcludedProject } from '@/lib/projectSlug';
import { PROJECT_FILTER_LABELS, filterImagesByCategory, type ProjectFilterValue } from '@/data/projectCategories';
import { logger } from '@/lib/logger';
import { MOBILE_BREAKPOINT } from '@/lib/constants';

// Fallback images when API returns nothing
const fallbackImages = [
  'AMQ_1.png',
  'AdeleBlais_2.jpg',
  'Affilia_3.jpg',
  'Affilia_4.jpg',
  'Affilia_7.png',
  'Arsenal_1.jpg',
  'Arsenal_2.jpg',
  'CECS_2.jpg',
  'CQDE_2.jpg',
  'CQDE_4.jpg',
  'D28_24_14.jpg',
  'D28_24_17.jpg',
  'D28_24_19.jpg',
  'D28_24_5.jpg',
  'D28_25_4.jpg',
  'D28_25_5.jpg',
  'D28_25_6.jpg',
  'D28_25_9.jpg',
  'DocTocToc_1.jpg',
  'DocTocToc_2.jpg',
  'FJL_2.jpg',
  'FJL_3.jpg',
  'Humankind_1.jpg',
  'Humankind_2.jpg',
  'MBAM_1.jpg',
  'MBAM_2.jpg',
  'MBAM_9.jpg',
  'MJL_2025_1.jpg',
  'MJL_2025_4.jpg',
  'Matchstick_1.jpg',
  'Matchstick_2.jpg',
  'NouvelleIle_1.png',
  'O-Salon_1.jpg',
  'Psy-etc_1.jpg',
  'Psy-etc_2.jpg',
  'Queertech_1.jpg',
  'Queertech_2.jpg',
  'Reseau-Sante_1.jpg',
  'Reseau-Sante_2.jpg',
  'Rideau_4.jpg',
  'SSCO_1.jpg',
  'SSCO_2.jpg',
  'SSCO_3.jpg',
  'SummitLaw_1.jpg',
  'SummitLaw_13.jpg',
  'SummitLaw_2.jpg',
  'SummitLaw_3.jpg',
  'TAM_1.jpg',
  'TAM_3.jpg',
  'TAM_4.jpg',
  'Zu_2.jpg',
];

// Cell background colors for the 2-column grid (plan: pastel green, pink, teal, black, cyan, red, beige, etc.)
const GRID_BG_COLORS = [
  '#d4edda', '#f8d7da', '#0d9488', '#1a1a1a', '#06b6d4', '#dc2626',
  '#f5f5dc', '#fafafa', '#e9d5ff', '#fef3c7', '#dbeafe', '#fce7f3',
  '#ccfbf1', '#f3e8ff', '#fed7aa', '#e0e7ff',
];

export default function Projects() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const { data: uploadedImages, isLoading: isLoadingImages, error: imagesError } = trpc.projectsImages.list.useQuery(undefined, {
    retry: 1,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      logger.tagged('Projects').error('tRPC error:', error);
    },
    onSuccess: (data) => {
      logger.tagged('Projects').log('tRPC success:', data?.length, 'images');
    },
  });

  const [images, setImages] = useState<string[]>([]);
  const [filter, setFilter] = useState<ProjectFilterValue>('Tous');
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredImages = filterImagesByCategory(images, filter);

  // Preload first images so they start loading before paint (faster LCP)
  useEffect(() => {
    if (filteredImages.length === 0) return;
    const toPreload = filteredImages.slice(0, 6).map((name) => `/projects/${name}`);
    const links: HTMLLinkElement[] = [];
    toPreload.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = href;
      document.head.appendChild(link);
      links.push(link);
    });
    return () => links.forEach((l) => l.remove());
  }, [filteredImages]);

  useEffect(() => {
    if (imagesError) {
      setImages(oneImagePerProject(fallbackImages.filter((name) => !isExcludedProject(name))));
      return;
    }
    if (uploadedImages && Array.isArray(uploadedImages)) {
      const names = uploadedImages.length > 0 ? uploadedImages.map((img) => img.name) : fallbackImages;
      setImages(oneImagePerProject(names.filter((name) => !isExcludedProject(name))));
    } else if (!isLoadingImages) {
      setImages(oneImagePerProject(fallbackImages.filter((name) => !isExcludedProject(name))));
    }
  }, [uploadedImages, isLoadingImages, imagesError]);

  useEffect(() => {
    if (images.length === 0) return;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT;
    const observer = new IntersectionObserver(
      (entries) => {
        requestAnimationFrame(() => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = imageRefs.current.indexOf(entry.target as HTMLDivElement);
              if (index !== -1) setVisibleImages((prev) => new Set(prev).add(index));
            }
          });
        });
      },
      { rootMargin: isMobile ? '80px' : '400px', threshold: 0.01 }
    );
    imageRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, [filteredImages]);

  useEffect(() => {
    if (filteredImages.length === 0) return;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT;
    const n = isMobile ? Math.min(2, filteredImages.length) : Math.min(3, filteredImages.length);
    setVisibleImages(new Set(Array.from({ length: n }, (_, i) => i)));
  }, [filteredImages.length]);

  return (
    <PageLayout>
      <SEO
        title="Projects | Nukleo Digital Portfolio"
        description="Explore our portfolio of creative and digital projects. Branding, web design, mobile apps, marketing campaigns and more."
        keywords="portfolio, projects, branding, web design, digital agency, creative work"
      />

      {/* Fond unifié avec le reste du site (PageLayout) */}
      <div className="min-h-screen">
        <ProjectsHero
          headline={t('projects.heroHeadline')}
          description={t('projects.description')}
          heroImages={filteredImages}
          getProjectUrl={(name) => getLocalizedPath(`/projects/${imageNameToSlug(name)}`)}
          viewProjectLabel={t('projects.viewProject')}
        />

        {/* Filtres par catégorie — sous le triptyque */}
        <section className="container pt-2 pb-6 lg:pb-8">
          <div
            className="flex flex-wrap items-center justify-center gap-2 lg:gap-3"
            role="tablist"
            aria-label={t('projects.filterAriaLabel')}
          >
            {PROJECT_FILTER_LABELS.map((label) => (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={filter === label}
                onClick={() => setFilter(label)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${filter === label
                    ? 'bg-[#5A1E29] text-white shadow-md'
                    : 'bg-white/90 text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* 2-column grid with colored cells */}
        <section className="pb-16 lg:pb-24">
          <div className="container">
            {isLoadingImages ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="w-8 h-8 animate-spin text-[#5A1E29]" />
                <span className="ml-3 text-gray-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t('projects.loadingImages')}</span>
              </div>
            ) : imagesError ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <p className="mb-2">{t('projects.errorLoading')}</p>
                <p className="text-sm text-gray-500">{t('projects.errorRefresh')}</p>
              </div>
            ) : images.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <p className="mb-2">{t('projects.noImages')}</p>
                <p className="text-sm text-gray-500">{t('projects.noImagesAdmin')}</p>
              </div>
            ) : filteredImages.length === 0 ? (
              <p className="text-center py-12 text-gray-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {t('projects.noProjectsInCategory')}
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {filteredImages.map((image, index) => {
                  const isVisible = visibleImages.has(index);
                  const imageAlt = image.replace(/[-_]/g, ' ').replace(/\.(jpg|png|jpeg)$/i, '').replace(/\d+$/, '').trim();
                  const bgColor = GRID_BG_COLORS[index % GRID_BG_COLORS.length];
                  const projectSlug = imageNameToSlug(image);
                  const projectUrl = getLocalizedPath(`/projects/${projectSlug}`);

                  return (
                    <Link
                      key={`${image}-${index}`}
                      href={projectUrl}
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          try { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); } catch { window.scrollTo(0, 0); }
                          document.documentElement.scrollTop = 0;
                          document.body.scrollTop = 0;
                        }
                      }}
                    >
                      <div
                        ref={(el) => { imageRefs.current[index] = el; }}
                        className="block group cursor-pointer overflow-hidden rounded-xl min-h-[240px] sm:min-h-[280px] lg:min-h-[320px] relative"
                        style={{ backgroundColor: bgColor }}
                      >
                        {!isVisible ? (
                          <div className="w-full h-full min-h-[240px] sm:min-h-[280px] lg:min-h-[320px] animate-pulse" />
                        ) : (
                          <>
                            <OptimizedImage
                              src={`/projects/${image}`}
                              alt={imageAlt}
                              width={500}
                              height={333}
                              className="w-full h-full min-h-[240px] sm:min-h-[280px] lg:min-h-[320px] object-cover transition-transform duration-300 group-hover:scale-105"
                              loading={index < 3 ? 'eager' : 'lazy'}
                              fetchPriority={index < 3 ? 'high' : 'low'}
                              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            />
                            <div
                              className="absolute inset-0 flex items-end justify-start bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 lg:p-5"
                              aria-hidden
                            >
                              <span
                                className="text-white font-bold text-left"
                                style={{
                                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                                  fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                                  lineHeight: 1.2,
                                  textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                                }}
                              >
                                {imageAlt}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>

      </div>

    </PageLayout>
  );
}
