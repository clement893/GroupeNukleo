import { trpc } from '@/lib/trpc';
import { useIsAdminSession } from '@/hooks/useIsAdminSession';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useRef, useMemo, useEffect } from 'react';
import { Link } from 'wouter';
import {
  Upload,
  Trash2,
  Image as ImageIcon,
  Loader2,
  Pencil,
  ExternalLink,
  FolderInput,
  LayoutGrid,
  LayoutPanelTop,
  Layers,
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
    featuredOnHomeTriptych: (p as any).featuredOnHomeTriptych ?? false,
    featuredOnProjectsTriptych: (p as any).featuredOnProjectsTriptych ?? false,
    featuredOnHomeCarousel: (p as any).featuredOnHomeCarousel ?? false,
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
  const setTriptychMutation = trpc.projects.setTriptychSlugs.useMutation({
    onSuccess: () => {
      toast.success('Triptyques enregistrés');
      refetchProjects();
    },
    onError: (e) => toast.error(e.message),
  });

  const { data: images, isLoading: imagesLoading, refetch: refetchImages } =
    trpc.projectsImages.listAdmin.useQuery(undefined, { enabled: isAdmin });
  const deleteMutation = trpc.projectsImages.delete.useMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

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
    featuredOnHomeTriptych?: boolean;
    featuredOnProjectsTriptych?: boolean;
    featuredOnHomeCarousel?: boolean;
  }>;
  const isFromApi = Boolean(apiProjects && apiProjects.length > 0);

  const defaultHomeSlugs = useMemo(
    () => projects.filter((p) => p.featuredOnHomeTriptych).slice(0, 3).map((p) => p.slug),
    [projects]
  );
  const defaultProjectsSlugs = useMemo(
    () => projects.filter((p) => p.featuredOnProjectsTriptych).slice(0, 3).map((p) => p.slug),
    [projects]
  );
  const [homeTriptychSlugs, setHomeTriptychSlugs] = useState<string[]>(() => defaultHomeSlugs);
  const [projectsTriptychSlugs, setProjectsTriptychSlugs] = useState<string[]>(() => defaultProjectsSlugs);
  useEffect(() => {
    setHomeTriptychSlugs(defaultHomeSlugs);
    setProjectsTriptychSlugs(defaultProjectsSlugs);
  }, [defaultHomeSlugs.join(','), defaultProjectsSlugs.join(',')]);

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
            {/* Triptyques en haut : toujours visible, choisir les 3 projets de chaque triptyque */}
            <Card className="mb-8 bg-white dark:bg-[var(--admin-card)] border-[var(--admin-border)] shadow-sm">
              <CardHeader>
                <CardTitle className="text-[var(--admin-foreground)]">Triptyques</CardTitle>
                <CardDescription className="text-[var(--admin-muted)]">
                  Choisissez les 3 projets affichés dans le triptyque de la page d&apos;accueil et les 3 de la page Projets (ordre = position 1, 2, 3).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isFromApi && (
                  <p className="text-sm text-amber-700 dark:text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                    Initialisez d&apos;abord les projets avec le bouton « Initialiser depuis le site » ci‑dessous pour pouvoir enregistrer la sélection des triptyques.
                  </p>
                )}
                <div>
                  <p className="text-sm font-medium text-[var(--admin-foreground)] mb-2 flex items-center gap-2">
                    <LayoutPanelTop className="w-4 h-4 text-amber-600" />
                    Triptyque page d&apos;accueil (3 projets)
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[0, 1, 2].map((i) => (
                      <div key={i}>
                        <label className="text-xs text-[var(--admin-muted)] block mb-1">Position {i + 1}</label>
                        <select
                          value={homeTriptychSlugs[i] ?? ''}
                          onChange={(e) => {
                            const v = e.target.value;
                            setHomeTriptychSlugs((prev) => {
                              const next = [...prev];
                              next[i] = v;
                              return next.slice(0, 3);
                            });
                          }}
                          className="w-full h-9 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-1 text-sm"
                        >
                          <option value="">— Aucun —</option>
                          {projects.map((p) => (
                            <option key={p.slug} value={p.slug}>{p.title}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--admin-foreground)] mb-2 flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4 text-violet-600" />
                    Triptyque page Projets (3 projets)
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[0, 1, 2].map((i) => (
                      <div key={i}>
                        <label className="text-xs text-[var(--admin-muted)] block mb-1">Position {i + 1}</label>
                        <select
                          value={projectsTriptychSlugs[i] ?? ''}
                          onChange={(e) => {
                            const v = e.target.value;
                            setProjectsTriptychSlugs((prev) => {
                              const next = [...prev];
                              next[i] = v;
                              return next.slice(0, 3);
                            });
                          }}
                          className="w-full h-9 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-1 text-sm"
                        >
                          <option value="">— Aucun —</option>
                          {projects.map((p) => (
                            <option key={p.slug} value={p.slug}>{p.title}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={() =>
                    setTriptychMutation.mutate({
                      homeTriptychSlugs: homeTriptychSlugs.filter(Boolean),
                      projectsTriptychSlugs: projectsTriptychSlugs.filter(Boolean),
                    })
                  }
                  disabled={!isFromApi || setTriptychMutation.isPending}
                  className="gap-2"
                >
                  {setTriptychMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : null}
                  Enregistrer la sélection des triptyques
                </Button>
              </CardContent>
            </Card>

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
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-sm text-[var(--admin-muted)]">
                              {project.client} · {project.year} · {project.category}
                            </span>
                            {project.featuredOnHomeTriptych && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40">
                                <LayoutPanelTop className="w-3 h-3" /> Triptyque accueil
                              </span>
                            )}
                            {project.featuredOnProjectsTriptych && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-violet-500/20 text-violet-700 dark:text-violet-300 border border-violet-500/40">
                                <LayoutGrid className="w-3 h-3" /> Triptyque Projets
                              </span>
                            )}
                            {project.featuredOnHomeCarousel && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40">
                                <Layers className="w-3 h-3" /> Carousel accueil
                              </span>
                            )}
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
                          className="shrink-0 text-[var(--admin-foreground)] border-[var(--admin-border)] hover:bg-muted hover:text-[var(--admin-foreground)]"
                          asChild
                        >
                          <Link href={`/admin/projects-images/edit/${project.slug}`}>
                            <Pencil className="w-4 h-4 mr-2" />
                            Modifier
                          </Link>
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
      </div>
    </AdminLayout>
  );
}
