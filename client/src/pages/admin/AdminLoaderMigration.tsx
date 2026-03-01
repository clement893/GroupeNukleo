import { trpc } from '@/lib/trpc';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Database, CheckCircle2, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const CHECK_TIMEOUT_MS = 8000;

export default function AdminLoaderMigration() {
  const [isRunning, setIsRunning] = useState(false);
  const [migrationResult, setMigrationResult] = useState<{ success: boolean; message: string } | null>(null);
  const [checkTimedOut, setCheckTimedOut] = useState(false);

  // Vérifier l'état des loaders (retry: false pour éviter chargement infini si 403 ou erreur)
  const { data: checkResult, isLoading: isChecking, isError: isCheckError, refetch: refetchCheck } = trpc.loaders.checkAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 60_000,
  });

  // Si la vérification prend trop de temps, débloquer la page
  useEffect(() => {
    if (!isChecking) {
      setCheckTimedOut(false);
      return;
    }
    const t = setTimeout(() => setCheckTimedOut(true), CHECK_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [isChecking]);

  // Mutation pour exécuter la migration
  const migrateMutation = trpc.loaders.migrateAll.useMutation({
    onSuccess: () => {
      setMigrationResult({
        success: true,
        message: 'Migration terminée avec succès! Tous les loaders ont été sanitaires.',
      });
      setIsRunning(false);
      // Re-vérifier l'état après migration
      setTimeout(() => {
        refetchCheck();
      }, 1000);
    },
    onError: (error) => {
      setMigrationResult({
        success: false,
        message: error.message || 'Erreur lors de la migration',
      });
      setIsRunning(false);
    },
  });

  const handleRunMigration = () => {
    if (!checkResult || checkResult.needsMigration === 0) {
      return;
    }

    // Confirmation
    const confirmed = window.confirm(
      `Vous êtes sur le point de migrer ${checkResult.needsMigration} loader(s) en PRODUCTION.\n\n` +
      'Cette action va modifier la base de données.\n\n' +
      'Êtes-vous sûr de vouloir continuer?'
    );

    if (!confirmed) {
      return;
    }

    setIsRunning(true);
    setMigrationResult(null);
    migrateMutation.mutate();
  };

  return (
    <AdminLayout>
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Database className="w-8 h-8 text-cyan-400" />
              Migration des Loaders HTML
            </h1>
            <p className="text-white/60">
              Sanitiser tous les loaders pour corriger les problèmes d'accessibilité et de SEO
            </p>
          </div>

          {/* État actuel des loaders */}
          <Card className="bg-white/5 backdrop-blur-md border-white/10 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>État des Loaders</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => refetchCheck()}
                  disabled={isChecking}
                  className="text-white/60 hover:text-white"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
                  Actualiser
                </Button>
              </CardTitle>
              <CardDescription className="text-white/60">
                Vérification de l'état actuel des loaders dans la base de données
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isChecking && !checkTimedOut ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 text-cyan-400 animate-spin mr-3" />
                  <span className="text-white">Vérification en cours...</span>
                </div>
              ) : checkTimedOut || isCheckError ? (
                <div className="py-6 text-center space-y-3">
                  <p className="text-white/80">
                    {checkTimedOut
                      ? "La vérification a pris trop de temps. Vérifiez votre connexion ou réessayez."
                      : "Impossible de charger l'état des loaders. Vérifiez votre connexion ou réessayez."}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCheckTimedOut(false);
                      refetchCheck();
                    }}
                    className="text-white border-white/30 hover:bg-white/10"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Réessayer
                  </Button>
                </div>
              ) : checkResult ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/5 p-4 rounded-lg">
                      <div className="text-white/60 text-sm mb-1">Total</div>
                      <div className="text-2xl font-bold text-white">{checkResult.total}</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <div className="text-white/60 text-sm mb-1">Valides</div>
                      <div className="text-2xl font-bold text-green-400">{checkResult.summary.valid}</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <div className="text-white/60 text-sm mb-1">À migrer</div>
                      <div className={`text-2xl font-bold ${checkResult.needsMigration > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {checkResult.needsMigration}
                      </div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <div className="text-white/60 text-sm mb-1">Erreurs</div>
                      <div className={`text-2xl font-bold ${checkResult.summary.hasErrors > 0 ? 'text-red-400' : 'text-white'}`}>
                        {checkResult.summary.hasErrors}
                      </div>
                    </div>
                  </div>

                  {checkResult.needsMigration > 0 && (
                    <Alert className="bg-yellow-500/20 border-yellow-500/50">
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      <AlertTitle className="text-yellow-400">Migration nécessaire</AlertTitle>
                      <AlertDescription className="text-white/80">
                        {checkResult.needsMigration} loader(s) nécessitent une migration pour corriger les problèmes d'accessibilité et de SEO.
                      </AlertDescription>
                    </Alert>
                  )}

                  {checkResult.needsMigration === 0 && (
                    <Alert className="bg-green-500/20 border-green-500/50">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      <AlertTitle className="text-green-400">Tous les loaders sont valides</AlertTitle>
                      <AlertDescription className="text-white/80">
                        Aucune migration n'est nécessaire. Tous les loaders sont conformes aux standards.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Détails des loaders avec problèmes */}
                  {checkResult?.results && Array.isArray(checkResult.results) && checkResult.results.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-white font-semibold mb-2">Détails des loaders :</h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {checkResult.results.map((loader: any) => {
                          const errors = Array.isArray(loader.errors) ? loader.errors : [];
                          const warnings = Array.isArray(loader.warnings) ? loader.warnings : [];
                          const hasIssues = !loader.isValid || errors.length > 0 || warnings.length > 0;
                          if (!hasIssues) return null;

                          return (
                            <div key={loader.id} className="bg-white/5 p-3 rounded-lg">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="text-white font-medium">{loader.name}</div>
                                  {errors.length > 0 && (
                                    <div className="text-red-400 text-sm mt-1">
                                      {errors.map((error: string, idx: number) => (
                                        <div key={idx}>• {error}</div>
                                      ))}
                                    </div>
                                  )}
                                  {warnings.length > 0 && (
                                    <div className="text-yellow-400 text-sm mt-1">
                                      {warnings.map((warning: string, idx: number) => (
                                        <div key={idx}>⚠ {warning}</div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <div className={`px-2 py-1 rounded text-xs ${loader.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                  {loader.isActive ? 'Actif' : 'Inactif'}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-white/60">Impossible de charger l'état des loaders</div>
              )}
            </CardContent>
          </Card>

          {/* Migration */}
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Exécuter la Migration</CardTitle>
              <CardDescription className="text-white/60">
                Cette migration va sanitiser tous les loaders pour corriger :
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Les multiples balises &lt;h1&gt; (converties en &lt;h2&gt;)</li>
                  <li>Les images sans attributs alt</li>
                  <li>Les problèmes de sécurité XSS</li>
                </ul>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {checkResult && checkResult.needsMigration > 0 && !isRunning && !migrationResult && (
                <Button
                  onClick={handleRunMigration}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white w-full"
                  size="lg"
                  disabled={isRunning}
                >
                  <Database className="w-5 h-5 mr-2" />
                  Migrer {checkResult.needsMigration} Loader(s)
                </Button>
              )}

              {isRunning && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mr-3" />
                  <span className="text-white">Exécution de la migration...</span>
                </div>
              )}

              {migrationResult && (
                <Alert className={migrationResult.success ? 'bg-green-500/20 border-green-500/50' : 'bg-red-500/20 border-red-500/50'}>
                  {migrationResult.success ? (
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400" />
                  )}
                  <AlertTitle className={migrationResult.success ? 'text-green-400' : 'text-red-400'}>
                    {migrationResult.success ? 'Migration réussie!' : 'Erreur lors de la migration'}
                  </AlertTitle>
                  <AlertDescription className="text-white/80">
                    {migrationResult.message}
                  </AlertDescription>
                </Alert>
              )}

              {checkResult && checkResult.needsMigration === 0 && !migrationResult && (
                <Alert className="bg-green-500/20 border-green-500/50">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <AlertTitle className="text-green-400">Aucune migration nécessaire</AlertTitle>
                  <AlertDescription className="text-white/80">
                    Tous les loaders sont déjà valides. La migration n'est pas nécessaire.
                  </AlertDescription>
                </Alert>
              )}

              <div className="mt-6 p-4 bg-white/5 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Ce que fait cette migration :</h4>
                <ul className="text-white/60 text-sm space-y-2 list-disc list-inside">
                  <li><strong>Structure H1 :</strong> Convertit les &lt;h1&gt; multiples en &lt;h2&gt; (garde le premier)</li>
                  <li><strong>Attributs ALT :</strong> Ajoute des attributs alt pertinents aux images manquantes</li>
                  <li><strong>Sécurité :</strong> Supprime les balises &lt;script&gt; et gestionnaires d'événements dangereux</li>
                  <li><strong>Idempotence :</strong> Peut être exécutée plusieurs fois sans problème</li>
                </ul>
              </div>

              <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Important
                </h4>
                <ul className="text-white/60 text-sm space-y-1">
                  <li>• Cette migration modifie directement la base de données de PRODUCTION</li>
                  <li>• Assurez-vous d'avoir une sauvegarde avant de procéder</li>
                  <li>• Les nouveaux loaders créés après la migration seront automatiquement sanitaires</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
  );
}
