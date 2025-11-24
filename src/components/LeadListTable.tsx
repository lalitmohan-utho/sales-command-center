import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Download, Phone, Mail, MoreHorizontal } from "lucide-react";

const leadsData = [
  {
    id: 1,
    source: "Inbound",
    status: "Meeting Scheduled",
    name: "Rajesh Kumar",
    company: "Acme Corp",
    phone: "+91 98765 43210",
    email: "rajesh@acmecorp.com",
    industry: "E-commerce",
    agent: "Priya Sharma",
    dateAdded: "2024-01-15",
    lastContact: "2024-01-20",
    nextFollowup: "2024-01-22",
    attempts: 3,
    meetingStatus: "Confirmed",
    score: 85,
    cloudSpend: "₹50k-1L",
  },
  {
    id: 2,
    source: "Outbound",
    status: "Follow-up Required",
    name: "Amit Patel",
    company: "TechStart Solutions",
    phone: "+91 98765 43211",
    email: "amit@techstart.io",
    industry: "SaaS",
    agent: "Rajesh Kumar",
    dateAdded: "2024-01-18",
    lastContact: "2024-01-19",
    nextFollowup: "2024-01-23",
    attempts: 2,
    meetingStatus: "Pending",
    score: 72,
    cloudSpend: "₹10k-50k",
  },
  {
    id: 3,
    source: "Inbound",
    status: "Qualified",
    name: "Sneha Singh",
    company: "Cloud Innovations",
    phone: "+91 98765 43212",
    email: "sneha@cloudinno.com",
    industry: "FinTech",
    agent: "Amit Patel",
    dateAdded: "2024-01-10",
    lastContact: "2024-01-21",
    nextFollowup: "2024-01-24",
    attempts: 5,
    meetingStatus: "Attended",
    score: 92,
    cloudSpend: "₹1L-5L",
  },
];

const statusColors: Record<string, string> = {
  "Not Called": "bg-gray-500",
  "Meeting Scheduled": "bg-green-500",
  "Follow-up Required": "bg-blue-500",
  Qualified: "bg-purple-500",
  "Not Interested": "bg-orange-600",
};

export const LeadListTable = () => {
  const [search, setSearch] = useState("");

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Complete Lead Database</CardTitle>
            <p className="text-sm text-muted-foreground">
              All leads with detailed information and tracking
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search leads, numbers, emails, companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="inbound">Inbound Only</SelectItem>
              <SelectItem value="outbound">Outbound Only</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-status">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="meeting">Meeting Scheduled</SelectItem>
              <SelectItem value="followup">Follow-up Required</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Lead Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Next Follow-up</TableHead>
                <TableHead className="text-right">Attempts</TableHead>
                <TableHead>Meeting</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead>Cloud Spend</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leadsData.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <Badge variant={lead.source === "Inbound" ? "default" : "secondary"}>
                      {lead.source}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${statusColors[lead.status] || "bg-gray-500"}`}
                      />
                      <span className="text-sm">{lead.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell className="font-mono text-sm">{lead.phone}</TableCell>
                  <TableCell className="text-sm">{lead.email}</TableCell>
                  <TableCell>{lead.industry}</TableCell>
                  <TableCell>{lead.agent}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {lead.dateAdded}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {lead.lastContact}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {lead.nextFollowup}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline">{lead.attempts}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        lead.meetingStatus === "Attended"
                          ? "default"
                          : lead.meetingStatus === "Confirmed"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {lead.meetingStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={lead.score >= 85 ? "default" : lead.score >= 70 ? "secondary" : "outline"}
                    >
                      {lead.score}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{lead.cloudSpend}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing 1-{leadsData.length} of 2,847 leads
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
