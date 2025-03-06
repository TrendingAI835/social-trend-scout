import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useState } from "react";
import SurveyForm from "./SurveyForm";
import { PricingOptions } from "./PricingOptions";
import { Input } from "./ui/input";

interface DemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "survey" | "pricing" | "auth";

export function DemoDialog({ open, onOpenChange }: DemoDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<Step>("survey");
  const [surveyData, setSurveyData] = useState<any>(null);
  const [inviteCode, setInviteCode] = useState("");

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

  const handleBack = () => {
    if (step === "pricing") setStep("survey");
    if (step === "auth") setStep("pricing");
  };

  const handleSkipPayment = async () => {
    const validInviteCodes = ["BETA2024", "EARLYACCESS", "FOUNDER"];
    
    if (validInviteCodes.includes(inviteCode.trim().toUpperCase())) {
      setStep("auth");
      toast({
        title: "Success",
        description: "Invite code accepted! You can now create an account.",
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "The invite code you entered is not valid.",
        variant: "destructive",
      });
    }
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
              appearance={{ 
                theme: ThemeSupa,
                style: {
                  input: {
                    backgroundColor: 'white',
                    color: 'black',
                    borderColor: 'hsl(var(--border))',
                  },
                  button: {
                    border: '1px solid transparent',
                  },
                  anchor: {
                    color: 'hsl(var(--primary))',
                  },
                  message: {
                    color: 'rgb(229, 62, 62)',
                  },
                  divider: {
                    background: 'hsl(var(--border))',
                  },
                },
                variables: {
                  default: {
                    colors: {
                      brand: 'hsl(var(--primary))',
                      brandAccent: 'hsl(var(--primary))',
                      inputBackground: 'white',
                      inputText: 'black',
                      inputBorder: 'hsl(var(--border))',
                      inputBorderFocus: 'hsl(var(--primary))',
                      inputBorderHover: 'hsl(var(--border))',
                    }
                  }
                }
              }}
              providers={["facebook"]}
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
            {step === "survey" && "Tell Us About Your Needs"}
            {step === "pricing" && "Choose Your Plan"}
          </DialogTitle>
          <DialogDescription>
            {step === "survey" && "Help us understand how we can best serve your needs"}
            {step === "pricing" && "Select the plan that best fits your requirements"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-4">
          {step === "survey" && <SurveyForm onComplete={handleSurveyComplete} />}
          
          {step === "pricing" && (
            <>
              <PricingOptions onSelect={handleSubscribe} />
              
              <div className="mt-8 p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-2">Have an invite code?</h3>
                <div className="flex gap-2">
                  <Input 
                    type="text" 
                    placeholder="Enter your invite code" 
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSkipPayment}>
                    Apply Code
                  </Button>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-between items-center pt-4 border-t">
            {step === "pricing" && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
