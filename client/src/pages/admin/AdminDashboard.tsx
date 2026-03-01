import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, FileText, TrendingUp, Activity, Database, BarChart3, Settings } from "lucide-react";
import AdminRoute from "@/components/AdminRoute";
import { AdminLayout } from "@/components/AdminLayout";

export default function AdminDashboard() {
  const { data: stats, isLoading } = trpc.admin.getStats.useQuery();

  if (isLoading) {
    return (
      <AdminRoute>
        <AdminLayout>
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="text-white text-lg">Loading dashboard...</div>
          </div>
        </AdminLayout>
      </AdminRoute>
    );
  }

  const statCards = [
    {
      title: "Total Agency Leads",
      value: stats?.agencyLeads || 0,
      icon: Users,
      description: "Leads from agency contact form",
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "LEO Sessions",
      value: stats?.leoSessions || 0,
      icon: MessageSquare,
      description: "Total chat sessions with LEO",
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "AI Assessments",
      value: stats?.aiAssessments || 0,
      icon: FileText,
      description: "Completed AI readiness assessments",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "LEO Contacts",
      value: stats?.leoContacts || 0,
      icon: Activity,
      description: "Contact information collected by LEO",
      color: "from-pink-500 to-red-500",
    },
    {
      title: "Media Assets",
      value: stats?.mediaAssets || 0,
      icon: Database,
      description: "Uploaded files and media",
      color: "from-orange-500 to-yellow-500",
    },
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: TrendingUp,
      description: "Registered users on the platform",
      color: "from-green-500 to-teal-500",
    },
  ];

  return (
    <AdminRoute>
      <AdminLayout>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-gray-300">Overview of all platform data and statistics</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-200">
                      {stat.title}
                    </CardTitle>
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <CardDescription className="text-gray-400 text-sm">
                      {stat.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Links - Organized by Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Analytics & Tracking */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Analytics & Tracking
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Suivi et analyses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <a
                  href="/admin/analytics"
                  className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="text-white font-medium">Analytics & Tracking</div>
                  <div className="text-gray-400 text-sm">Google Analytics, Facebook Pixel, LinkedIn</div>
                </a>
                <a
                  href="/admin/leo-analytics"
                  className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="text-white font-medium">LEO Analytics</div>
                  <div className="text-gray-400 text-sm">View detailed LEO session data</div>
                </a>
              </CardContent>
            </Card>

            {/* Contacts & Leads */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Contacts & Leads
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Gestion des contacts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <a
                  href="/admin/leo-contacts"
                  className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="text-white font-medium">LEO Contacts</div>
                  <div className="text-gray-400 text-sm">View emails captured by LEO chatbot</div>
                </a>
                <a
                  href="/admin/agency-leads"
                  className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="text-white font-medium">Agency Leads</div>
                  <div className="text-gray-400 text-sm">Manage agency contact submissions</div>
                </a>
                <a
                  href="/admin/contact-messages"
                  className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="text-white font-medium">Contact Messages</div>
                  <div className="text-gray-400 text-sm">Manage contact form submissions</div>
                </a>
              </CardContent>
            </Card>

            {/* Configuration */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Configuration
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Paramètres du site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <a
                  href="/admin/page-visibility"
                  className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="text-white font-medium">Page Visibility</div>
                  <div className="text-gray-400 text-sm">Manage page visibility settings</div>
                </a>
                <a
                  href="/admin/loader-migration"
                  className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="text-white font-medium">Loaders</div>
                  <div className="text-gray-400 text-sm">Manage loading animations</div>
                </a>
                <a
                  href="/admin/sounds"
                  className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="text-white font-medium">Sounds</div>
                  <div className="text-gray-400 text-sm">Manage interface sounds</div>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <CardDescription className="text-gray-400">
                Latest platform updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
                  <div>
                    <div className="text-white text-sm">System operational</div>
                    <div className="text-gray-400 text-xs">All services running normally</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                  <div>
                    <div className="text-white text-sm">Database connected</div>
                    <div className="text-gray-400 text-xs">PostgreSQL on Railway</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mt-2" />
                  <div>
                    <div className="text-white text-sm">LEO AI active</div>
                    <div className="text-gray-400 text-xs">Chatbot responding to queries</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </AdminRoute>
  );
}
