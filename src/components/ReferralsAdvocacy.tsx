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
import { Users, Award } from "lucide-react";

const referralStats = [
  { label: "Total Referrals", value: "28", color: "text-primary" },
  { label: "Converted", value: "12", color: "text-success" },
  { label: "Referral MRR", value: "₹8.4L", color: "text-info" },
];

const referralPipeline = [
  {
    referrer: "Acme Corp",
    contact: "Rohan Sharma",
    referred: "NewTech Solutions",
    status: "Converted",
    mrr: "₹1,20,000",
  },
  {
    referrer: "Beta Solutions",
    contact: "Priya Patel",
    referred: "StartupX Inc",
    status: "In Contact",
    mrr: "₹85,000",
  },
  {
    referrer: "Gamma Tech",
    contact: "Amit Kumar",
    referred: "CloudFirst Ltd",
    status: "New",
    mrr: "₹1,50,000",
  },
];

const advocates = [
  { account: "Acme Corp", nps: 9, health: 92, tenure: "24 months", note: "Happy with K8s performance" },
  { account: "Beta Solutions", nps: 10, health: 88, tenure: "18 months", note: "Great cost savings" },
  { account: "Epsilon Inc", nps: 9, health: 85, tenure: "12 months", note: "Excellent support team" },
];

export const ReferralsAdvocacy = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Referral Summary & Pipeline */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Referrals & Customer Advocacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {referralStats.map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-lg bg-muted/50">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Pipeline Table */}
          <div>
            <h4 className="text-sm font-medium mb-3">Referral Pipeline</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Referrer</TableHead>
                  <TableHead>Referred Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Potential MRR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referralPipeline.map((ref, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{ref.referrer}</p>
                        <p className="text-xs text-muted-foreground">{ref.contact}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{ref.referred}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          ref.status === "Converted"
                            ? "default"
                            : ref.status === "In Contact"
                            ? "outline"
                            : "secondary"
                        }
                      >
                        {ref.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{ref.mrr}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Advocacy Candidates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-warning" />
            Advocacy Candidates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {advocates.map((advocate) => (
              <div
                key={advocate.account}
                className="p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-sm">{advocate.account}</p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      NPS: {advocate.nps}
                    </Badge>
                    <Badge variant="default" className="text-xs">
                      {advocate.health}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  Tenure: {advocate.tenure}
                </p>
                <p className="text-xs text-foreground italic">"{advocate.note}"</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
