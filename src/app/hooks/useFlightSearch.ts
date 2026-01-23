import { useQuery } from "@tanstack/react-query";
import type { Flight } from "../types/flight";

type SearchParams = {
  origin: string;
  destination: string;
  date: string;
};


export function useFlightSearch(params: SearchParams) {
  return useQuery<Flight[]>({
    queryKey: ["flights", params],
    queryFn: async () => {
      const res = await fetch(
        `/api/flights/search?origin=${params.origin}&destination=${params.destination}&date=${params.date}`,
      );

      if (!res.ok) {
        throw new Error("Flight search failed");
      }

      const json = await res.json();
      return json.flights;
    },
    enabled: Boolean(params.origin && params.destination && params.date),
  });
}
