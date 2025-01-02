import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlatformSelector } from "@/components/PlatformSelector";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface DashboardHeaderProps {
  platform: "instagram" | "tiktok";
  search: string;
  onPlatformChange: (platform: "instagram" | "tiktok") => void;
  onSearchChange: (search: string) => void;
}

export const DashboardHeader = ({
  platform,
  search,
  onPlatformChange,
  onSearchChange,
}: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="gap-2"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </Button>
        <h1 className="text-3xl font-bold flex-1 text-center">Social Media Trends</h1>
        <PlatformSelector platform={platform} onChange={onPlatformChange} />
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search trends..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
};