import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudDrizzle,
  Snowflake,
  CloudLightning,
  CloudFog,
  type LucideIcon,
} from 'lucide-react';
import { useWeatherByIp } from '@/hooks/useWeatherByIp';

const DARK = '#0A0A0A';

/** WMO weather code (Open-Meteo) → icône Lucide + couleur type site météo */
function getWeatherIconAndColor(code: number): { Icon: LucideIcon; color: string } {
  if (code === 0) return { Icon: Sun, color: '#f59e0b' }; // soleil jaune/orange
  if (code >= 1 && code <= 2) return { Icon: CloudSun, color: '#94a3b8' }; // nuageux gris
  if (code === 3) return { Icon: Cloud, color: '#64748b' }; // nuages gris
  if (code >= 45 && code <= 48) return { Icon: CloudFog, color: '#94a3b8' }; // brouillard
  if (code >= 51 && code <= 57) return { Icon: CloudDrizzle, color: '#0ea5e9' }; // bruine bleu
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return { Icon: CloudRain, color: '#0284c7' }; // pluie bleu
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return { Icon: Snowflake, color: '#38bdf8' }; // neige bleu clair
  if (code >= 95 && code <= 99) return { Icon: CloudLightning, color: '#6366f1' }; // orage violet
  return { Icon: Sun, color: '#f59e0b' };
}

export function WeatherWidget({ className }: { className?: string }) {
  const { data, loading, error } = useWeatherByIp();
  const tempDisplay = loading ? '--' : (data ? String(data.temperature) : '--');
  const locationDisplay = loading ? '…' : (data ? data.locationLabel : (error ? 'Indisponible' : '…'));
  const weatherCode = data?.weatherCode ?? 0;
  const { Icon, color: iconColor } = getWeatherIconAndColor(weatherCode);

  return (
    <>
      <style>{`
        @keyframes weather-widget-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.65; }
        }
        @keyframes weather-placeholder-shimmer {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }
        .weather-widget-loading {
          animation: weather-widget-pulse 1.4s ease-in-out infinite;
        }
        .weather-widget-loading .weather-placeholder {
          animation: weather-placeholder-shimmer 1s ease-in-out infinite;
        }
      `}</style>
      <div
        role="region"
        aria-label={`Météo : ${loading ? 'chargement' : data ? `${data.temperature} degrés, ${data.locationLabel}` : 'indisponible'}`}
        className={loading ? `weather-widget-loading ${className ?? ''}`.trim() : className}
        style={{
          borderRadius: 14,
          padding: 'clamp(1.5rem, 2.2vw, 2.5rem) clamp(1.5rem, 2.4vw, 2.75rem)',
          background: 'rgba(255,255,255,0.38)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.8)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.85)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(0.35rem, 0.5vw, 0.6rem)',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          height: '100%',
        }}
      >
        {/* Icône au-dessus, température centrée en dessous */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(0.35rem, 0.5vw, 0.65rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon size={52} strokeWidth={1.5} color={iconColor} />
          </div>
          <div
            className={loading ? 'weather-placeholder' : undefined}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 'clamp(3.5rem, 4.4vw, 5.5rem)', lineHeight: 1, color: DARK, textAlign: 'center' }}
          >
            {tempDisplay} <span style={{ fontSize: 'clamp(1.7rem, 2vw, 2.3rem)', verticalAlign: 'super' }}>°C</span>
          </div>
        </div>
        <div className={loading ? 'weather-placeholder' : undefined} style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.85rem)', color: '#6b7280', textAlign: 'center' }}>
          {locationDisplay}
        </div>
      </div>
    </>
  );
}
