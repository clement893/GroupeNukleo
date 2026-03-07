import ProjectsHeroTriptych from '@/components/ProjectsHeroTriptych';

interface ProjectsHeroProps {
  headline: string;
  description: string;
  /** Images for hero: first 3 used in triptych, rest unused */
  heroImages: string[];
  /** Titles for each slide (01, 02, 03) — displayed above the button */
  heroTitles?: string[];
  /** Returns URL for a project detail page given image name. If not provided, triptych panels won't link. */
  getProjectUrl?: (imageName: string) => string;
  /** Label for "View project" link (e.g. "View project →"). Optional, for i18n. */
  viewProjectLabel?: string;
}

const SLIDE_LABELS = ['01', '02', '03'];

function getTriptychImages(heroImages: string[]): string[] {
  const list = heroImages.length ? heroImages : [];
  return [
    list[0] ?? list[0],
    list[1] ?? list[0],
    list[2] ?? list[0],
  ].filter(Boolean);
}

export default function ProjectsHero({ headline, description, heroImages, heroTitles, getProjectUrl, viewProjectLabel = 'Voir le projet →' }: ProjectsHeroProps) {
  const triptychImages = getTriptychImages(heroImages);
  const slideTitles = heroTitles && heroTitles.length >= 3 ? heroTitles.slice(0, 3) : [];

  const items = triptychImages.slice(0, 3).map((imageName, i) => ({
    img: `/projects/${imageName}`,
    title: slideTitles[i] || undefined,
    num: SLIDE_LABELS[i],
  }));

  return (
    <section style={{ padding: 'clamp(6rem, 12vh, 8rem) 0 clamp(2rem, 4vw, 4rem)', overflow: 'visible' }}>
      <div className="container">
        {/* Titre + sous-titre — même disposition que page d'accueil et À propos */}
        <div style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)', overflow: 'visible' }}>
          <h1
            style={{
              fontFamily: "'Neue Haas Unica Pro', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.5rem, 8vw, 9rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              margin: '0 0 0.25rem 0',
              paddingBottom: '0.18em',
              display: 'inline-block',
              overflow: 'visible',
              background: 'linear-gradient(to right, #6B1817, #523DCB)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {headline}
          </h1>
          <p
            style={{
              fontFamily: "'Neue Haas Unica Pro', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              color: '#6b7280',
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>

        {items.length > 0 && (
          <ProjectsHeroTriptych
            items={items}
            getProjectUrl={getProjectUrl ? (i) => getProjectUrl(triptychImages[i]) : undefined}
            viewProjectLabel={viewProjectLabel}
          />
        )}
      </div>
    </section>
  );
}
