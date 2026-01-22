import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { memo } from "react";

const FlightInput = memo(function FlightInput({
  value,
  handle,
  data = [],
  onSelect,
  placeholder,
  variant,
}) {
  const Icon = variant === "to" ? MdFlightLand : MdFlightTakeoff;

  return (
    <div className="relative flex-1 mt-2">
      <Icon
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        size={22}
      />

      <input
        type="text"
        value={value}
        onChange={handle}
        placeholder={placeholder}
        className="border border-slate-400 px-12 text-gray-400 bg-card text-card-foreground rounded h-14 w-full focus:outline-blue-500"
      />

      {data.length > 0 && (
        <ul className="absolute z-50 bg-white border shadow-lg w-full mt-1 max-h-60 overflow-auto rounded">
          {data.map((item) => (
            <li
              key={item.code}
              className="cursor-pointer px-4 py-2 hover:bg-blue-300"
              onClick={() => onSelect(item)}
            >
              <div className="flex flex-col text-gray-700">
                <p className="text-lg">
                  {item.city}, {item.country}
                </p>
                {item.key && (
                  <p className="text-xs font-light text-gray-500">{item.key}</p>
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
