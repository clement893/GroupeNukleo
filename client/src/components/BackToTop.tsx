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
      className="fixed bottom-6 right-[6rem] z-[60] p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation group
        bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30
        text-[#523DCB] hover:text-[#4630b0]"
      style={{
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      }}
      aria-label={t('footer.backToTop') || 'Retour en haut'}
      title={t('footer.backToTop') || 'Retour en haut'}
    >
      <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-y-1 transition-transform" />
    </button>
  );
}
