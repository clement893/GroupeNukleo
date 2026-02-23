import { Code, Cpu, Globe, Layers, Zap, ArrowRight, CheckCircle2, Terminal, Database, Cloud, Bot, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function NukleoTech() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();

  const services = [
    {
      icon: Bot,
      title: 'Agents IA autonomes',
      description: 'Conception et déploiement d\'agents IA capables d\'exécuter des workflows complexes, de prendre des décisions et d\'apprendre de leurs interactions.',
      tags: ['LangChain', 'AutoGen', 'OpenAI', 'Anthropic'],
    },
    {
      icon: Globe,
      title: 'Plateformes numériques sur mesure',
      description: 'Applications web et mobiles haute performance, construites avec les technologies les plus adaptées à vos objectifs business.',
      tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
    },
    {
      icon: Database,
      title: 'Architecture data & IA',
      description: 'Infrastructure de données robuste pour alimenter vos modèles IA : pipelines, entrepôts de données, API et intégrations.',
      tags: ['PostgreSQL', 'Redis', 'Kafka', 'Pinecone'],
    },
    {
      icon: Cloud,
      title: 'Déploiement & DevOps IA',
      description: 'Mise en production sécurisée et scalable de vos solutions IA, avec monitoring, CI/CD et optimisation des coûts cloud.',
      tags: ['AWS', 'Railway', 'Docker', 'Kubernetes'],
    },
    {
      icon: Layers,
      title: 'Intégrations & API',
      description: 'Connexion de vos outils existants à des systèmes IA intelligents — CRM, ERP, plateformes marketing, outils internes.',
      tags: ['REST', 'GraphQL', 'Webhooks', 'tRPC'],
    },
    {
      icon: Terminal,
      title: 'Applications IA propriétaires',
      description: 'Développement d\'outils IA internes sur mesure : assistants, moteurs de recommandation, systèmes d\'analyse prédictive.',
      tags: ['Fine-tuning', 'RAG', 'Vector DB', 'Embeddings'],
    },
  ];

  const process = [
    { step: '01', title: 'Découverte technique', desc: 'Audit de l\'existant, identification des opportunités IA, définition des exigences fonctionnelles et non-fonctionnelles.' },
    { step: '02', title: 'Architecture & prototypage', desc: 'Conception de l\'architecture, choix des technologies, développement d\'un prototype fonctionnel validé avec vous.' },
    { step: '03', title: 'Développement itératif', desc: 'Sprints de 2 semaines, démos régulières, ajustements continus selon vos retours.' },
    { step: '04', title: 'Déploiement & performance', desc: 'Mise en production, tests de charge, monitoring et optimisation continue.' },
  ];

  return (
    <>
      <SEO
        title="Nukleo.Tech — Développement & Intelligence artificielle | Nukleo"
        description="Développement sur mesure, agents IA autonomes, plateformes numériques et architecture data. Le pôle technologique de Nukleo construit les solutions qui propulsent votre performance."
        keywords="développement IA, agents autonomes, plateforme numérique, architecture data, React, Next.js, LangChain, OpenAI"
      />
      <Header />

      <main className="min-h-screen bg-[oklch(0.08_0.02_280)]">

        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-24">
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, oklch(0.10 0.05 280) 0%, oklch(0.08 0.02 260) 50%, oklch(0.10 0.04 300) 100%)' }} />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/6 rounded-full blur-[100px]" />

          </div>

          <div className="container relative z-10 max-w-6xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
              <Code className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300 tracking-widest uppercase">Nukleo.Tech</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.9]">
              Développement &<br />
              <span className="text-white">
                Intelligence artificielle
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mb-12 leading-relaxed">
              Nous construisons les systèmes qui font fonctionner votre vision. Des agents IA autonomes aux plateformes numériques complexes — chaque ligne de code est au service de votre performance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={getLocalizedPath('/start-project')}>
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all duration-200">
                  Démarrer un projet
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
              <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-4">Ce que nous construisons</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Six expertises techniques,<br />une seule obsession.</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <div key={i} className="group p-8 rounded-2xl bg-white/3 border border-white/8 hover:border-blue-500/30 hover:bg-white/5 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-5">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, j) => (
                        <span key={j} className="px-3 py-1 rounded-full bg-blue-500/8 border border-blue-500/15 text-blue-300 text-xs font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-4">Notre processus</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">De l'idée à la production.</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((item, i) => (
                <div key={i} className="relative p-8 rounded-2xl bg-white/3 border border-white/8">
                  <div className="text-5xl font-bold text-white/8 mb-4">{item.step}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <Sparkles className="w-10 h-10 text-blue-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Votre prochain projet commence ici.
            </h2>
            <p className="text-xl text-white/50 mb-10 max-w-2xl mx-auto">
              Décrivez-nous votre défi technique. Nous vous répondons avec une approche concrète sous 48h.
            </p>
            <Link href={getLocalizedPath('/start-project')}>
              <button className="inline-flex items-center gap-2 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full text-lg transition-all duration-200">
                Démarrer un projet
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
