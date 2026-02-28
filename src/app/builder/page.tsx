"use client";

import { useBuilderStore } from "@/store/builder-store";
import { StepIndicator } from "@/components/shared/step-indicator";
import { ThemeSelector } from "@/components/builder/theme-selector";
import { ResumeUpload } from "@/components/builder/resume-upload";
import { ResumeEditor } from "@/components/builder/resume-editor";
import { PortfolioPreview } from "@/components/builder/portfolio-preview";
import { DeployStep } from "@/components/builder/deploy-step";
import { Navbar } from "@/components/shared/navbar";
import { ResumeData } from "@/types/resume";
import { toast } from "sonner";

export default function BuilderPage() {
  const {
    currentStep,
    selectedTheme,
    resumeData,
    generatedHtml,
    isLoading,
    setStep,
    nextStep,
    prevStep,
    setTheme,
    setResumeData,
    setResumeText,
    setGeneratedHtml,
    setLoading,
  } = useBuilderStore();

  const handleResumeParsed = (data: ResumeData, rawText: string) => {
    setResumeData(data);
    setResumeText(rawText);
    nextStep();
  };

  const handleGenerate = async () => {
    if (!selectedTheme) return;
    setLoading(true);
    try {
      const res = await fetch("/api/generate-portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: selectedTheme, data: resumeData }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to generate");
      setGeneratedHtml(result.html);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <StepIndicator currentStep={currentStep} onStepClick={setStep} />
        </div>

        {currentStep === 1 && (
          <ThemeSelector
            selectedTheme={selectedTheme}
            onSelect={setTheme}
            onContinue={nextStep}
          />
        )}

        {currentStep === 2 && (
          <ResumeUpload onParsed={handleResumeParsed} onBack={prevStep} />
        )}

        {currentStep === 3 && (
          <ResumeEditor
            data={resumeData}
            onChange={setResumeData}
            onContinue={() => {
              setGeneratedHtml("");
              nextStep();
            }}
            onBack={prevStep}
          />
        )}

        {currentStep === 4 && (
          <PortfolioPreview
            html={generatedHtml}
            isLoading={isLoading}
            onGenerate={handleGenerate}
            onContinue={nextStep}
            onBack={prevStep}
          />
        )}

        {currentStep === 5 && (
          <DeployStep html={generatedHtml} onBack={prevStep} />
        )}
      </div>
    </div>
  );
}
