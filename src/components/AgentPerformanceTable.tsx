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
import { Progress } from "@/components/ui/progress";

const agentData = [
  {
    name: "Amit Kumar",
    role: "L2",
    assigned: 42,
    newToday: 8,
    resolved: 38,
    reopened: 3,
    reopenRate: "7.9%",
    avgFRT: "14m",
    avgRT: "3.8h",
    backlog: 15,
    breaches: 2,
    csat: 4.7,
    status: "Active",
  },
  {
    name: "Priya Singh",
    role: "L1",
    assigned: 35,
    newToday: 6,
    resolved: 42,
    reopened: 5,
    reopenRate: "11.9%",
    avgFRT: "18m",
    avgRT: "4.5h",
    backlog: 12,
    breaches: 3,
    csat: 4.5,
    status: "Active",
  },
  {
    name: "Rahul Verma",
    role: "SRE",
    assigned: 28,
    newToday: 4,
    resolved: 25,
    reopened: 1,
    reopenRate: "4.0%",
    avgFRT: "12m",
    avgRT: "3.2h",
    backlog: 8,
    breaches: 0,
    csat: 4.8,
    status: "Active",
  },
  {
    name: "Sneha Patel",
    role: "L1",
    assigned: 38,
    newToday: 7,
    resolved: 35,
    reopened: 4,
    reopenRate: "11.4%",
    avgFRT: "16m",
    avgRT: "4.1h",
    backlog: 14,
    breaches: 1,
    csat: 4.6,
    status: "Active",
  },
  {
    name: "Vikram Rao",
    role: "L2",
    assigned: 0,
    newToday: 0,
    resolved: 31,
    reopened: 2,
    reopenRate: "6.5%",
    avgFRT: "15m",
    avgRT: "3.9h",
    backlog: 0,
    breaches: 1,
    csat: 4.7,
    status: "On Leave",
  },
];

export const AgentPerformanceTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Performance & Workload</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-center">Assigned (Open)</TableHead>
                <TableHead className="text-center">New Today</TableHead>
                <TableHead className="text-center">Resolved</TableHead>
                <TableHead className="text-center">Reopened</TableHead>
                <TableHead className="text-center">Reopen %</TableHead>
                <TableHead className="text-center">Avg FRT</TableHead>
                <TableHead className="text-center">Avg RT</TableHead>
                <TableHead className="text-center">Backlog</TableHead>
                <TableHead className="text-center">Breaches</TableHead>
                <TableHead className="text-center">CSAT</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agentData.map((agent) => (
                <TableRow key={agent.name}>
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{agent.role}</Badge>
                  </TableCell>
                  <TableCell className="text-center">{agent.assigned}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{agent.newToday}</Badge>
                  </TableCell>
                  <TableCell className="text-center text-success">
                    {agent.resolved}
                  </TableCell>
                  <TableCell className="text-center text-destructive">
                    {agent.reopened}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={
                        parseFloat(agent.reopenRate) > 10
                          ? "text-destructive font-semibold"
                          : "text-muted-foreground"
                      }
                    >
                      {agent.reopenRate}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">{agent.avgFRT}</TableCell>
                  <TableCell className="text-center">{agent.avgRT}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-medium">{agent.backlog}</span>
                      <Progress
                        value={(agent.backlog / agent.assigned) * 100 || 0}
                        className="w-16 h-1"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {agent.breaches > 0 ? (
                      <Badge variant="destructive">{agent.breaches}</Badge>
                    ) : (
                      <span className="text-success">0</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-semibold">{agent.csat}</span>
                      <span className="text-warning">★</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        agent.status === "Active" ? "default" : "secondary"
                      }
                    >
                      {agent.status}
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
