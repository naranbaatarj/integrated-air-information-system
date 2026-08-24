import Link from "next/link";
import { PageHero } from "@/components/layout/site-chrome";
import { AirQualityDashboard } from "@/components/aqi/air-quality-dashboard";
import { AqiLegend } from "@/components/aqi/aqi-display";
import {
  getAqiSnapshot,
  getAirQualityHistory,
  getAqi24hTrend,
  getAvailableStations,
  formatMeasuredAt,
} from "@/lib/aqi-service";
import { formatDate } from "@/lib/utils";
import { AQI_LABELS } from "@/lib/aqi";
import { Suspense } from "react";
import { AirQualityPageSkeleton } from "@/components/aqi/air-quality-skeleton";

export const metadata = { title: "Агаарын чанар" };

type SearchParams = Promise<{ location?: string }>;

async function AirQualityContent({ location }: { location?: string }) {
  const station = location ?? "Улаанбаатар";
  const [snapshot, records, stations, trend] = await Promise.all([
    getAqiSnapshot(station),
    getAirQualityHistory(station),
    getAvailableStations(),
    getAqi24hTrend(station),
  ]);

  return (
    <>
      <AirQualityDashboard
        snapshot={snapshot}
        stations={stations}
        trend={trend.points}
        isEstimated={trend.isEstimated}
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 sm:p-5">
        <div className="grid gap-2 sm:grid-cols-3">
          <p>
            <span className="font-semibold text-slate-800">Хэмжсэн огноо:</span>{" "}
            {formatMeasuredAt(snapshot.measuredAt)}
          </p>
          <p>
            <span className="font-semibold text-slate-800">Сүүлд шинэчлэгдсэн:</span>{" "}
            {formatMeasuredAt(snapshot.fetchedAt)}
          </p>
          <p>
            <span className="font-semibold text-slate-800">Эх сурвалж:</span>{" "}
            {snapshot.sourceName}
          </p>
        </div>
        {!snapshot.isToday && snapshot.displayState !== "empty" && (
          <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-amber-900">
            Өнөөдрийн мэдээлэл байхгүй — доорх хүснэгтэд хамгийн сүүлийн хэмжилтийг
            харуулж байна.
          </p>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-slate-900">Түүхэн мэдээлэл</h2>
            <Link
              href="/open-info"
              className="text-sm font-semibold text-cyan-700 hover:text-cyan-800"
            >
              Өгөгдөл татах →
            </Link>
          </div>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left text-slate-600">
                <tr>
                  <th className="px-4 py-3">Огноо</th>
                  <th className="px-4 py-3">Байршил</th>
                  <th className="px-4 py-3">AQI</th>
                  <th className="px-4 py-3">PM2.5</th>
                  <th className="px-4 py-3">PM10</th>
                  <th className="px-4 py-3">Төлөв</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id} className="border-t border-slate-100">
                    <td className="px-4 py-3">{formatDate(record.date)}</td>
                    <td className="px-4 py-3">{record.location}</td>
                    <td className="px-4 py-3 font-semibold">{record.aqi}</td>
                    <td className="px-4 py-3">{record.pm25}</td>
                    <td className="px-4 py-3">{record.pm10}</td>
                    <td className="px-4 py-3">{AQI_LABELS[record.status]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <AqiLegend />
      </div>
    </>
  );
}

export default async function AirQualityPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { location } = await searchParams;

  return (
    <>
      <PageHero
        title="Агаарын чанарын индекс"
        description="Станц сонголт, 24 цагийн график, түүхэн мэдээлэл, эх сурвалж болон шинэчлэгдсэн хугацаа"
      />
      <div className="mx-auto max-w-[1240px] space-y-8 px-4 py-12 sm:px-5">
        <Suspense fallback={<AirQualityPageSkeleton />}>
          <AirQualityContent location={location} />
        </Suspense>
      </div>
    </>
  );
}
