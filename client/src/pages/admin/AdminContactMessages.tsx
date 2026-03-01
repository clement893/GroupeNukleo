import { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { Download, Mail, Building, Calendar, FileText, User, MessageSquare } from 'lucide-react';

export default function AdminContactMessages() {
  const { data: messages, isLoading, refetch } = trpc.admin.getContactMessages.useQuery();
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  const exportToCSV = () => {
    if (!messages || !Array.isArray(messages) || messages.length === 0) return;

    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Company', 'Message', 'Created At'];
    const rows = messages.map(msg => [
      msg.id.toString(),
      msg.firstName,
      msg.lastName,
      msg.email,
      msg.company,
      msg.message.replace(/,/g, ';').replace(/\n/g, ' '), // Replace commas and newlines
      new Date(msg.createdAt).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `contact-messages-${new Date().toISOString().split('T')[0]}.csv`);
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

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Contact Messages
            </h1>
            <p className="text-gray-400">
              Gérer les messages reçus via le formulaire de contact
            </p>
          </div>
          <Button onClick={exportToCSV} disabled={!messages || messages.length === 0} className="gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white">
            <Download className="w-4 h-4" />
            Exporter CSV
          </Button>
        </div>

        {/* Stats */}
        {messages && messages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-400">Total Messages</CardDescription>
                <CardTitle className="text-3xl text-white">{messages.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-400">This Month</CardDescription>
                <CardTitle className="text-3xl text-white">
                  {messages.filter(m => {
                    const msgDate = new Date(m.createdAt);
                    const now = new Date();
                    return msgDate.getMonth() === now.getMonth() && msgDate.getFullYear() === now.getFullYear();
                  }).length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-400">This Week</CardDescription>
                <CardTitle className="text-3xl text-white">
                  {messages.filter(m => {
                    const msgDate = new Date(m.createdAt);
                    const now = new Date();
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return msgDate >= weekAgo;
                  }).length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-400">Today</CardDescription>
                <CardTitle className="text-3xl text-white">
                  {messages.filter(m => {
                    const msgDate = new Date(m.createdAt);
                    const today = new Date();
                    return msgDate.toDateString() === today.toDateString();
                  }).length}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        )}

        {/* Messages List */}
        {isLoading ? (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="py-12 text-center">
              <p className="text-gray-400">Chargement...</p>
            </CardContent>
          </Card>
        ) : !messages || messages.length === 0 ? (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="py-12 text-center">
              <MessageSquare className="w-16 h-16 text-gray-500 mx-auto mb-4 opacity-50" />
              <p className="text-gray-400">Aucun message pour le moment</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {messages && Array.isArray(messages) ? messages.map((message) => (
              <Card
                key={message.id}
                className={`cursor-pointer transition-all bg-white/5 backdrop-blur-sm border-white/20 hover:bg-white/10 ${
                  selectedMessage === message.id ? 'ring-2 ring-white/50 bg-white/10' : ''
                }`}
                onClick={() => setSelectedMessage(selectedMessage === message.id ? null : message.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 mb-2 text-white">
                        <User className="w-5 h-5 text-purple-400" />
                        {message.firstName} {message.lastName}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 flex-wrap text-gray-400">
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {message.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {message.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(message.createdAt)}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                {selectedMessage === message.id && (
                  <CardContent className="pt-0 border-t border-white/10">
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Message
                        </h4>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-300">{message.message}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/20 text-white hover:bg-white/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `mailto:${message.email}?subject=Re: Your message to Nukleo Digital&body=Hi ${message.firstName},%0D%0A%0D%0A`;
                          }}
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Reply via Email
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
