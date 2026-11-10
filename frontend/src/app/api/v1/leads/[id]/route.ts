import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthUser } from "@/lib/api-auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = getAuthUser(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const lead = db.getLeadById(id);
  if (!lead) return NextResponse.json({ message: "Lead not found" }, { status: 404 });

  if (user.role === "agent" && lead.assigned_agent_id && lead.assigned_agent_id !== user.id) {
    return NextResponse.json({ message: "Forbidden: You are not assigned to this lead." }, { status: 403 });
  }

  return NextResponse.json(lead);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = getAuthUser(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const body = await req.json();
    const updated = db.updateLead(id, body, user);
    return NextResponse.json(updated);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error updating lead";
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
