import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Deal {
  id: string;
  name: string;
  company: string;
  amount: number;
  closeDate: string;
  owner: string;
}

interface Stage {
  name: string;
  count: number;
  value: number;
  deals: Deal[];
}

const pipelineData: Stage[] = [
  {
    name: "New",
    count: 12,
    value: 1200000,
    deals: [
      {
        id: "1",
        name: "Cloud Setup",
        company: "Tech Corp",
        amount: 250000,
        closeDate: "Dec 15",
        owner: "LK",
      },
      {
        id: "2",
        name: "SaaS License",
        company: "Start Inc",
        amount: 150000,
        closeDate: "Dec 20",
        owner: "AP",
      },
    ],
  },
  {
    name: "Qualified",
    count: 8,
    value: 2400000,
    deals: [
      {
        id: "3",
        name: "Enterprise Suite",
        company: "Big Corp",
        amount: 850000,
        closeDate: "Dec 25",
        owner: "VS",
      },
    ],
  },
  {
    name: "Proposal",
    count: 5,
    value: 1800000,
    deals: [
      {
        id: "4",
        name: "API Integration",
        company: "Dev Co",
        amount: 450000,
        closeDate: "Jan 5",
        owner: "LK",
      },
    ],
  },
  {
    name: "Negotiation",
    count: 3,
    value: 950000,
    deals: [
      {
        id: "5",
        name: "Data Migration",
        company: "Legacy Inc",
        amount: 550000,
        closeDate: "Jan 10",
        owner: "AP",
      },
    ],
  },
];

export const PipelineSnapshot = () => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold">
              Pipeline Snapshot
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Active deals by stage
            </p>
          </div>
          <Button variant="outline">
            View Full Pipeline <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {pipelineData.map((stage) => (
            <div
              key={stage.name}
              className="flex-shrink-0 w-80 border rounded-lg p-4 bg-muted/30"
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{stage.name}</h3>
                  <Badge variant="secondary">{stage.count}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  ₹{(stage.value / 100000).toFixed(1)}L
                </p>
              </div>
              <div className="space-y-3">
                {stage.deals.map((deal) => (
                  <div
                    key={deal.id}
                    className="p-3 bg-card border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <h4 className="font-medium text-sm mb-1">{deal.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {deal.company}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary">
                        ₹{(deal.amount / 100000).toFixed(1)}L
                      </span>
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {deal.owner}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Close: {deal.closeDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
