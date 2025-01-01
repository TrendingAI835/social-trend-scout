import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface Trend {
  tag: string;
  growth: number;
  posts: number;
}

interface TrendingTopicsProps {
  trends: Trend[];
}

export const TrendingTopics = ({ trends }: TrendingTopicsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {trends.map((trend, index) => (
        <Card key={trend.tag} className="trend-card trend-animation" style={{ animationDelay: `${index * 100}ms` }}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">#{trend.tag}</h3>
              <p className="text-sm text-muted-foreground">{trend.posts.toLocaleString()} posts</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-400">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">+{trend.growth}%</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};