import { Target, TrendingUp, FileCheck, Zap } from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { useLanguage } from '@/contexts/LanguageContext';

interface AssessmentIntroProps {
  onStart: () => void;
}

export default function AssessmentIntro({ onStart }: AssessmentIntroProps) {
  const { playClick } = useSound();
  const { t } = useLanguage();

  const handleStart = () => {
    playClick();
    onStart();
  };

  const benefits = [
    {
      icon: Target,
      title: t('assessment.intro.benefits.identify.title'),
      description: t('assessment.intro.benefits.identify.description'),
    },
    {
      icon: TrendingUp,
      title: t('assessment.intro.benefits.benchmark.title'),
      description: t('assessment.intro.benefits.benchmark.description'),
    },
    {
      icon: FileCheck,
      title: t('assessment.intro.benefits.recommendations.title'),
      description: t('assessment.intro.benefits.recommendations.description'),
    },
    {
      icon: Zap,
      title: t('assessment.intro.benefits.fast.title'),
      description: t('assessment.intro.benefits.fast.description'),
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-6 backdrop-blur-sm">
          <span className="text-accent font-mono text-sm font-bold">{t('assessment.intro.badge')}</span>
        </div>
        
        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {t('assessment.intro.title')}
          <br />
          <span className="bg-gradient-to-r from-[#523DCB] to-rose-400 bg-clip-text text-transparent">
            {t('assessment.intro.titleHighlight')}
          </span>
        </h1>
        
        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
          {t('assessment.intro.subtitle')}
        </p>

        <button
          onClick={handleStart}
          className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#523DCB] to-rose-500 text-white font-bold rounded-full hover:shadow-[0_0_40px_rgba(82,61,203,0.5)] transition-all duration-300"
        >
          {t('assessment.intro.startButton')}
        </button>
      </div>

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div
              key={index}
              className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-white/60">{benefit.description}</p>
            </div>
          );
        })}
      </div>

      {/* What You'll Get */}
      <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">{t('assessment.intro.whatYouGet.title')}</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">0-100</div>
            <div className="text-white/60">{t('assessment.intro.whatYouGet.overallScore')}</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">6</div>
            <div className="text-white/60">{t('assessment.intro.whatYouGet.dimensionScores')}</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">5+</div>
            <div className="text-white/60">{t('assessment.intro.whatYouGet.recommendations')}</div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-12 text-center">
        <p className="text-white/40 text-sm">
          {t('assessment.intro.trustIndicators')}
        </p>
      </div>
    </div>
  );
}
