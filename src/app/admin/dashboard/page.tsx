import { AdminPageLayout, AdminStatCard } from "@/components/admin/admin-shell";
import { AQI_LABELS } from "@/lib/aqi";
import { getDashboardStats } from "@/lib/data";
import { formatDate, formatDateTime } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <AdminPageLayout>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard title="Нийт мэдээ" value={stats.newsCount} />
        <AdminStatCard title="Нийт зөвлөгөө" value={stats.guidelineCount} />
        <AdminStatCard title="Идэвхтэй хэрэглэгч" value={stats.userCount} />
        <AdminStatCard
          title="Өнөөдрийн AQI"
          value={stats.todayAqi?.aqi ?? "—"}
          subtitle={
            stats.todayAqi ? AQI_LABELS[stats.todayAqi.status] : "Мэдээлэл байхгүй"
          }
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">Сүүлийн оруулсан мэдээ</h2>
          {stats.latestNews ? (
            <div className="mt-3 text-sm">
              <p className="font-medium">{stats.latestNews.title}</p>
              <p className="mt-1 text-slate-500">
                {stats.latestNews.createdBy.name} · {formatDateTime(stats.latestNews.createdAt)}
              </p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-500">Мэдээлэл байхгүй</p>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">Сүүлийн холбоо барих мессеж</h2>
          {stats.latestContact ? (
            <div className="mt-3 text-sm">
              <p className="font-medium">{stats.latestContact.subject}</p>
              <p className="mt-1 text-slate-500">
                {stats.latestContact.name} · {formatDateTime(stats.latestContact.createdAt)}
              </p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-500">Мессеж байхгүй</p>
          )}
        </div>
      </div>

      {stats.todayAqi && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">Өнөөдрийн агаарын чанар</h2>
          <p className="mt-2 text-sm text-slate-600">
            {stats.todayAqi.location} · {formatDate(stats.todayAqi.date)} · AQI{" "}
            {stats.todayAqi.aqi} ({AQI_LABELS[stats.todayAqi.status]})
          </p>
        </div>
      )}
    </AdminPageLayout>
  );
}
