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
import { useToast } from "@/components/ui/use-toast";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with proper environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Add console logs to check connection status
console.log('Supabase URL:', supabaseUrl ? 'Found' : 'Missing');
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Found' : 'Missing');

let supabase: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('Supabase client initialized successfully');
} else {
  console.warn('Supabase configuration is missing. Please check your connection.');
}

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
    if (!supabase) {
      toast({
        title: "Configuration Required",
        description: "Please connect to Supabase first to enable subscriptions.",
        variant: "destructive",
      });
      return;
    }

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

      const response = await fetch(
        `${supabaseUrl}/functions/v1/create-checkout`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      const { url, error } = await response.json();

      if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        return;
      }

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate checkout",
        variant: "destructive",
      });
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
