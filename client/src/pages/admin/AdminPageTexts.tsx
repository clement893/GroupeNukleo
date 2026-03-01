import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, Plus, FileText, Globe, ChevronRight, AlertCircle, Download } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { toast } from "sonner";

const credentials = { credentials: "include" as RequestCredentials };

async function fetchPageTexts() {
  const res = await fetch("/api/admin/page-texts", credentials);
  if (!res.ok) throw new Error(res.status === 401 ? "Non autorisé" : await res.text());
  return res.json();
}

async function updatePageText(id: number, textEn: string, textFr: string) {
  const res = await fetch("/api/admin/page-texts", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    ...credentials,
    body: JSON.stringify({ id, textEn, textFr }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || res.statusText);
  }
  return res.json();
}

async function createPageText(key: string, textEn: string, textFr: string) {
  const res = await fetch("/api/admin/page-texts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    ...credentials,
    body: JSON.stringify({ key, textEn, textFr }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || res.statusText);
  }
  return res.json();
}

async function importPageTexts(en: Record<string, string>, fr: Record<string, string>) {
  const res = await fetch("/api/admin/page-texts/import", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    ...credentials,
    body: JSON.stringify({ en, fr }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || res.statusText);
  }
  return res.json();
}

async function seedFromLocales() {
  const res = await fetch("/api/admin/page-texts/seed-from-locales", {
    method: "POST",
    ...credentials,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || data.hint || res.statusText);
  }
  return res.json();
}

function flattenObj(obj: Record<string, unknown>, prefix = ""): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(out, flattenObj(v as Record<string, unknown>, key));
    } else if (typeof v === "string") {
      out[key] = v;
    } else if (Array.isArray(v) && v.every((x) => typeof x === "string")) {
      out[key] = (v as string[]).join("\n");
    }
  }
  return out;
}

type TextRow = { id: number; key: string; textEn: string; textFr: string };

