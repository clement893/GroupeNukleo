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

export function WeatherWidget() {
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
        className={loading ? 'weather-widget-loading' : undefined}
        style={{
          borderRadius: 24,
          padding: '1.1rem 1.2rem',
          background: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.7)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.04), 0 0 0 1px rgba(255,255,255,0.5) inset',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {/* Icône météo au-dessus de la température */}
        <div style={{ marginBottom: 2 }}>
          <Icon size={28} strokeWidth={1.5} color={ICON_COLOR} />
        </div>
        <div
          className={loading ? 'weather-placeholder' : undefined}
          style={{ fontFamily: 'var(--font-heading, sans-serif)', fontWeight: 900, fontSize: '2.2rem', lineHeight: 1, color: DARK }}
        >
          {tempDisplay} <span style={{ fontSize: '1rem', verticalAlign: 'super' }}>°C</span>
        </div>
        <div className={loading ? 'weather-placeholder' : undefined} style={{ fontSize: '0.7rem', color: '#6b7280', textAlign: 'center' }}>
          {locationDisplay}
        </div>
      </div>
    </>
  );
}
