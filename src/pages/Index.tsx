import { useState } from "react";
import { TrendingTopics } from "@/components/TrendingTopics";
import { PlatformSelector } from "@/components/PlatformSelector";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { CreatorAnalytics } from "@/components/CreatorAnalytics";
import { EngagementMetrics } from "@/components/EngagementMetrics";
import { TrendingPosts } from "@/components/TrendingPosts";

const mockTrends = {
  instagram: [
    { tag: "fashion", growth: 23, posts: 1234567 },
    { tag: "beauty", growth: 15, posts: 987654 },
    { tag: "travel", growth: 45, posts: 567890 },
    { tag: "food", growth: 12, posts: 345678 },
    { tag: "fitness", growth: 34, posts: 234567 },
    { tag: "lifestyle", growth: 18, posts: 123456 },
  ],
  tiktok: [
    { tag: "dance", growth: 56, posts: 2345678 },
    { tag: "comedy", growth: 34, posts: 1876543 },
    { tag: "music", growth: 67, posts: 987654 },
    { tag: "challenge", growth: 45, posts: 654321 },
    { tag: "tutorial", growth: 23, posts: 432198 },
    { tag: "pov", growth: 38, posts: 321987 },
  ],
};

// Mock data for creators
const mockCreators = {
  instagram: [
    {
      username: "fashionista",
      engagement: 34,
      followers: 1200000,
      posts: 1500,
      avgLikes: 50000,
      avgComments: 2500,
      avgShares: 1500,
    },
    {
      username: "travelguru",
      engagement: 28,
      followers: 800000,
      posts: 1200,
      avgLikes: 35000,
      avgComments: 1800,
      avgShares: 1200,
    },
    {
      username: "foodlover",
      engagement: 42,
      followers: 1500000,
      posts: 2000,
      avgLikes: 65000,
      avgComments: 3200,
      avgShares: 2100,
    },
  ],
  tiktok: [
    {
      username: "dancepro",
      engagement: 56,
      followers: 2500000,
      posts: 500,
      avgLikes: 150000,
      avgComments: 8000,
      avgShares: 25000,
    },
    {
      username: "comedyking",
      engagement: 48,
      followers: 1800000,
      posts: 400,
      avgLikes: 120000,
      avgComments: 6500,
      avgShares: 18000,
    },
    {
      username: "musicstar",
      engagement: 62,
      followers: 3000000,
      posts: 600,
      avgLikes: 180000,
      avgComments: 9500,
      avgShares: 30000,
    },
  ],
};

// Add mock data for trending posts
const mockTrendingPosts = {
  instagram: [
    {
      platform: "instagram",
      thumbnail: "/placeholder.svg",
      engagement: {
        likes: 250000,
        comments: 15000,
        shares: 5000,
      },
      creator: "fashionista",
      caption: "Summer vibes with the latest collection 🌞 #fashion #summer",
    },
    {
      platform: "instagram",
      thumbnail: "/placeholder.svg",
      engagement: {
        likes: 180000,
        comments: 12000,
        shares: 3500,
      },
      creator: "travelguru",
      caption: "Exploring hidden gems in Bali 🌴 #travel #wanderlust",
    },
    {
      platform: "instagram",
      thumbnail: "/placeholder.svg",
      engagement: {
        likes: 320000,
        comments: 18000,
        shares: 7000,
      },
      creator: "foodlover",
      caption: "The perfect brunch doesn't exi- 😍 #foodie #brunch",
    },
  ],
  tiktok: [
    {
      platform: "tiktok",
      thumbnail: "/placeholder.svg",
      engagement: {
        likes: 500000,
        comments: 25000,
        shares: 100000,
      },
      creator: "dancepro",
      caption: "New dance challenge! Try it with your friends 💃 #dancechallenge",
    },
    {
      platform: "tiktok",
      thumbnail: "/placeholder.svg",
      engagement: {
        likes: 450000,
        comments: 20000,
        shares: 80000,
      },
      creator: "comedyking",
      caption: "When your mom asks about your day 😂 #comedy #relatable",
    },
    {
      platform: "tiktok",
      thumbnail: "/placeholder.svg",
      engagement: {
        likes: 600000,
        comments: 30000,
        shares: 120000,
      },
      creator: "musicstar",
      caption: "Cover of the latest hit song 🎵 #music #cover",
    },
  ],
};

const Index = () => {
  const [platform, setPlatform] = useState<"instagram" | "tiktok">("instagram");
  const [search, setSearch] = useState("");

  const filteredTrends = mockTrends[platform].filter((trend) =>
    trend.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Social Media Trends</h1>
        <PlatformSelector platform={platform} onChange={setPlatform} />
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search trends..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-12">
        <TrendingPosts posts={mockTrendingPosts[platform]} />
        
        <div className="mb-8">
          <TrendingTopics trends={filteredTrends} />
        </div>

        <EngagementMetrics platform={platform} />
        
        <CreatorAnalytics creators={mockCreators[platform]} />
      </div>
    </div>
  );
};

export default Index;
