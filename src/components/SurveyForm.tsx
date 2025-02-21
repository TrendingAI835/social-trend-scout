import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const surveySchema = z.object({
  trendAwareness: z.enum(["always_late", "sometimes_late", "niche_late"]),
  biggestChallenge: z.enum(["finding_trends", "engagement", "consistency", "too_late"]),
  growthKnowledge: z.enum(["no_idea", "struggle", "need_to_start"]),
  researchTime: z.enum(["less_than_1", "one_to_three", "three_to_five", "more_than_5"]),
  predictValue: z.enum(["game_changer", "drastically", "somewhat"]),
  platform: z.enum(["tiktok", "instagram", "youtube", "all_platforms"])
});

type SurveyData = z.infer<typeof surveySchema>;

interface SurveyFormProps {
  onComplete: (data: SurveyData) => void;
}

type QuestionConfig = {
  label: string;
  options: { value: string; label: string }[];
  next?: keyof SurveyData;
};

type Questions = {
  [K in keyof SurveyData]: QuestionConfig;
};

export function SurveyForm({ onComplete }: SurveyFormProps) {
  const [currentStep, setCurrentStep] = useState<keyof SurveyData>("trendAwareness");
  
  const form = useForm<SurveyData>({
    resolver: zodResolver(surveySchema),
  });

  const questions: Questions = {
    trendAwareness: {
      label: "How often do you feel like you're late to the latest social media trends?",
      options: [
        { value: "always_late", label: "All the time! Trends move too fast" },
        { value: "sometimes_late", label: "Sometimes, but I try to keep up" },
        { value: "niche_late", label: "Constantly because my for you page is so niche" }
      ],
      next: "biggestChallenge"
    },
    biggestChallenge: {
      label: "What's the biggest challenge you face when trying to grow your social media?",
      options: [
        { value: "finding_trends", label: "Finding the right trends before they peak" },
        { value: "engagement", label: "Getting more engagement on my posts" },
        { value: "consistency", label: "Staying consistent with content ideas" },
        { value: "too_late", label: "Too late to the trend because scrolling can take a lot of time" }
      ],
      next: "growthKnowledge"
    },
    growthKnowledge: {
      label: "Did you know that creators who jump on trends in the first 24 hours grow 10-50X faster?",
      options: [
        { value: "no_idea", label: "I had no idea!" },
        { value: "struggle", label: "Yeah, but I struggle to find the right trends" },
        { value: "need_to_start", label: "I need to start hopping on trends ASAP!" }
      ],
      next: "researchTime"
    },
    researchTime: {
      label: "How much time do you spend each week researching social media trends?",
      options: [
        { value: "less_than_1", label: "Less than 1 hour" },
        { value: "one_to_three", label: "1-3 hours" },
        { value: "three_to_five", label: "3-5 hours" },
        { value: "more_than_5", label: "5+ hours" }
      ],
      next: "predictValue"
    },
    predictValue: {
      label: "If you could predict which trends would go viral before they peak, how much would that improve your content strategy?",
      options: [
        { value: "game_changer", label: "Game changer" },
        { value: "drastically", label: "Drastically" },
        { value: "somewhat", label: "Somewhat" }
      ],
      next: "platform"
    },
    platform: {
      label: "Which platform do you create the most content on?",
      options: [
        { value: "tiktok", label: "TikTok" },
        { value: "instagram", label: "Instagram" },
        { value: "youtube", label: "YouTube" },
        { value: "all_platforms", label: "All Platforms" }
      ]
    }
  };

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

  const currentQuestion = questions[currentStep];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <FormField
              control={form.control}
              name={currentStep}
              render={({ field }) => (
                <FormItem className="space-y-6">
                  <FormLabel className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {currentQuestion.label}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="grid grid-cols-1 gap-4"
                    >
                      {currentQuestion.options.map((option) => (
                        <motion.div
                          key={option.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <label
                            htmlFor={option.value}
                            className="flex items-center space-x-4 p-4 rounded-lg border-2 border-muted cursor-pointer transition-all duration-200 hover:border-primary hover:bg-primary/5"
                          >
                            <RadioGroupItem value={option.value} id={option.value} />
                            <div className="flex-1">
                              <Label htmlFor={option.value} className="text-lg font-medium">
                                {option.label}
                              </Label>
                            </div>
                          </label>
                        </motion.div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </motion.div>
        </AnimatePresence>

        <motion.div 
          className="flex justify-between pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {currentStep !== "trendAwareness" && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const steps: (keyof SurveyData)[] = ["trendAwareness", "biggestChallenge", "growthKnowledge", "researchTime", "predictValue", "platform"];
                const currentIndex = steps.indexOf(currentStep);
                setCurrentStep(steps[currentIndex - 1]);
              }}
              className="hover:scale-105 transition-transform"
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
            className="ml-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 hover:scale-105 transition-all"
          >
            {currentQuestion.next ? "Next" : "Complete"}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}
