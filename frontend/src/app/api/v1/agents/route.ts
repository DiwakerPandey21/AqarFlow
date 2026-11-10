import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthUser } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const user = getAuthUser(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const agents = db.getAgentsWithStats();
  return NextResponse.json(agents);
}

export async function POST(req: NextRequest) {
  const user = getAuthUser(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (user.role !== "agency_admin") {
    return NextResponse.json({ message: "Admin access required to invite agents." }, { status: 403 });
  }

  try {
    const body = await req.json();
    const newAgent = db.inviteAgent(body, user);
    return NextResponse.json(newAgent, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error inviting agent";
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
