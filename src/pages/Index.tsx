import { useState } from "react";
import { TrendingTopics } from "@/components/TrendingTopics";
import { TrendGraph } from "@/components/TrendGraph";
import { PlatformSelector } from "@/components/PlatformSelector";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Mock data - in a real app, this would come from an API
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

const mockGraphData = [
  { date: "Jan", value: 4000 },
  { date: "Feb", value: 3000 },
  { date: "Mar", value: 5000 },
  { date: "Apr", value: 2780 },
  { date: "May", value: 1890 },
  { date: "Jun", value: 2390 },
  { date: "Jul", value: 3490 },
];

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

      <div className="mb-8">
        <TrendingTopics trends={filteredTrends} />
      </div>

      <TrendGraph
        data={mockGraphData}
        title={`Trend Growth Over Time (${platform.charAt(0).toUpperCase() + platform.slice(1)})`}
      />
    </div>
  );
};

export default Index;