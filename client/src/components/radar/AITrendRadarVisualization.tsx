import { useState, useRef } from 'react';

interface Technology {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface Position {
  id: number;
  technologyId: number;
  date: string;
  maturityScore: number;
  impactScore: number;
  definition: string;
  useCases: string;
  maturityLevel: string;
  maturityJustification: string;
  impactBusiness: string;
  adoptionBarriers: string;
  recommendations: string;
}

interface RadarData {
  technology: Technology;
  position: Position;
}

interface AITrendRadarVisualizationProps {
  data: RadarData[];
  onTechnologyClick?: (tech: RadarData) => void;
}

export function AITrendRadarVisualization({ data, onTechnologyClick }: AITrendRadarVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedTech, setSelectedTech] = useState<RadarData | null>(null);
  const [hoveredTech, setHoveredTech] = useState<RadarData | null>(null);
  
  // Ensure data is always an array
  const safeData = Array.isArray(data) ? data : [];

  // Radar dimensions
  const width = 900;
  const height = 900;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 380;
  const padding = 80;

  // Convert scores to coordinates
  // Maturity: 0-100 -> X: left to right (0 = left, 100 = right)
  // Impact: 0-100 -> Y: bottom to top (0 = bottom, 100 = top)
  const scoreToCoords = (maturity: number, impact: number) => {
    const x = centerX + ((maturity - 50) / 50) * radius;
    const y = centerY - ((impact - 50) / 50) * radius;
    return { x: Math.max(padding, Math.min(width - padding, x)), y: Math.max(padding, Math.min(height - padding, y)) };
  };

  const getQuadrant = (maturity: number, impact: number): string => {
    if (maturity < 50 && impact < 50) return 'Explorateurs';
    if (maturity < 50 && impact >= 50) return 'Pionniers';
    if (maturity >= 50 && impact < 50) return 'Consolidateurs';
    return 'Leaders';
  };

  const getQuadrantColor = (quadrant: string): string => {
    switch (quadrant) {
      case 'Explorateurs': return 'bg-[#523DCB]/20 border-[#523DCB]/50';
      case 'Pionniers': return 'bg-cyan-500/20 border-cyan-500/50';
      case 'Consolidateurs': return 'bg-yellow-500/20 border-yellow-500/50';
      case 'Leaders': return 'bg-green-500/20 border-green-500/50';
      default: return 'bg-gray-500/20 border-gray-500/50';
    }
  };

