import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = db.authenticateUser(email, password || "Password123!");
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password. Use demo accounts or Password123!" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      access_token: user.id,
      token_type: "bearer",
      user: {
        id: user.id,
        agency_id: user.agency_id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar_url: user.avatar_url,
        status: user.status
      }
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
