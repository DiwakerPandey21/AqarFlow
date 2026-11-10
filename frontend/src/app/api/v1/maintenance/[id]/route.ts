import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthUser } from "@/lib/api-auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const request = db.getMaintenanceRequestById(id);
  if (!request) return NextResponse.json({ message: "Maintenance request not found" }, { status: 404 });
  return NextResponse.json(request);
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
    const updated = db.updateMaintenanceRequest(id, body, user);
    if (!updated) return NextResponse.json({ message: "Maintenance request not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error updating maintenance request";
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
