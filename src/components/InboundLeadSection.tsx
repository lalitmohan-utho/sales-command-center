import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import {
  UserPlus,
  ShieldCheck,
  Phone,
  Mail,
  Calendar,
  Rocket,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const funnelData = [
  { stage: "Signup", count: 845, conversion: 100 },
  { stage: "Contacted", count: 723, conversion: 85.6 },
  { stage: "Connected", count: 612, conversion: 72.4 },
  { stage: "Meeting", count: 234, conversion: 27.7 },
  { stage: "Attended", count: 198, conversion: 23.4 },
  { stage: "Qualified", count: 156, conversion: 18.5 },
  { stage: "Trial", count: 98, conversion: 11.6 },
  { stage: "Converted", count: 67, conversion: 7.9 },
];

const statusData = [
  { name: "Not Called", value: 122, color: "hsl(var(--muted-foreground))" },
  { name: "Called - No Answer", value: 234, color: "hsl(var(--warning))" },
  { name: "Meeting Scheduled", value: 89, color: "hsl(var(--success))" },
  { name: "Follow-up Required", value: 167, color: "hsl(var(--info))" },
  { name: "Not Interested", value: 145, color: "hsl(var(--destructive))" },
  { name: "Qualified", value: 88, color: "hsl(var(--chart-1))" },
];

export const InboundLeadSection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Inbound Leads (Website Signups)
        </h2>
        <p className="text-muted-foreground">
          Performance metrics for leads from Utho signup form
        </p>
      </div>

      {/* Inbound KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Signups"
          value="845"
          subtitle="This month"
          icon={UserPlus}
          variant="default"
          trend={{ value: "+23% vs last month", isPositive: true }}
        />
        <StatCard
          title="Verified Leads"
          value="723"
          subtitle="85.6% verified"
          icon={ShieldCheck}
          variant="success"
        />
        <StatCard
          title="Reached by Phone"
          value="612"
          subtitle="72.4% contacted"
          icon={Phone}
          variant="info"
        />
        <StatCard
          title="Reached by Email"
          value="698"
          subtitle="82.6% email sent"
          icon={Mail}
          variant="info"
        />
        <StatCard
          title="Meeting Scheduled"
          value="234"
          subtitle="27.7% of signups"
          icon={Calendar}
          variant="default"
        />
        <StatCard
          title="Trial Started"
          value="98"
          subtitle="11.6% activated"
          icon={Rocket}
          variant="success"
        />
        <StatCard
          title="Converted"
          value="67"
          subtitle="7.9% conversion"
          icon={CheckCircle}
          variant="success"
          trend={{ value: "+2.1% vs last month", isPositive: true }}
        />
        <StatCard
          title="Avg. Time to Contact"
          value="4.2h"
          subtitle="From signup"
          icon={Clock}
          variant="warning"
        />
      </div>

      {/* Funnel and Status Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funnel Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Inbound Lead Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Leads",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[350px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="stage" type="category" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Inbound Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Leads",
                },
              }}
              className="h-[350px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="hsl(var(--chart-1))"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
