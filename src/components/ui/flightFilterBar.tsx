"use client";

import { Checkbox } from "@/components/ui/checkbox";
import Slider from "@mui/material/Slider";
import { Airlines } from "./airLines";
import { useEffect, useRef, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

type Props = {
  filters: {
    maxPrice: number;
    stops: "all" | 0 | 1 | 2;
    airlines: string[];
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      maxPrice: number;
      stops: "all" | 0 | 1 | 2;
      airlines: string[];
    }>
  >;
};

export function FlightFilterBar({ filters, setFilters }: Props) {
  const [airlinesOpen, setAirlinesOpen] = useState(false);
  const [airlineSearch, setAirlineSearch] = useState("");

  const airlinesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        airlinesRef.current &&
        !airlinesRef.current.contains(e.target as Node)
      ) {
        setAirlinesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const airlineCodes = Object.keys(Airlines).filter((code) =>
    Airlines[code].toLowerCase().includes(airlineSearch.toLowerCase()),
  );

  const toggleAirline = (code: string) => {
    setFilters((prev) => ({
      ...prev,
      airlines: prev.airlines.includes(code)
        ? prev.airlines.filter((a) => a !== code)
        : [...prev.airlines, code],
    }));
  };

  useEffect(() => {
    if (!airlinesOpen) setAirlineSearch("");
  }, [airlinesOpen]);

  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-gray-900 shadow-sm space-y-4">
      {/* Price */}
      <div>
        <p className="font-semibold mb-2">Max price: ${filters.maxPrice}</p>
        <Slider
          min={50}
          max={1000}
          step={50}
          value={filters.maxPrice}
          onChange={(_, value) =>
            setFilters((prev) => ({
              ...prev,
              maxPrice: value as number,
            }))
          }
        />
      </div>

      {/* Stops */}
      <div>
        <p className="font-semibold mb-2">Stops</p>
        <div className="flex gap-3 text-sm">
          {["all", 0, 1, 2].map((s) => (
            <button
              key={s}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  stops: s as any,
                }))
              }
              className={`px-3 py-1 rounded-full border ${
                filters.stops === s ? "bg-blue-500 text-white" : "text-gray-600"
              }`}
            >
              {s === "all" ? "Any" : `${s} stop`}
            </button>
          ))}
        </div>
      </div>

      {/* Airlines */}
      <div ref={airlinesRef} className="relative">
        <p className="font-semibold mb-2">Airlines</p>

        {/* Button */}
        <button
          type="button"
          onClick={() => setAirlinesOpen((v) => !v)}
          className="w-full border rounded-lg px-4 py-2 flex items-center justify-between bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <div className="flex items-center gap-2">
            <span>Select airlines</span>
            {filters.airlines.length > 0 && (
              <span className="text-sm text-blue-600">
                ({filters.airlines.length})
              </span>
            )}
          </div>

          {filters.airlines.length > 0 && (
            <IoCloseCircle
              size={18}
              className="text-gray-400 hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                setFilters((prev) => ({
                  ...prev,
                  airlines: [],
                }));
              }}
            />
          )}
        </button>

        {/* Dropdown */}
        {airlinesOpen && (
          <div className="absolute z-50 mt-2 w-full max-h-72 overflow-y-auto border rounded-lg bg-white dark:bg-gray-900 shadow-lg p-3">
            {/* Search */}
            <input
              type="text"
              placeholder="Search airlines..."
              value={airlineSearch}
              onChange={(e) => setAirlineSearch(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Selected chips */}
            {filters.airlines.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {filters.airlines.map((code) => (
                  <span
                    key={code}
                    className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                  >
                    {Airlines[code]}
                    <IoCloseCircle
                      size={14}
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => toggleAirline(code)}
                    />
                  </span>
                ))}
              </div>
            )}

            {/* Airline list */}
            <ul className="space-y-1 text-sm">
              {airlineCodes.map((code) => {
                const selected = filters.airlines.includes(code);
                return (
                  <li
                    key={code}
                    onClick={() => toggleAirline(code)}
                    className={`px-3 py-2 rounded cursor-pointer flex justify-between items-center
          ${
            selected
              ? "bg-blue-50 text-blue-700"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
                  >
                    {Airlines[code]}
                    {selected && (
                      <span className="text-xs text-blue-600">Selected</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
