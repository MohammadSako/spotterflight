import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { memo, useRef, useEffect, useState } from "react";

const FlightInput = memo(function FlightInput({
  value,
  handle,
  data = [],
  onSelect,
  placeholder,
  variant,
}) {
  const [open, setOpen] = useState(false); // dropdown state
  const containerRef = useRef(null);
  const Icon = variant === "to" ? MdFlightLand : MdFlightTakeoff;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Open dropdown when typing
  const handleChange = (e) => {
    handle(e);
    setOpen(true);
  };

  return (
    <div ref={containerRef} className="relative flex-1 mt-2">
      {/* Icon */}
      <Icon
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 pointer-events-none"
        size={22}
      />

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="border border-slate-400 dark:border-slate-600 px-12 text-gray-700 dark:text-gray-200 bg-white dark:bg-card rounded h-14 w-full focus:outline-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
      />

      {/* Dropdown */}
      {open && data.length > 0 && (
        <ul className="absolute z-50 bg-white dark:bg-gray-800 border dark:border-slate-700 shadow-lg w-full mt-1 max-h-60 overflow-auto rounded sm:w-[300px]">
          {data.map((item) => (
            <li
              key={item.code}
              className="cursor-pointer px-4 py-2 hover:bg-blue-300 dark:hover:bg-gray-600"
              onClick={() => {
                onSelect(item);
                setOpen(false); // close on select
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
});

export default FlightInput;
