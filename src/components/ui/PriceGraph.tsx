"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import dayjs from "dayjs";

type Flight = {
  id: string;
  price: number;
  departureTime: string;
  airline: string;
};

export default function PriceGraph({ flights }: { flights: Flight[] }) {
  const data = [...flights]
    .sort(
      (a, b) =>
        new Date(a.departureTime).getTime() -
        new Date(b.departureTime).getTime(),
    )
    .map((flight) => ({
      time: dayjs(flight.departureTime).format("HH:mm"),
      price: flight.price,
      airline: flight.airline,
    }));

  return (
    <div
      className="w-full h-64 p-4 rounded-lg
      bg-white dark:bg-slate-900
      text-slate-800 dark:text-slate-100"
    >
      <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">
        Live Price Trend
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            className="dark:stroke-slate-700"
          />

          <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 12 }} />

          <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />

          <Tooltip
            contentStyle={{
              backgroundColor: "#020617",
              border: "none",
              borderRadius: "8px",
              color: "#e5e7eb",
            }}
            labelStyle={{ color: "#93c5fd" }}
          />

          <Line
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
