import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useIsAdminSession } from "@/hooks/useIsAdminSession";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle2, XCircle, Loader2, MessageSquare } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";

export default function AdminTestimonials() {
  const { isAdmin } = useIsAdminSession();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{
    success: boolean;
    message: string;
    synced?: number;
    created?: number;
    updated?: number;
  } | null>(null);

  const { data: testimonials, isLoading, refetch } = trpc.testimonials.getAll.useQuery({ language: 'fr' });
  const syncMutation = trpc.admin.syncTestimonials.useMutation();

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncResult(null);

    try {
      const result = await syncMutation.mutateAsync();
      setSyncResult({
        success: result.success,
        message: result.message,
        synced: result.synced,
        created: result.created,
        updated: result.updated,
      });
      
      // Rafraîchir la liste des témoignages après synchronisation
      await refetch();
    } catch (error: any) {
      setSyncResult({
        success: false,
        message: error.message || "Erreur lors de la synchronisation",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Gestion des Témoignages</h1>
              <p className="text-gray-300">Synchroniser les témoignages depuis la plateforme interne</p>
            </div>
          </div>

          {/* Sync Card */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Synchronisation des Témoignages
              </CardTitle>
              <CardDescription className="text-gray-400">
                Récupérer les témoignages depuis la plateforme interne et mettre à jour la base de données locale
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleSync}
                  disabled={isSyncing || !isAdmin}
                  className="bg-violet-600 hover:bg-violet-700 text-white"
                >
                  {isSyncing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Synchronisation en cours...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Synchroniser depuis la plateforme interne
                    </>
                  )}
                </Button>
              </div>

              {syncResult && (
                <div
                  className={`p-4 rounded-lg flex items-start gap-3 ${
                    syncResult.success
                      ? "bg-green-500/20 border border-green-500/50"
                      : "bg-red-500/20 border border-red-500/50"
                  }`}
                >
                  {syncResult.success ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        syncResult.success ? "text-green-300" : "text-red-300"
                      }`}
                    >
                      {syncResult.message}
                    </p>
                    {syncResult.success && syncResult.synced !== undefined && (
                      <div className="mt-2 text-sm text-gray-300 space-y-1">
                        <p>• {syncResult.synced} témoignage(s) synchronisé(s)</p>
                        {syncResult.created !== undefined && syncResult.created > 0 && (
                          <p>• {syncResult.created} témoignage(s) créé(s)</p>
                        )}
                        {syncResult.updated !== undefined && syncResult.updated > 0 && (
                          <p>• {syncResult.updated} témoignage(s) mis à jour</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="text-sm text-gray-400 pt-2 border-t border-white/10">
                <p>
                  <strong>Note :</strong> La synchronisation récupère les témoignages depuis la plateforme interne
                  et met à jour la base de données locale. Les témoignages affichés sur le site proviennent de la
                  base de données locale.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Testimonials List */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Témoignages Actuels</CardTitle>
              <CardDescription className="text-gray-400">
                Liste des témoignages actuellement dans la base de données locale
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-white mx-auto mb-2" />
                  <p className="text-gray-400">Chargement des témoignages...</p>
                </div>
              ) : testimonials && Array.isArray(testimonials) && testimonials.length > 0 ? (
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-1">{testimonial.client}</h3>
                          <p className="text-gray-400 text-sm mb-2">
                            {testimonial.contact} - {testimonial.title}
                          </p>
                          <p className="text-gray-300 text-sm italic line-clamp-2">
                            "{testimonial.text}"
                          </p>
                        </div>
                        <div className="ml-4 text-right">
                          <div className="text-xs text-gray-400 mb-1">Ordre</div>
                          <div className="text-white font-mono">{testimonial.displayOrder}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">Aucun témoignage dans la base de données</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Utilisez le bouton de synchronisation pour récupérer les témoignages depuis la plateforme interne
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
  );
}
