import { Palette, Pen, Eye, Layout, Film, Sparkles, ArrowRight, Star, Layers, Type, Camera, Wand2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function NukleoStudio() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();

  const services = [
    {
      icon: Palette,
      title: 'Identité de marque',
      description: 'Création ou refonte de votre identité visuelle : logo, charte graphique, système de design et guidelines pour une marque cohérente et mémorable.',
      tags: ['Branding', 'Logo', 'Charte graphique', 'Brand system'],
    },
    {
      icon: Layout,
      title: 'UX/UI Design',
      description: 'Conception d\'interfaces utilisateur intuitives et esthétiques pour vos applications web et mobiles. Du wireframe au prototype haute fidélité.',
      tags: ['Figma', 'Prototypage', 'Design system', 'Accessibilité'],
    },
    {
      icon: Type,
      title: 'Contenu créatif & copywriting',
      description: 'Création de contenus qui captivent et convertissent : textes de marque, scripts vidéo, articles de fond, newsletters et contenu social.',
      tags: ['Copywriting', 'Storytelling', 'SEO content', 'Tone of voice'],
    },
    {
      icon: Film,
      title: 'Production vidéo & motion',
      description: 'Vidéos de marque, motion design, animations et contenus visuels qui donnent vie à votre identité et communiquent avec impact.',
      tags: ['Motion design', 'After Effects', 'Vidéo', 'Animation'],
    },
    {
      icon: Camera,
      title: 'Direction artistique',
      description: 'Supervision créative de vos projets visuels : shootings, campagnes, supports print et digitaux avec une cohérence esthétique irréprochable.',
      tags: ['DA', 'Art direction', 'Campagnes', 'Print'],
    },
    {
      icon: Wand2,
      title: 'Création augmentée par l\'IA',
      description: 'Intégration des outils IA génératifs dans votre processus créatif pour accélérer la production tout en maintenant un niveau d\'exigence élevé.',
      tags: ['Midjourney', 'DALL-E', 'Sora', 'Adobe Firefly'],
    },
  ];

  const values = [
    { title: 'L\'esthétique au service de la performance', desc: 'Un beau design qui ne convertit pas n\'est pas un bon design. Chaque choix visuel est motivé par un objectif.' },
    { title: 'La cohérence avant tout', desc: 'Votre marque doit être reconnaissable partout. Nous construisons des systèmes visuels durables, pas des pièces isolées.' },
    { title: 'La créativité avec méthode', desc: 'L\'inspiration est un point de départ, pas une fin. Nous suivons un processus rigoureux pour garantir des résultats reproductibles.' },
  ];

  return (
    <>
      <SEO
        title="Nukleo.Studio — Design & Création | Nukleo"
        description="Identité de marque, UX/UI design, production créative et direction artistique. Le studio créatif de Nukleo conçoit des expériences visuelles qui marquent les esprits."
        keywords="design marque, UX UI design, branding, identité visuelle, motion design, copywriting, direction artistique"
      />
      <Header />

      <main className="min-h-screen bg-[oklch(0.08_0.02_280)]">

        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-24">
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, oklch(0.10 0.05 320) 0%, oklch(0.08 0.03 300) 50%, oklch(0.10 0.04 340) 100%)' }} />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-600/8 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/6 rounded-full blur-[100px]" />
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(236,72,153,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(236,72,153,0.4) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          </div>

          <div className="container relative z-10 max-w-6xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-8">
              <Palette className="w-4 h-4 text-pink-400" />
              <span className="text-sm font-medium text-pink-300 tracking-widest uppercase">Nukleo.Studio</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.9]">
              Design &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Création
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mb-12 leading-relaxed">
              L'excellence numérique passe aussi par ce que l'on voit et ce que l'on ressent. Nous créons des expériences visuelles qui communiquent votre valeur avec précision et élégance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={getLocalizedPath('/start-project')}>
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-pink-600 hover:bg-pink-500 text-white font-semibold rounded-full transition-all duration-200">
                  Démarrer un projet créatif
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
              <p className="text-pink-400 text-sm font-medium tracking-widest uppercase mb-4">Nos disciplines</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Créer, c'est aussi<br />une forme de performance.</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <div key={i} className="group p-8 rounded-2xl bg-white/3 border border-white/8 hover:border-pink-500/30 hover:bg-white/5 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-pink-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-5">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, j) => (
                        <span key={j} className="px-3 py-1 rounded-full bg-pink-500/8 border border-pink-500/15 text-pink-300 text-xs font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Valeurs créatives */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <p className="text-pink-400 text-sm font-medium tracking-widest uppercase mb-4">Notre philosophie</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Ce qui guide<br />chaque création.</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <div key={i} className="p-8 rounded-2xl bg-white/3 border border-white/8">
                  <div className="w-8 h-8 rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center justify-center mb-6">
                    <Star className="w-4 h-4 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{v.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <Eye className="w-10 h-10 text-pink-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Votre marque mérite mieux.
            </h2>
            <p className="text-xl text-white/50 mb-10 max-w-2xl mx-auto">
              Partagez-nous votre projet créatif. Nous vous proposons une direction artistique en 72h.
            </p>
            <Link href={getLocalizedPath('/start-project')}>
              <button className="inline-flex items-center gap-2 px-10 py-5 bg-pink-600 hover:bg-pink-500 text-white font-semibold rounded-full text-lg transition-all duration-200">
                Soumettre un brief créatif
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
