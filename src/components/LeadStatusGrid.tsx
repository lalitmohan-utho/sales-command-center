import {
  UserPlus,
  Users,
  UserX,
  Target,
  AlertTriangle,
  RefreshCw,
  Trash2,
  UserCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const statusData = [
  { title: "New Leads", value: 127, icon: UserPlus, color: "text-info" },
  {
    title: "Active Contacts",
    value: 456,
    icon: Users,
    color: "text-success",
  },
  {
    title: "Not Contacted",
    value: 89,
    icon: UserX,
    color: "text-warning",
  },
  { title: "Contacted", value: 324, icon: UserCheck, color: "text-primary" },
  {
    title: "Urgent Contacts",
    value: 23,
    icon: AlertTriangle,
    color: "text-destructive",
  },
  {
    title: "Retargeting",
    value: 67,
    icon: RefreshCw,
    color: "text-accent",
  },
  { title: "Junk Leads", value: 45, icon: Trash2, color: "text-muted-foreground" },
  {
    title: "Lost Customers",
    value: 34,
    icon: Target,
    color: "text-destructive",
  },
];

export const LeadStatusGrid = () => {
  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Lead & Contact Status
        </CardTitle>
        <p className="text-sm text-muted-foreground">Current pipeline health</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {statusData.map((item) => (
            <div
              key={item.title}
              className="flex flex-col p-4 border rounded-lg hover:bg-muted/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <item.icon
                  className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`}
                />
                <span className="text-2xl font-bold">{item.value}</span>
              </div>
              <p className="text-xs text-muted-foreground">{item.title}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
