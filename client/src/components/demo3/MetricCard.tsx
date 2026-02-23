import { CardWidget } from './CardWidget';

interface MetricCardProps {
  value: string;
  subtext?: string;
  avatars?: string[];
}

export function MetricCard({ value, subtext, avatars = [] }: MetricCardProps) {
  return (
    <CardWidget className="p-4 flex items-center justify-between gap-3">
      <div className="flex -space-x-2">
        {avatars.slice(0, 4).map((src, i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-full bg-gray-300 border-2 border-white overflow-hidden shrink-0"
            style={{ zIndex: 4 - i }}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <span className="text-xl font-black text-gray-800">{value}</span>
    </CardWidget>
  );
}
