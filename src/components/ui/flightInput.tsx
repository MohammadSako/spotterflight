import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { memo, useRef, useEffect, useState } from "react";
import { FlightInputProps } from "@/app/types/FlightInput";

const FlightInput = ({
  value,
  handle,
  data,
  onSelect,
  placeholder,
  variant,
}: FlightInputProps) => {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1); // for keyboard navigation
  const containerRef = useRef<HTMLDivElement>(null);
  const Icon = variant === "to" ? MdFlightLand : MdFlightTakeoff;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Open dropdown when typing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handle(e);
    setOpen(true);
    setHighlightedIndex(-1); // reset highlight
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < data.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : data.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < data.length) {
        onSelect(data[highlightedIndex]);
        setOpen(false);
        setHighlightedIndex(-1);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div ref={containerRef} className="relative flex-1 mt-2">
      <Icon
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 pointer-events-none"
        size={22}
      />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="border border-slate-400 dark:border-slate-600 px-12 text-gray-700 dark:text-gray-200 bg-white dark:bg-card rounded h-14 w-full focus:outline-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
      />

      {open && data.length > 0 && (
        <ul className="absolute z-50 bg-white dark:bg-gray-800 border dark:border-slate-700 shadow-lg w-full mt-1 max-h-60 overflow-auto rounded sm:w-[300px]">
          {data.map((item, index) => (
            <li
              key={item.code}
              className={`cursor-pointer px-4 py-2 ${
                index === highlightedIndex
                  ? "bg-blue-300 dark:bg-gray-600"
                  : ""
              } hover:bg-blue-300 dark:hover:bg-gray-600`}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => {
                onSelect(item);
                setOpen(false);
                setHighlightedIndex(-1);
              }}
            >
              <div className="flex flex-col">
                <p className="text-gray-800 dark:text-gray-100 text-lg">
                  {item.city}, {item.country}
                </p>
                {item.key && (
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    {item.key}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(FlightInput);
