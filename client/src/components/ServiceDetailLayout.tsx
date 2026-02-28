import { useState } from 'react';
import { Link } from 'wouter';
import { SplitCTAButton } from '@/components/SplitCTAButton';

const BORDEAUX = '#5A1E29';
const BTN_PURPLE = '#6B4BEA';

export interface ServiceDetailLayoutProps {
  pageTitle: string;
  tagline: string;
  heroImage?: string;
  heroImageAlt?: string;
  navItems: { id: string; label: string }[];
  mainTitle: string;
  mainDescription: string;
  mainTags: string[];
  extensionsTitle: string;
  extensionsDescription: string;
  extensionsTags: string[];
  extensionsImage?: string;
  extensionsImageAlt?: string;
  gridItems: { title: string; description: string }[];
  teamTitle: string;
  teamDescription: string;
  processSteps: { title: string; description: string }[];
  ctaTitle: string;
  ctaButtonText: string;
  ctaHref: string;
}

export default function ServiceDetailLayout(props: ServiceDetailLayoutProps) {
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const {
    pageTitle,
    tagline,
    heroImage,
    heroImageAlt = '',
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
    teamTitle,
    teamDescription,
    processSteps,
    ctaTitle,
    ctaButtonText,
    ctaHref,
  } = props;

  return (
    <main className="min-h-screen">
      {/* Titre + tagline */}
      <section className="pt-24 pb-6 lg:pt-28 lg:pb-8">
        <div className="container">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2"
            style={{ color: BORDEAUX, fontFamily: 'var(--font-heading, sans-serif)' }}
          >
            {pageTitle}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">{tagline}</p>
        </div>
      </section>

      {/* Hero image */}
      {heroImage && (
        <section className="pb-10 lg:pb-14">
          <div className="container">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-100 aspect-[21/9] min-h-[200px] max-h-[400px]">
              <img
                src={heroImage}
                alt={heroImageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Bloc 2 colonnes : nav + contenu */}
      <section className="pb-16 lg:pb-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            <nav className="lg:col-span-4 xl:col-span-3">
              <ul className="space-y-1">
                {navItems.map((item, index) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveNavIndex(index)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        activeNavIndex === index
                          ? 'bg-white shadow-sm border border-gray-200'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                      style={activeNavIndex === index ? { color: BORDEAUX } : undefined}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="lg:col-span-8 xl:col-span-9">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: BORDEAUX, fontFamily: 'var(--font-heading, sans-serif)' }}>
                {mainTitle}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">{mainDescription}</p>
              <div className="flex flex-wrap gap-2">
                {mainTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloc Extensions / offre liée */}
      <section className="pb-16 lg:pb-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              {extensionsImage ? (
                <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-100 aspect-video">
                  <img src={extensionsImage} alt={extensionsImageAlt} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-purple-100 to-pink-100 aspect-video flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-white/60" />
                </div>
              )}
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: BORDEAUX, fontFamily: 'var(--font-heading, sans-serif)' }}>
                {extensionsTitle}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">{extensionsDescription}</p>
              <div className="flex flex-wrap gap-2">
                {extensionsTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grille d'offres */}
      <section className="pb-16 lg:pb-24">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridItems.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold mb-2" style={{ color: BORDEAUX }}>
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section équipe */}
      <section className="pb-16 lg:pb-24">
        <div className="container">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: BORDEAUX, fontFamily: 'var(--font-heading, sans-serif)' }}>
            {teamTitle}
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl">{teamDescription}</p>
        </div>
      </section>

      {/* Processus */}
      <section className="pb-16 lg:pb-24">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm"
              >
                <span className="text-xs font-bold text-gray-400 mb-2 block">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-bold mb-2" style={{ color: BORDEAUX }}>
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="container text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: BORDEAUX, fontFamily: 'var(--font-heading, sans-serif)' }}>
            {ctaTitle}
          </h2>
          <SplitCTAButton href={ctaHref} label={ctaButtonText} ariaLabel={ctaButtonText} />
        </div>
      </section>
    </main>
  );
}
