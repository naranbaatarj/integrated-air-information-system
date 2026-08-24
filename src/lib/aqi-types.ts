import type { AirQualityLevel } from "@/generated/prisma/client";

export type AqiFreshness = "live" | "stale" | "unknown";
export type AqiDisplayState = "live" | "stale" | "empty" | "partial" | "error";

export type AqiSnapshot = {
  locationId: string;
  locationName: string;
  stationName?: string;
  aqi: number | null;
  level: AirQualityLevel | null;
  pm25: number | null;
  pm10: number | null;
  temperature: number | null;
  humidity: number | null;
  recommendation: string | null;
  measuredAt: string | null;
  fetchedAt: string;
  sourceName: string;
  freshness: AqiFreshness;
  isToday: boolean;
  displayState: AqiDisplayState;
};

export type AqiHourlyPoint = {
  hour: string;
  label: string;
  aqi: number;
  pm25: number;
};

export type AqiStationOption = {
  id: string;
  name: string;
};

export type StationSnapshot = {
  id: string;
  name: string;
  aqi: number;
  level: AirQualityLevel;
  pm25: number;
  updatedLabel: string;
};
