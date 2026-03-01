import { trpc } from '@/lib/trpc';
import AdminRoute from '@/components/AdminRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Save, BarChart3, Facebook, Linkedin, CheckCircle2, XCircle } from 'lucide-react';
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

// Configuration des providers analytics
const ANALYTICS_PROVIDERS = [
  {
    id: 'google-analytics',
    name: 'Google Analytics 4',
    icon: BarChart3,
    description: 'Suivi des visiteurs et conversions avec Google Analytics 4',
    trackingIdLabel: 'Measurement ID (G-XXXXXXXXXX)',
    trackingIdPlaceholder: 'G-XXXXXXXXXX',
    helpText: 'Trouvez votre Measurement ID dans Google Analytics > Admin > Data Streams',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'facebook-pixel',
    name: 'Facebook Pixel',
    icon: Facebook,
    description: 'Suivi des conversions et publicités Facebook',
    trackingIdLabel: 'Pixel ID',
    trackingIdPlaceholder: '123456789012345',
    helpText: 'Trouvez votre Pixel ID dans Facebook Events Manager',
    color: 'from-blue-600 to-blue-700',
  },
  {
    id: 'linkedin-insight',
    name: 'LinkedIn Insight Tag',
    icon: Linkedin,
    description: 'Suivi des conversions et publicités LinkedIn',
    trackingIdLabel: 'Partner ID',
    trackingIdPlaceholder: '123456',
    helpText: 'Trouvez votre Partner ID dans LinkedIn Campaign Manager',
    color: 'from-blue-700 to-blue-800',
  },
];

export default function AdminAnalytics() {
  const { data: analyticsConfigs, isLoading, refetch } = trpc.analytics.getAll.useQuery();
  const upsertMutation = trpc.analytics.upsert.useMutation({
    onSuccess: () => {
      toast.success('Configuration analytics mise à jour avec succès');
      refetch();
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  const [localConfigs, setLocalConfigs] = useState<Record<string, {
    isEnabled: boolean;
    trackingId: string;
  }>>({});

  // Initialize local state from server data
  useEffect(() => {
    if (analyticsConfigs && Array.isArray(analyticsConfigs)) {
      const configs: Record<string, { isEnabled: boolean; trackingId: string }> = {};
      ANALYTICS_PROVIDERS.forEach(provider => {
        const config = analyticsConfigs.find(c => c.provider === provider.id);
        configs[provider.id] = {
          isEnabled: config?.isEnabled || false,
          trackingId: config?.trackingId || '',
        };
      });
      setLocalConfigs(configs);
    }
  }, [analyticsConfigs]);

  const handleToggle = (providerId: string) => {
    setLocalConfigs(prev => ({
      ...prev,
      [providerId]: {
        ...prev[providerId],
        isEnabled: !prev[providerId]?.isEnabled,
      },
    }));
  };

  const handleTrackingIdChange = (providerId: string, value: string) => {
    setLocalConfigs(prev => ({
      ...prev,
      [providerId]: {
        ...prev[providerId],
        trackingId: value,
      },
    }));
  };

  const handleSave = async (providerId: string) => {
    const config = localConfigs[providerId];
    if (!config) return;

    // Validate tracking ID if enabled
    if (config.isEnabled && !config.trackingId.trim()) {
      toast.error('Veuillez entrer un ID de suivi pour activer ce provider');
      return;
    }

    await upsertMutation.mutateAsync({
      provider: providerId as 'google-analytics' | 'facebook-pixel' | 'linkedin-insight',
      isEnabled: config.isEnabled,
      trackingId: config.trackingId.trim() || undefined,
    });
  };

  const handleSaveAll = async () => {
    for (const provider of ANALYTICS_PROVIDERS) {
      const config = localConfigs[provider.id];
      if (config) {
        if (config.isEnabled && !config.trackingId.trim()) {
          toast.error(`Veuillez entrer un ID de suivi pour ${provider.name}`);
          return;
        }
        await upsertMutation.mutateAsync({
          provider: provider.id as 'google-analytics' | 'facebook-pixel' | 'linkedin-insight',
          isEnabled: config.isEnabled,
          trackingId: config.trackingId.trim() || undefined,
        });
      }
    }
    toast.success('Toutes les configurations ont été sauvegardées');
  };

  if (isLoading) {
    return (
      <AdminRoute>
        <AdminLayout>
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-white text-lg">
              <Loader2 className="w-5 h-5 animate-spin" />
              Chargement des configurations analytics...
            </div>
          </div>
        </AdminLayout>
      </AdminRoute>
    );
  }

  return (
    <AdminRoute>
      <AdminLayout>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Gestion des Analytics et Tracking</h1>
            <p className="text-gray-400">Configurez les outils de suivi et analytics pour votre site</p>
          </div>

          <div className="space-y-6">
            {ANALYTICS_PROVIDERS.map((provider) => {
              const Icon = provider.icon;
              const config = localConfigs[provider.id];
              const isActive = config?.isEnabled && config?.trackingId;

              return (
                <Card key={provider.id} className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${provider.color}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-white flex items-center gap-2">
                            {provider.name}
                            {isActive && (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            )}
                          </CardTitle>
                          <CardDescription className="text-slate-400 mt-1">
                            {provider.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Switch
                            id={`enable-${provider.id}`}
                            checked={config?.isEnabled || false}
                            onCheckedChange={() => handleToggle(provider.id)}
                          />
                          <Label htmlFor={`enable-${provider.id}`} className="text-white cursor-pointer">
                            {config?.isEnabled ? 'Activé' : 'Désactivé'}
                          </Label>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor={`tracking-${provider.id}`} className="text-white">
                          {provider.trackingIdLabel}
                        </Label>
                        <Input
                          id={`tracking-${provider.id}`}
                          value={config?.trackingId || ''}
                          onChange={(e) => handleTrackingIdChange(provider.id, e.target.value)}
                          placeholder={provider.trackingIdPlaceholder}
                          className="mt-2 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                          disabled={!config?.isEnabled}
                        />
                        <p className="text-xs text-slate-400 mt-1">
                          {provider.helpText}
                        </p>
                      </div>

                      {config?.isEnabled && !config?.trackingId && (
                        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                          <p className="text-sm text-yellow-400">
                            ⚠️ Veuillez entrer un ID de suivi pour activer ce provider
                          </p>
                        </div>
                      )}

                      <div className="flex justify-end">
                        <Button
                          onClick={() => handleSave(provider.id)}
                          disabled={upsertMutation.isPending}
                          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                        >
                          {upsertMutation.isPending ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Sauvegarde...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Sauvegarder
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleSaveAll}
              disabled={upsertMutation.isPending}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              size="lg"
            >
              {upsertMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sauvegarde...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder toutes les configurations
                </>
              )}
            </Button>
          </div>

          <Card className="mt-8 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Informations importantes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Les scripts analytics sont chargés automatiquement sur toutes les pages du site</li>
                <li>• Les conversions sont suivies automatiquement pour les formulaires de contact et de projet</li>
                <li>• Assurez-vous de respecter les politiques de confidentialité et d'obtenir le consentement des utilisateurs</li>
                <li>• Les modifications prennent effet immédiatement après la sauvegarde</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </AdminRoute>
  );
}
