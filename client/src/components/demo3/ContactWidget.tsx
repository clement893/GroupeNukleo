import { Link } from 'wouter';
import { Mail, MapPin, ArrowRight } from 'lucide-react';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

interface ContactWidgetProps {
  className?: string;
}

/**
 * Widget Contact — infos de contact + liens vers Contact et Start project
 */
export function ContactWidget({ className = '' }: ContactWidgetProps) {
  const getLocalizedPath = useLocalizedPath();

  return (
    <div
      className={`rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 border border-white/20 overflow-hidden ${className}`}
      style={{ background: 'rgba(10,10,10,0.7)', minHeight: '220px' }}
    >
      <div className="flex-1">
        <p className="text-white/40 text-[10px] font-medium tracking-[0.35em] uppercase mb-4">
          Get in touch
        </p>
        <h2 className="font-heading font-black text-white leading-tight tracking-tight mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
          Let's talk about<br />your next project.
        </h2>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-white/70 text-sm">
          <a href="mailto:hello@nukleo.com" className="inline-flex items-center gap-2 hover:text-white transition-colors">
            <Mail className="w-4 h-4 shrink-0" />
            hello@nukleo.com
          </a>
          <span className="inline-flex items-center gap-2">
            <MapPin className="w-4 h-4 shrink-0" />
            Montréal · Halifax
          </span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 shrink-0">
        <Link
          href={getLocalizedPath('/start-project')}
          className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-white/90 transition-all duration-200 text-sm backdrop-blur-md"
        >
          Start a project →
        </Link>
        <Link
          href={getLocalizedPath('/contact')}
          className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:border-white/50 hover:bg-white/5 transition-all duration-200 text-sm backdrop-blur-md"
        >
          Contact us
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
