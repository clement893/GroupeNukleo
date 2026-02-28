import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { LogOut, User, LayoutDashboard } from "lucide-react";
import { Link } from "wouter";

export function AdminHeader() {
  const { user, logout } = useAdminAuth();

  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f0f12]/95 backdrop-blur-md">
      <div className="flex items-center justify-between h-14 px-4 lg:px-6 container mx-auto">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo" width="100" height="28" className="h-7" />
            <span className="text-sm font-medium text-white/70 hidden sm:inline">Administration</span>
          </Link>
          <Link href="/admin" className="hidden sm:flex items-center gap-2 text-sm text-white/60 hover:text-white/90 transition-colors">
            <LayoutDashboard className="h-4 w-4" />
            Accueil
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/5">
            {user.picture ? (
              <img src={user.picture} alt="" width="28" height="28" className="w-7 h-7 rounded-full" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-white/80" />
              </div>
            )}
            <div className="hidden sm:block min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-white/60 truncate">{user.email}</p>
            </div>
          </div>
          <Button onClick={logout} variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
            <LogOut className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Déconnexion</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