  return (
    <div className="relative w-full">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
        >
          {/* Grid lines - more visible */}
          <defs>
            <pattern id="grid-trend" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width={width} height={height} fill="url(#grid-trend)" />
          
          {/* Concentric circles for better readability */}
          {[0.25, 0.5, 0.75, 1].map((scale, idx) => (
            <circle
              key={idx}
              cx={centerX}
              cy={centerY}
              r={radius * scale}
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              strokeDasharray={idx % 2 === 0 ? "5,5" : "none"}
            />
          ))}
          
          {/* Axes - thicker and more visible */}
          <line x1={centerX} y1={padding} x2={centerX} y2={height - padding} stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
          <line x1={padding} y1={centerY} x2={width - padding} y2={centerY} stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
          
          {/* Axis arrows */}
          <polygon points={`${centerX},${padding} ${centerX - 8},${padding + 20} ${centerX + 8},${padding + 20}`} fill="rgba(255,255,255,0.7)" />
          <polygon points={`${width - padding},${centerY} ${width - padding - 20},${centerY - 8} ${width - padding - 20},${centerY + 8}`} fill="rgba(255,255,255,0.7)" />
          
          {/* Axis labels - larger and more visible */}
          <text x={centerX} y={padding - 15} fill="rgba(255,255,255,0.9)" fontSize="16" fontWeight="bold" textAnchor="middle">
            Impact Élevé
          </text>
          <text x={centerX} y={height - padding + 35} fill="rgba(255,255,255,0.9)" fontSize="16" fontWeight="bold" textAnchor="middle">
            Impact Faible
          </text>
          
          <text x={padding - 10} y={centerY - 10} fill="rgba(255,255,255,0.9)" fontSize="16" fontWeight="bold" textAnchor="end">
            Émergent
          </text>
          <text x={width - padding + 10} y={centerY - 10} fill="rgba(255,255,255,0.9)" fontSize="16" fontWeight="bold" textAnchor="start">
            Établi
          </text>
          
          {/* Score labels on axes */}
          {[0, 25, 50, 75, 100].map((score) => {
            const x = centerX + ((score - 50) / 50) * radius;
            const y = centerY - ((score - 50) / 50) * radius;
            return (
              <g key={`score-${score}`}>
                {score !== 50 && (
                  <>
                    <text x={x} y={centerY + 30} fill="rgba(255,255,255,0.6)" fontSize="12" textAnchor="middle">
                      {score}
                    </text>
                    <text x={centerX - 30} y={y} fill="rgba(255,255,255,0.6)" fontSize="12" textAnchor="middle">
                      {score}
                    </text>
                  </>
                )}
              </g>
            );
          })}
          
          {/* Quadrant backgrounds */}
          <rect x={0} y={0} width={centerX} height={centerY} fill="rgba(139,92,246,0.05)" />
          <rect x={centerX} y={0} width={centerX} height={centerY} fill="rgba(34,211,238,0.05)" />
          <rect x={0} y={centerY} width={centerX} height={centerY} fill="rgba(234,179,8,0.05)" />
          <rect x={centerX} y={centerY} width={centerX} height={centerY} fill="rgba(34,197,94,0.05)" />
          
          {/* Technology bubbles - always visible with labels */}
          {safeData.map((item) => {
            const { x, y } = scoreToCoords(item.position.maturityScore, item.position.impactScore);
            const quadrant = getQuadrant(item.position.maturityScore, item.position.impactScore);
            const isHovered = hoveredTech?.technology.id === item.technology.id;
            const isSelected = selectedTech?.technology.id === item.technology.id;
            
            // Determine label position to avoid overlap
            const labelOffset = isSelected ? -40 : -35;
            const labelY = y + labelOffset;
            
            return (
              <g key={item.technology.id}>
                {/* Glow effect for selected/hovered */}
                {(isSelected || isHovered) && (
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 35 : 30}
                    fill={isSelected ? '#523DCB' : '#523DCB'}
                    opacity="0.3"
                    className="pointer-events-none"
                  />
                )}
                
                <circle
                  data-tech-slug={item.technology.slug}
                  cx={x}
                  cy={y}
                  r={isSelected ? 22 : isHovered ? 18 : 16}
                  fill={isSelected ? '#523DCB' : isHovered ? '#523DCB' : '#523DCB'}
                  stroke="white"
                  strokeWidth={isSelected ? 4 : isHovered ? 3 : 2.5}
                  opacity={isSelected ? 1 : isHovered ? 0.95 : 0.85}
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredTech(item)}
                  onMouseLeave={() => setHoveredTech(null)}
                  onClick={() => {
                    setSelectedTech(item);
                    onTechnologyClick?.(item);
                  }}
                />
                
                {/* Always visible label with background for readability */}
                <g className="pointer-events-none">
                  <rect
                    x={x - 60}
                    y={labelY - 12}
                    width={120}
                    height={24}
                    fill="rgba(0,0,0,0.6)"
                    rx="4"
                    className="backdrop-blur-sm"
                  />
                  <text
                    x={x}
                    y={labelY + 4}
                    fill="white"
                    fontSize={isSelected ? "14" : "13"}
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {item.technology.name}
                  </text>
                </g>
                
                {/* Score indicators */}
                {(isHovered || isSelected) && (
                  <g>
                    <text
                      x={x}
                      y={y + 40}
                      fill="rgba(255,255,255,0.8)"
                      fontSize="11"
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      M:{item.position.maturityScore} I:{item.position.impactScore}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
        
        {/* Legend */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Explorateurs', 'Pionniers', 'Consolidateurs', 'Leaders'].map((quadrant) => (
            <div
              key={quadrant}
              className={`p-4 rounded-lg border ${getQuadrantColor(quadrant)}`}
            >
              <h4 className="text-white font-bold mb-2">{quadrant}</h4>
              <p className="text-white/70 text-sm">
                {quadrant === 'Explorateurs' && 'Émergent + Faible Impact'}
                {quadrant === 'Pionniers' && 'Émergent + Fort Impact'}
                {quadrant === 'Consolidateurs' && 'Établi + Faible Impact'}
                {quadrant === 'Leaders' && 'Établi + Fort Impact'}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Technology Detail Panel */}
      {selectedTech && (
        <div className="mt-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">{selectedTech.technology.name}</h3>
              <p className="text-white/70">{selectedTech.technology.description}</p>
            </div>
            <button
              onClick={() => setSelectedTech(null)}
              className="text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-white font-bold mb-2">Maturité</h4>
              <p className="text-white/70 text-sm mb-2">{selectedTech.position.maturityLevel}</p>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-[#523DCB] h-2 rounded-full"
                  style={{ width: `${selectedTech.position.maturityScore}%` }}
                />
              </div>
              <p className="text-white/60 text-xs mt-2">{selectedTech.position.maturityJustification}</p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-2">Impact Business</h4>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-cyan-500 h-2 rounded-full"
                  style={{ width: `${selectedTech.position.impactScore}%` }}
                />
              </div>
              <p className="text-white/70 text-sm mt-2">{selectedTech.position.impactBusiness}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-white font-bold mb-3">Définition</h4>
            <p className="text-white/80 leading-relaxed">{selectedTech.position.definition}</p>
          </div>
          
          <div className="mb-6">
            <h4 className="text-white font-bold mb-3">Cas d'usage</h4>
            <div className="space-y-3">
              {(() => {
                try {
                  const useCases = JSON.parse(selectedTech.position.useCases || '[]');
                  if (!Array.isArray(useCases)) return null;
                  return useCases.map((useCase: any, idx: number) => (
                    <div key={idx} className="bg-white/5 p-4 rounded-lg">
                      <h5 className="text-white font-semibold mb-1">{useCase.title || 'Cas d\'usage'}</h5>
                      <p className="text-white/70 text-sm mb-2">{useCase.description || ''}</p>
                      {useCase.examples && Array.isArray(useCase.examples) && (
                        <div className="flex flex-wrap gap-2">
                          {useCase.examples.map((ex: string, i: number) => (
                            <span key={i} className="px-2 py-1 bg-white/10 rounded text-white/80 text-xs">
                              {ex}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ));
                } catch (error) {
                  return <p className="text-white/60 text-sm">Données de cas d'usage non disponibles</p>;
                }
              })()}
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-white font-bold mb-3">Barrières à l'adoption</h4>
            <div className="space-y-2">
              {(() => {
                try {
                  const barriers = JSON.parse(selectedTech.position.adoptionBarriers || '[]');
                  if (!Array.isArray(barriers)) return null;
                  return barriers.map((barrier: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-white/60">•</span>
                      <div>
                        <span className="text-white/80 font-semibold">{barrier.type || 'Barrière'}: </span>
                        <span className="text-white/70">{barrier.description || ''}</span>
                      </div>
                    </div>
                  ));
                } catch (error) {
                  return <p className="text-white/60 text-sm">Données de barrières non disponibles</p>;
                }
              })()}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-3">Recommandations par niveau</h4>
            <div className="space-y-3">
              {(() => {
                try {
                  const recommendations = JSON.parse(selectedTech.position.recommendations || '{}');
                  if (typeof recommendations !== 'object' || recommendations === null) return null;
                  return Object.entries(recommendations).map(([level, rec]: [string, any]) => (
                    <div key={level} className="bg-white/5 p-4 rounded-lg">
                      <h5 className="text-white font-semibold mb-1">{level}</h5>
                      <p className="text-white/70 text-sm">{rec || ''}</p>
                    </div>
                  ));
                } catch (error) {
                  return <p className="text-white/60 text-sm">Données de recommandations non disponibles</p>;
                }
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
