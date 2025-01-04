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

export function DemoDialog({ open, onOpenChange }: DemoDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscribe = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to subscribe",
          variant: "destructive",
        });
        return;
      }

      const response = await supabase.functions.invoke('create-checkout', {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Experience TrendingAI in Action</DialogTitle>
          <DialogDescription>
            Get real-time insights into social media trends and engagement metrics
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-4">
          <section>
            <h3 className="text-xl font-semibold mb-4">Trending Topics</h3>
            <TrendingTopics trends={demoTrends} />
          </section>

          <section>
            <TrendingPosts posts={demoPosts} />
          </section>

          <div className="flex justify-between items-center pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close Demo
            </Button>
            <div className="space-x-4">
              <Button onClick={() => navigate("/dashboard")}>
                Access Full Dashboard
              </Button>
              <Button onClick={handleSubscribe} variant="secondary">
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}