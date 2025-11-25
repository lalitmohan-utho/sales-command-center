import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const agentComparisonData = [
  { name: "Amit Kumar", score: 85, resolutionTime: 228, role: "L2" },
  { name: "Priya Singh", score: 62, resolutionTime: 270, role: "L1" },
  { name: "Rahul Verma", score: 92, resolutionTime: 192, role: "SRE" },
  { name: "Sneha Patel", score: 68, resolutionTime: 246, role: "L1" },
  { name: "Vikram Rao", score: 78, resolutionTime: 234, role: "L2" },
];

const getColor = (score: number) => {
  if (score >= 80) return "hsl(var(--success))";
  if (score >= 60) return "hsl(var(--warning))";
  return "hsl(var(--destructive))";
};

export const AgentComparisonChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Performance Comparison</CardTitle>
        <p className="text-sm text-muted-foreground">
          Score vs. Resolution Time - Top right quadrant is ideal (high score, fast resolution)
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="score"
              name="Support Score"
              domain={[0, 100]}
              label={{ value: "Support Score", position: "bottom", offset: 0 }}
            />
            <YAxis
              type="number"
              dataKey="resolutionTime"
              name="Avg Resolution Time (min)"
              label={{
                value: "Avg Resolution Time (min)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                      <p className="font-semibold text-foreground">{data.name}</p>
                      <p className="text-sm text-muted-foreground">{data.role}</p>
                      <p className="text-sm mt-2">
                        <span className="font-medium">Score:</span> {data.score}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Avg Resolution:</span>{" "}
                        {Math.floor(data.resolutionTime / 60)}h {data.resolutionTime % 60}m
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Scatter name="Agents" data={agentComparisonData} fill="hsl(var(--primary))">
              {agentComparisonData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.score)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>

        {/* Quadrant Labels */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="font-semibold text-success mb-1">Top Performers</div>
            <div className="text-sm text-muted-foreground">
              High score + Fast resolution
            </div>
          </div>
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="font-semibold text-warning mb-1">Quality Leaders</div>
            <div className="text-sm text-muted-foreground">
              High score but slower resolution
            </div>
          </div>
          <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
            <div className="font-semibold text-info mb-1">Speed Focused</div>
            <div className="text-sm text-muted-foreground">
              Fast resolution but needs quality improvement
            </div>
          </div>
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="font-semibold text-destructive mb-1">Needs Attention</div>
            <div className="text-sm text-muted-foreground">
              Lower score + Slower resolution
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
