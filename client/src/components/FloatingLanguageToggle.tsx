import { Globe } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';

export function FloatingLanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [location] = useLocation();
  const [isOnWhiteBackground, setIsOnWhiteBackground] = useState(false);

  // Pages/routes that have white backgrounds
  const whiteBackgroundRoutes = [
    '/resources',
    '/fr/resources',
    '/about',
    '/fr/about',
  ];

  useEffect(() => {
    // Check if current route has white background
    const hasWhiteBg = whiteBackgroundRoutes.some(route => {
      const normalizedLocation = location.replace(/^\/(fr|en)/, '') || '/';
      const normalizedRoute = route.replace(/^\/(fr|en)/, '') || '/';
      return normalizedLocation === normalizedRoute || normalizedLocation.startsWith(normalizedRoute + '/');
    });
    
    setIsOnWhiteBackground(hasWhiteBg);
  }, [location]);

  const toggleLanguage = () => {
    const newLang: Language = language === 'fr' ? 'en' : 'fr';
    setLanguage(newLang);
  };

  const languages: Record<Language, { label: string; flag: string }> = {
    fr: { label: 'FR', flag: '🇫🇷' },
    en: { label: 'EN', flag: '🇬🇧' },
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <Button
        onClick={toggleLanguage}
        variant="outline"
        size="sm"
        className={`
          transition-all duration-300
          shadow-lg hover:shadow-xl
          rounded-full
          px-4 py-2
          gap-2
          group
          backdrop-blur-md
          ${
            isOnWhiteBackground
              ? 'bg-white/10 border-gray-900/20 text-gray-900 hover:bg-gray-900/20 hover:border-gray-900/30'
              : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30'
          }
        `}
        aria-label={`Switch to ${language === 'fr' ? 'English' : 'Français'}`}
      >
        <Globe className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
        <span className="text-sm font-medium">
          {languages[language].flag} {languages[language].label}
        </span>
      </Button>
    </div>
  );
}
