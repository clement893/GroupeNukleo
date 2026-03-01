import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Filter, 
  TrendingUp, 
  Users, 
  DollarSign,
  Clock,
  Mail,
  Building2,
  Star,
  Search
} from 'lucide-react';

export default function AdminAgencyLeads() {
  const { data: leads, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['admin', 'agency-leads'],
    queryFn: async () => {
      const res = await fetch('/api/admin/agency-leads', { credentials: 'include' });
      if (!res.ok) throw new Error(res.status === 401 ? 'Sign in required' : 'Failed to load leads');
      return res.json();
    },
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterScore, setFilterScore] = useState<string>('all');
  const [filterBudget, setFilterBudget] = useState<string>('all');
  const [filterUrgency, setFilterUrgency] = useState<string>('all');

  // Filter leads
  const filteredLeads = useMemo(() => {
    if (!leads || !Array.isArray(leads)) return [];
    
    return leads.filter(lead => {
      const matchesSearch = 
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.companyName?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesScore = 
        filterScore === 'all' ||
        (filterScore === 'high' && (lead.qualificationScore ?? 0) >= 70) ||
        (filterScore === 'medium' && (lead.qualificationScore ?? 0) >= 40 && (lead.qualificationScore ?? 0) < 70) ||
        (filterScore === 'low' && (lead.qualificationScore ?? 0) < 40);
      
      const matchesBudget = 
        filterBudget === 'all' || lead.budget === filterBudget;
      
      const matchesUrgency = 
        filterUrgency === 'all' || lead.urgency === filterUrgency;
      
      return matchesSearch && matchesScore && matchesBudget && matchesUrgency;
    });
  }, [leads, searchTerm, filterScore, filterBudget, filterUrgency]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!leads) return { total: 0, highQuality: 0, avgScore: 0, totalValue: 0 };
    
    const total = leads.length;
    const highQuality = leads.filter(l => (l.qualificationScore ?? 0) >= 70).length;
    const avgScore = leads.reduce((sum, l) => sum + (l.qualificationScore ?? 0), 0) / (total || 1);
    
    // Estimate total value based on budget ranges
    const totalValue = leads.reduce((sum, l) => {
      if (l.budget === '100k+') return sum + 150000;
      if (l.budget === '50-100k') return sum + 75000;
      if (l.budget === '10-50k') return sum + 30000;
      if (l.budget === '<10k') return sum + 5000;
      return sum;
    }, 0);
    
    return { total, highQuality, avgScore: Math.round(avgScore), totalValue };
  }, [leads]);

  // Export to CSV
  const exportToCSV = () => {
    if (!filteredLeads || filteredLeads.length === 0) return;
    
    const headers = ['Email', 'Company', 'Size', 'Budget', 'Urgency', 'Score', 'Tech Needs', 'Date'];
    const rows = filteredLeads.map(lead => [
      lead.email,
      lead.companyName || '',
      lead.agencySize || '',
      lead.budget || '',
      lead.urgency || '',
      lead.qualificationScore || 0,
      lead.techNeeds || '',
      new Date(lead.createdAt).toLocaleDateString(),
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agency-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getScoreBadgeColor = (score: number | null) => {
    if (!score) return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    if (score >= 70) return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (score >= 40) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-red-500/20 text-red-400 border-red-500/30';
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Agency Leads Dashboard</h1>
          <p className="text-white/60">Manage and qualify prospects from the Agencies chatbot</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-white/60">Total Leads</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
          </div>
          
          <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-5 h-5 text-green-400" />
              <span className="text-sm text-white/60">High Quality</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.highQuality}</div>
            <div className="text-xs text-white/40 mt-1">Score ≥ 70</div>
          </div>
          
          <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-white/60">Avg Score</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.avgScore}</div>
            <div className="text-xs text-white/40 mt-1">Out of 100</div>
          </div>
          
          <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-white/60">Est. Pipeline</span>
            </div>
            <div className="text-3xl font-bold text-white">
              €{(stats.totalValue / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-white/40 mt-1">Based on budgets</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search email or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
              />
            </div>
            
            {/* Score Filter */}
            <select
              value={filterScore}
              onChange={(e) => setFilterScore(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Scores</option>
              <option value="high">High (≥70)</option>
              <option value="medium">Medium (40-69)</option>
              <option value="low">Low (&lt;40)</option>
            </select>
            
            {/* Budget Filter */}
            <select
              value={filterBudget}
              onChange={(e) => setFilterBudget(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Budgets</option>
              <option value="100k+">100k+</option>
              <option value="50-100k">50-100k</option>
              <option value="10-50k">10-50k</option>
              <option value="<10k">&lt;10k</option>
            </select>
            
            {/* Urgency Filter */}
            <select
              value={filterUrgency}
              onChange={(e) => setFilterUrgency(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Urgency</option>
              <option value="Immediate">Immediate</option>
              <option value="1-3 months">1-3 months</option>
              <option value="3-6 months">3-6 months</option>
              <option value="Just exploring">Just exploring</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
            <div className="text-sm text-white/60">
              Showing {filteredLeads.length} of {stats.total} leads
            </div>
            <Button
              onClick={exportToCSV}
              disabled={filteredLeads.length === 0}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-white/60">Loading leads...</div>
          ) : isError ? (
            <div className="p-12 text-center">
              <p className="text-red-300 mb-2">{error instanceof Error ? error.message : 'Failed to load leads'}</p>
              <Button onClick={() => refetch()} variant="outline" className="text-white border-white/30">Retry</Button>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-12 text-center text-white/60">No leads found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                      Urgency
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                      Tech Needs
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            {lead.email[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{lead.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-white/70">
                          <Building2 className="w-4 h-4" />
                          <span className="text-sm">{lead.companyName || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-white/70">{lead.agencySize || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-white/70">{lead.budget || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-white/40" />
                          <span className="text-sm text-white/70">{lead.urgency || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getScoreBadgeColor(lead.qualificationScore)}`}>
                          {lead.qualificationScore || 0}/100
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-white/60 max-w-xs truncate">
                          {(() => {
                            if (!lead.techNeeds) return 'N/A';
                            try {
                              const techNeeds = JSON.parse(lead.techNeeds);
                              return Array.isArray(techNeeds) ? techNeeds.join(', ') : String(techNeeds);
                            } catch (error) {
                              return lead.techNeeds; // Return raw value if JSON parse fails
                            }
                          })()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-white/60">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
