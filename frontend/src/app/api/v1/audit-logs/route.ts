import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthUser } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const user = getAuthUser(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (user.role !== "agency_admin") {
    return NextResponse.json({ message: "Admin access required to view audit logs." }, { status: 403 });
  }

  const logs = db.getAuditLogs();
  return NextResponse.json(logs);
}
