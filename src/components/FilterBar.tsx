import { Calendar, Filter, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const dateRanges = ["Today", "This Week", "This Month", "This Quarter"];

export const FilterBar = () => {
  return (
    <div className="bg-card border rounded-lg p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Team/Owner Filter */}
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Team</SelectItem>
              <SelectItem value="my">My Leads</SelectItem>
              <SelectItem value="team1">Team Alpha</SelectItem>
              <SelectItem value="team2">Team Beta</SelectItem>
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

        {/* Pipeline Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px] bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Pipelines</SelectItem>
              <SelectItem value="inbound">Inbound</SelectItem>
              <SelectItem value="outbound">Outbound</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
              <SelectItem value="smb">SMB</SelectItem>
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
