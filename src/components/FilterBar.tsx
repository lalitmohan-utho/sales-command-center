import { Calendar, Filter, Users, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const dateRanges = ["Today", "This Week", "This Month", "This Quarter", "Custom"];

export const FilterBar = () => {
  return (
    <div className="bg-card border rounded-lg p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Lead Type Filter */}
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-muted-foreground" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px] bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Leads</SelectItem>
              <SelectItem value="inbound">Inbound Only</SelectItem>
              <SelectItem value="outbound">Outbound Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <div className="flex gap-2">
            {dateRanges.map((range) => (
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

        {/* Source Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="website">Website</SelectItem>
              <SelectItem value="signup">Signup Form</SelectItem>
              <SelectItem value="cold-email">Cold Email</SelectItem>
              <SelectItem value="cold-call">Cold Call</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="referral">Referral</SelectItem>
              <SelectItem value="events">Events</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Owner Filter */}
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <Select defaultValue="my">
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="my">My Leads</SelectItem>
              <SelectItem value="all">All Team</SelectItem>
              <SelectItem value="rajesh">Rajesh Kumar</SelectItem>
              <SelectItem value="priya">Priya Sharma</SelectItem>
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
