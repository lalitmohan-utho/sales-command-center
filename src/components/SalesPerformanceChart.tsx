import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { month: "Oct", target: 2500000, achieved: 2200000 },
  { month: "Nov", target: 2800000, achieved: 2600000 },
  { month: "Dec", target: 3000000, achieved: 2400000 },
];

export const SalesPerformanceChart = () => {
  const totalTarget = data.reduce((sum, item) => sum + item.target, 0);
  const totalAchieved = data.reduce((sum, item) => sum + item.achieved, 0);
  const achievementPercentage = ((totalAchieved / totalTarget) * 100).toFixed(1);

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold">
              Sales Target vs Achieved
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Quarter View - Q4 2025
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="cursor-pointer">
              Revenue
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              MRR
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-6 mt-4 p-4 bg-muted rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground">Quarter Target</p>
            <p className="text-lg font-bold">
              ₹{(totalTarget / 1000000).toFixed(2)}M
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Achieved</p>
            <p className="text-lg font-bold text-primary">
              ₹{(totalAchieved / 1000000).toFixed(2)}M
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <div>
              <p className="text-xs text-muted-foreground">Achievement</p>
              <p className="text-lg font-bold text-success">
                {achievementPercentage}%
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `₹${value / 1000000}M`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              formatter={(value: number) =>
                `₹${(value / 1000000).toFixed(2)}M`
              }
            />
            <Legend />
            <Bar
              dataKey="achieved"
              fill="hsl(var(--primary))"
              name="Achieved"
              radius={[8, 8, 0, 0]}
            />
            <Line
              dataKey="target"
              stroke="hsl(var(--destructive))"
              name="Target"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--destructive))", r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
