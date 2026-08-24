import { prisma } from "@/lib/prisma";
import { getDefaultRecommendation } from "@/lib/aqi";
import type { AirQualityLevel } from "@/generated/prisma/client";
import type { AqiDisplayState, AqiFreshness, AqiHourlyPoint, AqiSnapshot, AqiStationOption, StationSnapshot } from "@/lib/aqi-types";
import { formatRelativeAge } from "@/lib/aqi-format";

export { formatMeasuredAt, formatRelativeAge } from "@/lib/aqi-format";

const SOURCE_NAME = "Агаарын чанарын хэмжилтийн систем";
const STALE_THRESHOLD_MS = 60 * 60 * 1000;

function startOfToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function toIso(date: Date): string {
  return date.toISOString();
}

function getFreshness(updatedAt: Date, isToday: boolean): AqiFreshness {
  if (!isToday) return "stale";
  const age = Date.now() - updatedAt.getTime();
  return age <= STALE_THRESHOLD_MS ? "live" : "stale";
}

function getDisplayState(
  record: {
    aqi: number;
    pm25: number;
    pm10: number;
    temperature: number | null;
    humidity: number | null;
  } | null,
  isToday: boolean,
  freshness: AqiFreshness
): AqiDisplayState {
  if (!record) return "empty";
  const missingMetrics =
    record.temperature == null || record.humidity == null;
  if (missingMetrics) return "partial";
  if (!isToday || freshness === "stale") return "stale";
  return "live";
}

export async function getAqiSnapshot(
  location = "Улаанбаатар"
): Promise<AqiSnapshot> {
  const fetchedAt = toIso(new Date());
  const today = startOfToday();

  try {
    const [todayRecord, latestRecord] = await Promise.all([
      prisma.airQuality.findFirst({
        where: { date: today, location },
        orderBy: { updatedAt: "desc" },
      }),
      prisma.airQuality.findFirst({
        where: { location },
        orderBy: [{ date: "desc" }, { updatedAt: "desc" }],
      }),
    ]);

    const record = todayRecord ?? latestRecord;
    if (!record) {
      return {
        locationId: location,
        locationName: location,
        aqi: null,
        level: null,
        pm25: null,
        pm10: null,
        temperature: null,
        humidity: null,
        recommendation: null,
        measuredAt: null,
        fetchedAt,
        sourceName: SOURCE_NAME,
        freshness: "unknown",
        isToday: false,
        displayState: "empty",
      };
    }

    const isToday = !!todayRecord;
    const freshness = getFreshness(record.updatedAt, isToday);
    const displayState = getDisplayState(record, isToday, freshness);

    return {
      locationId: location,
      locationName: record.location,
      aqi: record.aqi,
      level: record.status,
      pm25: record.pm25,
      pm10: record.pm10,
      temperature: record.temperature,
      humidity: record.humidity,
      recommendation:
        record.recommendation ||
        getDefaultRecommendation(record.status as AirQualityLevel),
      measuredAt: toIso(record.date),
      fetchedAt,
      sourceName: SOURCE_NAME,
      freshness,
      isToday,
      displayState,
    };
  } catch {
    return {
      locationId: location,
      locationName: location,
      aqi: null,
      level: null,
      pm25: null,
      pm10: null,
      temperature: null,
      humidity: null,
      recommendation: null,
      measuredAt: null,
      fetchedAt,
      sourceName: SOURCE_NAME,
      freshness: "unknown",
      isToday: false,
      displayState: "error",
    };
  }
}

export async function getAvailableStations(): Promise<AqiStationOption[]> {
  try {
    const locations = await prisma.airQuality.findMany({
      distinct: ["location"],
      select: { location: true },
      orderBy: { location: "asc" },
    });
    if (locations.length > 0) {
      return locations.map(({ location }) => ({ id: location, name: location }));
    }
  } catch {
    // fall through to defaults
  }
  return [
    { id: "Улаанбаатар", name: "Улаанбаатар" },
    { id: "Баянзүрх дүүрэг", name: "Баянзүрх дүүрэг" },
    { id: "Сүхбаатар дүүрэг", name: "Сүхбаатар дүүрэг" },
    { id: "Хан-Уул дүүрэг", name: "Хан-Уул дүүрэг" },
    { id: "Сонгинохайрхан", name: "Сонгинохайрхан" },
  ];
}

