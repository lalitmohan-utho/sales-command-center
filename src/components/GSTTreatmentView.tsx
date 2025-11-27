import { Download, FileText } from "lucide-react";
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

const gstInvoices = [
  {
    invoice: "INV-2024-1501",
    customer: "TechVision Pvt Ltd",
    type: "Registered",
    placeOfSupply: "Maharashtra",
    taxableValue: 285000,
    cgst: 25650,
    sgst: 25650,
    igst: 0,
    category: "B2B",
  },
  {
    invoice: "INV-2024-1502",
    customer: "CloudWorks Solutions",
    type: "Registered",
    placeOfSupply: "Karnataka",
    taxableValue: 425000,
    cgst: 0,
    sgst: 0,
    igst: 76500,
    category: "B2B",
  },
  {
    invoice: "INV-2024-1503",
    customer: "StartupHub",
    type: "Unregistered",
    placeOfSupply: "Delhi",
    taxableValue: 45000,
    cgst: 4050,
    sgst: 4050,
    igst: 0,
    category: "B2C",
  },
  {
    invoice: "INV-2024-1504",
    customer: "GlobalTech Inc",
    type: "Overseas",
    placeOfSupply: "USA",
    taxableValue: 580000,
    cgst: 0,
    sgst: 0,
    igst: 0,
    category: "Export",
  },
  {
    invoice: "INV-2024-1505",
    customer: "DataCore Systems",
    type: "Registered",
    placeOfSupply: "Maharashtra",
    taxableValue: 325000,
    cgst: 29250,
    sgst: 29250,
    igst: 0,
    category: "B2B",
  },
];

const formatCurrency = (value: number) => {
  return `₹${(value / 1000).toFixed(0)}K`;
};

export const GSTTreatmentView = () => {
  return (
    <div className="space-y-6">
      {/* GST Treatment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">GST Registered (B2B)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Invoices</span>
              <span className="text-2xl font-bold text-foreground">142</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Taxable Value</span>
              <span className="text-lg font-semibold text-foreground">₹32.5L</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Total GST</span>
              <span className="text-lg font-semibold text-success">₹5.85L</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Unregistered (B2C)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Invoices</span>
              <span className="text-2xl font-bold text-foreground">38</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Taxable Value</span>
              <span className="text-lg font-semibold text-foreground">₹4.2L</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Total GST</span>
              <span className="text-lg font-semibold text-success">₹0.76L</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Overseas (Export)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Invoices</span>
              <span className="text-2xl font-bold text-foreground">24</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Taxable Value</span>
              <span className="text-lg font-semibold text-foreground">₹8.5L</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">GST</span>
              <span className="text-lg font-semibold text-info">₹0 (Export)</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* GST Breakdown Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>GST Breakdown by Invoice</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export GSTR Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice No.</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Place of Supply</TableHead>
                  <TableHead className="text-right">Taxable Value</TableHead>
                  <TableHead className="text-right">CGST</TableHead>
                  <TableHead className="text-right">SGST</TableHead>
                  <TableHead className="text-right">IGST</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gstInvoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="font-mono text-sm">{invoice.invoice}</TableCell>
                    <TableCell className="font-medium">{invoice.customer}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          invoice.type === "Registered" ? "default" : 
                          invoice.type === "Overseas" ? "secondary" : 
                          "outline"
                        }
                      >
                        {invoice.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{invoice.placeOfSupply}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(invoice.taxableValue)}
                    </TableCell>
                    <TableCell className="text-right text-success">
                      {invoice.cgst > 0 ? formatCurrency(invoice.cgst) : "-"}
                    </TableCell>
                    <TableCell className="text-right text-success">
                      {invoice.sgst > 0 ? formatCurrency(invoice.sgst) : "-"}
                    </TableCell>
                    <TableCell className="text-right text-success">
                      {invoice.igst > 0 ? formatCurrency(invoice.igst) : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{invoice.category}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
