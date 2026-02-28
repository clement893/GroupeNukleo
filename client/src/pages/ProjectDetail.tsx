import { useLocation, Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import OptimizedImage from '@/components/OptimizedImage';
import { trpc } from '@/lib/trpc';
import { useLanguage } from '@/contexts/LanguageContext';
import { slugToImageName } from '@/lib/projectSlug';
import { useEffect, useState } from 'react';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const FALLBACK_IMAGES = [
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
const OFF_WHITE = '#EFE8E8';

/** Metadata for known projects. Fallback for others from filename. */
const PROJECT_METADATA: Record<string, { title: string; category?: string; subtitle?: string; description: string; client?: string; services?: string; year?: string }> = {
  'mbam-1': {
    title: 'Les cercles de la Fondation du MBAM',
    category: 'Fondation, Design & Marketing',
    subtitle: 'Fondation Jean-Paul Riopelle',
    description: "Pour animer les soirées charité de la Fondation du Musée des Beaux-Arts de Montréal, Nukleo a conçu l'identité visuelle propre à chacune des trois soirées : Contre-jour, Perspectives et Le Cercle des Anges. Stratégie de communication, design et développement web au service d'événements mémorables.",
    client: 'Fondation du MBAM',
    services: 'Stratégie, Design, Développement web',
    year: '2023',
  },
  'mbam-2': {
    title: 'Fondation du MBAM',
    category: 'Art & culture',
    description: "Identité visuelle et supports de communication pour les événements de la Fondation du Musée des Beaux-Arts de Montréal.",
    client: 'Fondation du MBAM',
    services: 'Design, Communication',
    year: '2023',
  },
  'zu-2': {
    title: 'Titre du projet',
    category: 'Catégorie, Design & Marketing',
    subtitle: 'Sous-titre du projet',
    description: "Description du projet. Placeholder : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    client: 'Nom du client',
    services: 'Stratégie, Design, Développement',
    year: '2023',
  },
};

function getProjectMeta(slug: string, imageName: string, _language: string) {
  const meta = PROJECT_METADATA[slug];
  if (meta) {
    return {
      title: meta.title,
      category: meta.category,
      subtitle: meta.subtitle,
      description: meta.description,
      client: meta.client ?? '—',
      services: meta.services ?? '—',
      year: meta.year ?? new Date().getFullYear().toString(),
    };
  }
  const baseName = imageName.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '').replace(/[-_]/g, ' ');
  const title = baseName.replace(/\d+$/, '').trim() || baseName;
  return {
    title: title.charAt(0).toUpperCase() + title.slice(1).toLowerCase(),
    category: undefined,
    subtitle: undefined,
    description: 'Description du projet à venir.',
    client: '—',
    services: '—',
    year: new Date().getFullYear().toString(),
  };
}

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
      setImageNames(uploadedImages.map((img) => img.name));
    } else {
      setImageNames(FALLBACK_IMAGES);
    }
  }, [uploadedImages]);

  const imageName = slug ? slugToImageName(slug, imageNames.length > 0 ? imageNames : FALLBACK_IMAGES) : null;
  const meta = imageName && slug ? getProjectMeta(slug, imageName, language) : null;

  if (!slug || !imageName || !meta) {
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

  const heroImageUrl = `/projects/${imageName}`;

  return (
    <PageLayout>
      <SEO
        title={`${meta.title} | ${t('projects.title')} | Nukleo`}
        description={meta.description || `${meta.title} — projet Nukleo Digital`}
      />
      <main className="min-h-screen">
        {/* ═══ Hero : fond beige, gauche = label + titre + sous-titre, droite = grande image ═══ */}
        <section style={{ padding: 'clamp(5rem, 12vh, 8rem) 6% 4rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 max-w-[1400px] mx-auto items-start">
            <div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 12 }}>
                projet
              </p>
              <h1
                style={{
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
                }}
              >
                {meta.title}
              </h1>
              {meta.category && (
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.95rem', color: '#6b7280', margin: 0 }}>
                  {meta.category}
                </p>
              )}
            </div>
            <div style={{ borderRadius: 12, overflow: 'hidden', marginTop: 0 }} className="lg:mt-0 mt-6">
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

        {/* ═══ Bloc texte : gauche = métadonnées (Client, Services, Année), droite = description ═══ */}
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

        {/* ═══ Galerie : 3 lignes de 2 images, fond sombre ═══ */}
        <section style={{ background: 'transparent', padding: '3rem 6% 4rem' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            {/* Ligne 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div style={{ aspectRatio: '4/3', background: '#2d2d2d', borderRadius: 8, overflow: 'hidden' }}>
                <OptimizedImage src={heroImageUrl} alt="" width={600} height={450} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div style={{ aspectRatio: '4/3', background: '#2d2d2d', borderRadius: 8, overflow: 'hidden' }}>
                <OptimizedImage src={heroImageUrl} alt="" width={600} height={450} className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
            {/* Ligne 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div style={{ aspectRatio: '3/4', background: '#2d2d2d', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '0.875rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Placeholder</div>
              </div>
              <div style={{ aspectRatio: '3/4', background: '#2d2d2d', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '0.875rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Placeholder</div>
              </div>
            </div>
            {/* Ligne 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div style={{ aspectRatio: '4/3', background: '#2d2d2d', borderRadius: 8, overflow: 'hidden' }}>
                <OptimizedImage src={heroImageUrl} alt="" width={600} height={450} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div style={{ aspectRatio: '4/3', background: '#2d2d2d', borderRadius: 8, overflow: 'hidden' }}>
                <OptimizedImage src={heroImageUrl} alt="" width={600} height={450} className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

      </main>
    </PageLayout>
  );
}
