import { useLanguage } from '@/contexts/LanguageContext';
import { SplitCTAButton } from '@/components/SplitCTAButton';

/**
 * Bloc CTA "Prêt.e à performer ?" — identique sur About, Homepage, Lab, Agence, Studio, Consulting.
 * Même structure, espacement et style partout.
 */
export default function CTAPerformSection() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="cta-perform-section scroll-mt-24"
      style={{
        padding: '4rem 3% 8rem',
        background: 'transparent',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '42rem', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: "'Google Sans Flex', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            lineHeight: 1.25,
            margin: '0 0 1rem 0',
            background: 'linear-gradient(to right, #6B1817, #523DCB)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {t('home.ctaPerform.title')}
        </h2>
        <p
          style={{
            fontFamily: "'Google Sans Flex', sans-serif",
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
          href="#contact"
          label={t('home.ctaPerform.button')}
          ariaLabel={t('home.ctaPerform.button')}
        />
      </div>
    </section>
  );
}
