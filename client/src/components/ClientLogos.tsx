import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function ClientLogos() {
  const { t, language } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  // Structure prête pour les logos clients (images ou texte)
  // Pour ajouter des logos images : { name: 'MBAM', logo: '/logos/mbam.svg' }
  const clients = [
    { name: 'MBAM', logo: null },
    { name: 'Summit Law', logo: null },
    { name: 'Affilia', logo: null },
    { name: 'GoCoupons', logo: null },
    { name: 'Humankind', logo: null },
    { name: 'CDÉNÉ', logo: null },
    { name: 'MatchStick', logo: null },
    { name: 'Recrute Action', logo: null },
    { name: 'Spruce', logo: null },
    { name: 'Succès Scolaire', logo: null },
    { name: 'Toit à moi', logo: null },
    { name: 'Ukko Solutions', logo: null },
  ];

  // Duplicate for seamless loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-12 relative overflow-hidden border-t border-white/5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm text-white mb-2 font-medium">{t('clients.trustedBy')}</p>
        </div>

        {/* Carousel */}
        <div className="relative mb-8">
          {/* Scrolling container */}
          <div className="overflow-hidden">
            <div className="flex gap-12 animate-scroll items-center">
              {duplicatedClients.map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 text-white hover:text-white/80 transition-colors duration-300 text-lg font-medium tracking-wide whitespace-nowrap flex items-center justify-center h-12"
                >
                  {client.logo ? (
                    <img 
                      src={client.logo} 
                      alt={(t('alt.clientLogo') || 'Logo {{name}}').replace('{{name}}', client.name)} 
                      className="h-8 w-auto object-contain opacity-100 hover:opacity-80 transition-opacity"
                    />
                  ) : (
                    <span>{client.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link href={getLocalizedPath('/contact')}>
            <a className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors text-sm underline decoration-white/50 hover:decoration-white font-medium">
              {language === 'fr' ? 'Commencer votre projet' : 'Start your project'}
              <span className="text-lg">→</span>
            </a>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        
        @media (max-width: 768px) {
          .animate-scroll {
            animation: scroll 80s linear infinite;
          }
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
