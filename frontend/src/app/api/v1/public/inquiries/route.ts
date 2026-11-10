import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { property_id, client_name, phone, email, preferred_contact_method, message } = body;

    if (!client_name || !phone) {
      return NextResponse.json(
        { message: "Client name and phone number are required" },
        { status: 400 }
      );
    }

    let assigned_agent_id: string | undefined;
    let preferred_location: string | undefined;
    let property_type: string | undefined;

    if (property_id) {
      const prop = db.getPropertyById(property_id);
      if (prop) {
        assigned_agent_id = prop.assigned_agent_id;
        preferred_location = `${prop.locality}, ${prop.city}`;
        property_type = prop.property_type;
      }
    }

    const lead = db.createLead({
      property_id,
      client_name,
      phone,
      email,
      preferred_contact_method: preferred_contact_method || "WhatsApp",
      purpose: "Buy",
      preferred_location,
      property_type,
      source: "Website",
      stage: "New",
      assigned_agent_id,
      notes: message
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error processing inquiry";
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
