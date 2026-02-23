import { CardWidget } from './CardWidget';

interface ProgressWidgetProps {
  label: string;
  progress: number; // 0-100
}

export function ProgressWidget({ label, progress }: ProgressWidgetProps) {
  return (
    <CardWidget className="p-4">
      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">{label}</p>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#7D56F3] rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </CardWidget>
  );
}
