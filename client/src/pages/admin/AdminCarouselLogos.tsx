import { useState, useCallback, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Loader2,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  LayoutGrid,
  Upload,
  ImageIcon,
} from "lucide-react";
import { toast } from "sonner";

const ACCEPT_IMAGES = "image/png,image/jpeg,image/jpg,image/webp,image/svg+xml";

export default function AdminCarouselLogos() {
  // Use public procedure for listing so the page loads even when admin session
  // isn't recognized on tRPC (e.g. cookie/session issues on Railway). Mutations stay admin-only.
  const {
    data: logos,
    isLoading,
    isError,
    error,
    refetch,
  } = trpc.carouselLogos.getAll.useQuery(undefined, {
    retry: 1,
    retryDelay: 2000,
    refetchOnWindowFocus: false,
  });
  const [removePendingId, setRemovePendingId] = useState<string | null>(null);

  async function deleteLogo(id: string, alt: string) {
    if (!confirm(`Supprimer le logo « ${alt} » ?`)) return;
    setRemovePendingId(id);
    try {
      const res = await fetch(`/api/admin/carousel-logos/${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Erreur suppression");
      }
      toast.success("Logo supprimé");
      refetch();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    } finally {
      setRemovePendingId(null);
    }
  }

  const [updatePendingId, setUpdatePendingId] = useState<string | null>(null);
  async function updateLogoRest(id: string) {
    setUpdatePendingId(id);
    try {
      const res = await fetch("/api/admin/carousel-logos", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, url: editUrl.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Erreur mise à jour");
      }
      toast.success("Logo mis à jour");
      setEditingId(null);
      setEditUrl("");
      refetch();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    } finally {
      setUpdatePendingId(null);
    }
  }

  const [reorderPending, setReorderPending] = useState(false);
  async function reorderLogosRest(newOrder: typeof logos) {
    if (!newOrder || newOrder.length === 0) return;
    const order = newOrder.map((l, i) => ({ id: l.id, displayOrder: i }));
    setReorderPending(true);
    try {
      const res = await fetch("/api/admin/carousel-logos/reorder", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Erreur réordonnancement");
      }
      refetch();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    } finally {
      setReorderPending(false);
    }
  }

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState("");

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addModalFile, setAddModalFile] = useState<File | null>(null);
  const [addModalPreviewUrl, setAddModalPreviewUrl] = useState<string | null>(null);
  useEffect(() => {
    if (addModalFile) {
      const url = URL.createObjectURL(addModalFile);
      setAddModalPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setAddModalPreviewUrl(null);
    return () => {};
  }, [addModalFile]);

  const [addModalAlt, setAddModalAlt] = useState("");
  const [addModalUrl, setAddModalUrl] = useState("");
  const [addModalPath, setAddModalPath] = useState("");
  const [addModalDragging, setAddModalDragging] = useState(false);
  const [addModalPending, setAddModalPending] = useState(false);

  const resetAddModal = useCallback(() => {
    setAddModalFile(null);
    setAddModalAlt("");
    setAddModalUrl("");
    setAddModalPath("");
    setAddModalOpen(false);
  }, []);

  const onAddModalDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setAddModalDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setAddModalFile(file);
      setAddModalPath("");
    } else toast.error("Déposez une image (PNG, JPG, WebP, SVG)");
  }, []);

  const onAddModalFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAddModalFile(file);
      setAddModalPath("");
    }
    e.target.value = "";
  }, []);

  async function submitAddLogo() {
    if (!addModalAlt.trim()) {
      toast.error("Texte alternatif (alt) requis");
      return;
    }
    let src: string;
    if (addModalFile) {
      setAddModalPending(true);
      try {
        const form = new FormData();
        form.append("file", addModalFile);
        const upRes = await fetch("/api/admin/carousel-logos/upload", {
          method: "POST",
          credentials: "include",
          body: form,
        });
        if (!upRes.ok) {
          const data = await upRes.json().catch(() => ({}));
          throw new Error(data?.error || "Erreur upload");
        }
        const { path: uploadedPath } = await upRes.json();
        src = uploadedPath;
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Erreur upload");
        setAddModalPending(false);
        return;
      }
      setAddModalPending(false);
    } else if (addModalPath.trim()) {
      src = addModalPath.trim().startsWith("/") ? addModalPath.trim() : `/${addModalPath.trim()}`;
    } else {
      toast.error("Déposez une image ou indiquez un chemin");
      return;
    }
    setAddModalPending(true);
    try {
      const res = await fetch("/api/admin/carousel-logos", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          src,
          alt: addModalAlt.trim(),
          url: addModalUrl.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Erreur ajout");
      }
      toast.success("Logo ajouté");
      resetAddModal();
      refetch();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    } finally {
      setAddModalPending(false);
    }
  }

  const handleAdd = () => {
    setAddModalOpen(true);
  };

  const handleUpdateUrl = (id: string) => {
    updateLogoRest(id);
  };

  const handleRemove = (id: string, alt: string) => {
    deleteLogo(id, alt);
  };

  const moveLogo = (index: number, direction: "up" | "down") => {
    if (!logos || logos.length === 0) return;
    const newOrder = [...logos];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= newOrder.length) return;
    [newOrder[index], newOrder[target]] = [newOrder[target], newOrder[index]];
    reorderLogosRest(newOrder);
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
            {!isLoading && !isError && (
              <p className="text-sm text-violet-300 mt-2 font-medium">
                {logos?.length ?? 0} logo{logos?.length !== 1 ? "s" : ""} au total
              </p>
            )}
          </div>

          {/* Add logo: button opens modal with drag-and-drop */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              onClick={() => setAddModalOpen(true)}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un logo
            </Button>
          </div>

          <Dialog open={addModalOpen} onOpenChange={(open) => !open && resetAddModal()}>
            <DialogContent className="sm:max-w-md bg-[#1a1a2e] border-white/20 text-white">
              <DialogHeader>
                <DialogTitle className="text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-violet-400" />
                  Ajouter un logo
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Glissez-déposez une image ou indiquez un chemin. Renseignez le texte alternatif (obligatoire).
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div
                  onDragOver={(e) => { e.preventDefault(); setAddModalDragging(true); }}
                  onDragLeave={() => setAddModalDragging(false)}
                  onDrop={onAddModalDrop}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    addModalDragging ? "border-violet-500 bg-violet-500/10" : "border-white/30 bg-white/5"
                  }`}
                >
                  <input
                    type="file"
                    accept={ACCEPT_IMAGES}
                    onChange={onAddModalFileInput}
                    className="hidden"
                    id="carousel-logo-file"
                  />
                  <label htmlFor="carousel-logo-file" className="cursor-pointer block">
                    {addModalFile ? (
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src={addModalPreviewUrl ?? ""}
                          alt="Aperçu"
                          className="max-h-20 max-w-32 object-contain mx-auto rounded"
                        />
                        <span className="text-sm text-gray-400">{addModalFile.name}</span>
                        <span className="text-xs text-violet-400">Cliquez ou déposez pour remplacer</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-10 h-10 text-violet-400 mx-auto" />
                        <span className="text-gray-300">Glissez une image ici ou cliquez pour parcourir</span>
                        <span className="text-xs text-gray-500">PNG, JPG, WebP, SVG — 2 Mo max</span>
                      </div>
                    )}
                  </label>
                </div>
                <div>
                  <Label className="text-gray-300">Ou chemin de l&apos;image</Label>
                  <Input
                    placeholder="/demo/logos/Nom.png"
                    value={addModalPath}
                    onChange={(e) => { setAddModalPath(e.target.value); if (e.target.value) setAddModalFile(null); }}
                    className="bg-white/5 border-white/20 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Texte alternatif (alt) *</Label>
                  <Input
                    placeholder="Nom du client"
                    value={addModalAlt}
                    onChange={(e) => setAddModalAlt(e.target.value)}
                    className="bg-white/5 border-white/20 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Lien vers le site (optionnel)</Label>
                  <Input
                    placeholder="https://..."
                    value={addModalUrl}
                    onChange={(e) => setAddModalUrl(e.target.value)}
                    className="bg-white/5 border-white/20 text-white mt-1"
                  />
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button type="button" variant="ghost" onClick={() => resetAddModal()} className="text-gray-400">
                  Annuler
                </Button>
                <Button
                  onClick={submitAddLogo}
                  disabled={addModalPending || !addModalAlt.trim() || (!addModalFile && !addModalPath.trim())}
                  className="bg-violet-600 hover:bg-violet-700 text-white"
                >
                  {addModalPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                  Ajouter
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

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
                    {error?.message?.includes("Too many") ||
                    error?.message?.includes("429") ||
                    (error?.message?.includes("not valid JSON") && error?.message?.includes("Too many r"))
                      ? "Trop de requêtes envoyées. Veuillez patienter quelques instants puis réessayer."
                      : `Impossible de charger les logos. ${error?.message || "Erreur réseau ou session expirée."}`}
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
                          disabled={index === 0 || reorderPending}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-white"
                          onClick={() => moveLogo(index, "down")}
                          disabled={index === logos.length - 1 || reorderPending}
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
                              disabled={updatePendingId !== null}
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
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemove(logo.id, logo.alt);
                        }}
                        disabled={removePendingId !== null}
                      >
                        {removePendingId === logo.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
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
