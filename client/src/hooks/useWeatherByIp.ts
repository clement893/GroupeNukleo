import { useState, useEffect, useCallback } from 'react';

const CACHE_KEY = 'weatherByIp';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 min
const FETCH_TIMEOUT_MS = 8000;
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

const FALLBACK: WeatherByIpResult = {
  temperature: 24,
  weatherCode: 0,
  city: 'Montréal',
  region: 'Québec',
  country: 'Canada',
  locationLabel: 'Montréal, Québec',
};

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

const FETCH_OPTIONS: RequestInit = {
  headers: { Accept: 'application/json' },
  // Éviter blocage par certains fournisseurs geo (rate limit / bot)
  mode: 'cors',
};

function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  const { signal: _s, ...rest } = options;
  return fetch(url, { ...FETCH_OPTIONS, ...rest, signal: controller.signal }).finally(() =>
    clearTimeout(timeout)
  );
}

/** ipapi.co: HTTPS, pas de clé. Peut être rate-limited. */
async function getGeoFromIpApiCo(): Promise<{ city: string; region: string; country: string; lat: number; lon: number } | null> {
  try {
    const res = await fetchWithTimeout('https://ipapi.co/json/', {
      headers: { ...(FETCH_OPTIONS.headers as Record<string, string>), 'User-Agent': 'Mozilla/5.0 (compatible; Nukleo/1.0)' },
    });
    if (!res.ok) return null;
    const j = await res.json();
    const city = j.city ?? '';
    const region = j.region ?? j.region_code ?? '';
    const country = j.country_name ?? j.country ?? '';
    const lat = Number(j.latitude);
    const lon = Number(j.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
    return { city, region, country, lat, lon };
  } catch {
    return null;
  }
}

/** ip-api.com: HTTP, gratuit. Fonctionne en local (http). En prod HTTPS = mixed content, donc utilisé en secours. */
async function getGeoFromIpApi(): Promise<{ city: string; region: string; country: string; lat: number; lon: number } | null> {
  try {
    const res = await fetchWithTimeout('http://ip-api.com/json/?fields=city,regionName,country,lat,lon');
    if (!res.ok) return null;
    const j = await res.json();
    if (j.status === 'fail') return null;
    const city = j.city ?? '';
    const region = j.regionName ?? '';
    const country = j.country ?? '';
    const lat = Number(j.lat);
    const lon = Number(j.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
    return { city, region, country, lat, lon };
  } catch {
    return null;
  }
}

async function getGeoFromIp(): Promise<{ city: string; region: string; country: string; lat: number; lon: number } | null> {
  const geo = await getGeoFromIpApiCo();
  if (geo) return geo;
  return getGeoFromIpApi();
}

/** Open-Meteo: current temperature + weather_code (WMO) */
async function getWeather(
  lat: number,
  lon: number
): Promise<{ temp: number; weatherCode: number } | null> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) return null;
  const j = await res.json();
  const temp = j?.current?.temperature_2m;
  const code = j?.current?.weather_code;
  const temperature = typeof temp === 'number' ? temp : null;
  const weatherCode = typeof code === 'number' ? code : 0;
  if (temperature === null) return null;
  return { temp: temperature, weatherCode };
}

function buildLocationLabel(city: string, region: string, country: string): string {
  const parts = [city, region, country].filter(Boolean);
  if (parts.length === 0) return FALLBACK.locationLabel;
  if (parts.length === 1) return parts[0];
  return [parts[0], parts[1]].join(', ');
}

export function useWeatherByIp(): {
  data: WeatherByIpResult;
  loading: boolean;
  error: boolean;
} {
  const [data, setData] = useState<WeatherByIpResult>(() => getCached() ?? FALLBACK);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchWeather = useCallback(async () => {
    const cached = getCached();
    if (cached) {
      setData({ ...FALLBACK, ...cached });
      setLoading(false);
      setError(false);
      return;
    }
    setLoading(true);
    setError(false);
    const startedAt = Date.now();
    try {
      const geo = await getGeoFromIp();
      if (!geo) {
        setData(FALLBACK);
        setError(true);
        return;
      }
      const weather = await getWeather(geo.lat, geo.lon);
      const temperature = weather ? Math.round(weather.temp) : FALLBACK.temperature;
      const weatherCode = weather?.weatherCode ?? FALLBACK.weatherCode;
      const locationLabel = buildLocationLabel(geo.city, geo.region, geo.country);
      const result: WeatherByIpResult = {
        temperature,
        weatherCode,
        city: geo.city || FALLBACK.city,
        region: geo.region || FALLBACK.region,
        country: geo.country || FALLBACK.country,
        locationLabel: locationLabel || FALLBACK.locationLabel,
      };
      setData(result);
      setCached(result);
    } catch {
      setData(FALLBACK);
      setError(true);
    } finally {
      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, MIN_LOADING_MS - elapsed);
      if (remaining > 0) {
        setTimeout(() => setLoading(false), remaining);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return { data, loading, error };
}
