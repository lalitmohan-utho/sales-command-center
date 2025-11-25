import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const reopenReasonData = [
  { reason: "Incomplete Fix", count: 5 },
  { reason: "Root Cause Not Addressed", count: 3 },
  { reason: "Bad Communication", count: 2 },
  { reason: "Customer Misconfigured", count: 1 },
  { reason: "Issue Recurred", count: 1 },
];

const topReopenedTickets = [
  {
    id: "TKT-9823",
    customer: "TechCorp India",
    product: "Kubernetes",
    resolver: "Amit Kumar",
    reopenCount: 3,
    reason: "Root Cause Not Addressed",
    lastReopened: "2024-01-15",
    impact: "High",
  },
  {
    id: "TKT-9756",
    customer: "CloudStart Ltd",
    product: "Storage",
    resolver: "Priya Singh",
    reopenCount: 2,
    reason: "Incomplete Fix",
    lastReopened: "2024-01-14",
    impact: "Medium",
  },
  {
    id: "TKT-9698",
    customer: "DevOps Solutions",
    product: "Network",
    resolver: "Rahul Verma",
    reopenCount: 2,
    reason: "Issue Recurred",
    lastReopened: "2024-01-13",
    impact: "High",
  },
  {
    id: "TKT-9645",
    customer: "SmartApps Inc",
    product: "VMs",
    resolver: "Sneha Patel",
    reopenCount: 2,
    reason: "Incomplete Fix",
    lastReopened: "2024-01-12",
    impact: "Critical",
  },
];

export const ReopenAnalysis = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Reopened Tickets & Resolution Quality
        </h2>
        <div className="flex gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">12</div>
            <div className="text-muted-foreground">Total Reopened</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">7.7%</div>
            <div className="text-muted-foreground">Reopen Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">1.4</div>
            <div className="text-muted-foreground">Avg Reopen Count</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reopen Reason Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Reopen Reason Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={reopenReasonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="reason"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--destructive))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Reopened Tickets */}
        <Card>
          <CardHeader>
            <CardTitle>Most Reopened Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topReopenedTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{ticket.id}</div>
                          <div className="text-xs text-muted-foreground">
                            {ticket.customer}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="destructive">{ticket.reopenCount}x</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            ticket.impact === "Critical"
                              ? "destructive"
                              : ticket.impact === "High"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {ticket.impact}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reopen Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reopened Tickets Detail</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Resolver</TableHead>
                  <TableHead className="text-center">Reopen Count</TableHead>
                  <TableHead>Primary Reason</TableHead>
                  <TableHead>Last Reopened</TableHead>
                  <TableHead>Impact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topReopenedTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-mono">{ticket.id}</TableCell>
                    <TableCell>{ticket.customer}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{ticket.product}</Badge>
                    </TableCell>
                    <TableCell>{ticket.resolver}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="destructive">{ticket.reopenCount}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{ticket.reason}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {ticket.lastReopened}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          ticket.impact === "Critical"
                            ? "destructive"
                            : ticket.impact === "High"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {ticket.impact}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
