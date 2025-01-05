import { Card } from "@/components/ui/card";
import { TrendingUp, Users, MessageCircle, Share2, Clock, Eye, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const getInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase();
  };

  const calculateEngagementRate = (creator: Creator) => {
    const totalInteractions = creator.avgLikes + creator.avgComments + creator.avgShares;
    return ((totalInteractions / creator.followers) * 100).toFixed(2);
  };

  const calculateLikesPerView = (creator: Creator) => {
    // Assuming average views per post is 3x the follower count for this example
    const avgViews = creator.followers * 3;
    return ((creator.avgLikes / avgViews) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Top Creators</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {creators.map((creator) => (
          <Card 
            key={creator.username} 
            className="trend-card trend-animation overflow-visible"
            style={{
              background: "linear-gradient(135deg, #9b87f5 0%, #6E59A5 100%)",
              border: "2px solid #D6BCFA"
            }}
          >
            <div className="relative pt-12 pb-4 px-4">
              {/* Profile Picture */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <Avatar className="h-24 w-24 border-4 border-[#D6BCFA] shadow-xl">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${creator.username}`} />
                  <AvatarFallback className="bg-[#1A1F2C] text-white text-xl">
                    {getInitials(creator.username)}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Creator Info */}
              <div className="text-center mb-6 mt-2">
                <h3 className="text-xl font-bold text-white">@{creator.username}</h3>
                <div className="flex items-center justify-center gap-2 text-[#D6BCFA]">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium">+{creator.engagement}% Growth</span>
                </div>
                <p className="text-[#D6BCFA] mt-1">
                  {creator.followers.toLocaleString()} followers
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 bg-[#1A1F2C]/20 rounded-lg p-3 backdrop-blur-sm">
                {/* Engagement Rate */}
                <div className="flex flex-col items-center p-2 rounded-lg bg-[#1A1F2C]/40">
                  <TrendingUp className="h-5 w-5 mb-1 text-[#D6BCFA]" />
                  <span className="text-white font-bold">{calculateEngagementRate(creator)}%</span>
                  <span className="text-xs text-[#D6BCFA]">Engagement</span>
                </div>

                {/* Average View Duration */}
                <div className="flex flex-col items-center p-2 rounded-lg bg-[#1A1F2C]/40">
                  <Clock className="h-5 w-5 mb-1 text-[#D6BCFA]" />
                  <span className="text-white font-bold">2.5m</span>
                  <span className="text-xs text-[#D6BCFA]">Avg Duration</span>
                </div>

                {/* Views */}
                <div className="flex flex-col items-center p-2 rounded-lg bg-[#1A1F2C]/40">
                  <Eye className="h-5 w-5 mb-1 text-[#D6BCFA]" />
                  <span className="text-white font-bold">
                    {((creator.followers * 3) / 1000).toFixed(1)}k
                  </span>
                  <span className="text-xs text-[#D6BCFA]">Views/Post</span>
                </div>

                {/* Likes per View */}
                <div className="flex flex-col items-center p-2 rounded-lg bg-[#1A1F2C]/40">
                  <Heart className="h-5 w-5 mb-1 text-[#D6BCFA]" />
                  <span className="text-white font-bold">{calculateLikesPerView(creator)}%</span>
                  <span className="text-xs text-[#D6BCFA]">Likes/View</span>
                </div>

                {/* Comments per Post */}
                <div className="flex flex-col items-center p-2 rounded-lg bg-[#1A1F2C]/40">
                  <MessageCircle className="h-5 w-5 mb-1 text-[#D6BCFA]" />
                  <span className="text-white font-bold">
                    {(creator.avgComments / 1000).toFixed(1)}k
                  </span>
                  <span className="text-xs text-[#D6BCFA]">Comments</span>
                </div>

                {/* Shares per Post */}
                <div className="flex flex-col items-center p-2 rounded-lg bg-[#1A1F2C]/40">
                  <Share2 className="h-5 w-5 mb-1 text-[#D6BCFA]" />
                  <span className="text-white font-bold">
                    {(creator.avgShares / 1000).toFixed(1)}k
                  </span>
                  <span className="text-xs text-[#D6BCFA]">Shares</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};