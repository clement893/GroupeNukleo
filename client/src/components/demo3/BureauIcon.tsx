import { Smartphone, Headphones, BookOpen } from 'lucide-react';

/** Phone + headphones + notebook - Bureau card icon */
export function BureauIcon({ className }: { className?: string }) {
  return (
    <div className={`flex gap-1 ${className}`}>
      <Smartphone className="w-5 h-5" />
      <Headphones className="w-4 h-4 -ml-1 mt-1" />
      <BookOpen className="w-4 h-4 -ml-1" />
    </div>
  );
}
