import React from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TrendVelocityProps {
  tag: string;
  currentGrowth: number;
  previousGrowth: number;
  velocity: number;
}

export const TrendVelocity = ({ tag, currentGrowth, previousGrowth, velocity }: TrendVelocityProps) => {
  const { toast } = useToast();
  const growthDifference = currentGrowth - previousGrowth;
  const isAccelerating = velocity > 20; // Threshold for high velocity

  React.useEffect(() => {
    if (isAccelerating) {
      toast({
        title: "Trending Alert! 🚀",
        description: `#${tag} is gaining traction rapidly!`,
      });
    }
  }, [isAccelerating, tag, toast]);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">#{tag}</h3>
          <p className="text-sm text-muted-foreground">Growth Velocity</p>
        </div>
        <div className="flex items-center gap-2">
          {growthDifference > 0 ? (
            <ArrowUp className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-500" />
          )}
          <span className="text-lg font-bold">{velocity.toFixed(1)}x</span>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            {growthDifference > 0 ? "+" : ""}
            {growthDifference}% from previous period
          </span>
        </div>
      </div>
    </Card>
  );
};