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
  LaptopVisual,
  BureauIcon,
  StudioIcon,
  TriptychSelectedWork,
  DoubleLogoCarousel,
  TeamScrollCards,
  DepartmentsWidget,
  type TriptychProject,
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

/** 3 sets of 3 projects - triptych "Selected Work" carousel */
const TRIPTYCH_SETS: TriptychProject[][] = [
  [
    {
      img: '/demo/project-1.jpg',
      title: 'CONTRE JOUR ART AFTER DARK',
      subtitle: '12 - SEPT.',
      date: '12 - SEPT.',
      time: '18H - 21H',
      category: 'Brand & Digital',
    },
    {
      img: '/demo/project-2.jpg',
      title: 'SOIRÉE IN SITU NIGHT',
      subtitle: 'Klimt · The Kiss',
      date: '5 septembre 2024',
      time: '18:00 - 21:00',
      category: 'Brand & Creative',
    },
    {
      img: '/demo/project-3.jpg',
      title: 'Perspectives',
      subtitle: 'René Magritte · The Son of Man',
      date: 'Du 26 septembre',
      time: 'de 16h à 21h',
      category: 'AI & Platform',
    },
  ],
  [
    {
      img: '/demo/work1.jpg',
      title: 'MBAM',
      subtitle: 'Redefining cultural engagement',
      date: '2024',
      category: 'Culture',
    },
    {
      img: '/demo/work2.jpg',
      title: 'SummitLaw',
      subtitle: 'A law firm that looks like its ambition',
      date: '2024',
      category: 'Brand',
    },
    {
      img: '/demo/work3.jpg',
      title: 'QueerTech',
      subtitle: 'Technology built for belonging',
      date: '2023',
      category: 'Tech',
    },
  ],
  [
    {
      img: '/demo/dept-agency.jpg',
      title: 'Nukleo.Agency',
      subtitle: 'Marketing & Communication',
      date: 'Ongoing',
      category: 'Agency',
    },
    {
      img: '/demo/dept-studio.jpg',
      title: 'Nukleo.Studio',
      subtitle: 'Design & Creation',
      date: 'Ongoing',
      category: 'Studio',
    },
    {
      img: '/demo/dept-tech.jpg',
      title: 'Nukleo.Tech',
      subtitle: 'Development & AI',
      date: 'Ongoing',
      category: 'Tech',
    },
  ],
];

export default function HomepageDemo3() {
  const getLocalizedPath = useLocalizedPath();

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

        {/* Brand logo - nukleo RVB (mix-blend: screen pour fond noir transparent sur dégradé) */}
        <div className="absolute top-24 left-8 lg:left-16 z-10 flex items-center">
          <img
            src="/demo/nukleo-logo-rvb.png"
            alt="nukleo"
            className="h-14 lg:h-20 w-auto object-contain object-left"
            style={{ mixBlendMode: 'screen' }}
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

      {/* ─── ÉQUIPE + DÉPARTEMENTS (50/50) ─────────────────────────────────── */}
      <section className="px-8 lg:px-16 py-20 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TeamScrollCards />
          <DepartmentsWidget />
        </div>
      </section>

      {/* ─── DOUBLE CAROUSEL LOGOS ─────────────────────────────────────────── */}
      <section className="px-8 lg:px-16 py-12 bg-[#F5F3EF]">
        <div className="max-w-5xl mx-auto">
          <DoubleLogoCarousel title="Ils nous font confiance" />
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

      {/* ─── TRIPTYCH SELECTED WORK ─────────────────────────────────────────── */}
      <TriptychSelectedWork sets={TRIPTYCH_SETS} />

      {/* ─── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-8 px-8 lg:px-16 border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href={getLocalizedPath('/')} className="inline-flex items-center p-2 -m-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors">
            <img
              src="/demo/nukleo-logo-rvb.png"
              alt="nukleo"
              className="h-7 w-auto object-contain"
              style={{ mixBlendMode: 'screen' }}
            />
          </Link>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href={getLocalizedPath('/demo')} className="hover:text-gray-800">
              Démo 1
            </Link>
            <Link href={getLocalizedPath('/demo2')} className="hover:text-gray-800">
              Démo 2
            </Link>
            <Link href={getLocalizedPath('/demo3')} className="hover:text-gray-800">
              Démo 3
            </Link>
            <Link href={getLocalizedPath('/contact')} className="hover:text-gray-800">
              Start a project
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
