import { Technology } from "../../lib/radar/technologies";

interface TechnologyCardProps extends Technology {}

export function TechnologyCard(tech: TechnologyCardProps) {
  const getDotColor = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-500";
      case "yellow":
        return "bg-yellow-500";
      case "blue":
        return "bg-blue-500";
      case "red":
        return "bg-red-500";
      default:
        return "bg-white";
    }
  };

  const getCostBadgeStyle = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-500/15 text-green-500";
      case "medium":
        return "bg-yellow-500/15 text-yellow-500";
      case "high":
        return "bg-red-500/15 text-red-500";
      default:
        return "bg-white/10 text-white";
    }
  };

  return (
    <div
      id={`card-${tech.id}`}
      className="tech-card bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-4 transition-all duration-500 hover:bg-white/8 hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl"
    >
      {/* Badge catégorie */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-xs text-white/80 self-start">
        <span className={`w-2 h-2 rounded-full ${getDotColor(tech.maturityColor)}`}></span>
        {tech.category}
      </div>

      {/* Titre */}
      <h3 className="text-2xl font-bold text-white leading-tight">{tech.title}</h3>

      {/* Description */}
      <p className="text-white/70 leading-relaxed flex-grow">{tech.description}</p>

      {/* Métriques ROI */}
      <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-white/10">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-white/50 uppercase tracking-wider">ROI</span>
          <span className="text-xl font-bold text-white">{tech.roi}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-white/50 uppercase tracking-wider">Time to ROI</span>
          <span className="text-xl font-bold text-white">{tech.timeToRoi}</span>
        </div>
      </div>

      {/* Badges coût et difficulté */}
      <div className="flex flex-wrap gap-2">
        <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${getCostBadgeStyle(tech.costLevel)}`}>
          {tech.cost}
        </span>
        <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${getCostBadgeStyle(tech.costLevel)}`}>
          {tech.difficulty}
        </span>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4">
        <span className="text-sm text-white/60">{tech.implementationTime}</span>
        <button className="text-[#523DCB] font-semibold text-sm hover:text-white transition-all duration-300 hover:translate-x-1">
          Learn More →
        </button>
      </div>
    </div>
  );
}
