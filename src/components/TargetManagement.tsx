import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface MonthlyTarget {
  month: string;
  year: number;
  quarter: string;
  targetBusiness: number;
  achievedBusiness: number;
  targetMRR: number;
  achievedMRR: number;
}

const targetData: MonthlyTarget[] = [
  {
    month: "October",
    year: 2025,
    quarter: "Q4",
    targetBusiness: 2500000,
    achievedBusiness: 2200000,
    targetMRR: 180000,
    achievedMRR: 175000,
  },
  {
    month: "November",
    year: 2025,
    quarter: "Q4",
    targetBusiness: 2800000,
    achievedBusiness: 2600000,
    targetMRR: 190000,
    achievedMRR: 185000,
  },
  {
    month: "December",
    year: 2025,
    quarter: "Q4",
    targetBusiness: 3000000,
    achievedBusiness: 2400000,
    targetMRR: 200000,
    achievedMRR: 195000,
  },
];

const getStatusBadge = (percentage: number) => {
  if (percentage >= 90)
    return (
      <Badge className="bg-success-light text-success">On Track</Badge>
    );
  if (percentage >= 70)
    return (
      <Badge className="bg-warning-light text-warning">At Risk</Badge>
    );
  return (
    <Badge className="bg-destructive-light text-destructive">Behind</Badge>
  );
};

export const TargetManagement = () => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold">
              Sales Target Management
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Track and manage quarterly targets
            </p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="2025">
              <SelectTrigger className="w-[120px] bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="q4">
              <SelectTrigger className="w-[120px] bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="q1">Q1</SelectItem>
                <SelectItem value="q2">Q2</SelectItem>
                <SelectItem value="q3">Q3</SelectItem>
                <SelectItem value="q4">Q4</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Target
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Year
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Quarter
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Month
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">
                    Target Business
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">
                    Achieved Business
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">
                    Target MRR
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">
                    Achieved MRR
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    Achievement
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card">
                {targetData.map((row, index) => {
                  const achievementPercentage =
                    (row.achievedBusiness / row.targetBusiness) * 100;
                  return (
                    <tr key={index} className="border-t hover:bg-muted/50">
                      <td className="px-4 py-4 text-sm">{index + 1}</td>
                      <td className="px-4 py-4 text-sm">{row.year}</td>
                      <td className="px-4 py-4 text-sm">{row.quarter}</td>
                      <td className="px-4 py-4 text-sm font-medium">
                        {row.month}
                      </td>
                      <td className="px-4 py-4 text-sm text-right">
                        ₹{(row.targetBusiness / 100000).toFixed(2)}L
                      </td>
                      <td className="px-4 py-4 text-sm text-right font-semibold text-primary">
                        ₹{(row.achievedBusiness / 100000).toFixed(2)}L
                      </td>
                      <td className="px-4 py-4 text-sm text-right">
                        ₹{(row.targetMRR / 1000).toFixed(0)}K
                      </td>
                      <td className="px-4 py-4 text-sm text-right font-semibold text-accent">
                        ₹{(row.achievedMRR / 1000).toFixed(0)}K
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-sm font-semibold">
                            {achievementPercentage.toFixed(1)}%
                          </span>
                          <Progress
                            value={achievementPercentage}
                            className="w-24 h-2"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        {getStatusBadge(achievementPercentage)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
