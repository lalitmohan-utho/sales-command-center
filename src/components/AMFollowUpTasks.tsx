import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, CheckCircle2, MoreVertical, ClipboardList } from "lucide-react";

const tasks = [
  {
    priority: "High",
    account: "Acme Corp",
    contact: "Rohan Sharma",
    type: "QBR",
    due: "Today 3:30 PM",
    status: "Open",
  },
  {
    priority: "Medium",
    account: "Beta Solutions",
    contact: "Priya Patel",
    type: "Renewal Discussion",
    due: "Today 5:00 PM",
    status: "In Progress",
  },
  {
    priority: "High",
    account: "Gamma Tech",
    contact: "Amit Kumar",
    type: "Usage Review",
    due: "Feb 20, 2:00 PM",
    status: "Open",
  },
  {
    priority: "Low",
    account: "Delta Industries",
    contact: "Sneha Reddy",
    type: "Feedback Call",
    due: "Feb 21, 10:00 AM",
    status: "Open",
  },
];

export const AMFollowUpTasks = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-primary" />
          My Follow-ups & QBRs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            <TabsTrigger value="next7">Next 7 Days</TabsTrigger>
            <TabsTrigger value="next30">Next 30 Days</TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="space-y-3 mt-4">
            {tasks.slice(0, 2).map((task, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <Checkbox />
                <Badge
                  variant={task.priority === "High" ? "destructive" : "outline"}
                  className="shrink-0"
                >
                  {task.priority}
                </Badge>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm truncate">{task.account}</p>
                    <span className="text-xs text-muted-foreground">•</span>
                    <p className="text-sm text-muted-foreground truncate">
                      {task.contact}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{task.type}</span>
                    <span>•</span>
                    <span>{task.due}</span>
                    <Badge variant="secondary" className="text-xs">
                      {task.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="overdue">
            <p className="text-sm text-muted-foreground text-center py-8">
              No overdue tasks 🎉
            </p>
          </TabsContent>
          <TabsContent value="next7" className="space-y-3 mt-4">
            {tasks.slice(2).map((task, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <Checkbox />
                <Badge
                  variant={task.priority === "High" ? "destructive" : "outline"}
                  className="shrink-0"
                >
                  {task.priority}
                </Badge>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm truncate">{task.account}</p>
                    <span className="text-xs text-muted-foreground">•</span>
                    <p className="text-sm text-muted-foreground truncate">
                      {task.contact}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{task.type}</span>
                    <span>•</span>
                    <span>{task.due}</span>
                    <Badge variant="secondary" className="text-xs">
                      {task.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="next30">
            <p className="text-sm text-muted-foreground text-center py-8">
              View all tasks in next 30 days
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
