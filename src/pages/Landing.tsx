import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, TrendingUp, Search, Bell } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

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
            onClick={() => navigate("/dashboard")}
            className="group"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="trend-card p-6">
            <div className="mb-4 p-3 bg-primary/10 w-fit rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Trends</h3>
            <p className="text-muted-foreground">
              Track trending content across platforms with live engagement metrics and velocity tracking.
            </p>
          </div>

          <div className="trend-card p-6">
            <div className="mb-4 p-3 bg-primary/10 w-fit rounded-lg">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Deep Analytics</h3>
            <p className="text-muted-foreground">
              Analyze historical data and patterns to identify emerging trends before they go viral.
            </p>
          </div>

          <div className="trend-card p-6">
            <div className="mb-4 p-3 bg-primary/10 w-fit rounded-lg">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Alerts</h3>
            <p className="text-muted-foreground">
              Get notified about rapidly growing trends and viral content opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}