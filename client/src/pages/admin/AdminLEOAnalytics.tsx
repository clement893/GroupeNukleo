import { trpc } from '@/lib/trpc';
import { useIsAdminSession } from '@/hooks/useIsAdminSession';
import { Card } from '@/components/ui/card';
import { Loader2, TrendingUp, Users, MessageSquare, Clock, Mail } from 'lucide-react';
import { AdminLayout } from "@/components/AdminLayout";
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AdminLeoAnalytics() {
  const { isAdmin, isLoading: authLoading } = useIsAdminSession();
  const { data: analytics, isLoading } = trpc.leoAnalytics.getAnalytics.useQuery(undefined, {
    enabled: isAdmin,
  });

  if (authLoading || isLoading) {
    return (
      <AdminLayout>
        <div className="min-h-[50vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (!analytics) {
    return (
      <AdminLayout>
        <div className="min-h-[50vh] flex items-center justify-center">
          <p className="text-white">No analytics data available</p>
        </div>
      </AdminLayout>
    );
  }

  const { overview, byPage, funnel, timeSeries, recentSessions } = analytics;

  // Ensure arrays are safe
  const safeTimeSeries = Array.isArray(timeSeries) ? timeSeries : [];
  const safeRecentSessions = Array.isArray(recentSessions) ? recentSessions : [];

  // Chart data for time series
  const timeSeriesChartData = {
    labels: safeTimeSeries.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Sessions',
        data: safeTimeSeries.map(d => d.sessions),
        borderColor: 'rgb(34, 211, 238)',
        backgroundColor: 'rgba(34, 211, 238, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Conversions',
        data: safeTimeSeries.map(d => d.conversions),
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const timeSeriesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: 'rgba(255,255,255,0.7)' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      y: {
        ticks: { color: 'rgba(255,255,255,0.7)' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
  };

  // Funnel chart data
  const funnelChartData = {
    labels: ['Started', 'Engaged (3+ msgs)', 'Qualified (5+ msgs)', 'Converted'],
    datasets: [
      {
        label: 'Conversion Funnel',
        data: [funnel.started, funnel.engaged, funnel.qualified, funnel.converted],
        backgroundColor: [
          'rgba(34, 211, 238, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
        ],
      },
    ],
  };

  const funnelOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: { color: 'rgba(255,255,255,0.7)' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      y: {
        ticks: { color: 'rgba(255,255,255,0.7)' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">LEO Analytics Dashboard</h1>
          <p className="text-white/60">Monitor chatbot performance and user engagement</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-cyan-400" />
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-white/60 text-sm mb-1">Total Sessions</h3>
            <p className="text-3xl font-bold text-white">{overview.totalSessions}</p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <Mail className="w-8 h-8 text-purple-400" />
              <span className="text-sm text-white/60">{overview.completionRate.toFixed(1)}%</span>
            </div>
            <h3 className="text-white/60 text-sm mb-1">Email Conversions</h3>
            <p className="text-3xl font-bold text-white">{overview.completedSessions}</p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <MessageSquare className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-white/60 text-sm mb-1">Avg Messages</h3>
            <p className="text-3xl font-bold text-white">{overview.avgMessages.toFixed(1)}</p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-white/60 text-sm mb-1">Avg Duration</h3>
            <p className="text-3xl font-bold text-white">{Math.floor(overview.avgDuration / 60)}m {overview.avgDuration % 60}s</p>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Time Series Chart */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Sessions Over Time (Last 30 Days)</h3>
            <div style={{ height: '300px' }}>
              <Line data={timeSeriesChartData} options={timeSeriesOptions} />
            </div>
          </Card>

          {/* Funnel Chart */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Conversion Funnel</h3>
            <div style={{ height: '300px' }}>
              <Bar data={funnelChartData} options={funnelOptions} />
            </div>
          </Card>
        </div>

        {/* By Page Stats */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Performance by Page</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left text-white/60 py-3 px-4">Page</th>
                  <th className="text-right text-white/60 py-3 px-4">Sessions</th>
                  <th className="text-right text-white/60 py-3 px-4">Conversions</th>
                  <th className="text-right text-white/60 py-3 px-4">Rate</th>
                  <th className="text-right text-white/60 py-3 px-4">Avg Messages</th>
                  <th className="text-right text-white/60 py-3 px-4">Avg Duration</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(byPage).map(([page, stats]) => (
                  <tr key={page} className="border-b border-white/10">
                    <td className="text-white py-3 px-4 capitalize">{page}</td>
                    <td className="text-white text-right py-3 px-4">{stats.total}</td>
                    <td className="text-white text-right py-3 px-4">{stats.completed}</td>
                    <td className="text-white text-right py-3 px-4">{stats.completionRate.toFixed(1)}%</td>
                    <td className="text-white text-right py-3 px-4">{stats.avgMessages.toFixed(1)}</td>
                    <td className="text-white text-right py-3 px-4">{Math.floor(stats.avgDuration / 60)}m {Math.floor(stats.avgDuration % 60)}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Sessions */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Recent Sessions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left text-white/60 py-3 px-4">Session ID</th>
                  <th className="text-left text-white/60 py-3 px-4">Page</th>
                  <th className="text-left text-white/60 py-3 px-4">Started</th>
                  <th className="text-right text-white/60 py-3 px-4">Messages</th>
                  <th className="text-right text-white/60 py-3 px-4">Duration</th>
                  <th className="text-center text-white/60 py-3 px-4">Email</th>
                </tr>
              </thead>
              <tbody>
                {safeRecentSessions.map((session: any) => (
                  <tr key={session.sessionId} className="border-b border-white/10">
                    <td className="text-white/80 py-3 px-4 font-mono text-sm">{session.sessionId.slice(0, 8)}...</td>
                    <td className="text-white py-3 px-4 capitalize">{session.pageContext}</td>
                    <td className="text-white/80 py-3 px-4">{new Date(session.startedAt).toLocaleString()}</td>
                    <td className="text-white text-right py-3 px-4">{session.messageCount || 0}</td>
                    <td className="text-white text-right py-3 px-4">
                      {session.conversationDuration ? `${Math.floor(session.conversationDuration / 60)}m ${session.conversationDuration % 60}s` : '-'}
                    </td>
                    <td className="text-center py-3 px-4">
                      {session.emailCaptured === 1 ? (
                        <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                      ) : (
                        <span className="inline-block w-2 h-2 bg-gray-500 rounded-full"></span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
