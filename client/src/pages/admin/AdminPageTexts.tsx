import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { flattenLocaleDeep, getSectionsFromFlatKeys, getKeysInSection } from "@/lib/localeUtils";
import { Loader2, Save, Languages, FileText } from "lucide-react";

import frLocale from "@/locales/fr.json";
import enLocale from "@/locales/en.json";

const SECTION_LABELS: Record<string, { fr: string; en: string }> = {
  common: { fr: "Commun", en: "Common" },
  nav: { fr: "Navigation", en: "Navigation" },
  header: { fr: "En-tête", en: "Header" },
  menu: { fr: "Menu", en: "Menu" },
  footer: { fr: "Pied de page", en: "Footer" },
  preFooter: { fr: "Avant-pied", en: "Pre-footer" },
  notFound: { fr: "Page 404", en: "404 Page" },
  alt: { fr: "Textes alternatifs", en: "Alt texts" },
  home: { fr: "Accueil", en: "Home" },
  services: { fr: "Services", en: "Services" },
  about: { fr: "À propos", en: "About" },
  contact: { fr: "Contact", en: "Contact" },
  projects: { fr: "Projets", en: "Projects" },
  resources: { fr: "Ressources", en: "Resources" },
  faq: { fr: "FAQ", en: "FAQ" },
  leo: { fr: "Leo", en: "Leo" },
  approche: { fr: "Approche", en: "Approach" },
  hero: { fr: "Hero", en: "Hero" },
  seo: { fr: "SEO", en: "SEO" },
};

function getSectionLabel(section: string, lang: "fr" | "en"): string {
  return SECTION_LABELS[section]?.[lang] ?? section;
}

export default function AdminPageTexts() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [dirty, setDirty] = useState<Record<string, { textEn: string; textFr: string }>>({});

  const { data: dbRows, isLoading } = trpc.pageTexts.getAll.useQuery(undefined, {
    staleTime: 60_000,
  });

  const updateMutation = trpc.pageTexts.update.useMutation();
  const createMutation = trpc.pageTexts.create.useMutation();
  const utils = trpc.useUtils();

  const { flatFr, flatEn, sections, keysInSection } = useMemo(() => {
    const flatFr = flattenLocaleDeep(frLocale as Record<string, unknown>);
    const flatEn = flattenLocaleDeep(enLocale as Record<string, unknown>);
    const allKeys = [...new Set([...Object.keys(flatFr), ...Object.keys(flatEn)])];
    const sections = getSectionsFromFlatKeys(allKeys);
    const keysInSection = selectedSection
      ? getKeysInSection(allKeys, selectedSection)
      : [];
    return { flatFr, flatEn, sections, keysInSection };
  }, [selectedSection]);

  const dbMap = useMemo(() => {
    const map = new Map<
      string,
      { id: number; key: string; textEn: string; textFr: string }
    >();
    if (!dbRows) return map;
    for (const row of dbRows) {
      map.set(row.key, {
        id: row.id,
        key: row.key,
        textEn: row.textEn,
        textFr: row.textFr,
      });
    }
    return map;
  }, [dbRows]);

  const getValue = (key: string, lang: "en" | "fr") => {
    if (dirty[key]) return dirty[key][lang === "en" ? "textEn" : "textFr"];
    const db = dbMap.get(key);
    if (db) return db[lang === "en" ? "textEn" : "textFr"];
    return lang === "en" ? (flatEn[key] ?? "") : (flatFr[key] ?? "");
  };

  const setValue = (key: string, lang: "en" | "fr", value: string) => {
    setDirty((prev) => ({
      ...prev,
      [key]: {
        textEn: lang === "en" ? value : getValue(key, "en"),
        textFr: lang === "fr" ? value : getValue(key, "fr"),
      },
    }));
  };

  const hasDirty = Object.keys(dirty).length > 0;

  const handleSave = async () => {
    for (const [key, values] of Object.entries(dirty)) {
      const row = dbMap.get(key);
      if (row) {
        await updateMutation.mutateAsync({
          id: row.id,
          textEn: values.textEn,
          textFr: values.textFr,
        });
      } else {
        await createMutation.mutateAsync({
          key,
          textEn: values.textEn,
          textFr: values.textFr,
        });
      }
    }
    setDirty({});
    await utils.pageTexts.getAll.invalidate();
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto flex items-center justify-center min-h-[40vh]">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--admin-muted)]" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Languages className="h-7 w-7" />
              Textes FR / EN
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Modifier les textes français et anglais de la plateforme. Les textes en base
              remplacent ceux des fichiers par défaut.
            </p>
          </div>
          {hasDirty && (
            <Button
              onClick={handleSave}
              disabled={updateMutation.isPending || createMutation.isPending}
              className="bg-[#6B1817] hover:bg-[#5a1312] text-white"
            >
              {(updateMutation.isPending || createMutation.isPending) ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Enregistrer les modifications
            </Button>
          )}
        </div>

        <div className="flex gap-6 min-h-[calc(100vh-12rem)]">
          {/* Left: sections (pages) */}
          <aside className="w-56 shrink-0">
            <Card className="bg-white border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Pages / sections
                </CardTitle>
                <CardDescription className="text-xs">
                  Cliquez sur une section pour afficher ses textes
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2">
                <nav className="space-y-0.5">
                  {sections.map((section) => {
                    const isActive = selectedSection === section;
                    return (
                      <button
                        key={section}
                        type="button"
                        onClick={() => setSelectedSection(section)}
                        className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? "text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        style={
                          isActive
                            ? {
                                background:
                                  "linear-gradient(to right, #6B1817, #523DCB)",
                              }
                            : undefined
                        }
                      >
                        {getSectionLabel(section, "fr")}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Right: contents for selected section */}
          <div className="flex-1 min-w-0">
            {!selectedSection ? (
              <Card className="bg-white border border-gray-200">
                <CardContent className="py-12 text-center text-gray-500">
                  Sélectionnez une section à gauche pour afficher et modifier les textes.
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">
                    {getSectionLabel(selectedSection, "fr")} — textes
                  </CardTitle>
                  <CardDescription>
                    {keysInSection.length} clé(s). Modifications non enregistrées :{" "}
                    {Object.keys(dirty).filter((k) =>
                      k === selectedSection || k.startsWith(selectedSection + ".")
                    ).length}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {keysInSection.map((key) => (
                      <div
                        key={key}
                        className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-lg bg-gray-50/80 border border-gray-100"
                      >
                        <div className="text-xs font-mono text-gray-500 truncate md:col-span-2">
                          {key}
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs font-medium text-gray-600">
                            Français
                          </Label>
                          <Input
                            value={getValue(key, "fr")}
                            onChange={(e) =>
                              setValue(key, "fr", e.target.value)
                            }
                            className="bg-white text-sm"
                            placeholder="Texte FR"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs font-medium text-gray-600">
                            English
                          </Label>
                          <Input
                            value={getValue(key, "en")}
                            onChange={(e) =>
                              setValue(key, "en", e.target.value)
                            }
                            className="bg-white text-sm"
                            placeholder="English text"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
