import { MoreHorizontal } from 'lucide-react';
import { CardWidget } from './CardWidget';

interface ProgressWidgetProps {
  label: string;
  progress: number; // 0-100
}

export function ProgressWidget({ label, progress }: ProgressWidgetProps) {
  return (
    <CardWidget className="p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-1">
          <div className="w-5 h-5 rounded-full bg-gray-300" />
          <div className="w-5 h-5 rounded-full bg-gray-300" />
        </div>
        <MoreHorizontal className="w-4 h-4 text-gray-400 ml-auto" />
      </div>
      <p className="text-[10px] text-gray-600 leading-tight line-clamp-2">{label}</p>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#7D56F3] rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </CardWidget>
  );
}
