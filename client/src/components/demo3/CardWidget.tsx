import { cn } from '@/lib/utils';

interface CardWidgetProps {
  children: React.ReactNode;
  className?: string;
}

export function CardWidget({ children, className }: CardWidgetProps) {
  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden',
        'bg-[#EDE9E4] border border-[#E5E0DA]',
        className
      )}
    >
      {children}
    </div>
  );
}
