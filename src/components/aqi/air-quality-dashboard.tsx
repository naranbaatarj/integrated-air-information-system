"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { MapPin } from "lucide-react";
import { Aqi24hChart } from "@/components/aqi/aqi-24h-chart";
import { AqiSummaryCard } from "@/components/home/aqi-summary-card";
import type { AqiHourlyPoint, AqiSnapshot, AqiStationOption } from "@/lib/aqi-types";
import { cn } from "@/lib/utils";

export function AirQualityDashboard({
  snapshot,
  stations,
  trend,
  isEstimated,
}: {
  snapshot: AqiSnapshot;
  stations: AqiStationOption[];
  trend: AqiHourlyPoint[];
  isEstimated: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const selectedLocation = searchParams.get("location") ?? snapshot.locationName;

  const onStationChange = useCallback(
    (location: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (location === stations[0]?.id) {
        params.delete("location");
      } else {
        params.set("location", location);
      }
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router, searchParams, stations]
  );

  return (
    <div className={cn("space-y-8", pending && "opacity-70 transition-opacity")}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-700">Хэмжилтийн станц</p>
          <p className="text-xs text-slate-500">Байршлаар шүүж, AQI мэдээллийг харьцуулна</p>
        </div>
        <label className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
          <MapPin className="h-4 w-4 text-cyan-700" aria-hidden="true" />
          <span className="sr-only">Станц сонгох</span>
          <select
            value={selectedLocation}
            onChange={(e) => onStationChange(e.target.value)}
            className="min-w-[200px] bg-transparent text-sm font-semibold text-slate-800 outline-none"
            aria-label="Хэмжилтийн станц сонгох"
          >
            {stations.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <AqiSummaryCard snapshot={snapshot} />
      <Aqi24hChart data={trend} isEstimated={isEstimated} />
    </div>
  );
}
