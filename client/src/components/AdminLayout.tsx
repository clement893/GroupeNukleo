import { ReactNode } from "react";
import { AdminHeader } from "@/components/AdminHeader";
import { AdminSidebar } from "@/components/AdminSidebar";
import "@/styles/admin.css";

interface AdminLayoutProps {
  children: ReactNode;
}

/**
 * Layout commun pour toutes les pages admin : header + sidebar + zone principale.
 * Thème aligné sur le site : fond clair, typo Google Sans Flex, couleurs marque (bordeaux/violet).
 */
export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div
      className="admin-app min-h-screen bg-[#EFE8E8]"
      data-admin-panel
      style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
    >
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 min-h-[calc(100vh-3.5rem)] overflow-auto bg-[#EFE8E8]">
          {children}
        </main>
      </div>
    </div>
  );
}
