import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

const statusData = [
  {
    name: "Not Called",
    count: 342,
    percent: 12.0,
    trend: 5.2,
    trendUp: true,
    color: "bg-gray-500",
  },
  {
    name: "Invalid Number",
    count: 156,
    percent: 5.5,
    trend: -2.1,
    trendUp: false,
    color: "bg-red-500",
  },
  {
    name: "Called – No Answer",
    count: 489,
    percent: 17.2,
    trend: 3.4,
    trendUp: true,
    color: "bg-amber-500",
  },
  {
    name: "Called – Not Interested",
    count: 267,
    percent: 9.4,
    trend: -1.8,
    trendUp: false,
    color: "bg-orange-600",
  },
  {
    name: "Meeting Scheduled",
    count: 342,
    percent: 12.0,
    trend: 8.7,
    trendUp: true,
    color: "bg-green-500",
  },
  {
    name: "Follow-up Required",
    count: 456,
    percent: 16.0,
    trend: 4.2,
    trendUp: true,
    color: "bg-blue-500",
  },
  {
    name: "Do Not Call",
    count: 89,
    percent: 3.1,
    trend: 0.5,
    trendUp: true,
    color: "bg-red-700",
  },
  {
    name: "Callback Requested",
    count: 234,
    percent: 8.2,
    trend: 6.1,
    trendUp: true,
    color: "bg-cyan-500",
  },
  {
    name: "No Longer at Company",
    count: 67,
    percent: 2.4,
    trend: -0.8,
    trendUp: false,
    color: "bg-gray-600",
  },
  {
    name: "Sent Information – Awaiting Response",
    count: 178,
    percent: 6.3,
    trend: 2.9,
    trendUp: true,
    color: "bg-indigo-500",
  },
  {
    name: "In Lock-In / Contract",
    count: 123,
    percent: 4.3,
    trend: 1.2,
    trendUp: true,
    color: "bg-purple-500",
  },
  {
    name: "Wrong Details",
    count: 78,
    percent: 2.7,
    trend: -1.4,
    trendUp: false,
    color: "bg-rose-500",
  },
  {
    name: "Disconnect",
    count: 26,
    percent: 0.9,
    trend: -0.3,
    trendUp: false,
    color: "bg-gray-700",
  },
];

export const LeadStatusOverview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Unified Lead Status Overview</CardTitle>
        <p className="text-sm text-muted-foreground">
          Color-coded status breakdown across all lead sources
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {statusData.map((status) => (
            <div
              key={status.name}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-3 h-3 rounded-full ${status.color}`} />
                <span className="font-medium text-foreground">{status.name}</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="font-bold text-foreground">{status.count}</div>
                  <div className="text-xs text-muted-foreground">
                    {status.percent.toFixed(1)}%
                  </div>
                </div>
                <Badge
                  variant={status.trendUp ? "default" : "destructive"}
                  className="min-w-[80px] justify-center"
                >
                  {status.trendUp ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {Math.abs(status.trend).toFixed(1)}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
