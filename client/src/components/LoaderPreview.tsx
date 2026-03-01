import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SafeHTML from "@/components/SafeHTML";
import { useLanguage } from "@/contexts/LanguageContext";

interface LoaderPreviewProps {
  cssCode: string;
  isOpen: boolean;
  onClose: () => void;
  loaderName?: string;
}

export default function LoaderPreview({
  cssCode,
  isOpen,
  onClose,
  loaderName,
}: LoaderPreviewProps) {
  const { t } = useLanguage();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsReady(false);
      const styleElement = document.getElementById("loader-preview-styles");
      if (styleElement) {
        styleElement.remove();
      }
      return;
    }

    // Extract CSS styles
    const styleMatch = cssCode.match(/<style>([\s\S]*?)<\/style>/);
    const cssStyles = styleMatch ? styleMatch[1] : "";

    // Extract HTML content (without style tags)
    const htmlContent = cssCode.replace(/<style>[\s\S]*?<\/style>/g, "").trim();

    // Inject CSS into document head
    if (cssStyles) {
      const existingStyle = document.getElementById("loader-preview-styles");
      if (existingStyle) {
        existingStyle.remove();
      }

      const styleElement = document.createElement("style");
      styleElement.id = "loader-preview-styles";
      // Add CSS to fix logo in center and prevent it from moving in preview
      styleElement.textContent = cssStyles + `
        /* Fix logo in center for preview - prevent movement */
        img[src*="Nukleo"], img[src*="nukleo"], img[src*="logo"], img[alt*="Nukleo"], img[alt*="nukleo"], img[alt*="Logo"],
        svg[viewBox*="1451"], svg[viewBox*="1781"], svg[class*="logo"], svg[id*="logo"],
        .logo, [class*="logo"], [id*="logo"], [class*="Logo"], [id*="Logo"],
        object[data*="nukleo"], object[data*="logo"],
        embed[src*="nukleo"], embed[src*="logo"] {
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          z-index: 10001 !important;
          pointer-events: none !important;
          will-change: auto !important;
          animation: none !important;
          transition: none !important;
          margin: 0 !important;
        }
      `;
      document.head.appendChild(styleElement);
    }

    // Wait for styles to be applied
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsReady(true);
      });
    });

    return () => {
      const styleElement = document.getElementById("loader-preview-styles");
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [cssCode, isOpen]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const htmlContent = cssCode.includes("<style>")
    ? cssCode.replace(/<style>[\s\S]*?<\/style>/g, "").trim()
    : cssCode;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
      style={{ cursor: "pointer" }}
    >
      <div
        className="relative w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {!isReady ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white">Chargement...</div>
          </div>
        ) : (
          <>
            {/* Logo blanc fixe au centre */}
            <div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10001] pointer-events-none"
              style={{
                width: '300px',
                height: 'auto',
              }}
            >
              <img 
                src="/Nukleo_blanc_RVB.svg" 
                alt="Nukleo Digital - AI Transformation Agency" 
                width="300"
                height="75"
                fetchPriority="high"
                loading="eager"
                className="w-full h-auto"
                style={{
                  opacity: 1,
                }}
              />
            </div>
            
            <SafeHTML
              html={htmlContent}
              tag="div"
              key={`preview-${isReady}`}
              className="absolute inset-0"
            />
          </>
        )}
        
        {/* Close button - Fixed position, always visible */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 z-[10002] text-white hover:bg-white/20 bg-black/70 backdrop-blur-sm border border-white/20 rounded-full w-12 h-12"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label={t('common.closePreview')}
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Loader name */}
        {loaderName && (
          <div className="absolute top-4 left-4 z-50 text-white bg-black/50 px-4 py-2 rounded">
            <p className="text-sm opacity-60">Prévisualisation</p>
            <p className="text-lg font-bold">{loaderName}</p>
          </div>
        )}

        {/* Close hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 text-white/60 text-sm bg-black/50 px-4 py-2 rounded">
          Cliquez n'importe où ou appuyez sur ESC pour fermer
        </div>
      </div>
    </div>
  );
}
