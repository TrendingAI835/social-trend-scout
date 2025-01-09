import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

const surveySchema = z.object({
  useCase: z.enum(["business", "personal", "agency"]),
  platform: z.enum(["tiktok", "instagram", "youtube", "all"]),
  experience: z.enum(["beginner", "intermediate", "expert"]),
});

type SurveyData = z.infer<typeof surveySchema>;

interface SurveyFormProps {
  onComplete: (data: SurveyData) => void;
}

export function SurveyForm({ onComplete }: SurveyFormProps) {
  const [currentStep, setCurrentStep] = useState<keyof SurveyData>("useCase");
  
  const form = useForm<SurveyData>({
    resolver: zodResolver(surveySchema),
  });

  const handleNext = (nextStep: keyof SurveyData) => {
    const currentValue = form.getValues(currentStep);
    if (!currentValue) {
      form.setError(currentStep, {
        type: "required",
        message: "Please select an option",
      });
      return;
    }
    setCurrentStep(nextStep);
  };

  const handleSubmit = (data: SurveyData) => {
    if (!data[currentStep]) {
      form.setError(currentStep, {
        type: "required",
        message: "Please select an option",
      });
      return;
    }
    onComplete(data);
  };

  const questions = {
    useCase: {
      label: "How do you plan to use TrendingAI?",
      options: [
        { value: "business", label: "For my business" },
        { value: "personal", label: "Personal brand growth" },
        { value: "agency", label: "Agency / Multiple clients" },
      ],
      next: "platform" as const,
    },
    platform: {
      label: "Which platforms are you most interested in?",
      options: [
        { value: "all", label: "All platforms" },
        { value: "tiktok", label: "TikTok" },
        { value: "instagram", label: "Instagram" },
        { value: "youtube", label: "YouTube" },
      ],
      next: "experience" as const,
    },
    experience: {
      label: "What's your experience level with social media analytics?",
      options: [
        { value: "beginner", label: "Beginner" },
        { value: "intermediate", label: "Intermediate" },
        { value: "expert", label: "Expert" },
      ],
    },
  };

  const currentQuestion = questions[currentStep];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name={currentStep}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>{currentQuestion.label}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-3"
                >
                  {currentQuestion.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          {currentStep !== "useCase" && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const steps: (keyof SurveyData)[] = ["useCase", "platform", "experience"];
                const currentIndex = steps.indexOf(currentStep);
                setCurrentStep(steps[currentIndex - 1]);
              }}
            >
              Previous
            </Button>
          )}
          
          <Button
            type="button"
            onClick={() => {
              if (currentQuestion.next) {
                handleNext(currentQuestion.next);
              } else {
                form.handleSubmit(handleSubmit)();
              }
            }}
          >
            {currentQuestion.next ? "Next" : "Complete"}
          </Button>
        </div>
      </form>
    </Form>
  );
}