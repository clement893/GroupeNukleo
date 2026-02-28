import { ArrowUpRight } from 'lucide-react';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const BTN_PURPLE = '#5D43CD';
const ARROW_WIDTH = 48;

export type SplitCTAButtonVariant = 'purple' | 'white';

export interface SplitCTAButtonProps {
  href: string;
  label: string;
  ariaLabel?: string;
  className?: string;
  variant?: SplitCTAButtonVariant;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

export function SplitCTAButton({
  href,
  label,
  ariaLabel,
  className = '',
  variant = 'purple',
  onClick,
  onMouseEnter,
}: SplitCTAButtonProps) {
  const getLocalizedPath = useLocalizedPath();
  const to = getLocalizedPath(href);

  const isWhite = variant === 'white';
  const bg = isWhite ? '#fff' : BTN_PURPLE;
  const color = isWhite ? '#0a0a0a' : '#fff';
  const boxShadow = isWhite ? '0 4px 14px rgba(0,0,0,0.12)' : '0 2px 8px rgba(93,67,205,0.25)';

  const styleWrapper = {
    display: 'inline-flex',
    alignItems: 'stretch',
    gap: 0,
    margin: 0,
    border: 'none',
    borderRadius: 999,
    overflow: 'hidden' as const,
    background: bg,
    boxShadow,
    textDecoration: 'none' as const,
  };
  const styleText = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.9rem 1.75rem',
    color,
    fontWeight: 700,
    fontSize: '0.9rem',
    border: 'none',
    margin: 0,
  };
  const styleArrow = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: ARROW_WIDTH,
    color,
    border: 'none',
    margin: 0,
  };

  return (
    <a
      href={to}
      aria-label={ariaLabel ?? label}
      className={`hover:opacity-95 transition-opacity ${className}`}
      style={styleWrapper}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <span style={styleText}>{label}</span>
      <span style={styleArrow} aria-hidden>
        <ArrowUpRight size={20} strokeWidth={2.5} />
      </span>
    </a>
  );
}
