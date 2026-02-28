import { useState } from 'react';
import SEO from '@/components/SEO';
import PageLayout from '@/components/PageLayout';
import Breadcrumb from '@/components/Breadcrumb';
import { trpc } from '@/lib/trpc';
import { useLanguage } from '@/contexts/LanguageContext';
import { logger } from '@/lib/logger';
import { Loader2, Mail } from 'lucide-react';
import { useLocation, Link } from 'wouter';

export default function AITrendRadar() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const { data: latestNews, isLoading: isLoadingNews, error: newsError } = trpc.radar.getLatestNews.useQuery({ limit: 10 }, {
    retry: 2,
    retryDelay: 1000,
  });
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const subscribeNewsletter = trpc.contact.subscribe.useMutation();


  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await subscribeNewsletter.mutateAsync({ email });
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    } catch (error) {
      logger.tagged('AITrendRadar').error('Failed to subscribe:', error);
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-950 to-purple-950">
        <SEO
          title="AI Trend Radar 2025 | Tendances IA Canada | Nukleo Digital"
          description="Découvrez les tendances technologiques en intelligence artificielle pour 2025. Radar interactif des technologies IA émergentes et établies au Canada. Analysez la maturité et l'impact business de chaque technologie."
          keywords="AI trend radar, tendances IA 2025, technologies IA émergentes, AI trends Canada, radar technologique IA, maturité IA, impact business IA"
          ogImage="https://nukleo.digital/og-image.jpg"
        />
        <div className="container pt-32 pb-20">
        <Breadcrumb items={[
          { name: t('nav.resources') || 'Resources', url: '/resources' },
          { name: 'AI Trend Radar', url: '/ai-trend-radar' }
        ]} />
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            Radar Interactif
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">AI Trend</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Radar 2025
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Visualisez l'évolution des technologies IA selon leur maturité et leur impact business. 
            Mise à jour quotidienne avec analyse générée par IA.
          </p>
        </div>

        {/* Latest News Section - Featured */}
        {isLoadingNews && (
          <div className="mb-16 flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
            <span className="ml-3 text-white/70">Chargement des dernières nouvelles...</span>
          </div>
        )}

        {newsError && (
          <div className="mb-16 bg-red-500/20 border border-red-500/50 rounded-2xl p-6 text-center">
            <p className="text-red-300 mb-2">
              Erreur lors du chargement des nouvelles
            </p>
            <p className="text-red-200/70 text-sm">
              Les nouvelles seront disponibles prochainement. Veuillez réessayer plus tard.
            </p>
          </div>
        )}

        {latestNews && latestNews.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  Dernières nouvelles IA
                </h2>
                <p className="text-white/60 text-lg">
                  Les tendances et développements les plus importants du jour
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 text-sm">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                Mise à jour quotidienne
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {latestNews && Array.isArray(latestNews) ? latestNews.map((news) => {
                // Determine if news has a clickable URL or should navigate to radar
                const hasUrl = news.url && typeof news.url === 'string' && news.url.startsWith('http');
                const currentLang = window.location.pathname.startsWith('/fr') ? '/fr' : '';
                const radarUrl = `${currentLang}/radar`;
                
                const cardContent = (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 text-xs font-semibold">
                        {news.technology}
                      </span>
                      <span className="text-white/40 text-xs">
                        {news.date ? new Date(news.date).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'short' 
                        }) : 'Aujourd\'hui'}
                      </span>
                    </div>
                    
                    <h3 className="text-white font-bold text-lg mb-3 group-hover:text-purple-300 transition-colors line-clamp-2 flex-grow">
                      {news.title}
                    </h3>
                    
                    <p className="text-white/70 text-sm leading-relaxed line-clamp-3 mb-4">
                      {news.summary}
                    </p>
                    
                    {news.source && (
                      <p className="text-white/50 text-xs mb-2">
                        Source: {news.source}
                      </p>
                    )}
                    
                    <div className="mt-auto flex items-center gap-2 text-purple-300 text-xs font-semibold">
                      <span>{hasUrl ? 'Lire l\'article' : 'Voir sur le radar'}</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {hasUrl && (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                    </div>
                  </>
                );

                // Render with proper link element
                if (hasUrl) {
                  return (
                    <a
                      key={news.id}
                      href={news.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 group cursor-pointer h-full flex flex-col block"
                    >
                      {cardContent}
                    </a>
                  );
                } else {
                  return (
                    <Link
                      key={news.id}
                      href={radarUrl}
                      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 group cursor-pointer h-full flex flex-col block"
                    >
                      {cardContent}
                    </Link>
                  );
                }
              }) : null}
            </div>
          </div>
        )}

        {!isLoadingNews && !newsError && (!latestNews || latestNews.length === 0) && (
          <div className="mb-16 bg-yellow-500/20 border border-yellow-500/50 rounded-2xl p-6 text-center">
            <p className="text-yellow-300 mb-2">
              Aucune nouvelle disponible pour le moment
            </p>
            <p className="text-yellow-200/70 text-sm">
              Les nouvelles seront mises à jour quotidiennement. Revenez bientôt pour découvrir les dernières tendances IA.
            </p>
          </div>
        )}

        {/* AI News Newsletter Subscription */}
        <div className="mt-16 bg-gradient-to-br from-purple-600/20 via-purple-700/20 to-cyan-600/20 backdrop-blur-md border border-purple-500/30 rounded-3xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/30 border border-purple-400/50 rounded-full text-purple-200 text-sm font-semibold mb-6">
              <Mail className="w-4 h-4" />
              Restez informé
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Recevez les dernières nouvelles IA
            </h2>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Inscrivez-vous à la newsletter <strong className="text-white">AI News de Nukleo</strong> et recevez chaque semaine les tendances, analyses et développements les plus importants en intelligence artificielle.
            </p>

            {isSubscribed && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-2xl backdrop-blur-sm">
                <p className="text-green-300 font-medium">
                  ✓ Merci ! Vérifiez votre boîte mail pour confirmer votre inscription.
                </p>
              </div>
            )}

            {subscribeNewsletter.error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-2xl backdrop-blur-sm">
                <p className="text-red-300 font-medium">
                  Une erreur est survenue. Veuillez réessayer.
                </p>
              </div>
            )}

            <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Votre adresse email"
                className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/30 transition-all text-base"
              />
              <button 
                type="submit"
                disabled={subscribeNewsletter.isPending}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-2xl text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subscribeNewsletter.isPending ? 'Inscription...' : "S'inscrire"}
              </button>
            </form>

            <p className="mt-4 text-white/50 text-sm">
              Nous respectons votre vie privée. Désinscription à tout moment.
            </p>
          </div>
        </div>

        </div>
      </div>
    </PageLayout>
  );
}
