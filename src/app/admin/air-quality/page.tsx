import { AdminPageLayout } from "@/components/admin/admin-shell";
import { prisma } from "@/lib/prisma";
import { formatDate, formatDateTime } from "@/lib/utils";
import { AQI_LABELS } from "@/lib/aqi";

export const metadata = { title: "Агаарын чанар удирдах" };

export default async function AdminAirQualityPage() {
  const records = await prisma.airQuality.findMany({
    orderBy: { date: "desc" },
    take: 50,
  });

  return (
    <AdminPageLayout>
      <h1 className="mb-6 text-2xl font-bold">Агаарын чанарын мэдээлэл</h1>
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
              <th className="px-4 py-3">Шинэчлэгдсэн</th>
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
                <td className="px-4 py-3">{formatDateTime(record.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminPageLayout>
  );
}
