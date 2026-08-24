"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AqiHourlyPoint } from "@/lib/aqi-types";

export function Aqi24hChart({
  data,
  isEstimated,
}: {
  data: AqiHourlyPoint[];
  isEstimated?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-slate-900">24 цагийн AQI өөрчлөлт</h3>
          <p className="mt-0.5 text-sm text-slate-500">
            Сүүлийн 24 цагийн агаарын чанарын индексийн хэлбэлзэл
          </p>
        </div>
        {isEstimated && (
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800 ring-1 ring-amber-200">
            Тооцоолсон өгөгдөл
          </span>
        )}
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#64748b" }}
              interval="preserveStartEnd"
              minTickGap={24}
            />
            <YAxis
              domain={[0, "auto"]}
              tick={{ fontSize: 11, fill: "#64748b" }}
              width={36}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                fontSize: 13,
              }}
              formatter={(value, name) => {
                if (name === "aqi") return [`${value} AQI`, "AQI"];
                return [value, name];
              }}
            />
            <Line
              type="monotone"
              dataKey="aqi"
              stroke="#0b95a7"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#0b95a7" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
