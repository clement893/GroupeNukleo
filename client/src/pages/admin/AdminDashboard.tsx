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
            <div className="text-gray-600 text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Loading dashboard...</div>
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Admin Dashboard</h1>
              <p className="text-gray-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Overview of all platform data and statistics</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {stat.title}
                    </CardTitle>
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stat.value}</div>
                    <CardDescription className="text-gray-500 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
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
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  <BarChart3 className="w-5 h-5" />
                  Analytics & Tracking
                </CardTitle>
                <CardDescription className="text-gray-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Suivi et analyses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <a
                  href="/admin/analytics"
                  className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                >
                  <div className="text-gray-900 font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Analytics & Tracking</div>
                  <div className="text-gray-500 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Google Analytics, Facebook Pixel, LinkedIn</div>
                </a>
                <a
                  href="/admin/leo-analytics"
                  className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                >
                  <div className="text-gray-900 font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>LEO Analytics</div>
                  <div className="text-gray-500 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>View detailed LEO session data</div>
                </a>
              </CardContent>
            </Card>

            {/* Contacts & Leads */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  <MessageSquare className="w-5 h-5" />
                  Contacts & Leads
                </CardTitle>
                <CardDescription className="text-gray-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Gestion des contacts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <a
                  href="/admin/leo-contacts"
                  className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                >
                  <div className="text-gray-900 font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>LEO Contacts</div>
                  <div className="text-gray-500 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>View emails captured by LEO chatbot</div>
                </a>
                <a
                  href="/admin/agency-leads"
                  className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                >
                  <div className="text-gray-900 font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Agency Leads</div>
                  <div className="text-gray-500 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Manage agency contact submissions</div>
                </a>
                <a
                  href="/admin/contact-messages"
                  className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                >
                  <div className="text-gray-900 font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Contact Messages</div>
                  <div className="text-gray-500 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Manage contact form submissions</div>
                </a>
              </CardContent>
            </Card>

            {/* Configuration */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  <Settings className="w-5 h-5" />
                  Configuration
                </CardTitle>
                <CardDescription className="text-gray-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Paramètres du site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <a
                  href="/admin/page-visibility"
                  className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                >
                  <div className="text-gray-900 font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Page Visibility</div>
                  <div className="text-gray-500 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Manage page visibility settings</div>
                </a>
                <a
                  href="/admin/loader-migration"
                  className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                >
                  <div className="text-gray-900 font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Loaders</div>
                  <div className="text-gray-500 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Manage loading animations</div>
                </a>
                <a
                  href="/admin/sounds"
                  className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                >
                  <div className="text-gray-900 font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Sounds</div>
                  <div className="text-gray-500 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Manage interface sounds</div>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Recent Activity</CardTitle>
              <CardDescription className="text-gray-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Latest platform updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
                  <div>
                    <div className="text-gray-900 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>System operational</div>
                    <div className="text-gray-500 text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>All services running normally</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                  <div>
                    <div className="text-gray-900 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Database connected</div>
                    <div className="text-gray-500 text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>PostgreSQL on Railway</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mt-2" />
                  <div>
                    <div className="text-gray-900 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>LEO AI active</div>
                    <div className="text-gray-500 text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Chatbot responding to queries</div>
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
