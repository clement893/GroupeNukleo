import { useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { Sun, Calendar, ArrowRight, TrendingUp, Smartphone, Package, Wallet } from 'lucide-react';
import {
  DateWeatherCard,
  MetricCard,
  CTAButton,
  ProgressWidget,
  FeatureCard,
  StatBlock,
  ScrollIndicator,
} from '@/components/demo3';

const NUKLEO_RED = '#8C3141';
const NUKLEO_PURPLE = '#7D56F3';
const BUREAU_BG = '#5C3D2E';
const LAB_BG = '#1a1a1a';
const STUDIO_BG = '#6B46E0';

const AVATAR_PLACEHOLDERS = [
  '/demo/logos/Queertech.png',
  '/demo/logos/MBAM.png',
  '/demo/logos/SummitLaw.png',
  '/demo/logos/Novisto.png',
];

export default function HomepageDemo3() {
  const getLocalizedPath = useLocalizedPath();
  const billboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = billboardRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaX !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaX;
      }
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F3EF] text-[#0A0A0A] font-sans">
      {/* ─── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] overflow-hidden">
        {/* Gradient bar top */}
        <div
          className="absolute top-0 left-0 right-0 h-2 z-20"
          style={{
            background: `linear-gradient(90deg, ${NUKLEO_PURPLE} 0%, ${NUKLEO_RED} 100%)`,
          }}
        />

        {/* Hero text overlay */}
        <p
          className="absolute top-12 left-8 lg:left-16 text-white/40 text-sm font-medium tracking-widest uppercase z-10"
          style={{ fontFamily: 'system-ui' }}
        >
          Choisissez l'intelligence.
        </p>

        {/* Brand + Arrow */}
        <div className="absolute top-24 left-8 lg:left-16 flex items-center gap-4 z-10">
          <span className="font-heading font-black text-4xl lg:text-6xl tracking-tight">
            <span style={{ color: NUKLEO_RED }}>nuk</span>
            <span style={{ color: NUKLEO_PURPLE }}>leo</span>
          </span>
          <ArrowRight className="w-8 h-8 text-white/60" />
        </div>

        {/* Left widgets sidebar */}
        <div className="absolute left-8 lg:left-16 top-64 flex flex-col gap-4 w-44 z-10">
          <div className="grid grid-cols-2 gap-2">
            <DateWeatherCard day={24} icon={Sun} label="Partially cloudy" />
            <DateWeatherCard day={23} icon={Calendar} label="Février" />
          </div>
          <MetricCard value="749k$" avatars={AVATAR_PLACEHOLDERS} />
          <CTAButton label="+56 540 687" href={getLocalizedPath('/contact')} />
          <ProgressWidget label="Details et amen" progress={65} />
        </div>

        {/* Main visual - Laptop area */}
        <div className="absolute right-0 top-32 bottom-0 w-full lg:w-2/3 flex items-center justify-center">
          <div className="relative w-full max-w-2xl aspect-video flex items-center justify-center">
            <div className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl">
              <img
                src="/demo/hero.jpg"
                alt="Dashboard"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── DESCRIPTION ───────────────────────────────────────────────────── */}
      <section className="py-20 px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-400 mb-6 text-center">
            PACHE HORSHE
          </p>
          <p
            className="text-2xl lg:text-3xl font-medium text-center mb-12 leading-relaxed"
            style={{ color: NUKLEO_RED }}
          >
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
            voluptatum.
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <p className="text-gray-500 text-sm max-w-md lg:text-right">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <Link
              href={getLocalizedPath('/about')}
              className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm"
            >
              En savoir plus
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FEATURE CARDS (Bureau, Lab, Studio) ────────────────────────────── */}
      <section className="px-8 lg:px-16 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Bureau"
            color={BUREAU_BG}
            icon={Smartphone}
            href={getLocalizedPath('/services/agency')}
          />
          <FeatureCard
            title="Lab"
            color={LAB_BG}
            icon={Package}
            href={getLocalizedPath('/services/tech')}
          />
          <FeatureCard
            title="Studio"
            color={STUDIO_BG}
            icon={Wallet}
            href={getLocalizedPath('/services/studio')}
          />
        </div>
      </section>

      {/* ─── STATS ─────────────────────────────────────────────────────────── */}
      <section className="py-20 px-8 lg:px-16 bg-white/50">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 justify-center">
          <StatBlock
            value="98"
            suffix="%"
            description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque."
          />
          <StatBlock
            value="15"
            icon={TrendingUp}
            description="Corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident similique sunt."
          />
        </div>
      </section>

      {/* ─── BILLBOARDS CAROUSEL ───────────────────────────────────────────── */}
      <section className="py-20 px-0">
        <div className="flex items-start gap-8 overflow-x-auto scrollbar-hide pb-8" ref={billboardRef}>
          <div className="flex gap-6 px-8 lg:px-16 shrink-0">
            <div className="w-[340px] shrink-0 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/demo/project-1.jpg"
                alt="Billboard 1"
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="p-4 bg-white">
                <p className="text-xs text-gray-500">20-27 SEPT 20-21H</p>
              </div>
            </div>
            <div className="w-[340px] shrink-0 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/demo/project-2.jpg"
                alt="IN SITU"
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="p-4 bg-white">
                <p className="font-heading font-bold text-lg">IN SITU</p>
              </div>
            </div>
            <div className="w-[340px] shrink-0 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/demo/project-3.jpg"
                alt="Billboard 3"
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="p-4 bg-white">
                <p className="text-xs text-gray-500">Creative</p>
              </div>
            </div>
          </div>
          <div className="shrink-0 pr-8 pt-4">
            <ScrollIndicator current={3} total={5} />
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-8 px-8 lg:px-16 border-t border-gray-200">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href={getLocalizedPath('/')}
            className="font-heading font-black text-xl tracking-tight"
          >
            <span style={{ color: NUKLEO_RED }}>nuk</span>
            <span style={{ color: NUKLEO_PURPLE }}>leo</span>
          </Link>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href={getLocalizedPath('/demo')} className="hover:text-gray-800">
              Démo 1
            </Link>
            <Link href={getLocalizedPath('/demo2')} className="hover:text-gray-800">
              Démo 2
            </Link>
            <Link href={getLocalizedPath('/start-project')} className="hover:text-gray-800">
              Start a project
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
