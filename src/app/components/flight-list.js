import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";

export function FlightList(data) {
  return (
    <div className="mt-10">
      {data.data.data.itineraries.map((result, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">
              <div className="flex flex-row gap-20 ">
                <Image
                  width={50}
                  height={50}
                  alt={`${result.alternateId}${result.legs[0].carriers.marketing[0].logoUrl}`}
                  src={result.legs[0].carriers.marketing[0].logoUrl}
                  className="h-10 w-10 object-cover object-center"
                />
                <div className="flex flex-col font-bold py-2">
                  <div className="flex flex-row gap-2 text-sm text-blue-600">
                    <div className="">
                      {(() => {
                        const dateString = result.legs[0].arrival;
                        const date = new Date(dateString);
                        const hours = date.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        });
                        return `${hours}`;
                      })()}
                    </div>
                    <div>
                      {(() => {
                        const dateString = result.legs[1].arrival;
                        const date = new Date(dateString);
                        const hours = date.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        });
                        return `${hours}`;
                      })()}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {result.legs[0].carriers.marketing[0].name}
                  </div>
                </div>
                <div>
                  <p className="text-lg text-blue-600 font-bold">
                    {Math.floor(result.legs[0].durationInMinutes / 60) % 60}
                    min
                  </p>
                  <p className="text-sm text-gray-600">
                    {result.legs[0].origin.city} - {result.legs[1].origin.city}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-blue-600 font-bold">
                    {result.legs[0].stopCount} Stops
                  </p>
                  <p className="text-sm text-gray-600">
                    {result.legs[0].origin.city} - {result.legs[1].origin.city}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-blue-600 font-bold">
                    {result.price.formatted}
                  </p>
                  <p className="text-sm text-gray-600">Round trip</p>
                </div>
              </div>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>Airport Changes In:</div>
            {result.legs[0].segments.map((results, index) => (
              <div key={results.id}>
                <div className="flex flex-row justify-between items-center px-4 text-gray-600">
                  <div>
                    {index + 1} - {results.origin.name}
                  </div>
                </div>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
