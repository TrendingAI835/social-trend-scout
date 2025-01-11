import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Search, Bell } from "lucide-react";
import { DemoDialog } from "@/components/DemoDialog";
import { FeatureDialog } from "@/components/FeatureDialog";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  detailedDescription: string;
}

export default function Landing() {
  const [showDemo, setShowDemo] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const features: Feature[] = [
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "Real-time Trends",
      description: "Track trending content across platforms with live engagement metrics and velocity tracking.",
      detailedDescription: "Our real-time trend tracking system monitors social media platforms 24/7, analyzing engagement patterns, hashtag performance, and content velocity. Get instant insights into what's trending, why it's gaining traction, and how you can leverage these trends for your content strategy.",
    },
    {
      icon: <Search className="h-6 w-6 text-primary" />,
      title: "Deep Analytics",
      description: "Analyze historical data and patterns to identify emerging trends before they go viral.",
      detailedDescription: "Leverage advanced machine learning algorithms to analyze vast amounts of historical data, identifying patterns and predicting upcoming trends. Our deep analytics system helps you understand audience behavior, content performance, and market dynamics to stay ahead of the curve.",
    },
    {
      icon: <Bell className="h-6 w-6 text-primary" />,
      title: "Smart Alerts",
      description: "Get notified about rapidly growing trends and viral content opportunities.",
      detailedDescription: "Never miss a trending opportunity with our intelligent alert system. Receive customized notifications about emerging trends, viral content potential, and engagement spikes in your niche. Set custom thresholds and get alerts via email, mobile push, or in-app notifications.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Social Trend Scout
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover trending content, track engagement metrics, and stay ahead of social media trends with powerful analytics.
          </p>
          <Button
            size="lg"
            onClick={() => setShowDemo(true)}
            className="group"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="trend-card p-6 cursor-pointer transition-all hover:scale-105"
              onClick={() => setSelectedFeature(feature)}
            >
              <div className="mb-4 p-3 bg-primary/10 w-fit rounded-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <DemoDialog open={showDemo} onOpenChange={setShowDemo} />
      
      {selectedFeature && (
        <FeatureDialog
          open={!!selectedFeature}
          onOpenChange={(open) => !open && setSelectedFeature(null)}
          title={selectedFeature.title}
          description={selectedFeature.description}
          detailedDescription={selectedFeature.detailedDescription}
        />
      )}
    </div>
  );
}