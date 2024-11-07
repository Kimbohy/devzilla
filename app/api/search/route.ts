// app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term") || "";
  const type = searchParams.get("type") || "all";

  try {
    // Replace with your actual backend search endpoint
    const response = await axios.get("http://localhost:8080/search", {
      params: { term, type },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
