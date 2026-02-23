import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  color: string;
  icon: React.ReactNode;
  href: string;
}

export function FeatureCard({ title, color, icon, href }: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-end p-8 rounded-2xl min-h-[220px] overflow-hidden transition-all duration-300 hover:scale-[1.02] text-white"
      style={{ backgroundColor: color }}
    >
      <div className="mb-4 text-white [&>svg]:w-12 [&>svg]:h-12 [&_.flex]:opacity-90 [&_svg]:text-white">{icon}</div>
      <span className="font-heading font-black text-3xl">{title}</span>
      <div className="absolute bottom-6 right-6 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
        <ArrowRight className="w-5 h-5" />
      </div>
    </Link>
  );
}
