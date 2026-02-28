import { ThemeId, ThemeMeta } from "@/types/theme";
import { ResumeData } from "@/types/resume";
import { generate as generateMinimal } from "./minimal";
import { generate as generateBold } from "./bold";
import { generate as generateCreative } from "./creative";
import { generate as generateProfessional } from "./professional";
import { generate as generateDeveloper } from "./developer";
import { generate as generateElegant } from "./elegant";
import { generate as generateMonochrome } from "./monochrome";
import { generate as generateBauhaus } from "./bauhaus";
import { generate as generateLinear } from "./linear";

type GenerateFn = (data: ResumeData) => string;

const generators: Record<ThemeId, GenerateFn> = {
  minimal: generateMinimal,
  bold: generateBold,
  creative: generateCreative,
  professional: generateProfessional,
  developer: generateDeveloper,
  elegant: generateElegant,
  monochrome: generateMonochrome,
  bauhaus: generateBauhaus,
  linear: generateLinear,
};

export const themes: ThemeMeta[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "White, clean, generous whitespace, system fonts",
    colors: { primary: "#1a1a1a", secondary: "#f5f5f5", accent: "#555555" },
  },
  {
    id: "bold",
    name: "Bold",
    description: "Dark background, large type, gradient accents",
    colors: { primary: "#0a0a0a", secondary: "#3b82f6", accent: "#8b5cf6" },
  },
  {
    id: "creative",
    name: "Creative",
    description: "Asymmetric grid, pastels, CSS animations, card-based",
    colors: { primary: "#faf5ff", secondary: "#a855f7", accent: "#ec4899" },
  },
  {
    id: "professional",
    name: "Professional",
    description: "Navy/white, serif headings, two-column, formal",
    colors: { primary: "#1e3a5f", secondary: "#ffffff", accent: "#2c5282" },
  },
  {
    id: "developer",
    name: "Developer",
    description: "Terminal aesthetic, monospace, dark + green/amber",
    colors: { primary: "#0d1117", secondary: "#4ade80", accent: "#fbbf24" },
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Warm cream, gold accents, editorial typography",
    colors: { primary: "#fdf8f0", secondary: "#b8860b", accent: "#d4a853" },
  },
  {
    id: "monochrome",
    name: "Monochrome",
    description: "Pure black & white, serif editorial, oversized type",
    colors: { primary: "#000000", secondary: "#ffffff", accent: "#525252" },
  },
  {
    id: "bauhaus",
    name: "Bauhaus",
    description: "Geometric constructivism, primary colors, hard shadows",
    colors: { primary: "#F0F0F0", secondary: "#D02020", accent: "#1040C0" },
  },
  {
    id: "linear",
    name: "Linear",
    description: "Cinematic dark mode, ambient lighting, glass effects",
    colors: { primary: "#050506", secondary: "#5E6AD2", accent: "#6872D9" },
  },
];

export function generatePortfolio(themeId: ThemeId, data: ResumeData): string {
  const generator = generators[themeId];
  if (!generator) {
    throw new Error(`Unknown theme: ${themeId}`);
  }
  return generator(data);
}
