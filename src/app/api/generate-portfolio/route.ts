import { NextRequest, NextResponse } from "next/server";
import { generatePortfolio } from "@/templates";
import { resumeDataSchema } from "@/lib/resume-schema";
import { ThemeId } from "@/types/theme";

const validThemes: ThemeId[] = [
  "minimal",
  "bold",
  "creative",
  "professional",
  "developer",
  "elegant",
  "monochrome",
  "bauhaus",
  "linear",
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { theme, data } = body;

    if (!theme || !validThemes.includes(theme)) {
      return NextResponse.json(
        { error: `Invalid theme. Must be one of: ${validThemes.join(", ")}` },
        { status: 400 }
      );
    }

    const parsed = resumeDataSchema.parse(data);
    const html = generatePortfolio(theme as ThemeId, parsed);

    return NextResponse.json({ html });
  } catch (error) {
    console.error("Generate portfolio error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate portfolio";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
