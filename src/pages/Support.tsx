import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { SupportFilterBar } from "@/components/SupportFilterBar";
import { SupportKPICards } from "@/components/SupportKPICards";
import { TicketStatusOverview } from "@/components/TicketStatusOverview";
import { AgentPerformanceTable } from "@/components/AgentPerformanceTable";
import { AgentPersonalDashboard } from "@/components/AgentPersonalDashboard";
import { ReopenAnalysis } from "@/components/ReopenAnalysis";
import { SLAMetrics } from "@/components/SLAMetrics";
import { TicketListTable } from "@/components/TicketListTable";
import { ShiftHandover } from "@/components/ShiftHandover";
import { SupportExperience } from "@/components/SupportExperience";
import { AgentScorecardGrid } from "@/components/AgentScorecardGrid";
import { AgentComparisonChart } from "@/components/AgentComparisonChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Support = () => {
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
                Support Operations Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Real-time view of tickets, SLAs, and quality
              </p>
            </div>

            {/* Global Filters */}
            <SupportFilterBar />

            {/* View Tabs: Manager vs Agent */}
            <Tabs defaultValue="manager" className="space-y-6">
              <TabsList>
                <TabsTrigger value="manager">Manager View</TabsTrigger>
                <TabsTrigger value="agent">Agent View</TabsTrigger>
              </TabsList>

              <TabsContent value="manager" className="space-y-8">
                {/* Global KPI Row */}
                <SupportKPICards />

                {/* Status & Severity Overview */}
                <TicketStatusOverview />

                {/* Agent Performance Scorecards */}
                <AgentScorecardGrid />

                {/* Agent Comparison Chart */}
                <AgentComparisonChart />

                {/* Team Performance */}
                <AgentPerformanceTable />

                {/* Reopen Analysis */}
                <ReopenAnalysis />

                {/* SLA Metrics */}
                <SLAMetrics />

                {/* Shift Handover */}
                <ShiftHandover />

                {/* Customer Experience */}
                <SupportExperience />

                {/* Complete Ticket List */}
                <TicketListTable />
              </TabsContent>

              <TabsContent value="agent" className="space-y-8">
                {/* Agent Personal Dashboard */}
                <AgentPersonalDashboard />

                {/* Agent's Ticket List */}
                <TicketListTable agentView />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Support;
