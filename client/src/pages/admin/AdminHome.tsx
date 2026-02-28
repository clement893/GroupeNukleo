import { Link } from "wouter";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminHeader } from "@/components/AdminHeader";
import { AdminSidebar } from "@/components/AdminSidebar";
import {
  LayoutDashboard,
  Loader2,
  BarChart3,
  MessageSquare,
  Building2,
  Settings,
  ArrowRight,
  Mail,
  Volume2,
  Globe,
  Database,
  TrendingUp,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import "@/styles/admin.css";

interface AdminCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

function AdminCard({ title, description, icon, href }: AdminCardProps) {
  return (
    <Link href={href}>
      <Card className="admin-home-card group cursor-pointer border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-md transition-all duration-200">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 group-hover:bg-[#6B1817]/10 group-hover:text-[#6B1817] transition-colors">
                {icon}
              </div>
              <div className="min-w-0">
                <CardTitle className="text-base font-semibold text-zinc-900 group-hover:text-[#6B1817] transition-colors">
                  {title}
                </CardTitle>
                <CardDescription className="mt-0.5 text-sm text-zinc-500 line-clamp-2">
                  {description}
                </CardDescription>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-zinc-400 group-hover:text-[#6B1817] group-hover:translate-x-0.5 transition-all" />
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

const ADMIN_CATEGORIES = [
  {
    title: "Analytics & Tracking",
    description: "Suivi et analyses des performances",
    sections: [
      { title: "Dashboard", description: "Vue d'ensemble des statistiques et métriques principales", icon: <LayoutDashboard className="h-5 w-5" />, href: "/admin/dashboard" },
      { title: "Analytics & Tracking", description: "Google Analytics, Facebook Pixel, LinkedIn Insight Tag", icon: <TrendingUp className="h-5 w-5" />, href: "/admin/analytics" },
      { title: "LEO Analytics", description: "Statistiques des interactions avec LEO", icon: <BarChart3 className="h-5 w-5" />, href: "/admin/leo-analytics" },
    ],
  },
  {
    title: "Gestion des Contacts & Leads",
    description: "Contacts, leads et messages",
    sections: [
      { title: "LEO Contacts", description: "Contacts et conversations LEO", icon: <MessageSquare className="h-5 w-5" />, href: "/admin/leo-contacts" },
      { title: "Agency Leads", description: "Leads et demandes des agences", icon: <Building2 className="h-5 w-5" />, href: "/admin/agency-leads" },
      { title: "Contact Messages", description: "Messages du formulaire de contact", icon: <MessageSquare className="h-5 w-5" />, href: "/admin/contact-messages" },
      { title: "Start Project Submissions", description: "Demandes de projets Start Project", icon: <FileText className="h-5 w-5" />, href: "/admin/start-project-submissions" },
      { title: "AI News Subscribers", description: "Abonnés à la newsletter AI News", icon: <Mail className="h-5 w-5" />, href: "/admin/ai-news-subscribers" },
      { title: "Témoignages", description: "Synchroniser les témoignages", icon: <MessageSquare className="h-5 w-5" />, href: "/admin/testimonials" },
    ],
  },
  {
    title: "Configuration & Paramètres",
    description: "Paramètres du site",
    sections: [
      { title: "Visibilité des Pages", description: "Contrôler l'accès aux pages du site", icon: <Globe className="h-5 w-5" />, href: "/admin/page-visibility" },
      { title: "Gestion des Loaders", description: "Animations de chargement et rotation", icon: <Loader2 className="h-5 w-5" />, href: "/admin/loader-migration" },
      { title: "Gestion des Sons", description: "Sons interactifs de l'interface", icon: <Volume2 className="h-5 w-5" />, href: "/admin/sounds" },
      { title: "Images de Projets", description: "Uploader et gérer les images projets", icon: <ImageIcon className="h-5 w-5" />, href: "/admin/projects-images" },
    ],
  },
  {
    title: "Outils de Développement",
    description: "Migrations et technique",
    sections: [
      { title: "Migration DB", description: "Créer les tables (page_visibility, analytics)", icon: <Database className="h-5 w-5" />, href: "/admin/run-migration" },
      { title: "Migration Loaders", description: "Sanitiser les loaders HTML (a11y, SEO)", icon: <Database className="h-5 w-5" />, href: "/admin/loader-migration" },
    ],
  },
];

const totalSections = ADMIN_CATEGORIES.reduce((sum, c) => sum + c.sections.length, 0);

export default function AdminHome() {
  return (
    <div className="admin-app min-h-screen bg-zinc-50" data-admin-panel>
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 min-h-[calc(100vh-3.5rem)] overflow-auto">
          <div className="p-6 lg:p-8 max-w-5xl">
            <header className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                Administration
              </h1>
              <p className="mt-1 text-zinc-500">
                Centre de contrôle Nukleo Digital
              </p>
            </header>

            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="border border-zinc-200 bg-white">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Pages admin
                  </CardDescription>
                  <CardTitle className="text-2xl font-bold text-zinc-900">{totalSections}</CardTitle>
                </CardHeader>
              </Card>
              <Card className="border border-zinc-200 bg-white">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Statut
                  </CardDescription>
                  <CardTitle className="text-2xl font-bold flex items-center gap-2 text-zinc-900">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    En ligne
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card className="border border-zinc-200 bg-white">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Catégories
                  </CardDescription>
                  <CardTitle className="text-2xl font-bold text-zinc-900">{ADMIN_CATEGORIES.length}</CardTitle>
                </CardHeader>
              </Card>
              <Card className="border border-zinc-200 bg-white">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Dernière MAJ
                  </CardDescription>
                  <CardTitle className="text-lg font-bold text-zinc-900">Aujourd'hui</CardTitle>
                </CardHeader>
              </Card>
            </section>

            <div className="space-y-8">
              {ADMIN_CATEGORIES.map((category, idx) => (
                <section key={idx}>
                  <div className="mb-3">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                      {category.title}
                    </h2>
                    <p className="text-zinc-600 mt-0.5">{category.description}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {category.sections.map((section) => (
                      <AdminCard key={section.href} {...section} />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <footer className="mt-10 p-4 rounded-xl bg-white border border-zinc-200">
              <div className="flex items-start gap-3">
                <Settings className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-zinc-900">Besoin d'aide ?</h3>
                  <p className="text-sm text-zinc-500 mt-1">
                    Pour ajouter de nouvelles sections admin, contactez l'équipe de développement ou consultez la documentation.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
