import { LucideIcon } from 'lucide-react';

interface StatBlockProps {
  value: string;
  suffix?: string;
  description: string;
  icon?: LucideIcon;
}

export function StatBlock({ value, suffix, description, icon: Icon }: StatBlockProps) {
  return (
    <div className="max-w-xs">
      <div className="flex items-baseline gap-2 mb-3">
        <span className="font-heading font-black text-5xl lg:text-6xl text-[#8C3141]">
          {value}
        </span>
        {suffix && (
          <span className="text-2xl font-bold text-[#8C3141]">{suffix}</span>
        )}
        {Icon && <Icon className="w-8 h-8 text-[#7D56F3]" />}
      </div>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
