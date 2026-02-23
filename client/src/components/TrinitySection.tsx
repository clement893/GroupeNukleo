import { Cpu, Compass, Sparkles, Megaphone } from 'lucide-react';
import { Link } from 'wouter';
import SafeHTML from '@/components/SafeHTML';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function TrinitySection() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();

  const departments = [
    {
      number: '01',
      icon: Megaphone,
      name: 'Agency',
      fullName: 'Nukleo.Agency',
      subtitle: 'Marketing & Communication',
      description: 'We build your presence, amplify your message and turn your visibility into real, measurable growth. SEO, paid media, automation, and AI-powered campaigns.',
      link: '/services/agency',
      color: 'text-orange-400',
      borderHover: 'hover:border-orange-500/30',
    },
    {
      number: '02',
      icon: Sparkles,
      name: 'Studio',
      fullName: 'Nukleo.Studio',
      subtitle: 'Design & Creation',
      description: 'We create visual and creative experiences that make your performance visible and desirable. Branding, UX/UI, art direction, and AI-augmented creative production.',
      link: '/services/studio',
      color: 'text-pink-400',
      borderHover: 'hover:border-pink-500/30',
    },
    {
      number: '03',
      icon: Cpu,
      name: 'Tech',
      fullName: 'Nukleo.Tech',
      subtitle: 'Development & Artificial Intelligence',
      description: 'We design and build the digital tools that drive your performance. Web development, mobile apps, AI integrations, automation, and custom AI agent development.',
      link: '/services/tech',
      color: 'text-blue-400',
      borderHover: 'hover:border-blue-500/30',
    },
    {
      number: '04',
      icon: Compass,
      name: 'Consulting',
      fullName: 'Nukleo.Consulting',
      subtitle: 'Transformation & Strategic Consulting',
      description: 'We guide your organization through its digital transformation. Audit, strategy, AI consulting, change management, and training — from vision to execution.',
      link: '/services/consulting',
      color: 'text-emerald-400',
      borderHover: 'hover:border-emerald-500/30',
    },
  ];

  return (
    <section className="py-40 text-white relative overflow-hidden gradient-mesh" style={{ backgroundColor: '#29292B' }}>
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 invert" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-24 border-b border-black/10 pb-8 gap-6 lg:gap-0">
          <SafeHTML html={t('trinity.title')} tag="h2" className="text-white mb-4 sm:mb-6 text-4xl sm:text-5xl lg:text-6xl font-heading" />

          <p className="text-xl max-w-sm font-light text-white/80 pb-2">
            {t('trinity.description')}
          </p>
        </div>

        {/* Departments Grid — 2×2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-l border-black/10">
          {departments.map((dept, index) => {
            const Icon = dept.icon;
            return (
              <div
                key={index}
                className={`border-r border-b border-black/10 p-8 sm:p-10 lg:p-16 group ${dept.borderHover} hover:border-opacity-100 transition-all duration-500 h-full flex flex-col justify-between min-h-[480px] sm:min-h-[520px] relative breathe depth-layer-1 overflow-hidden hover:scale-[1.009] hover:shadow-xl hover:shadow-purple-500/10`}
              >
                {/* Glassmorphism overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Background Icon (appears on hover) */}
                <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <Icon className="w-40 h-40 stroke-1 text-white/10" />
                </div>

                <div>
                  {/* Number & Name */}
                  <div className="flex items-center gap-3 mb-8">
                    <span className="font-mono text-sm opacity-50">
                      {dept.number}
                    </span>
                    <span className={`text-sm font-bold tracking-wider ${dept.color}`}>
                      {dept.fullName}
                    </span>
                  </div>

                  {/* Icon Badge */}
                  <div className="w-16 h-16 border border-black/20 group-hover:border-white/20 rounded-full flex items-center justify-center mb-12 transition-colors">
                    <Icon className={`w-8 h-8 ${dept.color} opacity-80 group-hover:opacity-100 transition-colors`} />
                  </div>

                  {/* Subtitle */}
                  <p className={`text-lg font-medium mb-4 ${dept.color}`}>
                    {dept.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-lg opacity-60 leading-relaxed mb-12 group-hover:opacity-80">
                    {dept.description}
                  </p>
                </div>

                {/* Link */}
                <Link 
                  href={getLocalizedPath(dept.link)}
                  className="inline-flex items-center font-bold text-lg group-hover:translate-x-2 transition-transform relative z-10"
                >
                  {t('trinity.explore')} {dept.name} →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
