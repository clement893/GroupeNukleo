import { useState, useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Interface représentant un utilisateur administrateur authentifié.
 */
interface AdminUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

/**
 * Hook personnalisé pour gérer l'authentification administrateur.
 * 
 * Vérifie automatiquement l'état d'authentification au montage du composant
 * et fournit des méthodes pour se connecter et se déconnecter.
 * 
 * @returns Objet contenant :
 * - `user`: L'utilisateur admin authentifié ou `null`
 * - `loading`: État de chargement initial (`true` pendant la vérification)
 * - `isAuthenticated`: Booléen indiquant si l'utilisateur est authentifié
 * - `login`: Fonction pour rediriger vers la page de connexion Google OAuth
 * - `logout`: Fonction pour déconnecter l'utilisateur et rediriger vers `/admin/login`
 * 
 * @example
 * ```tsx
 * const { user, loading, isAuthenticated, login, logout } = useAdminAuth();
 * 
 * if (loading) return <div>Loading...</div>;
 * if (!isAuthenticated) return <button onClick={login}>Login</button>;
 * 
 * return (
 *   <div>
 *     <p>Welcome, {user.name}</p>
 *     <button onClick={logout}>Logout</button>
 *   </div>
 * );
 * ```
 */
export function useAdminAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      clearTimeout(timeoutId);
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    window.location.href = "/api/auth/google";
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setLocation("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  };
}
