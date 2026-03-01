import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save, BarChart3, Facebook, Linkedin, CheckCircle2, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const PROVIDERS = [
  {
    id: "google-analytics",
    name: "Google Analytics 4",
    icon: BarChart3,
    description: "Suivi des visiteurs et conversions avec GA4",
    trackingLabel: "Measurement ID (G-XXXXXXXXXX)",
    placeholder: "G-XXXXXXXXXX",
    help: "Google Analytics > Admin > Data Streams",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "facebook-pixel",
    name: "Facebook Pixel",
    icon: Facebook,
    description: "Conversions et publicités Facebook",
    trackingLabel: "Pixel ID",
    placeholder: "123456789012345",
    help: "Facebook Events Manager",
    color: "from-blue-600 to-blue-700",
  },
  {
    id: "linkedin-insight",
    name: "LinkedIn Insight Tag",
    icon: Linkedin,
    description: "Conversions et publicités LinkedIn",
    trackingLabel: "Partner ID",
    placeholder: "123456",
    help: "LinkedIn Campaign Manager",
    color: "from-blue-700 to-blue-800",
  },
] as const;

type ProviderId = (typeof PROVIDERS)[number]["id"];

interface ConfigState {
  isEnabled: boolean;
  trackingId: string;
}

export default function AdminAnalytics() {
  const queryClient = useQueryClient();
  const { data: configs, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["admin", "analytics-config"],
    queryFn: async () => {
      const res = await fetch("/api/admin/analytics-config", { credentials: "include" });
      if (!res.ok) throw new Error(res.status === 401 ? "Connexion requise" : "Erreur chargement");
      return res.json();
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const [local, setLocal] = useState<Record<ProviderId, ConfigState>>({
    "google-analytics": { isEnabled: false, trackingId: "" },
    "facebook-pixel": { isEnabled: false, trackingId: "" },
    "linkedin-insight": { isEnabled: false, trackingId: "" },
  });

  useEffect(() => {
    if (configs && Array.isArray(configs)) {
      const next: Record<ProviderId, ConfigState> = {} as Record<ProviderId, ConfigState>;
      PROVIDERS.forEach((p) => {
        const c = configs.find((x: { provider: string }) => x.provider === p.id);
        next[p.id] = {
          isEnabled: c?.isEnabled ?? false,
          trackingId: c?.trackingId ?? "",
        };
      });
      setLocal(next);
    }
  }, [configs]);

  const upsertMutation = useMutation({
    mutationFn: async ({ provider, isEnabled, trackingId }: { provider: ProviderId; isEnabled: boolean; trackingId?: string }) => {
      const res = await fetch("/api/admin/analytics-config", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, isEnabled, trackingId: trackingId || undefined }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Erreur sauvegarde");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "analytics-config"] });
      toast.success("Configuration enregistrée");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const handleSave = (providerId: ProviderId) => {
    const c = local[providerId];
    if (!c) return;
    if (c.isEnabled && !c.trackingId.trim()) {
      toast.error("Indiquez un ID de suivi pour activer ce provider");
      return;
    }
    upsertMutation.mutate({
      provider: providerId,
      isEnabled: c.isEnabled,
      trackingId: c.trackingId.trim() || undefined,
    });
  };

  const handleSaveAll = () => {
    for (const p of PROVIDERS) {
      const c = local[p.id];
      if (c?.isEnabled && !c.trackingId.trim()) {
        toast.error(`ID de suivi requis pour ${p.name}`);
        return;
      }
    }
    Promise.all(
      PROVIDERS.map((p) => {
        const c = local[p.id];
        return fetch("/api/admin/analytics-config", {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: p.id,
            isEnabled: c?.isEnabled ?? false,
            trackingId: (c?.trackingId ?? "").trim() || undefined,
          }),
        });
      })
    ).then(() => {
      queryClient.invalidateQueries({ queryKey: ["admin", "analytics-config"] });
      toast.success("Toutes les configurations ont été enregistrées");
    });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6 lg:p-8 max-w-4xl mx-auto flex items-center justify-center min-h-[40vh]">
          <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="p-6 lg:p-8 max-w-4xl mx-auto text-center py-12">
          <p className="text-red-600 mb-4">{error instanceof Error ? error.message : "Erreur"}</p>
          <Button onClick={() => refetch()} className="bg-violet-600 hover:bg-violet-700 text-white">
            Réessayer
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--admin-foreground)] mb-1 flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-violet-500" />
            Analytics &amp; tracking
          </h1>
          <p className="text-[var(--admin-muted)]">
            Configurez Google Analytics, Facebook Pixel et LinkedIn Insight Tag. Les scripts sont chargés sur tout le site.
          </p>
        </div>

        <div className="space-y-6">
          {PROVIDERS.map((provider) => {
            const Icon = provider.icon;
            const c = local[provider.id];
            const isActive = c?.isEnabled && c?.trackingId;

            return (
              <Card key={provider.id} className="bg-white border-[var(--admin-border)] shadow-sm">
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${provider.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-[var(--admin-foreground)] flex items-center gap-2">
                          {provider.name}
                          {isActive && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                        </CardTitle>
                        <CardDescription className="text-[var(--admin-muted)] mt-0.5">
                          {provider.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`enable-${provider.id}`}
                        checked={c?.isEnabled ?? false}
                        onCheckedChange={() =>
                          setLocal((prev) => ({
                            ...prev,
                            [provider.id]: { ...prev[provider.id], isEnabled: !prev[provider.id]?.isEnabled },
                          }))
                        }
                      />
                      <Label htmlFor={`enable-${provider.id}`} className="text-[var(--admin-foreground)] cursor-pointer">
                        {c?.isEnabled ? "Activé" : "Désactivé"}
                      </Label>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`tracking-${provider.id}`} className="text-[var(--admin-foreground)]">
                      {provider.trackingLabel}
                    </Label>
                    <Input
                      id={`tracking-${provider.id}`}
                      value={c?.trackingId ?? ""}
                      onChange={(e) =>
                        setLocal((prev) => ({
                          ...prev,
                          [provider.id]: { ...prev[provider.id], trackingId: e.target.value },
                        }))
                      }
                      placeholder={provider.placeholder}
                      className="mt-2 bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-foreground)]"
                      disabled={!c?.isEnabled}
                    />
                    <p className="text-xs text-[var(--admin-muted)] mt-1">{provider.help}</p>
                  </div>
                  {c?.isEnabled && !c?.trackingId?.trim() && (
                    <p className="text-sm text-amber-600">Entrez un ID de suivi pour activer ce provider.</p>
                  )}
                  <div className="flex justify-end">
                    <Button
                      onClick={() => handleSave(provider.id)}
                      disabled={upsertMutation.isPending}
                      className="bg-violet-600 hover:bg-violet-700 text-white"
                    >
                      {upsertMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Enregistrer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSaveAll}
            disabled={upsertMutation.isPending}
            className="bg-violet-600 hover:bg-violet-700 text-white"
            size="lg"
          >
            <Save className="w-4 h-4 mr-2" />
            Enregistrer toutes les configurations
          </Button>
        </div>

        <Card className="bg-white border-[var(--admin-border)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-[var(--admin-foreground)]">À savoir</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-[var(--admin-muted)]">
              <li>• Les scripts sont chargés sur toutes les pages après sauvegarde.</li>
              <li>• Les conversions (formulaires contact, projet) sont suivies automatiquement.</li>
              <li>• Respectez la réglementation (consentement, politique de confidentialité).</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
