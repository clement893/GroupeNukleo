import { Rocket, Building2, Heart } from 'lucide-react';
import SafeHTML from '@/components/SafeHTML';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function WhoWeServeSection() {
  const { t, language } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  
  const getArrayTranslation = (key: string): string[] => {
    try {
      const translations = require(`../locales/${language || 'en'}.json`);
      const keys = key.split('.');
      let value: any = translations.default || translations;
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
  };
  
  const segments = [
    {
      icon: Rocket,
      title: t('whoWeServe.startups.title'),
      description: t('whoWeServe.startups.description'),
      highlights: getArrayTranslation('whoWeServe.startups.highlights')
    },
    {
      icon: Building2,
      title: t('whoWeServe.smbs.title'),
      description: t('whoWeServe.smbs.description'),
      highlights: getArrayTranslation('whoWeServe.smbs.highlights')
    },
    {
      icon: Heart,
      title: t('whoWeServe.nonProfits.title'),
      description: t('whoWeServe.nonProfits.description'),
      highlights: getArrayTranslation('whoWeServe.nonProfits.highlights')
    }
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-32">
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 lg:mb-16">
          <p className="text-sm font-mono tracking-widest text-accent mb-8 block">
            {t('whoWeServe.subtitle')}
          </p>
          <SafeHTML html={t('whoWeServe.title')} tag="h2" className="text-white mb-4 sm:mb-6 text-4xl sm:text-5xl lg:text-6xl font-heading" />
          <SafeHTML html={t('whoWeServe.description')} tag="p" className="text-white/75 text-base sm:text-lg leading-relaxed max-w-3xl" />
        </div>

        {/* Segments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {segments.map((segment, index) => {
            const Icon = segment.icon;
            return (
              <div
                key={index}
                className="group relative p-6 sm:p-6 lg:p-8 glass rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.009] hover:shadow-xl hover:shadow-purple-500/10"
              >
                {/* Glassmorphism overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10">
                  {/* Icon Badge */}
                  <div className="mb-4 w-12 h-12 bg-accent/20 flex items-center justify-center rounded-lg">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
                    {segment.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/75 text-sm lg:text-base leading-relaxed mb-6">
                    {segment.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {segment.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-white/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 lg:mt-20">
          <p className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-8 leading-tight max-w-3xl mx-auto">
            {t('whoWeServe.cta.title')}<br />
            <span className="text-white/70">
              {t('whoWeServe.cta.subtitle')}
            </span>
          </p>
          <a
            href={getLocalizedPath('/start-project')}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white hover:bg-white/90 text-purple-900 font-bold text-lg transition-all duration-300 hover:scale-[1.05] shadow-xl shadow-purple-500/20"
          >
            {t('whoWeServe.cta.button')}
            <span className="text-xl">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
