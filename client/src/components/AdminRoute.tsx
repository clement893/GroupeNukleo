import { useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const [location, setLocation] = useLocation();
  const { data, isLoading } = trpc.adminAuth.checkAuth.useQuery();

  useEffect(() => {
    if (!isLoading && !data?.authenticated) {
      const from = encodeURIComponent(location || "/admin");
      setLocation(`/admin/login?from=${from}`);
    }
  }, [data, isLoading, location, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-[#523DCB] to-slate-900">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!data?.authenticated) {
    return null;
  }

  return <>{children}</>;
}
