import PageLayout from "@/components/PageLayout";
import SEO from '@/components/SEO';
import StructuredData, { createPersonSchema } from '@/components/StructuredData';
import UniversalLEO from '@/components/UniversalLEO';
import SafeHTML from '@/components/SafeHTML';
import { Linkedin } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import OptimizedImage from '@/components/OptimizedImage';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const teamMembers = [
  {
    name: "Clément",
    translationKey: "clement",
    image: "/team/Clement.webp",
    linkedin: "https://www.linkedin.com/in/clement-roy/"
  },
  {
    name: "Alexei",
    translationKey: "alexei",
    image: "/team/Alexei.webp",
    linkedin: "https://www.linkedin.com/in/alexei-bissonnette-9aa38a23a/"
  },
  {
    name: "Antoine",
    translationKey: "antoine",
    image: "/team/Antoine.webp",
    linkedin: "https://www.linkedin.com/in/antoine-doray-55b77b192/"
  },
  {
    name: "Margaux",
    translationKey: "margaux",
    image: "/team/Margaux.webp",
    linkedin: "https://www.linkedin.com/in/margaux-goethals-8407a5128/"
  },
  {
    name: "Camille",
    translationKey: "camille",
    image: "/team/Camille.webp",
    linkedin: "https://www.linkedin.com/in/camillegauthier226/"
  },
  {
    name: "Timothé",
    translationKey: "timothe",
    image: "/team/Timothe.webp",
    linkedin: "https://www.linkedin.com/in/timothe-lac/"
  },
  {
    name: "Sarah",
    translationKey: "sarah",
    image: "/team/Sarah.webp",
    linkedin: "https://www.linkedin.com/in/sarah-katerji/"
  },
  {
    name: "Séverine",
    translationKey: "severine",
    image: "/team/Severine.webp",
    linkedin: "https://www.linkedin.com/in/s%C3%A9verine-dimambro/"
  },
  {
    name: "Maxime",
    translationKey: "maxime",
    image: "/team/Maxime.webp",
    linkedin: "https://www.linkedin.com/in/maxime-besnier/"
  },
  {
    name: "Meriem",
    translationKey: "meriem",
    image: "/team/Meriem.webp",
    linkedin: "https://www.linkedin.com/in/meriem-kouidri16/"
  },
  {
    name: "Jean-François",
    translationKey: "jeanFrancois",
    image: "/team/Jean-Francois.webp",
    linkedin: "https://www.linkedin.com/in/jeffldev/"
  },
  {
    name: "Hind",
    translationKey: "hind",
    image: "/team/Hind.webp",
    linkedin: "https://www.linkedin.com/in/hind-djebien-767288195/"
  },
  {
    name: "Omar",
    translationKey: "omar",
    image: "/team/Omar.webp",
    linkedin: "https://www.linkedin.com/in/omarhamdi/"
  },
  {
    name: "Ricardo",
    translationKey: "ricardo",
    image: "/team/Ricardo.png",
    linkedin: "https://www.linkedin.com/in/ricardo-wierzynski/"
  },
  {
    name: "Marie-Claire",
    translationKey: "marieClaire",
    image: "/team/Marie-Claire.png",
    linkedin: "https://www.linkedin.com/in/marieclairelajeunesse/"
  }
];

