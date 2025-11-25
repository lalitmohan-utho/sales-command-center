import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Search } from "lucide-react";

const tickets = [
  {
    id: "TKT-1234",
    subject: "VM Instance Not Starting",
    customer: "TechCorp India",
    severity: "Critical",
    status: "New",
    slaState: "Within",
    agent: "Unassigned",
    queue: "Technical",
    createdAt: "2024-01-15 09:23",
    firstResponse: "-",
    resolvedAt: "-",
    reopened: "No",
    csat: "-",
    tags: ["Production", "VIP", "VMs"],
  },
  {
    id: "TKT-1235",
    subject: "Storage Performance Degraded",
    customer: "CloudStart Ltd",
    severity: "High",
    status: "In Progress",
    slaState: "Within",
    agent: "Amit Kumar",
    queue: "Technical",
    createdAt: "2024-01-15 08:45",
    firstResponse: "2024-01-15 08:52",
    resolvedAt: "-",
    reopened: "No",
    csat: "-",
    tags: ["Storage", "Performance"],
  },
  {
    id: "TKT-1236",
    subject: "Kubernetes Cluster Connection Issues",
    customer: "DevOps Solutions",
    severity: "High",
    status: "Pending Customer",
    slaState: "At Risk",
    agent: "Priya Singh",
    queue: "Technical",
    createdAt: "2024-01-15 07:12",
    firstResponse: "2024-01-15 07:18",
    resolvedAt: "-",
    reopened: "No",
    csat: "-",
    tags: ["Kubernetes", "Network"],
  },
  {
    id: "TKT-1237",
    subject: "Billing Discrepancy - Invoice Query",
    customer: "SmartApps Inc",
    severity: "Medium",
    status: "In Progress",
    slaState: "Within",
    agent: "Sneha Patel",
    queue: "Billing",
    createdAt: "2024-01-14 16:30",
    firstResponse: "2024-01-14 16:42",
    resolvedAt: "-",
    reopened: "No",
    csat: "-",
    tags: ["Billing"],
  },
  {
    id: "TKT-1238",
    subject: "Database Backup Failed",
    customer: "FinTech Pro",
    severity: "High",
    status: "Reopened",
    slaState: "Breached",
    agent: "Rahul Verma",
    queue: "Technical",
    createdAt: "2024-01-13 14:20",
    firstResponse: "2024-01-13 14:28",
    resolvedAt: "2024-01-14 10:15",
    reopened: "Yes (1)",
    csat: "3/5",
    tags: ["Database", "Backup", "Reopened"],
  },
];

const severityColors: Record<string, string> = {
  Critical: "destructive",
  High: "default",
  Medium: "secondary",
  Low: "outline",
};

const slaStateColors: Record<string, string> = {
  Within: "success",
  "At Risk": "warning",
  Breached: "destructive",
};

interface TicketListTableProps {
  agentView?: boolean;
}

export const TicketListTable = ({ agentView = false }: TicketListTableProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {agentView ? "My Tickets" : "Complete Ticket Database"}
          </CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                className="pl-8 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              Filter
            </Button>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>SLA</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Queue</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Reopened</TableHead>
                <TableHead>CSAT</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-mono">{ticket.id}</TableCell>
                  <TableCell className="font-medium max-w-xs truncate">
                    {ticket.subject}
                  </TableCell>
                  <TableCell>{ticket.customer}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        severityColors[ticket.severity] as
                          | "default"
                          | "secondary"
                          | "destructive"
                          | "outline"
                      }
                    >
                      {ticket.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{ticket.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        slaStateColors[ticket.slaState] as
                          | "default"
                          | "secondary"
                          | "destructive"
                          | "outline"
                      }
                      className={
                        ticket.slaState === "Within"
                          ? "bg-success-light text-success"
                          : ticket.slaState === "At Risk"
                          ? "bg-warning-light text-warning"
                          : "bg-destructive-light text-destructive"
                      }
                    >
                      {ticket.slaState}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{ticket.agent}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{ticket.queue}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {ticket.createdAt}
                  </TableCell>
                  <TableCell>
                    {ticket.reopened === "No" ? (
                      <span className="text-muted-foreground">-</span>
                    ) : (
                      <Badge variant="destructive">{ticket.reopened}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {ticket.csat === "-" ? (
                      <span className="text-muted-foreground">-</span>
                    ) : (
                      <span className="font-semibold">{ticket.csat}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap max-w-xs">
                      {ticket.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {ticket.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{ticket.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
