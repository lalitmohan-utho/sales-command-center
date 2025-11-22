import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { AlertCircle, ExternalLink } from "lucide-react";

const ticketStats = [
  { label: "Open Tickets", value: "42", color: "text-info" },
  { label: "Critical (P1)", value: "5", color: "text-destructive" },
  { label: "Avg Resolution", value: "4.2h", color: "text-success" },
  { label: "CSAT Score", value: "4.3/5", color: "text-warning" },
];

const priorityData = [
  { name: "Critical", value: 5, color: "hsl(var(--destructive))" },
  { name: "High", value: 12, color: "hsl(var(--warning))" },
  { name: "Medium", value: 18, color: "hsl(var(--info))" },
  { name: "Low", value: 7, color: "hsl(var(--success))" },
];

const topIssues = [
  {
    id: "TKT-1234",
    account: "Acme Corp",
    subject: "K8s cluster connection timeout",
    priority: "Critical",
    status: "In Progress",
    age: "2h",
  },
  {
    id: "TKT-1235",
    account: "Beta Solutions",
    subject: "Storage quota exceeded",
    priority: "High",
    status: "Open",
    age: "5h",
  },
  {
    id: "TKT-1236",
    account: "Gamma Tech",
    subject: "Billing discrepancy query",
    priority: "Medium",
    status: "Pending",
    age: "1d",
  },
];

export const SupportExperience = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-info" />
          Support Tickets & Experience
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Ticket Stats */}
          <div className="space-y-3">
            {ticketStats.map((stat) => (
              <div key={stat.label} className="p-3 rounded-lg bg-muted/50">
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Priority Chart */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">By Priority</h4>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1">
              {priorityData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Issues Table */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-medium mb-3">Critical & High Priority Issues</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topIssues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-xs">{issue.id}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                          {issue.subject}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{issue.account}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          issue.priority === "Critical"
                            ? "destructive"
                            : issue.priority === "High"
                            ? "outline"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {issue.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {issue.age}
                    </TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost" className="h-7 w-7">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
