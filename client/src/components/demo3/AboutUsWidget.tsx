import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

interface AboutUsWidgetProps {
  className?: string;
}

/**
 * Widget About us — bref historique + lien vers la page À propos
 */
export function AboutUsWidget({ className = '' }: AboutUsWidgetProps) {
  const getLocalizedPath = useLocalizedPath();

  return (
    <div
      className={`rounded-3xl p-8 lg:p-10 flex flex-col justify-between border border-white/20 overflow-hidden ${className}`}
      style={{ background: 'rgba(10,10,10,0.6)', minHeight: '200px' }}
    >
      <div>
        <p className="text-white/40 text-[10px] font-medium tracking-[0.35em] uppercase mb-4">
          About Us
        </p>
        <p className="text-white/80 text-sm lg:text-base leading-relaxed max-w-xl">
          Founded in Montréal in 2018, Nukleo has grown from a digital consultancy into a full-stack performance agency. We blend strategy, technology, and creative — powered by AI — to help ambitious organizations reach their audiences and scale their impact.
        </p>
      </div>
      <Link
        href={getLocalizedPath('/about')}
        className="inline-flex items-center gap-2 text-white/70 hover:text-white font-semibold text-sm mt-6 transition-colors group w-fit backdrop-blur-md px-4 py-2 rounded-lg"
      >
        Our story
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}
