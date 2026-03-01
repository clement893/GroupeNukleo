import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';

// Preload translations synchronously for better performance - prevents FCP/LCP delays
import enTranslations from '../locales/en.json';
import frTranslations from '../locales/fr.json';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number> | { returnObjects?: boolean }) => string | any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Preloaded translations - available immediately for better performance
const preloadedTranslations: Record<Language, Record<string, any>> = {
  en: enTranslations,
  fr: frTranslations,
};

// Detect browser language
function detectBrowserLanguage(): Language {
  if (typeof window !== 'undefined' && navigator.language) {
    const browserLang = navigator.language.toLowerCase();
    // Check if browser language starts with 'fr' (fr, fr-CA, fr-FR, etc.)
    if (browserLang.startsWith('fr')) {
      return 'fr';
    }
    // Check navigator.languages array for more accuracy
    if (navigator.languages) {
      for (const lang of navigator.languages) {
        const langLower = lang.toLowerCase();
        if (langLower.startsWith('fr')) {
          return 'fr';
        }
        if (langLower.startsWith('en')) {
          return 'en';
        }
      }
    }
  }
  return 'en';
}

// Default language detection from URL
function detectLanguageFromURL(): Language {
  // Check URL first (most reliable)
  const path = window.location.pathname;
  const langMatch = path.match(/^\/(fr|en)/);
  if (langMatch) {
    return langMatch[1] as Language;
  }
  
  // Check localStorage
  const saved = localStorage.getItem('nukleo-language');
  if (saved === 'fr' || saved === 'en') {
    return saved;
  }
  
  // Detect browser language
  return detectBrowserLanguage();
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [location, setLocation] = useLocation();
  const [language, setLanguageState] = useState<Language>(detectLanguageFromURL);
  // Override translations from DB (admin-edited page texts)
  const { data: dbOverlay } = trpc.pageTexts.getTranslations.useQuery(
    { lang: language },
    { staleTime: 60_000, refetchOnWindowFocus: false }
  );
  // Use preloaded translations immediately - no async loading needed for better performance
  const [translations, setTranslations] = useState<Record<string, any>>(
    preloadedTranslations[language] || preloadedTranslations.en
  );

  // Update translations when language changes - instant, no loading delay
  useEffect(() => {
    const newTranslations = preloadedTranslations[language] || preloadedTranslations.en;
    setTranslations(newTranslations);
  }, [language]);

  // Extract language from URL on mount and when location changes
  useEffect(() => {
    // Skip admin routes
    if (location.startsWith('/admin')) {
      return;
    }
    
    const langMatch = location.match(/^\/(fr|en)/);
    if (langMatch) {
      const urlLang = langMatch[1] as Language;
      if (urlLang !== language) {
        setLanguageState(urlLang);
        localStorage.setItem('nukleo-language', urlLang);
      }
    } else {
      // No language prefix, detect browser language
      const browserLang = detectBrowserLanguage();
      // Check localStorage first, then browser language
      const saved = localStorage.getItem('nukleo-language');
      const detectedLang = (saved === 'fr' || saved === 'en') ? saved : browserLang;
      
      if (detectedLang !== language) {
        setLanguageState(detectedLang);
        localStorage.setItem('nukleo-language', detectedLang);
        // Redirect to language-prefixed URL for homepage only
        if (location === '/' && detectedLang === 'fr') {
          setLocation('/fr');
        }
      }
    }
  }, [location]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('nukleo-language', lang);
    
    // Update URL
    const pathWithoutLang = location.replace(/^\/(fr|en)/, '') || '/';
    const newPath = lang === 'fr' ? `/fr${pathWithoutLang}` : pathWithoutLang;
    setLocation(newPath);
  };

  // Translation function with nested key support (e.g., "hero.title")
  // DB overlay (admin-edited texts) takes precedence over static JSON
  const t = (key: string, params?: Record<string, string | number> | { returnObjects?: boolean }): string | any => {
    // Check if returnObjects is requested
    const returnObjects = params && typeof params === 'object' && 'returnObjects' in params && params.returnObjects === true;
    const actualParams = returnObjects ? undefined : params as Record<string, string | number> | undefined;

    // Admin-edited text from DB overrides static (only for string keys, not returnObjects)
    if (!returnObjects && dbOverlay && key in dbOverlay) {
      let translation = dbOverlay[key];
      if (actualParams) {
        Object.entries(actualParams).forEach(([paramKey, paramValue]) => {
          translation = translation.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(paramValue));
        });
      }
      return translation;
    }
    
    // Support nested keys like "hero.title"
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Key not found, log in development and return empty string/array instead of key
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Translation missing for key: ${key} (language: ${language})`);
        }
        return returnObjects ? [] : '';
      }
    }
    
    // If we reached here but value is undefined/null, return empty string/array
    if (value === undefined || value === null) {
      return returnObjects ? [] : '';
    }
    
    // If returnObjects is true and value is an object/array, return it directly
    if (returnObjects) {
      // Ensure we return an array if value exists, otherwise empty array
      if (Array.isArray(value)) {
        return value;
      }
      // If value exists but is not an array, return empty array to prevent .map() errors
      return [];
    }
    
    // Otherwise, return as string
    let translation = typeof value === 'string' ? value : String(value || '');
    
    // Replace parameters
    if (actualParams) {
      Object.entries(actualParams).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(paramValue));
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

