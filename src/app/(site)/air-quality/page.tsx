import { PageHero } from "@/components/layout/site-chrome";
import { AqiCard, AqiLegend } from "@/components/aqi/aqi-display";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { AQI_LABELS } from "@/lib/aqi";

export const metadata = { title: "Агаарын чанар" };

export default async function AirQualityPage() {
  const records = await prisma.airQuality.findMany({
    orderBy: [{ date: "desc" }, { location: "asc" }],
    take: 30,
  });

  const today = records[0];

  return (
    <>
      <PageHero
        title="Агаарын чанарын индекс"
        description="Өдөр бүрийн AQI, PM2.5, PM10 мэдээлэл"
      />
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6">
        {today && (
          <AqiCard
            aqi={today.aqi}
            level={today.status}
            location={today.location}
            date={formatDate(today.date)}
            pm25={today.pm25}
            pm10={today.pm10}
            temperature={today.temperature}
            humidity={today.humidity}
            recommendation={today.recommendation}
          />
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold">Түүхэн мэдээлэл</h2>
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
      </div>
    </>
  );
}
