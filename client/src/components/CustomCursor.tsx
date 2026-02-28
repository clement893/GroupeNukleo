import { useEffect, useState, useMemo, memo } from 'react';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  
  // Detect touch device once - memoized
  const isTouchDevice = useMemo(() => 
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0),
    []
  );

  useEffect(() => {
    if (isTouchDevice) return;
    if (hidden) {
      document.body.classList.remove('custom-cursor-active');
    } else {
      document.body.classList.add('custom-cursor-active');
    }
    return () => { document.body.classList.remove('custom-cursor-active'); };
  }, [isTouchDevice, hidden]);

  useEffect(() => {
    // Early return for touch devices
    if (isTouchDevice) return;

    // Optimize mouse move handler with requestAnimationFrame throttling
    let rafId: number;
    const updatePosition = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        setHidden(false);
      });
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    // Use passive listeners for better performance
    window.addEventListener('mousemove', updatePosition, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.body.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', updatePosition);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTouchDevice]);

  // Don't render on touch devices or when hidden
  if (isTouchDevice || hidden) return null;

  return (
    <div 
      className="cursor-dot hidden md:block"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px` 
      }}
    />
  );
}

export default memo(CustomCursor);
