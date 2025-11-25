import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const statusData = [
  { name: "New / Unassigned", value: 15, color: "#f59e0b" },
  { name: "In Progress", value: 68, color: "#3b82f6" },
  { name: "Pending Customer", value: 34, color: "#8b5cf6" },
  { name: "Pending Internal", value: 12, color: "#ec4899" },
  { name: "Resolved", value: 89, color: "#10b981" },
  { name: "Reopened", value: 12, color: "#ef4444" },
];

const severitySLAData = [
  { severity: "Critical", withinSLA: 45, atRisk: 8, breached: 3 },
  { severity: "High", withinSLA: 78, atRisk: 12, breached: 4 },
  { severity: "Medium", withinSLA: 124, atRisk: 15, breached: 6 },
  { severity: "Low", withinSLA: 89, atRisk: 8, breached: 2 },
];

export const TicketStatusOverview = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">
        Ticket Status & Severity Overview
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Severity vs SLA Matrix */}
        <Card>
          <CardHeader>
            <CardTitle>Severity vs SLA Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2 text-sm font-medium text-muted-foreground">
                <div>Severity</div>
                <div className="text-center">Within SLA</div>
                <div className="text-center">At Risk</div>
                <div className="text-center">Breached</div>
              </div>
              {severitySLAData.map((row) => (
                <div
                  key={row.severity}
                  className="grid grid-cols-4 gap-2 items-center border-t pt-3"
                >
                  <div className="font-medium">
                    <Badge
                      variant={
                        row.severity === "Critical"
                          ? "destructive"
                          : row.severity === "High"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {row.severity}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <span className="inline-flex items-center justify-center w-12 h-8 rounded bg-success-light text-success font-semibold">
                      {row.withinSLA}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="inline-flex items-center justify-center w-12 h-8 rounded bg-warning-light text-warning font-semibold">
                      {row.atRisk}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="inline-flex items-center justify-center w-12 h-8 rounded bg-destructive-light text-destructive font-semibold">
                      {row.breached}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
