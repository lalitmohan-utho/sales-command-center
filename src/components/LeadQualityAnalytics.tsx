import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const useCaseData = [
  { useCase: "Kubernetes", count: 245, qualified: 156 },
  { useCase: "VMs", count: 412, qualified: 298 },
  { useCase: "Storage", count: 189, qualified: 134 },
  { useCase: "Databases", count: 167, qualified: 98 },
  { useCase: "DR/Backup", count: 123, qualified: 89 },
];

const budgetData = [
  { range: "< ₹10k", count: 345, color: "hsl(var(--muted-foreground))" },
  { range: "₹10k-50k", count: 567, color: "hsl(var(--chart-2))" },
  { range: "₹50k-1L", count: 423, color: "hsl(var(--chart-3))" },
  { range: "₹1L-5L", count: 289, color: "hsl(var(--success))" },
  { range: "> ₹5L", count: 123, color: "hsl(var(--chart-1))" },
];

const qualityMetrics = [
  { metric: "Tech Stack Match", value: 78.5 },
  { metric: "Budget Fit", value: 65.3 },
  { metric: "Cloud Readiness", value: 72.8 },
  { metric: "Project Urgency", value: 58.2 },
];

export const LeadQualityAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Lead Quality Analytics
        </h2>
        <p className="text-muted-foreground">
          Cloud-specific insights for better qualification
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Use Case Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Use Case Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Total Leads",
                  color: "hsl(var(--chart-1))",
                },
                qualified: {
                  label: "Qualified",
                  color: "hsl(var(--success))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={useCaseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="useCase" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={4} />
                  <Bar dataKey="qualified" fill="hsl(var(--success))" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Budget Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Cloud Spend Potential</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Leads",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="range" type="category" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="hsl(var(--chart-2))" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Quality Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Quality Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {qualityMetrics.map((metric) => (
                <div key={metric.metric}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <span className="text-sm font-bold">{metric.value}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle>Quality Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border bg-success-light">
                <div className="text-2xl font-bold text-success">67.2%</div>
                <div className="text-sm text-muted-foreground">
                  Overall Lead Quality Score
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border">
                  <div className="text-xl font-bold text-foreground">892</div>
                  <div className="text-xs text-muted-foreground">
                    High-Quality Leads
                  </div>
                </div>
                <div className="p-4 rounded-lg border">
                  <div className="text-xl font-bold text-foreground">₹4.2L</div>
                  <div className="text-xs text-muted-foreground">
                    Avg. Potential MRR
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
