import { Card } from "@/components/ui/card";
import { TrendGraph } from "@/components/TrendGraph";

interface EngagementMetricsProps {
  platform: "instagram" | "tiktok";
}

export const EngagementMetrics = ({ platform }: EngagementMetricsProps) => {
  // Mock data for engagement metrics
  const engagementData = [
    { date: "Mon", value: 15000 },
    { date: "Tue", value: 25000 },
    { date: "Wed", value: 35000 },
    { date: "Thu", value: 28000 },
    { date: "Fri", value: 45000 },
    { date: "Sat", value: 52000 },
    { date: "Sun", value: 48000 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Engagement Overview</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="trend-card">
          <TrendGraph
            data={engagementData}
            title={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Engagement Trend`}
          />
        </Card>
      </div>
    </div>
  );
};