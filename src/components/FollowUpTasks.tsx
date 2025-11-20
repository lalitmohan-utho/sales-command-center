import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Phone,
  Mail,
  MessageCircle,
  Video,
  Check,
  MoreVertical,
  AlertCircle,
} from "lucide-react";

interface Task {
  id: string;
  priority: "high" | "medium" | "low";
  contact: string;
  company: string;
  deal?: string;
  type: "call" | "email" | "whatsapp" | "meeting";
  dueTime: string;
  status: "open" | "in_progress" | "completed";
}

const tasks: Task[] = [
  {
    id: "1",
    priority: "high",
    contact: "Rohan Sharma",
    company: "ABC Corp",
    deal: "Cloud Migration",
    type: "call",
    dueTime: "Today 3:30 PM",
    status: "open",
  },
  {
    id: "2",
    priority: "medium",
    contact: "Ananya Patel",
    company: "Tech Solutions",
    type: "email",
    dueTime: "Today 5:00 PM",
    status: "open",
  },
  {
    id: "3",
    priority: "high",
    contact: "Vikram Singh",
    company: "DataFlow Inc",
    deal: "SaaS Integration",
    type: "meeting",
    dueTime: "Tomorrow 10:00 AM",
    status: "in_progress",
  },
];

const priorityStyles = {
  high: "bg-destructive-light text-destructive",
  medium: "bg-warning-light text-warning",
  low: "bg-success-light text-success",
};

const typeIcons = {
  call: Phone,
  email: Mail,
  whatsapp: MessageCircle,
  meeting: Video,
};

export const FollowUpTasks = () => {
  const [activeTab, setActiveTab] = useState("today");

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold">
              Follow-ups & Tasks
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Stay on top of your pipeline
            </p>
          </div>
          <Badge variant="secondary" className="bg-destructive-light text-destructive">
            <AlertCircle className="w-3 h-3 mr-1" />
            2 Overdue
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            <TabsTrigger value="week">Next 7 Days</TabsTrigger>
            <TabsTrigger value="month">Next 30 Days</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-3">
              {tasks.map((task) => {
                const TypeIcon = typeIcons[task.type];
                return (
                  <div
                    key={task.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox />
                    <Badge className={priorityStyles[task.priority]}>
                      {task.priority}
                    </Badge>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{task.contact}</h4>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {task.company}
                        </span>
                      </div>
                      {task.deal && (
                        <p className="text-sm text-muted-foreground">
                          Deal: {task.deal}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <TypeIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {task.dueTime}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
