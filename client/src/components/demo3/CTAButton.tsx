import { Link } from 'wouter';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  label: string;
  href?: string;
  className?: string;
}

export function CTAButton({ label, href = '/contact', className }: CTAButtonProps) {
  const classes = cn(
    'flex items-center justify-center gap-2 w-full font-semibold text-sm py-3 px-6 rounded-xl transition-all duration-200',
    'bg-[#7D56F3] text-white hover:bg-[#6B46E0]',
    className
  );

  const content = (
    <>
      {label}
      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
        <Plus className="w-3 h-3" />
      </span>
    </>
  );

  if (href) {
    return <Link href={href} className={classes}>{content}</Link>;
  }

  return <button type="button" className={classes}>{content}</button>;
}
