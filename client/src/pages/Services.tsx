import { Code, Palette, Layers, ArrowRight, Smartphone, Globe, Zap, Link2, PenTool, Sparkles, Camera, Film, Target, Users, MessageSquare, TrendingUp, Megaphone, BarChart3, Search, Mail } from 'lucide-react';
import SEO from '@/components/SEO';
import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { SplitCTAButton } from '@/components/SplitCTAButton';
import StructuredData, { serviceSchema } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function Services() {
  const { t, language } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  
  // Get translations with fallbacks
  const heroTitle = t('services.heroTitle') || 'Quatre expertises,';
  const heroSubtitle = t('services.heroSubtitle') || 'une performance.';
  const heroSubtitleGradient = t('services.heroSubtitleGradient') || 'Agency · Studio · Tech · Consulting';
  const heroDescription = t('services.heroDescription') || 'Marketing, design, développement et transformation numérique — quatre départements complémentaires, augmentés par l\'IA, pour prendre le lead dans l\'économie numérique.';
  const ourServices = t('services.ourServices') || 'Nos Départements';
  
  const entities = [
    {
      id: 'agency',
      number: t('services.agency.number') || '01',
      name: t('services.agency.category') || 'Nukleo.Agency',
      tagline: t('services.agency.tagline') || 'Marketing & Communication 360',
      icon: Megaphone,
      description: t('services.agency.description') || 'Nous activons et amplifions votre présence numérique. Marketing numérique, gestion des médias sociaux, achat média, stratégie de contenu, infolettres et campagnes de performance — augmentés par l\'IA.',
      link: '/services/agency',
      services: [
        {
          icon: MessageSquare,
          title: t('services.agency.services.socialMedia.title') || 'Médias sociaux',
          description: t('services.agency.services.socialMedia.description') || 'Gestion de communauté, création de contenu et stratégie social media',
        },
        {
          icon: Search,
          title: t('services.agency.services.seoSea.title') || 'SEO & Publicité numérique',
          description: t('services.agency.services.seoSea.description') || 'Référencement naturel, Google Ads, Meta Ads et achat média',
        },
        {
          icon: Mail,
          title: t('services.agency.services.contentStrategy.title') || 'Stratégie de contenu',
          description: t('services.agency.services.contentStrategy.description') || 'Infolettres, blogue, copywriting et stratégie éditoriale',
        },
        {
          icon: BarChart3,
          title: t('services.agency.services.analytics.title') || 'Analytics & Performance',
          description: t('services.agency.services.analytics.description') || 'Tableaux de bord, suivi des KPIs et optimisation continue',
        },
      ],
      cta: t('services.agency.cta') || 'Explorer Nukleo.Agency',
    },
    {
      id: 'studio',
      number: t('services.studio.number') || '02',
      name: t('services.studio.category') || 'Nukleo.Studio',
      tagline: t('services.studio.tagline') || 'Design & Création',
      icon: Palette,
      description: t('services.studio.description') || 'Nous créons des expériences visuelles et créatives qui rendent votre performance visible et désirable. Design graphique, UX/UI, branding, direction artistique et production créative.',
      link: '/services/studio',
      services: [
        {
          icon: Sparkles,
          title: t('services.studio.services.branding.title') || 'Branding & Identité',
          description: t('services.studio.services.branding.description') || 'Logos, chartes graphiques et univers de marque mémorables',
        },
        {
          icon: PenTool,
          title: t('services.studio.services.uiuxDesign.title') || 'UX/UI Design',
          description: t('services.studio.services.uiuxDesign.description') || 'Interfaces intuitives qui transforment les visiteurs en clients',
        },
        {
          icon: Camera,
          title: t('services.studio.services.artDirection.title') || 'Direction Artistique',
          description: t('services.studio.services.artDirection.description') || 'Concepts créatifs et cohérence visuelle sur tous vos supports',
        },
        {
          icon: Film,
          title: t('services.studio.services.campaigns.title') || 'Production créative',
          description: t('services.studio.services.campaigns.description') || 'Visuels de campagne, motion design et assets créatifs',
        },
      ],
      cta: t('services.studio.cta') || 'Explorer Nukleo.Studio',
    },
    {
      id: 'lab',
      number: t('services.lab.number') || '03',
      name: t('services.lab.category') || 'Nukleo.Tech',
      tagline: t('services.lab.tagline') || 'Développement & Intelligence artificielle',
      icon: Code,
      description: t('services.lab.description') || 'Nous concevons et développons les outils numériques qui propulsent votre performance. Développement web, applications mobiles, intégrations IA, automatisation et agents IA sur mesure.',
      link: '/services/tech',
      services: [
        {
          icon: Smartphone,
          title: t('services.lab.services.mobileApps.title') || 'Applications mobiles',
          description: t('services.lab.services.mobileApps.description') || 'Apps iOS, Android et cross-platform avec une UX exceptionnelle',
        },
        {
          icon: Globe,
          title: t('services.lab.services.webApps.title') || 'Développement web',
          description: t('services.lab.services.webApps.description') || 'Sites web, plateformes et applications web robustes et scalables',
        },
        {
          icon: Link2,
          title: t('services.lab.services.integrations.title') || 'Intégrations & APIs',
          description: t('services.lab.services.integrations.description') || 'Connexion de vos outils pour un écosystème numérique fluide',
        },
        {
          icon: Zap,
          title: t('services.lab.services.automation.title') || 'IA & Automatisation',
          description: t('services.lab.services.automation.description') || 'Agents IA sur mesure et automatisation des processus métier',
        },
      ],
      cta: t('services.lab.cta') || 'Explorer Nukleo.Tech',
    },
    {
      id: 'bureau',
      number: t('services.bureau.number') || '04',
      name: t('services.bureau.category') || 'Nukleo.Consulting',
      tagline: t('services.bureau.tagline') || 'Transformation numérique & Conseil',
      icon: Layers,
      description: t('services.bureau.description') || 'Nous accompagnons votre organisation dans sa transformation numérique. Audit, stratégie, conseil IA, accompagnement au changement et formation — de la vision à l\'exécution.',
      link: '/services/consulting',
      services: [
        {
          icon: Target,
          title: t('services.bureau.services.digitalStrategy.title') || 'Stratégie numérique',
          description: t('services.bureau.services.digitalStrategy.description') || 'Vision claire, feuille de route actionnable et conseil IA',
        },
        {
          icon: Users,
          title: t('services.bureau.services.transformation.title') || 'Transformation numérique',
          description: t('services.bureau.services.transformation.description') || 'Accompagnement au changement et adoption des outils numériques',
        },
        {
          icon: TrendingUp,
          title: t('services.bureau.services.digitalMarketing.title') || 'Formation & Coaching',
          description: t('services.bureau.services.digitalMarketing.description') || 'Montée en compétences de vos équipes sur le numérique et l\'IA',
        },
        {
          icon: MessageSquare,
          title: t('services.bureau.services.communication.title') || 'Audit & Diagnostic',
          description: t('services.bureau.services.communication.description') || 'Évaluation de votre maturité numérique et recommandations',
        },
      ],
      cta: t('services.bureau.cta') || 'Explorer Nukleo.Consulting',
    },
  ];

  const combinations = [
    {
      project: t('services.howItWorks.combinations.brandLaunch.project') || 'Lancement de marque',
      teams: t('services.howItWorks.combinations.brandLaunch.teams') || 'Agency + Studio',
      deliverables: t('services.howItWorks.combinations.brandLaunch.deliverables') || 'Identité visuelle + stratégie de lancement + campagne',
    },
    {
      project: t('services.howItWorks.combinations.mobileApp.project') || 'Application mobile',
      teams: t('services.howItWorks.combinations.mobileApp.teams') || 'Tech + Studio',
      deliverables: t('services.howItWorks.combinations.mobileApp.deliverables') || 'Développement + UX/UI design',
    },
    {
      project: t('services.howItWorks.combinations.digitalOverhaul.project') || 'Transformation numérique complète',
      teams: t('services.howItWorks.combinations.digitalOverhaul.teams') || 'Agency + Studio + Tech + Consulting',
      deliverables: t('services.howItWorks.combinations.digitalOverhaul.deliverables') || 'Nouvelle plateforme + branding + stratégie + accompagnement',
    },
    {
      project: t('services.howItWorks.combinations.marketingCampaign.project') || 'Campagne marketing',
      teams: t('services.howItWorks.combinations.marketingCampaign.teams') || 'Agency + Studio',
      deliverables: t('services.howItWorks.combinations.marketingCampaign.deliverables') || 'Visuels + stratégie + déploiement',
    },
  ];

  const serviceLevels = [
    {
      name: t('services.serviceLevels.alaCarte.name') || 'À la carte',
      tagline: t('services.serviceLevels.alaCarte.tagline') || 'Flexibilité maximale',
      description: t('services.serviceLevels.alaCarte.description') || 'Commandez exactement ce dont vous avez besoin, quand vous en avez besoin. Idéal pour les projets ponctuels, les mandats spécifiques ou les organisations qui souhaitent tester notre approche.',
      highlights: (t('services.serviceLevels.alaCarte.highlights') as unknown as string[]) || ['Projets ponctuels', 'Mandats spécifiques', 'Sans engagement'],
      gradient: 'from-cyan-400/20 to-blue-500/20',
      border: 'border-cyan-400/30',
    },
    {
      name: t('services.serviceLevels.enContinu.name') || 'En continu',
      tagline: t('services.serviceLevels.enContinu.tagline') || 'Partenariat mensuel',
      description: t('services.serviceLevels.enContinu.description') || 'Un partenariat mensuel pour une présence numérique constante et une amélioration continue. Votre équipe numérique dédiée, à un coût prévisible.',
      highlights: (t('services.serviceLevels.enContinu.highlights') as unknown as string[]) || ['Équipe dédiée', 'Coût prévisible', 'Amélioration continue'],
      gradient: 'from-[#523DCB]/20 to-[#523DCB]/20',
      border: 'border-blue-500/30',
    },
    {
      name: t('services.serviceLevels.cocreation.name') || 'Co-création',
      tagline: t('services.serviceLevels.cocreation.tagline') || 'Transformation profonde',
      description: t('services.serviceLevels.cocreation.description') || 'Pour les organisations qui souhaitent une transformation numérique profonde. Nous devenons votre partenaire stratégique intégré, engagés sur vos résultats à long terme.',
      highlights: (t('services.serviceLevels.cocreation.highlights') as unknown as string[]) || ['Partenariat stratégique', 'Engagement sur les résultats', 'Transformation profonde'],
      gradient: 'from-[#523DCB]/20 to-pink-500/20',
      border: 'border-[#523DCB]/30',
    },
  ];

  const howItWorksTitle = t('services.howItWorks.title') || 'Une approche intégrée';
  const howItWorksDescription = t('services.howItWorks.description') || 'Nos quatre départements travaillent main dans la main. Selon votre projet, faites appel à un seul département ou combinez-les pour une solution 360 complète.';
  const ctaTitle = t('services.cta.title') || 'Pas sûr de ce dont vous avez besoin ?';
  const ctaDescription = t('services.cta.description') || 'Discutons de votre projet. Nous vous orienterons vers le bon département — ou la bonne combinaison.';
  const ctaButtonPrimary = t('services.cta.buttonPrimary') || 'Parler à un expert';
  const ctaButtonSecondary = t('services.cta.buttonSecondary') || 'Voir nos réalisations';

  return (
    <PageLayout>
      <SEO 
        title={t('seo.services.title') || 'Nos Départements — Nukleo.Agency, Studio, Tech, Consulting'}
        description={t('seo.services.description') || 'Découvrez l\'offre complète de Nukleo : marketing numérique, design, développement web et IA, transformation numérique. Un écosystème 360 augmenté par l\'IA.'}
        keywords="Nukleo Agency, Nukleo Studio, Nukleo Tech, Nukleo Consulting, marketing numérique, design, développement IA, transformation numérique"
        ogImage="https://nukleo.digital/og-services.jpg"
      />
      <StructuredData data={serviceSchema} />
      
      <div
        className="min-h-screen"
        style={{
          background: 'transparent',
        }}
      >
        {/* Breadcrumb */}
        <div className="container pt-24 pb-4">
          <Breadcrumb items={[{ name: t('nav.services') || 'Services', url: '/services' }]} />
        </div>
        
        {/* Hero Section */}
        <section className="pt-8 pb-16 lg:pb-20">
          <div className="container">
            <p className="text-sm font-medium text-gray-500 mb-6">
              {ourServices}
            </p>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{
                fontFamily: "'Neue Haas Unica Pro', sans-serif",
                display: 'inline-block',
                background: 'linear-gradient(to right, #6B1817, #523DCB)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {heroTitle}
              <br />
              <span>{heroSubtitle}</span>
            </h1>
            <p className="text-sm md:text-base text-gray-500 mb-4 font-medium">
              {heroSubtitleGradient}
            </p>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
              {heroDescription}
            </p>
          </div>
        </section>

        {/* Four Departments Grid */}
        <section className="py-16 lg:py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
              {entities.map((entity) => {
                const EntityIcon = entity.icon;
                return (
                  <Link
                    key={entity.id}
                    href={getLocalizedPath(entity.link)}
                    className="rounded-2xl p-8 lg:p-10 flex flex-col h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer block no-underline text-inherit"
                    style={{ background: 'rgba(255,255,255,0.9)' }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <span className="font-mono text-5xl font-bold text-gray-200">{entity.number}</span>
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: 'rgba(90,30,41,0.08)' }}>
                        <EntityIcon className="w-7 h-7" style={{ color: '#5A1E29' }} />
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#5A1E29', fontFamily: "'Neue Haas Unica Pro', sans-serif", fontWeight: 700 }}>
                      {entity.name}
                    </h2>
                    <p className="font-semibold mb-6 text-base" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif", fontWeight: 400, color: '#4b5563' }}>{entity.tagline}</p>
                    <p className="text-base leading-relaxed mb-8" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif", fontWeight: 400, color: '#4b5563' }}>
                      {entity.description}
                    </p>
                    <div className="space-y-5 mb-8 flex-grow">
                      {entity.services.map((service, idx) => {
                        const ServiceIcon = service.icon;
                        return (
                          <div key={idx} className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200" style={{ background: 'rgba(255,255,255,0.9)' }}>
                              <ServiceIcon className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="mb-1 text-base" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif", fontWeight: 700, color: '#111827' }}>{service.title}</h3>
                              <p className="text-sm leading-relaxed" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif", fontWeight: 400, color: '#6b7280' }}>{service.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <span className="mt-auto inline-flex items-center gap-2 font-semibold text-base transition-colors hover:opacity-90" style={{ color: '#523DCB' }}>
                      {entity.cta}
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Service Levels Section */}
        <section className="py-16 lg:py-20">
          <div className="container">
            <div className="text-center mb-12">
              <p className="text-sm font-medium text-gray-500 mb-6">
                {t('services.serviceLevels.sectionLabel') || 'Nos niveaux de service'}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#5A1E29', fontFamily: 'var(--font-heading, sans-serif)' }}>
                {t('services.serviceLevels.title') || 'Trois façons de travailler ensemble'}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t('services.serviceLevels.description') || 'Quel que soit votre projet, votre budget ou votre niveau de maturité numérique, nous avons un modèle adapté à vos besoins.'}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {serviceLevels.map((level, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  style={{ background: 'rgba(255,255,255,0.9)' }}
                >
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#5A1E29' }}>{level.name}</h3>
                  <p className="text-gray-600 font-semibold mb-4 text-sm uppercase tracking-wider">{level.tagline}</p>
                  <p className="text-gray-600 text-base leading-relaxed mb-6">{level.description}</p>
                  <ul className="space-y-2">
                    {Array.isArray(level.highlights) && level.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-2 text-gray-700 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#523DCB' }} />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 lg:py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#5A1E29', fontFamily: 'var(--font-heading, sans-serif)' }}>
                {howItWorksTitle}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {howItWorksDescription}
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm" style={{ background: 'rgba(255,255,255,0.9)' }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/80">
                      <th className="text-left py-5 px-6 text-gray-600 font-semibold text-sm uppercase tracking-wider">
                        {language === 'fr' ? 'Projet' : 'Project'}
                      </th>
                      <th className="text-left py-5 px-6 text-gray-600 font-semibold text-sm uppercase tracking-wider">
                        {language === 'fr' ? 'Départements' : 'Departments'}
                      </th>
                      <th className="text-left py-5 px-6 text-gray-600 font-semibold text-sm uppercase tracking-wider">
                        {language === 'fr' ? 'Livrables' : 'Deliverables'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {combinations.map((combo, idx) => (
                      <tr key={idx} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                        <td className="py-5 px-6 font-semibold text-base text-gray-900">{combo.project}</td>
                        <td className="py-5 px-6 font-medium text-gray-700">{combo.teams}</td>
                        <td className="py-5 px-6 text-gray-600 text-sm leading-relaxed">{combo.deliverables}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-24">
          <div className="container text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#5A1E29', fontFamily: 'var(--font-heading, sans-serif)' }}>
              {ctaTitle}
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              {ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SplitCTAButton href="/contact" label={ctaButtonPrimary} variant="purple" ariaLabel={ctaButtonPrimary} />
              <Link href={getLocalizedPath('/projects')} className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-gray-300 text-gray-800 font-bold hover:bg-gray-100 transition-all duration-300 rounded-full text-lg">
                {ctaButtonSecondary}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
