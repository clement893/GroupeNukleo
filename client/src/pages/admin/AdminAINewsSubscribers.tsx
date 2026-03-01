import { trpc } from '@/lib/trpc';
import AdminRoute from '@/components/AdminRoute';
import { Card } from '@/components/ui/card';
import { Loader2, Mail, Calendar, Download } from 'lucide-react';
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function AdminAINewsSubscribers() {
  const { data: subscribers, isLoading, refetch } = trpc.admin.getAINewsSubscribers.useQuery();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  if (isLoading) {
    return (
      <AdminRoute>
        <AdminLayout>
          <div className="min-h-[50vh] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          </div>
        </AdminLayout>
      </AdminRoute>
    );
  }

  const exportToCSV = () => {
    if (!subscribers || !Array.isArray(subscribers) || subscribers.length === 0) return;

    const headers = ['ID', 'Email', 'Source', 'Created At'];
    const rows = subscribers.map((subscriber: any) => [
      subscriber.id,
      subscriber.email,
      subscriber.source || 'ai-trend-radar',
      new Date(subscriber.createdAt).toISOString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row: any[]) => row.map((cell: string | number) => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-news-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <AdminRoute>
      <AdminLayout>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <Mail className="w-8 h-8 text-cyan-400" />
                AI News Subscribers
              </h1>
              <p className="text-white/60">
                {subscribers?.length || 0} subscriber{subscribers?.length !== 1 ? 's' : ''} inscrit{subscribers?.length !== 1 ? 's' : ''} à la newsletter AI News
              </p>
            </div>
            {subscribers && subscribers.length > 0 && (
              <Button
                onClick={exportToCSV}
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Exporter CSV
              </Button>
            )}
          </div>

          {!subscribers || subscribers.length === 0 ? (
            <Card className="bg-white/5 backdrop-blur-md border-white/10 p-8 text-center">
              <Mail className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Aucun abonné</h3>
              <p className="text-white/60">
                Aucun email n'a encore été capturé depuis la page AI Trend Radar.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {subscribers && Array.isArray(subscribers) ? subscribers.map((subscriber: any) => (
                <Card
                  key={subscriber.id}
                  className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                  onClick={() => setExpandedId(expandedId === subscriber.id ? null : subscriber.id)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Mail className="w-5 h-5 text-cyan-400" />
                          <h3 className="text-lg font-semibold text-white">
                            {subscriber.email}
                          </h3>
                          {subscriber.source && (
                            <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 text-xs">
                              {subscriber.source}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-white/60 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(subscriber.createdAt).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )) : null}
            </div>
          )}
        </div>
      </AdminLayout>
    </AdminRoute>
  );
}
