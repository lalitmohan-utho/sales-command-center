import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare, FileText, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const followUpData = {
  today: [
    {
      id: 1,
      leadName: "Acme Corp",
      status: "Callback Requested",
      owner: "Rajesh Kumar",
      phone: "+91 98765 43210",
      lastContact: "Yesterday, 3:45 PM",
      nextAction: "QBR Discussion",
      priority: "high",
    },
    {
      id: 2,
      leadName: "TechStart Solutions",
      status: "Follow-up Required",
      owner: "Priya Sharma",
      phone: "+91 98765 43211",
      lastContact: "2 days ago",
      nextAction: "Trial Follow-up",
      priority: "medium",
    },
  ],
  overdue: [
    {
      id: 3,
      leadName: "Cloud Innovations",
      status: "Meeting Scheduled",
      owner: "Amit Patel",
      phone: "+91 98765 43212",
      lastContact: "5 days ago",
      nextAction: "Renewal Call",
      priority: "high",
    },
  ],
  next7days: [
    {
      id: 4,
      leadName: "Digital Dynamics",
      status: "Sent Information",
      owner: "Sneha Singh",
      phone: "+91 98765 43213",
      lastContact: "1 day ago",
      nextAction: "Usage Review",
      priority: "low",
    },
  ],
};

const priorityColors = {
  high: "destructive",
  medium: "warning",
  low: "secondary",
} as const;

const TaskTable = ({ data }: { data: typeof followUpData.today }) => (
  <div className="rounded-lg border overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Lead Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Last Contact</TableHead>
          <TableHead>Next Action</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.leadName}</TableCell>
            <TableCell>
              <Badge variant="outline">{task.status}</Badge>
            </TableCell>
            <TableCell>{task.owner}</TableCell>
            <TableCell className="font-mono text-sm">{task.phone}</TableCell>
            <TableCell className="text-muted-foreground text-sm">
              {task.lastContact}
            </TableCell>
            <TableCell>{task.nextAction}</TableCell>
            <TableCell>
              <Badge variant={priorityColors[task.priority]}>
                {task.priority.toUpperCase()}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export const FollowUpManager = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Follow-up & Task Management</CardTitle>
        <p className="text-sm text-muted-foreground">
          Track and manage all follow-up activities
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">
              Today
              <Badge variant="secondary" className="ml-2">
                {followUpData.today.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="overdue">
              Overdue
              <Badge variant="destructive" className="ml-2">
                {followUpData.overdue.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="next7">
              Next 7 Days
              <Badge variant="secondary" className="ml-2">
                {followUpData.next7days.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="next30">Next 30 Days</TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="mt-6">
            <TaskTable data={followUpData.today} />
          </TabsContent>
          <TabsContent value="overdue" className="mt-6">
            <TaskTable data={followUpData.overdue} />
          </TabsContent>
          <TabsContent value="next7" className="mt-6">
            <TaskTable data={followUpData.next7days} />
          </TabsContent>
          <TabsContent value="next30" className="mt-6">
            <div className="text-center py-12 text-muted-foreground">
              No tasks scheduled for next 30 days
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