export default function AdminPageTexts() {
  const queryClient = useQueryClient();
  const {
    data: texts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin", "page-texts"],
    queryFn: fetchPageTexts,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, textEn, textFr }: { id: number; textEn: string; textFr: string }) =>
      updatePageText(id, textEn, textFr),
    onSuccess: () => {
      toast.success("Texte enregistré");
      queryClient.invalidateQueries({ queryKey: ["admin", "page-texts"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const createMutation = useMutation({
    mutationFn: ({ key, textEn, textFr }: { key: string; textEn: string; textFr: string }) =>
      createPageText(key, textEn, textFr),
    onSuccess: () => {
      toast.success("Clé ajoutée");
      setNewKey("");
      setNewEn("");
      setNewFr("");
      queryClient.invalidateQueries({ queryKey: ["admin", "page-texts"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const importMutation = useMutation({
    mutationFn: ({ en, fr }: { en: Record<string, string>; fr: Record<string, string> }) =>
      importPageTexts(en, fr),
    onSuccess: (r: { created: number; updated: number }) => {
      toast.success(`Import: ${r.created} créés, ${r.updated} mis à jour`);
      setShowImport(false);
      setImportEn("");
      setImportFr("");
      queryClient.invalidateQueries({ queryKey: ["admin", "page-texts"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const seedMutation = useMutation({
    mutationFn: seedFromLocales,
    onSuccess: (r: { created: number; updated: number; total: number }) => {
      toast.success(`Site importé : ${r.created} créés, ${r.updated} mis à jour (${r.total} clés)`);
      queryClient.invalidateQueries({ queryKey: ["admin", "page-texts"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [newKey, setNewKey] = useState("");
  const [newEn, setNewEn] = useState("");
  const [newFr, setNewFr] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [importEn, setImportEn] = useState("");
  const [importFr, setImportFr] = useState("");
  const [dirty, setDirty] = useState<Record<number, { textEn: string; textFr: string }>>({});

  const pages = useMemo(() => {
    if (!texts?.length) return [];
    const sectionSet = new Set<string>();
    for (const t of texts) {
      const section = t.key.split(".")[0] ?? "other";
      sectionSet.add(section);
    }
    return Array.from(sectionSet).sort((a, b) => a.localeCompare(b));
  }, [texts]);

  const selectedPageKey = selectedPage ?? (pages[0] ?? null);
  const itemsForPage = useMemo(() => {
    if (!texts || !selectedPageKey) return [];
    return texts.filter((t) => t.key.split(".")[0] === selectedPageKey) as TextRow[];
  }, [texts, selectedPageKey]);

  const handleSave = (id: number, textEn: string, textFr: string) => {
    updateMutation.mutate({ id, textEn, textFr });
    setDirty((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleCreate = () => {
    if (!newKey.trim()) {
      toast.error("Clé requise");
      return;
    }
    createMutation.mutate({ key: newKey.trim(), textEn: newEn, textFr: newFr });
  };

  const handleImport = () => {
    try {
      const en = JSON.parse(importEn || "{}") as Record<string, unknown>;
      const fr = JSON.parse(importFr || "{}") as Record<string, unknown>;
      const flatEn = flattenObj(en);
      const flatFr = flattenObj(fr);
      importMutation.mutate({ en: flatEn, fr: flatFr });
    } catch {
      toast.error("JSON invalide (EN ou FR)");
    }
  };

  if (isLoading && !texts) {
    return (
      <AdminLayout>
        <div className="min-h-[50vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    const err = error as Error;
    const isForbidden =
      err.message?.toLowerCase().includes("autorisé") ||
      err.message?.toLowerCase().includes("admin") ||
      err.message?.toLowerCase().includes("permission");
    return (
      <AdminLayout>
        <div className="p-6 lg:p-8 max-w-2xl mx-auto">
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Erreur de chargement
              </CardTitle>
              <CardDescription className="text-white/60">
                {isForbidden
                  ? "La session admin n'est pas reconnue pour cette requête. Essayez de rafraîchir la page ou de vous reconnecter."
                  : "Les textes des pages n'ont pas pu être chargés depuis la base de données."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 mb-4">{err.message || "Une erreur est survenue"}</p>
              {!isForbidden && (
                <p className="text-sm text-white/50 mb-4">
                  Vérifiez que la table <code className="bg-white/10 px-1 rounded">page_texts</code> existe (exécutez la migration DB depuis l&apos;admin).
                </p>
              )}
              <Button onClick={() => refetch()} className="bg-cyan-600 hover:bg-cyan-700 text-white">
                Réessayer
              </Button>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <FileText className="w-7 h-7 text-cyan-400" />
            Textes des pages (EN / FR)
          </h1>
          <p className="text-white/60" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Sélectionnez une page à gauche, modifiez les textes à droite. Données en base de données.
          </p>
        </div>

        {(!texts || texts.length === 0) && !isLoading && (
          <Card className="mb-6 border-cyan-500/50 bg-cyan-500/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <Download className="w-5 h-5 text-cyan-400" />
                Importer tout le contenu du site
              </CardTitle>
              <CardDescription className="text-white/70" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Les textes du site (en.json / fr.json) seront importés dans la base. Toutes les pages et clés apparaîtront ici pour édition.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => seedMutation.mutate()}
                disabled={seedMutation.isPending}
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                {seedMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                Importer tout depuis les fichiers du site
              </Button>
              {seedMutation.isError && (
                <p className="text-red-400 text-sm mt-2">{(seedMutation.error as Error).message}</p>
              )}
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: page selector */}
          <Card className="lg:w-56 shrink-0 bg-white/10 border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium">Pages</CardTitle>
              <CardDescription className="text-white/50 text-xs">
                {texts?.length ?? 0} clés
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                </div>
              ) : pages.length === 0 ? (
                <p className="text-white/50 text-sm py-4">Aucune page. Ajoutez une clé ou importez.</p>
              ) : (
                <nav className="space-y-0.5">
                  {pages.map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setSelectedPage(page)}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${
                        selectedPageKey === page
                          ? "bg-cyan-600/80 text-white"
                          : "text-white/80 hover:bg-white/10"
                      }`}
                    >
                      <ChevronRight className="w-4 h-4 shrink-0" />
                      {page}
                    </button>
                  ))}
                </nav>
              )}
            </CardContent>
          </Card>

          {/* Right: content for selected page */}
          <div className="flex-1 min-w-0 space-y-6">
            {selectedPageKey && (
              <>
                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Contenu — {selectedPageKey}
                    </CardTitle>
                    <CardDescription className="text-white/60" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Modifiez les valeurs puis enregistrez pour chaque ligne.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {itemsForPage.length === 0 ? (
                      <p className="text-white/50 py-8 text-center">
                        Aucune clé pour cette page. Ajoutez une clé ci-dessous (ex. {selectedPageKey}.maCle).
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {itemsForPage.map((row) => {
                          const local = dirty[row.id] ?? { textEn: row.textEn, textFr: row.textFr };
                          const hasChange = local.textEn !== row.textEn || local.textFr !== row.textFr;
                          return (
                            <div
                              key={row.id}
                              className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3"
                            >
                              <div className="font-mono text-sm text-cyan-300/90">{row.key}</div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-xs text-white/50">EN</Label>
                                  <Input
                                    value={local.textEn}
                                    onChange={(e) =>
                                      setDirty((prev) => ({
                                        ...prev,
                                        [row.id]: { ...local, textEn: e.target.value },
                                      }))
                                    }
                                    className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs text-white/50">FR</Label>
                                  <Input
                                    value={local.textFr}
                                    onChange={(e) =>
                                      setDirty((prev) => ({
                                        ...prev,
                                        [row.id]: { ...local, textFr: e.target.value },
                                      }))
                                    }
                                    className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                                  />
                                </div>
                              </div>
                              <div>
                                <Button
                                  size="sm"
                                  onClick={() => handleSave(row.id, local.textEn, local.textFr)}
                                  disabled={updateMutation.isPending || !hasChange}
                                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                                >
                                  {updateMutation.isPending ? (
                                    <Loader2 className="w-4 h-4 animate-spin mr-1" />
                                  ) : (
                                    <Save className="w-4 h-4 mr-1" />
                                  )}
                                  Enregistrer
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Add key */}
                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-base flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Ajouter une clé
                    </CardTitle>
                    <CardDescription className="text-white/60 text-sm">
                      Ex. {selectedPageKey}.maCle
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <Label className="text-white/70 text-sm">Clé</Label>
                        <Input
                          placeholder={`${selectedPageKey}.maCle`}
                          value={newKey}
                          onChange={(e) => setNewKey(e.target.value)}
                          className="mt-1 bg-white/10 border-white/20 text-white font-mono text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-sm">EN</Label>
                        <Input
                          placeholder="English"
                          value={newEn}
                          onChange={(e) => setNewEn(e.target.value)}
                          className="mt-1 bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-sm">FR</Label>
                        <Input
                          placeholder="Français"
                          value={newFr}
                          onChange={(e) => setNewFr(e.target.value)}
                          className="mt-1 bg-white/10 border-white/20 text-white"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={handleCreate}
                      disabled={createMutation.isPending || !newKey.trim()}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white"
                    >
                      {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                      Ajouter
                    </Button>
                  </CardContent>
                </Card>

                {/* Import from JSON */}
                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white text-base flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Importer depuis JSON (en / fr)
                        </CardTitle>
                        <CardDescription className="text-white/60 text-sm mt-1">
                          Collez le contenu des fichiers locales ; les clés seront aplaties. Ou importez directement depuis les fichiers du site.
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setShowImport(!showImport)} className="border-white/30 text-white">
                          {showImport ? "Masquer" : "Afficher"}
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => seedMutation.mutate()}
                          disabled={seedMutation.isPending}
                          className="bg-cyan-600 hover:bg-cyan-700 text-white"
                        >
                          {seedMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                          Tout depuis le site
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {showImport && (
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label className="text-white/70 text-sm">en.json</Label>
                          <textarea
                            className="mt-1 w-full h-32 font-mono text-xs rounded border border-white/20 bg-white/10 text-white p-2 placeholder:text-white/40"
                            placeholder='{ "common": { "loading": "Loading..." } }'
                            value={importEn}
                            onChange={(e) => setImportEn(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-white/70 text-sm">fr.json</Label>
                          <textarea
                            className="mt-1 w-full h-32 font-mono text-xs rounded border border-white/20 bg-white/10 text-white p-2 placeholder:text-white/40"
                            placeholder='{ "common": { "loading": "Chargement..." } }'
                            value={importFr}
                            onChange={(e) => setImportFr(e.target.value)}
                          />
                        </div>
                      </div>
                      <Button
                        onClick={handleImport}
                        disabled={importMutation.isPending || !importEn.trim() || !importFr.trim()}
                        variant="secondary"
                        className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                      >
                        {importMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Importer
                      </Button>
                    </CardContent>
                  )}
                </Card>
              </>
            )}

            {!selectedPageKey && !isLoading && (
              <Card className="bg-white/10 border-white/20">
                <CardContent className="py-12 text-center text-white/60">
                  Aucune page pour l’instant. Ajoutez une clé (ex. common.loading) ou importez depuis les JSON pour créer les premières entrées.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
