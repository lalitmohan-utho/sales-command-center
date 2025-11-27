import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const refundReasons = [
  { reason: "Overbilling", amount: 385000, count: 12 },
  { reason: "Customer Complaint", amount: 295000, count: 18 },
  { reason: "Trial Cancellation", amount: 215000, count: 24 },
  { reason: "Double Payment", amount: 180000, count: 8 },
  { reason: "Service Issue", amount: 125000, count: 15 },
];

const recentRefunds = [
  {
    date: "2024-12-28",
    customer: "TechFlow Systems",
    invoice: "INV-2024-1445",
    refundId: "REF-2024-0089",
    amount: 45000,
    reason: "Overbilling",
    processedBy: "Anita Desai",
    ticketId: "SUP-8934",
    status: "Processed",
  },
  {
    date: "2024-12-27",
    customer: "CloudNet Inc",
    invoice: "INV-2024-1432",
    refundId: "REF-2024-0088",
    amount: 28000,
    reason: "Trial Cancellation",
    processedBy: "Rahul Verma",
    ticketId: "SUP-8921",
    status: "Processed",
  },
  {
    date: "2024-12-26",
    customer: "DataCore Ltd",
    invoice: "INV-2024-1419",
    refundId: "REF-2024-0087",
    amount: 67000,
    reason: "Customer Complaint",
    processedBy: "Priya Gupta",
    ticketId: "SUP-8908",
    status: "Pending",
  },
  {
    date: "2024-12-25",
    customer: "WebScale Pro",
    invoice: "INV-2024-1407",
    refundId: "REF-2024-0086",
    amount: 15000,
    reason: "Double Payment",
    processedBy: "Amit Shah",
    ticketId: "SUP-8895",
    status: "Processed",
  },
];

const COLORS = [
  "hsl(var(--destructive))",
  "hsl(var(--warning))",
  "hsl(var(--info))",
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
];

const formatCurrency = (value: number) => {
  return `₹${(value / 1000).toFixed(0)}K`;
};

export const RefundAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Refunds</div>
            <div className="text-2xl font-bold text-foreground">₹12.0L</div>
            <div className="text-xs text-muted-foreground mt-1">This month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Transactions</div>
            <div className="text-2xl font-bold text-foreground">77</div>
            <div className="text-xs text-muted-foreground mt-1">Refund count</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Refund Rate</div>
            <div className="text-2xl font-bold text-warning">3.1%</div>
            <div className="text-xs text-muted-foreground mt-1">Of collected</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Avg Processing</div>
            <div className="text-2xl font-bold text-foreground">2.3 days</div>
            <div className="text-xs text-muted-foreground mt-1">Time to refund</div>
          </CardContent>
        </Card>
      </div>

      {/* Refund by Reason Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Refund Amount by Reason</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={refundReasons} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                type="number"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={formatCurrency}
              />
              <YAxis 
                type="category"
                dataKey="reason"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                width={150}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Bar dataKey="amount" name="Amount" radius={[0, 8, 8, 0]}>
                {refundReasons.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Refunds Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Refunds & Credits</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Invoice No.</TableHead>
                  <TableHead>Refund ID</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Processed By</TableHead>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentRefunds.map((refund) => (
                  <TableRow key={refund.refundId}>
                    <TableCell>{refund.date}</TableCell>
                    <TableCell className="font-medium">{refund.customer}</TableCell>
                    <TableCell className="font-mono text-sm">{refund.invoice}</TableCell>
                    <TableCell className="font-mono text-sm text-primary">
                      {refund.refundId}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(refund.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{refund.reason}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {refund.processedBy}
                    </TableCell>
                    <TableCell>
                      <a href="#" className="text-sm text-primary hover:underline">
                        {refund.ticketId}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Badge variant={refund.status === "Processed" ? "success" : "warning"}>
                        {refund.status}
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
