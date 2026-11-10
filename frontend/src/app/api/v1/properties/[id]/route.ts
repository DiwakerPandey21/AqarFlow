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
  const property = db.getPropertyById(id);
  if (!property) return NextResponse.json({ message: "Property not found" }, { status: 404 });

  return NextResponse.json(property);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = getAuthUser(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (user.role !== "agency_admin") {
    return NextResponse.json({ message: "Admin access required to modify property." }, { status: 403 });
  }

  const { id } = await params;
  try {
    const body = await req.json();
    const updated = db.updateProperty(id, body, user);
    return NextResponse.json(updated);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error updating property";
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = getAuthUser(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (user.role !== "agency_admin") {
    return NextResponse.json({ message: "Admin access required to archive property." }, { status: 403 });
  }

  const { id } = await params;
  const success = db.deleteProperty(id, user);
  if (!success) return NextResponse.json({ message: "Property not found" }, { status: 404 });

  return NextResponse.json({ message: "Property archived successfully", id });
}
