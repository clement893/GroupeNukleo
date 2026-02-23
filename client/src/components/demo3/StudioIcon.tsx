import { TabletSmartphone, CreditCard } from 'lucide-react';

/** Tablet + card - Studio card icon */
export function StudioIcon({ className }: { className?: string }) {
  return (
    <div className={`flex gap-1 items-center ${className}`}>
      <TabletSmartphone className="w-6 h-6" />
      <CreditCard className="w-5 h-5 -ml-1" />
    </div>
  );
}
