import { useState } from 'react';
import { Link } from 'wouter';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export interface TriptychProject {
  img: string;
  title: string;
  subtitle?: string;
  date: string;
  time?: string;
  category?: string;
}

interface TriptychSelectedWorkProps {
  /** 3 sets of 3 projects each - each "slide" shows one set */
  sets: TriptychProject[][];
}

export function TriptychSelectedWork({ sets }: TriptychSelectedWorkProps) {
  const [activeSet, setActiveSet] = useState(0);
  const getLocalizedPath = useLocalizedPath();
  const currentProjects = sets[activeSet] ?? sets[0];

  return (
    <section className="relative py-20 bg-[#F5F3EF] overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-gray-100/50 to-[#F5F3EF]" />

      <div className="relative max-w-6xl mx-auto px-8 lg:px-16">
        <p className="text-[10px] font-medium tracking-[0.35em] uppercase text-gray-500 mb-8">
          Selected Work
        </p>

        {/* Triptych - 3 panels, no gap, dark frames */}
        <div className="flex rounded-xl overflow-hidden shadow-2xl border-4 border-[#1a1a1a] max-w-4xl mx-auto">
          {currentProjects.slice(0, 3).map((project, i) => (
            <Link
              key={`${activeSet}-${i}`}
              href={getLocalizedPath('/projects')}
              className="flex-1 min-w-0 group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
                <img
                  src={project.img}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                  <div>
                    {project.category && (
                      <p className="text-[10px] font-medium tracking-widest uppercase text-white/60 mb-1">
                        {project.category}
                      </p>
                    )}
                    <h3 className="font-heading font-black text-xl lg:text-2xl leading-tight">
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p className="text-xs text-white/70 mt-0.5">{project.subtitle}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{project.date}</p>
                    {project.time && (
                      <p className="text-xs text-white/70">{project.time}</p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Navigation pills - bottom right */}
        <div className="flex justify-end gap-2 mt-8">
          {sets.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveSet(i)}
              className={`min-w-[48px] h-10 flex items-center justify-center rounded-full font-mono text-sm font-bold transition-all duration-300 ${
                i === activeSet
                  ? 'bg-[#5B7FD1] text-white shadow-lg'
                  : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
