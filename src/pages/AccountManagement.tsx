import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { FilterBar } from "@/components/FilterBar";
import { StatCard } from "@/components/StatCard";
import { AccountHealthRisk } from "@/components/AccountHealthRisk";
import { RenewalsRevenue } from "@/components/RenewalsRevenue";
import { UsageAdoption } from "@/components/UsageAdoption";
import { AMFollowUpTasks } from "@/components/AMFollowUpTasks";
import { ReferralsAdvocacy } from "@/components/ReferralsAdvocacy";
import { SupportExperience } from "@/components/SupportExperience";
import { AccountPortfolioTable } from "@/components/AccountPortfolioTable";
import { AMActivityTimeline } from "@/components/AMActivityTimeline";
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Heart,
  Users,
  Activity,
} from "lucide-react";

const AccountManagement = () => {
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
                Account Management Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Health, renewals & growth for your customers
              </p>
            </div>

            {/* Filters */}
            <FilterBar />

            {/* Portfolio Overview KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <StatCard
                title="Total MRR"
                value="₹42.8L"
                subtitle="Monthly Recurring Revenue"
                icon={DollarSign}
                variant="success"
                trend={{ value: "8.5% vs last month", isPositive: true }}
              />
              <StatCard
                title="Net Revenue Change"
                value="₹3.2L"
                subtitle="Expansion - Contraction - Churn"
                icon={TrendingUp}
                variant="info"
                trend={{ value: "Last 30 days", isPositive: true }}
              />
              <StatCard
                title="Churn Rate"
                value="2.4%"
                subtitle="Last 90 days"
                icon={AlertTriangle}
                variant="warning"
              />
              <StatCard
                title="At-Risk Accounts"
                value="12"
                subtitle="Based on health score"
                icon={AlertTriangle}
                variant="destructive"
              />
              <StatCard
                title="Active Advocates"
                value="34"
                subtitle="Referral & testimonial ready"
                icon={Users}
                variant="info"
                trend={{ value: "5 new this month", isPositive: true }}
              />
              <StatCard
                title="Avg Health Score"
                value="78/100"
                subtitle="Weighted average"
                icon={Heart}
                variant="success"
              />
            </div>

            {/* Health & Churn Risk */}
            <AccountHealthRisk />

            {/* Renewals & Revenue */}
            <RenewalsRevenue />

            {/* Usage & Adoption */}
            <UsageAdoption />

            {/* Tasks & Follow-ups */}
            <AMFollowUpTasks />

            {/* Referrals & Advocacy */}
            <ReferralsAdvocacy />

            {/* Support & Experience */}
            <SupportExperience />

            {/* Account Portfolio & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AccountPortfolioTable />
              </div>
              <AMActivityTimeline />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountManagement;
