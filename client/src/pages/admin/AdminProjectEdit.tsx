import { useRoute, Link, useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { useIsAdminSession } from '@/hooks/useIsAdminSession';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState, useMemo, useEffect } from 'react';
import { Loader2, ArrowLeft, FolderInput } from 'lucide-react';
import { toast } from 'sonner';
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

type ProjectRecord = ReturnType<typeof projectToRecord>;

export default function AdminProjectEdit() {
  const [, params] = useRoute('/admin/projects-images/edit/:slug');
  const [, setLocation] = useLocation();
  const slug = params?.slug ?? '';
  const { isAdmin, isLoading: authLoading } = useIsAdminSession();
  const { data: apiProjects, isLoading: projectsLoading, refetch: refetchProjects } =
    trpc.projects.listAdmin.useQuery(undefined, { enabled: isAdmin && !!slug });
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
      refetchProjects();
      setLocation('/admin/projects-images');
    },
    onError: (e) => toast.error(e.message),
  });

  const projects = useMemo(() => {
    if (apiProjects && apiProjects.length > 0) return apiProjects as ProjectRecord[];
    return PROJECTS_DATA.map(projectToRecord) as ProjectRecord[];
  }, [apiProjects]);

  const project = useMemo(
    () => projects.find((p) => p.slug === slug) ?? null,
    [projects, slug]
  );

  const [form, setForm] = useState<ProjectRecord | null>(null);
  const current = form ?? project;
  const isFromApi = Boolean(apiProjects && apiProjects.length > 0);

  useEffect(() => {
    if (project && (!form || form.slug !== project.slug)) setForm({ ...project });
  }, [project, form?.slug]);

  if (authLoading || (projectsLoading && !project)) {
    return (
      <AdminLayout>
        <div className="p-6 lg:p-8 flex items-center justify-center min-h-[40vh]">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--admin-muted)]" />
        </div>
      </AdminLayout>
    );
  }

  if (!slug || (!projectsLoading && !project)) {
    return (
      <AdminLayout>
        <div className="p-6 lg:p-8 container mx-auto max-w-2xl">
          <Card className="border-[var(--admin-border)]">
            <CardContent className="py-8 text-center">
              <p className="text-[var(--admin-muted)] mb-4">Projet introuvable.</p>
              <Button asChild variant="outline" className="gap-2">
                <Link href="/admin/projects-images">
                  <ArrowLeft className="w-4 h-4" />
                  Retour à la liste
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!current) return;
    if (!isFromApi) {
      toast.error('Cliquez d\'abord sur « Initialiser depuis le site » ci‑dessus pour pouvoir enregistrer.');
      return;
    }
    updateMutation.mutate(current);
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 container mx-auto max-w-3xl">
        <div className="mb-6 flex items-center gap-4">
          <Button asChild variant="ghost" size="sm" className="gap-2 text-[var(--admin-foreground)]">
            <Link href="/admin/projects-images">
              <ArrowLeft className="w-4 h-4" />
              Retour à la liste
            </Link>
          </Button>
        </div>

        <Card className="bg-white dark:bg-[var(--admin-card)] border-[var(--admin-border)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-[var(--admin-foreground)]">Modifier le projet</CardTitle>
            <CardDescription className="text-[var(--admin-muted)]">
              {current?.title} — modifiez les champs puis enregistrez.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!current ? (
              <Loader2 className="w-6 h-6 animate-spin text-[var(--admin-muted)]" />
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {!isFromApi && (
                  <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 space-y-3">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      Les projets ne sont pas encore enregistrés en base. Cliquez sur le bouton ci‑dessous pour les initialiser, puis vous pourrez enregistrer vos modifications.
                    </p>
                    <Button
                      type="button"
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
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-[var(--admin-foreground)]">Slug</Label>
                    <Input
                      value={current.slug}
                      onChange={(e) => setForm({ ...current, slug: e.target.value })}
                      className="mt-1 bg-background text-[var(--admin-foreground)]"
                    />
                  </div>
                  <div>
                    <Label className="text-[var(--admin-foreground)]">Key</Label>
                    <Input
                      value={current.key}
                      onChange={(e) => setForm({ ...current, key: e.target.value })}
                      className="mt-1 bg-background text-[var(--admin-foreground)]"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-[var(--admin-foreground)]">Titre</Label>
                  <Input
                    value={current.title}
                    onChange={(e) => setForm({ ...current, title: e.target.value })}
                    className="mt-1 bg-background text-[var(--admin-foreground)]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-[var(--admin-foreground)]">Client</Label>
                    <Input
                      value={current.client}
                      onChange={(e) => setForm({ ...current, client: e.target.value })}
                      className="mt-1 bg-background text-[var(--admin-foreground)]"
                    />
                  </div>
                  <div>
                    <Label className="text-[var(--admin-foreground)]">Année</Label>
                    <Input
                      value={current.year}
                      onChange={(e) => setForm({ ...current, year: e.target.value })}
                      className="mt-1 bg-background text-[var(--admin-foreground)]"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-[var(--admin-foreground)]">Catégorie</Label>
                  <select
                    value={current.category}
                    onChange={(e) => setForm({ ...current, category: e.target.value as ProjectFilterCategory })}
                    className="w-full mt-1 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm text-[var(--admin-foreground)]"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className="text-[var(--admin-foreground)]">Services</Label>
                  <Input
                    value={current.services}
                    onChange={(e) => setForm({ ...current, services: e.target.value })}
                    className="mt-1 bg-background text-[var(--admin-foreground)]"
                  />
                </div>
                <div>
                  <Label className="text-[var(--admin-foreground)]">Lien site (URL)</Label>
                  <Input
                    value={current.websiteUrl ?? ''}
                    onChange={(e) => setForm({ ...current, websiteUrl: e.target.value || undefined })}
                    placeholder="https://..."
                    className="mt-1 bg-background text-[var(--admin-foreground)]"
                  />
                </div>
                <div>
                  <Label className="text-[var(--admin-foreground)]">Description (FR)</Label>
                  <Textarea
                    value={current.description.fr}
                    onChange={(e) => setForm({ ...current, description: { ...current.description, fr: e.target.value } })}
                    rows={4}
                    className="mt-1 bg-background text-[var(--admin-foreground)]"
                  />
                </div>
                <div>
                  <Label className="text-[var(--admin-foreground)]">Description (EN)</Label>
                  <Textarea
                    value={current.description.en}
                    onChange={(e) => setForm({ ...current, description: { ...current.description, en: e.target.value } })}
                    rows={4}
                    className="mt-1 bg-background text-[var(--admin-foreground)]"
                  />
                </div>
                <div>
                  <Label className="text-[var(--admin-foreground)]">Images (un par ligne ou séparés par des virgules)</Label>
                  <Textarea
                    value={current.images.join('\n')}
                    onChange={(e) => {
                      const raw = e.target.value;
                      const list = raw.split(/[\n,]/).map((s) => s.trim()).filter(Boolean);
                      setForm({ ...current, images: list });
                    }}
                    rows={3}
                    placeholder="Projet_1.jpg&#10;Projet_2.png"
                    className="mt-1 font-mono text-sm bg-background text-[var(--admin-foreground)]"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" asChild>
                    <Link href="/admin/projects-images">Annuler</Link>
                  </Button>
                  <Button type="submit" disabled={!isFromApi || updateMutation.isPending}>
                    {updateMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    Enregistrer
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
