import { ArrowUpRight, ExternalLink } from 'lucide-react';

export default function NukleoGroupSection() {
  return (
    <section className="py-32 text-white relative overflow-hidden" style={{ backgroundColor: '#1a1a1c' }}>
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-3" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mb-20 border-b border-white/8 pb-10">
          <p className="text-white/40 text-sm font-medium tracking-widest uppercase mb-4">Ecosystem</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white">
            The Nukleo Group
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Nukleo (current) */}
          <div className="p-10 lg:p-14 rounded-2xl bg-white/3 border border-white/8 flex flex-col justify-between min-h-[320px]">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
                <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">Digital Performance</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">Nukleo</h3>
              <p className="text-white/50 text-lg leading-relaxed">
                Your 360° digital partner. Strategy, technology, design, and marketing — four departments, one goal: your performance.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-white/30 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>You are here</span>
            </div>
          </div>

          {/* Rouge on Blue */}
          <a
            href="https://rougeonblue.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-10 lg:p-14 rounded-2xl bg-white/3 border border-white/8 hover:border-red-500/30 hover:bg-white/5 transition-all duration-300 flex flex-col justify-between min-h-[320px] cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="text-red-400 text-sm font-medium tracking-widest uppercase">Creative Agency</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-red-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Rouge on Blue
              </h3>
              <p className="text-white/50 text-lg leading-relaxed">
                The creative and cultural agency of the group. Brand strategy, cultural projects, artistic direction, and high-impact campaigns.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-white/40 text-sm group-hover:text-red-400 transition-colors">
              <ExternalLink className="w-4 h-4" />
              <span>rougeonblue.com</span>
            </div>
          </a>

        </div>

        {/* Bottom tagline */}
        <p className="text-center text-white/20 text-sm mt-16 tracking-widest uppercase">
          Two agencies. One vision. Excellence at every touchpoint.
        </p>
      </div>
    </section>
  );
}
