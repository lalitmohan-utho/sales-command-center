import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Inbox,
  CheckCircle2,
  Clock,
  Timer,
  Star,
  AlertTriangle,
  RefreshCcw,
} from "lucide-react";

const personalKPIs = [
  {
    title: "My Open Tickets",
    value: "42",
    icon: Inbox,
    variant: "default" as const,
  },
  {
    title: "New Today",
    value: "8",
    icon: AlertTriangle,
    variant: "warning" as const,
  },
  {
    title: "Due Soon",
    value: "6",
    subtitle: "Next 2 hours",
    icon: Clock,
    variant: "destructive" as const,
  },
  {
    title: "Resolved Today",
    value: "12",
    icon: CheckCircle2,
    variant: "success" as const,
  },
  {
    title: "My Reopened",
    value: "3",
    subtitle: "Last 7 days",
    icon: RefreshCcw,
    variant: "destructive" as const,
  },
  {
    title: "My Avg FRT",
    value: "14m",
    icon: Clock,
    variant: "info" as const,
  },
  {
    title: "My Avg RT",
    value: "3.8h",
    icon: Timer,
    variant: "info" as const,
  },
  {
    title: "My CSAT",
    value: "4.7",
    subtitle: "Out of 5.0",
    icon: Star,
    variant: "success" as const,
  },
];

const ticketQueue = [
  {
    id: "TKT-1234",
    title: "VM Instance Not Starting",
    account: "TechCorp India",
    severity: "Critical",
    product: "VMs",
    status: "New",
    slaRemaining: "12m",
    tags: ["Production", "VIP"],
  },
  {
    id: "TKT-1235",
    title: "Storage Performance Degraded",
    account: "CloudStart Ltd",
    severity: "High",
    product: "Storage",
    status: "In Progress",
    slaRemaining: "1h 24m",
    tags: ["Performance"],
  },
  {
    id: "TKT-1236",
    title: "Kubernetes Cluster Connection Issues",
    account: "DevOps Solutions",
    severity: "High",
    product: "Kubernetes",
    status: "Pending Customer",
    slaRemaining: "45m",
    tags: ["K8s", "Network"],
  },
  {
    id: "TKT-1237",
    title: "Billing Discrepancy - Invoice Query",
    account: "SmartApps Inc",
    severity: "Medium",
    product: "Billing",
    status: "In Progress",
    slaRemaining: "3h 12m",
    tags: ["Billing"],
  },
  {
    id: "TKT-1238",
    title: "Database Backup Failed",
    account: "FinTech Pro",
    severity: "High",
    product: "Database",
    status: "Reopened",
    slaRemaining: "8m",
    tags: ["Reopened", "Backup", "VIP"],
  },
];

const severityColors: Record<string, string> = {
  Critical: "destructive",
  High: "default",
  Medium: "secondary",
  Low: "outline",
};

export const AgentPersonalDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">
        My Personal Dashboard
      </h2>

      {/* Personal KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {personalKPIs.map((kpi) => (
          <StatCard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Ticket Queue Kanban-style View */}
      <Card>
        <CardHeader>
          <CardTitle>My Ticket Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ticketQueue.map((ticket) => (
              <div
                key={ticket.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm text-muted-foreground">
                        {ticket.id}
                      </span>
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
                      <Badge variant="outline">{ticket.product}</Badge>
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {ticket.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {ticket.account}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-2">
                      {ticket.status}
                    </Badge>
                    <div
                      className={`text-sm font-semibold ${
                        ticket.slaRemaining.includes("m") &&
                        !ticket.slaRemaining.includes("h")
                          ? "text-destructive"
                          : "text-warning"
                      }`}
                    >
                      SLA: {ticket.slaRemaining}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {ticket.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
