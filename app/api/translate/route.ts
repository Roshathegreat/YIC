import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error:
        "Translation layer is stubbed until week 2. ANTHROPIC_API_KEY required.",
    },
    { status: 501 },
  );
}
