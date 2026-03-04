import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  BarChart3,
  MessageSquare,
  FileText,
  Globe,
  Volume2,
  Image as ImageIcon,
  Database,
  TrendingUp,
  ChevronRight,
  LayoutGrid,
  Languages,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_GROUPS = [
  {
    label: "Analytics & Tracking",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Analytics", href: "/admin/analytics", icon: TrendingUp },
      { label: "LEO Analytics", href: "/admin/leo-analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Contacts & Leads",
    items: [
      { label: "LEO Contacts", href: "/admin/leo-contacts", icon: MessageSquare },
      { label: "Contact Messages", href: "/admin/contact-messages", icon: MessageSquare },
      { label: "Start Project", href: "/admin/start-project-submissions", icon: FileText },
      { label: "Témoignages", href: "/admin/testimonials", icon: MessageSquare },
    ],
  },
  {
    label: "Configuration",
    items: [
      { label: "Visibilité des pages", href: "/admin/page-visibility", icon: Globe },
      { label: "Textes FR/EN", href: "/admin/page-texts", icon: Languages },
      { label: "Sons", href: "/admin/sounds", icon: Volume2 },
      { label: "Projets", href: "/admin/projects-images", icon: ImageIcon },
      { label: "Logos carousel", href: "/admin/carousel-logos", icon: LayoutGrid },
    ],
  },
  {
    label: "Développement",
    items: [
      { label: "Migration DB", href: "/admin/run-migration", icon: Database },
    ],
  },
];

export function AdminSidebar() {
  const [location] = useLocation();

  return (
    <aside
      className="admin-sidebar w-56 shrink-0 border-r border-[var(--admin-border)] bg-[var(--admin-sidebar-bg)] flex flex-col"
      aria-label="Navigation admin"
    >
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-6">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--admin-muted)] px-2 mb-2">
              {group.label}
            </h3>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = location === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "text-white"
                          : "text-[var(--admin-foreground)] hover:bg-[var(--admin-hover)]"
                      )}
                      style={isActive ? { background: 'linear-gradient(to right, #6B1817, #523DCB)' } : undefined}
                    >
                      <Icon className="h-4 w-4 shrink-0 opacity-80" />
                      <span className="truncate">{item.label}</span>
                      <ChevronRight
                        className={cn(
                          "ml-auto h-4 w-4 shrink-0 opacity-50",
                          isActive && "opacity-80"
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
