import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Calendar,
  Activity,
} from "lucide-react";

const activities = [
  {
    type: "renewal",
    icon: CheckCircle2,
    color: "text-success",
    title: "Renewal closed",
    description: "Acme Corp renewed annual contract (₹2,50,000)",
    time: "2 hours ago",
    owner: "Lalit Kumar",
  },
  {
    type: "qbr",
    icon: Calendar,
    color: "text-info",
    title: "QBR completed",
    description: "Beta Solutions – Health score improved to 85",
    time: "5 hours ago",
    owner: "Priya Sharma",
  },
  {
    type: "upsell",
    icon: TrendingUp,
    color: "text-primary",
    title: "Upsell activated",
    description: "Delta Industries added 10 VMs (₹45,000 MRR)",
    time: "1 day ago",
    owner: "Lalit Kumar",
  },
  {
    type: "churn",
    icon: XCircle,
    color: "text-destructive",
    title: "Churn event",
    description: "TechStart cancelled (₹25,000 MRR). Reason: Budget cuts",
    time: "2 days ago",
    owner: "Amit Patel",
  },
  {
    type: "call",
    icon: Phone,
    color: "text-foreground",
    title: "Customer call",
    description: "Gamma Tech – Discussed usage optimization",
    time: "3 days ago",
    owner: "Priya Sharma",
  },
  {
    type: "email",
    icon: Mail,
    color: "text-muted-foreground",
    title: "Follow-up sent",
    description: "Sent renewal proposal to Epsilon Inc",
    time: "4 days ago",
    owner: "Lalit Kumar",
  },
];

export const AMActivityTimeline = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Recent Activity
        </CardTitle>
        <Select defaultValue="my">
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="my">My activity</SelectItem>
            <SelectItem value="team">My team</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, idx) => (
            <div key={idx} className="flex gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  activity.type === "renewal"
                    ? "bg-success-light"
                    : activity.type === "churn"
                    ? "bg-destructive-light"
                    : activity.type === "upsell"
                    ? "bg-primary/10"
                    : "bg-muted"
                }`}
              >
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-sm">{activity.title}</p>
                  {activity.type === "renewal" && (
                    <Badge variant="default" className="text-xs">
                      Closed
                    </Badge>
                  )}
                  {activity.type === "churn" && (
                    <Badge variant="destructive" className="text-xs">
                      Lost
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {activity.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{activity.time}</span>
                  <span>•</span>
                  <span>{activity.owner}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
