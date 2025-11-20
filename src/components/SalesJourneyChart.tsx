import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { TrendingUp, Target, DollarSign, Award } from "lucide-react";

const targetData = [
  { name: "Achieved", value: 7200000, color: "hsl(var(--success))" },
  { name: "Remaining", value: 1100000, color: "hsl(var(--muted))" },
];

const journeyData = [
  { name: "Leads Allocated", value: 450, color: "hsl(var(--chart-1))" },
  { name: "Qualified", value: 180, color: "hsl(var(--chart-2))" },
  { name: "Proposal", value: 95, color: "hsl(var(--chart-3))" },
  { name: "Negotiation", value: 52, color: "hsl(var(--chart-4))" },
  { name: "Closed/Paid", value: 38, color: "hsl(var(--success))" },
];

const metrics = {
  totalTarget: 8300000,
  achieved: 7200000,
  remaining: 1100000,
  leadsAllocated: 450,
  paid: 38,
  commission: 180000,
  achievementPercentage: 86.7,
};

export const SalesJourneyChart = () => {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold">
              Sales Target & Journey
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Q4 2025 - Complete sales funnel overview
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Target Achievement Pie Chart */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">
                Target Achievement
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={targetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {targetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) =>
                      `₹${(value / 1000000).toFixed(2)}M`
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Target:</span>
                  <span className="text-sm font-bold">
                    ₹{(metrics.totalTarget / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Achieved:</span>
                  <span className="text-sm font-bold text-success">
                    ₹{(metrics.achieved / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Remaining:</span>
                  <span className="text-sm font-bold text-muted-foreground">
                    ₹{(metrics.remaining / 1000000).toFixed(2)}M
                  </span>
                </div>
                <Progress value={metrics.achievementPercentage} className="h-2" />
                <p className="text-center text-lg font-bold text-success">
                  {metrics.achievementPercentage}% Complete
                </p>
              </div>
            </div>
          </div>

          {/* Right: Sales Journey Funnel */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">
                Lead to Payment Journey
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={journeyData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={false}
                  >
                    {journeyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 rounded-lg bg-muted/50 border">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-chart-1" />
                  <span className="text-xs text-muted-foreground">Allocated</span>
                </div>
                <p className="text-xl font-bold">{metrics.leadsAllocated}</p>
                <p className="text-xs text-muted-foreground">Leads</p>
              </div>

              <div className="p-3 rounded-lg bg-muted/50 border">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground">Closed</span>
                </div>
                <p className="text-xl font-bold text-success">{metrics.paid}</p>
                <p className="text-xs text-muted-foreground">Deals</p>
              </div>

              <div className="p-3 rounded-lg bg-muted/50 border">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Conversion</span>
                </div>
                <p className="text-xl font-bold">
                  {((metrics.paid / metrics.leadsAllocated) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">Lead to Close</p>
              </div>

              <div className="p-3 rounded-lg bg-muted/50 border">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-warning" />
                  <span className="text-xs text-muted-foreground">Commission</span>
                </div>
                <p className="text-xl font-bold text-warning">
                  ₹{(metrics.commission / 1000).toFixed(0)}K
                </p>
                <p className="text-xs text-muted-foreground">Earned</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
