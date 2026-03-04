import { Globe, Layers, Zap, BarChart3 } from 'lucide-react';
import SafeHTML from '@/components/SafeHTML';
import { useSound } from '@/hooks/useSound';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CapabilitiesSection() {
  const { playHover, playClick } = useSound();
  const { t } = useLanguage();
  
  const capabilities = [
    {
      icon: Globe,
      title: t('capabilities.aiWebsites.title'),
      description: t('capabilities.aiWebsites.description'),
    },
    {
      icon: Layers,
      title: t('capabilities.intelligentPlatforms.title'),
      description: t('capabilities.intelligentPlatforms.description'),
    },
    {
      icon: Zap,
      title: t('capabilities.nextGenApps.title'),
      description: t('capabilities.nextGenApps.description'),
    },
    {
      icon: BarChart3,
      title: t('capabilities.automatedMarketing.title'),
      description: t('capabilities.automatedMarketing.description'),
    },
  ];

  return (
    <section id="capabilities" className="py-16 sm:py-20 lg:py-32">
      <div className="container">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 lg:mb-16">
          <span className="font-mono text-accent text-sm mb-8 block tracking-widest">
            {t('capabilities.sectionLabel')}
          </span>

          <SafeHTML html={t('capabilities.title')} tag="h2" className="text-white mb-4 sm:mb-6 text-4xl sm:text-5xl lg:text-6xl font-heading" />

          <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-3xl">
            {t('capabilities.description')}
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <div
                key={index}
                onClick={playClick}
                onMouseEnter={playHover}
                className="group p-6 sm:p-6 lg:p-8 glass transition-all duration-500 cursor-pointer h-full rounded-2xl overflow-hidden hover:scale-[1.009] hover:shadow-xl hover:shadow-[#523DCB]/10"
              >
                {/* Glassmorphism overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10">
                  {/* Icon Badge */}
                  <div className="mb-4 w-12 h-12 bg-accent/20 flex items-center justify-center rounded-lg">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
                    {capability.title}
                  </h3>

                  <p className="text-white/75 text-sm lg:text-base leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
