import { Link } from 'wouter';
import { Home, Compass, Briefcase, Mail, ArrowLeft } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NotFound404() {
  const getLocalizedPath = useLocalizedPath();
  const { t } = useLanguage();
  const quickLinks = [
    { icon: Home, labelKey: 'notFound.quickLinks.home', descKey: 'notFound.quickLinks.homeDesc', path: getLocalizedPath('/') },
    { icon: Compass, labelKey: 'notFound.quickLinks.expertise', descKey: 'notFound.quickLinks.expertiseDesc', path: getLocalizedPath('/expertise') },
    { icon: Briefcase, labelKey: 'notFound.quickLinks.services', descKey: 'notFound.quickLinks.servicesDesc', path: getLocalizedPath('/services') },
    { icon: Mail, labelKey: 'notFound.quickLinks.contact', descKey: 'notFound.quickLinks.contactDesc', path: getLocalizedPath('/contact') },
  ];

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-[rgb(60,15,15)] via-[rgb(40,60,120)] to-[rgb(60,15,15)] relative overflow-hidden">
        {/* Grain texture overlay */}
        <div 
          className="fixed inset-0 opacity-75 mix-blend-overlay pointer-events-none z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Main Content */}
        <div className="relative z-20 min-h-screen flex items-center justify-center px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-[12rem] md:text-[20rem] font-bold leading-none tracking-tighter">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                404
              </span>
            </h1>
          </div>

          {/* Message */}
          <div className="mb-12 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white italic">
              {t('notFound.title')}
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              {t('notFound.message')}
            </p>
          </div>

          {/* Back Button */}
          <div className="mb-16">
            <Link href={getLocalizedPath('/')}>
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-900 rounded-full font-bold hover:bg-white/90 transition-all duration-300 hover:scale-[1.045]">
                <ArrowLeft className="w-5 h-5" />
                {t('notFound.backToHome')}
              </button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {quickLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer hover:scale-[1.045]">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {t(link.labelKey)}
                  </h3>
                  <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
                    {t(link.descKey)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Help Text */}
          <div className="mt-16 text-white/50 text-sm">
            <p>
              {t('notFound.stillLost')} <a href="mailto:hello@nukleo.com" className="text-white/70 hover:text-white underline">{t('notFound.contactUs')}</a> {t('notFound.stillLostEnd')}
            </p>
          </div>
        </div>
        </div>
      </div>
    </PageLayout>
  );
}
