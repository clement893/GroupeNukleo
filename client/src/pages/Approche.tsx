import { Compass, Lightbulb, Zap, TrendingUp, ArrowRight, CheckCircle2, Users, Target, Sparkles, Clock, Shield, BarChart3 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function Approche() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();

  const phases = [
    {
      number: '01',
      icon: Compass,
      title: 'Découverte',
      subtitle: 'Comprendre avant d\'agir',
      description: 'Avant d\'écrire la première ligne de code ou de proposer une stratégie, nous prenons le temps de comprendre votre organisation, vos enjeux, vos contraintes et vos ambitions. Cette phase est non négociable.',
      activities: [
        'Entretiens avec les parties prenantes clés',
        'Audit de l\'existant (systèmes, processus, données)',
        'Analyse de la concurrence et du marché',
        'Définition des objectifs et indicateurs de succès',
      ],
      duration: '1–2 semaines',
      color: 'blue',
    },
    {
      number: '02',
      icon: Lightbulb,
      title: 'Stratégie',
      subtitle: 'Concevoir avec rigueur',
      description: 'Sur la base de la découverte, nous co-construisons avec vous une stratégie claire : architecture technique, plan d\'action, priorisation des initiatives et feuille de route. Rien n\'est imposé — tout est co-créé.',
      activities: [
        'Ateliers de co-création avec vos équipes',
        'Définition de l\'architecture et des choix technologiques',
        'Priorisation des initiatives selon l\'impact et l\'effort',
        'Validation de la feuille de route et des jalons',
      ],
      duration: '1–3 semaines',
      color: 'purple',
    },
    {
      number: '03',
      icon: Zap,
      title: 'Implémentation',
      subtitle: 'Exécuter avec excellence',
      description: 'L\'exécution est au cœur de ce que nous faisons. Sprints de deux semaines, démos régulières, ajustements continus. Nous livrons de la valeur à chaque itération, pas seulement en fin de projet.',
      activities: [
        'Développement itératif en sprints de 2 semaines',
        'Démos et retours à chaque sprint',
        'Tests continus et assurance qualité',
        'Documentation et transfert de connaissances',
      ],
      duration: '4–16 semaines',
      color: 'emerald',
    },
    {
      number: '04',
      icon: TrendingUp,
      title: 'Performance',
      subtitle: 'Mesurer et optimiser',
      description: 'Un projet livré n\'est pas un projet terminé. Nous suivons les indicateurs de performance, analysons les données et optimisons en continu pour garantir que votre investissement génère des résultats durables.',
      activities: [
        'Mise en place des tableaux de bord de performance',
        'Analyse des données et identification des opportunités',
        'Optimisation continue des systèmes déployés',
        'Revues trimestrielles et ajustements stratégiques',
      ],
      duration: 'Continu',
      color: 'orange',
    },
  ];

  const principles = [
    {
      icon: Users,
      title: 'La co-création comme fondement',
      description: 'Nous ne travaillons pas pour vous — nous travaillons avec vous. Chaque décision importante est prise ensemble. Vos équipes sont impliquées à chaque étape pour garantir l\'adoption et la durabilité des solutions.',
    },
    {
      icon: Target,
      title: 'L\'impact avant la technologie',
      description: 'La technologie n\'est pas une fin en soi. Nous choisissons les outils en fonction des résultats à atteindre, pas l\'inverse. Si une solution simple résout votre problème, nous la recommandons.',
    },
    {
      icon: Shield,
      title: 'La transparence totale',
      description: 'Pas de boîte noire. Vous avez accès à tout : code, données, décisions, métriques. Nous documentons tout et nous assurons que vos équipes comprennent ce que nous construisons.',
    },
    {
      icon: Clock,
      title: 'La vitesse avec la rigueur',
      description: 'Nous allons vite, mais pas au détriment de la qualité. Notre processus itératif permet de livrer de la valeur rapidement tout en maintenant des standards élevés à chaque étape.',
    },
    {
      icon: BarChart3,
      title: 'Les résultats comme seule mesure',
      description: 'Notre succès se mesure au vôtre. Nous définissons des indicateurs clairs dès le départ et nous nous tenons responsables de les atteindre.',
    },
    {
      icon: Sparkles,
      title: 'L\'IA comme levier, pas comme gadget',
      description: 'Nous intégrons l\'IA là où elle crée une valeur réelle et mesurable. Pas pour suivre une tendance, mais pour vous donner un avantage concurrentiel durable.',
    },
  ];

  const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', badge: 'bg-blue-500/8 border-blue-500/15 text-blue-300' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', badge: 'bg-purple-500/8 border-purple-500/15 text-purple-300' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', badge: 'bg-emerald-500/8 border-emerald-500/15 text-emerald-300' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400', badge: 'bg-orange-500/8 border-orange-500/15 text-orange-300' },
  };

  return (
    <>
      <SEO
        title="Notre approche — Méthodologie Nukleo | Nukleo"
        description="Découverte, stratégie, implémentation, performance. La méthode Nukleo en 4 phases pour garantir des résultats mesurables et durables sur chaque projet."
        keywords="méthodologie Nukleo, approche agile, co-création, transformation numérique, méthode projet IA"
      />
      <Header />

      <main className="min-h-screen bg-[oklch(0.08_0.02_280)]">

        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-24">
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, oklch(0.12 0.04 280) 0%, oklch(0.08 0.02 260) 60%, oklch(0.10 0.03 300) 100%)' }} />
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-purple-600/6 rounded-full blur-[140px]" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
          </div>

          <div className="container relative z-10 max-w-6xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Compass className="w-4 h-4 text-white/60" />
              <span className="text-sm font-medium text-white/60 tracking-widest uppercase">Notre approche</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.9]">
              La méthode qui<br />
              <span className="text-white/70">
                garantit les résultats.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mb-12 leading-relaxed">
              Chaque projet Nukleo suit une méthodologie éprouvée en quatre phases. Pas d'improvisation, pas de promesses vides — une approche structurée qui transforme votre vision en performance mesurable.
            </p>
          </div>
        </section>

        {/* Les 4 phases */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <p className="text-white/40 text-sm font-medium tracking-widest uppercase mb-4">La méthode en 4 phases</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">De la découverte<br />à la performance.</h2>
            </div>

            <div className="space-y-8">
              {phases.map((phase, i) => {
                const Icon = phase.icon;
                const colors = colorMap[phase.color];
                return (
                  <div key={i} className={`p-8 md:p-12 rounded-2xl bg-white/3 border border-white/8 hover:border-white/12 transition-all duration-300`}>
                    <div className="grid md:grid-cols-[auto_1fr_auto] gap-8 items-start">
                      <div className="flex items-center gap-6">
                        <div className="text-6xl font-bold text-white/8 leading-none">{phase.number}</div>
                        <div className={`w-14 h-14 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-7 h-7 ${colors.text}`} />
                        </div>
                      </div>

                      <div>
                        <p className={`text-sm font-medium tracking-widest uppercase ${colors.text} mb-1`}>{phase.subtitle}</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{phase.title}</h3>
                        <p className="text-white/50 leading-relaxed mb-6 max-w-2xl">{phase.description}</p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {phase.activities.map((activity, j) => (
                            <div key={j} className="flex items-start gap-3">
                              <CheckCircle2 className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
                              <span className="text-white/50 text-sm">{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className={`px-4 py-2 rounded-full ${colors.badge} border text-sm font-medium whitespace-nowrap flex-shrink-0`}>
                        {phase.duration}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Principes */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <p className="text-white/40 text-sm font-medium tracking-widest uppercase mb-4">Nos principes</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Ce qui ne change jamais,<br />quel que soit le projet.</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div key={i} className="p-8 rounded-2xl bg-white/3 border border-white/8 hover:bg-white/5 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-white/60" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{p.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à travailler avec méthode ?
            </h2>
            <p className="text-xl text-white/50 mb-10 max-w-2xl mx-auto">
              Découvrez comment notre approche peut s'appliquer à votre contexte spécifique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={getLocalizedPath('/start-project')}>
                <button className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black font-semibold rounded-full text-lg hover:bg-white/90 transition-all duration-200">
                  Démarrer un projet
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href={getLocalizedPath('/services')}>
                <button className="inline-flex items-center gap-2 px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-full text-lg transition-all duration-200">
                  Voir nos départements
                </button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
