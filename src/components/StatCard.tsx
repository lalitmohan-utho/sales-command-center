import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning" | "info" | "destructive";
}

const variantStyles = {
  default: "text-primary",
  success: "text-success",
  warning: "text-warning",
  info: "text-info",
  destructive: "text-destructive",
};

const trendStyles = {
  positive: "bg-success-light text-success",
  negative: "bg-destructive-light text-destructive",
};

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
}: StatCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              {title}
            </p>
            <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
            {trend && (
              <Badge
                className={`mt-2 ${
                  trend.isPositive ? trendStyles.positive : trendStyles.negative
                }`}
                variant="secondary"
              >
                {trend.isPositive ? "↑" : "↓"} {trend.value}
              </Badge>
            )}
          </div>
          <div
            className={`p-3 rounded-lg bg-muted ${variantStyles[variant]}`}
          >
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
