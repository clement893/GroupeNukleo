import { LucideIcon } from 'lucide-react';
import { CardWidget } from './CardWidget';

interface DateWeatherCardProps {
  day: number;
  icon?: LucideIcon;
  label: string;
}

export function DateWeatherCard({ day, icon: Icon, label }: DateWeatherCardProps) {
  return (
    <CardWidget className="p-4 flex flex-col gap-1">
      <span className="text-2xl font-black text-gray-800">{day}</span>
      {Icon && <Icon className="w-4 h-4 text-amber-500" />}
      <span className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</span>
    </CardWidget>
  );
}
