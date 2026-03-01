import { trpc } from '@/lib/trpc';
import { useIsAdminSession } from '@/hooks/useIsAdminSession';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useState, useRef } from 'react';
import {
  Upload,
  Trash2,
  Image as ImageIcon,
  Loader2,
  Pencil,
  ExternalLink,
  FolderInput,
} from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { PROJECTS_DATA, type ProjectData } from '@/data/projectsData';
import type { ProjectFilterCategory } from '@/data/projectsData';

const CATEGORIES: ProjectFilterCategory[] = [
  'Brand',
  'Site web',
  'Plateforme',
  'Marketing numérique',
  'Campagnes',
  'Transformation',
];

function projectToRecord(p: ProjectData) {
  return {
    slug: p.slug,
    key: p.key,
    title: p.title,
    client: p.client,
    year: p.year,
    category: p.category,
    services: p.services,
    websiteUrl: p.websiteUrl ?? '',
    description: { fr: p.description.fr, en: p.description.en },
    images: p.images,
  };
}

export default function AdminProjectsImages() {
  const { isAdmin, isLoading: authLoading } = useIsAdminSession();
  const { data: apiProjects, isLoading: projectsLoading, refetch: refetchProjects } =
    trpc.projects.listAdmin.useQuery(undefined, { enabled: isAdmin });
  const initMutation = trpc.projects.initFromClient.useMutation({
    onSuccess: () => {
      toast.success('Projets initialisés');
      refetchProjects();
    },
    onError: (e) => toast.error(e.message),
  });
  const updateMutation = trpc.projects.update.useMutation({
    onSuccess: () => {
      toast.success('Projet enregistré');
      setEditing(null);
      refetchProjects();
    },
    onError: (e) => toast.error(e.message),
  });

  const { data: images, isLoading: imagesLoading, refetch: refetchImages } =
    trpc.projectsImages.listAdmin.useQuery(undefined, { enabled: isAdmin });
  const deleteMutation = trpc.projectsImages.delete.useMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState<typeof apiProjects[0] | null>(null);

  const projects = (apiProjects && apiProjects.length > 0 ? apiProjects : PROJECTS_DATA.map(projectToRecord)) as Array<{
    slug: string;
    key: string;
    title: string;
    client: string;
    year: string;
    category: string;
    services: string;
    websiteUrl?: string;
    description: { fr: string; en: string };
    images: string[];
  }>;
  const isFromApi = Boolean(apiProjects && apiProjects.length > 0);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        if (!/\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)) {
          toast.error(`${file.name}: seuls les images sont acceptées`);
          continue;
        }
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`${file.name}: max 10 Mo`);
          continue;
        }
        const formData = new FormData();
        formData.append('image', file);
        const response = await fetch('/api/admin/projects-images/upload', {
          method: 'POST',
          body: formData,
          credentials: 'include',
        });
        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          throw new Error(err?.error || 'Échec upload');
        }
        toast.success(`${file.name} uploadé`);
      }
      await refetchImages();
    } catch (e: any) {
      toast.error(e.message || 'Échec upload');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteImage = async (filename: string) => {
    if (!confirm(`Supprimer ${filename} ?`)) return;
    try {
      await deleteMutation.mutateAsync({ filename });
      toast.success('Image supprimée');
      await refetchImages();
    } catch (e: any) {
      toast.error(e.message || 'Échec suppression');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' Ko';
    return (bytes / (1024 * 1024)).toFixed(1) + ' Mo';
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--admin-foreground)] mb-2">Projets</h1>
          <p className="text-[var(--admin-muted)]">
            Liste des projets du portfolio : titres, descriptions, liens et images. Modifiez les champs puis enregistrez. Les images sont gérées ci‑dessous.
          </p>
        </div>

        {authLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : (
          <>
            {!isFromApi && (
              <Card className="mb-6 bg-amber-500/10 border-amber-500/30">
                <CardContent className="py-4 flex items-center justify-between flex-wrap gap-3">
                  <p className="text-amber-800 dark:text-amber-200 text-sm">
                    Les projets affichés viennent du code (projectsData). Enregistrez-les une fois pour pouvoir les modifier ici.
                  </p>
                  <Button
                    onClick={() => initMutation.mutate({ projects: PROJECTS_DATA.map(projectToRecord) })}
                    disabled={initMutation.isPending}
                    className="gap-2"
                  >
                    {initMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <FolderInput className="w-4 h-4" />
                    )}
                    Initialiser depuis le site
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Liste des projets */}
            <Card className="mb-8 bg-white border-[var(--admin-border)] shadow-sm">
              <CardHeader>
                <CardTitle className="text-[var(--admin-foreground)]">Projets ({projects.length})</CardTitle>
                <CardDescription className="text-[var(--admin-muted)]">
                  Cliquez sur « Modifier » pour changer le titre, la description, le lien ou les images associées.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {projectsLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div
                        key={project.slug}
                        className="flex flex-wrap items-start gap-4 p-4 rounded-lg border border-gray-200 bg-gray-50/50 hover:bg-gray-50"
                      >
                        <div className="flex gap-2 shrink-0">
                          {project.images.slice(0, 3).map((img) => (
                            <div
                              key={img}
                              className="w-16 h-16 rounded overflow-hidden bg-gray-200 flex-shrink-0"
                            >
                              <img
                                src={`/projects/${img}`}
                                alt=""
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-[var(--admin-foreground)]">{project.title}</div>
                          <div className="text-sm text-[var(--admin-muted)]">
                            {project.client} · {project.year} · {project.category}
                          </div>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {project.description.fr || project.description.en}
                          </p>
                          {project.websiteUrl && (
                            <a
                              href={project.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-purple-600 hover:underline mt-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              {project.websiteUrl}
                            </a>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="shrink-0"
                          onClick={() => setEditing(project)}
                          disabled={!isFromApi}
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Modifier
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upload d'images */}
            <Card className="mb-8 bg-white border-[var(--admin-border)] shadow-sm">
              <CardHeader>
                <CardTitle className="text-[var(--admin-foreground)]">Upload d&apos;images</CardTitle>
                <CardDescription className="text-[var(--admin-muted)]">
                  JPG, PNG, GIF, WebP — max 10 Mo. Stockées dans <code className="text-xs bg-gray-100 px-1 rounded">/projects/</code>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    id="image-upload"
                    disabled={uploading}
                  />
                  <label htmlFor="image-upload">
                    <Button asChild disabled={uploading} className="cursor-pointer">
                      <span>
                        {uploading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Upload...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Choisir des images
                          </>
                        )}
                      </span>
                    </Button>
                  </label>
                  <span className="text-sm text-[var(--admin-muted)]">{images?.length ?? 0} images</span>
                </div>
              </CardContent>
            </Card>

            {/* Grille des images uploadées */}
            <Card className="bg-white border-[var(--admin-border)] shadow-sm">
              <CardHeader>
                <CardTitle className="text-[var(--admin-foreground)]">Images uploadées</CardTitle>
                <CardDescription className="text-[var(--admin-muted)]">
                  Supprimer ou réutiliser les noms dans les projets (ex. MonProjet_1.jpg).
                </CardDescription>
              </CardHeader>
              <CardContent>
                {imagesLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                  </div>
                ) : !images || images.length === 0 ? (
                  <div className="text-center py-12 text-[var(--admin-muted)]">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Aucune image. Uploadez-en ci‑dessus.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image) => (
                      <div
                        key={image.name}
                        className="group relative border border-gray-200 rounded-lg overflow-hidden bg-gray-50"
                      >
                        <div className="aspect-square relative">
                          <img
                            src={`/projects/${image.name}`}
                            alt={image.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteImage(image.name)}
                              disabled={deleteMutation.isPending}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Supprimer
                            </Button>
                          </div>
                        </div>
                        <div className="p-2">
                          <p className="text-xs font-medium text-gray-700 truncate" title={image.name}>
                            {image.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(image.size)} · {formatDistanceToNow(new Date(image.modified), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {/* Dialog d'édition */}
        <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Modifier le projet</DialogTitle>
            </DialogHeader>
            {editing && (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  updateMutation.mutate(editing);
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Slug</Label>
                    <Input
                      value={editing.slug}
                      onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Key</Label>
                    <Input
                      value={editing.key}
                      onChange={(e) => setEditing({ ...editing, key: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label>Titre</Label>
                  <Input
                    value={editing.title}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Client</Label>
                    <Input
                      value={editing.client}
                      onChange={(e) => setEditing({ ...editing, client: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Année</Label>
                    <Input
                      value={editing.year}
                      onChange={(e) => setEditing({ ...editing, year: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label>Catégorie</Label>
                  <select
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value as ProjectFilterCategory })}
                    className="w-full mt-1 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Services</Label>
                  <Input
                    value={editing.services}
                    onChange={(e) => setEditing({ ...editing, services: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Lien site (URL)</Label>
                  <Input
                    value={editing.websiteUrl ?? ''}
                    onChange={(e) => setEditing({ ...editing, websiteUrl: e.target.value || undefined })}
                    placeholder="https://..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Description (FR)</Label>
                  <Textarea
                    value={editing.description.fr}
                    onChange={(e) => setEditing({ ...editing, description: { ...editing.description, fr: e.target.value } })}
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Description (EN)</Label>
                  <Textarea
                    value={editing.description.en}
                    onChange={(e) => setEditing({ ...editing, description: { ...editing.description, en: e.target.value } })}
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Images (noms de fichiers, un par ligne ou séparés par des virgules)</Label>
                  <Textarea
                    value={editing.images.join('\n')}
                    onChange={(e) => {
                      const raw = e.target.value;
                      const list = raw.split(/[\n,]/).map((s) => s.trim()).filter(Boolean);
                      setEditing({ ...editing, images: list });
                    }}
                    rows={3}
                    placeholder="Projet_1.jpg&#10;Projet_2.png"
                    className="mt-1 font-mono text-sm"
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                    Annuler
                  </Button>
                  <Button type="submit" disabled={updateMutation.isPending}>
                    {updateMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    Enregistrer
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
