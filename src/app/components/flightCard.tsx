export type Flight = {
  id: string;
  price: number;
  currency: string;
  airline: string;
  duration: string;
  stops: number;
  departureTime: string;
  arrivalTime: string;
};


type Props = {
  flight: Flight;
};

export function FlightCard({ flight }: Props) {
  return (
    <div className="rounded-xl border p-4 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-lg">{flight.airline}</p>
          <p className="text-sm text-gray-500">
            {flight.stops === 0 ? "Direct" : `${flight.stops} stop(s)`}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xl font-bold">
            {flight.price} {flight.currency}
          </p>
        </div>
      </div>

      <div className="mt-3 flex justify-between text-sm text-gray-600">
        <span>🛫 {new Date(flight.departureTime).toLocaleTimeString()}</span>
        <span>⏱ {flight.duration.replace("PT", "").toLowerCase()}</span>
        <span>🛬 {new Date(flight.arrivalTime).toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
