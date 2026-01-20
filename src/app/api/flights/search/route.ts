import { getAmadeusAccessToken } from "@/lib/amadeus";
import { mapAmadeusOffers } from "@/lib/mapper";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const date = searchParams.get("date");

  if (!origin || !destination || !date) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const token = await getAmadeusAccessToken();

  const res = await fetch(
    `${process.env.AMADEUS_BASE_URL}/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}&adults=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.error("Amadeus error:", data);
    return NextResponse.json(data, { status: res.status });
  }

  const flights = mapAmadeusOffers(data.data);

  return NextResponse.json({ flights });
}
