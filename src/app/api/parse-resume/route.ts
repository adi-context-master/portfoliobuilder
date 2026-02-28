import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPDF } from "@/lib/pdf-parser";
import { parseResumeWithAI } from "@/lib/groq";
import { resumeDataSchema } from "@/lib/resume-schema";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let resumeText = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      const text = formData.get("text") as string | null;

      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        resumeText = await extractTextFromPDF(buffer);
      } else if (text) {
        resumeText = text;
      }
    } else {
      const body = await request.json();
      resumeText = body.text || "";
    }

    if (!resumeText.trim()) {
      return NextResponse.json(
        { error: "No resume text provided" },
        { status: 400 }
      );
    }

    const rawParsed = await parseResumeWithAI(resumeText);
    const parsed = resumeDataSchema.parse(rawParsed);

    return NextResponse.json({ data: parsed, rawText: resumeText });
  } catch (error) {
    console.error("Resume parse error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to parse resume";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
