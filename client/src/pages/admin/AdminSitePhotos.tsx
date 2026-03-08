import React, { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { AdminLayout } from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, ImageIcon, Loader2, AlertCircle, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import "@/styles/admin.css";

const ACCEPT_IMAGES = "image/jpeg,image/png,image/webp,image/gif,image/svg+xml,.jpg,.jpeg,.png,.webp,.gif,.svg";

/** Convert object-position string to { x: 0-100, y: 0-100 } */
function parseObjectPosition(pos: string): { x: number; y: number } {
  const m = pos.match(/^(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/);
  if (m) return { x: parseFloat(m[1]), y: parseFloat(m[2]) };
  const keywords: Record<string, { x: number; y: number }> = {
    center: { x: 50, y: 50 },
    top: { x: 50, y: 0 },
    bottom: { x: 50, y: 100 },
    left: { x: 0, y: 50 },
    right: { x: 100, y: 50 },
    "center top": { x: 50, y: 0 },
    "center bottom": { x: 50, y: 100 },
    "left top": { x: 0, y: 0 },
    "left bottom": { x: 0, y: 100 },
    "right top": { x: 100, y: 0 },
    "right bottom": { x: 100, y: 100 },
  };
  return keywords[pos] ?? { x: 50, y: 50 };
}

function toObjectPosition(x: number, y: number): string {
  return `${Math.round(x)}% ${Math.round(y)}%`;
}

const PHOTO_KEYS = [
  "hero_cover",
  "header_logo",
  "footer_logo",
  "menu_logo",
  "nukleo_logo",
  "rob_logo",
  "union_fallback",
  "leader_clement",
  "leader_lionel",
] as const;

const PHOTO_LABELS: Record<string, string> = {
  hero_cover: "Image hero (bannière accueil)",
  header_logo: "Logo header",
  footer_logo: "Logo footer (blanc)",
  menu_logo: "Logo menu",
  nukleo_logo: "Logo Nukleo (bloc entreprise)",
  rob_logo: "Logo Rouge On Blue (bloc entreprise)",
  union_fallback: "Image fallback section Union",
  leader_clement: "Photo Clément Roy",
  leader_lionel: "Photo Lionel Pardin",
};

/** Emplacement sur la page principale pour chaque photo */
const PHOTO_USAGE: Record<string, string> = {
  hero_cover: "Hero accueil",
  header_logo: "Header",
  footer_logo: "Footer",
  menu_logo: "Menu plein écran",
  nukleo_logo: "Bloc Nukleo",
  rob_logo: "Bloc Rouge On Blue",
  union_fallback: "Section Union",
  leader_clement: "Section Leaders",
  leader_lionel: "Section Leaders",
};

function getPreviewUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return url.startsWith("/") ? url : `/${url}`;
}

export default function AdminSitePhotos() {
  const getLocalizedPath = useLocalizedPath();
  const homepagePath = getLocalizedPath("/");
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [heroObjectPosition, setHeroObjectPosition] = useState("center");
  const [heroPositionSaving, setHeroPositionSaving] = useState(false);
  const [isR2, setIsR2] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOverKey, setDragOverKey] = useState<string | null>(null);

  const fetchPhotos = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/site-photos");
      const data = await res.json();
      const pos = data?.heroObjectPosition ?? "center";
      setPhotos(data?.photos ?? {});
      setHeroObjectPosition(pos);
      heroPositionRef.current = pos;
      setIsR2(data?.isR2 ?? false);
    } catch {
      setPhotos({});
      setIsR2(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const onDrop = useCallback((e: React.DragEvent, key: string) => {
    e.preventDefault();
    setDragOverKey(null);
    const file = e.dataTransfer.files[0];
    const ok = file && /^image\/(jpeg|png|gif|webp|svg\+xml)$/i.test(file.type);
    if (ok) {
      setSelectedKey(key);
      setSelectedFile(file);
    } else {
      toast.error("Déposez une image (JPG, PNG, WebP, GIF ou SVG)");
    }
  }, []);

  const onFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedKey(key);
      setSelectedFile(file);
    }
    e.target.value = "";
  }, []);

  const getUploadTokenQuery = trpc.adminAuth.getUploadToken.useQuery(undefined, { enabled: false });

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 Mo

  async function handleUpload() {
    if (!selectedKey || !selectedFile) return;
    if (!isR2) {
      toast.error("R2 non configuré. Définissez les variables R2_* pour activer les photos.");
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error(`Fichier trop volumineux (${(selectedFile.size / 1024 / 1024).toFixed(1)} Mo). Maximum : 50 Mo.`);
      return;
    }
    setUploadingKey(selectedKey);
    try {
      const result = await getUploadTokenQuery.refetch();
      const token = result.data?.token;
      if (!token) throw new Error("Session expirée. Reconnectez-vous.");
      const form = new FormData();
      form.append("key", selectedKey);
      form.append("image", selectedFile);
      const res = await fetch("/api/admin/site-photos/upload", {
        method: "POST",
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data?.error || (res.status === 401 ? "Session expirée. Reconnectez-vous." : "Erreur upload");
        throw new Error(msg);
      }
      setPhotos((prev) => ({ ...prev, [selectedKey]: data.url }));
      setSelectedKey(null);
      setSelectedFile(null);
      toast.success("Photo mise à jour");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur upload");
    } finally {
      setUploadingKey(null);
    }
  }

  const handleHeroCadrageChange = useCallback(
    async (value: string) => {
      setHeroPositionSaving(true);
      try {
        const result = await getUploadTokenQuery.refetch();
        const token = result.data?.token;
        if (!token) throw new Error("Session expirée. Reconnectez-vous.");
        const res = await fetch("/api/admin/site-photos/hero-position", {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ objectPosition: value }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || "Erreur");
        setHeroObjectPosition(value);
        toast.success("Cadrage mis à jour");
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Erreur");
      } finally {
        setHeroPositionSaving(false);
      }
    },
    [getUploadTokenQuery]
  );

  const heroCadrageRef = React.useRef<HTMLDivElement>(null);
  const heroPositionRef = React.useRef(heroObjectPosition);
  const [isDraggingCadrage, setIsDraggingCadrage] = useState(false);

  const handleHeroCadrageMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!photos.hero_cover || heroPositionSaving) return;
      e.preventDefault();
      setIsDraggingCadrage(true);
      const el = heroCadrageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      const pos = toObjectPosition(x, y);
      heroPositionRef.current = pos;
      setHeroObjectPosition(pos);
    },
    [photos.hero_cover, heroPositionSaving]
  );

  useEffect(() => {
    if (!isDraggingCadrage) return;
    const onMove = (e: MouseEvent) => {
      const el = heroCadrageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      const pos = toObjectPosition(x, y);
      heroPositionRef.current = pos;
      setHeroObjectPosition(pos);
    };
    const onUp = () => {
      setIsDraggingCadrage(false);
      handleHeroCadrageChange(heroPositionRef.current);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [isDraggingCadrage, handleHeroCadrageChange]);

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <ImageIcon className="w-8 h-8 text-[#523DCB]" />
            Photos de la page principale
          </h1>
          <p className="text-gray-300 mb-3">
            Gérez toutes les images de la page d&apos;accueil (logos, hero, photos leaders). Stockage R2. Formats : JPG, PNG, WebP, GIF, SVG (max 50 Mo).
          </p>
          <Link href={homepagePath} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700/50">
              <ExternalLink className="w-4 h-4 mr-2" />
              Voir la page principale
            </Button>
          </Link>
        </div>

        {!isR2 && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-900/30 border border-amber-700/50 text-amber-200">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm">
              R2 n&apos;est pas configuré. Les photos par défaut (fichiers statiques) sont affichées. Définissez R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY et R2_BUCKET_NAME pour activer l&apos;upload.
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-10 h-10 animate-spin text-[#523DCB]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PHOTO_KEYS.map((key) => {
              const url = photos[key] ?? "";
              const previewUrl = getPreviewUrl(url);
              const isUploading = uploadingKey === key;
              const hasSelected = selectedKey === key && selectedFile;

              return (
                <Card key={key} className="border border-gray-700 bg-gray-800/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-base" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
                      {PHOTO_LABELS[key] ?? key}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-xs flex items-center gap-2">
                      <span>{key}</span>
                      <span className="text-gray-500">•</span>
                      <span>{PHOTO_USAGE[key] ?? "—"}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="rounded-lg overflow-hidden bg-gray-900/50 aspect-video flex items-center justify-center min-h-[120px] border border-gray-700/50 relative">
                      {previewUrl ? (
                        key === "hero_cover" ? (
                          <div
                            ref={heroCadrageRef}
                            onMouseDown={handleHeroCadrageMouseDown}
                            className="absolute inset-0 cursor-crosshair select-none"
                            style={{ background: "#e5e7eb" }}
                          >
                            <img
                              src={previewUrl}
                              alt={PHOTO_LABELS[key]}
                              className="w-full h-full object-cover pointer-events-none"
                              style={{ objectPosition: heroObjectPosition }}
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                              draggable={false}
                            />
                            {/* Focal point indicator */}
                            {(() => {
                              const { x, y } = parseObjectPosition(heroObjectPosition);
                              return (
                                <div
                                  className="absolute w-8 h-8 -ml-4 -mt-4 pointer-events-none border-2 border-white shadow-lg rounded-full"
                                  style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    background: "rgba(82, 61, 203, 0.6)",
                                  }}
                                />
                              );
                            })()}
                            {heroPositionSaving && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <Loader2 className="w-8 h-8 animate-spin text-white" />
                              </div>
                            )}
                            <span className="absolute bottom-1 left-1 text-[10px] text-white/80 bg-black/40 px-1.5 py-0.5 rounded">
                              Glisser pour cadrer
                            </span>
                          </div>
                        ) : (
                          <img
                            src={previewUrl}
                            alt={PHOTO_LABELS[key]}
                            className="max-w-full max-h-full w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        )
                      ) : (
                        <span className="text-gray-500 text-sm">Aucune image</span>
                      )}
                    </div>

                    {isR2 && (
                      <div
                        onDragOver={(e) => { e.preventDefault(); setDragOverKey(key); }}
                        onDragLeave={() => setDragOverKey(null)}
                        onDrop={(e) => onDrop(e, key)}
                        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer ${
                          dragOverKey === key ? "border-[#523DCB] bg-[#523DCB]/10" : "border-gray-600 hover:border-gray-500"
                        }`}
                      >
                        <input
                          type="file"
                          accept={ACCEPT_IMAGES}
                          onChange={(e) => onFileInput(e, key)}
                          className="hidden"
                          id={`site-photo-${key}`}
                        />
                        <label htmlFor={`site-photo-${key}`} className="cursor-pointer block">
                          <Upload className="w-6 h-6 mx-auto text-gray-500 mb-1" />
                          <p className="text-xs text-gray-400">Glisser ou cliquer</p>
                        </label>
                        {hasSelected && (
                          <div className="mt-2">
                            <p className="text-xs text-gray-300 truncate">{selectedFile!.name}</p>
                            <Button
                              size="sm"
                              onClick={handleUpload}
                              disabled={isUploading}
                              className="mt-2"
                              style={{ background: "linear-gradient(to right, #6B1817, #523DCB)" }}
                            >
                              {isUploading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Remplacer"}
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
