import { create } from "zustand";
import { ResumeData, emptyResumeData } from "@/types/resume";
import { ThemeId } from "@/types/theme";

export type WizardStep = 1 | 2 | 3 | 4 | 5;

interface BuilderState {
  currentStep: WizardStep;
  selectedTheme: ThemeId | null;
  resumeData: ResumeData;
  resumeText: string;
  generatedHtml: string;
  isLoading: boolean;
  error: string | null;

  // Actions
  setStep: (step: WizardStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  setTheme: (theme: ThemeId) => void;
  setResumeData: (data: ResumeData) => void;
  updateResumeField: <K extends keyof ResumeData>(
    key: K,
    value: ResumeData[K]
  ) => void;
  setResumeText: (text: string) => void;
  setGeneratedHtml: (html: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useBuilderStore = create<BuilderState>((set) => ({
  currentStep: 1,
  selectedTheme: null,
  resumeData: emptyResumeData,
  resumeText: "",
  generatedHtml: "",
  isLoading: false,
  error: null,

  setStep: (step) => set({ currentStep: step }),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 5) as WizardStep,
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1) as WizardStep,
    })),
  setTheme: (theme) => set({ selectedTheme: theme }),
  setResumeData: (data) => set({ resumeData: data }),
  updateResumeField: (key, value) =>
    set((state) => ({
      resumeData: { ...state.resumeData, [key]: value },
    })),
  setResumeText: (text) => set({ resumeText: text }),
  setGeneratedHtml: (html) => set({ generatedHtml: html }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      currentStep: 1,
      selectedTheme: null,
      resumeData: emptyResumeData,
      resumeText: "",
      generatedHtml: "",
      isLoading: false,
      error: null,
    }),
}));
