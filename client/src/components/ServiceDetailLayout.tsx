import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
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
  heroImage?: string;
  heroImageAlt?: string;
  /** Si fourni, affiche la section à onglets (gauche: onglets, droite: contenu dynamique). Sinon, affiche nav + bloc mainTitle/mainDescription. */
  tabs?: ServiceTabContent[];
  navItems: { id: string; label: string }[];
  mainTitle: string;
  mainDescription: string;
  mainTags: string[];
  extensionsTitle: string;
  extensionsDescription: string;
  extensionsTags: string[];
  extensionsImage?: string;
  extensionsImageAlt?: string;
  gridItems: { title: string; description: string; deliverables?: string | string[] }[];
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
    heroImage,
    heroImageAlt = '',
    tabs,
    navItems,
    mainTitle,
    mainDescription,
    mainTags,
    extensionsTitle,
    extensionsDescription,
    extensionsTags,
    extensionsImage,
    extensionsImageAlt = '',
    gridItems,
    expertiseSectionTitle = "Nos champs d'expertise",
    expertiseSectionDescription = '',
    expertiseDeliverablesLabel,
    teamTitle,
    teamDescription,
    teamMembers,
    sectionVisualImage,
    sectionVisualAlt = '',
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroTitleGradient = 'linear-gradient(to right, #6B1817, #5636AD)';

  return (
    <main
      className="min-h-screen"
      style={{ background: 'transparent' }}
    >
      {/* Hero : fond transparent pour laisser voir le dégradé global (navbar + hero) */}
      <section
        className="relative pt-24 pb-8 lg:pt-28 lg:pb-12"
        style={{ background: 'transparent', overflow: 'visible' }}
      >
        <div className="container relative" style={{ overflow: 'visible' }}>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3"
            style={{
              background: heroTitleGradient,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              lineHeight: 1.25,
              paddingBottom: '0.28em',
              overflow: 'visible',
            }}
          >
            {pageTitle}
          </h1>
          <p className="text-base lg:text-lg text-gray-700 max-w-2xl mb-8 lg:mb-10 leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {tagline}
          </p>
          {heroImage && (
            <div
              className="rounded-t-[1.75rem] rounded-b-2xl overflow-hidden bg-gray-100 aspect-[21/9] min-h-[200px] max-h-[420px] w-full"
              style={{
                boxShadow: '0 4px 24px rgba(93, 67, 205, 0.08), 0 1px 0 rgba(93, 67, 205, 0.06) inset',
              }}
            >
              <img
                src={heroImage}
                alt={heroImageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Bloc 2 colonnes : onglets glassmorphisme (gauche) + infos service (droite) */}
      <section className="pb-16 lg:pb-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 lg:min-h-[420px]">
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
                      className="w-full text-left py-3 px-4 text-base font-normal transition-all duration-200 rounded-xl"
                      style={
                        activeTabIndex === index
                          ? {
                              background: 'rgba(255, 255, 255, 0.65)',
                              border: '1px solid rgba(255, 255, 255, 0.8)',
                              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                              WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                              backdropFilter: 'blur(16px) saturate(180%)',
                              color: '#111827',
                              isolation: 'isolate',
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }
                          : {
                              background: 'rgba(255, 255, 255, 0.4)',
                              border: '1px solid rgba(255, 255, 255, 0.6)',
                              boxShadow: '0 2px 16px rgba(0, 0, 0, 0.04)',
                              WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                              backdropFilter: 'blur(16px) saturate(180%)',
                              color: '#374151',
                              isolation: 'isolate',
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }
                      }
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              ) : (
                <nav aria-label="Sections du service" className="lg:sticky lg:top-28 space-y-2">
                  <ul className="space-y-0">
                    {navItems.map((item, index) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => setActiveTabIndex(index)}
                          className="w-full text-left py-3 px-4 text-base font-normal transition-all duration-200 rounded-xl"
                          style={
                            activeTabIndex === index
                              ? {
                                  background: 'rgba(255, 255, 255, 0.65)',
                                  border: '1px solid rgba(255, 255, 255, 0.8)',
                                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                                  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                                  backdropFilter: 'blur(16px) saturate(180%)',
                                  color: '#111827',
                                  isolation: 'isolate',
                                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                                }
                              : {
                                  background: 'rgba(255, 255, 255, 0.4)',
                                  border: '1px solid rgba(255, 255, 255, 0.6)',
                                  boxShadow: '0 2px 16px rgba(0, 0, 0, 0.04)',
                                  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                                  backdropFilter: 'blur(16px) saturate(180%)',
                                  color: '#374151',
                                  isolation: 'isolate',
                                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                                }
                          }
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
                  <h2 className="text-3xl lg:text-4xl font-bold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', display: 'inline-block', background: heroTitleGradient, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                    {activeTab.title}
                  </h2>
                  {activeTab.subtitle && (
                    <p className="text-2xl lg:text-3xl font-bold mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', display: 'inline-block', background: heroTitleGradient, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                      {activeTab.subtitle}
                    </p>
                  )}
                  <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-3xl" style={{ color: '#555555', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {activeTab.description}
                  </p>
                  <ul className="space-y-4">
                    {activeTab.benefits.map((benefit, i) => (
                      <li key={i}>
                        <div
                          className="p-5 rounded-xl text-base leading-relaxed text-gray-600"
                          style={{
                            background: 'rgba(255, 255, 255, 0.55)',
                            border: '1px solid rgba(255, 255, 255, 0.75)',
                            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                            backdropFilter: 'blur(16px) saturate(180%)',
                            isolation: 'isolate',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                          }}
                        >
                          {benefit}
                        </div>
                      </li>
                    ))}
                  </ul>
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
                      <div
                        className="flex-shrink-0 flex items-center justify-center rounded-2xl overflow-hidden"
                        style={{
                          width: 240,
                          height: 240,
                          background: `linear-gradient(135deg, ${PURPLE} 0%, #7C3AED 100%)`,
                          boxShadow: '0 8px 32px rgba(93,67,205,0.35)',
                        }}
                      >
                        <Sparkles className="w-16 h-16 text-white/95" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <p className="text-gray-700 leading-relaxed mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{extensionsDescription}</p>
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
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section « Carte visuelle + Texte & 4 cartes glass » — même fond page */}
      {showVisualSection && (
        <section className="pb-16 lg:pb-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Gauche : grande carte illustrée (glassmorphisme) */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div
                  className="rounded-2xl lg:rounded-3xl overflow-hidden min-h-[280px] aspect-[4/3] lg:aspect-square lg:min-h-0"
                  style={{
                    background: 'rgba(255, 255, 255, 0.45)',
                    border: '1px solid rgba(255, 255, 255, 0.75)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                    backdropFilter: 'blur(16px) saturate(180%)',
                    isolation: 'isolate',
                  }}
                >
                  {sectionVisualImage ? (
                    <img
                      src={sectionVisualImage}
                      alt={sectionVisualAlt}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(147, 112, 219, 0.25) 0%, rgba(93, 67, 205, 0.2) 40%, rgba(99, 102, 241, 0.2) 100%)',
                      }}
                    >
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
              {/* Droite : titre, sous-titre, paragraphe, grille 2×2 cartes glass */}
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                {sectionVisualTitle && (
                  <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {sectionVisualTitle}
                  </h2>
                )}
                {sectionVisualSubtitle && (
                  <p className="text-xl lg:text-2xl font-semibold text-gray-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {sectionVisualSubtitle}
                  </p>
                )}
                {sectionVisualDescription && (
                  <p className="text-base lg:text-lg text-gray-600 leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {sectionVisualDescription}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sectionHighlights!.slice(0, 4).map((item, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.55)',
                        border: '1px solid rgba(255, 255, 255, 0.75)',
                        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                        backdropFilter: 'blur(16px) saturate(180%)',
                        isolation: 'isolate',
                      }}
                    >
                      <h3 className="font-bold text-gray-900 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.title}</h3>
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
      <section className="pb-16 lg:pb-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2
              className="text-lg lg:text-xl font-bold tracking-widest uppercase mb-4 text-gray-700"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {expertiseSectionTitle}
            </h2>
            {expertiseSectionDescription && (
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{expertiseSectionDescription}</p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseItems.map((item, index) => {
              const deliverablesText = item.deliverables
                ? Array.isArray(item.deliverables)
                  ? item.deliverables.join(', ')
                  : item.deliverables
                : '';
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.55)',
                    border: '1px solid rgba(255, 255, 255, 0.75)',
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                    backdropFilter: 'blur(16px) saturate(180%)',
                    isolation: 'isolate',
                  }}
                >
                  <h3 className="text-lg font-bold mb-2 text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.description}</p>
                  {deliverablesText && (
                    <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      <span className="font-medium">{expertiseDeliverablesLabel ?? 'Livrables : '}</span>
                      {deliverablesText}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section équipe (photos + noms/rôles) */}
      <section className="pb-16 lg:pb-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2
              className="text-2xl lg:text-3xl font-bold mb-4"
              style={{ color: BORDEAUX, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {teamTitle}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{teamDescription}</p>
          </div>
          {teamMembers && teamMembers.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-14">
              {teamMembers.map((member, index) => (
                <article
                  key={index}
                  className="rounded-2xl overflow-hidden text-center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.55)',
                    border: '1px solid rgba(255, 255, 255, 0.75)',
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                    backdropFilter: 'blur(16px) saturate(180%)',
                    isolation: 'isolate',
                  }}
                >
                  <div className="aspect-square w-full bg-gray-100">
                    <img
                      src={member.image}
                      alt={member.imageAlt ?? `${member.name} - ${member.role}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{member.role}</p>
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
