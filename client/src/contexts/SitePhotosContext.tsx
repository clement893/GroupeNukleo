import { createContext, useContext, useEffect, useState, useMemo } from "react";

export const SITE_PHOTO_KEYS = {
  HERO_COVER: "hero_cover",
  HEADER_LOGO: "header_logo",
  FOOTER_LOGO: "footer_logo",
  MENU_LOGO: "menu_logo",
  NUKLEO_LOGO: "nukleo_logo",
  ROB_LOGO: "rob_logo",
  UNION_FALLBACK: "union_fallback",
  LEADER_CLEMENT: "leader_clement",
  LEADER_LIONEL: "leader_lionel",
} as const;

const FALLBACKS: Record<string, string> = {
  [SITE_PHOTO_KEYS.HERO_COVER]: "/demo/agency-hero-cover.png",
  [SITE_PHOTO_KEYS.HEADER_LOGO]: "/demo/LogoGroupeNukleo.svg",
  [SITE_PHOTO_KEYS.FOOTER_LOGO]: "/demo/logo-groupe-nukleo-white.png",
  [SITE_PHOTO_KEYS.MENU_LOGO]: "/demo/logo-groupe-nukleo.png",
  [SITE_PHOTO_KEYS.NUKLEO_LOGO]: "/demo/NukleoLogo.svg",
  [SITE_PHOTO_KEYS.ROB_LOGO]: "/demo/RobLogo.svg",
  [SITE_PHOTO_KEYS.UNION_FALLBACK]: "/demo/consulting-hero-cover.png",
  [SITE_PHOTO_KEYS.LEADER_CLEMENT]: "/team/Clement.jpg",
  [SITE_PHOTO_KEYS.LEADER_LIONEL]: "/team/LionelPardin.jpg",
};

interface SitePhotosContextValue {
  photos: Record<string, string>;
  getPhoto: (key: string) => string;
  heroObjectPosition: string;
  isLoading: boolean;
  isR2: boolean;
}

const SitePhotosContext = createContext<SitePhotosContextValue | null>(null);

export function SitePhotosProvider({ children }: { children: React.ReactNode }) {
  const [photos, setPhotos] = useState<Record<string, string>>(FALLBACKS);
  const [heroObjectPosition, setHeroObjectPosition] = useState("center");
  const [isLoading, setIsLoading] = useState(true);
  const [isR2, setIsR2] = useState(false);

  useEffect(() => {
    fetch("/api/site-photos")
      .then((r) => r.json())
      .then(async (data) => {
        const newPhotos = data?.photos ? { ...FALLBACKS, ...data.photos } : FALLBACKS;
        const newHeroUrl = newPhotos[SITE_PHOTO_KEYS.HERO_COVER];
        const fallbackHero = FALLBACKS[SITE_PHOTO_KEYS.HERO_COVER];
        // Preload hero before updating to prevent flicker when src changes
        if (newHeroUrl && newHeroUrl !== fallbackHero) {
          await new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = newHeroUrl;
          });
        }
        setPhotos(newPhotos);
        setHeroObjectPosition(data?.heroObjectPosition ?? "center");
        setIsR2(data?.isR2 ?? false);
      })
      .catch(() => setPhotos(FALLBACKS))
      .finally(() => setIsLoading(false));
  }, []);

  const getPhoto = useMemo(
    () => (key: string) => photos[key] ?? FALLBACKS[key] ?? "",
    [photos]
  );

  const value = useMemo(
    () => ({ photos, getPhoto, heroObjectPosition, isLoading, isR2 }),
    [photos, getPhoto, heroObjectPosition, isLoading, isR2]
  );

  return <SitePhotosContext.Provider value={value}>{children}</SitePhotosContext.Provider>;
}

export function useSitePhotos() {
  const ctx = useContext(SitePhotosContext);
  if (!ctx) {
    return {
      photos: FALLBACKS,
      getPhoto: (key: string) => FALLBACKS[key] ?? "",
      heroObjectPosition: "center",
      isLoading: false,
      isR2: false,
    };
  }
  return ctx;
}
