import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Play, Save, RotateCcw } from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { cn } from '@/lib/utils';

export type SoundType = 'hover' | 'click';

export interface SoundConfig {
  name: string;
  description: string;
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

export interface SoundLibrary {
  id: string;
  name: string;
  description: string;
  icon?: string;
  presets: SoundConfig[];
}

const SOUND_LIBRARIES: SoundLibrary[] = [
  {
    id: 'professional',
    name: 'Professionnel',
    description: 'Sons subtils et élégants pour un environnement professionnel',
    presets: [
      {
        name: 'Moderne (Par défaut)',
        description: 'Sons subtils et professionnels, parfaits pour une interface moderne',
        hover: {
          frequencyStart: 1200,
          frequencyEnd: 1500,
          duration: 0.08,
          volume: 0.03,
          type: 'sine',
        },
        click: {
          frequencyStart: 800,
          frequencyMid: 1000,
          frequencyEnd: 600,
          duration: 0.12,
          volume: 0.06,
          type: 'sine',
        },
      },
      {
        name: 'Classique',
        description: 'Sons plus traditionnels et rassurants',
        hover: {
          frequencyStart: 800,
          frequencyEnd: 1000,
          duration: 0.1,
          volume: 0.05,
          type: 'sine',
        },
        click: {
          frequencyStart: 600,
          frequencyMid: 800,
          frequencyEnd: 500,
          duration: 0.15,
          volume: 0.08,
          type: 'sine',
        },
      },
      {
        name: 'Doux',
        description: 'Sons très doux et discrets',
        hover: {
          frequencyStart: 1000,
          frequencyEnd: 1200,
          duration: 0.12,
          volume: 0.02,
          type: 'sine',
        },
        click: {
          frequencyStart: 700,
          frequencyMid: 850,
          frequencyEnd: 600,
          duration: 0.18,
          volume: 0.04,
          type: 'sine',
        },
      },
    ],
  },
  {
    id: 'creative',
    name: 'Créatif',
    description: 'Sons énergiques et expressifs pour des interfaces créatives',
    presets: [
      {
        name: 'Électronique',
        description: 'Sons plus électroniques et futuristes',
        hover: {
          frequencyStart: 1500,
          frequencyEnd: 2000,
          duration: 0.06,
          volume: 0.04,
          type: 'square',
        },
        click: {
          frequencyStart: 1000,
          frequencyMid: 1500,
          frequencyEnd: 800,
          duration: 0.1,
          volume: 0.07,
          type: 'square',
        },
      },
      {
        name: 'Dynamique',
        description: 'Sons plus énergiques et réactifs',
        hover: {
          frequencyStart: 1400,
          frequencyEnd: 1800,
          duration: 0.05,
          volume: 0.05,
          type: 'sine',
        },
        click: {
          frequencyStart: 900,
          frequencyMid: 1200,
          frequencyEnd: 700,
          duration: 0.08,
          volume: 0.09,
          type: 'sine',
        },
      },
      {
        name: 'Vibrant',
        description: 'Sons riches et expressifs avec beaucoup de caractère',
        hover: {
          frequencyStart: 1300,
          frequencyEnd: 1700,
          duration: 0.07,
          volume: 0.06,
          type: 'sawtooth',
        },
        click: {
          frequencyStart: 850,
          frequencyMid: 1100,
          frequencyEnd: 750,
          duration: 0.11,
          volume: 0.1,
          type: 'sawtooth',
        },
      },
    ],
  },
  {
    id: 'minimalist',
    name: 'Minimaliste',
    description: 'Sons discrets et épurés pour une expérience zen',
    presets: [
      {
        name: 'Ultra Doux',
        description: 'Sons presque imperceptibles, pour une expérience très subtile',
        hover: {
          frequencyStart: 1100,
          frequencyEnd: 1300,
          duration: 0.15,
          volume: 0.015,
          type: 'sine',
        },
        click: {
          frequencyStart: 750,
          frequencyMid: 900,
          frequencyEnd: 650,
          duration: 0.2,
          volume: 0.03,
          type: 'sine',
        },
      },
      {
        name: 'Silencieux',
        description: 'Désactive tous les sons',
        hover: {
          frequencyStart: 0,
          frequencyEnd: 0,
          duration: 0,
          volume: 0,
          type: 'sine',
        },
        click: {
          frequencyStart: 0,
          frequencyMid: 0,
          frequencyEnd: 0,
          duration: 0,
          volume: 0,
          type: 'sine',
        },
      },
      {
        name: 'Naturel',
        description: 'Sons organiques et apaisants',
        hover: {
          frequencyStart: 900,
          frequencyEnd: 1100,
          duration: 0.13,
          volume: 0.025,
          type: 'sine',
        },
        click: {
          frequencyStart: 650,
          frequencyMid: 800,
          frequencyEnd: 550,
          duration: 0.16,
          volume: 0.045,
          type: 'sine',
        },
      },
    ],
  },
  {
    id: 'gaming',
    name: 'Gaming',
    description: 'Sons réactifs et satisfaisants pour une expérience immersive',
    presets: [
      {
        name: 'Arcade',
        description: 'Sons rétro et nostalgiques style arcade',
        hover: {
          frequencyStart: 1600,
          frequencyEnd: 1900,
          duration: 0.04,
          volume: 0.06,
          type: 'square',
        },
        click: {
          frequencyStart: 1100,
          frequencyMid: 1400,
          frequencyEnd: 900,
          duration: 0.07,
          volume: 0.11,
          type: 'square',
        },
      },
      {
        name: 'Sci-Fi',
        description: 'Sons futuristes et high-tech',
        hover: {
          frequencyStart: 1800,
          frequencyEnd: 2200,
          duration: 0.05,
          volume: 0.05,
          type: 'sawtooth',
        },
        click: {
          frequencyStart: 1200,
          frequencyMid: 1600,
          frequencyEnd: 1000,
          duration: 0.09,
          volume: 0.09,
          type: 'sawtooth',
        },
      },
      {
        name: 'Impact',
        description: 'Sons puissants et percutants',
        hover: {
          frequencyStart: 1400,
          frequencyEnd: 2000,
          duration: 0.03,
          volume: 0.07,
          type: 'sine',
        },
        click: {
          frequencyStart: 950,
          frequencyMid: 1300,
          frequencyEnd: 800,
          duration: 0.06,
          volume: 0.12,
          type: 'sine',
        },
      },
    ],
  },
];

const STORAGE_KEY = 'nukleo-sound-config';
const STORAGE_LIBRARY_KEY = 'nukleo-sound-library';

export default function AdminSounds() {
  const { playHover, playClick } = useSound();
  const [selectedLibrary, setSelectedLibrary] = useState<string>(SOUND_LIBRARIES[0].id);
  const [selectedPreset, setSelectedPreset] = useState<SoundConfig | null>(null);
  const [soundsEnabled, setSoundsEnabled] = useState(true);

  useEffect(() => {
    // Load saved library from localStorage
    const savedLibrary = localStorage.getItem(STORAGE_LIBRARY_KEY);
    if (savedLibrary && SOUND_LIBRARIES.find(lib => lib.id === savedLibrary)) {
      setSelectedLibrary(savedLibrary);
    }

    // Load saved config from localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const config = JSON.parse(saved);
        setSelectedPreset(config);
      } catch (e) {
        console.error('Failed to load sound config:', e);
      }
    } else {
      // Default to first preset of first library
      const firstLibrary = SOUND_LIBRARIES[0];
      setSelectedPreset(firstLibrary.presets[0]);
    }

    // Load sounds enabled state
    const enabled = localStorage.getItem('nukleo-sounds-enabled');
    if (enabled !== null) {
      setSoundsEnabled(enabled === 'true');
    }
  }, []);

  const currentLibrary = SOUND_LIBRARIES.find(lib => lib.id === selectedLibrary) || SOUND_LIBRARIES[0];

  const handleSelectPreset = (preset: SoundConfig) => {
    setSelectedPreset(preset);
  };

  const handleSave = () => {
    if (selectedPreset) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedPreset));
      localStorage.setItem(STORAGE_LIBRARY_KEY, selectedLibrary);
      localStorage.setItem('nukleo-sounds-enabled', String(soundsEnabled));
      alert('Configuration des sons sauvegardée ! La page sera rechargée pour appliquer les changements.');
      window.location.reload();
    }
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_LIBRARY_KEY);
    localStorage.setItem('nukleo-sounds-enabled', 'true');
    setSelectedLibrary(SOUND_LIBRARIES[0].id);
    setSelectedPreset(SOUND_LIBRARIES[0].presets[0]);
    setSoundsEnabled(true);
    alert('Configuration réinitialisée ! La page sera rechargée.');
    window.location.reload();
  };

  const handleTestSound = (type: SoundType, preset: SoundConfig) => {
    if (!soundsEnabled) return;
    
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    const now = ctx.currentTime;
    
    if (type === 'hover') {
      const config = preset.hover;
      if (config.volume === 0 || config.duration === 0) return;
      
      osc.type = config.type;
      osc.frequency.setValueAtTime(config.frequencyStart, now);
      osc.frequency.exponentialRampToValueAtTime(config.frequencyEnd, now + config.duration);
      
      filter.type = 'highpass';
      filter.frequency.value = 800;
      filter.Q.value = 1;
      
      gain.gain.setValueAtTime(config.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + config.duration);
    } else {
      const config = preset.click;
      if (config.volume === 0 || config.duration === 0) return;
      
      osc.type = config.type;
      osc.frequency.setValueAtTime(config.frequencyStart, now);
      osc.frequency.exponentialRampToValueAtTime(config.frequencyMid, now + config.duration * 0.33);
      osc.frequency.exponentialRampToValueAtTime(config.frequencyEnd, now + config.duration);
      
      filter.type = 'highpass';
      filter.frequency.value = 500;
      filter.Q.value = 1;
      
      const attackTime = config.duration * 0.08;
      const decayTime = config.duration * 0.33;
      const sustainTime = config.duration * 0.67;
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(config.volume, now + attackTime);
      gain.gain.exponentialRampToValueAtTime(config.volume * 0.67, now + decayTime);
      gain.gain.setValueAtTime(config.volume * 0.67, now + sustainTime);
      gain.gain.exponentialRampToValueAtTime(0.001, now + config.duration);
    }
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(now + (type === 'hover' ? preset.hover.duration : preset.click.duration));
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Gestion des Sons
          </h1>
          <p className="text-gray-400">
            Personnalisez les sons interactifs de l'interface
          </p>
        </div>

        {/* Enable/Disable Toggle */}
        <Card className="mb-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              {soundsEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              Activer/Désactiver les sons
            </CardTitle>
            <CardDescription className="text-gray-400">
              Activez ou désactivez tous les sons interactifs du site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Button
                variant={soundsEnabled ? 'default' : 'outline'}
                onClick={() => setSoundsEnabled(true)}
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Activés
              </Button>
              <Button
                variant={!soundsEnabled ? 'default' : 'outline'}
                onClick={() => setSoundsEnabled(false)}
              >
                <VolumeX className="w-4 h-4 mr-2" />
                Désactivés
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sound Libraries Tabs */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Bibliothèques de sons</h2>
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-border pb-4">
            {SOUND_LIBRARIES.map((library) => (
              <button
                key={library.id}
                onClick={() => setSelectedLibrary(library.id)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all",
                  selectedLibrary === library.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {library.name}
              </button>
            ))}
          </div>

          {/* Library Description */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{currentLibrary.name}</CardTitle>
              <CardDescription className="text-gray-400">{currentLibrary.description}</CardDescription>
            </CardHeader>
          </Card>

          {/* Presets for Selected Library */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Variantes disponibles</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentLibrary.presets.map((preset, index) => (
                <Card
                  key={index}
                  className={cn(
                    "cursor-pointer transition-all bg-white/5 border-white/10",
                    selectedPreset?.name === preset.name
                      ? 'ring-2 ring-white/50 shadow-lg'
                      : 'hover:bg-white/10'
                  )}
                  onClick={() => handleSelectPreset(preset)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-white">
                      {preset.name}
                      {selectedPreset?.name === preset.name && (
                        <div className="w-3 h-3 bg-[#523DCB] rounded-full" />
                      )}
                    </CardTitle>
                    <CardDescription className="text-gray-400">{preset.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTestSound('hover', preset);
                        }}
                        disabled={!soundsEnabled}
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Hover
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTestSound('click', preset);
                        }}
                        disabled={!soundsEnabled}
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Click
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button onClick={handleSave} size="lg" className="gap-2">
            <Save className="w-5 h-5" />
            Sauvegarder la configuration
          </Button>
          <Button onClick={handleReset} variant="outline" size="lg" className="gap-2">
            <RotateCcw className="w-5 h-5" />
            Réinitialiser
          </Button>
        </div>

        {/* Info */}
        <Card className="mt-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Note</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400">
              Les sons sont générés en temps réel avec Web Audio API. Les changements nécessitent un rechargement de la page pour être appliqués à l'ensemble du site.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
