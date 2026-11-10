import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "AqarFlow Platform API",
    version: "1.0.0",
    market: "Pakistan-first (PKR)",
    timestamp: new Date().toISOString()
  });
}
