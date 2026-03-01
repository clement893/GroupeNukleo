import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, FileText, ChevronRight, AlertCircle, Download } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { toast } from "sonner";

const credentials = { credentials: "include" as RequestCredentials };

async function fetchSections(): Promise<string[]> {
  const res = await fetch("/api/admin/page-texts/sections", credentials);
  if (!res.ok) return [];
  const data = await res.json().catch(() => ({}));
  return Array.isArray(data.sections) ? data.sections : [];
}

async function fetchTexts(): Promise<{ id: number; key: string; textEn: string; textFr: string }[]> {
  const res = await fetch("/api/admin/page-texts", credentials);
  if (!res.ok) throw new Error(res.status === 401 ? "Non autorisé" : await res.text());
  return res.json();
}

async function updateText(id: number, textEn: string, textFr: string) {
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

async function seedFromSite() {
  const res = await fetch("/api/admin/page-texts/seed-from-locales", { method: "POST", ...credentials });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || data.hint || res.statusText);
  }
  return res.json();
}

/** Libellés affichés pour chaque section (alignés sur le site). */
const SECTION_LABELS: Record<string, string> = {
  home: "Accueil",
  services: "Services",
  about: "À propos",
  contact: "Contact",
  projects: "Projets",
  resources: "Ressources",
  faq: "FAQ",
  leo: "Leo",
  nav: "Navigation",
  header: "En-tête",
  menu: "Menu",
  footer: "Pied de page",
  preFooter: "Pré-footer",
  common: "Commun",
  notFound: "Page 404",
  alt: "Textes alternatifs",
  hero: "Hero",
  capabilities: "Capacités",
  manifesto: "Manifeste",
  trinity: "Trinity",
  cta: "CTA",
  testimonials: "Témoignages",
  whoWeServe: "Public cible",
  clients: "Clients",
  startProject: "Démarrer un projet",
  expertise: "Expertise",
  artsCulture: "Arts & Culture",
  agencies: "Agences",
  media: "Média",
  lab: "Lab",
  bureau: "Bureau",
  studio: "Studio",
  artsCultureCommitment: "Engagement Arts & Culture",
  assessment: "Évaluation",
  seo: "SEO",
  pwa: "PWA",
  other: "Autres",
};

function sectionLabel(section: string): string {
  return SECTION_LABELS[section] ?? section;
}

