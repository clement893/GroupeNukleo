import { Filter, AlertCircle } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { useState, useMemo, useCallback } from 'react';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import SafeHTML from '@/components/SafeHTML';
import { trpc } from '@/lib/trpc';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { logger } from '@/lib/logger';
import enTranslations from '../locales/en.json';
import frTranslations from '../locales/fr.json';

const HERO_GRADIENT = 'linear-gradient(to right, #6B1817, #523DCB)';

export default function Resources() {
  const { t, language } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const subscribe = trpc.contact.subscribe.useMutation();

  const translations = useMemo(() => {
    return language === 'fr' ? frTranslations : enTranslations;
  }, [language]);

  const getArrayTranslation = useCallback((key: string): string[] => {
    try {
      const keys = key.split('.');
      let value: unknown = translations;
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return [];
        }
      }
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  }, [translations]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await subscribe.mutateAsync({ email });
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      logger.tagged('Resources').error('Failed to subscribe:', error);
      setErrorMessage(t('resources.newsletter.error') || 'Failed to subscribe. Please try again.');
      setTimeout(() => setErrorMessage(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tools = useMemo(() => [
    // Radar / glossary / assessment pages retirés de la refonte — section outils vide pour l’instant
  ], []);

  const categories = useMemo(() => [
    { key: 'all', label: t('resources.filter.all') },
    { key: 'industryInsights', label: t('resources.filter.industryInsights') },
    { key: 'technicalGuide', label: t('resources.filter.technicalGuide') },
    { key: 'strategy', label: t('resources.filter.strategy') },
    { key: 'caseStudy', label: t('resources.filter.caseStudy') },
  ], [t]);

  const resources = useMemo(() => [
    { id: 'agentic-ai-playbook', category: 'technicalGuide', title: t('resources.articles.agenticPlaybook.title') || "Le Guide de l'IA Agentic", description: t('resources.articles.agenticPlaybook.description') || "Un guide complet pour implémenter des agents IA autonomes dans votre organisation.", readTime: t('resources.articles.agenticPlaybook.readTime') || '15 min', date: '2025-01-15' },
    { id: 'pilot-to-scale', category: 'strategy', title: t('resources.articles.pilotToScale.title') || "Du pilote à l'échelle : Cadre de transformation IA", description: t('resources.articles.pilotToScale.description') || "Cadre stratégique pour passer de l'expérimentation à l'adoption de l'IA à l'échelle de l'entreprise.", readTime: t('resources.articles.pilotToScale.readTime') || '20 min', date: '2025-01-12' },
    { id: 'agentic-marketing', category: 'industryInsights', title: t('resources.articles.agenticMarketing.title') || "L'avenir du marketing agentic", description: t('resources.articles.agenticMarketing.description') || 'Comment les agents IA transforment les opérations marketing et les expériences client.', readTime: t('resources.articles.agenticMarketing.readTime') || '12 min', date: '2025-01-10' },
    { id: 'building-agentic-systems', category: 'technicalGuide', title: t('resources.articles.buildingAgentic.title') || "Construire des systèmes agentic", description: t('resources.articles.buildingAgentic.description') || "Plongée technique approfondie dans la conception, la construction et le déploiement de systèmes d'agents IA autonomes.", readTime: t('resources.articles.buildingAgentic.readTime') || '18 min', date: '2025-01-10' },
    { id: 'roi-ai-investment', category: 'strategy', title: t('resources.articles.roiInvestment.title') || 'Mesurer le ROI des investissements IA', description: t('resources.articles.roiInvestment.description') || 'Cadres pratiques et métriques pour mesurer le retour sur investissement de vos initiatives IA.', readTime: t('resources.articles.roiInvestment.readTime') || '10 min', date: '2025-01-05' },
  ].filter(r => r.title?.trim() && r.description?.trim()), [t]);

  const filteredResources = useMemo(() => {
    return selectedCategory === 'all' ? resources : resources.filter(r => r.category === selectedCategory);
  }, [selectedCategory, resources]);

  const resourcesCollectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('seo.resources.title') || t('resources.seoTitle') || 'Resources',
    description: t('seo.resources.description') || t('resources.seoDescription') || 'Analyses, guides et recherche',
    url: 'https://nukleodigital-production.up.railway.app/resources',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: resources.map((resource, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: { '@type': 'Article', headline: resource.title, description: resource.description, datePublished: resource.date },
      })),
    },
  };

  return (
    <PageLayout>
      <SEO
        title={t('seo.resources.title') || t('resources.seoTitle')}
        description={t('seo.resources.description') || t('resources.seoDescription')}
        keywords={t('resources.seoKeywords')}
      />
      <StructuredData data={resourcesCollectionSchema} />
      <div className="min-h-screen" style={{ background: 'transparent' }}>
        {/* Hero */}
        <section style={{ padding: 'clamp(5rem, 10vh, 7rem) 0 clamp(3rem, 6vh, 5rem)' }}>
          <div className="container">
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                margin: '0 0 1rem 0',
                paddingBottom: '0.2em',
                overflow: 'visible',
                background: HERO_GRADIENT,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                display: 'inline-block',
              }}
            >
              {t('resources.title')}
            </h1>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                color: '#6b7280',
                lineHeight: 1.5,
                margin: 0,
                maxWidth: 640,
              }}
            >
              {t('resources.description')}
            </p>
          </div>
        </section>

        {/* Tools — masqué tant qu’aucun outil n’est proposé */}
        {tools.length > 0 && (
        <section style={{ padding: '0 0 4rem' }}>
          <div className="container">
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b7280' }}>
                {t('resources.tools.sectionLabel')}
              </span>
              <h2
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  margin: '0.5rem 0 0.5rem 0',
                  display: 'inline-block',
                  background: HERO_GRADIENT,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                }}
              >
                {t('resources.tools.title')}
              </h2>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1rem', color: '#6b7280', margin: 0, maxWidth: 560 }}>
                {t('resources.tools.description')}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              {tools.map((tool, index) => (
                <div
                  key={index}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    padding: '1.5rem 1.75rem',
                    borderRadius: 16,
                    border: '1px solid #e5e7eb',
                    background: '#fff',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  }}
                >
                  <span style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280', marginBottom: '0.75rem' }}>
                    {tool.badge}
                  </span>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '1.35rem', color: '#111827', margin: '0 0 0.5rem 0' }}>
                    {tool.title}
                  </h3>
                  <p style={{ fontSize: '0.9375rem', color: '#4b5563', lineHeight: 1.55, margin: '0 0 1rem 0' }}>
                    {tool.description}
                  </p>
                  {tool.tags && tool.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1rem' }}>
                      {tool.tags.map((tag, idx) => (
                        <span key={idx} style={{ padding: '4px 10px', borderRadius: 999, background: '#f3f4f6', color: '#374151', fontSize: '0.8rem' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link href={tool.link}>
                    <a
                      style={{
                        display: 'inline-block',
                        padding: '0.6rem 1.25rem',
                        borderRadius: 999,
                        background: HERO_GRADIENT,
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        textDecoration: 'none',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      {tool.buttonText}
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* Filter */}
        <section style={{ padding: '0 0 1.5rem' }}>
          <div className="container">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 text-gray-700" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <Filter className="w-4 h-4" />
                <span className="text-sm font-semibold uppercase tracking-wider">{t('resources.filter.label')}</span>
              </div>
              {categories.map((category) => (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => setSelectedCategory(category.key)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    background: selectedCategory === category.key ? '#5A1E29' : 'rgba(255,255,255,0.9)',
                    color: selectedCategory === category.key ? '#fff' : '#374151',
                    border: selectedCategory === category.key ? 'none' : '1px solid #e5e7eb',
                  }}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Resources grid */}
        <section style={{ padding: '0 0 5rem' }}>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => {
                const categoryLabel = categories.find(c => c.key === resource.category)?.label || resource.category;
                return (
                  <Link key={resource.id} href={getLocalizedPath(`/resources/${resource.id}`)}>
                    <a
                      className="block h-full rounded-xl overflow-hidden border border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-300 group"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      <div style={{ padding: '1.5rem 1.75rem' }}>
                        <span style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6b7280', marginBottom: '0.75rem' }}>
                          {categoryLabel}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#5A1E29] transition-colors mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {resource.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                          <span>{resource.readTime}</span>
                          <span>{new Date(resource.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section style={{ padding: '4rem 0 5rem' }}>
          <div className="container">
            <div className="w-full text-center">
              <SafeHTML
                html={t('resources.newsletter.title')}
                tag="h2"
                className="mb-4"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  lineHeight: 1.2,
                  display: 'inline-block',
                  background: HERO_GRADIENT,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                }}
              />
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1rem', color: '#6b7280', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                {t('resources.newsletter.description')}
              </p>
              {isSubmitted && (
                <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 12 }}>
                  <p style={{ color: '#15803d', fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t('resources.newsletter.success')}</p>
                </div>
              )}
              {errorMessage && (
                <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8, padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12 }}>
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p style={{ color: '#b91c1c', fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif", margin: 0 }}>{errorMessage}</p>
                </div>
              )}
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" aria-label={t('resources.newsletter.title') || 'Newsletter'}>
                <label htmlFor="newsletter-email" className="sr-only">{t('resources.newsletter.placeholder')}</label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={t('resources.newsletter.placeholder')}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#5A1E29] focus:ring-1 focus:ring-[#5A1E29] text-gray-900"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                />
                <button
                  type="submit"
                  disabled={isSubmitting || subscribe.isPending}
                  className="px-6 py-3 rounded-xl font-semibold text-white transition-all disabled:opacity-50"
                  style={{ background: HERO_GRADIENT, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {isSubmitting || subscribe.isPending ? (t('resources.newsletter.subscribing') || '...') : t('resources.newsletter.subscribe')}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
