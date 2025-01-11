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
  useCase: z.enum(["business", "personal", "agency"]),
  platform: z.enum(["tiktok", "instagram", "youtube", "all"]),
  experience: z.enum(["beginner", "intermediate", "expert"]),
});

type SurveyData = z.infer<typeof surveySchema>;

interface SurveyFormProps {
  onComplete: (data: SurveyData) => void;
}

type QuestionConfig = {
  label: string;
  options: { value: string; label: string; icon?: string }[];
  next?: keyof SurveyData;
};

type Questions = {
  [K in keyof SurveyData]: QuestionConfig;
};

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

  const questions: Questions = {
    useCase: {
      label: "How do you plan to use TrendingAI?",
      options: [
        { value: "business", label: "For my business" },
        { value: "personal", label: "Personal brand growth" },
        { value: "agency", label: "Agency / Multiple clients" },
      ],
      next: "platform",
    },
    platform: {
      label: "Which platforms are you most interested in?",
      options: [
        { value: "all", label: "All platforms" },
        { value: "tiktok", label: "TikTok" },
        { value: "instagram", label: "Instagram" },
        { value: "youtube", label: "YouTube" },
      ],
      next: "experience",
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
          {currentStep !== "useCase" && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const steps: (keyof SurveyData)[] = ["useCase", "platform", "experience"];
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