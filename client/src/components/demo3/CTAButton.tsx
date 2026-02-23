import { Link } from 'wouter';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  label: string;
  href?: string;
  className?: string;
}

export function CTAButton({ label, href = '/start-project', className }: CTAButtonProps) {
  const classes = cn(
    'block w-full text-center font-semibold text-sm py-3 px-6 rounded-xl transition-all duration-200',
    'bg-[#7D56F3] text-white hover:bg-[#6B46E0]',
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return <button type="button" className={classes}>{label}</button>;
}
