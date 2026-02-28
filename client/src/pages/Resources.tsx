import { Filter, AlertCircle } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { useState, useMemo, useCallback } from 'react';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';
import SafeHTML from '@/components/SafeHTML';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { logger } from '@/lib/logger';
import enTranslations from '../locales/en.json';
import frTranslations from '../locales/fr.json';

export default function Resources() {
  const { t, language } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const subscribe = trpc.contact.subscribe.useMutation();
  
  // Get preloaded translations based on language
  const translations = useMemo(() => {
    return language === 'fr' ? frTranslations : enTranslations;
  }, [language]);

  // Helper to get array from translations using preloaded translations
  // Memoized to prevent unnecessary recalculations
  const getArrayTranslation = useCallback((key: string): string[] => {
    try {
      const keys = key.split('.');
      let value: unknown = translations;
      
      // Navigate through nested keys
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

  // Memoize tools array to prevent recalculation on every render
  const tools = useMemo(() => [
    {
      badge: t('resources.tools.radar.badge'),
      title: t('resources.tools.radar.title'),
      description: t('resources.tools.radar.description'),
      tags: getArrayTranslation('resources.tools.radar.tags'),
      link: getLocalizedPath('/radar'),
      buttonText: t('resources.tools.radar.buttonText')
    }
  ], [t, getArrayTranslation, getLocalizedPath]);

  // Memoize categories array
  const categories = useMemo(() => [
    { key: 'all', label: t('resources.filter.all') },
    { key: 'industryInsights', label: t('resources.filter.industryInsights') },
    { key: 'technicalGuide', label: t('resources.filter.technicalGuide') },
    { key: 'strategy', label: t('resources.filter.strategy') },
    { key: 'caseStudy', label: t('resources.filter.caseStudy') }
  ], [t]);

  // Memoize resources array
  const resources = useMemo(() => [
    {
      id: 'agentic-ai-playbook',
      category: 'technicalGuide',
      title: t('resources.articles.agenticPlaybook.title') || 'Le Guide de l\'IA Agentic',
      description: t('resources.articles.agenticPlaybook.description') || 'Un guide complet pour implémenter des agents IA autonomes dans votre organisation.',
      readTime: t('resources.articles.agenticPlaybook.readTime') || '15 min',
      date: '2025-01-15'
    },
    {
      id: 'pilot-to-scale',
      category: 'strategy',
      title: t('resources.articles.pilotToScale.title') || 'Du pilote à l\'échelle : Cadre de transformation IA',
      description: t('resources.articles.pilotToScale.description') || 'Cadre stratégique pour passer de l\'expérimentation à l\'adoption de l\'IA à l\'échelle de l\'entreprise.',
      readTime: t('resources.articles.pilotToScale.readTime') || '20 min',
      date: '2025-01-12'
    },
    {
      id: 'agentic-marketing',
      category: 'industryInsights',
      title: t('resources.articles.agenticMarketing.title') || 'L\'avenir du marketing agentic',
      description: t('resources.articles.agenticMarketing.description') || 'Comment les agents IA transforment les opérations marketing et les expériences client.',
      readTime: t('resources.articles.agenticMarketing.readTime') || '12 min',
      date: '2025-01-10'
    },
    {
      id: 'building-agentic-systems',
      category: 'technicalGuide',
      title: t('resources.articles.buildingAgentic.title') || 'Construire des systèmes agentic',
      description: t('resources.articles.buildingAgentic.description') || 'Plongée technique approfondie dans la conception, la construction et le déploiement de systèmes d\'agents IA autonomes.',
      readTime: t('resources.articles.buildingAgentic.readTime') || '18 min',
      date: '2025-01-10'
    },
    {
      id: 'roi-ai-investment',
      category: 'strategy',
      title: t('resources.articles.roiInvestment.title') || 'Mesurer le ROI des investissements IA',
      description: t('resources.articles.roiInvestment.description') || 'Cadres pratiques et métriques pour mesurer le retour sur investissement de vos initiatives IA.',
      readTime: t('resources.articles.roiInvestment.readTime') || '10 min',
      date: '2025-01-05'
    }
  ].filter(resource => resource.title && resource.description && resource.title.trim() !== '' && resource.description.trim() !== ''), [t]);

  // Memoize filtered resources
  const filteredResources = useMemo(() => {
    return selectedCategory === 'all' 
      ? resources 
      : resources.filter(r => r.category === selectedCategory);
  }, [selectedCategory, resources]);

  const resourcesCollectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('seo.resources.title') || t('resources.seoTitle') || 'Resources',
    description: t('seo.resources.description') || t('resources.seoDescription') || 'Analyses, guides et recherche des premières lignes de la transformation IA',
    url: 'https://nukleodigital-production.up.railway.app/resources',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: resources.map((resource, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          headline: resource.title,
          description: resource.description,
          datePublished: resource.date,
        },
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
      <div className="min-h-screen bg-gradient-nukleo">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
          
          <div className="container relative z-10">
            <Breadcrumb items={[{ name: t('nav.resources') || 'Resources', url: '/resources' }]} />
            {/* Title */}
            <h1 className="text-[3.5rem] sm:text-[4.5rem] md:text-[6.5rem] lg:text-[8rem] text-white mb-8 leading-[0.85] font-heading font-bold uppercase break-words">
              {t('resources.title')}
            </h1>

            {/* Description */}
            <p className="text-2xl text-white/70 font-light leading-relaxed max-w-3xl border-l-2 border-accent pl-6">
              {t('resources.description')}
            </p>
          </div>
        </section>

        {/* Interactive Tools Section */}
        <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 relative overflow-hidden">
          {/* Animated blobs */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="container relative z-10">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-white rounded-full" />
                {t('resources.tools.sectionLabel')}
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {t('resources.tools.title')}
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                {t('resources.tools.description')}
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {tools.map((tool, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 md:p-12 flex flex-col">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold mb-6 self-start">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    {tool.badge}
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {tool.title}
                  </h3>

                  {/* Description */}
                  <p className="text-lg text-white/80 mb-8 leading-relaxed flex-grow">
                    {tool.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {tool.tags && tool.tags.length > 0 && tool.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-white/90 text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href={tool.link}>
                    <Button className="bg-white text-purple-900 hover:bg-white/90 text-base px-6 py-6 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.022] w-full">
                      {tool.buttonText}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter Section (White Background) */}
        <section className="py-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="container">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-mono uppercase tracking-wider font-semibold">{t('resources.filter.label')}</span>
              </div>
              {categories.map((category) => (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`rounded-full text-sm font-mono uppercase tracking-wider transition-all duration-300 font-semibold ${
                    selectedCategory === category.key 
                      ? "bg-purple-900 text-white hover:bg-purple-800 border-purple-900 dark:bg-purple-700 dark:hover:bg-purple-600" 
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-500 dark:hover:border-purple-500 hover:text-purple-900 dark:hover:text-purple-300"
                  }`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Grid (White Background) */}
        <section className="py-32 bg-white dark:bg-gray-900">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource) => {
                const categoryLabel = categories.find(c => c.key === resource.category)?.label || resource.category;
                return (
                  <Link key={resource.id} href={getLocalizedPath(`/resources/${resource.id}`)}>
                    <div className="bg-white dark:bg-gray-800 p-12 hover:bg-white dark:hover:bg-gray-700 hover:shadow-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-accent dark:hover:border-[#448DFF] transition-all duration-300 group cursor-pointer h-full flex flex-col rounded-3xl relative overflow-hidden">
                      {/* Subtle overlay on hover - doesn't affect text readability */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 to-cyan-50/0 group-hover:from-purple-50/30 dark:group-hover:from-purple-900/20 group-hover:to-cyan-50/20 dark:group-hover:to-cyan-900/10 transition-all duration-300 pointer-events-none" />
                      
                      <div className="relative z-10">
                        {/* Badge */}
                        <div className="mb-6">
                          <span className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-wider bg-purple-100 dark:bg-purple-900/50 text-purple-900 dark:text-purple-200 group-hover:bg-[#448DFF] group-hover:text-white transition-colors rounded-full font-semibold">
                            {categoryLabel}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-900 dark:group-hover:text-purple-300 transition-colors leading-tight">
                          {resource.title}
                        </h3>

                        {/* Description */}
                        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-8 flex-grow group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                          {resource.description}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-700 group-hover:border-gray-300 dark:group-hover:border-gray-600 transition-colors">
                          <span className="font-medium">{resource.readTime}</span>
                          <span>{new Date(resource.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Newsletter Section (Gradient) */}
        <section className="py-32 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 relative overflow-hidden">
          {/* Animated blobs */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-700" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <SafeHTML html={t('resources.newsletter.title')} tag="h2" className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight" />

              <p className="text-xl text-white/70 leading-relaxed mb-12">
                {t('resources.newsletter.description')}
              </p>

              {isSubmitted && (
                <div className="mb-8 p-4 bg-green-500/20 border border-green-500/50 rounded-2xl backdrop-blur-sm">
                  <p className="text-green-300 font-medium text-center">
                    {t('resources.newsletter.success')}
                  </p>
                </div>
              )}

              {errorMessage && (
                <div className="mb-8 flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl backdrop-blur-sm">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-300 font-medium text-center flex-1">
                    {errorMessage}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto" aria-label={t('resources.newsletter.title') || 'Newsletter subscription'}>
                <label htmlFor="newsletter-email" className="sr-only">
                  {t('resources.newsletter.placeholder')}
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-required="true"
                  aria-label={t('resources.newsletter.placeholder')}
                  placeholder={t('resources.newsletter.placeholder')}
                  className="flex-1 px-8 py-5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors text-lg"
                />
                <button 
                  type="submit"
                  disabled={isSubmitting || subscribe.isPending}
                  aria-label={isSubmitting || subscribe.isPending ? t('resources.newsletter.subscribing') : t('resources.newsletter.subscribe')}
                  className="px-10 py-5 rounded-full bg-white text-purple-900 font-bold hover:bg-white/90 transition-all duration-300 hover:scale-[1.022] shadow-2xl text-lg disabled:opacity-50"
                >
                  {isSubmitting || subscribe.isPending ? (t('resources.newsletter.subscribing') || 'Subscribing...') : t('resources.newsletter.subscribe')}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
