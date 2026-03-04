import { useState, useEffect, useRef } from 'react';
import type { ComponentType } from 'react';
import { Sparkles, type LucideIcon } from 'lucide-react';
import CTAPerformSection from '@/components/CTAPerformSection';

const BORDEAUX = '#5A1E29';
const PURPLE = '#5D43CD';

export interface ServiceTabContent {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  description: string;
  benefits: string[];
}

export interface ServiceDetailLayoutProps {
  pageTitle: string;
  tagline: string;
  /** Paragraphe sous le titre (body du hero). Si fourni, affiché sous le tagline. */
  heroDescription?: string;
  /** Badge au-dessus du titre (style "Ils nous font confiance"). Si fourni, affiché au-dessus du pageTitle. */
  heroBadge?: string;
  heroImage?: string;
  heroImageAlt?: string;
  /** Si fourni, affiche une vidéo à la place de l'image hero (même taille, mêmes coins arrondis) */
  heroVideo?: string;
  /** Hauteur du bloc hero (ex. "clamp(384px, 60vh, 624px)"). Par défaut clamp(320px, 50vh, 520px). */
  heroHeight?: string;
  /** Si fourni, affiche la section à onglets (gauche: onglets, droite: contenu dynamique). Sinon, affiche nav + bloc mainTitle/mainDescription. */
  tabs?: ServiceTabContent[];
  navItems: { id: string; label: string }[];
  mainTitle: string;
  mainDescription: string;
  mainTags: string[];
  extensionsTitle: string;
  extensionsDescription: string;
  extensionsTags: string[];
  /** Si true, affiche les 4 points (highlightItems) en liste avec filets, style Studio créatif. Sinon grille 2x2. */
  extensionsHighlightListStyle?: boolean;
  extensionsImage?: string;
  extensionsImageAlt?: string;
  gridItems: { title: string; description: string; deliverables?: string | string[] }[];
  /** Icônes pour chaque bloc de la section CE QUE NOUS CRÉONS (6 max) */
  expertiseIcons?: (LucideIcon | undefined)[];
  /** Icônes 3D colorées (composants React). Prioritaire sur expertiseIcons si fourni. */
  expertiseIconComponents?: readonly ComponentType[];
  expertiseSectionTitle?: string;
  expertiseSectionDescription?: string;
  /** Label pour la ligne livrables (ex. "Livrables : " / "Deliverables: ") */
  expertiseDeliverablesLabel?: string;
  teamTitle: string;
  teamDescription: string;
  /** Membres de l'équipe du département (photo, nom, rôle). Si fourni, affiche une grille de cartes au lieu du seul texte. */
  teamMembers?: { name: string; role: string; image: string; imageAlt?: string }[];
  /** Section « carte visuelle + texte & 4 cartes glass » (affichée après le bloc onglets si fournie) */
  sectionVisualImage?: string;
  sectionVisualAlt?: string;
  /** Si fourni, affiche une vidéo à la place de l'image (même taille, mêmes coins arrondis) */
  sectionVisualVideo?: string;
  sectionVisualTitle?: string;
  sectionVisualSubtitle?: string;
  sectionVisualDescription?: string;
  sectionHighlights?: { title: string; description: string }[];
}

