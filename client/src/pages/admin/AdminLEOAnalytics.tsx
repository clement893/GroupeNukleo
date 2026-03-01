import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  TrendingUp,
  Users,
  MessageSquare,
  Clock,
  Mail,
  BarChart3,
  RefreshCw,
} from "lucide-react";

export default function AdminLEOAnalytics() {
  const {
    data: analytics,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin", "leo-analytics"],
    queryFn: async () => {
      const res = await fetch("/api/admin/leo-analytics", { credentials: "include" });
      if (!res.ok) throw new Error(res.status === 401 ? "Connexion requise" : "Erreur chargement");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6 lg:p-8 max-w-6xl mx-auto flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (isError || !analytics) {
    return (
      <AdminLayout>
        <div className="p-6 lg:p-8 max-w-6xl mx-auto text-center py-16">
          <p className="text-red-600 mb-4">{error instanceof Error ? error.message : "Aucune donnée disponible"}</p>
          <Button onClick={() => refetch()} className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Réessayer
          </Button>
        </div>
      </AdminLayout>
    );
  }

  const { overview, byPage, funnel, timeSeries, recentSessions } = analytics;
  const safeTimeSeries = Array.isArray(timeSeries) ? timeSeries : [];
  const safeRecentSessions = Array.isArray(recentSessions) ? recentSessions : [];
  const byPageEntries = typeof byPage === "object" && byPage !== null ? Object.entries(byPage) : [];

  const formatDuration = (seconds: number) => {
    if (!seconds || !Number.isFinite(seconds)) return "–";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}m ${s}s`;
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--admin-foreground)] mb-1 flex items-center gap-2">
              <BarChart3 className="w-8 h-8 text-cyan-500" />
              LEO Analytics
            </h1>
            <p className="text-[var(--admin-muted)]">
              Performances du chatbot LEO : sessions, conversions, entonnoir et dernières activités.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="border-[var(--admin-border)] text-[var(--admin-foreground)]"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white border-[var(--admin-border)] shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-cyan-500" />
                <span className="text-xs text-[var(--admin-muted)]">Sessions</span>
              </div>
              <p className="text-2xl font-bold text-[var(--admin-foreground)]">{overview?.totalSessions ?? 0}</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-[var(--admin-border)] shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Mail className="w-8 h-8 text-violet-500" />
                <span className="text-xs text-[var(--admin-muted)]">{overview?.completionRate?.toFixed(1) ?? 0} %</span>
              </div>
              <p className="text-2xl font-bold text-[var(--admin-foreground)]">{overview?.completedSessions ?? 0}</p>
              <p className="text-xs text-[var(--admin-muted)] mt-0.5">Conversions (email)</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-[var(--admin-border)] shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <MessageSquare className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-[var(--admin-foreground)]">
                {overview?.avgMessages?.toFixed(1) ?? "–"}
              </p>
              <p className="text-xs text-[var(--admin-muted)] mt-0.5">Messages / session (moy.)</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-[var(--admin-border)] shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-[var(--admin-foreground)]">
                {overview?.avgDuration != null ? formatDuration(overview.avgDuration) : "–"}
              </p>
              <p className="text-xs text-[var(--admin-muted)] mt-0.5">Durée moy. / session</p>
            </CardContent>
          </Card>
        </div>

        {/* Funnel */}
        <Card className="bg-white border-[var(--admin-border)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-[var(--admin-foreground)] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-500" />
              Entonnoir de conversion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 p-4 text-center">
                <p className="text-2xl font-bold text-[var(--admin-foreground)]">{funnel?.started ?? 0}</p>
                <p className="text-xs text-[var(--admin-muted)]">Démarrées</p>
              </div>
              <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-4 text-center">
                <p className="text-2xl font-bold text-[var(--admin-foreground)]">{funnel?.engaged ?? 0}</p>
                <p className="text-xs text-[var(--admin-muted)]">Engagées (3+ msgs)</p>
              </div>
              <div className="rounded-lg bg-violet-500/10 border border-violet-500/20 p-4 text-center">
                <p className="text-2xl font-bold text-[var(--admin-foreground)]">{funnel?.qualified ?? 0}</p>
                <p className="text-xs text-[var(--admin-muted)]">Qualifiées (5+ msgs)</p>
              </div>
              <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4 text-center">
                <p className="text-2xl font-bold text-[var(--admin-foreground)]">{funnel?.converted ?? 0}</p>
                <p className="text-xs text-[var(--admin-muted)]">Converties (email)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time series (last 30 days) */}
        {safeTimeSeries.length > 0 && (
          <Card className="bg-white border-[var(--admin-border)] shadow-sm">
            <CardHeader>
              <CardTitle className="text-[var(--admin-foreground)]">Sessions sur les 30 derniers jours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--admin-border)]">
                      <th className="text-left py-2 px-3 text-[var(--admin-muted)] font-medium">Date</th>
                      <th className="text-right py-2 px-3 text-[var(--admin-muted)] font-medium">Sessions</th>
                      <th className="text-right py-2 px-3 text-[var(--admin-muted)] font-medium">Conversions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {safeTimeSeries.map((d: { date: string; sessions: number; conversions: number }) => (
                      <tr key={d.date} className="border-b border-[var(--admin-border)]/50">
                        <td className="py-2 px-3 text-[var(--admin-foreground)]">
                          {new Date(d.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                        <td className="text-right py-2 px-3 text-[var(--admin-foreground)]">{d.sessions}</td>
                        <td className="text-right py-2 px-3 text-[var(--admin-foreground)]">{d.conversions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* By page */}
        {byPageEntries.length > 0 && (
          <Card className="bg-white border-[var(--admin-border)] shadow-sm">
            <CardHeader>
              <CardTitle className="text-[var(--admin-foreground)]">Par page</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--admin-border)]">
                      <th className="text-left py-3 px-4 text-[var(--admin-muted)] font-medium">Page</th>
                      <th className="text-right py-3 px-4 text-[var(--admin-muted)] font-medium">Sessions</th>
                      <th className="text-right py-3 px-4 text-[var(--admin-muted)] font-medium">Conversions</th>
                      <th className="text-right py-3 px-4 text-[var(--admin-muted)] font-medium">Taux</th>
                      <th className="text-right py-3 px-4 text-[var(--admin-muted)] font-medium">Msgs moy.</th>
                      <th className="text-right py-3 px-4 text-[var(--admin-muted)] font-medium">Durée moy.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {byPageEntries.map(([page, stats]) => (
                      <tr key={page} className="border-b border-[var(--admin-border)]/50">
                        <td className="py-3 px-4 text-[var(--admin-foreground)] capitalize">{page}</td>
                        <td className="text-right py-3 px-4 text-[var(--admin-foreground)]">{stats.total}</td>
                        <td className="text-right py-3 px-4 text-[var(--admin-foreground)]">{stats.completed}</td>
                        <td className="text-right py-3 px-4 text-[var(--admin-foreground)]">
                          {stats.completionRate?.toFixed(1) ?? "–"} %
                        </td>
                        <td className="text-right py-3 px-4 text-[var(--admin-foreground)]">
                          {stats.avgMessages?.toFixed(1) ?? "–"}
                        </td>
                        <td className="text-right py-3 px-4 text-[var(--admin-foreground)]">
                          {formatDuration(stats.avgDuration ?? 0)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent sessions */}
        <Card className="bg-white border-[var(--admin-border)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-[var(--admin-foreground)]">Dernières sessions (50)</CardTitle>
          </CardHeader>
          <CardContent>
            {safeRecentSessions.length === 0 ? (
              <p className="text-[var(--admin-muted)] text-sm py-6 text-center">Aucune session récente.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--admin-border)]">
                      <th className="text-left py-3 px-4 text-[var(--admin-muted)] font-medium">Session</th>
                      <th className="text-left py-3 px-4 text-[var(--admin-muted)] font-medium">Page</th>
                      <th className="text-left py-3 px-4 text-[var(--admin-muted)] font-medium">Début</th>
                      <th className="text-right py-3 px-4 text-[var(--admin-muted)] font-medium">Msgs</th>
                      <th className="text-right py-3 px-4 text-[var(--admin-muted)] font-medium">Durée</th>
                      <th className="text-center py-3 px-4 text-[var(--admin-muted)] font-medium">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {safeRecentSessions.map((session: {
                      sessionId: string;
                      pageContext: string;
                      startedAt: string;
                      messageCount?: number;
                      conversationDuration?: number;
                      emailCaptured?: number;
                    }) => (
                      <tr key={session.sessionId} className="border-b border-[var(--admin-border)]/50">
                        <td className="py-3 px-4 font-mono text-xs text-[var(--admin-foreground)]">
                          {session.sessionId.slice(0, 8)}…
                        </td>
                        <td className="py-3 px-4 text-[var(--admin-foreground)] capitalize">{session.pageContext}</td>
                        <td className="py-3 px-4 text-[var(--admin-muted)]">
                          {new Date(session.startedAt).toLocaleString("fr-FR")}
                        </td>
                        <td className="text-right py-3 px-4 text-[var(--admin-foreground)]">
                          {session.messageCount ?? 0}
                        </td>
                        <td className="text-right py-3 px-4 text-[var(--admin-foreground)]">
                          {formatDuration(session.conversationDuration ?? 0)}
                        </td>
                        <td className="text-center py-3 px-4">
                          {session.emailCaptured === 1 ? (
                            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500" title="Email capturé" />
                          ) : (
                            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[var(--admin-border)]" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
