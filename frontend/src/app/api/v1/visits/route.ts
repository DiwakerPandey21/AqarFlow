import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthUser } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const user = getAuthUser(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || undefined;
  const property_id = searchParams.get("property_id") || undefined;

  const visits = db.getVisits(user, { status, property_id });
  return NextResponse.json(visits);
}

export async function POST(req: NextRequest) {
  const user = getAuthUser(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const ignoreConflict = searchParams.get("ignore_conflict") === "true";

  try {
    const body = await req.json();
    const result = db.createVisit(body, user, ignoreConflict);

    if (result.conflict) {
      return NextResponse.json(
        {
          conflict: true,
          message: result.conflict.message,
          conflicting_visit: result.conflict.conflicting_visit
        },
        { status: 409 }
      );
    }

    return NextResponse.json(result.visit, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error creating visit";
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
