import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface HistoricalDataPoint {
  date: string;
  engagement: number;
  posts: number;
}

interface HistoricalTrendsProps {
  data: HistoricalDataPoint[];
  tag: string;
}

export const HistoricalTrends = ({ data, tag }: HistoricalTrendsProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Historical Trend: #{tag}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
              }}
            />
            <Line
              type="monotone"
              dataKey="engagement"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="posts"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};