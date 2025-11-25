import { Calendar, Filter, Users, AlertCircle, Package, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const timeRanges = ["Today", "Last 24h", "Last 7 Days", "Last 30 Days", "This Month"];

export const SupportFilterBar = () => {
  return (
    <div className="bg-card border rounded-lg p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Time Range */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <div className="flex gap-2">
            {timeRanges.map((range) => (
              <Badge
                key={range}
                variant="secondary"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {range}
              </Badge>
            ))}
          </div>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-muted-foreground" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Filter */}
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-muted-foreground" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px] bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="vms">VMs</SelectItem>
              <SelectItem value="kubernetes">Kubernetes</SelectItem>
              <SelectItem value="storage">Storage</SelectItem>
              <SelectItem value="network">Network</SelectItem>
              <SelectItem value="database">Database</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Region Filter */}
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="india">India DC</SelectItem>
              <SelectItem value="eu">EU DC</SelectItem>
              <SelectItem value="us">US DC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Queue Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px] bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Queues</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="billing">Billing</SelectItem>
              <SelectItem value="onboarding">Onboarding</SelectItem>
              <SelectItem value="migration">Migration</SelectItem>
              <SelectItem value="security">Security</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Agent Filter */}
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Agents</SelectItem>
              <SelectItem value="amit">Amit Kumar</SelectItem>
              <SelectItem value="priya">Priya Singh</SelectItem>
              <SelectItem value="rahul">Rahul Verma</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm">
            Reset
          </Button>
          <Button size="sm">Apply Filters</Button>
        </div>
      </div>
    </div>
  );
};
