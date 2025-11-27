import { Download, Mail } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";

const overdueInvoices = [
  {
    customer: "TechCorp Solutions",
    type: "GST Registered",
    country: "India",
    invoice: "INV-2024-1234",
    invoiceDate: "2024-09-15",
    dueDate: "2024-10-15",
    amount: 285000,
    paid: 0,
    outstanding: 285000,
    daysOverdue: 77,
    status: "Not Paid",
    owner: "Rahul Sharma",
  },
  {
    customer: "CloudStart Inc",
    type: "Overseas",
    country: "USA",
    invoice: "INV-2024-1156",
    invoiceDate: "2024-10-01",
    dueDate: "2024-11-01",
    amount: 156000,
    paid: 50000,
    outstanding: 106000,
    daysOverdue: 61,
    status: "Part Paid",
    owner: "Priya Patel",
  },
  {
    customer: "DataHub Systems",
    type: "GST Registered",
    country: "India",
    invoice: "INV-2024-1267",
    invoiceDate: "2024-10-10",
    dueDate: "2024-11-10",
    amount: 325000,
    paid: 0,
    outstanding: 325000,
    daysOverdue: 52,
    status: "In Collection",
    owner: "Amit Kumar",
  },
  {
    customer: "WebScale Ltd",
    type: "Unregistered",
    country: "India",
    invoice: "INV-2024-1289",
    invoiceDate: "2024-10-20",
    dueDate: "2024-11-20",
    amount: 89000,
    paid: 0,
    outstanding: 89000,
    daysOverdue: 42,
    status: "Not Paid",
    owner: "Neha Singh",
  },
  {
    customer: "InnovateTech",
    type: "GST Registered",
    country: "India",
    invoice: "INV-2024-1301",
    invoiceDate: "2024-11-01",
    dueDate: "2024-12-01",
    amount: 412000,
    paid: 200000,
    outstanding: 212000,
    daysOverdue: 31,
    status: "Part Paid",
    owner: "Vikram Reddy",
  },
];

const formatCurrency = (value: number) => {
  return `₹${(value / 1000).toFixed(0)}K`;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Not Paid":
      return "destructive";
    case "Part Paid":
      return "warning";
    case "In Collection":
      return "secondary";
    default:
      return "default";
  }
};

const getDaysOverdueColor = (days: number) => {
  if (days > 60) return "text-destructive";
  if (days > 30) return "text-warning";
  return "text-muted-foreground";
};

export const OverdueDetailTable = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Overdue Invoice Details</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              Send Reminders
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Invoice No.</TableHead>
                <TableHead>Invoice Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Paid</TableHead>
                <TableHead className="text-right">Outstanding</TableHead>
                <TableHead className="text-right">Days Overdue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {overdueInvoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">{invoice.customer}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{invoice.type}</Badge>
                  </TableCell>
                  <TableCell>{invoice.country}</TableCell>
                  <TableCell className="font-mono text-sm">{invoice.invoice}</TableCell>
                  <TableCell>{invoice.invoiceDate}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(invoice.amount)}
                  </TableCell>
                  <TableCell className="text-right text-success">
                    {formatCurrency(invoice.paid)}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(invoice.outstanding)}
                  </TableCell>
                  <TableCell className={`text-right font-bold ${getDaysOverdueColor(invoice.daysOverdue)}`}>
                    {invoice.daysOverdue}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {invoice.owner}
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
