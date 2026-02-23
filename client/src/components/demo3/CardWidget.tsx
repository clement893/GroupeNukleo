import { cn } from '@/lib/utils';

interface CardWidgetProps {
  children: React.ReactNode;
  className?: string;
}

export function CardWidget({ children, className }: CardWidgetProps) {
  return (
    <div
      className={cn(
        'rounded-xl bg-white/90 border border-gray-200/80 shadow-sm overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
}
