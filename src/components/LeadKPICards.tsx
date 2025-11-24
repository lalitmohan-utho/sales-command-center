import { StatCard } from "@/components/StatCard";
import {
  Users,
  Phone,
  MessageSquare,
  Calendar,
  UserCheck,
  UserX,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export const LeadKPICards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <StatCard
        title="Total Leads"
        value="2,847"
        subtitle="All sources"
        icon={Users}
        variant="default"
        trend={{ value: "+156 this week", isPositive: true }}
      />
      <StatCard
        title="Total Called"
        value="1,923"
        subtitle="67.5% contact rate"
        icon={Phone}
        variant="info"
        trend={{ value: "+12% vs last week", isPositive: true }}
      />
      <StatCard
        title="Connected"
        value="1,245"
        subtitle="64.7% connection rate"
        icon={MessageSquare}
        variant="success"
        trend={{ value: "+8% vs last week", isPositive: true }}
      />
      <StatCard
        title="Meetings Scheduled"
        value="342"
        subtitle="27.5% from connected"
        icon={Calendar}
        variant="default"
        trend={{ value: "+24 today", isPositive: true }}
      />
      <StatCard
        title="Meetings Attended"
        value="287"
        subtitle="83.9% attendance rate"
        icon={CheckCircle2}
        variant="success"
        trend={{ value: "+5% vs last week", isPositive: true }}
      />
      <StatCard
        title="Qualified Leads"
        value="198"
        subtitle="69.0% from meetings"
        icon={UserCheck}
        variant="success"
        trend={{ value: "+18 this week", isPositive: true }}
      />
      <StatCard
        title="Disqualified"
        value="512"
        subtitle="Not fit / junk"
        icon={UserX}
        variant="destructive"
      />
      <StatCard
        title="Follow-up Required"
        value="456"
        subtitle="Warm leads"
        icon={Clock}
        variant="warning"
        trend={{ value: "124 overdue", isPositive: false }}
      />
      <StatCard
        title="Urgent (48h+)"
        value="89"
        subtitle="Needs immediate action"
        icon={AlertCircle}
        variant="destructive"
        trend={{ value: "High priority", isPositive: false }}
      />
    </div>
  );
};
