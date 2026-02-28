import { ArrowUpRight } from 'lucide-react';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const BTN_PURPLE = '#5D43CD';

export type SplitCTAButtonVariant = 'purple' | 'white';
export type SplitCTAButtonSize = 'default' | 'small' | 'header';

export interface SplitCTAButtonProps {
  href: string;
  label: string;
  ariaLabel?: string;
  className?: string;
  variant?: SplitCTAButtonVariant;
  size?: SplitCTAButtonSize;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

const SIZES = {
  default: {
    padding: '0.9rem 1.75rem',
    fontSize: '0.9rem',
    arrowWidth: '2.5rem',
    iconSize: '1.25rem',
  },
  small: {
    padding: '0.5rem 1rem',
    fontSize: '0.8rem',
    arrowWidth: '2rem',
    iconSize: '1rem',
  },
  /** Pour le header : scale avec la vue sur grands écrans */
  header: {
    padding: 'clamp(0.5rem, 1vw, 0.9rem) clamp(1rem, 1.4vw, 1.75rem)',
    fontSize: 'clamp(0.8rem, 0.95vw, 1.05rem)',
    arrowWidth: '2.25rem',
    iconSize: '1.125rem',
  },
} as const;

export function SplitCTAButton({
  href,
  label,
  ariaLabel,
  className = '',
  variant = 'purple',
  size = 'default',
  onClick,
  onMouseEnter,
}: SplitCTAButtonProps) {
  const getLocalizedPath = useLocalizedPath();
  const to = getLocalizedPath(href);
  const sz = SIZES[size];

  const isWhite = variant === 'white';
  const bg = isWhite ? '#fff' : BTN_PURPLE;
  const color = isWhite ? '#0a0a0a' : '#fff';
  const shadowBlock = isWhite ? '0 2px 8px rgba(0,0,0,0.1)' : '0 2px 8px rgba(93,67,205,0.25)';

  const styleWrapper = {
    display: 'inline-flex',
    alignItems: 'stretch',
    gap: 0,
    margin: 0,
    border: 'none',
    textDecoration: 'none' as const,
  };
  const styleText = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: sz.padding,
    background: bg,
    color,
    fontFamily: "'Figtree', sans-serif",
    fontWeight: 400,
    fontSize: sz.fontSize,
    border: 'none',
    margin: 0,
    borderRadius: 999,
    boxShadow: shadowBlock,
  };
  const styleArrow = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sz.arrowWidth,
    minWidth: sz.arrowWidth,
    background: bg,
    color,
    border: 'none',
    margin: 0,
    borderRadius: '1rem',
    boxShadow: shadowBlock,
  };

  return (
    <a
      href={to}
      aria-label={ariaLabel ?? label}
      className={`group hover:opacity-95 transition-opacity ${className}`}
      style={styleWrapper}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <span style={styleText}>{label}</span>
      <span
        style={styleArrow}
        className="inline-flex items-center justify-center transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      >
        <ArrowUpRight style={{ width: sz.iconSize, height: sz.iconSize }} strokeWidth={2.5} />
      </span>
    </a>
  );
}
