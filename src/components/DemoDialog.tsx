import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TrendingPosts } from "./TrendingPosts";
import { TrendingTopics } from "./TrendingTopics";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useState } from "react";
import { SurveyForm } from "./SurveyForm";
import { PricingOptions } from "./PricingOptions";

const demoTrends = [
  {
    tag: "AITechnology",
    growth: 156,
    posts: 45000,
  },
  {
    tag: "DigitalTransformation",
    growth: 89,
    posts: 32000,
  },
  {
    tag: "FutureOfWork",
    growth: 72,
    posts: 28000,
  },
];

const demoPosts = [
  {
    platform: "tiktok" as const,
    thumbnail: "https://picsum.photos/400/300",
    engagement: {
      likes: 150000,
      comments: 2800,
      shares: 5600,
    },
    creator: "techinnovator",
    caption: "The future of AI is here! Check out this amazing demo #AITechnology",
    engagementVelocity: {
      rate: 2.5,
      trend: "rising" as const,
    },
  },
];

interface DemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "demo" | "survey" | "pricing" | "auth";

export function DemoDialog({ open, onOpenChange }: DemoDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<Step>("demo");
  const [surveyData, setSurveyData] = useState<any>(null);

  const handleSubscribe = async (planId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setStep("auth");
        return;
      }

      const response = await supabase.functions.invoke('create-checkout', {
        body: { planId },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error) {
        toast({
          title: "Error",
          description: response.error.message,
          variant: "destructive",
        });
        return;
      }

      const { data: { url } } = response;
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate checkout",
        variant: "destructive",
      });
      console.error('Checkout error:', error);
    }
  };

  const handleSurveyComplete = (data: any) => {
    setSurveyData(data);
    setStep("pricing");
  };

  const handleContinue = () => {
    setStep("survey");
  };

  const handleBack = () => {
    if (step === "survey") setStep("demo");
    if (step === "pricing") setStep("survey");
    if (step === "auth") setStep("pricing");
  };

  if (step === "auth") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Sign in to Continue</DialogTitle>
            <DialogDescription>
              Please sign in or create an account to continue with your subscription
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Auth 
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={[]}
              onlyThirdPartyProviders={false}
              redirectTo={window.location.origin}
            />
            <Button variant="outline" onClick={handleBack} className="w-full">
              Back
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === "demo" && "Experience TrendingAI in Action"}
            {step === "survey" && "Tell Us About Your Needs"}
            {step === "pricing" && "Choose Your Plan"}
          </DialogTitle>
          <DialogDescription>
            {step === "demo" && "Get real-time insights into social media trends and engagement metrics"}
            {step === "survey" && "Help us understand how we can best serve your needs"}
            {step === "pricing" && "Select the plan that best fits your requirements"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-4">
          {step === "demo" && (
            <>
              <section>
                <h3 className="text-xl font-semibold mb-4">Trending Topics</h3>
                <TrendingTopics trends={demoTrends} />
              </section>

              <section>
                <TrendingPosts posts={demoPosts} />
              </section>
            </>
          )}

          {step === "survey" && <SurveyForm onComplete={handleSurveyComplete} />}
          
          {step === "pricing" && <PricingOptions onSelect={handleSubscribe} />}

          <div className="flex justify-between items-center pt-4 border-t">
            <Button variant="outline" onClick={step === "demo" ? () => onOpenChange(false) : handleBack}>
              {step === "demo" ? "Close" : "Back"}
            </Button>
            {step === "demo" && (
              <div className="space-x-4">
                <Button onClick={() => navigate("/dashboard")}>
                  Access Full Dashboard
                </Button>
                <Button onClick={handleContinue} variant="secondary">
                  Continue
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}