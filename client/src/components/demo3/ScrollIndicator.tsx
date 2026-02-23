interface ScrollIndicatorProps {
  current: number;
  total: number;
}

export function ScrollIndicator({ current, total }: ScrollIndicatorProps) {
  const percent = (current / total) * 100;

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs text-gray-400 uppercase tracking-widest">en</span>
      <div className="w-1 h-24 bg-gray-200 rounded-full overflow-hidden relative">
        <div
          className="absolute bottom-0 left-0 w-full bg-amber-400 transition-all duration-300"
          style={{ height: `${percent}%` }}
        />
      </div>
      <span className="font-mono text-2xl font-bold text-gray-400">
        {String(current).padStart(2, '0')}
      </span>
    </div>
  );
}
