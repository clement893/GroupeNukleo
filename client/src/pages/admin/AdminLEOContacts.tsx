import { Fragment, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail, User, MessageSquare, Download, RefreshCw, MessageCircle } from 'lucide-react';
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from '@/components/ui/button';

async function fetchLeoContacts() {
  const res = await fetch('/api/admin/leo-contacts', { credentials: 'include' });
  if (!res.ok) throw new Error(res.status === 401 ? 'Non autorisé' : 'Erreur de chargement');
  return res.json();
}

async function fetchLeoAnalytics() {
  const res = await fetch('/api/admin/leo-analytics', { credentials: 'include' });
  if (!res.ok) throw new Error(res.status === 401 ? 'Non autorisé' : 'Erreur de chargement');
  return res.json();
}

export default function AdminLEOContacts() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const {
    data: contacts,
    isLoading: contactsLoading,
    isError: contactsError,
    refetch: refetchContacts,
  } = useQuery({
    queryKey: ['admin', 'leo-contacts'],
    queryFn: fetchLeoContacts,
    retry: 1,
  });

  const {
    data: analytics,
    isLoading: analyticsLoading,
    refetch: refetchAnalytics,
  } = useQuery({
    queryKey: ['admin', 'leo-analytics'],
    queryFn: fetchLeoAnalytics,
    retry: 1,
  });

  const sessions = analytics?.recentSessions ?? [];
  const isLoading = contactsLoading;
  const isError = contactsError;

  const exportToCSV = () => {
    if (!contacts || !Array.isArray(contacts) || contacts.length === 0) return;
    const headers = ['ID', 'Email', 'Name', 'Created At', 'Context'];
    const rows = contacts.map((c: { id: number; email: string; name?: string | null; createdAt: Date; conversationContext?: string | null }) => [
      c.id,
      c.email,
      c.name ?? '',
      new Date(c.createdAt).toISOString(),
      (c.conversationContext ?? '').substring(0, 200),
    ]);
    const csvContent = [
      headers.join(','),
      ...rows.map((row: (string | number)[]) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leo-contacts-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const refetchAll = () => {
    refetchContacts();
    refetchAnalytics();
  };

  if (isError) {
    return (
      <AdminLayout>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-red-400">Erreur de chargement</CardTitle>
              <CardDescription className="text-white/60">
                Impossible de charger les contacts LEO. Vérifiez la connexion à la base de données.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => refetchAll()} className="bg-cyan-500 hover:bg-cyan-600 text-white">
                <RefreshCw className="w-4 h-4 mr-2" />
                Réessayer
              </Button>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="min-h-[50vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  const contactList = Array.isArray(contacts) ? contacts : [];
  const today = new Date().toDateString();

  return (
    <AdminLayout>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Discussions avec Léo
              </h1>
              <p className="text-gray-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Contacts (emails capturés) et sessions de discussion avec le chatbot LEO
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={exportToCSV} variant="outline" disabled={contactList.length === 0}>
                <Download className="w-4 h-4 mr-2" />
                Exporter CSV
              </Button>
              <Button onClick={refetchAll} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Contacts (emails)</p>
                    <p className="text-3xl font-bold text-gray-900">{contactList.length}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-cyan-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Avec nom</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {contactList.filter((c: { name?: string | null }) => c.name).length}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Sessions LEO</p>
                    <p className="text-3xl font-bold text-gray-900">{sessions.length}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sessions / Discussions */}
          <Card className="bg-white border border-gray-200 shadow-sm mb-8">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <MessageCircle className="w-5 h-5" />
                Sessions de discussion (Léo)
              </CardTitle>
              <CardDescription className="text-gray-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Dernières sessions avec le chatbot, par page et avec email capturé si applicable
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analyticsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
                </div>
              ) : !sessions.length ? (
                <div className="text-center py-12 text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p>Aucune session pour le moment</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left text-gray-500 py-3 px-4 font-medium">Page</th>
                        <th className="text-left text-gray-500 py-3 px-4 font-medium">Messages</th>
                        <th className="text-left text-gray-500 py-3 px-4 font-medium">Email capturé</th>
                        <th className="text-left text-gray-500 py-3 px-4 font-medium">Début</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessions.map((session: { id: number; pageContext: string; messageCount: number; emailCaptured: number; capturedEmail?: string | null; startedAt: Date }) => (
                        <tr key={session.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{session.pageContext}</td>
                          <td className="py-3 px-4 text-gray-600">{session.messageCount ?? 0}</td>
                          <td className="py-3 px-4">
                            {session.emailCaptured === 1 && session.capturedEmail ? (
                              <a href={`mailto:${session.capturedEmail}`} className="text-cyan-600 hover:underline">
                                {session.capturedEmail}
                              </a>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {new Date(session.startedAt).toLocaleString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contacts (emails capturés) */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Contacts (emails laissés à Léo)
              </CardTitle>
              <CardDescription className="text-gray-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Liste des personnes ayant partagé leur email lors d’une discussion avec Léo
              </CardDescription>
            </CardHeader>
            <CardContent>
              {contactList.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Mail className="w-16 h-16 mx-auto mb-4 opacity-40" />
                  <p className="text-lg">Aucun contact pour le moment</p>
                  <p className="text-sm mt-2">Les contacts apparaîtront ici lorsque des visiteurs partageront leur email avec Léo</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left text-gray-500 py-3 px-4 font-medium">ID</th>
                        <th className="text-left text-gray-500 py-3 px-4 font-medium">Email</th>
                        <th className="text-left text-gray-500 py-3 px-4 font-medium">Nom</th>
                        <th className="text-left text-gray-500 py-3 px-4 font-medium">Date</th>
                        <th className="text-center text-gray-500 py-3 px-4 font-medium">Contexte</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contactList.map((contact: { id: number; email: string; name?: string | null; createdAt: Date; conversationContext?: string | null }) => (
                        <Fragment key={contact.id}>
                          <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4 font-mono text-sm text-gray-600">#{contact.id}</td>
                            <td className="py-4 px-4">
                              <a href={`mailto:${contact.email}`} className="text-cyan-600 hover:underline font-medium">
                                {contact.email}
                              </a>
                            </td>
                            <td className="py-4 px-4 text-gray-900">{contact.name ?? <span className="text-gray-400 italic">—</span>}</td>
                            <td className="py-4 px-4 text-gray-600">
                              {new Date(contact.createdAt).toLocaleString('fr-FR', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </td>
                            <td className="text-center py-4 px-4">
                              {contact.conversationContext ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
                                >
                                  <MessageSquare className="w-4 h-4 mr-1" />
                                  {expandedId === contact.id ? 'Masquer' : 'Voir'}
                                </Button>
                              ) : (
                                <span className="text-gray-400 text-sm">—</span>
                              )}
                            </td>
                          </tr>
                          {expandedId === contact.id && contact.conversationContext && (
                            <tr className="bg-gray-50">
                              <td colSpan={5} className="py-4 px-4">
                                <p className="text-gray-500 text-sm font-medium mb-2">Contexte de la conversation</p>
                                <div className="bg-white border border-gray-200 rounded-lg p-4 text-gray-700 text-sm whitespace-pre-wrap font-mono max-w-4xl">
                                  {typeof contact.conversationContext === 'string'
                                    ? contact.conversationContext
                                    : JSON.stringify(contact.conversationContext, null, 2)}
                                </div>
                              </td>
                            </tr>
                          )}
                        </Fragment>
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
