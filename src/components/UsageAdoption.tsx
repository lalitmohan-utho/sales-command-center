import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Server, Container, Database, HardDrive, Network, Cloud } from "lucide-react";

const productAdoption = [
  { name: "Cloud Instances", icon: Server, accounts: 85, usage: "1,240 VMs", adoption: "High" },
  { name: "Kubernetes", icon: Container, accounts: 52, usage: "180 clusters", adoption: "High" },
  { name: "Databases", icon: Database, accounts: 68, usage: "340 DBs", adoption: "Medium" },
  { name: "Object Storage", icon: HardDrive, accounts: 94, usage: "480 TB", adoption: "High" },
  { name: "Load Balancers", icon: Network, accounts: 42, usage: "156 LBs", adoption: "Medium" },
  { name: "Other Services", icon: Cloud, accounts: 38, usage: "Mixed", adoption: "Low" },
];

const utilizationData = [
  {
    account: "Metro Solutions",
    usage: "2 VMs | 0 K8s | 100 GB",
    utilization: "Under-utilized",
    suggestion: "Schedule optimization call",
  },
  {
    account: "Enterprise Cloud Co",
    usage: "45 VMs | 8 K8s | 12 TB",
    utilization: "Over-utilized",
    suggestion: "Recommend upgrade to higher tier",
  },
  {
    account: "Startup Labs",
    usage: "8 VMs | 2 K8s | 1.5 TB",
    utilization: "Normal",
    suggestion: "All good",
  },
  {
    account: "Tech Innovators",
    usage: "1 VM | 0 K8s | 50 GB",
    utilization: "Under-utilized",
    suggestion: "Check if they need the service",
  },
];

export const UsageAdoption = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Product Adoption */}
      <Card>
        <CardHeader>
          <CardTitle>Product Adoption</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {productAdoption.map((product) => (
              <div
                key={product.name}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <product.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.usage}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{product.accounts}</p>
                  <Badge
                    variant={
                      product.adoption === "High"
                        ? "default"
                        : product.adoption === "Medium"
                        ? "outline"
                        : "secondary"
                    }
                    className="text-xs"
                  >
                    {product.adoption}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Anomalies */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Usage & Utilization Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Key Usage</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead>Suggested Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {utilizationData.map((item) => (
                <TableRow key={item.account} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{item.account}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {item.usage}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.utilization === "Under-utilized"
                          ? "destructive"
                          : item.utilization === "Over-utilized"
                          ? "outline"
                          : "default"
                      }
                    >
                      {item.utilization}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{item.suggestion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
