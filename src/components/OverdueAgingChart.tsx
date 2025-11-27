import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const agingData = [
  { bucket: "Not Due", amount: 1200000, customers: 45, invoices: 68 },
  { bucket: "0-30 days", amount: 800000, customers: 18, invoices: 32 },
  { bucket: "31-60 days", amount: 600000, customers: 12, invoices: 21 },
  { bucket: "61-90 days", amount: 400000, customers: 8, invoices: 15 },
  { bucket: ">90 days", amount: 1000000, customers: 14, invoices: 28 },
];

const COLORS = [
  "hsl(var(--success))",
  "hsl(var(--info))",
  "hsl(var(--warning))",
  "hsl(var(--destructive))",
  "hsl(var(--destructive))",
];

const formatCurrency = (value: number) => {
  return `₹${(value / 100000).toFixed(1)}L`;
};

export const OverdueAgingChart = () => {
  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={agingData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="bucket" 
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
          <Bar dataKey="amount" name="Amount" radius={[8, 8, 0, 0]}>
            {agingData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-5 gap-2 text-xs">
        {agingData.map((item, index) => (
          <div key={item.bucket} className="text-center space-y-1">
            <div className="font-medium text-foreground">{item.bucket}</div>
            <div className="text-muted-foreground">{item.customers} customers</div>
            <div className="text-muted-foreground">{item.invoices} invoices</div>
          </div>
        ))}
      </div>
    </div>
  );
};
