import { Link } from "wouter";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLayout } from "@/components/AdminLayout";
import {
  LayoutDashboard,
  Settings,
  ArrowRight,
  TrendingUp,
  Video,
  FileText,
  ImageIcon,
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
      <Card className="admin-home-card group cursor-pointer border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white transition-colors group-hover:opacity-90" style={{ background: 'linear-gradient(to right, #6B1817, #523DCB)' }}>
                {icon}
              </div>
              <div className="min-w-0">
                <CardTitle className="text-base font-semibold text-gray-900 group-hover:text-gray-900 transition-colors" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
                  {title}
                </CardTitle>
                <CardDescription className="mt-0.5 text-sm text-gray-600 line-clamp-2" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
                  {description}
                </CardDescription>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all" />
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
    ],
  },
  {
    title: "Configuration & Paramètres",
    description: "Paramètres du site",
    sections: [
      { title: "Images", description: "Photos page principale, logos carousel — gestion centralisée", icon: <ImageIcon className="h-5 w-5" />, href: "/admin/images" },
      { title: "Vidéo Union", description: "Vidéo de la section L'union de deux forces", icon: <Video className="h-5 w-5" />, href: "/admin/union-video" },
      { title: "Communiqué de presse", description: "PDF du bouton Notre communiqué de presse", icon: <FileText className="h-5 w-5" />, href: "/admin/press-release" },
    ],
  },
];

const totalSections = ADMIN_CATEGORIES.reduce((sum, c) => sum + c.sections.length, 0);

export default function AdminHome() {
  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 max-w-5xl">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
            Administration
          </h1>
          <p className="mt-1 text-gray-600" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
            Centre de contrôle Nukleo Digital
          </p>
        </header>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-medium uppercase tracking-wider text-gray-500" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
                Pages admin
              </CardDescription>
              <CardTitle className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>{totalSections}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-medium uppercase tracking-wider text-gray-500" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
                Statut
              </CardDescription>
              <CardTitle className="text-2xl font-bold flex items-center gap-2 text-gray-900" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                En ligne
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-medium uppercase tracking-wider text-gray-500" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
                Catégories
              </CardDescription>
              <CardTitle className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>{ADMIN_CATEGORIES.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-medium uppercase tracking-wider text-gray-500" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
                Dernière MAJ
              </CardDescription>
              <CardTitle className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>Aujourd'hui</CardTitle>
            </CardHeader>
          </Card>
        </section>

        <div className="space-y-8">
          {ADMIN_CATEGORIES.map((category, idx) => (
            <section key={idx}>
              <div className="mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-600" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
                  {category.title}
                </h2>
                <p className="text-gray-500 mt-0.5" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>{category.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {category.sections.map((section) => (
                  <AdminCard key={section.href} {...section} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-10 p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
          <div className="flex items-start gap-3">
            <Settings className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>Besoin d'aide ?</h3>
              <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
                Pour ajouter de nouvelles sections admin, contactez l'équipe de développement ou consultez la documentation.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </AdminLayout>
  );
}
