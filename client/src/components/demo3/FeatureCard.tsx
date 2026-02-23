import { Link } from 'wouter';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  color: string; // bg class or hex
  icon: LucideIcon;
  href: string;
}

export function FeatureCard({ title, color, icon: Icon, href }: FeatureCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative flex flex-col justify-end p-8 rounded-2xl min-h-[200px] overflow-hidden transition-all duration-300 hover:scale-[1.02]',
        'text-white'
      )}
      style={{ backgroundColor: color }}
    >
      <Icon className="w-10 h-10 mb-4 opacity-90" />
      <span className="font-heading font-black text-2xl">{title}</span>
      <ArrowRight className="absolute bottom-8 right-8 w-6 h-6 group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}
