import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MessageCircle,
  TrendingUp,
  UserPlus,
  FileText,
} from "lucide-react";

interface Activity {
  id: string;
  type: "call" | "email" | "message" | "deal_moved" | "lead_added" | "note";
  user: string;
  contact?: string;
  company?: string;
  description: string;
  time: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "call",
    user: "Lalit",
    contact: "Rohan",
    company: "ABC Corp",
    description: "Outcome: Interested, follow-up tomorrow",
    time: "10 mins ago",
  },
  {
    id: "2",
    type: "deal_moved",
    user: "Nikhil",
    description: "Moved 'XYZ Cloud Migration' to Negotiation – ₹2,50,000",
    time: "25 mins ago",
  },
  {
    id: "3",
    type: "email",
    user: "Ananya",
    contact: "Vikram",
    company: "Tech Solutions",
    description: "Proposal shared",
    time: "1 hour ago",
  },
  {
    id: "4",
    type: "lead_added",
    user: "Priya",
    description: "Added new lead: DataFlow Enterprise",
    time: "2 hours ago",
  },
  {
    id: "5",
    type: "note",
    user: "Lalit",
    contact: "Rohan",
    description: "Added follow-up note about pricing discussion",
    time: "3 hours ago",
  },
];

const activityIcons = {
  call: { icon: Phone, color: "text-info" },
  email: { icon: Mail, color: "text-success" },
  message: { icon: MessageCircle, color: "text-accent" },
  deal_moved: { icon: TrendingUp, color: "text-warning" },
  lead_added: { icon: UserPlus, color: "text-primary" },
  note: { icon: FileText, color: "text-muted-foreground" },
};

export const ActivityTimeline = () => {
  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Team updates</p>
          </div>
          <Badge variant="secondary">Live</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const { icon: Icon, color } = activityIcons[activity.type];
            return (
              <div key={activity.id} className="flex gap-3">
                <div className="relative">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full bg-muted ${color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {index < activities.length - 1 && (
                    <div className="absolute top-10 left-5 w-px h-8 bg-border" />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">{activity.user}</span>
                        {activity.contact && (
                          <>
                            {" "}
                            →{" "}
                            <span className="font-medium">
                              {activity.contact}
                            </span>
                            {activity.company && (
                              <span className="text-muted-foreground">
                                {" "}
                                ({activity.company})
                              </span>
                            )}
                          </>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
