import { NextRequest } from "next/server";
import {
  analyzeImageDemo,
  formatDiagnosisResponse,
} from "@/lib/image-analysis";

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();

    if (!image || typeof image !== "string") {
      return Response.json(
        { error: "Slika nije priložena." },
        { status: 400 }
      );
    }

    // Demo mode — simulirana analiza (vision API može se dodati kasnije)
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

    const diagnosis = analyzeImageDemo(image);
    const response = formatDiagnosisResponse(diagnosis);

    return Response.json({ response, demo: true });
  } catch (error) {
    console.error("Image analysis error:", error);
    return Response.json(
      { error: "Greška pri analizi slike." },
      { status: 500 }
    );
  }
}
