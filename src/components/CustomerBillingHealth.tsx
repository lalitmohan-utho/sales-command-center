import { AlertTriangle, Download } from "lucide-react";
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

const customers = [
  {
    name: "TechVision Pvt Ltd",
    mrr: 95000,
    healthScore: 92,
    avgPaymentDelay: 3,
    totalOverdues: 0,
    refundCount: 0,
    risk: "Low",
  },
  {
    name: "CloudWorks Solutions",
    healthScore: 88,
    mrr: 125000,
    avgPaymentDelay: 7,
    totalOverdues: 1,
    refundCount: 1,
    risk: "Low",
  },
  {
    name: "DataCore Systems",
    healthScore: 65,
    mrr: 85000,
    avgPaymentDelay: 28,
    totalOverdues: 3,
    refundCount: 2,
    risk: "Medium",
  },
  {
    name: "StartupHub",
    healthScore: 45,
    mrr: 35000,
    avgPaymentDelay: 52,
    totalOverdues: 5,
    refundCount: 4,
    risk: "High",
  },
  {
    name: "WebScale Pro",
    healthScore: 78,
    mrr: 65000,
    avgPaymentDelay: 12,
    totalOverdues: 2,
    refundCount: 1,
    risk: "Low",
  },
  {
    name: "InnovateTech Ltd",
    healthScore: 38,
    mrr: 145000,
    avgPaymentDelay: 67,
    totalOverdues: 6,
    refundCount: 3,
    risk: "High",
  },
];

const formatCurrency = (value: number) => {
  return `₹${(value / 1000).toFixed(0)}K`;
};

const getHealthScoreColor = (score: number) => {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-warning";
  return "text-destructive";
};

const getHealthScoreBg = (score: number) => {
  if (score >= 80) return "bg-success/10";
  if (score >= 60) return "bg-warning/10";
  return "bg-destructive/10";
};

const getRiskBadge = (risk: string) => {
  switch (risk) {
    case "Low":
      return <Badge variant="success">Low</Badge>;
    case "Medium":
      return <Badge variant="warning">Medium</Badge>;
    case "High":
      return <Badge variant="destructive">High</Badge>;
    default:
      return <Badge variant="default">{risk}</Badge>;
  }
};

export const CustomerBillingHealth = () => {
  const highRiskCustomers = customers.filter((c) => c.risk === "High");

  return (
    <div className="space-y-6">
      {/* Top Risk Customers Alert */}
      {highRiskCustomers.length > 0 && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              High Risk Customers ({highRiskCustomers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {highRiskCustomers.map((customer) => (
                <div
                  key={customer.name}
                  className="flex items-center justify-between p-3 bg-background rounded-lg"
                >
                  <div>
                    <div className="font-medium text-foreground">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {customer.totalOverdues} overdues in last 6 months • {customer.refundCount}{" "}
                      refund requests
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Avg Delay</div>
                      <div className="text-lg font-bold text-destructive">
                        {customer.avgPaymentDelay} days
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Customer Health Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Customer Billing Health Scorecard</CardTitle>
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
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">MRR / Avg Invoice</TableHead>
                  <TableHead className="text-center">Health Score</TableHead>
                  <TableHead className="text-right">Avg Payment Delay</TableHead>
                  <TableHead className="text-center">Total Overdues</TableHead>
                  <TableHead className="text-center">Refund Count</TableHead>
                  <TableHead>Risk Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.name}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(customer.mrr)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <div
                          className={`px-3 py-1 rounded-full ${getHealthScoreBg(
                            customer.healthScore
                          )}`}
                        >
                          <span
                            className={`text-lg font-bold ${getHealthScoreColor(
                              customer.healthScore
                            )}`}
                          >
                            {customer.healthScore}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={
                          customer.avgPaymentDelay > 30
                            ? "text-destructive font-semibold"
                            : customer.avgPaymentDelay > 14
                            ? "text-warning font-semibold"
                            : "text-muted-foreground"
                        }
                      >
                        {customer.avgPaymentDelay} days
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={customer.totalOverdues > 3 ? "destructive" : "secondary"}
                      >
                        {customer.totalOverdues}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={customer.refundCount > 2 ? "destructive" : "secondary"}
                      >
                        {customer.refundCount}
                      </Badge>
                    </TableCell>
                    <TableCell>{getRiskBadge(customer.risk)}</TableCell>
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
