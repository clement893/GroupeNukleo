import SafeHTML from '@/components/SafeHTML';
import { SplitCTAButton } from '@/components/SplitCTAButton';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CTASection() {
  const { t } = useLanguage();
  const ctaLabel = t('cta.button');
  return (
    <section className="py-24 lg:py-32 relative gradient-mesh overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <SafeHTML html={t('cta.title')} tag="h2" className="text-white mb-8" />

          <p className="text-white/75 text-lg lg:text-xl leading-relaxed mb-12">
            {t('cta.description')}
          </p>

          <SplitCTAButton href="/contact" label={ctaLabel || 'Contactez-nous'} ariaLabel={ctaLabel || 'Contactez-nous'} />
        </div>
      </div>
    </section>
  );
}
