import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { AlertTriangle, ExternalLink } from "lucide-react";

const healthData = [
  { name: "Healthy", value: 45, color: "hsl(var(--success))" },
  { name: "Watchlist", value: 28, color: "hsl(var(--warning))" },
  { name: "At Risk", value: 18, color: "hsl(var(--destructive))" },
  { name: "Critical", value: 9, color: "hsl(var(--destructive-light))" },
];

const atRiskAccounts = [
  {
    name: "TechStart Solutions",
    healthScore: 42,
    mrr: "₹85,000",
    usage: "3 VMs | 1 K8s | 500 GB",
    lastActivity: "18 days ago",
    tickets: 5,
    renewal: "Mar 15, 2025",
    risks: ["Low usage", "High tickets"],
  },
  {
    name: "Digital Innovators Pvt Ltd",
    healthScore: 38,
    mrr: "₹1,25,000",
    usage: "12 VMs | 2 K8s | 2 TB",
    lastActivity: "25 days ago",
    tickets: 3,
    renewal: "Apr 8, 2025",
    risks: ["Payment delays", "No engagement"],
  },
  {
    name: "CloudFirst Corp",
    healthScore: 55,
    mrr: "₹64,000",
    usage: "5 VMs | 0 K8s | 800 GB",
    lastActivity: "12 days ago",
    tickets: 8,
    renewal: "May 22, 2025",
    risks: ["Critical tickets", "Low adoption"],
  },
];

export const AccountHealthRisk = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          Account Health & Churn Risk
        </CardTitle>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All At-Risk</SelectItem>
            <SelectItem value="critical">Critical Only</SelectItem>
            <SelectItem value="watchlist">Watchlist</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Health Distribution Chart */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Health Score Distribution
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={healthData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {healthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {healthData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* At-Risk Accounts Table */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              High Priority At-Risk Accounts
            </h3>
            <div className="space-y-3">
              {atRiskAccounts.map((account) => (
                <div
                  key={account.name}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground flex items-center gap-2">
                        {account.name}
                        <Badge
                          variant={
                            account.healthScore < 40 ? "destructive" : "outline"
                          }
                        >
                          Score: {account.healthScore}
                        </Badge>
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        MRR: {account.mrr} • {account.usage}
                      </p>
                    </div>
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex gap-2">
                      {account.risks.map((risk) => (
                        <Badge key={risk} variant="outline" className="text-xs">
                          {risk}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-muted-foreground">
                      Last contact: {account.lastActivity}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span>{account.tickets} open tickets</span>
                    <span>Renewal: {account.renewal}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
