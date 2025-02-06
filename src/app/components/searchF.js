"use client"

import * as React from "react";
import { useEffect, useState } from "react";
import { FlightList } from "../components/flight-list";
import Spinner from "../../components/ui/spinner";
import BtnSpinner from "../../components/ui/button-spinner";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";

export default function SearchFL() {
  const [wherefrom, setWherefrom] = useState("");
  const [whereTo, setWhereTo] = useState("");
  const [airports, setAirports] = useState([]);
  const [fromResults, setFromResults] = useState([]);
  const [toResults, setToResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingFlight, setLoadingFlight] = useState(false);

  const [fromEntityId, setFromEntityId] = useState("");
  const [fromSkyId, setFromSkyId] = useState("");
  const [toEntityId, setToEntityId] = useState("");
  const [toSkyId, setToSkyId] = useState("");

  const [flightResults, setFlightResults] = useState([]);
  const [departure, setDeparture] = useState(dayjs());
  const [returns, setReturns] = useState(dayjs());
  const [age, setAge] = useState("");
  const departureData = departure.format("YYYY-MM-DD");
  const returnData = returns.format("YYYY-MM-DD");

  function searchFlights() {
    const url = `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?originSkyId=${fromSkyId}&destinationSkyId=${toSkyId}&originEntityId=${fromEntityId}&destinationEntityId=${toEntityId}&date=${departureData}&returnDate=${returnData}&adults=${age}&sortBy=best&currency=USD&market=en-US&countryCode=US`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "daa8fd3c5fmsh6f4a075c1c521e1p1d0770jsnf77714006533",
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    };

    async function fetchFlights(url, options) {
      setLoadingFlight(true);
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setFlightResults(result || []);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      } finally {
        setLoadingFlight(false);
      }
    }
    fetchFlights(url, options);
  }

  useEffect(() => {
    const url =
      "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=new&locale=en-US";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "daa8fd3c5fmsh6f4a075c1c521e1p1d0770jsnf77714006533",
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    };

    async function fetchAirportData(url, options) {
      try {
        setLoading(true);
        const response = await fetch(url, options);
        const result = await response.json();
        setAirports(result.data || []);
        setFromResults([]);
        setToResults([]);
      } catch (error) {
        console.error("Error fetching airport data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAirportData(url, options);
  }, []);

  const WherefromHandle = (e) => {
    const searchTerm = e.target.value;
    setWherefrom(searchTerm);
    if (searchTerm.trim() === "") {
      setFromResults([]);
    } else {
      const filtered = airports.filter((item) =>
        item.presentation.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFromResults(filtered);
    }
  };

  const WheretoHandle = (e) => {
    const searchTerm = e.target.value;
    setWhereTo(searchTerm);
    if (searchTerm.trim() === "") {
      setToResults([]);
    } else {
      const filtered = airports.filter((item) =>
        item.presentation.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setToResults(filtered);
    }
  };

  const fromHandleSelect = (selectedItem) => {
    setWherefrom(selectedItem.presentation.title);
    setFromEntityId(
      selectedItem.navigation.relevantFlightParams.entityId || ""
    );
    setFromSkyId(selectedItem.navigation.relevantFlightParams.skyId || "");
    setFromResults([]);
  };

  const toHandleSelect = (selectedItem) => {
    setWhereTo(selectedItem.presentation.title);
    setToEntityId(selectedItem.navigation.relevantFlightParams.entityId || "");
    setToSkyId(selectedItem.navigation.relevantFlightParams.skyId || "");
    setToResults([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex justify-center bg-white rounded shadow-md p-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-row gap-8">
              <div className="flex flex-col gap-2 mt-2">
                <input
                  type="text"
                  value={wherefrom}
                  className="border border-slate-400 px-4 rounded h-14"
                  onChange={WherefromHandle}
                  placeholder="Where from?"
                />
                {wherefrom && fromResults.length > 0 && (
                  <div className="border-2 border-gray-500 px-4 rounded-md shadow-lg">
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {fromResults.map((result, index) => (
                        <li
                          key={index}
                          onClick={() => fromHandleSelect(result)}
                          style={{
                            cursor: "pointer",
                            padding: "0.5rem",
                            borderBottom: "1px solid #ccc",
                          }}
                        >
                          <strong>{result.presentation.title}</strong>
                          <br />
                          <em>{result.presentation.subtitle}</em>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-2 relative">
                <input
                  type="text"
                  value={whereTo}
                  className="border border-slate-400 px-4 rounded h-14"
                  onChange={WheretoHandle}
                  placeholder="Where to?"
                />
                {whereTo && toResults.length > 0 && (
                  <div className="border-2 border-gray-500 p-2 rounded-md shadow-lg absolute z-10 mt-16">
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {toResults.map((result, index) => (
                        <li
                          key={index}
                          onClick={() => toHandleSelect(result)}
                          style={{
                            cursor: "pointer",
                            padding: "0.5rem",
                            borderBottom: "1px solid #ccc",
                          }}
                        >
                          <strong>{result.presentation.title}</strong>
                          <br />
                          <em>{result.presentation.subtitle}</em>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <DemoContainer components={["DatePickers"]}>
                <DatePicker
                  label="Departure"
                  value={departure}
                  onChange={setDeparture}
                />
                <DatePicker
                  label="Return"
                  value={returns}
                  onChange={setReturns}
                />
              </DemoContainer>
              <div className="mt-2">
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Adults: 12+
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Adults: 12+"
                      onChange={handleChange}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={7}>7</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
            <button
              onClick={searchFlights}
              className="bg-blue-500 text-white py-2 px-4 rounded text-lg z-10 shadow-lg hover:shadow-inner"
            >
              {loadingFlight ? <BtnSpinner /> : "Search Flights"}
            </button>
          </form>
        </div>
        {loading && (
          <div className="flex flex-col justify-center text-2xl text-blue-600 font-bold mt-10">
            <Spinner />
            <div className="flex justify-center ">Wait...</div>
          </div>
        )}
        {flightResults.status && <FlightList data={flightResults} />}
      </LocalizationProvider>
    </div>
  );
}
