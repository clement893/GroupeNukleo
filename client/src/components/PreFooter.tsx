import { useState, useEffect } from 'react';

const PRE_FOOTER_WORDS = ['Audacieux.', 'Assumé.', 'Intelligents.'];

export default function PreFooter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = () => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % PRE_FOOTER_WORDS.length);
        setVisible(true);
      }, 400);
    };
    const id = setInterval(cycle, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      aria-label="Signature Nukleo"
      style={{
        padding: 'clamp(2rem, 6vw, 4rem) 6%',
        background: '#EFE8E8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 'clamp(6rem, 16vw, 14rem)',
        border: 'none',
        borderTop: 'none',
        boxShadow: 'none',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-heading, sans-serif)',
          fontWeight: 900,
          fontSize: 'clamp(3.5rem, 12vw, 11rem)',
          lineHeight: 0.92,
          letterSpacing: '-0.04em',
          display: 'block',
          textAlign: 'left',
          color: '#5a0f2b',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
          userSelect: 'none',
        }}
      >
        {PRE_FOOTER_WORDS[wordIndex]}
      </span>
    </section>
  );
}
