import { trpc } from '@/lib/trpc';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Eye, EyeOff, Globe, Save } from 'lucide-react';
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

// Liste de toutes les pages du site avec leurs chemins (alignée sur App.tsx + Footer)
const ALL_PAGES = [
  { path: '/', label: 'Accueil', description: 'Page d\'accueil principale' },
  { path: '/fr', label: 'Accueil (FR)', description: 'Page d\'accueil en français' },
  { path: '/projects', label: 'Projets', description: 'Page des projets' },
  { path: '/fr/projects', label: 'Projets (FR)', description: 'Page des projets en français' },
  { path: '/about', label: 'À propos', description: 'Page à propos' },
  { path: '/fr/about', label: 'À propos (FR)', description: 'Page à propos en français' },
  { path: '/approche', label: 'Approche', description: 'Page approche / expertise' },
  { path: '/fr/approche', label: 'Approche (FR)', description: 'Page approche en français' },
  { path: '/resources', label: 'Ressources', description: 'Page ressources' },
  { path: '/fr/resources', label: 'Ressources (FR)', description: 'Page ressources en français' },
  { path: '/contact', label: 'Contact', description: 'Page de contact' },
  { path: '/fr/contact', label: 'Contact (FR)', description: 'Page de contact en français' },
  { path: '/leo', label: 'LEO', description: 'Page LEO' },
  { path: '/fr/leo', label: 'LEO (FR)', description: 'Page LEO en français' },
  { path: '/services', label: 'Services', description: 'Page services' },
  { path: '/fr/services', label: 'Services (FR)', description: 'Page services en français' },
  { path: '/services/tech', label: 'Services Tech', description: 'Page Nukleo Tech' },
  { path: '/fr/services/tech', label: 'Services Tech (FR)', description: 'Page Nukleo Tech en français' },
  { path: '/services/consulting', label: 'Services Consulting', description: 'Page Nukleo Consulting' },
  { path: '/fr/services/consulting', label: 'Services Consulting (FR)', description: 'Page Nukleo Consulting en français' },
  { path: '/services/studio', label: 'Services Studio', description: 'Page Nukleo Studio' },
  { path: '/fr/services/studio', label: 'Services Studio (FR)', description: 'Page Nukleo Studio en français' },
  { path: '/services/agency', label: 'Services Agency', description: 'Page Nukleo Agency' },
  { path: '/fr/services/agency', label: 'Services Agency (FR)', description: 'Page Nukleo Agency en français' },
  { path: '/privacy-policy', label: 'Confidentialité', description: 'Page politique de confidentialité' },
  { path: '/fr/privacy-policy', label: 'Confidentialité (FR)', description: 'Page confidentialité en français' },
  { path: '/nukleo-time-privacy', label: 'Nukleo.TIME Confidentialité', description: 'Page confidentialité Nukleo.TIME' },
  { path: '/fr/nukleo-time-privacy', label: 'Nukleo.TIME Confidentialité (FR)', description: 'Page Nukleo.TIME confidentialité en français' },
  { path: '/terms-of-service', label: 'Conditions d\'utilisation', description: 'Page conditions d\'utilisation' },
  { path: '/fr/terms-of-service', label: 'Conditions (FR)', description: 'Page conditions en français' },
  { path: '/cookie-policy', label: 'Cookies', description: 'Page politique des cookies' },
  { path: '/fr/cookie-policy', label: 'Cookies (FR)', description: 'Page politique des cookies en français' },
  { path: '/faq', label: 'FAQ', description: 'Page FAQ' },
  { path: '/fr/faq', label: 'FAQ (FR)', description: 'Page FAQ en français' },
];

