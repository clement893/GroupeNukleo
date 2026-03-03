import { useLanguage } from '@/contexts/LanguageContext';
import { SplitCTAButton } from '@/components/SplitCTAButton';

/**
 * Bloc CTA "Prêt.e à performer ?" — identique sur About, Homepage, et toute page l'utilisant.
 */
export default function CTAPerformSection() {
  const { t } = useLanguage();

  return (
    <section style={{ padding: '4rem 3%', background: 'transparent', textAlign: 'center' }}>
      <h2
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
          margin: '0 0 1rem 0',
          background: 'linear-gradient(to right, #6B1817, #5636AD)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {t('home.ctaPerform.title')}
      </h2>
      <p
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 400,
          fontSize: '1rem',
          lineHeight: 1.7,
          color: '#4b5563',
          margin: '0 0 1.5rem 0',
        }}
      >
        {t('about.ctaSubtitle')}
      </p>
      <SplitCTAButton
        href="/contact"
        label={t('home.ctaPerform.button')}
        ariaLabel={t('home.ctaPerform.button')}
      />
    </section>
  );
}
