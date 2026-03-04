import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-3 sm:p-4 bg-[#523DCB] hover:bg-[#4630b0] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation group"
      aria-label={t('footer.backToTop') || 'Retour en haut'}
      title={t('footer.backToTop') || 'Retour en haut'}
    >
      <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-y-1 transition-transform" />
    </button>
  );
}
