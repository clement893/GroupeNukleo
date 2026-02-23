import { TrendingUp } from 'lucide-react';
import { CardWidget } from './CardWidget';

interface MetricCardProps {
  value: string;
  avatars?: string[];
}

export function MetricCard({ value, avatars = [] }: MetricCardProps) {
  return (
    <CardWidget className="p-4 flex items-center justify-between gap-3">
      <div className="grid grid-cols-2 gap-1">
        {avatars.slice(0, 4).map((src, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white overflow-hidden shrink-0"
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <span className="text-xl font-black text-gray-800">{value}</span>
        <TrendingUp className="w-4 h-4 text-green-600" />
      </div>
    </CardWidget>
  );
}
