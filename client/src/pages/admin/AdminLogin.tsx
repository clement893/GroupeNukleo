import { useEffect, useState } from "react";
import { useLocation, useSearch } from "wouter";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import "@/styles/admin.css";

export default function AdminLogin() {
  const { isAuthenticated, login, loading, loginError, isLoggingIn } = useAdminAuth();
  const [, setLocation] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const from = params.get("from");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      const target = from && from.startsWith("/admin") && from !== "/admin/login" ? decodeURIComponent(from) : "/admin";
      setLocation(target);
    }
  }, [isAuthenticated, from, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) return;
    try {
      await login({ username: username.trim(), password });
    } catch {
      // Error shown via loginError
    }
  };

  if (loading) {
    return (
      <div className="admin-app min-h-screen bg-[#0f0f12] flex items-center justify-center p-4" data-admin-panel>
        <div className="w-full max-w-[400px]">
          <div className="rounded-2xl border border-white/10 bg-[#16161a] p-8 shadow-xl">
            <div className="mb-8 text-center">
              <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo" className="h-10 mx-auto" />
            </div>
            <h1 className="text-xl font-bold text-white text-center tracking-tight">Administration</h1>
            <p className="text-white/50 text-sm text-center mt-2">Vérification de la session...</p>
            <div className="mt-6 flex justify-center">
              <div className="inline-block w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-app min-h-screen bg-[#0f0f12] flex items-center justify-center p-4" data-admin-panel>
      <div className="w-full max-w-[400px]">
        <div className="rounded-2xl border border-white/10 bg-[#16161a] p-8 shadow-xl">
          <div className="mb-8 text-center">
            <img
              src="/Nukleo_blanc_RVB.svg"
              alt="Nukleo"
              className="h-10 mx-auto"
            />
          </div>
          <h1 className="text-xl font-bold text-white text-center tracking-tight">
            Administration
          </h1>
          <p className="text-white/50 text-sm text-center mt-2">
            Connectez-vous avec votre identifiant et mot de passe
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {loginError && (
              <div className="flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-200">{loginError}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="admin-username" className="text-white/80">Identifiant</Label>
              <Input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nukleo"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12 rounded-xl"
                autoComplete="username"
                required
                disabled={isLoggingIn}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password" className="text-white/80">Mot de passe</Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12 rounded-xl"
                autoComplete="current-password"
                required
                disabled={isLoggingIn}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-white hover:bg-zinc-100 text-zinc-900 font-semibold rounded-xl transition-colors"
              size="lg"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <p className="text-xs text-white/40 text-center mt-6 leading-relaxed">
            Accès réservé aux administrateurs Nukleo.
          </p>
        </div>
      </div>
    </div>
  );
}
