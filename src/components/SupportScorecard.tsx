import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

interface SupportScorecardProps {
  agent: {
    name: string;
    role: string;
    score: number;
    avgAllocationTime: number;
    avgFirstResponseTime: number;
    avgResolutionTime: number;
    allocationTarget: number;
    frtTarget: number;
    artTarget: number;
    ticketsHandled: number;
    ticketsResolved: number;
    ticketsReopened: number;
    reopenRate: number;
    slaBreaches: number;
    csat: number;
    frtTrend: "up" | "down" | "stable";
    artTrend: "up" | "down" | "stable";
    warnings: string[];
    ticketJourney: {
      waitingAssignment: number;
      assignedNoResponse: number;
      activeWork: number;
      waitingCustomer: number;
      resolved: number;
    };
  };
  compact?: boolean;
}

export const SupportScorecard = ({ agent, compact = false }: SupportScorecardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-success/10";
    if (score >= 60) return "bg-warning/10";
    return "bg-destructive/10";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Needs Attention";
    return "Critical";
  };

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    if (trend === "up") return <TrendingUp className="h-3 w-3 text-destructive" />;
    if (trend === "down") return <TrendingDown className="h-3 w-3 text-success" />;
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const totalJourneyTime = Object.values(agent.ticketJourney).reduce((a, b) => a + b, 0);

  return (
    <Card className={compact ? "h-full" : ""}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg text-foreground">{agent.name}</h3>
            <Badge variant="outline" className="mt-1">
              {agent.role}
            </Badge>
          </div>
          {agent.warnings.length > 0 && (
            <AlertTriangle className="h-5 w-5 text-warning" />
          )}
        </div>

        {/* Circular Score Gauge */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div
              className={`w-32 h-32 rounded-full flex flex-col items-center justify-center ${getScoreBgColor(
                agent.score
              )} border-4 ${
                agent.score >= 80
                  ? "border-success"
                  : agent.score >= 60
                  ? "border-warning"
                  : "border-destructive"
              }`}
            >
              <div className={`text-3xl font-bold ${getScoreColor(agent.score)}`}>
                {agent.score}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {getScoreLabel(agent.score)}
              </div>
            </div>
          </div>
        </div>

        {/* Time Accountability Metrics */}
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Avg Allocation Time</span>
              </div>
              <span className="text-sm font-semibold">{formatTime(agent.avgAllocationTime)}</span>
            </div>
            <Progress
              value={(agent.avgAllocationTime / agent.allocationTarget) * 100}
              className="h-2"
            />
            <div className="text-xs text-muted-foreground mt-1">
              Target: &lt; {formatTime(agent.allocationTarget)}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Avg First Response Time</span>
                {getTrendIcon(agent.frtTrend)}
              </div>
              <span className="text-sm font-semibold">{formatTime(agent.avgFirstResponseTime)}</span>
            </div>
            <Progress
              value={(agent.avgFirstResponseTime / agent.frtTarget) * 100}
              className="h-2"
            />
            <div className="text-xs text-muted-foreground mt-1">
              Target: &lt; {formatTime(agent.frtTarget)}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Avg Resolution Time</span>
                {getTrendIcon(agent.artTrend)}
              </div>
              <span className="text-sm font-semibold">{formatTime(agent.avgResolutionTime)}</span>
            </div>
            <Progress
              value={(agent.avgResolutionTime / agent.artTarget) * 100}
              className="h-2"
            />
            <div className="text-xs text-muted-foreground mt-1">
              Target: &lt; {formatTime(agent.artTarget)}
            </div>
          </div>
        </div>

        {/* Ticket Journey Breakdown */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Ticket Journey Breakdown</h4>
          <div className="flex h-6 rounded-full overflow-hidden">
            <div
              className="bg-secondary"
              style={{
                width: `${(agent.ticketJourney.waitingAssignment / totalJourneyTime) * 100}%`,
              }}
              title="Waiting Assignment"
            />
            <div
              className="bg-warning"
              style={{
                width: `${(agent.ticketJourney.assignedNoResponse / totalJourneyTime) * 100}%`,
              }}
              title="Assigned but not responded"
            />
            <div
              className="bg-primary"
              style={{
                width: `${(agent.ticketJourney.activeWork / totalJourneyTime) * 100}%`,
              }}
              title="Active Work"
            />
            <div
              className="bg-info"
              style={{
                width: `${(agent.ticketJourney.waitingCustomer / totalJourneyTime) * 100}%`,
              }}
              title="Waiting on Customer"
            />
            <div
              className="bg-success"
              style={{
                width: `${(agent.ticketJourney.resolved / totalJourneyTime) * 100}%`,
              }}
              title="Resolved"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <div className="flex items-center gap-1 text-xs">
              <div className="w-3 h-3 bg-secondary rounded" />
              <span>Waiting Assignment</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <div className="w-3 h-3 bg-warning rounded" />
              <span>No Response</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <div className="w-3 h-3 bg-primary rounded" />
              <span>Active</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <div className="w-3 h-3 bg-info rounded" />
              <span>Waiting Customer</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <div className="w-3 h-3 bg-success rounded" />
              <span>Resolved</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-foreground">{agent.ticketsHandled}</div>
            <div className="text-xs text-muted-foreground">Handled</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-success">{agent.ticketsResolved}</div>
            <div className="text-xs text-muted-foreground">Resolved</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-destructive">
              {agent.ticketsReopened}
              <span className="text-sm ml-1">({agent.reopenRate}%)</span>
            </div>
            <div className="text-xs text-muted-foreground">Reopened</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-warning">{agent.slaBreaches}</div>
            <div className="text-xs text-muted-foreground">Breaches</div>
          </div>
        </div>

        <div className="text-center p-3 bg-muted/50 rounded-lg mb-4">
          <div className="flex items-center justify-center gap-1">
            <span className="text-2xl font-bold text-foreground">{agent.csat}</span>
            <span className="text-warning text-xl">★</span>
          </div>
          <div className="text-xs text-muted-foreground">CSAT Score</div>
        </div>

        {/* Problem Signals */}
        {agent.warnings.length > 0 && (
          <div className="space-y-2">
            {agent.warnings.map((warning, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg"
              >
                <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                <span className="text-sm text-warning">{warning}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
