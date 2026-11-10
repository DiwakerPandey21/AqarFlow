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
    const { payment_id, ...paymentData } = body;
    if (!payment_id) {
      return NextResponse.json({ message: "payment_id is required" }, { status: 400 });
    }

    const updated = db.recordRentPayment(id, payment_id, paymentData, user);
    if (!updated) return NextResponse.json({ message: "Lease or payment schedule not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error recording rent payment";
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
