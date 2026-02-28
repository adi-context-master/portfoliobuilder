import { NextRequest, NextResponse } from "next/server";
import { deployToNetlify } from "@/lib/netlify-client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, htmlContent, siteName } = body;

    if (!token) {
      return NextResponse.json(
        { error: "Netlify token is required" },
        { status: 400 }
      );
    }

    if (!htmlContent) {
      return NextResponse.json(
        { error: "HTML content is required" },
        { status: 400 }
      );
    }

    const result = await deployToNetlify(token, htmlContent, siteName);

    return NextResponse.json({
      success: true,
      url: result.url,
      siteId: result.siteId,
    });
  } catch (error) {
    console.error("Netlify deploy error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to deploy to Netlify";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
