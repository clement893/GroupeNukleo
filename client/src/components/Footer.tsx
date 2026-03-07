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
      className="relative w-full site-margin-x"
      style={{
        background: '#EFE8E8',
        paddingTop: 'clamp(1.5rem, 4vw, 3rem)',
        paddingBottom: 'clamp(2rem, 4vw, 3rem)',
        fontFamily: "'Neue Haas Unica Pro', sans-serif",
        fontWeight: 400,
      }}
      aria-label={t('footer.ariaLabel') || 'Pied de page Nukleo Digital'}
    >
      {/* Boîte noire unique — logo gauche, contact droite */}
      <div
        className="rounded-2xl w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-start"
        style={{
          background: FOOTER_BG,
          padding: 'clamp(2rem, 5vw, 3.5rem) clamp(2rem, 4vw, 3rem)',
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

        {/* Droite : email, filets, adresses, LinkedIn */}
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-end md:gap-4">
            <div
              className="text-sm md:text-base leading-relaxed space-y-0.5"
              style={{ color: FOOTER_TEXT }}
            >
              <div>1800 Argyle St Unit 801</div>
              <div>Halifax, NS B3J 3N8</div>
            </div>
            <a
              href="https://www.linkedin.com/company/nukleo-group"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 md:mt-0 inline-flex items-center justify-center w-10 h-10 rounded bg-white text-black flex-shrink-0 hover:opacity-90 transition-opacity"
              aria-label="LinkedIn - Nukleo"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
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
