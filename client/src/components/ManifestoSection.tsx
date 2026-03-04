import { Zap, Settings } from 'lucide-react';
import SafeHTML from '@/components/SafeHTML';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function ManifestoSection() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  return (
    <section id="manifesto" className="py-16 sm:py-20 lg:py-32">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left: Title and Description */}
          <div>
            <span className="font-mono text-accent text-sm mb-8 block tracking-widest">
              {t('manifesto.sectionLabel')}
            </span>

            <SafeHTML html={t('manifesto.title')} tag="h2" className="text-white mb-6 sm:mb-8 text-4xl sm:text-5xl lg:text-6xl font-heading" />

            <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              {t('manifesto.description')}
            </p>

            <a
              href={getLocalizedPath('/manifesto')}
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
            >
              {t('manifesto.readMore')}
              <span className="text-xl">→</span>
            </a>
          </div>

          {/* Right: Manifesto Cards */}
          <div className="space-y-4">
            {/* Card 1 */}
            <div className="group relative p-6 sm:p-6 lg:p-8 glass rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.009] hover:shadow-xl hover:shadow-[#523DCB]/10">
              {/* Glassmorphism overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                {/* Icon Badge - Single icon */}
                <div className="mb-4 w-12 h-12 bg-accent/20 flex items-center justify-center rounded-lg">
                  <Zap className="w-6 h-6 text-accent" />
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
                  {t('manifesto.card1.title')}
                </h3>

                <p className="text-white/75 text-sm lg:text-base leading-relaxed">
                  {t('manifesto.card1.description')}
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative p-6 sm:p-6 lg:p-8 glass rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.009] hover:shadow-xl hover:shadow-[#523DCB]/10">
              {/* Glassmorphism overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                {/* Icon Badge - Single icon */}
                <div className="mb-4 w-12 h-12 bg-accent/20 flex items-center justify-center rounded-lg">
                  <Settings className="w-6 h-6 text-accent" />
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
                  {t('manifesto.card2.title')}
                </h3>

                <p className="text-white/75 text-sm lg:text-base leading-relaxed">
                  {t('manifesto.card2.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
