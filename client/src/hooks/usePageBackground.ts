import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

/**
 * Hook pour garder le fond du body neutre au changement de page.
 * Évite tout flash du gradient ou ancien fond coloré.
 */

const BODY_BG = '#EFE8E8';

export function usePageBackground() {
  const [location] = useLocation();
  const prevLocationRef = useRef(location);

  useEffect(() => {
    if (location !== prevLocationRef.current) {
      document.body.style.background = BODY_BG;
      document.body.style.backgroundAttachment = '';
      prevLocationRef.current = location;
    }
  }, [location]);
}
