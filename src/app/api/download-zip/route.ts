import { NextRequest, NextResponse } from "next/server";
import { createPortfolioZip } from "@/lib/zip-builder";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { htmlContent } = body;

    if (!htmlContent) {
      return NextResponse.json(
        { error: "HTML content is required" },
        { status: 400 }
      );
    }

    const zipBuffer = await createPortfolioZip(htmlContent);
    const uint8 = new Uint8Array(zipBuffer);

    return new NextResponse(uint8, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="portfolio.zip"',
      },
    });
  } catch (error) {
    console.error("Download ZIP error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create ZIP";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
