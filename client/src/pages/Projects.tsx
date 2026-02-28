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
import { imageNameToSlug } from '@/lib/projectSlug';
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
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (imagesError) {
      setImages(fallbackImages);
      return;
    }
    if (uploadedImages && Array.isArray(uploadedImages)) {
      setImages(uploadedImages.length > 0 ? uploadedImages.map((img) => img.name) : fallbackImages);
    } else if (!isLoadingImages) {
      setImages(fallbackImages);
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
      { rootMargin: isMobile ? '30px' : '150px', threshold: 0.01 }
    );
    imageRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, [images]);

  useEffect(() => {
    if (images.length === 0) return;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT;
    const n = isMobile ? Math.min(2, images.length) : Math.min(6, images.length);
    setVisibleImages(new Set(Array.from({ length: n }, (_, i) => i)));
  }, [images.length]);

  return (
    <PageLayout>
      <SEO
        title="Projects | Nukleo Digital Portfolio"
        description="Explore our portfolio of creative and digital projects. Branding, web design, mobile apps, marketing campaigns and more."
        keywords="portfolio, projects, branding, web design, digital agency, creative work"
      />

      {/* Light background: lavender gradient → white */}
      <div className="min-h-screen bg-gradient-to-b from-[#F5F3F8] to-white">
        <ProjectsHero
          headline={t('projects.heroHeadline')}
          description={t('projects.description')}
          heroImages={images}
        />

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
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                {images.map((image, index) => {
                  const isVisible = visibleImages.has(index);
                  const imageAlt = image.replace(/[-_]/g, ' ').replace(/\.(jpg|png|jpeg)$/i, '').replace(/\d+$/, '').trim();
                  const bgColor = GRID_BG_COLORS[index % GRID_BG_COLORS.length];
                  const projectSlug = imageNameToSlug(image);
                  const projectUrl = getLocalizedPath(`/projects/${projectSlug}`);

                  return (
                    <Link key={`${image}-${index}`} href={projectUrl}>
                      <div
                        ref={(el) => { imageRefs.current[index] = el; }}
                        className="block group cursor-pointer overflow-hidden rounded-xl min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]"
                        style={{ backgroundColor: bgColor }}
                      >
                        {!isVisible ? (
                          <div className="w-full h-full min-h-[240px] sm:min-h-[280px] lg:min-h-[320px] animate-pulse" />
                        ) : (
                          <OptimizedImage
                            src={`/projects/${image}`}
                            alt={imageAlt}
                            width={600}
                            height={400}
                            className="w-full h-full min-h-[240px] sm:min-h-[280px] lg:min-h-[320px] object-cover transition-transform duration-300 group-hover:scale-105"
                            loading={index < 4 ? 'eager' : 'lazy'}
                            fetchPriority={index < 4 ? 'high' : 'low'}
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
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
