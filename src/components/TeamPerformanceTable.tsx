import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

const teamData = [
  {
    name: "Rajesh Kumar",
    assigned: 380,
    calls: 342,
    connected: 234,
    meetings: 45,
    attended: 38,
    qualified: 28,
    avgAttempts: 2.8,
    followupToday: 12,
    overdue: 3,
    conversion: 7.4,
    score: 92,
  },
  {
    name: "Priya Sharma",
    assigned: 420,
    calls: 398,
    connected: 267,
    meetings: 52,
    attended: 47,
    qualified: 34,
    avgAttempts: 2.5,
    followupToday: 18,
    overdue: 2,
    conversion: 8.1,
    score: 95,
  },
  {
    name: "Amit Patel",
    assigned: 340,
    calls: 289,
    connected: 198,
    meetings: 38,
    attended: 32,
    qualified: 21,
    avgAttempts: 3.2,
    followupToday: 9,
    overdue: 5,
    conversion: 6.2,
    score: 85,
  },
  {
    name: "Sneha Singh",
    assigned: 395,
    calls: 367,
    connected: 245,
    meetings: 48,
    attended: 42,
    qualified: 31,
    avgAttempts: 2.6,
    followupToday: 14,
    overdue: 1,
    conversion: 7.8,
    score: 93,
  },
  {
    name: "Vikram Mehta",
    assigned: 310,
    calls: 278,
    connected: 189,
    meetings: 35,
    attended: 29,
    qualified: 19,
    avgAttempts: 3.1,
    followupToday: 11,
    overdue: 4,
    conversion: 6.1,
    score: 83,
  },
];

export const TeamPerformanceTable = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Team Performance</CardTitle>
            <p className="text-sm text-muted-foreground">
              Individual agent metrics and productivity scores
            </p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                <SelectItem value="inbound">Inbound Only</SelectItem>
                <SelectItem value="outbound">Outbound Only</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Sort
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent Name</TableHead>
                <TableHead className="text-right">Assigned</TableHead>
                <TableHead className="text-right">Calls</TableHead>
                <TableHead className="text-right">Connected</TableHead>
                <TableHead className="text-right">Meetings</TableHead>
                <TableHead className="text-right">Attended</TableHead>
                <TableHead className="text-right">Qualified</TableHead>
                <TableHead className="text-right">Avg Attempts</TableHead>
                <TableHead className="text-right">Due Today</TableHead>
                <TableHead className="text-right">Overdue</TableHead>
                <TableHead className="text-right">Conv %</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamData.map((agent) => (
                <TableRow key={agent.name}>
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell className="text-right">{agent.assigned}</TableCell>
                  <TableCell className="text-right">{agent.calls}</TableCell>
                  <TableCell className="text-right">{agent.connected}</TableCell>
                  <TableCell className="text-right">{agent.meetings}</TableCell>
                  <TableCell className="text-right">{agent.attended}</TableCell>
                  <TableCell className="text-right">{agent.qualified}</TableCell>
                  <TableCell className="text-right">{agent.avgAttempts}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary">{agent.followupToday}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {agent.overdue > 0 ? (
                      <Badge variant="destructive">{agent.overdue}</Badge>
                    ) : (
                      <span className="text-muted-foreground">0</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {agent.conversion.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={agent.score >= 90 ? "default" : agent.score >= 85 ? "secondary" : "outline"}
                    >
                      {agent.score}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
