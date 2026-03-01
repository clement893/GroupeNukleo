import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  LayoutGrid,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminCarouselLogos() {
  const {
    data: logos,
    isLoading,
    isError,
    error,
    refetch,
  } = trpc.carouselLogos.getAllAdmin.useQuery(undefined, {
    retry: 1,
    retryDelay: 2000,
    refetchOnWindowFocus: false,
  });
  const addMutation = trpc.carouselLogos.add.useMutation({
    onSuccess: () => {
      toast.success("Logo ajouté");
      refetch();
      setNewSrc("");
      setNewAlt("");
      setNewUrl("");
    },
    onError: (e) => toast.error(e.message),
  });
  const updateMutation = trpc.carouselLogos.update.useMutation({
    onSuccess: () => {
      toast.success("Logo mis à jour");
      refetch();
      setEditingId(null);
    },
    onError: (e) => toast.error(e.message),
  });
  const removeMutation = trpc.carouselLogos.remove.useMutation({
    onSuccess: () => {
      toast.success("Logo supprimé");
      refetch();
    },
    onError: (e) => toast.error(e.message),
  });
  const reorderMutation = trpc.carouselLogos.reorder.useMutation({
    onSuccess: () => refetch(),
    onError: (e) => toast.error(e.message),
  });

  const [newSrc, setNewSrc] = useState("");
  const [newAlt, setNewAlt] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState("");

  const handleAdd = () => {
    if (!newSrc.trim() || !newAlt.trim()) {
      toast.error("Chemin image et texte alternatif requis");
      return;
    }
    addMutation.mutate({
      src: newSrc.trim(),
      alt: newAlt.trim(),
      url: newUrl.trim() || undefined,
    });
  };

  const handleUpdateUrl = (id: string) => {
    updateMutation.mutate({ id, url: editUrl.trim() });
  };

  const handleRemove = (id: string, alt: string) => {
    if (!confirm(`Supprimer le logo « ${alt} » ?`)) return;
    removeMutation.mutate({ id });
  };

  const moveLogo = (index: number, direction: "up" | "down") => {
    if (!logos || logos.length === 0) return;
    const newOrder = [...logos];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= newOrder.length) return;
    [newOrder[index], newOrder[target]] = [newOrder[target], newOrder[index]];
    reorderMutation.mutate(
      newOrder.map((l, i) => ({ id: l.id, displayOrder: i }))
    );
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <LayoutGrid className="w-8 h-8 text-purple-400" />
              Logos du carrousel
            </h1>
            <p className="text-gray-300">
              Gérer les logos affichés dans le carrousel de la page d&apos;accueil. Ajoutez, supprimez et associez un lien vers le site du client.
            </p>
          </div>

          {/* Add new logo */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Ajouter un logo
              </CardTitle>
              <CardDescription className="text-gray-400">
                Chemin de l&apos;image (ex. /demo/logos/AMQ.png), texte alternatif et lien optionnel vers le site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-gray-300">Chemin image</Label>
                  <Input
                    placeholder="/demo/logos/Nom.png"
                    value={newSrc}
                    onChange={(e) => setNewSrc(e.target.value)}
                    className="bg-white/5 border-white/20 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Texte alternatif (alt)</Label>
                  <Input
                    placeholder="Nom du client"
                    value={newAlt}
                    onChange={(e) => setNewAlt(e.target.value)}
                    className="bg-white/5 border-white/20 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Lien vers le site (optionnel)</Label>
                  <Input
                    placeholder="https://..."
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="bg-white/5 border-white/20 text-white mt-1"
                  />
                </div>
              </div>
              <Button
                onClick={handleAdd}
                disabled={addMutation.isPending || !newSrc.trim() || !newAlt.trim()}
                className="bg-violet-600 hover:bg-violet-700 text-white"
              >
                {addMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                Ajouter
              </Button>
            </CardContent>
          </Card>

          {/* List */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Logos actuels</CardTitle>
              <CardDescription className="text-gray-400">
                Ordre d&apos;affichage dans le carrousel (première moitié = rangée 1, deuxième = rangée 2). Cliquez sur le lien pour modifier.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                </div>
              ) : isError ? (
                <div className="text-center py-12 space-y-4">
                  <p className="text-red-300">
                    Impossible de charger les logos. {error?.message || "Erreur réseau ou session expirée."}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Si la page vous renvoie à l&apos;accueil admin, reconnectez-vous puis réessayez.
                  </p>
                  <Button
                    onClick={() => refetch()}
                    className="bg-violet-600 hover:bg-violet-700 text-white"
                  >
                    Réessayer
                  </Button>
                </div>
              ) : !logos || logos.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Aucun logo. Ajoutez-en un ci-dessus.</p>
              ) : (
                <ul className="space-y-3">
                  {logos.map((logo, index) => (
                    <li
                      key={logo.id}
                      className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-white"
                          onClick={() => moveLogo(index, "up")}
                          disabled={index === 0 || reorderMutation.isPending}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-white"
                          onClick={() => moveLogo(index, "down")}
                          disabled={index === logos.length - 1 || reorderMutation.isPending}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="w-16 h-10 flex items-center justify-center shrink-0 bg-white/10 rounded overflow-hidden">
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className="max-h-8 max-w-[56px] object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-medium truncate">{logo.alt}</p>
                        <p className="text-gray-500 text-xs truncate">{logo.src}</p>
                        {editingId === logo.id ? (
                          <div className="flex gap-2 mt-2">
                            <Input
                              placeholder="https://..."
                              value={editUrl}
                              onChange={(e) => setEditUrl(e.target.value)}
                              className="bg-white/5 border-white/20 text-white text-sm h-8"
                            />
                            <Button
                              size="sm"
                              onClick={() => handleUpdateUrl(logo.id)}
                              disabled={updateMutation.isPending}
                            >
                              Enregistrer
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setEditingId(null);
                                setEditUrl("");
                              }}
                            >
                              Annuler
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 mt-1">
                            {logo.url ? (
                              <a
                                href={logo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-violet-400 hover:underline flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                {logo.url}
                              </a>
                            ) : (
                              <span className="text-gray-500 text-sm">Aucun lien</span>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-gray-400 h-6 px-2"
                              onClick={() => {
                                setEditingId(logo.id);
                                setEditUrl(logo.url || "");
                              }}
                            >
                              {logo.url ? "Modifier" : "Ajouter lien"}
                            </Button>
                          </div>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20 shrink-0"
                        onClick={() => handleRemove(logo.id, logo.alt)}
                        disabled={removeMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
  );
}
