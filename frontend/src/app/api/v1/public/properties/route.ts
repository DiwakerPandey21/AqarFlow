import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const purpose = searchParams.get("purpose") || undefined;
  const city = searchParams.get("city") || undefined;
  const locality = searchParams.get("locality") || undefined;
  const property_type = searchParams.get("property_type") || undefined;
  const min_price = searchParams.get("min_price") ? Number(searchParams.get("min_price")) : undefined;
  const max_price = searchParams.get("max_price") ? Number(searchParams.get("max_price")) : undefined;
  const bedrooms = searchParams.get("bedrooms") ? Number(searchParams.get("bedrooms")) : undefined;
  const is_featured = searchParams.get("is_featured") ? searchParams.get("is_featured") === "true" : undefined;
  const search = searchParams.get("search") || undefined;

  const properties = db.getProperties({
    purpose,
    city,
    locality,
    property_type,
    min_price,
    max_price,
    bedrooms,
    is_featured,
    search,
    publicOnly: true
  });

  return NextResponse.json(properties);
}
