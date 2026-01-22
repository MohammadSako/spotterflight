"use client";

import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { IoSearchOutline } from "react-icons/io5";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useFlightSearch } from "../hooks/useFlightSearch";
import BtnSpinner from "../../components/ui/button-spinner";
import { FlightCard } from "../../components/ui/flightCard";
import { AIRPORTS } from "../../components/ui/airportsList";
import FlightInput from "../../components/ui/flightInput";
import { Button } from "@/components/ui/button";
import { CardSkeleton } from "../../components/ui/cardSkeleton";
import { SonnerAlert } from "../../components/ui/sonnerAlert";
import { useDebounce } from "../hooks/useDebounce";
import { toast } from "sonner";

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

  const debouncedSearchParams = useDebounce(searchParams, 500);

  const departureData = departure?.format("YYYY-MM-DD") || "";

  // Only fetch when search button is clicked
  const { data, isLoading, error } = useFlightSearch(
    debouncedSearchParams || { origin: "", destination: "", date: "" },
  );

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

  useEffect(() => {
    if (error) {
      toast.error(
        "No flights found. The free Amadeus API has usage limits. Try adjusting your search or check back later.",
        {
          position: "top-right",
          duration: 5000,
        },
      );
    }
  }, [error]);

  useEffect(() => {
    if (data && data.length === 0 && !isLoading) {
      toast(
        "No flights found. The free Amadeus API has usage limits. Try adjusting your search or check back later.",
        { position: "bottom-right" },
      );
    }
  }, [data, isLoading]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
        {/* Inputs */}
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* From */}
            <FlightInput
              value={wherefrom.city}
              handle={handleFromChange}
              data={fromResults}
              onSelect={selectFrom}
              placeholder="Where from?"
              variant="from"
            />
            {/* To */}
            <FlightInput
              value={whereTo.city}
              handle={handleToChange}
              data={toResults}
              onSelect={selectTo}
              placeholder="Where to?"
              variant="to"
            />

            {/* Date */}
            <div className="relative flex-1">
              <DemoContainer components={["DatePickers"]}>
                <DatePicker
                  label="Departure"
                  value={departure}
                  onChange={setDeparture}
                  className="border border-slate-400 px-4 text-blue-700 font-bold rounded h-14 sm:w-full w-[275px]"
                />
              </DemoContainer>
            </div>
          </div>
          <Button
            onClick={searchFlights}
            size="lg"
            className="bg-blue-500 text-white rounded-full text-lg shadow-md hover:bg-blue-600 hover:shadow-inner"
          >
            {isLoading ? (
              <BtnSpinner />
            ) : (
              <>
                <IoSearchOutline size={30} />
                <p className="font-google">Search Flights</p>
              </>
            )}
          </Button>
          {/* Results */}
          <div className="flex-1 mt-4 md:mt-0">
            {isLoading && (
              <div className="flex flex-col gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            )}
            {data && data.length === 0 && !isLoading && (
              <p className="text-center text-gray-500 text-lg">
                No flights available for this route.
              </p>
            )}
            {data && data.length > 0 && (
              <div className="flex flex-col gap-4">
                {data.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    wherefromCode={wherefrom.code}
                    whereToCode={whereTo.code}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}
