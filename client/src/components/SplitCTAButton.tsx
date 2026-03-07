import { ArrowRight } from 'lucide-react';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const BTN_PURPLE = '#523DCB';

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
    padding: '0.85rem 1.75rem',
    fontSize: '0.9rem',
    circleSize: '2.8rem',
    iconSize: '1.125rem',
  },
  small: {
    padding: '0.5rem 1rem',
    fontSize: '0.8rem',
    circleSize: '2.25rem',
    iconSize: '1rem',
  },
  header: {
    padding: 'clamp(0.5rem, 1vw, 0.9rem) clamp(1rem, 1.4vw, 1.75rem)',
    fontSize: 'clamp(0.8rem, 0.95vw, 1.05rem)',
    circleSize: 'clamp(2.25rem, 4vw, 2.75rem)',
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
  const shadowBlock = isWhite ? '0 2px 8px rgba(0,0,0,0.1)' : 'none';

  const circleSize = sz.circleSize;

  const styleWrapper = {
    display: 'inline-flex',
    alignItems: 'stretch',
    minHeight: circleSize,
    gap: 0,
    margin: 0,
    border: 'none',
    textDecoration: 'none' as const,
  };
  const styleText = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: sz.padding,
    minHeight: circleSize,
    boxSizing: 'border-box' as const,
    background: bg,
    color,
    fontFamily: "'Neue Haas Unica Pro', sans-serif",
    fontWeight: 500,
    fontSize: sz.fontSize,
    border: 'none',
    margin: 0,
    borderRadius: 9999,
    boxShadow: shadowBlock,
  };
  const styleArrowWrapper = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    alignSelf: 'stretch',
    aspectRatio: '1',
    minWidth: circleSize,
    minHeight: circleSize,
  } as React.CSSProperties;
  const styleArrow = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    background: bg,
    color,
    border: 'none',
    margin: 0,
    borderRadius: '50%',
    boxShadow: shadowBlock,
    boxSizing: 'border-box' as const,
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
      <span style={styleArrowWrapper} aria-hidden>
        <span style={styleArrow}>
          <ArrowRight style={{ width: sz.iconSize, height: sz.iconSize }} strokeWidth={2.5} />
        </span>
      </span>
    </a>
  );
}
