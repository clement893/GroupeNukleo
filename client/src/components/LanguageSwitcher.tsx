import { Globe } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages: Array<{ code: Language; label: string; flag: string }> = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-white/80 hover:text-white hover:bg-white/10 gap-2"
          aria-label="Change language"
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">
            {languages.find((l) => l.code === language)?.flag}{' '}
            {languages.find((l) => l.code === language)?.label}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer ${
              language === lang.code ? 'bg-[#523DCB]/10 font-semibold' : ''
            }`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
