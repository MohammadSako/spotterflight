"use client";

import * as React from "react";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import BtnSpinner from "../../components/ui/button-spinner";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useFlightSearch } from "../hooks/useFlightSearch";
import { FlightCard } from "./flightCard";
import { AIRPORTS } from "./airportsList";

export default function SearchFL() {
  const [wherefrom, setWherefrom] = useState<{ city: string; code: string }>({
    city: "",
    code: "",
  });
  const [whereTo, setWhereTo] = useState<{ city: string; code: string }>({
    city: "",
    code: "",
  });
  const [departure, setDeparture] = useState<Dayjs | null>(dayjs());

  const [fromResults, setFromResults] = useState<typeof AIRPORTS>([]);
  const [toResults, setToResults] = useState<typeof AIRPORTS>([]);

  const [searchParams, setSearchParams] = useState<{
    origin: string;
    destination: string;
    date: string;
  } | null>(null);

  const departureData = departure?.format("YYYY-MM-DD") || "";

  // Only fetch when search button is clicked
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFlightSearch(
    searchParams || { origin: "", destination: "", date: "" },
  );

  const flights = data?.pages?.flatMap((page) => page.flights) ?? [];

  // Handlers for filtering airport list
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setWherefrom({ city: term, code: "" });
    setFromResults(
      term.trim() === ""
        ? []
        : AIRPORTS.filter((item) =>
            item.city.toLowerCase().includes(term.toLowerCase()),
          ),
    );
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setWhereTo({ city: term, code: "" });
    setToResults(
      term.trim() === ""
        ? []
        : AIRPORTS.filter((item) =>
            item.city.toLowerCase().includes(term.toLowerCase()),
          ),
    );
  };

  const selectFrom = (airport: (typeof AIRPORTS)[number]) => {
    setWherefrom(airport);
    setFromResults([]);
  };

  const selectTo = (airport: (typeof AIRPORTS)[number]) => {
    setWhereTo(airport);
    setToResults([]);
  };

  const searchFlights = () => {
    if (!wherefrom.code || !whereTo.code || !departureData) return;
    setSearchParams({
      origin: wherefrom.code,
      destination: whereTo.code,
      date: departureData,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col md:flex-row justify-center bg-white p-4 gap-4">
        {/* Inputs */}
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* From */}
            <div className="relative flex-1 mt-2">
              <input
                type="text"
                value={wherefrom.city}
                onChange={handleFromChange}
                placeholder="Where from?"
                className="border border-slate-400 px-4 rounded h-14 w-full"
              />
              {fromResults.length > 0 && (
                <ul className="absolute z-50 bg-white border shadow-lg w-full mt-1 max-h-60 overflow-auto rounded">
                  {fromResults.map((item, idx) => (
                    <li
                      key={idx}
                      className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                      onClick={() => selectFrom(item)}
                    >
                      <strong>{item.city}</strong> <em>({item.code})</em>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* To */}
            <div className="relative flex-1 mt-2">
              <input
                type="text"
                value={whereTo.city}
                onChange={handleToChange}
                placeholder="Where to?"
                className="border border-slate-400 px-4 rounded h-14 w-full"
              />
              {toResults.length > 0 && (
                <ul className="absolute z-50 bg-white border shadow-lg w-full mt-1 max-h-60 overflow-auto rounded">
                  {toResults.map((item, idx) => (
                    <li
                      key={idx}
                      className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                      onClick={() => selectTo(item)}
                    >
                      <strong>{item.city}</strong> <em>({item.code})</em>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Date */}
            <div className="relative flex-1">
              <DemoContainer components={["DatePickers"]}>
                <DatePicker
                  label="Departure"
                  value={departure}
                  onChange={setDeparture}
                />
              </DemoContainer>
            </div>
          </div>

          <button
            onClick={searchFlights}
            className="bg-blue-500 text-white py-3 px-6 rounded text-lg shadow hover:shadow-inner"
          >
            {isLoading ? <BtnSpinner /> : "Search Flights"}
          </button>

          {/* Results */}
          <div className="flex-1 mt-4 md:mt-0">
            {isLoading && !data && (
              <p className="text-center text-blue-600 text-xl">
                Searching flights...
              </p>
            )}
            {error && (
              <p className="text-center text-red-600 text-xl">
                Error fetching flights
              </p>
            )}
            {flights.length > 0 && (
              <div className="flex flex-col gap-4">
                {flights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}

                {hasNextPage && (
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    {isFetchingNextPage
                      ? "Loading more..."
                      : "Load more flights"}
                  </button>
                )}
              </div>
            )}

            {!isLoading && flights.length === 0 && searchParams && (
              <p className="text-center text-gray-600 mt-4">
                No flights found.
              </p>
            )}
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}
