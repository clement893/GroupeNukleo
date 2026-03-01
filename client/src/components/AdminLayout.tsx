import { ReactNode } from "react";
import { AdminHeader } from "@/components/AdminHeader";
import { AdminSidebar } from "@/components/AdminSidebar";
import "@/styles/admin.css";

interface AdminLayoutProps {
  children: ReactNode;
}

/**
 * Layout commun pour toutes les pages admin : header + sidebar + zone principale fond sombre.
 */
export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="admin-app min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/95 to-slate-900" data-admin-panel>
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 min-h-[calc(100vh-3.5rem)] overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
