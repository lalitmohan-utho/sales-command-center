import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  ReferenceLine,
} from "recharts";

const frtTrendData = [
  { date: "Jan 8", frt: 16 },
  { date: "Jan 9", frt: 14 },
  { date: "Jan 10", frt: 18 },
  { date: "Jan 11", frt: 15 },
  { date: "Jan 12", frt: 17 },
  { date: "Jan 13", frt: 14 },
  { date: "Jan 14", frt: 16 },
];

const resolutionTrendData = [
  { date: "Jan 8", rt: 4.2 },
  { date: "Jan 9", rt: 3.8 },
  { date: "Jan 10", rt: 4.5 },
  { date: "Jan 11", rt: 4.1 },
  { date: "Jan 12", rt: 3.9 },
  { date: "Jan 13", rt: 4.3 },
  { date: "Jan 14", rt: 4.0 },
];

const slaComplianceData = [
  { category: "First Response", compliance: 87 },
  { category: "Resolution Time", compliance: 82 },
];

const backlogTrendData = [
  { date: "Jan 8", backlog: 156 },
  { date: "Jan 9", backlog: 148 },
  { date: "Jan 10", backlog: 152 },
  { date: "Jan 11", backlog: 145 },
  { date: "Jan 12", backlog: 139 },
  { date: "Jan 13", backlog: 143 },
  { date: "Jan 14", backlog: 142 },
];

export const SLAMetrics = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">
        SLA & Time Performance
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* First Response Time Trend */}
        <Card>
          <CardHeader>
            <CardTitle>First Response Time Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={frtTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis label={{ value: "Minutes", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <ReferenceLine y={15} stroke="hsl(var(--destructive))" strokeDasharray="3 3" label="Target: 15m" />
                <Line type="monotone" dataKey="frt" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Resolution Time Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Resolution Time Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={resolutionTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis label={{ value: "Hours", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <ReferenceLine y={4} stroke="hsl(var(--destructive))" strokeDasharray="3 3" label="Target: 4h" />
                <Line type="monotone" dataKey="rt" stroke="hsl(var(--info))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* SLA Compliance */}
        <Card>
          <CardHeader>
            <CardTitle>SLA Compliance %</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={slaComplianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <ReferenceLine y={90} stroke="hsl(var(--success))" strokeDasharray="3 3" label="Target: 90%" />
                <Bar dataKey="compliance" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Backlog Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Backlog Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={backlogTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis label={{ value: "Open Tickets", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Line type="monotone" dataKey="backlog" stroke="hsl(var(--warning))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
