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
import { Briefcase, Server, Container, Database, HardDrive } from "lucide-react";

const accounts = [
  {
    name: "Acme Corp",
    segment: "Enterprise",
    industry: "Technology",
    mrr: "₹2,50,000",
    health: 92,
    nps: 9,
    products: ["VM", "K8s", "DB", "Storage"],
    renewal: "Mar 15, 2025",
    lastContact: "2 days ago",
    atRisk: false,
    growth: "Expanding",
  },
  {
    name: "Beta Solutions",
    segment: "Mid-Market",
    industry: "Finance",
    mrr: "₹1,20,000",
    health: 85,
    nps: 8,
    products: ["VM", "DB"],
    renewal: "Apr 8, 2025",
    lastContact: "5 days ago",
    atRisk: false,
    growth: "Stable",
  },
  {
    name: "Gamma Tech",
    segment: "SMB",
    industry: "Retail",
    mrr: "₹64,000",
    health: 55,
    nps: 6,
    products: ["VM", "Storage"],
    renewal: "May 22, 2025",
    lastContact: "12 days ago",
    atRisk: true,
    growth: "Shrinking",
  },
  {
    name: "Delta Industries",
    segment: "Enterprise",
    industry: "Manufacturing",
    mrr: "₹3,80,000",
    health: 78,
    nps: 7,
    products: ["VM", "K8s", "DB", "Storage"],
    renewal: "Jun 10, 2025",
    lastContact: "1 day ago",
    atRisk: false,
    growth: "Expanding",
  },
];

const productIcons: Record<string, any> = {
  VM: Server,
  K8s: Container,
  DB: Database,
  Storage: HardDrive,
};

export const AccountPortfolioTable = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          My Account Portfolio
        </CardTitle>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Accounts</SelectItem>
              <SelectItem value="healthy">Healthy</SelectItem>
              <SelectItem value="risk">At Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account</TableHead>
              <TableHead>Segment</TableHead>
              <TableHead>MRR</TableHead>
              <TableHead>Health</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Renewal</TableHead>
              <TableHead>Growth</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.name} className="hover:bg-muted/50">
                <TableCell>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{account.name}</p>
                      {account.atRisk && (
                        <Badge variant="destructive" className="text-xs">
                          At Risk
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {account.industry}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {account.segment}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{account.mrr}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          account.health >= 80
                            ? "bg-success"
                            : account.health >= 60
                            ? "bg-warning"
                            : "bg-destructive"
                        }`}
                        style={{ width: `${account.health}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium">{account.health}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {account.products.map((prod) => {
                      const Icon = productIcons[prod];
                      return (
                        <div
                          key={prod}
                          className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center"
                          title={prod}
                        >
                          <Icon className="w-3 h-3 text-primary" />
                        </div>
                      );
                    })}
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {account.renewal}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      account.growth === "Expanding"
                        ? "default"
                        : account.growth === "Shrinking"
                        ? "destructive"
                        : "outline"
                    }
                    className="text-xs"
                  >
                    {account.growth}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant="outline" className="w-full mt-4">
          View All Accounts
        </Button>
      </CardContent>
    </Card>
  );
};
