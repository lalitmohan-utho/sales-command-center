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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Calendar, TrendingUp } from "lucide-react";

const renewalData = [
  {
    date: "Feb 15, 2025",
    account: "Acme Corp",
    mrr: "₹2,50,000",
    type: "Annual",
    probability: 85,
    status: "Proposal sent",
  },
  {
    date: "Feb 22, 2025",
    account: "Beta Solutions",
    mrr: "₹1,20,000",
    type: "Monthly",
    probability: 95,
    status: "Renewed",
  },
  {
    date: "Mar 5, 2025",
    account: "Gamma Tech",
    mrr: "₹3,80,000",
    type: "Annual",
    probability: 60,
    status: "In discussion",
  },
  {
    date: "Mar 12, 2025",
    account: "Delta Industries",
    mrr: "₹95,000",
    type: "Monthly",
    probability: 40,
    status: "At risk",
  },
];

const revenueData = [
  { month: "Aug", new: 120, expansion: 85, contraction: -15, churn: -25 },
  { month: "Sep", new: 145, expansion: 92, contraction: -18, churn: -20 },
  { month: "Oct", new: 168, expansion: 105, contraction: -12, churn: -30 },
  { month: "Nov", new: 182, expansion: 118, contraction: -22, churn: -18 },
  { month: "Dec", new: 195, expansion: 135, contraction: -15, churn: -28 },
  { month: "Jan", new: 210, expansion: 148, contraction: -20, churn: -22 },
];

export const RenewalsRevenue = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Upcoming Renewals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Upcoming Renewals
          </CardTitle>
          <Select defaultValue="30">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">Next 30 days</SelectItem>
              <SelectItem value="60">Next 60 days</SelectItem>
              <SelectItem value="90">Next 90 days</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>MRR</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renewalData.map((renewal) => (
                <TableRow key={renewal.account} className="hover:bg-muted/50">
                  <TableCell className="text-sm">{renewal.date}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{renewal.account}</p>
                      <p className="text-xs text-muted-foreground">
                        {renewal.type} • {renewal.probability}% prob.
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{renewal.mrr}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        renewal.status === "Renewed"
                          ? "default"
                          : renewal.status === "At risk"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {renewal.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="outline" className="w-full mt-4">
            View All Renewals
          </Button>
        </CardContent>
      </Card>

      {/* Revenue Trend */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-success" />
            MRR Trend & Growth
          </CardTitle>
          <Select defaultValue="6">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">Last 6 months</SelectItem>
              <SelectItem value="12">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded bg-success-light">
                <p className="text-xs text-muted-foreground">Expansion</p>
                <p className="font-semibold text-success">₹6.83L</p>
              </div>
              <div className="p-2 rounded bg-warning-light">
                <p className="text-xs text-muted-foreground">Contraction</p>
                <p className="font-semibold text-warning">₹1.02L</p>
              </div>
              <div className="p-2 rounded bg-destructive-light">
                <p className="text-xs text-muted-foreground">Churn</p>
                <p className="font-semibold text-destructive">₹1.43L</p>
              </div>
              <div className="p-2 rounded bg-primary/10">
                <p className="text-xs text-muted-foreground">Net Growth</p>
                <p className="font-semibold text-primary">+15.2%</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpansion" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="expansion"
                  stackId="1"
                  stroke="hsl(var(--success))"
                  fillOpacity={1}
                  fill="url(#colorExpansion)"
                />
                <Area
                  type="monotone"
                  dataKey="new"
                  stackId="1"
                  stroke="hsl(var(--chart-1))"
                  fillOpacity={1}
                  fill="url(#colorNew)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
