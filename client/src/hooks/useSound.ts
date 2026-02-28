import { useCallback } from 'react';

const STORAGE_KEY = 'nukleo-sound-config';
const SOUNDS_ENABLED_KEY = 'nukleo-sounds-enabled';

interface SoundConfig {
  hover: {
    frequencyStart: number;
    frequencyEnd: number;
    duration: number;
    volume: number;
    type: OscillatorType;
  };
  click: {
    frequencyStart: number;
    frequencyMid: number;
    frequencyEnd: number;
    duration: number;
    volume: number;
    type: OscillatorType;
  };
}

function getSoundConfig(): SoundConfig | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load sound config:', e);
  }
  return null;
}

function areSoundsEnabled(): boolean {
  const enabled = localStorage.getItem(SOUNDS_ENABLED_KEY);
  return enabled === 'true';
}

/**
 * Hook personnalisé pour les sons interactifs synthétiques modernes
 * Utilise Web Audio API pour générer des sons procéduraux (0 KB, 0ms latence)
 * Design sonore moderne et professionnel, inspiré des interfaces premium
 */
export function useSound() {
  /**
   * Son "Hover" - Son moderne et subtil
   * Utilise la configuration sauvegardée si disponible
   */
  const playHover = useCallback(() => {
    if (!areSoundsEnabled()) return;
    
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const config = getSoundConfig();
    const hoverConfig = config?.hover || {
      frequencyStart: 1200,
      frequencyEnd: 1500,
      duration: 0.08,
      volume: 0.03,
      type: 'sine' as OscillatorType,
    };

    // Si volume est 0, ne pas jouer le son
    if (hoverConfig.volume === 0 || hoverConfig.duration === 0) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    const now = ctx.currentTime;
    
    // Configuration oscillateur
    osc.type = hoverConfig.type;
    osc.frequency.setValueAtTime(hoverConfig.frequencyStart, now);
    osc.frequency.exponentialRampToValueAtTime(hoverConfig.frequencyEnd, now + hoverConfig.duration);
    
    // Filtre passe-haut pour rendre le son plus clair et moderne
    filter.type = 'highpass';
    filter.frequency.value = 800;
    filter.Q.value = 1;
    
    // Configuration gain
    gain.gain.setValueAtTime(hoverConfig.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + hoverConfig.duration);
    
    // Connexion graphe audio avec filtre
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    // Lecture
    osc.start();
    osc.stop(now + hoverConfig.duration);
  }, []);

  /**
   * Son "Click" - Confirmation moderne et professionnelle
   * Utilise la configuration sauvegardée si disponible
   */
  const playClick = useCallback(() => {
    if (!areSoundsEnabled()) return;
    
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const config = getSoundConfig();
    const clickConfig = config?.click || {
      frequencyStart: 800,
      frequencyMid: 1000,
      frequencyEnd: 600,
      duration: 0.12,
      volume: 0.06,
      type: 'sine' as OscillatorType,
    };

    // Si volume est 0, ne pas jouer le son
    if (clickConfig.volume === 0 || clickConfig.duration === 0) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    const now = ctx.currentTime;
    
    // Configuration oscillateur
    osc.type = clickConfig.type;
    osc.frequency.setValueAtTime(clickConfig.frequencyStart, now);
    osc.frequency.exponentialRampToValueAtTime(clickConfig.frequencyMid, now + clickConfig.duration * 0.33);
    osc.frequency.exponentialRampToValueAtTime(clickConfig.frequencyEnd, now + clickConfig.duration);
    
    // Filtre passe-haut pour clarté
    filter.type = 'highpass';
    filter.frequency.value = 500;
    filter.Q.value = 1;
    
    // Enveloppe ADSR moderne (Attack, Decay, Sustain, Release)
    const attackTime = clickConfig.duration * 0.08;
    const decayTime = clickConfig.duration * 0.33;
    const sustainTime = clickConfig.duration * 0.67;
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(clickConfig.volume, now + attackTime);
    gain.gain.exponentialRampToValueAtTime(clickConfig.volume * 0.67, now + decayTime);
    gain.gain.setValueAtTime(clickConfig.volume * 0.67, now + sustainTime);
    gain.gain.exponentialRampToValueAtTime(0.001, now + clickConfig.duration);
    
    // Connexion graphe audio avec filtre
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    // Lecture
    osc.start();
    osc.stop(now + clickConfig.duration);
  }, []);

  return { playHover, playClick };
}
