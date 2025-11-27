import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const monthlyData = [
  { month: "Jan", invoiced: 3800000, collected: 3400000, pending: 400000 },
  { month: "Feb", invoiced: 4200000, collected: 3900000, pending: 300000 },
  { month: "Mar", invoiced: 3900000, collected: 3500000, pending: 400000 },
  { month: "Apr", invoiced: 4500000, collected: 4100000, pending: 400000 },
  { month: "May", invoiced: 4100000, collected: 3700000, pending: 400000 },
  { month: "Jun", invoiced: 4800000, collected: 4300000, pending: 500000 },
  { month: "Jul", invoiced: 4300000, collected: 3800000, pending: 500000 },
  { month: "Aug", invoiced: 4600000, collected: 4200000, pending: 400000 },
  { month: "Sep", invoiced: 4400000, collected: 4000000, pending: 400000 },
  { month: "Oct", invoiced: 4700000, collected: 4300000, pending: 400000 },
  { month: "Nov", invoiced: 4500000, collected: 4100000, pending: 400000 },
  { month: "Dec", invoiced: 4520000, collected: 3890000, pending: 630000 },
];

const formatCurrency = (value: number) => {
  return `₹${(value / 100000).toFixed(1)}L`;
};

export const SalesVsCollectionsChart = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Tabs defaultValue="month">
          <TabsList>
            <TabsTrigger value="month">Monthly</TabsTrigger>
            <TabsTrigger value="quarter">Quarterly</TabsTrigger>
            <TabsTrigger value="year">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={monthlyData}>
          <defs>
            <linearGradient id="colorInvoiced" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="month" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={formatCurrency}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            formatter={(value: number) => formatCurrency(value)}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="invoiced"
            stroke="hsl(var(--primary))"
            fill="url(#colorInvoiced)"
            strokeWidth={2}
            name="Invoiced Amount"
          />
          <Area
            type="monotone"
            dataKey="collected"
            stroke="hsl(var(--success))"
            fill="url(#colorCollected)"
            strokeWidth={2}
            name="Collected Amount"
          />
          <Area
            type="monotone"
            dataKey="pending"
            stroke="hsl(var(--warning))"
            fill="url(#colorPending)"
            strokeWidth={2}
            name="Pending"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
