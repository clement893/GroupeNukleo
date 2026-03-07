import BackToTop from '@/components/BackToTop';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { memo } from 'react';
import { Link } from 'wouter';

const FOOTER_BG = '#000000';
const FOOTER_TEXT = '#EFE8E8';
const FOOTER_LINE = 'rgba(239, 232, 232, 0.5)';

function Footer() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();

  return (
    <footer
      className="relative w-full footer-mobile"
      style={{
        background: '#EFE8E8',
        padding: 'clamp(1.5rem, 4vw, 3rem) var(--site-margin, 3%) clamp(2rem, 4vw, 3rem)',
        fontFamily: "'Neue Haas Unica Pro', sans-serif",
        fontWeight: 400,
      }}
      aria-label={t('footer.ariaLabel') || 'Pied de page Nukleo Digital'}
    >
      {/* Boîte noire unique — logo gauche, contact droite (coins arrondis, centré) */}
      <div
        className="rounded-2xl w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-start footer-inner"
        style={{
          background: FOOTER_BG,
          padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 3rem)',
        }}
      >
        {/* Gauche : logo Groupe Nukleo (blanc sur fond noir) */}
        <div className="flex flex-col">
          <Link href={getLocalizedPath('/')} className="touch-manipulation block text-left">
            <img
              src="/demo/logo-groupe-nukleo-white.png"
              alt="Groupe Nukleo"
              className="w-auto object-contain object-left"
              style={{ maxHeight: 'clamp(2.5rem, 8vw, 4.5rem)', height: 'auto' }}
            />
          </Link>
        </div>

        {/* Droite : email, filets, adresses */}
        <div className="flex flex-col md:items-end w-full md:w-auto">
          <a
            href="mailto:hello@nukleo.com"
            className="text-sm md:text-base hover:opacity-85 transition-opacity block"
            style={{ color: FOOTER_TEXT }}
          >
            hello@nukleo.com
          </a>
          <hr
            className="border-0 mt-4 mb-4 w-full md:w-auto md:min-w-[200px] h-px flex-shrink-0"
            style={{ background: FOOTER_LINE }}
          />
          <div
            className="text-sm md:text-base leading-relaxed space-y-0.5"
            style={{ color: FOOTER_TEXT }}
          >
            <div>7236 Rue Waverly</div>
            <div>Montréal, QC H2R 0C2</div>
          </div>
          <hr
            className="border-0 mt-4 mb-4 w-full md:w-auto md:min-w-[200px] h-px flex-shrink-0"
            style={{ background: FOOTER_LINE }}
          />
          <div
            className="text-sm md:text-base leading-relaxed space-y-0.5"
            style={{ color: FOOTER_TEXT }}
          >
            <div>1800 Argyle St Unit 801</div>
            <div>Halifax, NS B3J 3N8</div>
          </div>
        </div>
      </div>

      {/* Barre basse — copyright uniquement (pages légales retirées) */}
      <div
        className="text-center text-sm mt-10 w-full px-4"
        style={{ color: '#6b7280' }}
      >
        <div className="mb-2">{t('footer.copyright', { year: new Date().getFullYear() })}</div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:underline">
            {t('footer.sitemap') || 'Sitemap'}
          </a>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}

export default memo(Footer);