export default function ServiceDetailLayout(props: ServiceDetailLayoutProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const {
    pageTitle,
    tagline,
    heroDescription,
    heroBadge,
    heroImage,
    heroImageAlt = '',
    heroVideo,
    heroHeight,
    tabs,
    navItems,
    mainTitle,
    mainDescription,
    mainTags,
    extensionsTitle,
    extensionsDescription,
    extensionsTags,
    extensionsHighlightListStyle = false,
    extensionsImage,
    extensionsImageAlt = '',
    gridItems,
    expertiseIcons,
    expertiseIconComponents,
    expertiseSectionTitle = "Nos champs d'expertise",
    expertiseSectionDescription = '',
    expertiseDeliverablesLabel,
    teamTitle,
    teamDescription,
    teamMembers,
    sectionVisualImage,
    sectionVisualAlt = '',
    sectionVisualVideo,
    sectionVisualTitle,
    sectionVisualSubtitle,
    sectionVisualDescription,
    sectionHighlights,
  } = props;

  const hasTabs = Boolean(tabs && tabs.length > 0);
  const showVisualSection = Boolean(sectionHighlights && sectionHighlights.length >= 4);
  const activeTab = hasTabs ? tabs![activeTabIndex] : null;
  const highlightItems = gridItems.slice(0, 4);
  const expertiseItems = gridItems;
  const leftVisualRef = useRef<HTMLDivElement | null>(null);
  const rightVisualRef = useRef<HTMLDivElement | null>(null);
  const [rightHeight, setRightHeight] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!showVisualSection) return;

    const updateHeight = () => {
      if (!rightVisualRef.current) return;
      const measured = rightVisualRef.current.offsetHeight;
      setRightHeight(measured || null);
    };

    updateHeight();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateHeight);
      return () => {
        window.removeEventListener('resize', updateHeight);
      };
    }

    return;
  }, [showVisualSection, sectionVisualSubtitle, sectionVisualTitle, sectionVisualDescription, sectionHighlights]);

  const heroTitleGradient = 'linear-gradient(to right, #6B1817, #5636AD)';

  return (
    <main
      className="min-h-screen"
      style={{ background: 'transparent' }}
    >
      {/* Hero — même style et hauteur que page À propos (titre, texte gris, espacements, image) */}
      <section
        className="relative"
        style={{
          padding: 'clamp(14rem, calc(8rem + 12vh), 16rem) 0 clamp(3rem, 6vw, 6rem)',
          background: 'transparent',
          overflow: 'visible',
        }}
      >
        <div className="container relative" style={{ overflow: 'visible' }}>
          <div style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)', overflow: 'visible' }}>
            {heroBadge && (
              <p
                className="text-xs font-medium tracking-[0.35em] uppercase mb-4 text-gray-500"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
              >
                {heroBadge}
              </p>
            )}
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.5rem, 8vw, 9rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                margin: '0 0 0.25rem 0',
                paddingBottom: '0.18em',
                display: 'inline-block',
                overflow: 'visible',
                background: heroTitleGradient,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
            >
              {pageTitle}
            </h1>
            {tagline ? (
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                  color: '#6b7280',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {tagline}
              </p>
            ) : null}
            {heroDescription ? (
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
                  color: '#4b5563',
                  lineHeight: 1.6,
                  margin: '0.75rem 0 0',
                  maxWidth: '42ch',
                }}
              >
                {heroDescription}
              </p>
            ) : null}
          </div>
          {(heroVideo || heroImage) && (
            <div
              className="rounded-xl overflow-hidden bg-gray-100 w-full"
              style={{
                height: heroHeight ?? 'clamp(320px, 50vh, 520px)',
                boxShadow: '0 4px 24px rgba(93, 67, 205, 0.08), 0 1px 0 rgba(93, 67, 205, 0.06) inset',
              }}
            >
              {heroVideo ? (
                <video
                  src={heroVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  aria-label={heroImageAlt || 'Vidéo du studio créatif'}
                />
              ) : (
                <img
                  src={heroImage}
                  alt={heroImageAlt}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}
        </div>
      </section>

      {/* Bloc 2 colonnes : onglets glassmorphisme (gauche) + infos service (droite) */}
      <section className="pb-24 lg:pb-36">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 lg:min-h-[420px]">
            {/* Gauche : onglets glassmorphisme (frosted glass) */}
            <aside className="lg:col-span-3 flex flex-col p-4 lg:p-0 order-2 lg:order-1">
              {hasTabs ? (
                <div
                  role="tablist"
                  aria-label="Sections du service"
                  className="lg:sticky lg:top-28 space-y-2"
                >
                  {tabs!.map((tab, index) => (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={activeTabIndex === index}
                      aria-controls={`service-tabpanel-${tab.id}`}
                      id={`service-tab-${tab.id}`}
                      onClick={() => setActiveTabIndex(index)}
                      className="w-full text-left font-normal transition-all duration-200"
                      style={{
                        display: 'block',
                        width: 'fit-content',
                        background: activeTabIndex === index ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(16px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                        borderRadius: 12,
                        padding: '0.35rem 0.75rem',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.85)',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: '0.6rem',
                        color: activeTabIndex === index ? '#111827' : '#374151',
                        isolation: 'isolate',
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              ) : (
                <nav aria-label="Sections du service" className="lg:sticky lg:top-28 space-y-2">
                  <ul className="space-y-2">
                    {navItems.map((item, index) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => setActiveTabIndex(index)}
                          className="w-full text-left font-normal transition-all duration-200"
                          style={{
                            display: 'inline-block',
                            width: 'fit-content',
                            background: activeTabIndex === index ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 255, 255, 0.4)',
                            backdropFilter: 'blur(16px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                            border: '1px solid rgba(255, 255, 255, 0.8)',
                            borderRadius: 12,
                            padding: '0.35rem 0.75rem',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.85)',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 400,
                            fontSize: '0.6rem',
                            color: activeTabIndex === index ? '#111827' : '#374151',
                            isolation: 'isolate',
                          }}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </aside>
            {/* Droite : infos service — cartes en glassmorphisme */}
            <div
              className="lg:col-span-9 p-4 lg:p-0 order-1 lg:order-2"
              role="tabpanel"
              id={activeTab ? `service-tabpanel-${activeTab.id}` : undefined}
              aria-labelledby={activeTab ? `service-tab-${activeTab.id}` : undefined}
            >
              {hasTabs && activeTab ? (
                <div>
                  {activeTab.subtitle && (
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 24, textAlign: 'left' }}>
                      {activeTab.subtitle}
                    </p>
                  )}
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', display: 'inline-block', background: heroTitleGradient, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                    {activeTab.title}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-3xl" style={{ color: '#555555', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {activeTab.description}
                  </p>
                  <div className="mb-10">
                    {activeTab.benefits.map((benefit, i) => (
                      <div key={i}>
                        <p className="text-base leading-relaxed text-gray-600 py-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", margin: 0 }}>
                          {benefit}
                        </p>
                        <div style={{ height: 1, background: 'rgba(33, 36, 46, 0.2)', margin: 0 }} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-10">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'inline-block', background: heroTitleGradient, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                      {mainTitle}
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{mainDescription}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {mainTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium"
                          style={{ background: 'rgba(255,255,255,0.8)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                      <div className="flex-1 flex flex-col justify-center">
                        <p className="text-gray-700 leading-relaxed mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{extensionsDescription}</p>
                        {extensionsHighlightListStyle ? (
                          <div className="mb-10">
                            {highlightItems.map((item, index) => (
                              <div key={index}>
                                <p className="text-base leading-relaxed text-gray-600 py-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", margin: 0 }}>
                                  <span className="font-semibold text-gray-900">{item.title}</span>
                                  {' — '}
                                  {item.description}
                                </p>
                                <div style={{ height: 1, background: 'rgba(33, 36, 46, 0.2)', margin: 0 }} />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-3">
                            {highlightItems.map((item, index) => (
                              <div
                                key={index}
                                className="p-4 rounded-xl border border-gray-200 shadow-sm"
                                style={{ background: 'rgba(255,255,255,0.95)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                              >
                                <h3 className="font-bold mb-1 text-gray-900 text-sm">{item.title}</h3>
                                <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{item.description}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section « Créativité humaine, outils modernes » — layout référence : visuel gauche, texte droite, 4 cartes */}
      {showVisualSection && (
        <section className="pb-24 lg:pb-36">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-0.5 items-stretch" style={{ gridAutoRows: 'minmax(0, auto)' }}>
              {/* Gauche : vidéo hauteur alignée du sous-titre aux blocs Cohérence/Impact */}
              <div
                className="lg:col-span-5 order-2 lg:order-1 min-h-[200px] lg:min-h-0 lg:overflow-hidden lg:self-stretch"
                ref={leftVisualRef}
              >
                <div
                  className={`w-full h-full overflow-hidden rounded-xl lg:w-full lg:max-w-full ${rightHeight != null ? 'lg:h-full' : 'lg:h-auto lg:aspect-[16/11]'}`}
                  style={{ minHeight: 0, ...(rightHeight != null ? { height: rightHeight } : {}) }}
                >
                  {sectionVisualVideo ? (
                    <video
                      src={sectionVisualVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover object-center rounded-xl"
                      aria-label={sectionVisualAlt || 'Vidéo créativité humaine'}
                    />
                  ) : sectionVisualImage ? (
                    <img
                      src={sectionVisualImage}
                      alt={sectionVisualAlt}
                      className="w-full h-full object-cover object-center rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-24 h-24 rounded-full opacity-80" style={{ background: 'radial-gradient(circle, rgba(147, 197, 253, 0.9) 0%, rgba(99, 102, 241, 0.5) 100%)' }} />
                        <div className="flex gap-3">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-10 h-10 rounded-full opacity-70" style={{ background: 'radial-gradient(circle, rgba(191, 219, 254, 0.95) 0%, rgba(129, 140, 248, 0.6) 100%)' }} />
                          ))}
                        </div>
                        <Sparkles className="w-10 h-10 text-indigo-400/80" strokeWidth={1.5} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Droite : sous-titre aligné au haut de l'image, titre, paragraphe, grille 2×2 */}
              <div
                className="lg:col-span-7 order-1 lg:order-2 px-12 pt-0 pb-0 lg:pl-10 lg:pr-20 lg:pt-0 lg:pb-0 flex flex-col justify-start"
                ref={rightVisualRef}
              >
                {sectionVisualSubtitle && (
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#4b5563',
                      margin: 0,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {sectionVisualSubtitle}
                  </p>
                )}
                {sectionVisualTitle && (
                  <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {sectionVisualTitle}
                  </h2>
                )}
                {sectionVisualDescription && (
                  <p className="text-base text-gray-600 leading-relaxed mb-16" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.7 }}>
                    {sectionVisualDescription}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-4 lg:gap-5">
                  {sectionHighlights!.slice(0, 4).map((item, index) => (
                    <div
                      key={index}
                      className="p-4 lg:p-5 rounded-md flex flex-col"
                      style={{
                        background: 'rgba(255, 255, 255, 0.35)',
                        border: '1px solid rgba(255, 255, 255, 0.6)',
                        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                        backdropFilter: 'blur(16px) saturate(180%)',
                        isolation: 'isolate',
                      }}
                    >
                      <h3 className="text-sm lg:text-base font-bold text-gray-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section "CE QUE NOUS CRÉONS" — titre centré majuscules + grille 6 cartes glassmorphisme + livrables */}
      <section className="pb-24 lg:pb-36">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#6b7280',
                margin: '0 0 1rem 0',
              }}
            >
              {expertiseSectionTitle}
            </p>
            {expertiseSectionDescription && (
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{expertiseSectionDescription}</p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {expertiseItems.map((item, index) => {
              const deliverablesText = item.deliverables
                ? Array.isArray(item.deliverables)
                  ? item.deliverables.join(', ')
                  : item.deliverables
                : '';
              return (
                <div
                  key={index}
                  className="p-4 rounded-lg min-h-[260px] flex flex-col items-start"
                  style={{
                    background: 'rgba(255, 255, 255, 0.35)',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                    backdropFilter: 'blur(16px) saturate(180%)',
                    isolation: 'isolate',
                  }}
                >
                  <div className="mb-3 w-[96px] flex-shrink-0">
                    {expertiseIconComponents?.[index] ? (
                      <span
                        className="flex items-center justify-center"
                        style={{ width: 96, height: 96 }}
                      >
                        {(() => {
                          const IconComponent = expertiseIconComponents[index]!;
                          return <IconComponent />;
                        })()}
                      </span>
                    ) : expertiseIcons?.[index] ? (
                      <span
                        className="w-24 h-24 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(93, 67, 205, 0.12)', color: PURPLE }}
                      >
                        {(() => {
                          const Icon = expertiseIcons[index]!;
                          return <Icon size={40} strokeWidth={2} />;
                        })()}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex-1 flex flex-col justify-end w-full">
                    <h3
                      className="text-lg font-bold mb-2 text-gray-900"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-gray-600 text-sm leading-relaxed mb-3"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {item.description}
                    </p>
                    {deliverablesText && (
                      <div className="pt-3 border-t border-gray-200/60">
                        <p
                          className="text-xs text-gray-500 leading-relaxed"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          <span className="font-medium">{expertiseDeliverablesLabel ?? 'Livrables : '}</span>
                          {deliverablesText}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section équipe (photos + noms/rôles) */}
      <section className="pb-24 lg:pb-36">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#6b7280',
                margin: '0 0 1rem 0',
              }}
            >
              {teamTitle}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{teamDescription}</p>
          </div>
          {teamMembers && teamMembers.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-14">
              {teamMembers.map((member, index) => (
                <article
                  key={index}
                  className="rounded-lg overflow-hidden relative aspect-[3/4]"
                >
                  <img
                    src={member.image}
                    alt={member.imageAlt ?? `${member.name} - ${member.role}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 pt-16 pb-4 px-4"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                    }}
                  >
                    <h3 className="font-bold text-white text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {member.name}
                    </h3>
                    <p className="text-sm text-white/90 mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{member.role}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* CTA — composant partagé (identique Homepage, About, Lab, Agence, Studio, etc.) */}
      <CTAPerformSection />
    </main>
  );
}
