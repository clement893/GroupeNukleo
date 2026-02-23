import { Megaphone, TrendingUp, Search, Mail, BarChart3, Globe, ArrowRight, Sparkles, Target, Zap, Users, LineChart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function NukleoAgency() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();

  const services = [
    {
      icon: Target,
      title: 'Stratégie de croissance',
      description: 'Définition d\'une stratégie marketing complète orientée résultats : positionnement, canaux, messages et objectifs de croissance mesurables.',
      tags: ['Go-to-market', 'Positionnement', 'Growth strategy'],
    },
    {
      icon: Search,
      title: 'SEO & contenu organique',
      description: 'Stratégie de contenu et optimisation pour les moteurs de recherche. Construire une présence organique durable qui génère des leads qualifiés.',
      tags: ['SEO technique', 'Content marketing', 'Link building'],
    },
    {
      icon: BarChart3,
      title: 'Marketing de performance',
      description: 'Campagnes publicitaires payantes sur Google, Meta, LinkedIn et autres plateformes, optimisées pour le ROI et le coût d\'acquisition.',
      tags: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'Retargeting'],
    },
    {
      icon: Mail,
      title: 'Marketing automation & CRM',
      description: 'Mise en place de séquences automatisées, nurturing de leads et optimisation du cycle de vente avec les meilleurs outils du marché.',
      tags: ['HubSpot', 'Klaviyo', 'Automation', 'Lead nurturing'],
    },
    {
      icon: Globe,
      title: 'Social media & communauté',
      description: 'Gestion de vos présences sociales, création de contenu engageant et développement d\'une communauté autour de votre marque.',
      tags: ['LinkedIn', 'Instagram', 'Community', 'Influence'],
    },
    {
      icon: LineChart,
      title: 'Analytics & intelligence marketing',
      description: 'Mise en place de tableaux de bord analytiques, attribution multi-touch et utilisation de l\'IA pour optimiser vos décisions marketing.',
      tags: ['GA4', 'Looker Studio', 'Attribution', 'IA prédictive'],
    },
  ];

  const metrics = [
    { value: '3×', label: 'Augmentation moyenne du trafic organique en 12 mois' },
    { value: '40%', label: 'Réduction du coût d\'acquisition client' },
    { value: '2×', label: 'Amélioration du taux de conversion moyen' },
    { value: '85%', label: 'Des clients renouvellent leur mandat après 6 mois' },
  ];

  return (
    <>
      <SEO
        title="Nukleo.Agency — Marketing & Communication | Nukleo"
        description="Stratégie de croissance, SEO, marketing de performance et automation. Le pôle marketing de Nukleo transforme votre visibilité en résultats mesurables."
        keywords="agence marketing IA, stratégie croissance, SEO, marketing performance, automation marketing, Google Ads, Meta Ads"
      />
      <Header />

      <main className="min-h-screen bg-[oklch(0.08_0.02_280)]">

        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-24">
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, oklch(0.10 0.05 40) 0%, oklch(0.08 0.03 20) 50%, oklch(0.10 0.04 60) 100%)' }} />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/8 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-600/6 rounded-full blur-[100px]" />

          </div>

          <div className="container relative z-10 max-w-6xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8">
              <Megaphone className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-300 tracking-widest uppercase">Nukleo.Agency</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.9]">
              Marketing &<br />
              <span className="text-white">
                Communication
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mb-12 leading-relaxed">
              La meilleure technologie ne vaut rien si personne ne la connaît. Nous construisons votre présence, amplifions votre message et transformons votre visibilité en croissance réelle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={getLocalizedPath('/start-project')}>
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-full transition-all duration-200">
                  Accélérer ma croissance
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href={getLocalizedPath('/services')}>
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-full transition-all duration-200">
                  Voir tous les départements
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Métriques */}
        <section className="py-16 px-6 border-b border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {metrics.map((m, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">{m.value}</div>
                  <p className="text-white/40 text-sm leading-relaxed">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <p className="text-orange-400 text-sm font-medium tracking-widest uppercase mb-4">Nos services</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Visibilité, acquisition,<br />rétention.</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <div key={i} className="group p-8 rounded-2xl bg-white/3 border border-white/8 hover:border-orange-500/30 hover:bg-white/5 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-orange-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-5">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, j) => (
                        <span key={j} className="px-3 py-1 rounded-full bg-orange-500/8 border border-orange-500/15 text-orange-300 text-xs font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Différenciateur IA */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-orange-400 text-sm font-medium tracking-widest uppercase mb-4">Notre avantage</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Le marketing augmenté<br />par l'intelligence artificielle.</h2>
                <p className="text-white/50 text-lg leading-relaxed mb-8">
                  Contrairement aux agences traditionnelles, nous intégrons l'IA à chaque étape de votre stratégie marketing : personnalisation à grande échelle, optimisation en temps réel, analyse prédictive et création de contenu accélérée.
                </p>
                <p className="text-white/50 text-lg leading-relaxed">
                  Le résultat : des campagnes plus intelligentes, des décisions plus rapides, et une croissance qui se mesure.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Zap, label: 'Optimisation en temps réel' },
                  { icon: Users, label: 'Personnalisation à grande échelle' },
                  { icon: BarChart3, label: 'Analyse prédictive' },
                  { icon: Sparkles, label: 'Création de contenu IA' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="p-6 rounded-2xl bg-white/3 border border-white/8 text-center">
                      <Icon className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                      <p className="text-white/70 text-sm font-medium">{item.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <TrendingUp className="w-10 h-10 text-orange-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à accélérer ?
            </h2>
            <p className="text-xl text-white/50 mb-10 max-w-2xl mx-auto">
              Partagez-nous vos objectifs de croissance. Nous vous proposons une stratégie sur mesure.
            </p>
            <Link href={getLocalizedPath('/start-project')}>
              <button className="inline-flex items-center gap-2 px-10 py-5 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-full text-lg transition-all duration-200">
                Démarrer ma stratégie
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
