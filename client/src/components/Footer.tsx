import { Link } from 'wouter';
import BackToTop from '@/components/BackToTop';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { useMemo, memo } from 'react';

const FOOTER_BG = '#1E202B';
const FOOTER_TEXT_WHITE = '#ffffff';
const FOOTER_LINE = 'rgba(255, 255, 255, 0.5)';

// Liens principaux — ancres sur la home (single-page)
const MAIN_LINKS = [
  { key: 'home' as const, anchor: '' },
  { key: 'about' as const, anchor: '#about' },
  { key: 'projects' as const, anchor: '#projects' },
  { key: 'contact' as const, anchor: '#contact' },
  { key: 'faq' as const, anchor: '#faq' },
];

const SERVICE_LINKS = [
  { labelKey: 'menu.serviceTech' as const, anchor: '#services' },
  { labelKey: 'menu.serviceStudio' as const, anchor: '#services' },
  { labelKey: 'menu.serviceAgency' as const, anchor: '#services' },
  { labelKey: 'menu.serviceConsulting' as const, anchor: '#services' },
];

function Footer() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const visibleMainLinks = MAIN_LINKS;
  const visibleServiceLinks = SERVICE_LINKS;

  const mainNavLabels: Record<string, string> = useMemo(() => ({
    home: t('nav.home'),
    about: t('nav.about'),
    projects: t('nav.projects'),
    contact: t('nav.contact'),
    faq: t('nav.faq'),
  }), [t]);

  return (
    <footer
      className="relative w-full site-margin-x"
      style={{
        background: '#EFE8E8',
        paddingTop: 'clamp(0.75rem, 2vw, 1.25rem)',
        paddingBottom: 'clamp(2rem, 4vw, 3rem)',
        fontFamily: "'Neue Haas Unica Pro', sans-serif",
        fontWeight: 400,
      }}
      aria-label={t('footer.ariaLabel') || 'Pied de page Nukleo Digital'}
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 w-full"
        style={{ margin: 0, minHeight: 300 }}
      >
        {/* Bloc gauche — deux panneaux arrondis distincts, marges latérales */}
        <div
          className="rounded-[1.25rem] flex flex-col justify-center"
          style={{
            background: FOOTER_BG,
            padding: 'clamp(2.25rem, 5vw, 3.5rem) clamp(2rem, 4vw, 3rem)',
            minHeight: 300,
          }}
        >
          <Link href={getLocalizedPath('/')} className="block mb-8 lg:mb-10 touch-manipulation" style={{ textAlign: 'left' }} aria-label={t('alt.logo') || 'Groupe Nukleo - Accueil'}>
            <img
              src="/LogoGroupeNukleoWhite.png"
              alt="Groupe Nukleo"
              style={{
                height: 'clamp(2.5rem, 6vw, 4rem)',
                width: 'auto',
                display: 'block',
              }}
            />
          </Link>
          <div className="grid grid-cols-2 gap-x-12 sm:gap-x-16 gap-y-1">
            <ul className="space-y-3">
              {visibleMainLinks.map((item) => (
                <li key={item.anchor || 'home'}>
                  <Link
                    href={getLocalizedPath('/') + (item.anchor || '')}
                    className="text-base sm:text-lg hover:opacity-85 transition-opacity touch-manipulation block"
                    style={{ color: FOOTER_TEXT_WHITE }}
                  >
                    {mainNavLabels[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {visibleServiceLinks.map((item, i) => (
                <li key={item.labelKey + i}>
                  <Link
                    href={getLocalizedPath('/') + item.anchor}
                    className="text-base sm:text-lg hover:opacity-85 transition-opacity touch-manipulation block"
                    style={{ color: FOOTER_TEXT_WHITE }}
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bloc droit — email, filets blancs, adresses, LinkedIn */}
        <div
          className="rounded-[1.25rem] flex flex-col"
          style={{
            background: FOOTER_BG,
            padding: 'clamp(2.25rem, 5vw, 3.5rem) clamp(2rem, 4vw, 3rem)',
            minHeight: 300,
          }}
        >
          <a
            href="mailto:hello@nukleo.com"
            className="font-medium text-base sm:text-lg hover:opacity-85 transition-opacity block"
            style={{ color: FOOTER_TEXT_WHITE }}
          >
            hello@nukleo.com
          </a>
          <hr className="border-0 mt-5 mb-5 h-px w-full flex-shrink-0" style={{ background: FOOTER_LINE }} />
          <div className="text-base leading-relaxed space-y-1" style={{ color: FOOTER_TEXT_WHITE }}>
            <div>7236 Rue Waverly</div>
            <div>Montréal, QC H2R 0C2</div>
          </div>
          <hr className="border-0 mt-5 mb-5 h-px w-full flex-shrink-0" style={{ background: FOOTER_LINE }} />
          <div className="text-base leading-relaxed space-y-1" style={{ color: FOOTER_TEXT_WHITE }}>
            <div>1800 Argyle St Unit 801</div>
            <div>Halifax, NS B3J 3N8</div>
          </div>
          <div className="mt-auto pt-8 flex justify-end">
            <a
              href="https://www.linkedin.com/company/nukleo-group"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 transition-opacity inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white text-black flex-shrink-0"
              aria-label="LinkedIn - Nukleo"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Barre basse — copyright + liens légaux */}
      <div
        className="text-center text-sm mt-10 w-full px-4"
        style={{ color: '#6b7280' }}
      >
        <div className="mb-2">{t('footer.copyright', { year: new Date().getFullYear() })}</div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <a href="mailto:hello@nukleo.com" className="hover:underline">Contact</a>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}

export default memo(Footer);
