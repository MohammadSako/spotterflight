interface AmadeusOffer {
  id: string;
  itineraries: Array<{
    duration: string;
    segments: Array<{
      carrierCode: string;
      departure: { at: string };
      arrival: { at: string };
    }>;
  }>;
  price: {
    total: string;
    currency: string;
  };
}

export function mapAmadeusOffers(offers: AmadeusOffer[]) {
  return offers.map((offer) => {
    const itinerary = offer.itineraries[0];
    const segments = itinerary.segments;

    return {
      id: offer.id,
      price: Number(offer.price.total),
      currency: offer.price.currency,
      airline: segments[0].carrierCode,
      duration: itinerary.duration,
      stops: segments.length - 1,
      departureTime: segments[0].departure.at,
      arrivalTime: segments[segments.length - 1].arrival.at,
    };
  });
}
