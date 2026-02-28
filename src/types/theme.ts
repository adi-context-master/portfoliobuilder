export type ThemeId =
  | "minimal"
  | "bold"
  | "creative"
  | "professional"
  | "developer"
  | "elegant"
  | "monochrome"
  | "bauhaus"
  | "linear";

export interface ThemeMeta {
  id: ThemeId;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  previewImage?: string;
}
