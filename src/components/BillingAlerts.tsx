import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const alerts = [
  {
    id: 1,
    severity: "High",
    title: "Large Overdue Amount - InnovateTech Ltd",
    description:
      "Outstanding amount of ₹4.12L overdue by 67 days. Customer has repeated payment delays.",
    action: "Escalate to Sales",
    icon: AlertCircle,
  },
  {
    id: 2,
    severity: "High",
    title: "Very Old Outstanding - TechCorp Solutions",
    description: "Invoice INV-2024-1234 is 90+ days overdue. Amount: ₹2.85L",
    action: "Contact CA / Legal",
    icon: AlertCircle,
  },
  {
    id: 3,
    severity: "Medium",
    title: "High Refund Account - DataCore Systems",
    description:
      "Customer has requested 4 refunds in the last 3 months totaling ₹1.2L. Pattern of service complaints.",
    action: "Flag to Support",
    icon: AlertTriangle,
  },
  {
    id: 4,
    severity: "Medium",
    title: "GST GSTIN Missing - WebScale Pro",
    description:
      "Account marked as GST Registered but GSTIN details not on file. Recent invoice raised.",
    action: "Request GSTIN",
    icon: AlertTriangle,
  },
  {
    id: 5,
    severity: "Low",
    title: "Negative Balance - CloudStart Inc",
    description:
      "Customer account shows negative balance of ₹15K due to double payment. Refund pending.",
    action: "Process Refund",
    icon: Info,
  },
  {
    id: 6,
    severity: "High",
    title: "Collection Issue - Multiple Accounts",
    description:
      "8 invoices from different customers have crossed 60-day overdue mark this week.",
    action: "Bulk Follow-up",
    icon: AlertCircle,
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "High":
      return "destructive";
    case "Medium":
      return "warning";
    case "Low":
      return "secondary";
    default:
      return "default";
  }
};

const getSeverityIcon = (severity: string, IconComponent: any) => {
  const colorClass =
    severity === "High"
      ? "text-destructive"
      : severity === "Medium"
      ? "text-warning"
      : "text-info";
  return <IconComponent className={`w-5 h-5 ${colorClass}`} />;
};

export const BillingAlerts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {alerts.map((alert) => (
        <Card key={alert.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                {getSeverityIcon(alert.severity, alert.icon)}
                <div>
                  <Badge variant={getSeverityColor(alert.severity)} className="mb-2">
                    {alert.severity}
                  </Badge>
                  <CardTitle className="text-base">{alert.title}</CardTitle>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{alert.description}</p>
            <div className="flex gap-2">
              <Button
                variant={alert.severity === "High" ? "default" : "outline"}
                size="sm"
              >
                {alert.action}
              </Button>
              <Button variant="ghost" size="sm">
                Dismiss
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
