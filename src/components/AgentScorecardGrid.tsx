import { SupportScorecard } from "./SupportScorecard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const agentScorecards = [
  {
    name: "Amit Kumar",
    role: "L2",
    score: 85,
    avgAllocationTime: 8,
    avgFirstResponseTime: 14,
    avgResolutionTime: 228,
    allocationTarget: 10,
    frtTarget: 15,
    artTarget: 240,
    ticketsHandled: 42,
    ticketsResolved: 38,
    ticketsReopened: 3,
    reopenRate: 7.9,
    slaBreaches: 2,
    csat: 4.7,
    frtTrend: "stable" as const,
    artTrend: "down" as const,
    warnings: [],
    ticketJourney: {
      waitingAssignment: 8,
      assignedNoResponse: 12,
      activeWork: 180,
      waitingCustomer: 20,
      resolved: 8,
    },
  },
  {
    name: "Priya Singh",
    role: "L1",
    score: 62,
    avgAllocationTime: 10,
    avgFirstResponseTime: 18,
    avgResolutionTime: 270,
    allocationTarget: 10,
    frtTarget: 15,
    artTarget: 240,
    ticketsHandled: 35,
    ticketsResolved: 42,
    ticketsReopened: 5,
    reopenRate: 11.9,
    slaBreaches: 3,
    csat: 4.5,
    frtTrend: "up" as const,
    artTrend: "stable" as const,
    warnings: ["Needs coaching on resolution quality", "Slow first response – check workload"],
    ticketJourney: {
      waitingAssignment: 10,
      assignedNoResponse: 16,
      activeWork: 200,
      waitingCustomer: 35,
      resolved: 9,
    },
  },
  {
    name: "Rahul Verma",
    role: "SRE",
    score: 92,
    avgAllocationTime: 6,
    avgFirstResponseTime: 12,
    avgResolutionTime: 192,
    allocationTarget: 10,
    frtTarget: 15,
    artTarget: 240,
    ticketsHandled: 28,
    ticketsResolved: 25,
    ticketsReopened: 1,
    reopenRate: 4.0,
    slaBreaches: 0,
    csat: 4.8,
    frtTrend: "down" as const,
    artTrend: "down" as const,
    warnings: [],
    ticketJourney: {
      waitingAssignment: 6,
      assignedNoResponse: 8,
      activeWork: 150,
      waitingCustomer: 22,
      resolved: 6,
    },
  },
  {
    name: "Sneha Patel",
    role: "L1",
    score: 68,
    avgAllocationTime: 12,
    avgFirstResponseTime: 16,
    avgResolutionTime: 246,
    allocationTarget: 10,
    frtTarget: 15,
    artTarget: 240,
    ticketsHandled: 38,
    ticketsResolved: 35,
    ticketsReopened: 4,
    reopenRate: 11.4,
    slaBreaches: 1,
    csat: 4.6,
    frtTrend: "stable" as const,
    artTrend: "up" as const,
    warnings: ["Slow to pick up tickets"],
    ticketJourney: {
      waitingAssignment: 12,
      assignedNoResponse: 14,
      activeWork: 185,
      waitingCustomer: 28,
      resolved: 7,
    },
  },
];

export const AgentScorecardGrid = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Agent Performance Scorecards</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Individual accountability & quality metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="l1">L1 Support</SelectItem>
              <SelectItem value="l2">L2 Support</SelectItem>
              <SelectItem value="sre">SRE</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Sort by Score
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {agentScorecards.map((agent) => (
          <SupportScorecard key={agent.name} agent={agent} compact />
        ))}
      </div>
    </div>
  );
};
