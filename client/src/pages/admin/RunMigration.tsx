import { trpc } from '@/lib/trpc';
import AdminRoute from '@/components/AdminRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Database, CheckCircle2, XCircle } from 'lucide-react';
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function RunMigration() {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; tableExists?: boolean } | null>(null);

  const runMigration = async () => {
    setIsRunning(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/trpc/migrate.createPageVisibilityTable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      
      if (data.result?.data) {
        setResult(data.result.data);
      } else {
        setResult({
          success: false,
          message: 'Erreur lors de l\'exécution de la migration',
        });
      }
    } catch (error: any) {
      setResult({
        success: false,
        message: error.message || 'Erreur inconnue',
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Utiliser tRPC directement
  const mutation = trpc.migrate.createPageVisibilityTable.useMutation({
    onSuccess: (data) => {
      setResult(data);
      setIsRunning(false);
    },
    onError: (error) => {
      setResult({
        success: false,
        message: error.message || 'Erreur lors de la migration',
      });
      setIsRunning(false);
    },
  });

  const handleRunMigration = () => {
    setIsRunning(true);
    setResult(null);
    mutation.mutate();
  };

  return (
    <AdminRoute>
      <AdminLayout>
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Database className="w-8 h-8 text-cyan-400" />
              Migration de Base de Données
            </h1>
            <p className="text-white/60">
              Créer la table page_visibility pour gérer la visibilité des pages
            </p>
          </div>

          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Créer la table page_visibility</CardTitle>
              <CardDescription className="text-white/60">
                Cette migration va créer la table nécessaire pour gérer la visibilité des pages du site.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!result && !isRunning && (
                <Button
                  onClick={handleRunMigration}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white w-full"
                  size="lg"
                >
                  <Database className="w-5 h-5 mr-2" />
                  Exécuter la Migration
                </Button>
              )}

              {isRunning && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mr-3" />
                  <span className="text-white">Exécution de la migration...</span>
                </div>
              )}

              {result && (
                <div className={`p-6 rounded-lg ${result.success ? 'bg-green-500/20 border border-green-500/50' : 'bg-red-500/20 border border-red-500/50'}`}>
                  <div className="flex items-start gap-3">
                    {result.success ? (
                      <CheckCircle2 className="w-6 h-6 text-green-400 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400 mt-1" />
                    )}
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold mb-2 ${result.success ? 'text-green-400' : 'text-red-400'}`}>
                        {result.success ? 'Migration réussie!' : 'Erreur lors de la migration'}
                      </h3>
                      <p className="text-white/80 mb-2">{result.message}</p>
                      {result.success && result.tableExists !== undefined && (
                        <p className="text-white/60 text-sm">
                          Table existe: {result.tableExists ? 'Oui' : 'Non'}
                        </p>
                      )}
                      {result.success && (
                        <div className="mt-4">
                          <Button
                            onClick={() => window.location.href = '/admin/page-visibility'}
                            className="bg-cyan-500 hover:bg-cyan-600 text-white"
                          >
                            Aller à la gestion de visibilité
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 p-4 bg-white/5 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Ce que fait cette migration :</h4>
                <ul className="text-white/60 text-sm space-y-1 list-disc list-inside">
                  <li>Crée la table page_visibility</li>
                  <li>Ajoute un index sur la colonne path pour des recherches rapides</li>
                  <li>Configure les colonnes nécessaires (path, isVisible, description, timestamps)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </AdminRoute>
  );
}
