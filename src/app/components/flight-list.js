// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// export function FlightList(data) {
//   console.log("aaa", data);

//   return (
//     <Accordion type="single" collapsible className="w-full">
//       {data.data.data.itineraries.map((result, index) => (
//         <AccordionItem key={result.id} value={index + 1}>
//           <AccordionTrigger>
//             <div className="flex flex-row gap-24 px-4 py-2 mt-1">
//               <img
//                 width={35}
//                 height={35}
//                 alt={result.alternateId}
//                 src={result.legs[0].carriers.marketing[0].logoUrl}
//               />
//               <div className="flex flex-col">
//                 <p className="text-lg text-blue-600">
//                   {result.legs[0].arrival} - {result.legs[1].arrival}
//                 </p>
//                 <p className="text-lg text-blue-600">
//                   {result.legs[0].carriers.marketing[0].name}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-lg text-blue-600">
//                   {Math.floor(result.legs[0].durationInMinutes / 60) % 60}
//                   min
//                 </p>
//                 <p className="text-lg text-blue-600">
//                   {result.legs[0].origin.city} - {result.legs[1].origin.city}
//                 </p>
//               </div>
//               <div>{result.legs[0].stopCount} Stops</div>
//               <div>KG</div>
//               <div>{result.price.formatted}</div>
//             </div>
//           </AccordionTrigger>
//           <AccordionContent>
//             {result.legs[0].segments.map((results) => (
//               <li key={results.id}>
//                 <div className="flex flex-row justify-between items-center px-4 py-2 border-2 border-gray-300 rounded-md shadow-md mt-1">
//                <p>Airport Changes In: {results.origin.name}</p>
//                 </div>
//                 <div className="border-t border-gray-200" />
//               </li>
//             ))}
//           </AccordionContent>
//         </AccordionItem>
//       ))}
//     </Accordion>
//   );
// }

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid2 } from "@mui/material";
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
              <Grid2
                container
                spacing={{ xs: 4, md: 4 }}
                columns={{ xs: 8, sm: 8, md: 4 }}
              >
                {/* <div className="flex flex-row gap-20 "> */}
                <Image
                  width={50}
                  height={50}
                  alt={result.alternateId}
                  src={result.legs[0].carriers.marketing[0].logoUrl}
                />
                <div className="flex flex-col font-bold">
                  <div className="flex flex-row gap-2 text-sm text-gray-600">
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
                  <div className="text-lg text-blue-600">
                    {result.legs[0].carriers.marketing[0].name}
                  </div>
                </div>
                <div>
                  <p className="text-lg text-blue-600">
                    {Math.floor(result.legs[0].durationInMinutes / 60) % 60}
                    min
                  </p>
                  <p className="text-lg text-blue-600">
                    {result.legs[0].origin.city} - {result.legs[1].origin.city}
                  </p>
                </div>
                <div>{result.legs[0].stopCount} Stops</div>
                <div>KG</div>
                <div>{result.price.formatted}</div>
                {/* </div> */}
              </Grid2>
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
