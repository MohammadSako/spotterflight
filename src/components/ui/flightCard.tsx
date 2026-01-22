import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Airlines } from "./airLines";
import { MdEuro } from "react-icons/md";
import { FiAlertTriangle } from "react-icons/fi";

export type Flight = {
  id: string;
  price: number;
  currency: string;
  airline: string;
  duration: string;
  stops: number;
  departureTime: string;
  arrivalTime: string;
  wherefromCode: string;
  whereToCode: string;
};

type Props = {
  flight: Flight;
};

export function FlightCard({ flight }: Props) {
  const airlineName = Airlines[flight.airline] ?? flight.airline;

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
console.log("flight", flight);

  return (
    <div className="text-card-foreground">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="flex w-full items-center justify-between">
            <div className="text-gray-500  font-google-sans text-sm min-w-[100px]">
              {airlineName}
            </div>

            <div className="flex flex-col">
              <div className="text-gray-900 text-lg flex flex-row gap-2">
                <p>
                  {new Date(flight.departureTime).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
                -
                <p>
                  {new Date(flight.arrivalTime).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <p className="text-gray-600 text-sm">{airlineName}</p>
            </div>

            <div className="text-gray-700 text-lg">
              {formatDuration(flight.duration)}
            </div>
            <div className="text-gray-700 text-lg">
              {flight.stops === 0 ? (
                <p className="text-green-600">Direct</p>
              ) : (
                <div className="flex flex-row items-center gap-2">
                  {flight.stops} stop
                  <FiAlertTriangle color="red" />
                </div>
              )}
            </div>
            <div className="text-gray-500 text-lg mr-4 hidden sm:flex flex-row items-center gap-2">
              <MdEuro />
              <div>{flight.price} </div>
            </div>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <div className="text-gray-500 text-sm">
            🛫 {new Date(flight.departureTime).toLocaleTimeString()}
          </div>
          <div className="text-gray-500 text-sm">
            🛬 {new Date(flight.arrivalTime).toLocaleTimeString()}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
