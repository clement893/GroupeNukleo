import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

/**
 * Interface représentant un utilisateur administrateur authentifié.
 */
interface AdminUser {
  id: number;
  email: string;
  name: string;
  username?: string;
}

/**
 * Hook pour l'authentification admin (user / mot de passe).
 * Utilise tRPC adminAuth (checkAuth, login, logout).
 */
export function useAdminAuth() {
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();
  const { data, isLoading } = trpc.adminAuth.checkAuth.useQuery();
  const loginMutation = trpc.adminAuth.login.useMutation({
    onSuccess: () => {
      utils.adminAuth.checkAuth.invalidate();
    },
  });
  const logoutMutation = trpc.adminAuth.logout.useMutation({
    onSuccess: () => {
      utils.adminAuth.checkAuth.invalidate();
      setLocation("/admin/login");
    },
  });

  const user: AdminUser | null =
    data?.authenticated && data.admin
      ? {
          id: data.admin.id,
          email: data.admin.email,
          name: data.admin.username ?? data.admin.email,
          username: data.admin.username,
        }
      : null;

  const login = (credentials: { username: string; password: string }) => {
    return loginMutation.mutateAsync(credentials);
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  return {
    user,
    loading: isLoading,
    isAuthenticated: !!data?.authenticated && !!data?.admin,
    login,
    logout,
    loginError: loginMutation.error?.message ?? null,
    isLoggingIn: loginMutation.isPending,
  };
}
