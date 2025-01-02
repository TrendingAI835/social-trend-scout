import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { TrendingTopics } from "@/components/TrendingTopics";
import { CreatorAnalytics } from "@/components/CreatorAnalytics";
import { EngagementMetrics } from "@/components/EngagementMetrics";
import { TrendingPosts } from "@/components/TrendingPosts";
import { TrendAnalytics } from "@/components/TrendAnalytics";

console.log("Dashboard component is being rendered");

const mockTrends = {
  instagram: [
    { tag: "fashion", growth: 23, posts: 1234567 },
    { tag: "beauty", growth: 15, posts: 987654 },
    { tag: "travel", growth: 45, posts: 567890 },
  ],
  tiktok: [
    { tag: "dance", growth: 56, posts: 2345678 },
    { tag: "comedy", growth: 34, posts: 1876543 },
    { tag: "music", growth: 67, posts: 987654 },
  ],
};

const mockTrendingPosts = {
  instagram: [
    {
      platform: "instagram" as const,
      thumbnail: "/placeholder.svg",
      engagement: { likes: 250000, comments: 15000, shares: 5000 },
      creator: "fashionista",
      caption: "Summer vibes with the latest collection 🌞 #fashion #summer",
      engagementVelocity: {
        rate: 2.5,
        trend: "rising" as const
      }
    },
    {
      platform: "instagram" as const,
      thumbnail: "/placeholder.svg",
      engagement: {
        likes: 180000,
        comments: 12000,
        shares: 3500,
      },
      creator: "travelguru",
      caption: "Exploring hidden gems in Bali 🌴 #travel #wanderlust",
      engagementVelocity: {
        rate: 1.2,
        trend: "stable" as const
      }
    },
    {
      platform: "instagram" as const,
      thumbnail: "/placeholder.svg",
      engagement: {
        likes: 320000,
        comments: 18000,
        shares: 7000,
      },
      creator: "foodlover",
      caption: "The perfect brunch doesn't exi- 😍 #foodie #brunch",
      engagementVelocity: {
        rate: 3.8,
        trend: "rising" as const
      }
    },
  ],
  tiktok: [
    {
      platform: "tiktok" as const,
      thumbnail: "/placeholder.svg",
      engagement: { likes: 500000, comments: 25000, shares: 100000 },
      creator: "dancepro",
      caption: "New dance challenge! Try it with your friends 💃 #dancechallenge",
      engagementVelocity: {
        rate: 5.2,
        trend: "rising" as const
      }
    },
    {
      platform: "tiktok" as const,
      thumbnail: "/placeholder.svg",
      engagement: {
        likes: 450000,
        comments: 20000,
        shares: 80000,
      },
      creator: "comedyking",
      caption: "When your mom asks about your day 😂 #comedy #relatable",
      engagementVelocity: {
        rate: 0.8,
        trend: "falling" as const
      }
    },
    {
      platform: "tiktok" as const,
      thumbnail: "/placeholder.svg",
      engagement: {
        likes: 600000,
        comments: 30000,
        shares: 120000,
      },
      creator: "musicstar",
      caption: "Cover of the latest hit song 🎵 #music #cover",
      engagementVelocity: {
        rate: 4.1,
        trend: "rising" as const
      }
    },
  ],
};

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

const Dashboard = () => {
  console.log("Inside Dashboard component function");
  const [platform, setPlatform] = useState<"instagram" | "tiktok">("instagram");
  const [search, setSearch] = useState("");

  console.log("Current platform:", platform);
  console.log("Current search:", search);

  const filteredTrends = mockTrends[platform].filter((trend) =>
    trend.tag.toLowerCase().includes(search.toLowerCase())
  );

  console.log("Filtered trends:", filteredTrends);

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader
        platform={platform}
        search={search}
        onPlatformChange={setPlatform}
        onSearchChange={setSearch}
      />

      <div className="space-y-12 mt-8">
        <TrendingPosts posts={mockTrendingPosts[platform]} />
        
        <div className="grid gap-6 md:grid-cols-2">
          {filteredTrends.map((trend) => (
            <TrendAnalytics key={trend.tag} tag={trend.tag} />
          ))}
        </div>

        <div className="mb-8">
          <TrendingTopics trends={filteredTrends} />
        </div>

        <EngagementMetrics platform={platform} />
        
        <CreatorAnalytics creators={mockCreators[platform]} />
      </div>
    </div>
  );
};

export default Dashboard;