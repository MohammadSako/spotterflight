import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Airlines } from "./airLines";
import { AIRPORTS } from "./airportsList";
import {
  MdEuro,
  MdAirlineSeatLegroomNormal,
  MdOutlineUsb,
  MdOutlineOndemandVideo,
} from "react-icons/md";
import { FiAlertTriangle, FiWifi } from "react-icons/fi";

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
  wherefromCode: string;
  whereToCode: string;
};

export function FlightCard({ flight, wherefromCode, whereToCode }: Props) {
  const airlineName = Airlines[flight.airline] ?? flight.airline;
  const toAirport = AIRPORTS.find((a) => a.code === whereToCode);
  const fromAirport = AIRPORTS.find((a) => a.code === wherefromCode);

  function formatDuration(duration: string): string {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!match) return "";
    const hours = match[1];
    const minutes = match[2];
    const parts: string[] = [];
    if (hours) parts.push(`${hours} hr`);
    if (minutes) parts.push(`${minutes} min`);
    return parts.join(" ");
  }
  function travelTimeFormatter(duration: string): string {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!match) return "";
    let hours = Number(match[1] ?? 0);
    const minutes = Number(match[2] ?? 0);
    if (minutes > 30) {
      hours += 1;
    }
    if (hours === 0) {
      return `${minutes} min`;
    }
    return `${hours} hr`;
  }

  const departureTime = new Date(flight.departureTime).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const arrivalTime = new Date(flight.arrivalTime).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const isOvernight = arrivalTime.includes("AM");
  const travelTime = travelTimeFormatter(flight.duration);

  return (
    <div className="text-card-foreground">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="flex w-full items-center justify-between">
            <div className="text-gray-500 dark:text-gray-400 font-google-sans text-sm min-w-[100px]">
              {airlineName}
            </div>

            <div className="sm:flex flex-col hidden">
              <div className="text-gray-900 dark:text-gray-100 text-md flex flex-row gap-2">
                <p>{departureTime}</p>-<p>{arrivalTime}</p>
              </div>
              {wherefromCode && (
                <p className="text-gray-400 dark:text-gray-500 text-xs">
                  {wherefromCode} - {whereToCode}
                </p>
              )}
            </div>

            <div className="text-gray-700 dark:text-gray-300 text-md hidden sm:flex">
              {formatDuration(flight.duration)}
            </div>
            <div className="text-gray-700 text-md">
              {flight.stops === 0 ? (
                <p className="text-green-600 dark:text-green-500">Direct</p>
              ) : (
                <div className="flex flex-row items-center gap-2 text-gray-700 dark:text-gray-300">
                  {flight.stops} stop
                  <FiAlertTriangle color="red" />
                </div>
              )}
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-md mr-4 hidden sm:flex">
              <div className="flex flex-col ">
                <div className="flex flex-row items-center gap-1">
                  <MdEuro />
                  {flight.price}
                </div>
                <p className="text-xs">round trip</p>
              </div>
            </div>
          </div>
        </AccordionSummary>

        <AccordionDetails className="text-gray-900 dark:text-gray-100">
          <div className="border-t border-gray-200 mb-6" />
          <div className="flex sm:flex-row flex-col justify-around gap-4 mx-4">
            <div className="flex flex-col gap-2 text-sm text-gray-900 dark:text-gray-100 ">
              <div className="flex flex-row gap-2">
                <p>
                  {new Date(flight.departureTime).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>{" "}
                -
                <p>
                  {fromAirport?.airport} ({whereToCode})
                </p>
              </div>
              <div className="flex gap-4">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full border border-gray-400 dark:border-gray-500" />
                  <div className="flex-1 border-l-2 border-dotted border-gray-300 dark:border-gray-600 my-1" />
                  <div className="w-3 h-3 rounded-full border border-gray-400 dark:border-gray-500" />
                </div>
                {/* Content */}
                <div className="space-y-1">
                  <p className="text-gray-800 dark:text-gray-100  font-medium">
                    {departureTime}
                  </p>

                  <p className="sm:text-sm text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    Estimated travel time: {travelTime}
                    {isOvernight && (
                      <span className="flex items-center gap-1 text-blue-900 dark:text-blue-400 text-xs">
                        Overnight
                        <FiAlertTriangle className="text-red-500" size={12} />
                      </span>
                    )}
                  </p>
                  <p className="text-gray-800 dark:text-gray-100  font-medium">
                    {arrivalTime}
                  </p>
                </div>
              </div>

              <div className="flex flex-row gap-2 ">
                <p>
                  {new Date(flight.arrivalTime).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>{" "}
                -
                <p>
                  {toAirport?.airport} ({wherefromCode})
                </p>
              </div>
            </div>
            <div className="border-t border-gray-200 sm:hidden" />
            <div className="flex flex-col gap-2 text-sm text-gray-900">
              <div className="flex flex-row gap-2 items-center">
                <MdAirlineSeatLegroomNormal />
                <p>Average legroom (30 in)</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <FiWifi />
                <p>Wi-Fi for a fee</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <MdOutlineUsb />
                <p>In-seat USB outlet</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <MdOutlineOndemandVideo />
                <p>On-demand video assistance</p>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
