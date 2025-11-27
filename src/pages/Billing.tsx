import { DollarSign, TrendingUp, AlertCircle, FileText, CreditCard, ArrowDownCircle } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BillingFilters } from "@/components/BillingFilters";
import { SalesVsCollectionsChart } from "@/components/SalesVsCollectionsChart";
import { OverdueAgingChart } from "@/components/OverdueAgingChart";
import { OverdueDetailTable } from "@/components/OverdueDetailTable";
import { RefundAnalytics } from "@/components/RefundAnalytics";
import { GSTTreatmentView } from "@/components/GSTTreatmentView";
import { CustomerBillingHealth } from "@/components/CustomerBillingHealth";
import { ProductRevenueChart } from "@/components/ProductRevenueChart";
import { BillingTeamPerformance } from "@/components/BillingTeamPerformance";
import { BillingAlerts } from "@/components/BillingAlerts";

export default function Billing() {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Billing & Collections Dashboard
          </h1>
          <p className="text-muted-foreground">
            From revenue to refunds, one view of your cash flow & compliance
          </p>
        </div>

        {/* Global Filters */}
        <BillingFilters />

        {/* Global KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Invoiced"
            value="₹45.2L"
            subtitle="Excl. Tax"
            icon={FileText}
            trend={{ value: "12.3%", isPositive: true }}
            variant="default"
          />
          <StatCard
            title="Total Collected"
            value="₹38.9L"
            subtitle="86.1% Collection Rate"
            icon={DollarSign}
            trend={{ value: "8.5%", isPositive: true }}
            variant="success"
          />
          <StatCard
            title="Pending Receivables"
            value="₹6.3L"
            subtitle="24 customers"
            icon={TrendingUp}
            trend={{ value: "3.2%", isPositive: false }}
            variant="warning"
          />
          <StatCard
            title="Overdue Amount"
            value="₹2.8L"
            subtitle="Avg 45 days overdue"
            icon={AlertCircle}
            trend={{ value: "5.1%", isPositive: false }}
            variant="destructive"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Refunds & Credits"
            value="₹1.2L"
            subtitle="3.1% Refund Rate"
            icon={ArrowDownCircle}
            variant="info"
          />
          <StatCard
            title="Net Realized Revenue"
            value="₹37.7L"
            subtitle="After refunds"
            icon={CreditCard}
            trend={{ value: "9.2%", isPositive: true }}
            variant="success"
          />
          <StatCard
            title="GST Collected"
            value="₹6.8L"
            subtitle="18% avg rate"
            icon={FileText}
            variant="default"
          />
          <StatCard
            title="Bad Debts"
            value="₹0.5L"
            subtitle="1.3% of invoiced"
            icon={AlertCircle}
            variant="destructive"
          />
        </div>

        {/* Sales vs Collections */}
        <Card>
          <CardHeader>
            <CardTitle>Sales vs Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesVsCollectionsChart />
          </CardContent>
        </Card>

        {/* Overdue & Pending Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Overdue & Pending Receivables
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Aging Buckets</CardTitle>
              </CardHeader>
              <CardContent>
                <OverdueAgingChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Collection Efficiency</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Collection Efficiency</span>
                    <span className="text-2xl font-bold text-success">86.1%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg Collection Period (DSO)</span>
                    <span className="text-2xl font-bold text-foreground">38 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Invoices Outstanding</span>
                    <span className="text-2xl font-bold text-warning">127</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <OverdueDetailTable />
        </div>

        {/* Refunds & Credits */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Refunds & Credit Activity
          </h2>
          <RefundAnalytics />
        </div>

        {/* GST & Tax Treatment */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">
            GST & Tax Treatment
          </h2>
          <GSTTreatmentView />
        </div>

        {/* Customer Billing Health */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Customer Billing Health & Risk
          </h2>
          <CustomerBillingHealth />
        </div>

        {/* Sales Analytics */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Sales Analytics
          </h2>
          <Tabs defaultValue="product" className="w-full">
            <TabsList>
              <TabsTrigger value="product">Product-wise Revenue</TabsTrigger>
              <TabsTrigger value="segment">Customer Segment</TabsTrigger>
              <TabsTrigger value="monthly">Monthly Breakdown</TabsTrigger>
            </TabsList>
            <TabsContent value="product">
              <ProductRevenueChart />
            </TabsContent>
            <TabsContent value="segment">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Customer Segment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Customer segment chart will render here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="monthly">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Sales Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Monthly breakdown table will render here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Billing Operations */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Billing Operations & Ownership
          </h2>
          <BillingTeamPerformance />
        </div>

        {/* Alerts & Exceptions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Alerts & Exception Watchlist
          </h2>
          <BillingAlerts />
        </div>
      </div>
    </div>
  );
}
