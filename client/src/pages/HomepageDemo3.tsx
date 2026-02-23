import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { Sun, Cloud, ArrowRight, TrendingUp, Package, Square } from 'lucide-react';
import {
  DateWeatherCard,
  MetricCard,
  CTAButton,
  ProgressWidget,
  FeatureCard,
  StatBlock,
  ScrollIndicator,
  LaptopVisual,
  BureauIcon,
  StudioIcon,
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

const BILLBOARD_IMAGES = [
  { src: '/demo/project-1.jpg', title: '20-21 SEPT', subtitle: '12-21H' },
  { src: '/demo/project-2.jpg', title: 'IN SITU', subtitle: 'MUSEUM' },
  { src: '/demo/project-3.jpg', title: 'Rene Magritte', subtitle: 'The Treachery of Images' },
];

export default function HomepageDemo3() {
  const getLocalizedPath = useLocalizedPath();
  const [billboardIndex, setBillboardIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setBillboardIndex((i) => (i + 1) % BILLBOARD_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen text-[#0A0A0A] font-sans">
      {/* ─── HERO ───────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[90vh] overflow-hidden flex"
        style={{
          background: 'linear-gradient(135deg, #6B5B95 0%, #8B7BB8 40%, #A8B4E8 100%)',
        }}
      >
        {/* Tagline top-left */}
        <p className="absolute top-8 left-8 lg:left-16 text-white/70 text-sm font-medium tracking-widest z-10">
          Choisissez l'intelligence.
        </p>

        {/* Menu icon top-right */}
        <button
          type="button"
          className="absolute top-8 right-8 lg:right-16 w-10 h-10 rounded border border-white/40 flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors z-10"
          aria-label="Menu"
        >
          <Square className="w-4 h-4" />
        </button>

        {/* Brand logo - nukleo RVB */}
        <div className="absolute top-24 left-8 lg:left-16 z-10">
          <img
            src="/demo/nukleo-logo-rvb.png"
            alt="nukleo"
            className="h-16 lg:h-24 w-auto object-contain"
          />
        </div>

        {/* Left widgets - maquette layout */}
        <div className="absolute left-8 lg:left-16 top-56 flex flex-col gap-3 w-52 z-10">
          <div className="grid grid-cols-2 gap-2">
            <DateWeatherCard day={24} icon={Sun} label="Très bon temps" />
            <DateWeatherCard day={23} icon={Cloud} label="Pluie modéré" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <MetricCard value="749k$" avatars={AVATAR_PLACEHOLDERS} />
            <CTAButton label="+68 540 097" href={getLocalizedPath('/contact')} />
          </div>
          <ProgressWidget
            label="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor."
            progress={65}
          />
        </div>

        {/* Right - Laptop on water */}
        <div className="absolute right-0 top-24 bottom-0 w-full lg:w-1/2 flex items-center justify-center pr-8">
          <LaptopVisual />
        </div>
      </section>

      {/* ─── DESCRIPTION ───────────────────────────────────────────────────── */}
      <section className="py-20 px-8 lg:px-16 bg-[#F5F3EF]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-400 mb-6 text-center">
            PACNE PODSHUS
          </p>
          <p
            className="text-2xl lg:text-4xl font-bold text-center mb-12 leading-snug"
            style={{ color: NUKLEO_RED }}
          >
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
            voluptatum.
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-end gap-6">
            <p className="text-gray-500 text-sm max-w-sm text-left lg:text-right">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
            <Link
              href={getLocalizedPath('/about')}
              className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors text-sm shrink-0"
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FEATURE CARDS (Bureau, Lab, Studio) ────────────────────────────── */}
      <section className="px-8 lg:px-16 py-20 bg-[#F5F3EF]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Bureau"
            color={BUREAU_BG}
            icon={<BureauIcon />}
            href={getLocalizedPath('/services/agency')}
          />
          <FeatureCard
            title="Lab"
            color={LAB_BG}
            icon={<Package className="w-12 h-12" />}
            href={getLocalizedPath('/services/tech')}
          />
          <FeatureCard
            title="Studio"
            color={STUDIO_BG}
            icon={<StudioIcon />}
            href={getLocalizedPath('/services/studio')}
          />
        </div>
      </section>

      {/* ─── STATS ─────────────────────────────────────────────────────────── */}
      <section className="py-20 px-8 lg:px-16 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 justify-center">
          <StatBlock
            value="98"
            suffix="%"
            description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti."
          />
          <StatBlock
            value="15"
            icon={TrendingUp}
            description="Corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident similique sunt in culpa."
          />
        </div>
      </section>

      {/* ─── BILLBOARDS (full-width street image + vertical blocks) ─────────── */}
      <section className="py-20 bg-[#F5F3EF]">
        <div className="max-w-6xl mx-auto px-8 lg:px-16 flex gap-6 items-center">
          <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl relative aspect-[21/9] min-h-[280px]">
            <img
              src={BILLBOARD_IMAGES[billboardIndex].src}
              alt="Street billboards"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
              <p className="text-sm font-semibold">{BILLBOARD_IMAGES[billboardIndex].title}</p>
              <p className="text-xs opacity-90">{BILLBOARD_IMAGES[billboardIndex].subtitle}</p>
            </div>
          </div>
          {/* Vertical block indicator - maquette style */}
          <div className="shrink-0">
            <ScrollIndicator current={billboardIndex + 1} total={3} />
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {BILLBOARD_IMAGES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setBillboardIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === billboardIndex ? 'bg-amber-400' : 'bg-gray-300'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-8 px-8 lg:px-16 border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href={getLocalizedPath('/')} className="inline-block">
            <img
              src="/demo/nukleo-logo-rvb.png"
              alt="nukleo"
              className="h-8 w-auto object-contain"
            />
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
