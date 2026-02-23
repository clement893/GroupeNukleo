interface ScrollIndicatorProps {
  current: number;
  total: number;
}

export function ScrollIndicator({ current, total }: ScrollIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <div
          key={n}
          className={`w-12 h-10 flex items-center justify-center rounded-md font-mono text-sm font-bold transition-colors ${
            n === current ? 'bg-amber-400 text-gray-900' : 'bg-gray-200 text-gray-500'
          }`}
        >
          {String(n).padStart(2, '0')}
        </div>
      ))}
    </div>
  );
}
