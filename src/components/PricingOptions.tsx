import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingOption {
  title: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

interface PricingOptionsProps {
  onSelect: (plan: string) => void;
}

export function PricingOptions({ onSelect }: PricingOptionsProps) {
  const plans: PricingOption[] = [
    {
      title: "Starter",
      price: "$29/month",
      features: [
        "Basic trend analytics",
        "5 tracked keywords",
        "Daily reports",
        "Email support",
      ],
    },
    {
      title: "Professional",
      price: "$79/month",
      features: [
        "Advanced analytics",
        "25 tracked keywords",
        "Real-time alerts",
        "Priority support",
        "Custom reports",
      ],
      recommended: true,
    },
    {
      title: "Enterprise",
      price: "$199/month",
      features: [
        "Full analytics suite",
        "Unlimited keywords",
        "API access",
        "24/7 support",
        "Custom integration",
        "Dedicated account manager",
      ],
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card
          key={plan.title}
          className={`p-6 relative ${
            plan.recommended ? "border-primary shadow-lg" : ""
          }`}
        >
          {plan.recommended && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
              Recommended
            </div>
          )}
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
            <p className="text-3xl font-bold">{plan.price}</p>
          </div>
          <ul className="space-y-3 mb-6">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          <Button
            onClick={() => onSelect(plan.title.toLowerCase())}
            className="w-full"
            variant={plan.recommended ? "default" : "outline"}
          >
            Select Plan
          </Button>
        </Card>
      ))}
    </div>
  );
}