export default function About() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  
  // Create Person schemas for team members
  const teamPersonSchemas = teamMembers.map(member => {
    const role = t(`about.team.${member.translationKey}.role`) || member.translationKey;
    const imageUrl = member.image.startsWith('http') 
      ? member.image 
      : `https://nukleodigital-production.up.railway.app${member.image}`;
    
    return createPersonSchema({
      name: member.name,
      jobTitle: typeof role === 'string' ? role : String(role || ''),
      image: imageUrl,
      url: member.linkedin,
      sameAs: [member.linkedin],
      worksFor: {
        name: 'Nukleo Digital',
        url: 'https://nukleodigital-production.up.railway.app',
      },
    });
  });
  
  return (
    <PageLayout>
      <SEO 
        title={t('seo.about.title')}
        description={t('seo.about.description')}
        keywords="AI experts, AI transformation team, AI consulting experts, Montréal AI agency, Halifax AI services"
        ogImage="https://nukleodigital-production.up.railway.app/og-about.jpg"
      />
      {teamPersonSchemas.map((schema, index) => (
        <StructuredData key={index} data={schema} />
      ))}
      <div className="min-h-screen bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-20">
          <Breadcrumb items={[{ name: t('nav.about'), url: '/about' }]} />
          <div className="text-center mb-16">
            <p className="text-violet-300 uppercase tracking-widest text-sm mb-4">{t('about.aboutUs')}</p>
            <h1 className="text-6xl md:text-8xl font-bold mb-8">
              <span className="text-white">{t('about.heroTitle1')}</span>
              <br />
              <span className="text-white">{t('about.heroTitle2')}</span>
              <br />
              <span className="text-white">{t('about.heroTitle3')}</span>
            </h1>
          </div>
        </section>

        {/* Manifesto Section */}
        <section className="container mx-auto px-4 py-20">
          <p className="text-violet-300 uppercase tracking-widest text-sm mb-12 text-center">{t('about.manifesto')}</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-fuchsia-400 mb-4">{t('about.nukleoSpirit')}</h3>
              <SafeHTML html={t('about.nukleoSpiritText')} tag="p" className="text-gray-300 leading-relaxed" />
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-fuchsia-400 mb-4">{t('about.ourApproach')}</h3>
              <p className="text-gray-300 leading-relaxed">{t('about.ourApproachText')}</p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-fuchsia-400 mb-4">{t('about.whatSetsUsApart')}</h3>
              <p className="text-gray-300 leading-relaxed">{t('about.whatSetsUsApartText')}</p>
            </div>
          </div>
        </section>

        {/* Ecosystem Section — Nukleo.Group & Rouge on Blue */}
        <section className="container mx-auto px-4 py-20">
          <p className="text-violet-300 uppercase tracking-widest text-sm mb-4 text-center">
            {t('about.groupSection.title') || "L'écosystème Nukleo"}
          </p>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            {t('about.groupSection.description') || 'Nukleo est la marque phare d\'un écosystème plus large.'}
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-fuchsia-400 mb-4">
                {t('about.groupSection.nukleoGroup.name') || 'Nukleo.Group'}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {t('about.groupSection.nukleoGroup.description') || 'La holding stratégique qui pilote les acquisitions et la croissance du groupe.'}
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-fuchsia-400 mb-4">
                {t('about.groupSection.rougeOnBlue.name') || 'Rouge on Blue'}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {t('about.groupSection.rougeOnBlue.description') || 'Pour les transformations d\'envergure qui requièrent le plus haut niveau de stratégie et de créativité.'}
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="container mx-auto px-4 py-20">
          <p className="text-violet-300 uppercase tracking-widest text-sm mb-4 text-center">{t('about.valuesTitle')}</p>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">{t('about.valuesSubtitle')}</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-fuchsia-400 mb-4">{t('about.values.authenticity.title')}</h3>
              <p className="text-gray-300 leading-relaxed">{t('about.values.authenticity.description')}</p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-fuchsia-400 mb-4">{t('about.values.excellence.title')}</h3>
              <p className="text-gray-300 leading-relaxed">{t('about.values.excellence.description')}</p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-fuchsia-400 mb-4">{t('about.values.ownership.title')}</h3>
              <p className="text-gray-300 leading-relaxed">{t('about.values.ownership.description')}</p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4 py-20">
          <p className="text-violet-300 uppercase tracking-widest text-sm mb-12 text-center">{t('about.ourTeam')}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
              >
                <a 
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-square rounded-xl overflow-hidden mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                  aria-label={`${member.name}'s LinkedIn profile`}
                >
                  {member.image === '/team/Ricardo.png' || member.image === '/team/Marie-Claire.png' ? (
                    <OptimizedImage 
                      src={member.image}
                      alt={(t('alt.teamMember') || '{{name}} - {{role}} chez Nukleo Digital')
                        .replace('{{name}}', member.name)
                        .replace('{{role}}', t(`about.team.${member.translationKey}.role`) || member.translationKey)}
                      width={400}
                      height={400}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <OptimizedImage 
                      src={member.image.endsWith('.webp') ? member.image.replace('.webp', '.png') : member.image}
                      webpSrc={member.image.endsWith('.webp') ? member.image : (member.image.endsWith('.png') ? member.image.replace('.png', '.webp') : undefined)}
                      alt={(t('alt.teamMember') || '{{name}} - {{role}} chez Nukleo Digital')
                        .replace('{{name}}', member.name)
                        .replace('{{role}}', t(`about.team.${member.translationKey}.role`) || member.translationKey)}
                      width={400}
                      height={400}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  )}
                </a>
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <a 
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400 hover:text-white transition-colors"
                    aria-label={`${member.name}'s LinkedIn profile`}
                  >
                    <Linkedin className="w-5 h-5" fill="currentColor" strokeWidth={0} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Offices Section */}
        <section className="container mx-auto px-4 py-20">
          <p className="text-violet-300 uppercase tracking-widest text-sm mb-12 text-center">{t('about.ourOffices')}</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 flex flex-col">
              <h3 className="text-3xl font-bold text-white mb-4">{t('about.montreal')}</h3>
              <p className="text-gray-300 mb-6">
                {t('about.montrealDescription')}
              </p>
              <p className="text-gray-400 mb-6">
                7236 Rue Waverly Montréal<br />
                QC H2R 0C2
              </p>
              <div className="mt-auto">
                <a 
                  href={getLocalizedPath('/contact')} 
                  className="inline-block px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-fuchsia-500/50 transition-all duration-300"
                >
                  {t('about.letsTalk')}
                </a>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 flex flex-col">
              <h3 className="text-3xl font-bold text-white mb-4">{t('about.halifax')}</h3>
              <p className="text-gray-300 mb-6">
                {t('about.halifaxDescription')}
              </p>
              <p className="text-gray-400 mb-6">
                1800 Argyle St Unit 801 Halifax<br />
                NS B3J 3N8
              </p>
              <div className="mt-auto">
                <a 
                  href={getLocalizedPath('/contact')} 
                  className="inline-block px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-fuchsia-500/50 transition-all duration-300"
                >
                  {t('about.letsTalk')}
                </a>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 flex flex-col">
              <h3 className="text-3xl font-bold text-white mb-4">{t('about.remote')}</h3>
              <p className="text-gray-300 mb-6">
                {t('about.remoteDescription')}
              </p>
              <p className="text-gray-400 mb-6">
                {t('about.remoteLocation')}
              </p>
              <div className="mt-auto">
                <a 
                  href={getLocalizedPath('/contact')} 
                  className="inline-block px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-fuchsia-500/50 transition-all duration-300"
                >
                  {t('about.letsTalk')}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
