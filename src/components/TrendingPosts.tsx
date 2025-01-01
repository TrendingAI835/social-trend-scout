import React from "react";
import { Card } from "@/components/ui/card";
import { Play, Heart, MessageCircle, Share2, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Post {
  platform: "instagram" | "tiktok";
  thumbnail: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  creator: string;
  caption: string;
  engagementVelocity?: {
    rate: number; // engagement increase per hour
    trend: "rising" | "stable" | "falling";
  };
}

interface TrendingPostsProps {
  posts: Post[];
}

export const TrendingPosts = ({ posts }: TrendingPostsProps) => {
  const getVelocityColor = (trend: "rising" | "stable" | "falling") => {
    switch (trend) {
      case "rising":
        return "bg-green-500";
      case "falling":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Trending Posts</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative aspect-video">
              <img
                src={post.thumbnail}
                alt={`Trending ${post.platform} post`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {post.platform === "tiktok" && (
                <div className="absolute bottom-2 right-2">
                  <Play className="h-6 w-6 text-white drop-shadow-lg" />
                </div>
              )}
              {post.engagementVelocity && (
                <div className="absolute top-2 right-2">
                  <Badge 
                    className={`${getVelocityColor(post.engagementVelocity.trend)} text-white`}
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {post.engagementVelocity.rate}x/hr
                  </Badge>
                </div>
              )}
            </div>
            <div className="p-4">
              <p className="font-medium">@{post.creator}</p>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{post.caption}</p>
              <div className="mt-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>{post.engagement.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.engagement.comments.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  <span>{post.engagement.shares.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};