import { Compass, Lightbulb, Zap, TrendingUp, CheckCircle2, Users, Target, Clock, Shield, BarChart3, Sparkles } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { Link } from 'wouter';
import { SplitCTAButton } from '@/components/SplitCTAButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const PHASE_NUMBERS = ['01', '02', '03', '04'];
const PHASE_ICONS = [Compass, Lightbulb, Zap, TrendingUp];
const PHASE_COLORS = ['blue', 'purple', 'emerald', 'orange'] as const;
const PRINCIPLE_ICONS = [Users, Target, Shield, Clock, BarChart3, Sparkles];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', badge: 'bg-blue-500/8 border-blue-500/15 text-blue-300' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', badge: 'bg-purple-500/8 border-purple-500/15 text-purple-300' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', badge: 'bg-emerald-500/8 border-emerald-500/15 text-emerald-300' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400', badge: 'bg-orange-500/8 border-orange-500/15 text-orange-300' },
};

export default function Approche() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();

  const phases = PHASE_NUMBERS.map((num, i) => ({
    number: num,
    icon: PHASE_ICONS[i],
    color: PHASE_COLORS[i],
    title: t(`approche.phase${i + 1}Title`),
    subtitle: t(`approche.phase${i + 1}Subtitle`),
    description: t(`approche.phase${i + 1}Description`),
    activities: (t(`approche.phase${i + 1}Activities`, { returnObjects: true }) as string[]) ?? [],
    duration: t(`approche.phase${i + 1}Duration`),
  }));

  const principles = [1, 2, 3, 4, 5, 6].map((i) => ({
    icon: PRINCIPLE_ICONS[i - 1],
    title: t(`approche.principle${i}Title`),
    description: t(`approche.principle${i}Description`),
  }));

  return (
    <PageLayout>
      <SEO
        title={t('approche.seoTitle')}
        description={t('approche.seoDescription')}
        keywords={t('approche.seoKeywords')}
      />
      <main className="min-h-screen bg-[oklch(0.08_0.02_280)]">

        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-24">
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, oklch(0.12 0.04 280) 0%, oklch(0.08 0.02 260) 60%, oklch(0.10 0.03 300) 100%)' }} />
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-purple-600/6 rounded-full blur-[140px]" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
          </div>

          <div className="container relative z-10 max-w-6xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Compass className="w-4 h-4 text-white/60" />
              <span className="text-sm font-medium text-white/60 tracking-widest uppercase">{t('approche.heroBadge')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.9]">
              {t('approche.heroTitle1')}<br />
              <span className="text-white/70">
                {t('approche.heroTitle2')}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mb-12 leading-relaxed">
              {t('approche.heroParagraph')}
            </p>
          </div>
        </section>

        {/* Les 4 phases */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <p className="text-white/40 text-sm font-medium tracking-widest uppercase mb-4">{t('approche.phasesLabel')}</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">{t('approche.phasesTitle1')}<br />{t('approche.phasesTitle2')}</h2>
            </div>

            <div className="space-y-8">
              {phases.map((phase, i) => {
                const Icon = phase.icon;
                const colors = colorMap[phase.color];
                const activities = Array.isArray(phase.activities) ? phase.activities : [];
                return (
                  <div key={i} className="p-8 md:p-12 rounded-2xl bg-white/3 border border-white/8 hover:border-white/12 transition-all duration-300">
                    <div className="grid md:grid-cols-[auto_1fr_auto] gap-8 items-start">
                      <div className="flex items-center gap-6">
                        <div className="text-6xl font-bold text-white/8 leading-none">{phase.number}</div>
                        <div className={`w-14 h-14 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-7 h-7 ${colors.text}`} />
                        </div>
                      </div>

                      <div>
                        <p className={`text-sm font-medium tracking-widest uppercase ${colors.text} mb-1`}>{phase.subtitle}</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{phase.title}</h3>
                        <p className="text-white/50 leading-relaxed mb-6 max-w-2xl">{phase.description}</p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {activities.map((activity, j) => (
                            <div key={j} className="flex items-start gap-3">
                              <CheckCircle2 className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
                              <span className="text-white/50 text-sm">{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className={`px-4 py-2 rounded-full ${colors.badge} border text-sm font-medium whitespace-nowrap flex-shrink-0`}>
                        {phase.duration}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Principes */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <p className="text-white/40 text-sm font-medium tracking-widest uppercase mb-4">{t('approche.principlesLabel')}</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">{t('approche.principlesTitle1')}<br />{t('approche.principlesTitle2')}</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div key={i} className="p-8 rounded-2xl bg-white/3 border border-white/8 hover:bg-white/5 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-white/60" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{p.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('approche.ctaTitle')}
            </h2>
            <p className="text-xl text-white/50 mb-10 max-w-2xl mx-auto">
              {t('approche.ctaParagraph')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SplitCTAButton href={getLocalizedPath('/contact')} label={t('approche.ctaStartProject')} variant="white" ariaLabel={t('approche.ctaStartProject')} />
              <Link href={getLocalizedPath('/services')} className="inline-flex items-center gap-2 px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-full text-lg transition-all duration-200">
                {t('approche.ctaViewDepartments')}
              </Link>
            </div>
          </div>
        </section>

      </main>
    </PageLayout>
  );
}
