import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthUser } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || undefined;
  const purpose = searchParams.get("purpose") || undefined;
  const city = searchParams.get("city") || undefined;
  const search = searchParams.get("search") || undefined;

  const properties = db.getProperties({
    status,
    purpose,
    city,
    search,
    publicOnly: false
  });

  return NextResponse.json(properties);
}

export async function POST(req: NextRequest) {
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (user.role !== "agency_admin") {
    return NextResponse.json({ message: "Only agency admins can create property records." }, { status: 403 });
  }

  try {
    const body = await req.json();
    const newProp = db.createProperty(body, user);
    return NextResponse.json(newProp, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error creating property";
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
