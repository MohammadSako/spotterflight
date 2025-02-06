import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";

export function FlightList(data) {
  return (
    <div className="mt-10 ">
      {data.data.data.itineraries.map((result, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="shadow-md"
          >
            <Typography component="span">
              <div className="flex md:flex-row flex-col md:gap-20">
                <Image
                  width={50}
                  height={50}
                  alt={`${result.alternateId}${result.legs[0].carriers.marketing[0].logoUrl}`}
                  src={result.legs[0].carriers.marketing[0].logoUrl}
                  className="h-10 w-10 object-cover object-center"
                />
                <div className="flex flex-col font-bold py-2">
                  <div className="flex  md:flex-row flex-col md:gap-2 text-sm text-blue-600">
                    <div className="">
                      {(() => {
                        const dateString = result.legs[0].arrival;
                        const date = new Date(dateString);
                        const hours = date.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        });
                        return `${hours} -`;
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
                          hour: "numeric",
                          minute: "numeric",
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
                    {(() => {
                      const totalMinutes = result.legs[0].durationInMinutes;
                      const hours = Math.floor(totalMinutes / 60);
                      const minutes = totalMinutes % 60;
                      return `${hours}h ${minutes}min`;
                    })()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {result.legs[0].origin.city} - {result.legs[1].origin.city}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-blue-600 font-bold">
                    {result.legs[0].stopCount} Stops
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
                <div className="flex flex-col p-2 text-gray-600">
                  <div className="text-lg font-bold">
                    {index + 1} -{" "}
                    <span className="text-blue-600">
                      {results.origin.name}, {results.origin.country}
                    </span>
                  </div>

                  <div className="flex md:flex-row flex-col md:gap-4">
                    <div className="flex flex-col gap-1">
                      <div>
                        <span className="font-bold">Departure: </span>
                        <span className="text-blue-600">
                          {(() => {
                            const dateString = results.departure;
                            const date = new Date(dateString);
                            const hours = date.toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            });
                            return `${hours}`;
                          })()}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold">Arrival: </span>
                        <span className="text-blue-600">
                          {(() => {
                            const dateString = results.arrival;
                            const date = new Date(dateString);
                            const hours = date.toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            });
                            return `${hours}`;
                          })()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div>
                        <span className="font-bold">Travel time: </span>
                        <span className="text-blue-600">
                          {(() => {
                            const totalMinutes = results.durationInMinutes;
                            const hours = Math.floor(totalMinutes / 60);
                            const minutes = totalMinutes % 60;
                            return `${hours}h ${minutes}min`;
                          })()}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold">Operating Carrier: </span>
                        <span className="text-blue-600">
                          {results.operatingCarrier.name}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div>
                        <span className="font-bold">Flight Number: </span>
                        <span className="text-blue-600">
                          {results.flightNumber}
                        </span>
                      </div>
                    </div>
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
