/**
 * Petit bandeau de consentement cookies (style sidlee).
 * Affiché uniquement pour les visiteurs du Québec ou d'Europe (RGPD / Loi 25).
 */
import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const STORAGE_KEY = 'nukleo-cookie-consent';
const GEO_CACHE_KEY = 'nukleo-geo-region';

const EU_COUNTRY_CODES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU',
  'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES',
  'SE', 'IS', 'LI', 'NO', 'GB', // EEA + UK
]);

async function shouldShowBanner(): Promise<boolean> {
  try {
    const cached = sessionStorage.getItem(GEO_CACHE_KEY);
    if (cached === 'show') return true;
    if (cached === 'hide') return false;

    const res = await fetch('https://ip-api.com/json/?fields=countryCode,regionName', {
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return false;
    const data = await res.json();
    const country = (data.countryCode || '').toUpperCase();
    const region = (data.regionName || '').toLowerCase();

    const isEU = EU_COUNTRY_CODES.has(country);
    const isQuebec = country === 'CA' && (region.includes('quebec') || region === 'qc');
    const show = isEU || isQuebec;

    sessionStorage.setItem(GEO_CACHE_KEY, show ? 'show' : 'hide');
    return show;
  } catch {
    sessionStorage.setItem(GEO_CACHE_KEY, 'hide');
    return false;
  }
}

const copy = {
  fr: {
    title: 'Nous respectons votre vie privée',
    body: 'Nous utilisons des cookies pour améliorer votre navigation, personnaliser le contenu et analyser notre trafic. En cliquant sur « Tout accepter », vous consentez à notre utilisation des cookies.',
    cookiePolicy: 'Politique des cookies',
    customize: 'Personnaliser',
    rejectAll: 'Tout refuser',
    acceptAll: 'Tout accepter',
  },
  en: {
    title: 'We value your privacy',
    body: 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
    cookiePolicy: 'Cookie Policy',
    customize: 'Customize',
    rejectAll: 'Reject All',
    acceptAll: 'Accept All',
  },
};

export default function CookieConsent() {
  const [, setLocation] = useLocation();
  const { language } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isFr = language === 'fr';
  const c = copy[isFr ? 'fr' : 'en'];

  const hide = useCallback((value: 'accepted' | 'rejected' | 'customized') => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
      setVisible(false);
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(STORAGE_KEY)) {
      setMounted(true);
      return;
    }
    let cancelled = false;
    shouldShowBanner().then((show) => {
      if (!cancelled && show) setVisible(true);
      setMounted(true);
    });
    return () => { cancelled = true; };
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-label={c.title}
      style={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        zIndex: 99999,
        width: 'min(340px, calc(100vw - 32px))',
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        border: '1px solid rgba(0,0,0,0.06)',
        padding: '14px 16px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <h3
        style={{
          margin: '0 0 8px 0',
          fontSize: '0.95rem',
          fontWeight: 700,
          color: '#111',
        }}
      >
        {c.title}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: '0.8rem',
          lineHeight: 1.45,
          color: '#374151',
        }}
      >
        {c.body}{' '}
        <Link
          href={getLocalizedPath('/cookie-policy')}
          style={{ color: '#5A1E29', fontWeight: 600, textDecoration: 'underline' }}
        >
          {c.cookiePolicy}
        </Link>
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          marginTop: 14,
          justifyContent: 'flex-end',
        }}
      >
        <button
          type="button"
          onClick={() => {
            hide('customized');
            setLocation(getLocalizedPath('/cookie-policy'));
          }}
          style={{
            padding: '6px 12px',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#111',
            background: '#fff',
            border: '1px solid #333',
            borderRadius: 8,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {c.customize}
        </button>
        <button
          type="button"
          onClick={() => hide('rejected')}
          style={{
            padding: '6px 12px',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#111',
            background: '#fff',
            border: '1px solid #333',
            borderRadius: 8,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {c.rejectAll}
        </button>
        <button
          type="button"
          onClick={() => hide('accepted')}
          style={{
            padding: '6px 14px',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#fff',
            background: '#5A1E29',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {c.acceptAll}
        </button>
      </div>
    </div>
  );
}
