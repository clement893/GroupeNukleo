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
      name: 'Agency',
      fullName: 'Nukleo.Agency',
      subtitle: 'Marketing & Communication',
      description: 'The right people find you — and choose you. We build your visibility, sharpen your message, and turn attention into growth through SEO, paid media, and AI-powered campaigns.',
      link: '/services/agency',
    },
    {
      number: '02',
      name: 'Studio',
      fullName: 'Nukleo.Studio',
      subtitle: 'Design & Creation',
      description: 'Your brand becomes impossible to ignore. We craft visual identities, digital experiences, and creative campaigns that make your ambition tangible — and your audience feel it.',
      link: '/services/studio',
    },
    {
      number: '03',
      name: 'Tech',
      fullName: 'Nukleo.Tech',
      subtitle: 'Development & AI',
      description: 'Your systems work for you, not the other way around. We build websites, platforms, and AI-powered tools that automate the complex and accelerate what matters.',
      link: '/services/tech',
    },
    {
      number: '04',
      name: 'Consulting',
      fullName: 'Nukleo.Consulting',
      subtitle: 'Transformation & Strategy',
      description: 'You move with clarity, not hesitation. We guide your organization through its digital transformation — from honest audit to full execution, with AI at the core.',
      link: '/services/consulting',
    },
  ];

  return (
    <section className="py-40 text-white relative overflow-hidden" style={{ backgroundColor: '#29292B' }}>
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-24 border-b border-white/8 pb-8 gap-6 lg:gap-0">
          <SafeHTML html={t('trinity.title')} tag="h2" className="text-white mb-4 sm:mb-6 text-4xl sm:text-5xl lg:text-6xl font-heading" />
          <p className="text-xl max-w-sm font-light text-white/60 pb-2">
            {t('trinity.description')}
          </p>
        </div>

        {/* Departments Grid — 2×2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-l border-white/8">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="border-r border-b border-white/8 p-8 sm:p-10 lg:p-14 group hover:border-white/20 transition-all duration-500 h-full flex flex-col justify-between min-h-[460px] relative overflow-hidden"
            >
              {/* Large typographic number — background */}
              <div
                className="absolute -bottom-6 -right-4 text-[11rem] sm:text-[14rem] font-black leading-none select-none pointer-events-none text-white/10 group-hover:text-white/18 transition-all duration-500"
                aria-hidden="true"
              >
                {dept.number}
              </div>

              <div className="relative z-10">
                {/* Department name badge */}
                <div className="flex items-center gap-3 mb-10">
                  <span className="text-xs font-bold tracking-widest uppercase text-white/50">
                    {dept.fullName}
                  </span>
                </div>

                {/* Subtitle */}
                <p className="text-white/40 text-sm font-medium tracking-widest uppercase mb-6">
                  {dept.subtitle}
                </p>

                {/* Description — benefit-focused */}
                <p className="text-xl font-light text-white/75 leading-relaxed">
                  {dept.description}
                </p>
              </div>

              {/* Link */}
              <Link
                href={getLocalizedPath(dept.link)}
                className="relative z-10 mt-12 inline-flex items-center gap-2 font-semibold text-base text-white group-hover:gap-4 transition-all duration-300"
              >
                {t('trinity.explore')} {dept.name}
                <span className="text-lg">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
