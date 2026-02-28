"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { WizardStep } from "@/store/builder-store";

const steps = [
  { number: 1, label: "Theme" },
  { number: 2, label: "Upload" },
  { number: 3, label: "Edit" },
  { number: 4, label: "Preview" },
  { number: 5, label: "Deploy" },
] as const;

interface StepIndicatorProps {
  currentStep: WizardStep;
  onStepClick?: (step: WizardStep) => void;
}

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      {steps.map((step, index) => {
        const isComplete = currentStep > step.number;
        const isCurrent = currentStep === step.number;
        const isClickable = onStepClick && step.number < currentStep;

        return (
          <div key={step.number} className="flex items-center">
            <button
              onClick={() => isClickable && onStepClick(step.number as WizardStep)}
              disabled={!isClickable}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all",
                isComplete &&
                  "bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90",
                isCurrent && "bg-primary text-primary-foreground ring-2 ring-primary/30 ring-offset-2",
                !isComplete && !isCurrent && "bg-muted text-muted-foreground",
                !isClickable && "cursor-default"
              )}
            >
              {isComplete ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <span className="flex h-5 w-5 items-center justify-center rounded-full text-xs">
                  {step.number}
                </span>
              )}
              <span className="hidden sm:inline">{step.label}</span>
            </button>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mx-1 h-px w-4 sm:w-8",
                  currentStep > step.number ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
