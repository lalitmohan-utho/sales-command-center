import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  Download,
  Plus,
  Phone,
  Mail,
  MoreVertical,
  TrendingUp,
  Users,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "won" | "lost";
  value: number;
  owner: string;
  createdDate: string;
  lastActivity: string;
}

const leads: Lead[] = [
  {
    id: "1",
    name: "Rohan Sharma",
    company: "ABC Corp",
    email: "rohan@abccorp.com",
    phone: "+91 98765 43210",
    source: "Website",
    status: "qualified",
    value: 250000,
    owner: "Lalit",
    createdDate: "2025-11-15",
    lastActivity: "Today 2:30 PM",
  },
  {
    id: "2",
    name: "Ananya Patel",
    company: "Tech Solutions",
    email: "ananya@techsol.com",
    phone: "+91 98765 43211",
    source: "LinkedIn",
    status: "contacted",
    value: 180000,
    owner: "Nikhil",
    createdDate: "2025-11-18",
    lastActivity: "Today 11:00 AM",
  },
  {
    id: "3",
    name: "Vikram Singh",
    company: "DataFlow Inc",
    email: "vikram@dataflow.com",
    phone: "+91 98765 43212",
    source: "Referral",
    status: "proposal",
    value: 350000,
    owner: "Lalit",
    createdDate: "2025-11-10",
    lastActivity: "Yesterday 4:15 PM",
  },
  {
    id: "4",
    name: "Priya Gupta",
    company: "CloudNine Systems",
    email: "priya@cloudnine.com",
    phone: "+91 98765 43213",
    source: "Email Campaign",
    status: "new",
    value: 150000,
    owner: "Rahul",
    createdDate: "2025-11-20",
    lastActivity: "Today 9:00 AM",
  },
  {
    id: "5",
    name: "Arjun Mehta",
    company: "Enterprise Solutions",
    email: "arjun@enterprise.com",
    phone: "+91 98765 43214",
    source: "Events",
    status: "negotiation",
    value: 500000,
    owner: "Lalit",
    createdDate: "2025-11-05",
    lastActivity: "Today 1:00 PM",
  },
];

const statusStyles = {
  new: "bg-info-light text-info",
  contacted: "bg-chart-2-light text-chart-2",
  qualified: "bg-chart-3-light text-chart-3",
  proposal: "bg-warning-light text-warning",
  negotiation: "bg-chart-4-light text-chart-4",
  won: "bg-success-light text-success",
  lost: "bg-destructive-light text-destructive",
};

const Leads = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex w-full bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Leads</h1>
                <p className="text-muted-foreground mt-1">
                  Manage and track all your leads
                </p>
              </div>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add New Lead
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Leads</p>
                      <p className="text-2xl font-bold">892</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-success/10">
                      <TrendingUp className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Qualified</p>
                      <p className="text-2xl font-bold">234</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-warning/10">
                      <TrendingUp className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">In Progress</p>
                      <p className="text-2xl font-bold">458</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-info/10">
                      <TrendingUp className="w-5 h-5 text-info" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">New Today</p>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters & Actions */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <CardTitle>All Leads</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="w-4 h-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Export
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search leads by name, company, or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="proposal">Proposal</SelectItem>
                      <SelectItem value="negotiation">Negotiation</SelectItem>
                      <SelectItem value="won">Won</SelectItem>
                      <SelectItem value="lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Lead Name</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Last Activity</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium">{lead.name}</TableCell>
                          <TableCell>{lead.company}</TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <span className="text-sm">{lead.email}</span>
                              <span className="text-xs text-muted-foreground">
                                {lead.phone}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{lead.source}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={statusStyles[lead.status]}>
                              {lead.status}
                            </Badge>
                          </TableCell>
                          <TableCell>₹{(lead.value / 1000).toFixed(0)}K</TableCell>
                          <TableCell>{lead.owner}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {lead.lastActivity}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="ghost">
                                <Phone className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Mail className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Leads;
