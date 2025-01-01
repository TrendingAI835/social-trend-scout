import { Card } from "@/components/ui/card";
import { TrendingUp, Users, MessageCircle, Share2 } from "lucide-react";

interface Creator {
  username: string;
  engagement: number;
  followers: number;
  posts: number;
  avgLikes: number;
  avgComments: number;
  avgShares: number;
}

interface CreatorAnalyticsProps {
  creators: Creator[];
}

export const CreatorAnalytics = ({ creators }: CreatorAnalyticsProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Top Creators</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {creators.map((creator) => (
          <Card key={creator.username} className="trend-card trend-animation">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">@{creator.username}</h3>
                  <p className="text-sm text-muted-foreground">{creator.followers.toLocaleString()} followers</p>
                </div>
                <div className="flex items-center gap-1 text-emerald-400">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+{creator.engagement}%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="flex flex-col items-center p-2 rounded-lg bg-secondary/50">
                  <Users className="h-4 w-4 mb-1" />
                  <span>{(creator.avgLikes / 1000).toFixed(1)}k</span>
                  <span className="text-xs text-muted-foreground">Likes</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg bg-secondary/50">
                  <MessageCircle className="h-4 w-4 mb-1" />
                  <span>{(creator.avgComments / 1000).toFixed(1)}k</span>
                  <span className="text-xs text-muted-foreground">Comments</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg bg-secondary/50">
                  <Share2 className="h-4 w-4 mb-1" />
                  <span>{(creator.avgShares / 1000).toFixed(1)}k</span>
                  <span className="text-xs text-muted-foreground">Shares</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};