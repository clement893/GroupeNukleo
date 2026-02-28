import { useState, useEffect, useCallback } from 'react';

const CACHE_KEY = 'weatherByIp';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 min
const FETCH_TIMEOUT_MS = 12000;
/** Délai minimum d'affichage du loading pour que l'animation soit visible */
const MIN_LOADING_MS = 800;

export interface WeatherByIpResult {
  temperature: number;
  weatherCode: number;
  city: string;
  region: string;
  country: string;
  locationLabel: string;
}

function getCached(): WeatherByIpResult | null {
  if (typeof sessionStorage === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw) as { data: WeatherByIpResult; ts: number };
    if (Date.now() - ts > CACHE_TTL_MS) return null;
    return data;
  } catch {
    return null;
  }
}

function setCached(data: WeatherByIpResult): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // ignore
  }
}

/**
 * Récupère la météo via l'API backend (/api/weather).
 * En prod, le serveur utilise l'IP client (X-Forwarded-For) pour la géoloc + Open-Meteo, donc pas de CORS/CSP.
 */
async function fetchWeatherFromApi(): Promise<WeatherByIpResult | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch('/api/weather', {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));
    if (!res.ok) return null;
    const j = await res.json();
    const temperature = typeof j.temperature === 'number' ? j.temperature : null;
    if (temperature === null) return null;
    return {
      temperature,
      weatherCode: typeof j.weatherCode === 'number' ? j.weatherCode : 0,
      city: String(j.city ?? ''),
      region: String(j.region ?? ''),
      country: String(j.country ?? ''),
      locationLabel: String(j.locationLabel ?? ([j.city, j.region].filter(Boolean).join(', ') || '')),
    };
  } catch {
    return null;
  }
}

export function useWeatherByIp(): {
  data: WeatherByIpResult | null;
  loading: boolean;
  error: boolean;
} {
  const [data, setData] = useState<WeatherByIpResult | null>(() => getCached());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchWeather = useCallback(async () => {
    const cached = getCached();
    if (cached) {
      setData(cached);
      setLoading(false);
      setError(false);
      return;
    }
    setLoading(true);
    setError(false);
    const startedAt = Date.now();
    const stopLoading = () => {
      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, MIN_LOADING_MS - elapsed);
      if (remaining > 0) setTimeout(() => setLoading(false), remaining);
      else setLoading(false);
    };
    try {
      const result = await fetchWeatherFromApi();
      if (result) {
        setData(result);
        setCached(result);
        setError(false);
      } else {
        setData(null);
        setError(true);
      }
    } catch {
      setData(null);
      setError(true);
    } finally {
      stopLoading();
    }
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return { data, loading, error };
}