export default function AdminPageVisibility() {
  const { data: pagesVisibility, isLoading, error, refetch } = trpc.pageVisibility.getAll.useQuery(
    undefined,
    {
      retry: 2,
      retryDelay: 1000,
      refetchOnWindowFocus: false,
      staleTime: 30000, // Cache for 30 seconds
    }
  );
  const updateMutation = trpc.pageVisibility.updateVisibility.useMutation({
    onSuccess: () => {
      toast.success('Visibilité mise à jour avec succès');
      refetch();
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });
  const bulkUpdateMutation = trpc.pageVisibility.bulkUpdate.useMutation({
    onSuccess: () => {
      toast.success('Toutes les visibilités ont été enregistrées');
      refetch();
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  const [localVisibility, setLocalVisibility] = useState<Record<string, boolean>>({});
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize local state from server data
  useEffect(() => {
    if (pagesVisibility) {
      const visibilityMap: Record<string, boolean> = {};
      pagesVisibility.forEach((page) => {
        visibilityMap[page.path] = page.isVisible;
      });
      // Set default to true for pages not in DB
      ALL_PAGES.forEach((page) => {
        if (!(page.path in visibilityMap)) {
          visibilityMap[page.path] = true;
        }
      });
      setLocalVisibility(visibilityMap);
    } else if (!isLoading && !error) {
      // If no data but not loading and no error, initialize with defaults
      const visibilityMap: Record<string, boolean> = {};
      ALL_PAGES.forEach((page) => {
        visibilityMap[page.path] = true;
      });
      setLocalVisibility(visibilityMap);
    }
  }, [pagesVisibility, isLoading, error]);

  const saveAll = async () => {
    const updates = ALL_PAGES.map((page) => ({
      path: page.path,
      isVisible: localVisibility[page.path] ?? true,
      description: page.description,
    }));

    try {
      await bulkUpdateMutation.mutateAsync(updates);
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving visibility:', error);
    }
  };

  const savePage = async (path: string) => {
    const page = ALL_PAGES.find((p) => p.path === path);
    if (!page) return;

    try {
      await updateMutation.mutateAsync({
        path,
        isVisible: localVisibility[path] ?? true,
        description: page.description,
      });
    } catch (error) {
      console.error('Error saving page visibility:', error);
    }
  };

  // Show error state if query failed
  if (error) {
    return (
      <AdminLayout>
        <div className="min-h-[50vh] flex items-center justify-center p-8">
          <Card className="bg-white/5 backdrop-blur-md border-white/10 max-w-md">
            <CardHeader>
              <CardTitle className="text-red-400">Erreur de chargement</CardTitle>
              <CardDescription className="text-white/60">
                Impossible de charger les données de visibilité des pages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 mb-4">{error.message || 'Une erreur est survenue'}</p>
              <Button
                onClick={() => refetch()}
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                Réessayer
              </Button>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
            <p className="text-white/60">Chargement des pages...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const visibleCount = Object.values(localVisibility).filter((v) => v).length;
  const hiddenCount = Object.values(localVisibility).filter((v) => !v).length;

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <Globe className="w-8 h-8 text-cyan-400" />
                Gestion de la Visibilité des Pages
              </h1>
              <p className="text-white/60">
                Contrôlez quelles pages sont accessibles sur le site
              </p>
            </div>
            {hasChanges && (
              <Button
                onClick={saveAll}
                disabled={updateMutation.isPending || bulkUpdateMutation.isPending}
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {bulkUpdateMutation.isPending ? 'Enregistrement...' : 'Enregistrer tout'}
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Total</CardTitle>
                <CardDescription className="text-white/60">
                  {ALL_PAGES.length} pages
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Visibles
                </CardTitle>
                <CardDescription className="text-white/60">
                  {visibleCount} pages
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <EyeOff className="w-5 h-5" />
                  Cachées
                </CardTitle>
                <CardDescription className="text-white/60">
                  {hiddenCount} pages
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Pages List */}
          <div className="space-y-4">
            {ALL_PAGES.map((page) => {
              const isVisible = localVisibility[page.path] ?? true;
              return (
                <Card
                  key={page.path}
                  className={`bg-white/5 backdrop-blur-md border-white/10 transition-all ${
                    !isVisible ? 'opacity-60' : ''
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {isVisible ? (
                            <Eye className="w-5 h-5 text-green-400" />
                          ) : (
                            <EyeOff className="w-5 h-5 text-red-400" />
                          )}
                          <h3 className="text-lg font-semibold text-white">
                            {page.label}
                          </h3>
                          <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 text-xs font-mono">
                            {page.path}
                          </span>
                        </div>
                        <p className="text-white/60 text-sm ml-8">
                          {page.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Switch
                            id={`switch-${page.path}`}
                            checked={isVisible}
                            onCheckedChange={() => {
                              const newValue = !isVisible;
                              setLocalVisibility((prev) => ({ ...prev, [page.path]: newValue }));
                              setHasChanges(true);
                              updateMutation.mutate({
                                path: page.path,
                                isVisible: newValue,
                                description: page.description,
                              });
                            }}
                          />
                          <Label
                            htmlFor={`switch-${page.path}`}
                            className="text-white cursor-pointer"
                          >
                            {isVisible ? 'Visible' : 'Cachée'}
                          </Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </AdminLayout>
  );
}
