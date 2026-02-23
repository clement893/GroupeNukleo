import { LucideIcon } from 'lucide-react';
import { CardWidget } from './CardWidget';

interface DateWeatherCardProps {
  day: number;
  icon?: LucideIcon;
  label: string;
}

export function DateWeatherCard({ day, icon: Icon, label }: DateWeatherCardProps) {
  return (
    <CardWidget className="p-4 flex flex-col gap-2 aspect-square">
      {Icon && <Icon className="w-5 h-5 text-amber-600" />}
      <span className="text-2xl font-black text-gray-800">{day}</span>
      <span className="text-[10px] text-gray-600 leading-tight">{label}</span>
    </CardWidget>
  );
}
