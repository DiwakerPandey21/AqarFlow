import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthUser } from "@/lib/api-auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = getAuthUser(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (user.role !== "agency_admin") {
    return NextResponse.json({ message: "Admin access required to reassign leads." }, { status: 403 });
  }

  const { id } = await params;
  try {
    const body = await req.json();
    const { agent_id } = body;
    if (!agent_id) {
      return NextResponse.json({ message: "agent_id is required" }, { status: 400 });
    }

    const updated = db.assignLead(id, agent_id, user);
    return NextResponse.json(updated);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error assigning lead";
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
