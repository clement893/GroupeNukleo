import { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { Download, Mail, Building, Calendar, DollarSign, FileText, User } from 'lucide-react';

export default function AdminStartProjectSubmissions() {
  const { data: submissions, isLoading, refetch } = trpc.admin.getStartProjectSubmissions.useQuery();
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null);

  const exportToCSV = () => {
    if (!submissions || !Array.isArray(submissions) || submissions.length === 0) return;

    const headers = ['ID', 'Name', 'Email', 'Company', 'Project Type', 'Budget', 'Description', 'Created At'];
    const rows = submissions.map(sub => [
      sub.id.toString(),
      sub.name,
      sub.email,
      sub.company,
      sub.projectType,
      sub.budget,
      sub.description.replace(/,/g, ';'), // Replace commas in description
      new Date(sub.createdAt).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `start-project-submissions-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatProjectType = (type: string) => {
    const types: Record<string, string> = {
      'ai-strategy': 'AI Strategy & Consulting',
      'agentic-ai': 'Agentic AI Development',
      'ai-integration': 'AI Integration',
      'ai-training': 'AI Training & Workshops',
      'other': 'Other',
    };
    return types[type] || type;
  };

  const formatBudget = (budget: string) => {
    const budgets: Record<string, string> = {
      '10k-25k': '$10k - $25k',
      '25k-50k': '$25k - $50k',
      '50k-100k': '$50k - $100k',
      '100k+': '$100k+',
      'not-sure': 'Not sure yet',
    };
    return budgets[budget] || budget;
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Start Project Submissions
            </h1>
            <p className="text-gray-400">
              Gérer les demandes de projets soumises via le formulaire Start Project
            </p>
          </div>
          <Button onClick={exportToCSV} disabled={!submissions || submissions.length === 0} className="gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white">
            <Download className="w-4 h-4" />
            Exporter CSV
          </Button>
        </div>

        {/* Stats */}
        {submissions && submissions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-400">Total Submissions</CardDescription>
                <CardTitle className="text-3xl text-white">{submissions.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-400">This Month</CardDescription>
                <CardTitle className="text-3xl text-white">
                  {submissions.filter(s => {
                    const subDate = new Date(s.createdAt);
                    const now = new Date();
                    return subDate.getMonth() === now.getMonth() && subDate.getFullYear() === now.getFullYear();
                  }).length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-400">This Week</CardDescription>
                <CardTitle className="text-3xl text-white">
                  {submissions.filter(s => {
                    const subDate = new Date(s.createdAt);
                    const now = new Date();
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return subDate >= weekAgo;
                  }).length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-400">Today</CardDescription>
                <CardTitle className="text-3xl text-white">
                  {submissions.filter(s => {
                    const subDate = new Date(s.createdAt);
                    const today = new Date();
                    return subDate.toDateString() === today.toDateString();
                  }).length}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        )}

        {/* Submissions List */}
        {isLoading ? (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="py-12 text-center">
              <p className="text-gray-400">Chargement...</p>
            </CardContent>
          </Card>
        ) : !submissions || submissions.length === 0 ? (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="py-12 text-center">
              <p className="text-gray-400">Aucune soumission pour le moment</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions && Array.isArray(submissions) ? submissions.map((submission) => (
              <Card
                key={submission.id}
                className={`cursor-pointer transition-all bg-white/5 backdrop-blur-sm border-white/20 hover:bg-white/10 ${
                  selectedSubmission === submission.id ? 'ring-2 ring-white/50 bg-white/10' : ''
                }`}
                onClick={() => setSelectedSubmission(selectedSubmission === submission.id ? null : submission.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 mb-2 text-white">
                        <User className="w-5 h-5 text-[#523DCB]" />
                        {submission.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 flex-wrap text-gray-400">
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {submission.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {submission.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(submission.createdAt)}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <span className="px-3 py-1 bg-[#523DCB]/20 text-[#523DCB]/90 text-xs font-semibold rounded-full">
                        {formatProjectType(submission.projectType)}
                      </span>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {formatBudget(submission.budget)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                {selectedSubmission === submission.id && (
                  <CardContent className="pt-0 border-t border-white/10">
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Project Description
                        </h4>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-300">{submission.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/20 text-white hover:bg-white/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `mailto:${submission.email}`;
                          }}
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Send Email
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            )) : null}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
