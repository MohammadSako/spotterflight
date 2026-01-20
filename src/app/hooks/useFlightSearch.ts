// import { useQuery } from "@tanstack/react-query";
// import type { Flight } from "../types/flight";

// type SearchParams = {
//   origin: string;
//   destination: string;
//   date: string;
// };

// type FlightResponse = {
//   flights: Flight[];
// };

// export function useFlightSearch(params: SearchParams) {
//   return useQuery<FlightResponse>({
//     queryKey: ["flights", params],
//     queryFn: async () => {
//       const res = await fetch(
//         `/api/flights/search?origin=${params.origin}&destination=${params.destination}&date=${params.date}`
//       );

//       if (!res.ok) {
//         throw new Error("Flight search failed");
//       }

//       return res.json();
//     },
//     enabled: Boolean(params.origin && params.destination && params.date),
//   });
// }

import { useInfiniteQuery } from "@tanstack/react-query";
import type { Flight } from "../types/flight";

type SearchParams = {
  origin: string;
  destination: string;
  date: string;
};

type FlightResponse = {
  flights: Flight[];
  page: number;
  hasMore: boolean;
};

export function useFlightSearch(params: SearchParams) {
  return useInfiniteQuery<FlightResponse>({
    queryKey: ["flights", params],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `/api/flights/search?origin=${params.origin}&destination=${params.destination}&date=${params.date}&page=${pageParam}&limit=10`,
      );

      if (!res.ok) {
        throw new Error("Flight search failed");
      }

      return res.json();
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: Boolean(params.origin && params.destination && params.date),
  });
}
