import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { FilterBar } from "@/components/FilterBar";
import { StatCard } from "@/components/StatCard";
import { SalesPerformanceChart } from "@/components/SalesPerformanceChart";
import { FollowUpTasks } from "@/components/FollowUpTasks";
import { LeadStatusGrid } from "@/components/LeadStatusGrid";
import { PipelineSnapshot } from "@/components/PipelineSnapshot";
import { ActivityTimeline } from "@/components/ActivityTimeline";
import { TargetManagement } from "@/components/TargetManagement";
import {
  DollarSign,
  TrendingUp,
  Target,
  Users,
  UserCheck,
  Repeat,
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Page Title */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Sales & Leads Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Today's snapshot of your pipeline & targets
              </p>
            </div>

            {/* Filters */}
            <FilterBar />

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <StatCard
                title="Total Business"
                value="₹68.02L"
                subtitle="Closed Won (Q4)"
                icon={DollarSign}
                variant="success"
                trend={{ value: "12% vs Q3", isPositive: true }}
              />
              <StatCard
                title="Active MRR"
                value="₹5.5L"
                subtitle="Monthly Recurring"
                icon={Repeat}
                variant="info"
                trend={{ value: "8% vs last month", isPositive: true }}
              />
              <StatCard
                title="New Business"
                value="₹22.4L"
                subtitle="New customers"
                icon={TrendingUp}
                variant="default"
                trend={{ value: "18% vs Q3", isPositive: true }}
              />
              <StatCard
                title="Funnel Size"
                value="₹142.8L"
                subtitle="Open pipeline value"
                icon={Target}
                variant="warning"
              />
              <StatCard
                title="Total Leads"
                value="892"
                subtitle="All stages"
                icon={Users}
                variant="default"
                trend={{ value: "24 new today", isPositive: true }}
              />
              <StatCard
                title="Converted Leads"
                value="234"
                subtitle="26.2% conversion rate"
                icon={UserCheck}
                variant="success"
                trend={{ value: "3% vs last month", isPositive: true }}
              />
            </div>

            {/* Sales Performance & Lead Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <SalesPerformanceChart />
              <LeadStatusGrid />
            </div>

            {/* Follow-up Tasks */}
            <FollowUpTasks />

            {/* Pipeline Snapshot */}
            <PipelineSnapshot />

            {/* Activity Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TargetManagement />
              </div>
              <ActivityTimeline />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