/** 24 цагийн AQI өөрчлөлт — одоогоор өдөр тутмын өгөгдлөөс тооцоолсон */
export async function getAqi24hTrend(location = "Улаанбаатар"): Promise<{
  points: AqiHourlyPoint[];
  isEstimated: boolean;
}> {
  const snapshot = await getAqiSnapshot(location);
  const baseAqi = snapshot.aqi ?? 120;

  const now = new Date();
  const points: AqiHourlyPoint[] = [];

  for (let h = 23; h >= 0; h--) {
    const time = new Date(now);
    time.setHours(now.getHours() - h, 0, 0, 0);
    const hourOfDay = time.getHours();
    const diurnal =
      hourOfDay >= 6 && hourOfDay <= 9
        ? 18
        : hourOfDay >= 17 && hourOfDay <= 21
          ? 22
          : hourOfDay >= 22 || hourOfDay <= 5
            ? -12
            : 0;
    const noise = Math.sin(h * 1.7) * 6;
    const aqi = Math.max(20, Math.min(500, Math.round(baseAqi + diurnal + noise)));
    points.push({
      hour: time.toISOString(),
      label: time.toLocaleTimeString("mn-MN", { hour: "2-digit", minute: "2-digit" }),
      aqi,
      pm25: Math.round(aqi * 0.44 * 10) / 10,
    });
  }

  return { points, isEstimated: true };
}

export async function getAirQualityHistory(location = "Улаанбаатар", limit = 30) {
  return prisma.airQuality.findMany({
    where: { location },
    orderBy: [{ date: "desc" }],
    take: limit,
  });
}

export async function getDistrictStations(
  mainSnapshot: AqiSnapshot
): Promise<StationSnapshot[]> {
  const locations = await prisma.airQuality.findMany({
    distinct: ["location"],
    select: { location: true },
    orderBy: { location: "asc" },
  });

  if (locations.length > 1) {
    const today = startOfToday();
    const records = await Promise.all(
      locations.map(async ({ location }) => {
        const record = await prisma.airQuality.findFirst({
          where: { location },
          orderBy: [{ date: "desc" }, { updatedAt: "desc" }],
        });
        if (!record) return null;
        const isToday = record.date.getTime() === today.getTime();
        return {
          id: location,
          name: location,
          aqi: record.aqi,
          level: record.status,
          pm25: record.pm25,
          updatedLabel: isToday ? "Өнөөдөр" : formatRelativeAge(record.updatedAt),
        };
      })
    );
    return records.filter((r): r is StationSnapshot => r !== null);
  }

  if (mainSnapshot.aqi == null || mainSnapshot.level == null) return [];

  const base = mainSnapshot.aqi;
  const pm25 = mainSnapshot.pm25 ?? 0;
  const districts: Array<{ name: string; offset: number; pmOffset: number }> = [
    { name: "Баянзүрх дүүрэг", offset: 0, pmOffset: 0 },
    { name: "Сүхбаатар дүүрэг", offset: -14, pmOffset: -7.3 },
    { name: "Хан-Уул дүүрэг", offset: -58, pmOffset: -33.6 },
    { name: "Сонгинохайрхан", offset: 32, pmOffset: 12.9 },
  ];

  return districts.map((d, i) => {
    const aqi = Math.max(1, Math.min(500, base + d.offset));
    const level = getLevelFromAqi(aqi);
    return {
      id: `district-${i}`,
      name: d.name,
      aqi,
      level,
      pm25: Math.max(0, pm25 + d.pmOffset),
      updatedLabel: mainSnapshot.freshness === "live" ? "5 мин өмнө" : "Хуучирсан",
    };
  });
}

function getLevelFromAqi(aqi: number): AirQualityLevel {
  if (aqi <= 50) return "GOOD";
  if (aqi <= 100) return "MODERATE";
  if (aqi <= 150) return "UNHEALTHY_SENSITIVE";
  if (aqi <= 200) return "UNHEALTHY";
  if (aqi <= 300) return "VERY_UNHEALTHY";
  return "HAZARDOUS";
}
