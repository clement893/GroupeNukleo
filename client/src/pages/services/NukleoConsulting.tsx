import { Target, TrendingUp, Users, BarChart3, Compass, Lightbulb, ArrowRight, Sparkles, CheckCircle2, Map, Shield, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function NukleoConsulting() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();

  const services = [
    {
      icon: Compass,
      title: 'Audit & diagnostic numérique',
      description: 'Évaluation complète de votre maturité numérique et IA. Identification des opportunités à fort impact et des risques à adresser en priorité.',
      tags: ['Maturité IA', 'Analyse des processus', 'Benchmark'],
    },
    {
      icon: Map,
      title: 'Stratégie & feuille de route',
      description: 'Définition d\'une vision numérique claire et d\'un plan d\'action séquencé, aligné sur vos objectifs business et vos contraintes organisationnelles.',
      tags: ['Roadmap', 'OKRs', 'Priorisation'],
    },
    {
      icon: TrendingUp,
      title: 'Transformation organisationnelle',
      description: 'Accompagnement au changement, formation des équipes, mise en place des nouvelles pratiques de travail augmentées par l\'IA.',
      tags: ['Change management', 'Formation', 'Culture IA'],
    },
    {
      icon: BarChart3,
      title: 'Performance & optimisation',
      description: 'Analyse de vos processus existants et identification des leviers d\'optimisation par l\'IA pour réduire les coûts et accélérer la croissance.',
      tags: ['ROI', 'KPIs', 'Automatisation'],
    },
    {
      icon: Shield,
      title: 'Gouvernance & éthique IA',
      description: 'Mise en place d\'un cadre de gouvernance IA responsable : politiques d\'usage, conformité réglementaire, gestion des risques.',
      tags: ['Conformité', 'Éthique IA', 'RGPD'],
    },
    {
      icon: Users,
      title: 'Co-construction avec vos équipes',
      description: 'Ateliers de co-création, sprints stratégiques et sessions de travail immersives pour aligner toutes les parties prenantes autour d\'une vision commune.',
      tags: ['Ateliers', 'Design thinking', 'Alignement'],
    },
  ];

  const deliverables = [
    'Rapport de diagnostic avec scoring de maturité IA',
    'Feuille de route stratégique sur 12-24 mois',
    'Plan de transformation organisationnelle',
    'Cadre de gouvernance IA documenté',
    'Formation et montée en compétences des équipes',
    'Tableau de bord de suivi de la performance',
  ];

  return (
    <>
      <SEO
        title="Nukleo.Consulting — Transformation & Conseil stratégique | Nukleo"
        description="Audit numérique, stratégie IA, transformation organisationnelle et gouvernance. Le pôle conseil de Nukleo vous guide vers l'excellence numérique avec méthode et rigueur."
        keywords="conseil stratégique IA, transformation numérique, audit IA, feuille de route numérique, gouvernance IA, change management"
      />
      <Header />

      <main className="min-h-screen bg-[oklch(0.08_0.02_280)]">

        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-24">
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, oklch(0.10 0.04 160) 0%, oklch(0.08 0.02 200) 50%, oklch(0.10 0.03 240) 100%)' }} />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/8 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-600/6 rounded-full blur-[100px]" />

          </div>

          <div className="container relative z-10 max-w-6xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <Target className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-300 tracking-widest uppercase">Nukleo.Consulting</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.9]">
              Transformation &<br />
              <span className="text-white">
                Conseil stratégique
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mb-12 leading-relaxed">
              La performance numérique ne s'improvise pas. Elle se construit avec méthode, vision et une compréhension profonde de votre organisation. Nous sommes le partenaire stratégique qui vous fait passer au niveau supérieur.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={getLocalizedPath('/start-project')}>
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full transition-all duration-200">
                  Démarrer un mandat
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

        {/* Services */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-4">Nos mandats</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Du diagnostic<br />à l'exécution.</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <div key={i} className="group p-8 rounded-2xl bg-white/3 border border-white/8 hover:border-emerald-500/30 hover:bg-white/5 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-5">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, j) => (
                        <span key={j} className="px-3 py-1 rounded-full bg-emerald-500/8 border border-emerald-500/15 text-emerald-300 text-xs font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Livrables */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-4">Ce que vous recevez</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Des livrables concrets,<br />pas des rapports.</h2>
                <p className="text-white/50 text-lg leading-relaxed">
                  Chaque mandat de conseil se conclut par des livrables actionnables. Nous ne produisons pas de documents qui finissent dans un tiroir — nous créons des outils que vos équipes utilisent au quotidien.
                </p>
              </div>
              <div className="space-y-4">
                {deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-white/3 border border-white/8">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <Lightbulb className="w-10 h-10 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à prendre le lead ?
            </h2>
            <p className="text-xl text-white/50 mb-10 max-w-2xl mx-auto">
              Un premier échange de 45 minutes pour comprendre votre situation et vous proposer une approche adaptée.
            </p>
            <Link href={getLocalizedPath('/contact')}>
              <button className="inline-flex items-center gap-2 px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full text-lg transition-all duration-200">
                Planifier un appel stratégique
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
