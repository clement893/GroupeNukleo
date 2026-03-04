export function RadarHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="container text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[#523DCB]/30 backdrop-blur-sm border border-white/10">
          <span className="text-sm font-medium text-white">Global AI Technology Radar 2024</span>
        </div>

        {/* Titre principal */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          AI Technologies That Actually Matter for{" "}
          <span className="bg-gradient-to-r from-[#523DCB] via-[#523DCB] to-cyan-400 bg-clip-text text-transparent">
            Organizations of All Sizes
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
          Cut through the hype. Discover AI tools with proven ROI, realistic budgets, and fast implementation for startups, SMBs, enterprises, and organizations worldwide.
        </p>

        {/* Bouton Latest AI News */}
        <button className="inline-flex items-center gap-2 px-6 py-3 mb-12 bg-white text-[#523DCB] font-semibold rounded-full hover:bg-white/95 transition-all duration-300 hover:scale-[1.022] shadow-lg">
          📰 Latest AI News & Trends
        </button>

        {/* Légende Maturité */}
        <div className="flex flex-wrap justify-center gap-4">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/15 transition-all">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Adopt Now
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/15 transition-all">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            Trial & Evaluate
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/15 transition-all">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Assess & Monitor
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/15 transition-all">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            Hold
          </button>
        </div>
      </div>
    </section>
  );
}
