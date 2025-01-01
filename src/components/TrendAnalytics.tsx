import { TrendVelocity } from "./TrendVelocity";
import { HistoricalTrends } from "./HistoricalTrends";

interface TrendAnalyticsProps {
  tag: string;
}

export const TrendAnalytics = ({ tag }: TrendAnalyticsProps) => {
  // Mock data for demonstration
  const velocityData = {
    currentGrowth: 45,
    previousGrowth: 25,
    velocity: 1.8,
  };

  const historicalData = [
    { date: "Jan", engagement: 1000, posts: 100 },
    { date: "Feb", engagement: 1500, posts: 150 },
    { date: "Mar", engagement: 2500, posts: 200 },
    { date: "Apr", engagement: 3500, posts: 250 },
    { date: "May", engagement: 4000, posts: 300 },
    { date: "Jun", engagement: 5000, posts: 350 },
  ];

  return (
    <div className="space-y-6">
      <TrendVelocity
        tag={tag}
        currentGrowth={velocityData.currentGrowth}
        previousGrowth={velocityData.previousGrowth}
        velocity={velocityData.velocity}
      />
      <HistoricalTrends data={historicalData} tag={tag} />
    </div>
  );
};