export default function AdminPageTexts() {
  const queryClient = useQueryClient();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [dirty, setDirty] = useState<Record<number, { textEn: string; textFr: string }>>({});

  const { data: sections = [], isLoading: sectionsLoading } = useQuery({
    queryKey: ["admin", "page-texts", "sections"],
    queryFn: fetchSections,
    staleTime: 60 * 1000,
  });

  const { data: texts, isLoading: textsLoading, error, refetch } = useQuery({
    queryKey: ["admin", "page-texts"],
    queryFn: fetchTexts,
    retry: false,
  });

  const seedMutation = useMutation({
    mutationFn: seedFromSite,
    onSuccess: (r: { created?: number; updated?: number; total?: number }) => {
      const created = r.created ?? 0;
      const updated = r.updated ?? 0;
      const total = r.total ?? created + updated;
      toast.success(`Synchronisé : ${created} créés, ${updated} mis à jour (${total} clés)`);
      queryClient.invalidateQueries({ queryKey: ["admin", "page-texts"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "page-texts", "sections"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, textEn, textFr }: { id: number; textEn: string; textFr: string }) => updateText(id, textEn, textFr),
    onSuccess: () => {
      toast.success("Texte enregistré");
      queryClient.invalidateQueries({ queryKey: ["admin", "page-texts"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const currentSection = selectedSection ?? sections[0] ?? null;
  const itemsForSection = useMemo(() => {
    if (!texts || !currentSection) return [];
    return texts.filter((t) => t.key.startsWith(currentSection + ".") || t.key === currentSection);
  }, [texts, currentSection]);

  const handleSave = (id: number, textEn: string, textFr: string) => {
    updateMutation.mutate({ id, textEn, textFr });
    setDirty((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  if (textsLoading && !texts && !error) {
    return (
      <AdminLayout>
        <div className="min-h-[50vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-cyan-600 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    const err = error as Error;
    const isAuth = err.message?.toLowerCase().includes("autorisé") || err.message?.toLowerCase().includes("admin");
    return (
      <AdminLayout>
        <div className="p-6 lg:p-8 max-w-2xl mx-auto">
          <Card className="bg-white dark:bg-[var(--admin-card)] border-[var(--admin-border)]">
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Erreur
              </CardTitle>
              <CardDescription className="text-[var(--admin-muted)]">
                {isAuth ? "Session admin invalide. Reconnectez-vous." : "Impossible de charger les textes."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[var(--admin-foreground)] mb-4">{err.message}</p>
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
          <h1 className="text-3xl font-bold text-[var(--admin-foreground)] mb-1 flex items-center gap-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <FileText className="w-7 h-7 text-cyan-600" />
            Textes des pages (EN / FR)
          </h1>
          <p className="text-[var(--admin-muted)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Les sections à gauche correspondent aux fichiers de traduction du site (en.json / fr.json). Synchronisez pour importer tout le contenu, puis modifiez les textes.
          </p>
        </div>

        <Card className="mb-6 border-cyan-500/50 bg-cyan-50 dark:bg-cyan-950/30 dark:border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-[var(--admin-foreground)] text-base flex items-center gap-2">
              <Download className="w-5 h-5 text-cyan-600" />
              Synchroniser avec le site
            </CardTitle>
            <CardDescription className="text-[var(--admin-muted)]">
              Importe toutes les clés des fichiers <code className="text-xs bg-black/10 px-1 rounded">en.json</code> et <code className="text-xs bg-black/10 px-1 rounded">fr.json</code> du site dans la base. À faire une première fois ou après modification des fichiers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => seedMutation.mutate()}
              disabled={seedMutation.isPending}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              {seedMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Download className="w-4 h-4 mr-2" />}
              Synchroniser tout depuis les fichiers du site
            </Button>
            {seedMutation.isError && <p className="text-red-500 text-sm mt-2">{(seedMutation.error as Error).message}</p>}
          </CardContent>
        </Card>

        <div className="flex flex-col lg:flex-row gap-6">
          <Card className="lg:w-56 shrink-0 bg-white dark:bg-[var(--admin-card)] border-[var(--admin-border)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-[var(--admin-foreground)] text-sm font-medium">Sections</CardTitle>
              <CardDescription className="text-[var(--admin-muted)] text-xs">
                {sections.length} sections · {texts?.length ?? 0} clés en base
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              {sectionsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 text-cyan-600 animate-spin" />
                </div>
              ) : sections.length === 0 ? (
                <p className="text-[var(--admin-muted)] text-sm py-4">Aucune section. Vérifiez que les fichiers locales sont présents (build avec dist/locales).</p>
              ) : (
                <nav className="space-y-0.5">
                  {sections.map((section) => (
                    <button
                      key={section}
                      type="button"
                      onClick={() => setSelectedSection(section)}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${
                        currentSection === section ? "bg-cyan-600 text-white" : "text-[var(--admin-foreground)] hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <ChevronRight className="w-4 h-4 shrink-0" />
                      {sectionLabel(section)}
                    </button>
                  ))}
                </nav>
              )}
            </CardContent>
          </Card>

          <div className="flex-1 min-w-0">
            {currentSection ? (
              <Card className="bg-white dark:bg-[var(--admin-card)] border-[var(--admin-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--admin-foreground)]">{sectionLabel(currentSection)}</CardTitle>
                  <CardDescription className="text-[var(--admin-muted)]">
                    {itemsForSection.length} clé(s). Modifiez puis enregistrez chaque ligne.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {itemsForSection.length === 0 ? (
                    <p className="text-[var(--admin-muted)] py-8 text-center">
                      Aucune clé pour cette section. Cliquez sur « Synchroniser tout depuis les fichiers du site » ci-dessus pour importer le contenu.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {itemsForSection.map((row) => {
                        const local = dirty[row.id] ?? { textEn: row.textEn, textFr: row.textFr };
                        const hasChange = local.textEn !== row.textEn || local.textFr !== row.textFr;
                        return (
                          <div
                            key={row.id}
                            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-3"
                          >
                            <div className="font-mono text-sm text-[var(--admin-foreground)] break-all">{row.key}</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <Label className="text-xs text-[var(--admin-muted)]">EN</Label>
                                <Input
                                  value={local.textEn}
                                  onChange={(e) => setDirty((prev) => ({ ...prev, [row.id]: { ...local, textEn: e.target.value } }))}
                                  className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                                />
                              </div>
                              <div>
                                <Label className="text-xs text-[var(--admin-muted)]">FR</Label>
                                <Input
                                  value={local.textFr}
                                  onChange={(e) => setDirty((prev) => ({ ...prev, [row.id]: { ...local, textFr: e.target.value } }))}
                                  className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                                />
                              </div>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleSave(row.id, local.textEn, local.textFr)}
                              disabled={updateMutation.isPending || !hasChange}
                              className="bg-cyan-600 hover:bg-cyan-700 text-white"
                            >
                              {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Save className="w-4 h-4 mr-1" />}
                              Enregistrer
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              !sectionsLoading && (
                <Card className="bg-white dark:bg-[var(--admin-card)] border-[var(--admin-border)]">
                  <CardContent className="py-12 text-center text-[var(--admin-muted)]">
                    Sélectionnez une section à gauche.
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
