import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, Plus, FileText, Globe, ChevronDown, ChevronRight } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { toast } from "sonner";

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

export default function AdminPageTexts() {
  const { data: texts, isLoading, refetch } = trpc.pageTexts.getAll.useQuery();
  const updateMutation = trpc.pageTexts.update.useMutation({
    onSuccess: () => {
      toast.success("Texte enregistré");
      refetch();
    },
    onError: (e) => toast.error(e.message),
  });
  const createMutation = trpc.pageTexts.create.useMutation({
    onSuccess: () => {
      toast.success("Clé ajoutée");
      setNewKey("");
      setNewEn("");
      setNewFr("");
      refetch();
    },
    onError: (e) => toast.error(e.message),
  });
  const importMutation = trpc.pageTexts.importFromJson.useMutation({
    onSuccess: (r) => {
      toast.success(`Import: ${r.created} créés, ${r.updated} mis à jour`);
      setShowImport(false);
      setImportEn("");
      setImportFr("");
      refetch();
    },
    onError: (e) => toast.error(e.message),
  });

  const [newKey, setNewKey] = useState("");
  const [newEn, setNewEn] = useState("");
  const [newFr, setNewFr] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [importEn, setImportEn] = useState("");
  const [importFr, setImportFr] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["common", "nav", "header"]));
  const [dirty, setDirty] = useState<Record<number, { textEn: string; textFr: string }>>({});

  const sections = useMemo(() => {
    if (!texts) return [];
    const bySection: Record<string, typeof texts> = {};
    for (const t of texts) {
      const section = t.key.split(".")[0] ?? "other";
      if (!bySection[section]) bySection[section] = [];
      bySection[section].push(t);
    }
    return Object.entries(bySection)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, items]) => ({ name, items }));
  }, [texts]);

  const toggleSection = (name: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

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
    } catch (e) {
      toast.error("JSON invalide (EN ou FR)");
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
            <p className="text-white/60">Chargement des textes...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <FileText className="w-8 h-8 text-cyan-600" />
              Textes des pages (EN / FR)
            </h1>
            <p className="text-gray-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Gérer les textes du site en anglais et en français. Les clés correspondent aux fichiers de traduction (ex. common.loading, nav.home).
            </p>
          </div>
        </div>

        {/* Add new key */}
        <Card className="bg-white border border-gray-200 shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <Plus className="w-5 h-5" />
              Ajouter une clé
            </CardTitle>
            <CardDescription className="text-gray-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Créer une nouvelle clé de traduction (ex. common.myKey)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-gray-700">Clé</Label>
                <Input
                  placeholder="ex. common.loading"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  className="mt-1 font-mono text-sm"
                />
              </div>
              <div>
                <Label className="text-gray-700">EN</Label>
                <Input
                  placeholder="English text"
                  value={newEn}
                  onChange={(e) => setNewEn(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-gray-700">FR</Label>
                <Input
                  placeholder="Texte français"
                  value={newFr}
                  onChange={(e) => setNewFr(e.target.value)}
                  className="mt-1"
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
        <Card className="bg-white border border-gray-200 shadow-sm mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  <Globe className="w-5 h-5" />
                  Importer depuis les fichiers JSON (en.json / fr.json)
                </CardTitle>
                <CardDescription className="text-gray-500 mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Collez le contenu des fichiers locales (structure imbriquée acceptée). Les clés seront aplaties (ex. common.loading).
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowImport(!showImport)}>
                {showImport ? "Masquer" : "Afficher"}
              </Button>
            </div>
          </CardHeader>
          {showImport && (
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-700">en.json</Label>
                  <textarea
                    className="mt-1 w-full h-40 font-mono text-xs border rounded p-2"
                    placeholder='{ "common": { "loading": "Loading..." } }'
                    value={importEn}
                    onChange={(e) => setImportEn(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-gray-700">fr.json</Label>
                  <textarea
                    className="mt-1 w-full h-40 font-mono text-xs border rounded p-2"
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
              >
                {importMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Importer
              </Button>
            </CardContent>
          )}
        </Card>

        {/* List by section */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Textes ({texts?.length ?? 0} clés)
            </CardTitle>
            <CardDescription className="text-gray-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Modifier une valeur puis cliquer sur Enregistrer pour la ligne.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!texts?.length ? (
              <p className="text-gray-500 py-8 text-center">Aucun texte. Ajoutez une clé ou importez depuis les JSON.</p>
            ) : (
              <div className="space-y-4">
                {sections.map(({ name, items }) => {
                  const isOpen = expandedSections.has(name);
                  return (
                    <div key={name} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        className="w-full flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left font-medium text-gray-900"
                        onClick={() => toggleSection(name)}
                      >
                        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        {name} ({items.length})
                      </button>
                      {isOpen && (
                        <div className="divide-y divide-gray-100">
                          {items.map((row) => {
                            const local = dirty[row.id] ?? { textEn: row.textEn, textFr: row.textFr };
                            const hasChange =
                              local.textEn !== row.textEn || local.textFr !== row.textFr;
                            return (
                              <div key={row.id} className="p-4 bg-white hover:bg-gray-50/50">
                                <div className="flex items-start gap-4 flex-wrap">
                                  <div className="w-full md:w-48 shrink-0">
                                    <span className="font-mono text-sm text-gray-600 break-all">{row.key}</span>
                                  </div>
                                  <div className="flex-1 min-w-[200px] space-y-2">
                                    <div>
                                      <Label className="text-xs text-gray-500">EN</Label>
                                      <Input
                                        value={local.textEn}
                                        onChange={(e) =>
                                          setDirty((prev) => ({
                                            ...prev,
                                            [row.id]: { ...local, textEn: e.target.value },
                                          }))
                                        }
                                        className="mt-0.5 text-sm"
                                      />
                                    </div>
                                    <div>
                                      <Label className="text-xs text-gray-500">FR</Label>
                                      <Input
                                        value={local.textFr}
                                        onChange={(e) =>
                                          setDirty((prev) => ({
                                            ...prev,
                                            [row.id]: { ...local, textFr: e.target.value },
                                          }))
                                        }
                                        className="mt-0.5 text-sm"
                                      />
                                    </div>
                                  </div>
                                  <div className="shrink-0">
                                    <Button
                                      size="sm"
                                      onClick={() => handleSave(row.id, local.textEn, local.textFr)}
                                      disabled={updateMutation.isPending || !hasChange}
                                      className="bg-cyan-600 hover:bg-cyan-700 text-white"
                                    >
                                      {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-1" />}
                                      Enregistrer
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
