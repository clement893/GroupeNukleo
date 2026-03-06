import { useLanguage } from '@/contexts/LanguageContext';

export default function PreFooter() {
  const { t } = useLanguage();

  return (
    <section
      aria-label={t('preFooter.ariaLabel') || 'Signature Nukleo'}
      style={{
        padding: 'clamp(0.2rem, 0.5vw, 0.4rem) var(--site-margin, 3%) clamp(0.125rem, 0.375vw, 0.25rem)',
        background: '#EFE8E8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 'clamp(3rem, 8vw, 6rem)',
        border: 'none',
        borderTop: 'none',
        boxShadow: 'none',
        overflow: 'visible',
      }}
    />
  );
}
