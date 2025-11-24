import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import {
  Database,
  Phone,
  Mail,
  MessageCircle,
  UserCheck,
  UserX,
  Clock,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
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

const dailyActivityData = [
  { day: "Mon", calls: 340, emails: 520, whatsapp: 280 },
  { day: "Tue", calls: 380, emails: 490, whatsapp: 310 },
  { day: "Wed", calls: 420, emails: 560, whatsapp: 290 },
  { day: "Thu", calls: 390, emails: 530, whatsapp: 320 },
  { day: "Fri", calls: 450, emails: 580, whatsapp: 340 },
  { day: "Sat", calls: 280, emails: 380, whatsapp: 210 },
  { day: "Sun", calls: 190, emails: 280, whatsapp: 150 },
];

const conversionData = [
  { week: "Week 1", connectionRate: 42, meetingRate: 18 },
  { week: "Week 2", connectionRate: 45, meetingRate: 21 },
  { week: "Week 3", connectionRate: 48, meetingRate: 23 },
  { week: "Week 4", connectionRate: 51, meetingRate: 25 },
];

export const OutboundLeadSection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Outbound Leads (Cold Outreach)
        </h2>
        <p className="text-muted-foreground">
          Performance metrics for Apollo data, cold calls, emails & WhatsApp campaigns
        </p>
      </div>

      {/* Outbound KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Data Assigned"
          value="3,450"
          subtitle="Apollo + campaigns"
          icon={Database}
          variant="default"
        />
        <StatCard
          title="Total Cold Calls"
          value="2,120"
          subtitle="61.4% attempted"
          icon={Phone}
          variant="info"
          trend={{ value: "+180 today", isPositive: true }}
        />
        <StatCard
          title="Emails Sent"
          value="2,850"
          subtitle="82.6% of data"
          icon={Mail}
          variant="info"
        />
        <StatCard
          title="WhatsApp Sent"
          value="1,680"
          subtitle="48.7% of data"
          icon={MessageCircle}
          variant="info"
        />
        <StatCard
          title="First Contact Made"
          value="1,234"
          subtitle="35.8% reached"
          icon={UserCheck}
          variant="success"
        />
        <StatCard
          title="Conversation Started"
          value="892"
          subtitle="25.8% engaged"
          icon={MessageCircle}
          variant="success"
          trend={{ value: "+45 today", isPositive: true }}
        />
        <StatCard
          title="Meeting Scheduled"
          value="234"
          subtitle="6.8% of data"
          icon={TrendingUp}
          variant="default"
        />
        <StatCard
          title="Qualified Prospects"
          value="156"
          subtitle="4.5% qualified"
          icon={UserCheck}
          variant="success"
        />
        <StatCard
          title="Not Interested"
          value="678"
          subtitle="19.7% declined"
          icon={UserX}
          variant="destructive"
        />
        <StatCard
          title="Warm Follow-ups"
          value="445"
          subtitle="Callback requested"
          icon={Clock}
          variant="warning"
        />
      </div>

      {/* Activity and Conversion Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Outbound Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                calls: {
                  label: "Calls",
                  color: "hsl(var(--chart-1))",
                },
                emails: {
                  label: "Emails",
                  color: "hsl(var(--chart-2))",
                },
                whatsapp: {
                  label: "WhatsApp",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[350px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="calls" fill="hsl(var(--chart-1))" radius={4} />
                  <Bar dataKey="emails" fill="hsl(var(--chart-2))" radius={4} />
                  <Bar dataKey="whatsapp" fill="hsl(var(--chart-3))" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Conversion Rate Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                connectionRate: {
                  label: "Connection Rate %",
                  color: "hsl(var(--success))",
                },
                meetingRate: {
                  label: "Meeting Rate %",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[350px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="connectionRate"
                    stroke="hsl(var(--success))"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="meetingRate"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
