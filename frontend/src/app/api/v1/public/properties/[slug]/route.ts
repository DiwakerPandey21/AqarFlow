import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const property = db.getPropertyBySlug(slug);

  if (!property || !property.is_published) {
    return NextResponse.json({ message: "Property listing not found" }, { status: 404 });
  }

  return NextResponse.json(property);
}
