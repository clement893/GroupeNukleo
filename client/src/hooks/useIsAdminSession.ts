import { trpc } from '@/lib/trpc';

/**
 * Returns whether the current session is an admin (via tRPC auth.me).
 * Use this to enable admin-only queries/mutations only when the backend recognizes the user as admin,
 * avoiding 403 errors and console noise when the session is not yet established or not admin.
 */
export function useIsAdminSession() {
  const { data: user, isLoading } = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
  });
  return {
    isAdmin: Boolean(user?.role === 'admin'),
    isLoading,
    user,
  };
}
