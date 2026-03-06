import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, FileText, TrendingUp, Activity, Database, BarChart3, Settings } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";

async function fetchAdminStats() {
  const res = await fetch("/api/admin/stats", { credentials: "include" });
  if (!res.ok) throw new Error(res.status === 401 ? "Non autorisé" : "Failed to load stats");
  return res.json();
}

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: fetchAdminStats,
    retry: 1,
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="text-gray-600 text-lg" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>Loading dashboard...</div>
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    {
      title: "LEO Sessions",
      value: stats?.leoSessions || 0,
      icon: MessageSquare,
      description: "Total chat sessions with LEO",
      color: "from-[#523DCB] to-[#523DCB]",
    },
    {
      title: "AI Assessments",
      value: stats?.aiAssessments || 0,
      icon: FileText,
      description: "Completed AI readiness assessments",
      color: "from-[#523DCB] to-pink-500",
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
    <AdminLayout>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>Admin Dashboard</h1>
              <p className="text-gray-600" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>Overview of all platform data and statistics</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
                      {stat.title}
                    </CardTitle>
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>{stat.value}</div>
                    <CardDescription className="text-gray-500 text-sm" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
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
                <CardTitle className="text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
                  <BarChart3 className="w-5 h-5" />
                  Analytics & Tracking
                </CardTitle>
                <CardDescription className="text-gray-500" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
                  Suivi et analyses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <a
                  href="/admin/analytics"
                  className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                >
                  <div className="text-gray-900 font-medium" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>Analytics & Tracking</div>
                  <div className="text-gray-500 text-sm" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>Google Analytics, Facebook Pixel, LinkedIn</div>
                </a>
                <a
                  href="/admin/leo-analytics"
                  className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                >
                  <div className="text-gray-900 font-medium" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>LEO Analytics</div>
                  <div className="text-gray-500 text-sm" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>View detailed LEO session data</div>
                </a>
              </CardContent>
            </Card>

            {/* Contacts & Leads */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
                  <MessageSquare className="w-5 h-5" />
                  Contacts & Leads
                </CardTitle>
                <CardDescription className="text-gray-500" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
                  Gestion des contacts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <a
                  href="/admin/leo-contacts"
                  className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                >
                  <div className="text-gray-900 font-medium" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>LEO Contacts</div>
                  <div className="text-gray-500 text-sm" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>View emails captured by LEO chatbot</div>
                </a>
                <a
                  href="/admin/contact-messages"
                  className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                >
                  <div className="text-gray-900 font-medium" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>Contact Messages</div>
                  <div className="text-gray-500 text-sm" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>Manage contact form submissions</div>
                </a>
              </CardContent>
            </Card>

            {/* Configuration */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
                  <Settings className="w-5 h-5" />
                  Configuration
                </CardTitle>
                <CardDescription className="text-gray-500" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
                  Paramètres du site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <a
                  href="/admin/page-visibility"
                  className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                >
                  <div className="text-gray-900 font-medium" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>Page Visibility</div>
                  <div className="text-gray-500 text-sm" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>Manage page visibility settings</div>
                </a>
                <a
                  href="/admin/sounds"
                  className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                >
                  <div className="text-gray-900 font-medium" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>Sounds</div>
                  <div className="text-gray-500 text-sm" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>Manage interface sounds</div>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>Recent Activity</CardTitle>
              <CardDescription className="text-gray-500" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
                Latest platform updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
                  <div>
                    <div className="text-gray-900 text-sm" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>System operational</div>
                    <div className="text-gray-500 text-xs" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>All services running normally</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                  <div>
                    <div className="text-gray-900 text-sm" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>Database connected</div>
                    <div className="text-gray-500 text-xs" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>PostgreSQL on Railway</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#523DCB] mt-2" />
                  <div>
                    <div className="text-gray-900 text-sm" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>LEO AI active</div>
                    <div className="text-gray-500 text-xs" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>Chatbot responding to queries</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
  );
}
