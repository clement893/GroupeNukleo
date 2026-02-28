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
const ICON_COLOR = '#9ca3af';

/** WMO weather code (Open-Meteo) → icône Lucide */
function getWeatherIcon(code: number): LucideIcon {
  if (code === 0) return Sun;
  if (code >= 1 && code <= 2) return CloudSun;
  if (code === 3) return Cloud;
  if (code >= 45 && code <= 48) return CloudFog;
  if (code >= 51 && code <= 57) return CloudDrizzle;
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return CloudRain;
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return Snowflake;
  if (code >= 95 && code <= 99) return CloudLightning;
  return Sun;
}

export function WeatherWidget({ className }: { className?: string }) {
  const { data, loading } = useWeatherByIp();
  const tempDisplay = loading ? '--' : String(data.temperature);
  const locationDisplay = loading ? '…' : data.locationLabel;
  const weatherCode = data.weatherCode ?? 0;
  const Icon = getWeatherIcon(weatherCode);

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
        aria-label={`Météo : ${loading ? 'chargement' : `${data.temperature} degrés, ${data.locationLabel}`}`}
        className={loading ? `weather-widget-loading ${className ?? ''}`.trim() : className}
        style={{
          borderRadius: 14,
          padding: 'clamp(0.9rem, 1.2vw, 1.35rem) clamp(0.9rem, 1.3vw, 1.5rem)',
          background: 'rgba(255,255,255,0.38)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.8)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.85)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(0.35rem, 0.5vw, 0.6rem)',
          fontFamily: "'Figtree', sans-serif",
        }}
      >
        {/* Icône météo au-dessus de la température */}
        <div style={{ marginBottom: 2 }}>
          <Icon size={28} strokeWidth={1.5} color={ICON_COLOR} />
        </div>
        <div
          className={loading ? 'weather-placeholder' : undefined}
          style={{ fontFamily: "'Figtree', sans-serif", fontWeight: 700, fontSize: 'clamp(1.75rem, 2.2vw, 2.75rem)', lineHeight: 1, color: DARK }}
        >
          {tempDisplay} <span style={{ fontSize: 'clamp(0.85rem, 1vw, 1.15rem)', verticalAlign: 'super' }}>°C</span>
        </div>
        <div className={loading ? 'weather-placeholder' : undefined} style={{ fontSize: 'clamp(0.7rem, 0.85vw, 0.95rem)', color: '#6b7280', textAlign: 'center' }}>
          {locationDisplay}
        </div>
      </div>
    </>
  );
}
