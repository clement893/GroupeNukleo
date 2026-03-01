import { ReactNode } from "react";
import { Redirect, useLocation } from "wouter";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface ProtectedAdminRouteProps {
  children: ReactNode;
}

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const [location] = useLocation();
  const { isAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="admin-app min-h-screen bg-[#0f0f12] flex items-center justify-center p-4" data-admin-panel>
        <div className="w-full max-w-[400px]">
          <div className="rounded-2xl border border-white/10 bg-[#16161a] p-8 shadow-xl text-center">
            <div className="inline-block w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4" />
            <p className="text-sm text-white/50">Vérification de l&apos;authentification...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    const from = encodeURIComponent(location?.startsWith("/admin") ? location : "/admin");
    return <Redirect to={`/admin/login?from=${from}`} />;
  }

  return <>{children}</>;
}
