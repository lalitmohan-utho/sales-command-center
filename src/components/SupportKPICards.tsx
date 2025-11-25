import { StatCard } from "@/components/StatCard";
import {
  Inbox,
  AlertTriangle,
  CheckCircle2,
  RefreshCcw,
  Clock,
  Timer,
  Star,
  AlertCircle,
} from "lucide-react";

export const SupportKPICards = () => {
  const kpis = [
    {
      title: "Open Tickets",
      value: "142",
      subtitle: "Current Backlog",
      icon: Inbox,
      trend: { value: "8%", isPositive: false },
      variant: "warning" as const,
    },
    {
      title: "New Tickets",
      value: "38",
      subtitle: "Last 24h",
      icon: AlertCircle,
      trend: { value: "12%", isPositive: true },
      variant: "info" as const,
    },
    {
      title: "Resolved Tickets",
      value: "156",
      subtitle: "This Month",
      icon: CheckCircle2,
      trend: { value: "15%", isPositive: true },
      variant: "success" as const,
    },
    {
      title: "Reopened Tickets",
      value: "12",
      subtitle: "Reopen Rate: 7.7%",
      icon: RefreshCcw,
      trend: { value: "3%", isPositive: false },
      variant: "destructive" as const,
    },
    {
      title: "SLA Breaches",
      value: "8",
      subtitle: "This Week",
      icon: AlertTriangle,
      trend: { value: "2%", isPositive: false },
      variant: "destructive" as const,
    },
    {
      title: "Avg First Response",
      value: "18m",
      subtitle: "Target: 15m",
      icon: Clock,
      variant: "warning" as const,
    },
    {
      title: "Avg Resolution Time",
      value: "4.2h",
      subtitle: "Target: 4h",
      icon: Timer,
      variant: "info" as const,
    },
    {
      title: "CSAT Score",
      value: "4.6",
      subtitle: "Out of 5.0",
      icon: Star,
      trend: { value: "0.2", isPositive: true },
      variant: "success" as const,
    },
    {
      title: "Unassigned Tickets",
      value: "5",
      subtitle: "Waiting Assignment",
      icon: Inbox,
      variant: "warning" as const,
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Support Operations Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {kpis.map((kpi) => (
          <StatCard key={kpi.title} {...kpi} />
        ))}
      </div>
    </div>
  );
};
