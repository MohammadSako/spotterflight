// "use client";

// import * as React from "react";
// import { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import BtnSpinner from "../../components/ui/button-spinner";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { useFlightSearch } from "../hooks/useFlightSearch";
// import { FlightCard } from "./flightCard";
// import { AIRPORTS } from "./airportsList";

// export default function SearchFL() {
//   const [wherefrom, setWherefrom] = useState("");
//   const [whereTo, setWhereTo] = useState("");
//   const [airports, setAirports] = useState([]);
//   const [fromResults, setFromResults] = useState([]);
//   const [toResults, setToResults] = useState([]);
//   const [departure, setDeparture] = useState(dayjs());

//   const departureData = departure.format("YYYY-MM-DD");

//   const { data, isLoading, error } = useFlightSearch({
//     origin: wherefrom.code,
//     destination: whereTo.code,
//     date: departureData,
//   });
// console.log("wherefrom", wherefrom.code);
// console.log("whereTo", whereTo.code);
// console.log("departureData:", departureData);
//   function searchFlights() {

//   }

//   useEffect(() => {
//     setAirports(AIRPORTS || []);
//     setFromResults([]);
//     setToResults([]);
//   }, []);

//   const flights = data ?? [];

//   console.log("datadata", data);

//   const WherefromHandle = (e) => {
//     const searchTerm = e.target.value;
//     setWherefrom(searchTerm);
//     if (searchTerm.trim() === "") {
//       setFromResults([]);
//     } else {
//       const filtered = airports.filter((item) =>
//         item.city.toLowerCase().includes(searchTerm.toLowerCase()),
//       );
//       setFromResults(filtered);
//     }
//   };

//   const WheretoHandle = (e) => {
//     const searchTerm = e.target.value;
//     setWhereTo(searchTerm);
//     if (searchTerm.trim() === "") {
//       setToResults([]);
//     } else {
//       const filtered = airports.filter((item) =>
//         item.city.toLowerCase().includes(searchTerm.toLowerCase()),
//       );
//       setToResults(filtered);
//     }
//   };

//   const fromHandleSelect = (selectedItem) => {
//     setWherefrom(selectedItem);
//     setFromResults([]);
//   };

//   const toHandleSelect = (selectedItem) => {
//     setWhereTo(selectedItem);
//     setToResults([]);
//   };

//   return (
//     <>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <div className="flex flex-col md:flex-row justify-center bg-white rounded xl:shadow-md p-4">
//           <div className="flex flex-col gap-4">
//             <div className="flex md:flex-row flex-col lg:gap-8 md:gap-2">
//               <div className="flex flex-col gap-2 mt-2 relative">
//                 <input
//                   type="text"
//                   value={wherefrom.city}
//                   className="border border-slate-400 px-4 rounded h-14"
//                   onChange={WherefromHandle}
//                   placeholder="Where from?"
//                 />
//                 {wherefrom && fromResults.length > 0 && (
//                   <div className="border-2 border-gray-500 px-4 rounded-md shadow-lg absolute z-50 bg-blue-100 mt-14">
//                     <ul style={{ listStyle: "none", padding: 0 }}>
//                       {fromResults.map((result, index) => (
//                         <li
//                           key={index}
//                           onClick={() => fromHandleSelect(result)}
//                           style={{
//                             cursor: "pointer",
//                             padding: "0.5rem",
//                             borderBottom: "1px solid #ccc",
//                           }}
//                         >
//                           <strong>{result.city}</strong>
//                           <br />
//                           <em>{result.code}</em>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>

//               <div className="flex flex-col gap-2 mt-2 relative">
//                 <input
//                   type="text"
//                   value={whereTo.city}
//                   className="border border-slate-400 px-4 rounded h-14"
//                   onChange={WheretoHandle}
//                   placeholder="Where to?"
//                 />
//                 {whereTo && toResults.length > 0 && (
//                   <div className="border-2 border-gray-500 p-2 rounded-md shadow-lg absolute z-50 bg-blue-100 mt-14">
//                     <ul style={{ listStyle: "none", padding: 0 }}>
//                       {toResults.map((result, index) => (
//                         <li
//                           key={index}
//                           onClick={() => toHandleSelect(result)}
//                           style={{
//                             cursor: "pointer",
//                             padding: "0.5rem",
//                             borderBottom: "1px solid #ccc",
//                           }}
//                         >
//                           <strong>{result.city}</strong>
//                           <br />
//                           <em>{result.code}</em>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//               <DemoContainer components={["DatePickers"]}>
//                 <DatePicker
//                   label="Departure"
//                   value={departure}
//                   onChange={setDeparture}
//                 />
//               </DemoContainer>
//             </div>
//             <button
//               onClick={searchFlights}
//               className="bg-blue-500 text-white py-2 px-4 rounded text-lg z-10 shadow-lg hover:shadow-inner"
//             >
//               {isLoading ? <BtnSpinner /> : "Search Flights"}
//             </button>
//           </div>
//         </div>

//         {data && (
//           <div>
//             {flights.map((flight) => (
//               <FlightCard key={flight.id} flight={flight} />
//             ))}
//           </div>
//         )}
//         {!data && isLoading && (
//           <div className="flex justify-center text-3xl text-blue-600 mt-10">
//             <p>Search for a flight</p>
//           </div>
//         )}
//         {error && (
//           <div className="flex justify-center text-3xl text-blue-600 mt-10">
//             <p>Unexpected error</p>
//           </div>
//         )}
//       </LocalizationProvider>
//     </>
//   );
// }

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
import { CardSkeleton } from "./cardSkeleton";
import { useDebounce } from "../hooks/useDebounce";

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
  console.log("data", data);

  // const flights = data?.pages?.flatMap((page) => page.flights) ?? [];

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
      <div className="flex flex-col md:flex-row justify-center bg-card text-card-foreground  p-4 gap-4">
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
            {isLoading && (
              <div className="flex flex-col gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            )}
            {error && (
              <div className="text-center text-xl">
                <p className="text-white text-md p-1 bg-red-400 rounded mt-1">
                  {error.message}
                </p>
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
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}
