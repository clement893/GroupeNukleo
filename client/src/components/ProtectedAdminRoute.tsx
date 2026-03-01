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
      <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#0f0519] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4" />
          <p className="text-white/60">Vérification de l&apos;authentification...</p>
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
