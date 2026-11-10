import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthUser } from "@/lib/api-auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = getAuthUser(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const body = await req.json();
    const { activity_type, body: activityBody } = body;

    if (!activityBody) {
      return NextResponse.json({ message: "Activity text body is required" }, { status: 400 });
    }

    const activity = db.addLeadActivity(
      id,
      {
        activity_type: activity_type || "note",
        body: activityBody
      },
      user
    );

    return NextResponse.json(activity, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error logging activity";
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
