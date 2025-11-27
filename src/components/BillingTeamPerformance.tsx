import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const teamMembers = [
  {
    name: "Anita Desai",
    invoicesGenerated: 142,
    invoiceAmount: 12500000,
    collectionsAmount: 11200000,
    remindersSent: 245,
    refundsProcessed: 12,
    errorIncidents: 2,
    avgInvoiceTime: 1.2,
    avgPaymentTime: 2.8,
  },
  {
    name: "Rahul Verma",
    invoicesGenerated: 128,
    invoiceAmount: 10800000,
    collectionsAmount: 9500000,
    remindersSent: 198,
    refundsProcessed: 8,
    errorIncidents: 1,
    avgInvoiceTime: 1.5,
    avgPaymentTime: 3.2,
  },
  {
    name: "Priya Gupta",
    invoicesGenerated: 156,
    invoiceAmount: 14200000,
    collectionsAmount: 12800000,
    remindersSent: 287,
    refundsProcessed: 15,
    errorIncidents: 3,
    avgInvoiceTime: 1.1,
    avgPaymentTime: 2.5,
  },
  {
    name: "Amit Shah",
    invoicesGenerated: 134,
    invoiceAmount: 11600000,
    collectionsAmount: 10200000,
    remindersSent: 223,
    refundsProcessed: 10,
    errorIncidents: 2,
    avgInvoiceTime: 1.4,
    avgPaymentTime: 3.0,
  },
];

const formatCurrency = (value: number) => {
  return `₹${(value / 100000).toFixed(1)}L`;
};

export const BillingTeamPerformance = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Team Performance & Accountability</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Member</TableHead>
                <TableHead className="text-center">Invoices Generated</TableHead>
                <TableHead className="text-right">Invoice Amount</TableHead>
                <TableHead className="text-right">Collections</TableHead>
                <TableHead className="text-center">Reminders Sent</TableHead>
                <TableHead className="text-center">Refunds Processed</TableHead>
                <TableHead className="text-center">Error Incidents</TableHead>
                <TableHead className="text-right">Avg Invoice Time</TableHead>
                <TableHead className="text-right">Avg Payment Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.name}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{member.invoicesGenerated}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(member.invoiceAmount)}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-success">
                    {formatCurrency(member.collectionsAmount)}
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    {member.remindersSent}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{member.refundsProcessed}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={member.errorIncidents > 2 ? "destructive" : "secondary"}>
                      {member.errorIncidents}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={
                        member.avgInvoiceTime > 1.5
                          ? "text-warning"
                          : "text-muted-foreground"
                      }
                    >
                      {member.avgInvoiceTime} days
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={
                        member.avgPaymentTime > 3
                          ? "text-warning"
                          : "text-muted-foreground"
                      }
                    >
                      {member.avgPaymentTime} days
                    </span>
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
