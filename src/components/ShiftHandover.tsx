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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const handoverTickets = [
  {
    id: "TKT-1235",
    status: "In Progress",
    customer: "CloudStart Ltd",
    nextAction: "Waiting for customer to provide logs",
    notes: "",
    suggestedOwner: "",
  },
  {
    id: "TKT-1236",
    status: "Pending Customer",
    customer: "DevOps Solutions",
    nextAction: "Follow up if no response by EOD",
    notes: "",
    suggestedOwner: "",
  },
  {
    id: "TKT-1239",
    status: "In Progress",
    customer: "StartupHub",
    nextAction: "Escalate to L2 if issue persists",
    notes: "",
    suggestedOwner: "",
  },
];

export const ShiftHandover = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Shift Handover & Ownership Transfer</CardTitle>
          <Badge variant="outline" className="text-warning">
            3 tickets need handover
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted/50 border rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-foreground">
              Handover Checklist for: Amit Kumar
            </h4>
            <p className="text-sm text-muted-foreground">
              Please complete the following before end of shift:
            </p>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Current Status</TableHead>
                  <TableHead>Next Action</TableHead>
                  <TableHead>Handover Notes</TableHead>
                  <TableHead>Transfer To</TableHead>
                  <TableHead className="text-center">Confirm</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {handoverTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-mono">{ticket.id}</TableCell>
                    <TableCell>{ticket.customer}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{ticket.status}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <span className="text-sm">{ticket.nextAction}</span>
                    </TableCell>
                    <TableCell>
                      <Textarea
                        placeholder="Add notes for next agent..."
                        className="min-w-[200px] h-20"
                      />
                    </TableCell>
                    <TableCell>
                      <Select>
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Select agent" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="priya">Priya Singh</SelectItem>
                          <SelectItem value="rahul">Rahul Verma</SelectItem>
                          <SelectItem value="sneha">Sneha Patel</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline">Save Draft</Button>
            <Button>Complete Handover</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
