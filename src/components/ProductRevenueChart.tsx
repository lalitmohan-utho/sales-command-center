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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const productData = [
  { product: "VMs", invoiced: 12500000, collected: 11200000 },
  { product: "Kubernetes", invoiced: 8900000, collected: 8100000 },
  { product: "Object Storage", invoiced: 6300000, collected: 5800000 },
  { product: "Databases", invoiced: 7800000, collected: 7200000 },
  { product: "Load Balancers", invoiced: 4200000, collected: 3900000 },
  { product: "DR/Backup", invoiced: 5500000, collected: 4900000 },
];

const COLORS = {
  invoiced: "hsl(var(--primary))",
  collected: "hsl(var(--success))",
};

const formatCurrency = (value: number) => {
  return `₹${(value / 100000).toFixed(1)}L`;
};

export const ProductRevenueChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product-wise Revenue Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={productData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="product"
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
            <Bar
              dataKey="invoiced"
              fill={COLORS.invoiced}
              name="Invoiced"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="collected"
              fill={COLORS.collected}
              name="Collected"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
