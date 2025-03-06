import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const surveySchema = z.object({
  feeling: z.string().optional(),
  interest: z.string().optional(),
  future: z.string().optional(),
});

interface SurveyData extends z.infer<typeof surveySchema> {}

interface SurveyFormProps {
  onComplete: (data: SurveyData) => void;
}

interface Question {
  question: string;
  options: { value: string; label: string }[];
  next?: keyof SurveyData;
}

const questions: { [key in keyof SurveyData]: Question } = {
  feeling: {
    question: "How are you feeling today?",
    options: [
      { value: "happy", label: "Happy 😊" },
      { value: "sad", label: "Sad 😢" },
      { value: "neutral", label: "Neutral 😐" },
    ],
    next: "interest",
  },
  interest: {
    question: "What are you most interested in learning about?",
    options: [
      { value: "ai", label: "Artificial Intelligence 🤖" },
      { value: "webdev", label: "Web Development 💻" },
      { value: "design", label: "Design 🎨" },
    ],
    next: "future",
  },
  future: {
    question: "What do you hope to achieve in the near future?",
    options: [
      { value: "newjob", label: "Get a new job 💼" },
      { value: "newskills", label: "Learn new skills 🚀" },
      { value: "personalgrowth", label: "Personal growth 🌱" },
    ],
  },
};

const SurveyForm = ({ onComplete }: SurveyFormProps) => {
  const [currentStep, setCurrentStep] = React.useState<keyof SurveyData>("feeling");
  const currentQuestion = questions[currentStep];

  const form = useForm<SurveyData>({
    resolver: zodResolver(surveySchema),
    defaultValues: {},
  });

  const handleSubmit = (values: SurveyData) => {
    return () => {
      onComplete(values);
    };
  };

  const handleSelection = (value: string, nextStep?: keyof SurveyData) => {
    form.setValue(currentStep, value as any);
    
    if (nextStep) {
      setTimeout(() => {
        setCurrentStep(nextStep);
      }, 300);
    } else {
      setTimeout(() => {
        form.handleSubmit(handleSubmit)();
      }, 300);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-4">Quick Survey</h2>
        <p className="text-muted-foreground text-center mb-8">
          Help us understand your interests better!
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit())} className="space-y-8">
            <FormField
              control={form.control}
              name={currentStep}
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-2xl font-bold">
                      {currentQuestion.question}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="grid grid-cols-1 gap-4"
                      >
                        {currentQuestion.options.map((option) => (
                          <div
                            key={option.value}
                            className="relative"
                          >
                            <label
                              htmlFor={option.value}
                              className="flex items-center space-x-4 p-4 rounded-lg border-2 border-muted cursor-pointer transition-all duration-200 hover:border-primary hover:bg-primary/5"
                              onClick={() => handleSelection(option.value, currentQuestion.next)}
                            >
                              <RadioGroupItem 
                                value={option.value} 
                                id={option.value} 
                                checked={form.watch(currentStep) === option.value}
                                onChange={() => {
                                  form.setValue(currentStep, option.value);
                                }}
                              />
                              <div className="flex-1">
                                <Label htmlFor={option.value} className="text-lg font-medium">
                                  {option.label}
                                </Label>
                              </div>
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">
                {currentQuestion.next ? "Next" : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SurveyForm;
