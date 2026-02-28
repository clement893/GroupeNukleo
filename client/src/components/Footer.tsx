import { Link } from 'wouter';
import BackToTop from '@/components/BackToTop';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { useMemo, memo } from 'react';
import { trpc } from '@/lib/trpc';

const FOOTER_BG = '#1E202B';

// Liens principaux (colonne gauche du bloc gauche)
const MAIN_LINKS = [
  { key: 'home' as const, href: '/' },
  { key: 'about' as const, href: '/about' },
  { key: 'projects' as const, href: '/projects' },
  { key: 'contact' as const, href: '/contact' },
];

// Services (colonne droite du bloc gauche) — libellés design référence
const SERVICE_LINKS = [
  { labelFr: 'Lab technologique', labelEn: 'Tech Lab', href: '/services/tech' },
  { labelFr: 'Studio créatif', labelEn: 'Creative Studio', href: '/services/studio' },
  { labelFr: 'Agence Comm & Marketing', labelEn: 'Comm & Marketing Agency', href: '/services/agency' },
  { labelFr: 'Transformation numérique', labelEn: 'Digital Transformation', href: '/services/consulting' },
];

function Footer() {
  const { t, language } = useLanguage();
  const getLocalizedPath = useLocalizedPath();

  const mainNavLabels: Record<string, string> = useMemo(() => ({
    home: t('nav.home'),
    about: t('nav.about'),
    projects: language === 'fr' ? 'Nos projets' : t('nav.projects'),
    contact: t('nav.contact'),
  }), [t, language]);

  const { data: allVisibilities } = trpc.pageVisibility.getAll.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 60000,
  });

  const visibilityMap = useMemo(() => {
    const map = new Map<string, boolean>();
    if (allVisibilities && Array.isArray(allVisibilities)) {
      allVisibilities.forEach((page: { path: string; isVisible: boolean }) => {
        map.set(page.path, page.isVisible);
      });
    }
    return map;
  }, [allVisibilities]);

  const visibleMainLinks = useMemo(() => {
    return MAIN_LINKS.filter((item) => {
      const path = language === 'fr' ? `/fr${item.href}` : item.href === '/' ? '/' : item.href;
      const isVisible = visibilityMap.get(path);
      return isVisible !== false;
    });
  }, [visibilityMap, language]);

  const visibleServiceLinks = useMemo(() => {
    return SERVICE_LINKS.filter((item) => {
      const path = language === 'fr' ? `/fr${item.href}` : item.href;
      const isVisible = visibilityMap.get(path);
      return isVisible !== false;
    });
  }, [visibilityMap, language]);

  return (
    <footer
      className="relative w-full"
      style={{
        background: '#EFE8E8',
        padding: 'clamp(3rem, 8vw, 5rem) 4% clamp(3rem, 6vw, 4rem)',
        paddingBottom: 96,
      }}
      aria-label="Pied de page Nukleo Digital"
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-8 w-full"
        style={{ maxWidth: 'none', margin: 0, minHeight: 320 }}
      >
        {/* Bloc gauche — logo nukleo, > + 2 colonnes (~2/3), grand */}
        <div
          className="lg:col-span-2 rounded-3xl flex flex-col justify-center"
          style={{
            background: FOOTER_BG,
            padding: 'clamp(2.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3.5rem)',
            minHeight: 320,
          }}
        >
          <Link href={getLocalizedPath('/')} className="block mb-10 lg:mb-12 touch-manipulation">
            <span
              className="text-white font-bold tracking-tight inline-flex items-center gap-1"
              style={{
                fontFamily: 'var(--font-heading, sans-serif)',
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              }}
            >
              nukleo<span className="opacity-90" style={{ fontSize: '0.85em' }}>&gt;</span>,
            </span>
          </Link>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16">
            <ul className="space-y-4">
              {visibleMainLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={getLocalizedPath(item.href)}
                    className="text-white text-base sm:text-lg hover:opacity-80 transition-opacity touch-manipulation block"
                  >
                    {mainNavLabels[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-4">
              {visibleServiceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={getLocalizedPath(item.href)}
                    className="text-white text-base sm:text-lg hover:opacity-80 transition-opacity touch-manipulation block"
                  >
                    {language === 'fr' ? item.labelFr : item.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bloc droit — contact (~1/3), grand */}
        <div
          className="rounded-3xl flex flex-col"
          style={{
            background: FOOTER_BG,
            padding: 'clamp(2.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3.5rem)',
            minHeight: 320,
          }}
        >
          <a
            href="mailto:hello@nukleo.com"
            className="text-white font-medium text-base sm:text-lg hover:opacity-80 transition-opacity block mb-8"
          >
            hello@nukleo.com
          </a>
          <div
            className="flex-1 text-white/90 text-base leading-relaxed space-y-2"
            style={{ borderTop: '1px solid rgba(255,255,255,0.25)', paddingTop: 20 }}
          >
            <div>
              <div>7236 Rue Waverly</div>
              <div>Montréal, QC H2R 0C2</div>
            </div>
          </div>
          <div
            className="pt-5 text-white/90 text-base leading-relaxed space-y-2"
            style={{ borderTop: '1px solid rgba(255,255,255,0.25)', paddingTop: 20 }}
          >
            <div>
              <div>1800 Argyle St Unit 801</div>
              <div>Halifax, NS B3J 3N8</div>
            </div>
          </div>
          <div className="mt-auto pt-8 flex justify-end">
            <a
              href="https://www.linkedin.com/company/nukleo-group"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:opacity-80 transition-opacity inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/10"
              aria-label="LinkedIn - Nukleo"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Barre basse — copyright + liens légaux */}
      <div
        className="text-center text-sm mt-10 w-full"
        style={{ color: '#6b7280' }}
      >
        <div className="mb-2">{t('footer.copyright', { year: new Date().getFullYear() })}</div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:underline">
            {t('footer.sitemap') || 'Sitemap'}
          </a>
          <Link href={getLocalizedPath('/privacy-policy')} className="hover:underline">{t('footer.links.privacy')}</Link>
          <Link href={getLocalizedPath('/nukleo-time-privacy')} className="hover:underline">{t('footer.links.nukleoTimePrivacy') || 'Nukleo.TIME Privacy'}</Link>
          <Link href={getLocalizedPath('/terms-of-service')} className="hover:underline">{t('footer.links.terms')}</Link>
          <Link href={getLocalizedPath('/cookie-policy')} className="hover:underline">{t('footer.links.cookies')}</Link>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}

export default memo(Footer);
