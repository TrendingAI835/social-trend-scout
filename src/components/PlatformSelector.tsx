import { Button } from "@/components/ui/button";
import { Instagram, Music2 } from "lucide-react";

interface PlatformSelectorProps {
  platform: "instagram" | "tiktok";
  onChange: (platform: "instagram" | "tiktok") => void;
}

export const PlatformSelector = ({ platform, onChange }: PlatformSelectorProps) => {
  return (
    <div className="flex gap-4">
      <Button
        variant={platform === "instagram" ? "default" : "outline"}
        className="platform-button"
        onClick={() => onChange("instagram")}
      >
        <Instagram className="mr-2 h-4 w-4" />
        Instagram
      </Button>
      <Button
        variant={platform === "tiktok" ? "default" : "outline"}
        className="platform-button"
        onClick={() => onChange("tiktok")}
      >
        <Music2 className="mr-2 h-4 w-4" />
        TikTok
      </Button>
    </div>
  );
};