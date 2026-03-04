interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-3">
        <span className="text-white/60 font-mono text-sm">
          Question {current} of {total}
        </span>
        <span className="text-accent font-mono text-sm font-bold">
          {Math.round(percentage)}%
        </span>
      </div>
      
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-[#523DCB] to-rose-500 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
