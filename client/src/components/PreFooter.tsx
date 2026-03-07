import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const DEFAULT_WORDS = ['Audacieux.', 'Assumé.', 'Fort.', 'Intelligents.'];

export default function PreFooter() {
  const { t } = useLanguage();
  const words = (t('preFooter.words', { returnObjects: true }) as string[]) || DEFAULT_WORDS;
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = () => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 400);
    };
    const id = setInterval(cycle, 2800);
    return () => clearInterval(id);
  }, [words.length]);

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
    >
      <span
        className="pre-footer-gradient-text"
        style={{
          fontFamily: "'Neue Haas Unica Pro', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(3.5rem, 12vw, 11rem)',
          lineHeight: 1.25,
          letterSpacing: '-0.04em',
          display: 'block',
          textAlign: 'left',
          width: 'fit-content',
          paddingRight: '0.3em',
          paddingBottom: '0.15em',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
          userSelect: 'none',
        }}
      >
        {words[wordIndex]}
      </span>
    </section>
  );
}
