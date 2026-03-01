import { trpc } from '@/lib/trpc';
import AdminRoute from '@/components/AdminRoute';
import { Card } from '@/components/ui/card';
import { Loader2, Mail, User, Calendar, MessageSquare, Download } from 'lucide-react';
import AdminRoute from '@/components/AdminRoute';
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function AdminLEOContacts() {
  const { data: contacts, isLoading, refetch } = trpc.admin.getLeoContacts.useQuery();
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
    if (!contacts || !Array.isArray(contacts) || contacts.length === 0) return;

    const headers = ['ID', 'Email', 'Name', 'Created At', 'Context'];
    const rows = contacts.map((contact: any) => [
      contact.id,
      contact.email,
      contact.name || '',
      new Date(contact.createdAt).toISOString(),
      contact.conversationContext ? JSON.stringify(contact.conversationContext).substring(0, 100) : '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row: any[]) => row.map((cell: string | number) => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leo-contacts-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <AdminRoute>
      <AdminLayout>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">LEO Contacts</h1>
              <p className="text-white/60">Emails captured by LEO chatbot</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={exportToCSV}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button
                onClick={() => refetch()}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Refresh
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">Total Contacts</p>
                  <p className="text-3xl font-bold text-white">{contacts?.length || 0}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">With Names</p>
                  <p className="text-3xl font-bold text-white">
                    {contacts?.filter((c: any) => c.name).length || 0}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">Today</p>
                  <p className="text-3xl font-bold text-white">
                    {contacts?.filter((c: any) => {
                      const today = new Date();
                      const contactDate = new Date(c.createdAt);
                      return contactDate.toDateString() === today.toDateString();
                    }).length || 0}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </div>

          {/* Contacts Table */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">All Contacts</h2>
            
            {!contacts || contacts.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 text-lg">No contacts captured yet</p>
                <p className="text-white/40 text-sm mt-2">Contacts will appear here when users share their email with LEO</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left text-white/60 py-3 px-4 font-medium">ID</th>
                      <th className="text-left text-white/60 py-3 px-4 font-medium">Email</th>
                      <th className="text-left text-white/60 py-3 px-4 font-medium">Name</th>
                      <th className="text-left text-white/60 py-3 px-4 font-medium">Created</th>
                      <th className="text-center text-white/60 py-3 px-4 font-medium">Context</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts && Array.isArray(contacts) ? contacts.map((contact: any) => (
                      <>
                        <tr 
                          key={contact.id} 
                          className="border-b border-white/10 hover:bg-white/5 transition-colors"
                        >
                          <td className="text-white/80 py-4 px-4 font-mono text-sm">
                            #{contact.id}
                          </td>
                          <td className="text-white py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-cyan-400" />
                              <a 
                                href={`mailto:${contact.email}`}
                                className="hover:text-cyan-400 transition-colors"
                              >
                                {contact.email}
                              </a>
                            </div>
                          </td>
                          <td className="text-white py-4 px-4">
                            {contact.name ? (
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-purple-400" />
                                {contact.name}
                              </div>
                            ) : (
                              <span className="text-white/40 italic">No name</span>
                            )}
                          </td>
                          <td className="text-white/80 py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-green-400" />
                              {new Date(contact.createdAt).toLocaleString('fr-FR', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                          </td>
                          <td className="text-center py-4 px-4">
                            {contact.conversationContext ? (
                              <Button
                                onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
                                variant="ghost"
                                size="sm"
                                className="text-white/60 hover:text-white hover:bg-white/10"
                              >
                                <MessageSquare className="w-4 h-4 mr-1" />
                                {expandedId === contact.id ? 'Hide' : 'View'}
                              </Button>
                            ) : (
                              <span className="text-white/40 italic text-sm">No context</span>
                            )}
                          </td>
                        </tr>
                        {expandedId === contact.id && contact.conversationContext && (
                          <tr className="bg-white/5">
                            <td colSpan={5} className="py-4 px-4">
                              <div className="max-w-4xl">
                                <p className="text-white/60 text-sm font-semibold mb-2">Conversation Context:</p>
                                <div className="bg-black/20 rounded-lg p-4 text-white/80 text-sm whitespace-pre-wrap font-mono">
                                  {typeof contact.conversationContext === 'string' 
                                    ? contact.conversationContext 
                                    : JSON.stringify(contact.conversationContext, null, 2)}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    )) : null}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </AdminLayout>
    </AdminRoute>
  );
}
