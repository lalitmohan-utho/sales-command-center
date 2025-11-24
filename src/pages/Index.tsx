import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { FilterBar } from "@/components/FilterBar";
import { LeadKPICards } from "@/components/LeadKPICards";
import { InboundLeadSection } from "@/components/InboundLeadSection";
import { OutboundLeadSection } from "@/components/OutboundLeadSection";
import { LeadStatusOverview } from "@/components/LeadStatusOverview";
import { TeamPerformanceTable } from "@/components/TeamPerformanceTable";
import { FollowUpManager } from "@/components/FollowUpManager";
import { LeadQualityAnalytics } from "@/components/LeadQualityAnalytics";
import { LeadListTable } from "@/components/LeadListTable";

const Index = () => {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-8">
            {/* Page Title */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Lead Generation Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Inbound + Outbound performance and pipeline visibility
              </p>
            </div>

            {/* Global Filters */}
            <FilterBar />

            {/* Global KPI Cards */}
            <LeadKPICards />

            {/* Inbound Lead Section */}
            <InboundLeadSection />

            {/* Outbound Lead Section */}
            <OutboundLeadSection />

            {/* Unified Lead Status Overview */}
            <LeadStatusOverview />

            {/* Team Performance */}
            <TeamPerformanceTable />

            {/* Follow-up Management */}
            <FollowUpManager />

            {/* Lead Quality Analytics */}
            <LeadQualityAnalytics />

            {/* Complete Lead Database */}
            <LeadListTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
