import { useRoute } from 'wouter';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import StructuredData, { createArticleSchema } from '@/components/StructuredData';
import SafeHTML from '@/components/SafeHTML';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

const HERO_GRADIENT = 'linear-gradient(to right, #6B1817, #5636AD)';

export default function ResourceArticle() {
  const [matchEn, paramsEn] = useRoute('/resources/:id');
  const [matchFr, paramsFr] = useRoute('/fr/resources/:id');
  const { t, language } = useLanguage();
  const getLocalizedPath = useLocalizedPath();

  const params = matchEn ? paramsEn : (matchFr ? paramsFr : null);
  const articleId = params?.id || '';

  const articleMap: Record<string, string> = {
    'agentic-ai-playbook': 'agenticPlaybook',
    'pilot-to-scale': 'pilotToScale',
    'agentic-marketing': 'agenticMarketing',
    'building-agentic-systems': 'buildingAgentic',
    'roi-ai-investment': 'roiInvestment',
  };

  const translationKey = articleMap[articleId];

  if (!translationKey || !articleId) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'transparent' }}>
          <div className="text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('resources.articleNotFound') || 'Article non trouvé'}</h1>
            <Link href={getLocalizedPath('/resources')} className="text-[#5A1E29] hover:underline font-medium">{t('resources.backToResources') || 'Retour aux ressources'}</Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  const title = t(`resources.articles.${translationKey}.title`);
  const description = t(`resources.articles.${translationKey}.description`);
  const readTime = t(`resources.articles.${translationKey}.readTime`);
  const content = t(`resources.articles.${translationKey}.content`, { returnObjects: false }) || description;

  if (!title || title.trim() === '') {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'transparent' }}>
          <div className="text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('resources.articleNotFound') || 'Article non trouvé'}</h1>
            <Link href={getLocalizedPath('/resources')} className="text-[#5A1E29] hover:underline font-medium">{t('resources.backToResources') || 'Retour aux ressources'}</Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  const articleDates: Record<string, string> = {
    'agentic-ai-playbook': '2025-01-15',
    'pilot-to-scale': '2025-01-12',
    'agentic-marketing': '2025-01-10',
    'building-agentic-systems': '2025-01-10',
    'roi-ai-investment': '2025-01-05',
  };
  const date = articleDates[articleId] || '2025-01-01';

  const articleSchema = createArticleSchema({
    headline: title,
    description: description,
    datePublished: date,
    author: { name: 'Nukleo Digital', url: 'https://nukleodigital-production.up.railway.app' },
    publisher: { name: 'Nukleo Digital', logo: 'https://nukleodigital-production.up.railway.app/logo.png' },
    url: `https://nukleodigital-production.up.railway.app/resources/${articleId}`,
  });

  return (
    <PageLayout>
      <SEO
        title={`${title} | ${t('resources.seoTitle') || 'Ressources'}`}
        description={description}
        keywords={t('resources.seoKeywords')}
      />
      <StructuredData data={articleSchema} />
      <div className="min-h-screen" style={{ background: 'transparent' }}>
        {/* Hero */}
        <section style={{ padding: 'clamp(5rem, 10vh, 7rem) 0 2rem' }}>
          <div className="container">
            <Link href={getLocalizedPath('/resources')} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors group" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.9rem', fontWeight: 500 }}>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                {t('resources.backToResources') || 'Retour aux ressources'}
              </Link>

            <div style={{ marginBottom: '1rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: 999,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#6b7280',
                  background: '#f3f4f6',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {t(`resources.articles.${translationKey}.category`) || 'Article'}
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
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
              {title}
            </h1>

            <div className="flex items-center gap-3 text-gray-500 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <span className="font-medium">{readTime}</span>
              <span>·</span>
              <span>{new Date(date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </section>

        {/* Article content */}
        <section style={{ padding: '0 0 4rem' }}>
          <div className="container">
            <div className="w-full">
              <article
                style={{
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 16,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  padding: '2rem 1.75rem',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <p className="text-lg text-gray-700 leading-relaxed m-0" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {description}
                  </p>
                </div>

                {content && content !== description && (
                  <>
                    <style>{`
                      .article-content-resources h2 {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: #111827;
                        margin-top: 2.5rem;
                        margin-bottom: 1rem;
                        padding-left: 1rem;
                        border-left: 4px solid transparent;
                        border-image: linear-gradient(to right, #6B1817, #5636AD) 1;
                      }
                      .article-content-resources h3 {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        font-size: 1.25rem;
                        font-weight: 600;
                        color: #111827;
                        margin-top: 2rem;
                        margin-bottom: 0.75rem;
                      }
                      .article-content-resources h4 {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        font-size: 1.1rem;
                        font-weight: 600;
                        color: #374151;
                        margin-top: 1.5rem;
                        margin-bottom: 0.5rem;
                      }
                      .article-content-resources p {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        margin-bottom: 1.25rem;
                        line-height: 1.7;
                        color: #4b5563;
                      }
                      .article-content-resources ul,
                      .article-content-resources ol {
                        margin-bottom: 1.5rem;
                        padding-left: 1.5rem;
                      }
                      .article-content-resources li {
                        margin-bottom: 0.5rem;
                        line-height: 1.65;
                        color: #4b5563;
                      }
                      .article-content-resources li::marker {
                        color: #5A1E29;
                      }
                      .article-content-resources strong {
                        color: #111827;
                        font-weight: 600;
                      }
                      .article-content-resources a {
                        color: #5A1E29;
                        text-decoration: none;
                        font-weight: 500;
                      }
                      .article-content-resources a:hover {
                        text-decoration: underline;
                      }
                      .article-content-resources blockquote {
                        border-left: 4px solid #e5e7eb;
                        padding-left: 1.25rem;
                        margin: 1.5rem 0;
                        color: #6b7280;
                        font-style: italic;
                      }
                    `}</style>
                    <SafeHTML
                      html={content}
                      className="article-content-resources"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    />
                  </>
                )}

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {t('resources.relatedArticles') || 'Articles similaires'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(articleMap)
                      .filter(([id]) => id !== articleId)
                      .slice(0, 2)
                      .map(([id, key]) => {
                        const relatedTitle = t(`resources.articles.${key}.title`);
                        return relatedTitle ? (
                          <Link key={id} href={getLocalizedPath(`/resources/${id}`)} className="block p-4 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-300 transition-all" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                              <h3 className="font-semibold text-gray-900 hover:text-[#5A1E29] transition-colors mb-1">
                                {relatedTitle}
                              </h3>
                              <p className="text-gray-600 text-sm line-clamp-2 m-0">
                                {t(`resources.articles.${key}.description`)}
                              </p>
                            </Link>
                        ) : null;
                      })}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
